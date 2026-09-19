/* Ported from legacy index.html inline scripts — logic kept verbatim, adapted for Next.js */
/* eslint-disable */
// @ts-nocheck
"use client";
import { t, translations } from "./translations";
import { apiMessage } from "./api/messages";

export function initHomeInline() {
  if ((window as any).__initHomeInline) return; (window as any).__initHomeInline = true;

  // mobile: tapping a creator card reveals its bio (instead of hover) — ported from jQuery
  if (!(window as any).__creatorsTapWired) {
    (window as any).__creatorsTapWired = true;
    document.addEventListener("click", function (e: any) {
      const card = e.target.closest(".creators-carousel2 .main-container");
      if (!card) return;
      if (window.innerWidth > 992) return;
      e.preventDefault();
      document.querySelectorAll(".creators-carousel2 .main-container").forEach((c) => {
        if (c !== card) c.classList.remove("is-open");
      });
      card.classList.toggle("is-open");
    });
  }


      (function () {
        const overlay = document.getElementById("joinModal");
        if (!overlay) return;

        const closeBtn = document.getElementById("joinModalClose");
        const nextBtn = document.getElementById("joinNext");
        const prevBtn = document.getElementById("joinPrev");
        const nextLabel = nextBtn.querySelector("span");
        const prevLabel = prevBtn.querySelector("span");
        const steps = Array.from(overlay.querySelectorAll(".join-step"));
        const lines = Array.from(overlay.querySelectorAll(".join-step-line"));
        const panes = Array.from(overlay.querySelectorAll(".join-pane"));
        const dots = Array.from(overlay.querySelectorAll(".join-dot"));
        const form = document.getElementById("joinForm");

        const TOTAL = 3;
        let current = 1;

        // Translated labels (fall back to Arabic defaults)
        function t(key, fallback) {
          try {
            const lang =
              (window.localStorage && localStorage.getItem("lang")) ||
              document.documentElement.getAttribute("lang") ||
              "ar";
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

        function showPane(name) {
          panes.forEach((p) =>
            p.classList.toggle("is-active", p.dataset.pane === name),
          );
        }

        function render() {
          // stepper state
          steps.forEach((s) => {
            const n = Number(s.dataset.step);
            s.classList.toggle("is-active", n === current);
            s.classList.toggle("is-done", n < current);
          });
          // connector lines: line[i] fills once we reach step i+2
          lines.forEach((l, i) =>
            l.classList.toggle("is-active", current >= i + 2),
          );
          // dots
          dots.forEach((d, i) =>
            d.classList.toggle("is-active", i === current - 1),
          );
          // panes
          showPane(String(current));

          // footer buttons
          if (current === 1) {
            prevLabel.textContent = t("jm_cancel", "الغاء");
          } else {
            prevLabel.textContent = t("jm_prev", "السابق");
          }
          if (current === TOTAL) {
            nextLabel.textContent = t("jm_submit", "تسليم الطلب");
          } else {
            nextLabel.textContent = t("jm_next", "التالي");
          }
        }

        function openModal() {
          overlay.classList.add("is-open");
          overlay.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
          overlay.querySelectorAll(".join-field").forEach(clearError);
          clearSubmitError();
          current = 1;
          render();
        }

        /* Dismissing the modal drops what was typed: "الغاء" on step 1 lands
           here, and so do the ×, Escape and a click on the backdrop — the next
           visitor to open it starts on an empty step 1 either way. */
        function closeModal() {
          overlay.classList.remove("is-open");
          overlay.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
          resetJoinForm();
        }

        // ---------- Step validation ----------
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function fieldOf(el) {
          return el ? el.closest(".join-field") : null;
        }
        function setError(field, msg) {
          if (!field) return;
          field.classList.add("has-error");
          let e = field.querySelector(".join-field-error");
          if (!e) {
            e = document.createElement("span");
            e.className = "join-field-error";
            field.appendChild(e);
          }
          e.textContent = msg;
        }
        function clearError(field) {
          if (!field) return;
          field.classList.remove("has-error");
          const e = field.querySelector(".join-field-error");
          if (e) e.remove();
        }

        function validateStep(step) {
          const pane = overlay.querySelector(
            '.join-pane[data-pane="' + step + '"]',
          );
          if (!pane) return true;
          pane.querySelectorAll(".join-field").forEach(clearError);
          let ok = true;

          const requireField = function (name, msg) {
            const input = pane.querySelector('[name="' + name + '"]');
            if (input && !input.value.trim()) {
              setError(fieldOf(input), msg);
              ok = false;
              return false;
            }
            return true;
          };

          if (step === 1) {
            requireField("fullname", t("jm_err_name", "الاسم مطلوب"));
            requireField("phone", t("jm_err_phone", "رقم الهاتف مطلوب"));
            const email = pane.querySelector('[name="email"]');
            if (email && !email.value.trim()) {
              setError(fieldOf(email), t("jm_err_email", "البريد الإلكتروني مطلوب"));
              ok = false;
            } else if (email && !EMAIL_RE.test(email.value.trim())) {
              setError(
                fieldOf(email),
                t("jm_err_email_invalid", "البريد الإلكتروني غير صحيح"),
              );
              ok = false;
            }
          } else if (step === 2) {
            const chips = pane.querySelector(".join-chips");
            if (!pane.querySelectorAll(".join-chip.is-selected").length) {
              setError(fieldOf(chips), t("jm_err_content", "اختر نوع المحتوى"));
              ok = false;
            }
            requireField("followers", t("jm_err_followers", "عدد المتابعين مطلوب"));
            requireField("about", t("jm_err_about", "نبذة عن محتواك مطلوبة"));
          } else if (step === 3) {
            const urls = Array.from(
              pane.querySelectorAll(".join-link-wrap input"),
            );
            if (!urls.some((u) => u.value.trim())) {
              setError(
                pane.querySelector(".join-field"),
                t("jm_err_social", "أضف رابطاً واحداً على الأقل"),
              );
              ok = false;
            }
            // "ملاحظات إضافية" (notes) is optional — no validation
          }

          if (!ok) {
            const firstErr = pane.querySelector(".join-field.has-error");
            if (firstErr)
              firstErr.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }
          return ok;
        }

        function goNext() {
          if (!validateStep(current)) return;
          if (current < TOTAL) {
            current += 1;
            render();
          } else {
            submit();
          }
        }

        // ---------- Submit: POST /pages/creators/join ----------

        /* The chips carry the design's Arabic wording; the API wants a slug
           per content type. Keyed on the i18n key so the map survives a copy
           change and works in either language. */
        const CONTENT_TYPES = {
          jm_cat_other: "other",
          jm_cat_culture: "culture",
          jm_cat_politics: "politics",
          jm_cat_art: "art",
          jm_cat_tech: "technology",
          jm_cat_social: "social",
          jm_cat_comedy: "comedy",
          jm_cat_news: "news",
          jm_cat_health: "health",
          jm_cat_sport: "sports",
        };

        /* Laravel's field names -> the input the modal calls that field, so a
           rejected value is marked under its own box. The socials rows are
           indexed (socials.0.url) and handled per row in showSubmitError. */
        const ERROR_FIELDS = {
          full_name: "fullname",
          phone: "phone",
          country_code: "phone",
          email: "email",
          content_types: "followers",
          followers_count: "followers",
          content_bio: "about",
          notes: "notes",
        };

        /* The row's <option> for X is value="x" — the legacy JS keys the row
           icon off it (fa-x-twitter) so it must not change — but the API's
           platform list still calls it "twitter" and rejects "x". */
        const PLATFORMS = { x: "twitter" };

        /* What the markup ships with — read once, before anyone has touched
           the modal, so a sent application can be cleared back to it. */
        const INITIAL_CHIPS = Array.from(
          overlay.querySelectorAll(".join-chip.is-selected"),
        ).map((chip) => chip.dataset.i18n);
        const INITIAL_SOCIAL_ROWS =
          overlay.querySelectorAll(".join-social-row").length;

        /* The rows behind the `socials` array of the last submission, in the
           order the API sees them. */
        let sentSocialRows = [];

        function collectJoinForm() {
          const val = function (name) {
            const el = form.querySelector('[name="' + name + '"]');
            return el ? el.value.trim() : "";
          };

          const contentTypes = Array.from(
            overlay.querySelectorAll(".join-chip.is-selected"),
          ).map((chip) => CONTENT_TYPES[chip.dataset.i18n] || chip.dataset.i18n);

          const socials = [];
          /* An empty row is not sent, so socials[0] is not necessarily the
             first row on screen — and the API names a rejected link by its
             index in what it received (socials.0.url). Keep the rows in the
             same order, so showSubmitError can find the box to mark. */
          sentSocialRows = [];
          overlay.querySelectorAll(".join-social-row").forEach(function (row) {
            const link = row.querySelector(".join-link-wrap input");
            const select = row.querySelector(".join-platform-select");
            const url = link ? link.value.trim() : "";
            if (!url) return;
            const platform = select ? select.value : "";
            socials.push({ platform: PLATFORMS[platform] || platform, url: url });
            sentSocialRows.push(row);
          });

          return {
            full_name: val("fullname"),
            phone: val("phone"),
            country_code:
              (countryCode && countryCode.textContent.trim()) ||
              (countrySelect && countrySelect.value) ||
              "+970",
            email: val("email"),
            content_types: contentTypes,
            followers_count: Number(val("followers")) || 0,
            content_bio: val("about"),
            socials: socials,
            notes: val("notes"),
          };
        }

        let sending = false;
        /* Set once the API has accepted the application: the footer is gone
           and the success pane is up, so the button must not be re-labelled. */
        let sent = false;

        /* The button locks while the request is in flight — a double click was
           two applications otherwise. Everything else about the modal stays
           where it is: only the last step's "تسليم الطلب" now talks to the
           API, and the success pane is shown when the API says so rather than
           unconditionally. */
        function submit() {
          if (sending) return;
          sending = true;
          nextBtn.disabled = true;
          nextLabel.textContent = t("jm_sending", "جاري الإرسال...");
          clearSubmitError();

          import("./api/creators")
            .then((mod) => mod.submitCreatorJoin(collectJoinForm()))
            .then(function (result) {
              showJoinSuccess(result && result.message);
            })
            .catch(function (err) {
              showSubmitError(err);
            })
            .then(function () {
              sending = false;
              nextBtn.disabled = false;
              /* Re-label from the step now on screen rather than restoring
                 what the button said before: a rejection may have walked the
                 modal back to the step the API complained about, where it
                 reads "التالي" and not "تسليم الطلب". */
              if (!sent) render();
            });
        }

        function showJoinSuccess(message) {
          sent = true;
          const text = overlay.querySelector(".join-success-text");
          if (text && message) {
            /* the server's wording wins over the built-in copy — and loses the
               i18n key with it, so applyTranslations() can't overwrite what
               the server just said on the next language toggle */
            text.removeAttribute("data-i18n");
            text.textContent = apiMessage(message) || message;
          }
          showPane("done");
          steps.forEach((s) => s.classList.add("is-done"));
          document.querySelector(".join-modal-foot").style.display = "none";
          resetJoinForm();
        }

        /* The application is in, so the modal must not still be holding it:
           the next visitor to open it starts on an empty step 1.

           form.reset() covers every input, textarea and <select> — including
           the ones in rows added at runtime — but not the chips (they are
           buttons), not the rows themselves, and not the two custom dropdowns
           built over the country and platform selects. Those are re-synced by
           dispatching the change event they already listen for, rather than by
           reaching into the markup they generate. */
        function resetJoinForm() {
          form.reset();

          Array.from(socialList.querySelectorAll(".join-social-row")).forEach(
            function (row, index) {
              if (index >= INITIAL_SOCIAL_ROWS) {
                row.remove();
                return;
              }
              const select = row.querySelector(".join-platform-select");
              if (select) select.dispatchEvent(new Event("change"));
            },
          );

          overlay.querySelectorAll(".join-chip").forEach(function (chip) {
            chip.classList.toggle(
              "is-selected",
              INITIAL_CHIPS.indexOf(chip.dataset.i18n) !== -1,
            );
          });

          if (countrySelect) countrySelect.dispatchEvent(new Event("change"));

          overlay.querySelectorAll(".join-field").forEach(clearError);
          clearSubmitError();
        }

        /* Everything the last attempt left behind: the message under each box
           it named, and the one under the list of links. */
        function clearSubmitError() {
          overlay.querySelectorAll(".join-field.has-error").forEach(clearError);
          overlay
            .querySelectorAll(".join-social-error")
            .forEach((el) => el.remove());
          overlay
            .querySelectorAll(".join-social-row.has-error")
            .forEach((row) => row.classList.remove("has-error"));
        }

        /* Whatever the API rejected, said under the box it is about — the
           same red line the modal's own validation uses. Each message goes
           through apiMessage(), so an Arabic server string is shown in English
           when the site is (see lib/api/messages). */
        function showSubmitError(err) {
          const errors = (err && err.errors) || {};
          clearSubmitError();

          /* Every message the API returns goes under the box it is about —
             the same place the modal's own validation puts "… مطلوب". What
             it says about a link (socials.0.url) goes under the whole list of
             them, below the last row, whatever the number of rows. */
          const linkMessages = [];

          Object.keys(errors).forEach(function (key) {
            const message = apiMessage(errors[key][0]) || errors[key][0];

            const social = /^socials\.(\d+)\./.exec(key);
            if (social) {
              /* the row that link was typed into — not the index-th row on
                 screen, which the empty rows shift */
              const index = Number(social[1]);
              const row =
                sentSocialRows[index] ||
                overlay.querySelectorAll(".join-social-row")[index];
              if (row && row.isConnected) row.classList.add("has-error");
              if (linkMessages.indexOf(message) === -1) linkMessages.push(message);
              return;
            }

            const name = ERROR_FIELDS[key];
            const input = name && form.querySelector('[name="' + name + '"]');
            if (input) setError(fieldOf(input), message);
          });

          /* one block under the whole list, below the last row, whatever the
             number of rows and however many of them were rejected */
          if (linkMessages.length) {
            const line = document.createElement("span");
            line.className = "join-field-error join-social-error";
            linkMessages.forEach(function (message, index) {
              if (index) line.appendChild(document.createElement("br"));
              line.appendChild(document.createTextNode(message));
            });
            socialList.appendChild(line);
          }

          /* Nothing was marked: the failure names no field the modal shows —
             an offline request, a 500, a rejection of the submission as a
             whole. Say it under the last box of the step on screen, which is
             where the reader is looking. */
          if (!linkMessages.length && !overlay.querySelector(".join-field.has-error")) {
            const pane = overlay.querySelector(
              '.join-pane[data-pane="' + TOTAL + '"]',
            );
            const fields = pane ? pane.querySelectorAll(".join-field") : [];
            setError(
              fields[fields.length - 1],
              apiMessage(err && err.message) ||
                t("jm_err_submit", "تعذر إرسال الطلب. حاول مرة أخرى."),
            );
          }

          /* Every message is now under the box it is about — but the panes are
             display:none off the active step, so one about step 1 ("رقم الهاتف
             مطلوب") was written behind step 3, which is where submitting
             happens: the request ended and the modal said nothing.

             validateStep does not make that unreachable — it only guards what
             the modal itself checks, and the API rejects more than that (a
             phone the format check refuses, an email already applied with).
             So walk back to the earliest step it complained about. */
          const errorPanes = Array.from(
            overlay.querySelectorAll(".join-field.has-error, .join-social-error"),
          )
            .map(function (el) {
              const pane = el.closest(".join-pane");
              return pane ? Number(pane.dataset.pane) : NaN;
            })
            .filter(function (n) {
              return n >= 1;
            });

          if (!errorPanes.length) return;

          const firstPane = Math.min.apply(null, errorPanes);
          if (firstPane !== current) {
            current = firstPane;
            render();
          }

          const selector =
            '.join-pane[data-pane="' + current + '"] .join-field.has-error, ' +
            '.join-pane[data-pane="' + current + '"] .join-social-error';
          const box = overlay.querySelector(selector);
          if (box) box.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }



        function goPrev() {
          if (current > 1) {
            current -= 1;
            render();
          } else {
            closeModal();
          }
        }

        /* Delegated instead of bound to #openJoinModal directly: on the home
           page that button lives in the JoinUs banner, which is rendered only
           once GET /pages/home has answered — long after this one-time init
           runs, so a direct binding would find nothing to bind to. /creators
           and /team, where the banner is static, are unaffected. */
        document.addEventListener("click", function (e) {
          const target = e.target;
          if (!target || !target.closest) return;
          if (!target.closest("#openJoinModal")) return;
          e.preventDefault();
          document.querySelector(".join-modal-foot").style.display = "";
          openModal();
        });
        closeBtn.addEventListener("click", closeModal);
        nextBtn.addEventListener("click", goNext);
        prevBtn.addEventListener("click", goPrev);

        overlay.addEventListener("click", function (e) {
          if (e.target === overlay) closeModal();
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && overlay.classList.contains("is-open"))
            closeModal();
        });

        // Country dial-code custom dropdown (flag + name + code, searchable)
        const countrySelect = overlay.querySelector(".join-country-select");
        const countryFlag = overlay.querySelector("[data-country-flag]");
        const countryCode = overlay.querySelector("[data-country-code]");
        const countryBox = overlay.querySelector(".join-country-box");
        if (countrySelect && countryFlag && countryCode && countryBox) {
          // n: Arabic name, d: dial code, c: ISO2 flag code
          const COUNTRIES = [
            { n: "فلسطين", e: "Palestine", d: "+970", c: "ps" },
            { n: "مصر", e: "Egypt", d: "+20", c: "eg" },
            { n: "الأردن", e: "Jordan", d: "+962", c: "jo" },
            { n: "السعودية", e: "Saudi Arabia", d: "+966", c: "sa" },
            { n: "الإمارات", e: "United Arab Emirates", d: "+971", c: "ae" },
            { n: "قطر", e: "Qatar", d: "+974", c: "qa" },
            { n: "الكويت", e: "Kuwait", d: "+965", c: "kw" },
            { n: "البحرين", e: "Bahrain", d: "+973", c: "bh" },
            { n: "عُمان", e: "Oman", d: "+968", c: "om" },
            { n: "اليمن", e: "Yemen", d: "+967", c: "ye" },
            { n: "العراق", e: "Iraq", d: "+964", c: "iq" },
            { n: "سوريا", e: "Syria", d: "+963", c: "sy" },
            { n: "لبنان", e: "Lebanon", d: "+961", c: "lb" },
            { n: "ليبيا", e: "Libya", d: "+218", c: "ly" },
            { n: "تونس", e: "Tunisia", d: "+216", c: "tn" },
            { n: "الجزائر", e: "Algeria", d: "+213", c: "dz" },
            { n: "المغرب", e: "Morocco", d: "+212", c: "ma" },
            { n: "السودان", e: "Sudan", d: "+249", c: "sd" },
            { n: "موريتانيا", e: "Mauritania", d: "+222", c: "mr" },
            { n: "الصومال", e: "Somalia", d: "+252", c: "so" },
            { n: "جيبوتي", e: "Djibouti", d: "+253", c: "dj" },
            { n: "جزر القمر", e: "Comoros", d: "+269", c: "km" },
            { n: "تركيا", e: "Turkey", d: "+90", c: "tr" },
            { n: "أفغانستان", e: "Afghanistan", d: "+93", c: "af" },
            { n: "ألبانيا", e: "Albania", d: "+355", c: "al" },
            { n: "أندورا", e: "Andorra", d: "+376", c: "ad" },
            { n: "أنغولا", e: "Angola", d: "+244", c: "ao" },
            { n: "أنتيغوا وباربودا", e: "Antigua and Barbuda", d: "+1268", c: "ag" },
            { n: "الأرجنتين", e: "Argentina", d: "+54", c: "ar" },
            { n: "أرمينيا", e: "Armenia", d: "+374", c: "am" },
            { n: "أستراليا", e: "Australia", d: "+61", c: "au" },
            { n: "النمسا", e: "Austria", d: "+43", c: "at" },
            { n: "أذربيجان", e: "Azerbaijan", d: "+994", c: "az" },
            { n: "الباهاما", e: "Bahamas", d: "+1242", c: "bs" },
            { n: "بنغلاديش", e: "Bangladesh", d: "+880", c: "bd" },
            { n: "بربادوس", e: "Barbados", d: "+1246", c: "bb" },
            { n: "بيلاروسيا", e: "Belarus", d: "+375", c: "by" },
            { n: "بلجيكا", e: "Belgium", d: "+32", c: "be" },
            { n: "بليز", e: "Belize", d: "+501", c: "bz" },
            { n: "بنين", e: "Benin", d: "+229", c: "bj" },
            { n: "بوتان", e: "Bhutan", d: "+975", c: "bt" },
            { n: "بوليفيا", e: "Bolivia", d: "+591", c: "bo" },
            { n: "البوسنة والهرسك", e: "Bosnia and Herzegovina", d: "+387", c: "ba" },
            { n: "بوتسوانا", e: "Botswana", d: "+267", c: "bw" },
            { n: "البرازيل", e: "Brazil", d: "+55", c: "br" },
            { n: "بروناي", e: "Brunei", d: "+673", c: "bn" },
            { n: "بلغاريا", e: "Bulgaria", d: "+359", c: "bg" },
            { n: "بوركينا فاسو", e: "Burkina Faso", d: "+226", c: "bf" },
            { n: "بوروندي", e: "Burundi", d: "+257", c: "bi" },
            { n: "كمبوديا", e: "Cambodia", d: "+855", c: "kh" },
            { n: "الكاميرون", e: "Cameroon", d: "+237", c: "cm" },
            { n: "كندا", e: "Canada", d: "+1", c: "ca" },
            { n: "الرأس الأخضر", e: "Cape Verde", d: "+238", c: "cv" },
            { n: "أفريقيا الوسطى", e: "Central African Republic", d: "+236", c: "cf" },
            { n: "تشاد", e: "Chad", d: "+235", c: "td" },
            { n: "تشيلي", e: "Chile", d: "+56", c: "cl" },
            { n: "الصين", e: "China", d: "+86", c: "cn" },
            { n: "كولومبيا", e: "Colombia", d: "+57", c: "co" },
            { n: "الكونغو الديمقراطية", e: "DR Congo", d: "+243", c: "cd" },
            { n: "الكونغو", e: "Congo", d: "+242", c: "cg" },
            { n: "كوستاريكا", e: "Costa Rica", d: "+506", c: "cr" },
            { n: "ساحل العاج", e: "Côte d'Ivoire", d: "+225", c: "ci" },
            { n: "كرواتيا", e: "Croatia", d: "+385", c: "hr" },
            { n: "كوبا", e: "Cuba", d: "+53", c: "cu" },
            { n: "قبرص", e: "Cyprus", d: "+357", c: "cy" },
            { n: "التشيك", e: "Czechia", d: "+420", c: "cz" },
            { n: "الدنمارك", e: "Denmark", d: "+45", c: "dk" },
            { n: "دومينيكا", e: "Dominica", d: "+1767", c: "dm" },
            { n: "جمهورية الدومينيكان", e: "Dominican Republic", d: "+1809", c: "do" },
            { n: "الإكوادور", e: "Ecuador", d: "+593", c: "ec" },
            { n: "السلفادور", e: "El Salvador", d: "+503", c: "sv" },
            { n: "غينيا الاستوائية", e: "Equatorial Guinea", d: "+240", c: "gq" },
            { n: "إريتريا", e: "Eritrea", d: "+291", c: "er" },
            { n: "إستونيا", e: "Estonia", d: "+372", c: "ee" },
            { n: "إسواتيني", e: "Eswatini", d: "+268", c: "sz" },
            { n: "إثيوبيا", e: "Ethiopia", d: "+251", c: "et" },
            { n: "فيجي", e: "Fiji", d: "+679", c: "fj" },
            { n: "فنلندا", e: "Finland", d: "+358", c: "fi" },
            { n: "فرنسا", e: "France", d: "+33", c: "fr" },
            { n: "الغابون", e: "Gabon", d: "+241", c: "ga" },
            { n: "غامبيا", e: "Gambia", d: "+220", c: "gm" },
            { n: "جورجيا", e: "Georgia", d: "+995", c: "ge" },
            { n: "ألمانيا", e: "Germany", d: "+49", c: "de" },
            { n: "غانا", e: "Ghana", d: "+233", c: "gh" },
            { n: "اليونان", e: "Greece", d: "+30", c: "gr" },
            { n: "غرينادا", e: "Grenada", d: "+1473", c: "gd" },
            { n: "غواتيمالا", e: "Guatemala", d: "+502", c: "gt" },
            { n: "غينيا", e: "Guinea", d: "+224", c: "gn" },
            { n: "غينيا بيساو", e: "Guinea-Bissau", d: "+245", c: "gw" },
            { n: "غيانا", e: "Guyana", d: "+592", c: "gy" },
            { n: "هايتي", e: "Haiti", d: "+509", c: "ht" },
            { n: "هندوراس", e: "Honduras", d: "+504", c: "hn" },
            { n: "المجر", e: "Hungary", d: "+36", c: "hu" },
            { n: "آيسلندا", e: "Iceland", d: "+354", c: "is" },
            { n: "الهند", e: "India", d: "+91", c: "in" },
            { n: "إندونيسيا", e: "Indonesia", d: "+62", c: "id" },
            { n: "إيران", e: "Iran", d: "+98", c: "ir" },
            { n: "أيرلندا", e: "Ireland", d: "+353", c: "ie" },
            { n: "إيطاليا", e: "Italy", d: "+39", c: "it" },
            { n: "جامايكا", e: "Jamaica", d: "+1876", c: "jm" },
            { n: "اليابان", e: "Japan", d: "+81", c: "jp" },
            { n: "كازاخستان", e: "Kazakhstan", d: "+7", c: "kz" },
            { n: "كينيا", e: "Kenya", d: "+254", c: "ke" },
            { n: "كيريباتي", e: "Kiribati", d: "+686", c: "ki" },
            { n: "كوريا الشمالية", e: "North Korea", d: "+850", c: "kp" },
            { n: "كوريا الجنوبية", e: "South Korea", d: "+82", c: "kr" },
            { n: "قيرغيزستان", e: "Kyrgyzstan", d: "+996", c: "kg" },
            { n: "لاوس", e: "Laos", d: "+856", c: "la" },
            { n: "لاتفيا", e: "Latvia", d: "+371", c: "lv" },
            { n: "ليسوتو", e: "Lesotho", d: "+266", c: "ls" },
            { n: "ليبيريا", e: "Liberia", d: "+231", c: "lr" },
            { n: "ليختنشتاين", e: "Liechtenstein", d: "+423", c: "li" },
            { n: "ليتوانيا", e: "Lithuania", d: "+370", c: "lt" },
            { n: "لوكسمبورغ", e: "Luxembourg", d: "+352", c: "lu" },
            { n: "مدغشقر", e: "Madagascar", d: "+261", c: "mg" },
            { n: "مالاوي", e: "Malawi", d: "+265", c: "mw" },
            { n: "ماليزيا", e: "Malaysia", d: "+60", c: "my" },
            { n: "المالديف", e: "Maldives", d: "+960", c: "mv" },
            { n: "مالي", e: "Mali", d: "+223", c: "ml" },
            { n: "مالطا", e: "Malta", d: "+356", c: "mt" },
            { n: "جزر مارشال", e: "Marshall Islands", d: "+692", c: "mh" },
            { n: "موريشيوس", e: "Mauritius", d: "+230", c: "mu" },
            { n: "المكسيك", e: "Mexico", d: "+52", c: "mx" },
            { n: "ميكرونيزيا", e: "Micronesia", d: "+691", c: "fm" },
            { n: "مولدوفا", e: "Moldova", d: "+373", c: "md" },
            { n: "موناكو", e: "Monaco", d: "+377", c: "mc" },
            { n: "منغوليا", e: "Mongolia", d: "+976", c: "mn" },
            { n: "الجبل الأسود", e: "Montenegro", d: "+382", c: "me" },
            { n: "موزمبيق", e: "Mozambique", d: "+258", c: "mz" },
            { n: "ميانمار", e: "Myanmar", d: "+95", c: "mm" },
            { n: "ناميبيا", e: "Namibia", d: "+264", c: "na" },
            { n: "ناورو", e: "Nauru", d: "+674", c: "nr" },
            { n: "نيبال", e: "Nepal", d: "+977", c: "np" },
            { n: "هولندا", e: "Netherlands", d: "+31", c: "nl" },
            { n: "نيوزيلندا", e: "New Zealand", d: "+64", c: "nz" },
            { n: "نيكاراغوا", e: "Nicaragua", d: "+505", c: "ni" },
            { n: "النيجر", e: "Niger", d: "+227", c: "ne" },
            { n: "نيجيريا", e: "Nigeria", d: "+234", c: "ng" },
            { n: "مقدونيا الشمالية", e: "North Macedonia", d: "+389", c: "mk" },
            { n: "النرويج", e: "Norway", d: "+47", c: "no" },
            { n: "باكستان", e: "Pakistan", d: "+92", c: "pk" },
            { n: "بالاو", e: "Palau", d: "+680", c: "pw" },
            { n: "بنما", e: "Panama", d: "+507", c: "pa" },
            { n: "بابوا غينيا الجديدة", e: "Papua New Guinea", d: "+675", c: "pg" },
            { n: "باراغواي", e: "Paraguay", d: "+595", c: "py" },
            { n: "بيرو", e: "Peru", d: "+51", c: "pe" },
            { n: "الفلبين", e: "Philippines", d: "+63", c: "ph" },
            { n: "بولندا", e: "Poland", d: "+48", c: "pl" },
            { n: "البرتغال", e: "Portugal", d: "+351", c: "pt" },
            { n: "رومانيا", e: "Romania", d: "+40", c: "ro" },
            { n: "روسيا", e: "Russia", d: "+7", c: "ru" },
            { n: "رواندا", e: "Rwanda", d: "+250", c: "rw" },
            { n: "سانت كيتس ونيفيس", e: "Saint Kitts and Nevis", d: "+1869", c: "kn" },
            { n: "سانت لوسيا", e: "Saint Lucia", d: "+1758", c: "lc" },
            { n: "سانت فينسنت والغرينادين", e: "Saint Vincent and the Grenadines", d: "+1784", c: "vc" },
            { n: "ساموا", e: "Samoa", d: "+685", c: "ws" },
            { n: "سان مارينو", e: "San Marino", d: "+378", c: "sm" },
            { n: "ساو تومي وبرينسيبي", e: "São Tomé and Príncipe", d: "+239", c: "st" },
            { n: "السنغال", e: "Senegal", d: "+221", c: "sn" },
            { n: "صربيا", e: "Serbia", d: "+381", c: "rs" },
            { n: "سيشل", e: "Seychelles", d: "+248", c: "sc" },
            { n: "سيراليون", e: "Sierra Leone", d: "+232", c: "sl" },
            { n: "سنغافورة", e: "Singapore", d: "+65", c: "sg" },
            { n: "سلوفاكيا", e: "Slovakia", d: "+421", c: "sk" },
            { n: "سلوفينيا", e: "Slovenia", d: "+386", c: "si" },
            { n: "جزر سليمان", e: "Solomon Islands", d: "+677", c: "sb" },
            { n: "جنوب أفريقيا", e: "South Africa", d: "+27", c: "za" },
            { n: "جنوب السودان", e: "South Sudan", d: "+211", c: "ss" },
            { n: "إسبانيا", e: "Spain", d: "+34", c: "es" },
            { n: "سريلانكا", e: "Sri Lanka", d: "+94", c: "lk" },
            { n: "سورينام", e: "Suriname", d: "+597", c: "sr" },
            { n: "السويد", e: "Sweden", d: "+46", c: "se" },
            { n: "سويسرا", e: "Switzerland", d: "+41", c: "ch" },
            { n: "تايوان", e: "Taiwan", d: "+886", c: "tw" },
            { n: "طاجيكستان", e: "Tajikistan", d: "+992", c: "tj" },
            { n: "تنزانيا", e: "Tanzania", d: "+255", c: "tz" },
            { n: "تايلاند", e: "Thailand", d: "+66", c: "th" },
            { n: "تيمور الشرقية", e: "Timor-Leste", d: "+670", c: "tl" },
            { n: "توغو", e: "Togo", d: "+228", c: "tg" },
            { n: "تونغا", e: "Tonga", d: "+676", c: "to" },
            { n: "ترينيداد وتوباغو", e: "Trinidad and Tobago", d: "+1868", c: "tt" },
            { n: "تركمانستان", e: "Turkmenistan", d: "+993", c: "tm" },
            { n: "توفالو", e: "Tuvalu", d: "+688", c: "tv" },
            { n: "أوغندا", e: "Uganda", d: "+256", c: "ug" },
            { n: "أوكرانيا", e: "Ukraine", d: "+380", c: "ua" },
            { n: "المملكة المتحدة", e: "United Kingdom", d: "+44", c: "gb" },
            { n: "الولايات المتحدة", e: "United States", d: "+1", c: "us" },
            { n: "أوروغواي", e: "Uruguay", d: "+598", c: "uy" },
            { n: "أوزبكستان", e: "Uzbekistan", d: "+998", c: "uz" },
            { n: "فانواتو", e: "Vanuatu", d: "+678", c: "vu" },
            { n: "الفاتيكان", e: "Vatican City", d: "+379", c: "va" },
            { n: "فنزويلا", e: "Venezuela", d: "+58", c: "ve" },
            { n: "فيتنام", e: "Vietnam", d: "+84", c: "vn" },
            { n: "زامبيا", e: "Zambia", d: "+260", c: "zm" },
            { n: "زيمبابوي", e: "Zimbabwe", d: "+263", c: "zw" },
          ];

          let currentIndex = 0;

          // Populate the (hidden) native select for form submission
          countrySelect.innerHTML = "";
          COUNTRIES.forEach((co) => {
            const o = document.createElement("option");
            o.value = co.d;
            o.setAttribute("data-flag", co.c);
            o.textContent = co.d;
            countrySelect.appendChild(o);
          });

          // Build the custom menu
          const menu = document.createElement("div");
          menu.className = "join-country-menu";

          const searchWrap = document.createElement("div");
          searchWrap.className = "join-country-search";
          const search = document.createElement("input");
          search.type = "text";
          search.placeholder = t("jm_country_search", "ابحث عن دولة أو رمز…");
          searchWrap.appendChild(search);
          menu.appendChild(searchWrap);

          const list = document.createElement("div");
          list.className = "join-country-list";
          menu.appendChild(list);
          countryBox.appendChild(menu);

          function countryName(co) {
            return getLang() === "en" ? co.e : co.n;
          }

          function renderList(filter) {
            const q = (filter || "").trim().toLowerCase();
            list.innerHTML = "";
            COUNTRIES.forEach((co, i) => {
              if (
                q &&
                co.n.toLowerCase().indexOf(q) === -1 &&
                co.e.toLowerCase().indexOf(q) === -1 &&
                co.d.toLowerCase().indexOf(q) === -1 &&
                co.c.toLowerCase().indexOf(q) === -1
              )
                return;
              const item = document.createElement("button");
              item.type = "button";
              item.className =
                "join-country-option" + (i === currentIndex ? " is-selected" : "");
              item.dataset.index = i;
              item.innerHTML =
                '<span class="fi fi-' +
                co.c +
                ' join-country-option-flag"></span>' +
                '<span class="join-country-option-name">' +
                countryName(co) +
                "</span>" +
                '<span class="join-country-option-code">' +
                co.d +
                "</span>";
              item.addEventListener("click", function (e) {
                e.stopPropagation();
                selectCountry(i);
                closeMenu();
              });
              list.appendChild(item);
            });
          }

          function applyCountryLang() {
            // Menu reads RTL for Arabic, LTR for English
            menu.style.direction = getLang() === "en" ? "ltr" : "rtl";
            search.placeholder = t("jm_country_search", "ابحث عن دولة أو رمز…");
            if (countryBox.classList.contains("is-open")) renderList(search.value);
          }

          function selectCountry(i) {
            currentIndex = i;
            const co = COUNTRIES[i];
            countrySelect.value = co.d;
            countryCode.textContent = co.d;
            countryFlag.className = "fi fi-" + co.c + " join-country-flag";
          }

          function openMenu() {
            countryBox.classList.add("is-open");
            renderList("");
            search.value = "";
            search.focus();
          }
          function closeMenu() {
            countryBox.classList.remove("is-open");
          }

          countryBox.addEventListener("click", function (e) {
            if (e.target.closest(".join-country-menu")) return;
            countryBox.classList.contains("is-open") ? closeMenu() : openMenu();
          });
          search.addEventListener("input", function () {
            renderList(search.value);
          });
          document.addEventListener("click", function (e) {
            if (!e.target.closest(".join-country-box")) closeMenu();
          });

          selectCountry(0);
          applyCountryLang();

          // Re-render dropdowns when the site language is toggled
          document.addEventListener("langchange", function () {
            applyCountryLang();
            refreshPlatformLang();
          });
        }

        // Content-type chips (multi-select)
        overlay.querySelectorAll(".join-chip").forEach((chip) => {
          chip.addEventListener("click", function () {
            chip.classList.toggle("is-selected");
            clearError(fieldOf(chip));
          });
        });

        // Clear a field's error as soon as the user edits it
        if (form) {
          form.addEventListener("input", function (e) {
            clearError(fieldOf(e.target));
          });
        }

        // Current UI language ("ar" | "en")
        function getLang() {
          try {
            return (
              (window.localStorage && localStorage.getItem("lang")) ||
              document.documentElement.getAttribute("lang") ||
              "ar"
            );
          } catch (e) {
            return "ar";
          }
        }

        // Bilingual platform names (keyed by <option> value)
        const PLATFORM_LABELS = {
          instagram: { ar: "انستقرام", en: "Instagram" },
          facebook: { ar: "فيسبوك", en: "Facebook" },
          x: { ar: "اكس (تويتر)", en: "X (Twitter)" },
          tiktok: { ar: "تيك توك", en: "TikTok" },
          youtube: { ar: "يوتيوب", en: "YouTube" },
          linkedin: { ar: "لينكدإن", en: "LinkedIn" },
        };
        function platformLabel(value) {
          const m = PLATFORM_LABELS[value];
          if (!m) return value;
          return getLang() === "en" ? m.en : m.ar;
        }
        // Re-label every platform dropdown (trigger + menu) for the current lang
        function refreshPlatformLang() {
          overlay.querySelectorAll(".join-platform").forEach((wrap) => {
            const sel = wrap.querySelector(".join-platform-select");
            const label = wrap.querySelector(".join-platform-label");
            if (sel && label) {
              const opt = sel.options[sel.selectedIndex];
              label.textContent = platformLabel(opt ? opt.value : sel.value);
            }
            wrap.querySelectorAll(".join-platform-option").forEach((opt) => {
              const lbl = opt.querySelector(".join-platform-option-label");
              if (lbl) lbl.textContent = platformLabel(opt.dataset.value);
            });
          });
        }

        // Build a custom, icon-rich dropdown on top of the native <select>
        function bindPlatformSelect(row) {
          const wrap = row.querySelector(".join-platform");
          const select = row.querySelector(".join-platform-select");
          const icon = row.querySelector("[data-platform-icon]");
          if (!wrap || !select || !icon) return;
          if (wrap.dataset.enhanced === "1") return; // avoid double init
          wrap.dataset.enhanced = "1";

          const options = Array.from(select.options);

          // Visible label for the current selection
          const label = document.createElement("span");
          label.className = "join-platform-label";
          icon.insertAdjacentElement("afterend", label);

          // Custom menu mirroring the select options, each with its icon
          const menu = document.createElement("div");
          menu.className = "join-platform-menu";
          menu.setAttribute("role", "listbox");
          options.forEach((opt, i) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "join-platform-option";
            item.setAttribute("role", "option");
            item.dataset.value = opt.value;
            item.dataset.index = i;
            item.innerHTML =
              '<i class="fa-brands ' +
              opt.getAttribute("data-icon") +
              ' join-platform-option-icon"></i>' +
              '<span class="join-platform-option-label">' +
              platformLabel(opt.value) +
              "</span>" +
              '<i class="fa-solid fa-check join-platform-option-check"></i>';
            item.addEventListener("click", function (e) {
              e.stopPropagation();
              select.selectedIndex = i;
              select.dispatchEvent(new Event("change", { bubbles: true }));
              close();
            });
            menu.appendChild(item);
          });
          wrap.appendChild(menu);

          function sync() {
            const opt = options[select.selectedIndex] || options[0];
            icon.className =
              "fa-brands " + opt.getAttribute("data-icon") + " join-platform-icon";
            label.textContent = platformLabel(opt.value);
            wrap.dataset.value = opt.value;
            menu.querySelectorAll(".join-platform-option").forEach((it) => {
              it.classList.toggle(
                "is-selected",
                Number(it.dataset.index) === select.selectedIndex
              );
            });
          }

          function open() {
            document
              .querySelectorAll(".join-platform.is-open")
              .forEach((w) => w !== wrap && w.classList.remove("is-open"));
            wrap.classList.add("is-open");
          }
          function close() {
            wrap.classList.remove("is-open");
          }

          wrap.addEventListener("click", function (e) {
            if (e.target.closest(".join-platform-menu")) return;
            wrap.classList.contains("is-open") ? close() : open();
          });

          select.addEventListener("change", sync);
          sync();
        }

        const socialList = document.getElementById("joinSocialList");
        const addBtn = document.getElementById("joinAddPlatform");

        function bindRow(row) {
          bindPlatformSelect(row);
          const del = row.querySelector(".join-row-del");
          if (del) {
            del.addEventListener("click", function () {
              if (socialList.querySelectorAll(".join-social-row").length > 1) {
                row.remove();
              } else {
                row.querySelector("input").value = "";
              }
            });
          }
        }

        socialList
          .querySelectorAll(".join-social-row")
          .forEach((row) => bindRow(row));

        // Close any open platform dropdown when clicking elsewhere
        document.addEventListener("click", function (e) {
          if (!e.target.closest(".join-platform")) {
            socialList
              .querySelectorAll(".join-platform.is-open")
              .forEach((w) => w.classList.remove("is-open"));
          }
        });

        if (addBtn) {
          addBtn.addEventListener("click", function () {
            const first = socialList.querySelector(".join-social-row");
            const clone = first.cloneNode(true);
            const input = clone.querySelector("input");
            input.value = "";
            input.setAttribute("placeholder", "رابط الحساب");
            // Strip the generated dropdown DOM so it re-initializes fresh
            const cWrap = clone.querySelector(".join-platform");
            cWrap.classList.remove("is-open");
            cWrap.removeAttribute("data-enhanced");
            cWrap.removeAttribute("data-value");
            clone
              .querySelectorAll(".join-platform-label, .join-platform-menu")
              .forEach((el) => el.remove());
            const sel = clone.querySelector(".join-platform-select");
            sel.selectedIndex = 0;
            const icon = clone.querySelector("[data-platform-icon]");
            icon.className = "fa-brands fa-instagram join-platform-icon";
            socialList.appendChild(clone);
            bindRow(clone);
          });
        }
      })();
    
}
