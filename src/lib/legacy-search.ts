/* Ported from legacy assets/js/search.js — logic kept verbatim, adapted for Next.js */
/* eslint-disable */
// @ts-nocheck
"use client";
import { t, translations } from "./translations";

export function initSearch() {
  const __ready = (fn) => { try { fn(); } catch (e) { console.error(e); } };
  if ((window as any).__initSearch) return; (window as any).__initSearch = true;
/* =========================================================
   Sawt — In-page search (shared across all pages)
   ---------------------------------------------------------
   - Mobile: the search icon reveals a slide-down input
   - Submitting the search finds the word on the CURRENT page,
     scrolls to it, and highlights it
   - Works from both the desktop nav input and the mobile panel
   ========================================================= */
(function () {
  "use strict";

  // ---- i18n helper (falls back to Arabic text if translate.js absent) ----
  function t(key, fallback) {
    try {
      var lang =
        typeof getCurrentLang === "function" ? getCurrentLang() : "ar";
      if (
        typeof translations !== "undefined" &&
        translations[lang] &&
        translations[lang][key]
      ) {
        return translations[lang][key];
      }
    } catch (e) {}
    return fallback;
  }

  // ---- Toast for "no results on this page" ----
  var toastEl = null;
  var toastTimer = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "search-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    // force reflow so the transition runs each time
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2600);
  }

  // ---- Highlight handling ----
  function clearHighlights() {
    document.querySelectorAll("mark.search-highlight").forEach(function (m) {
      var parent = m.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function isVisible(el) {
    if (!el) return false;
    // offsetParent is null for display:none elements (and position:fixed)
    if (el.offsetParent !== null) return true;
    var style = window.getComputedStyle(el);
    return style.position === "fixed" && style.display !== "none";
  }

  // Find the first visible text node in the page body that contains `needle`,
  // skipping the header / search UI / scripts.
  function findMatchNode(needle) {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var value = node.nodeValue;
          if (!value || !value.trim()) return NodeFilter.FILTER_REJECT;
          var parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          var tag = parent.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
            return NodeFilter.FILTER_REJECT;
          }
          // Don't match inside the header/nav or the search UI itself.
          if (parent.closest("header, .mobile-search-panel")) {
            return NodeFilter.FILTER_REJECT;
          }
          if (value.toLowerCase().indexOf(needle) === -1) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!isVisible(parent)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );
    return walker.nextNode();
  }

  // ---- Close the search UI once a match is found ----
  // The phone drawer (#mainNav) hosts its own .search-input and covers the
  // page, and the slide-down panel overlays the hero — with either still open
  // the highlighted match is hidden behind them. Returns true if something was
  // actually closed, so the caller can wait for the collapse animation before
  // scrolling.
  function closeSearchUi() {
    var closed = false;

    var nav = document.getElementById("mainNav");
    if (nav && nav.classList.contains("show")) {
      var bs = window.bootstrap;
      if (bs && bs.Collapse) {
        var inst =
          bs.Collapse.getInstance(nav) || new bs.Collapse(nav, { toggle: false });
        inst.hide();
      } else {
        // no Bootstrap on window — fall back to the classes it toggles, and
        // keep the toggler's state in sync so the next tap still opens it
        nav.classList.remove("show");
        document
          .querySelectorAll('[data-bs-target="#mainNav"]')
          .forEach(function (btn) {
            btn.classList.add("collapsed");
            btn.setAttribute("aria-expanded", "false");
          });
      }
      closed = true;
    }

    var panel = document.getElementById("mobileSearchPanel");
    if (panel && panel.classList.contains("open")) {
      panel.classList.remove("open");
      closed = true;
    }

    return closed;
  }

  // Search the current page, scroll to the first match and highlight it.
  function runSearch(term) {
    var q = (term || "").trim();
    if (!q) return;

    clearHighlights();
    var needle = q.toLowerCase();
    var node = findMatchNode(needle);

    if (!node) {
      showToast(t("search_not_found", "لا توجد نتائج في هذه الصفحة"));
      return;
    }

    var idx = node.nodeValue.toLowerCase().indexOf(needle);
    var range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + needle.length);

    var mark = document.createElement("mark");
    mark.className = "search-highlight";
    var target = mark;
    try {
      range.surroundContents(mark);
    } catch (e) {
      // Fallback: if the range can't be surrounded, just scroll to the parent.
      target = node.parentElement;
    }

    // A match was found: get the drawer/panel out of the way first, then scroll
    // — measuring the target while the collapse is still open lands short.
    var closed = closeSearchUi();
    if (closed) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 360); // Bootstrap's collapse transition is 350ms
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // ---- Wire up the UI once the DOM is ready ----
  function init() {
    // Reveal the slide-down search panel. Only the phone header icon opens it
    // now: from 768px up the top bar's own icon expands a field beside itself
    // instead (components/site/NavSearch.tsx), so .nav-search-btn is no longer
    // wired here. querySelectorAll, not querySelector — there may be more than
    // one on a page.
    var toggleBtns = document.querySelectorAll(".mobile-nav-search");
    var panel = document.getElementById("mobileSearchPanel");
    var form = panel ? panel.querySelector(".mobile-search-form") : null;
    var input = document.getElementById("mobileSearchInput");
    var closeBtn = document.getElementById("mobileSearchClose");

    if (panel) {
      toggleBtns.forEach(function (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
          var isOpen = panel.classList.toggle("open");
          if (isOpen && input) {
            setTimeout(function () {
              input.focus();
            }, 100);
          }
        });
      });
    }
    if (closeBtn && panel) {
      closeBtn.addEventListener("click", function () {
        panel.classList.remove("open");
      });
    }
    if (form && input) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        runSearch(input.value);
      });
    }

    // Desktop (and any other) search inputs: submit on Enter.
    document.querySelectorAll(".search-input").forEach(function (el) {
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          runSearch(el.value);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

}
