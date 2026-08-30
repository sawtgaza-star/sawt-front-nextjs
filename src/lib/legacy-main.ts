/* Ported from legacy assets/js/script.js — logic kept verbatim, adapted for Next.js */
/* eslint-disable */
// @ts-nocheck
"use client";
import { t, translations } from "./translations";

/* Animated stat counters (home hero "الشريط الإحصائي").
   Exported so LegacyInit can replay it on every visit to the home page:
   initMainScripts() is one-time-guarded, so a client-side navigation back to
   `/` remounts the markup but would otherwise leave the numbers static. */
export function runCounters() {
  // جلب كل العناصر التي تحمل كلاس counter
  const counters = document.querySelectorAll(".counter");

  counters.forEach((element) => {
    // ألغِ أي عدّاد ما زال يعمل على نفس العنصر (تنقّل سريع ذهاباً وإياباً)
    if ((element as any).__counterTimer) {
      clearInterval((element as any).__counterTimer);
      (element as any).__counterTimer = null;
    }

    // نبحث عن العقدة النصية التي تحتوي على الرقم، حتى لا نمسح أي عنصر
    // فرعي مثل span الخاص بكلمة "ألف"
    const textNode = [...element.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE && /\d/.test(node.nodeValue)
    );
    if (!textNode) return;

    // نحفظ القيمة الأصلية حتى لا تبدأ الإعادة من رقم نصف مُحرّك
    if (!element.dataset.counterFrom) {
      element.dataset.counterFrom = textNode.nodeValue;
    }

    // نفصل ما قبل الرقم (مثل "+") والرقم وما بعده لنحافظ على مكان كل جزء
    const match = element.dataset.counterFrom.match(/(\D*)(\d+)(\D*)/);
    if (!match) return;

    const prefix = match[1];
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3];

    let currentNumber = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / targetNumber), 20);

    (element as any).__counterTimer = setInterval(() => {
      currentNumber += 1;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval((element as any).__counterTimer);
        (element as any).__counterTimer = null;
      }
      textNode.nodeValue = prefix + currentNumber + suffix;
    }, stepTime);
  });
}

/* Re-render the reviews comments list. initMainScripts is one-time-guarded, so
   on client-side navigation back to home its __ready() pass can't refill the
   freshly-mounted #commentsList — LegacyInit replays this instead. */
/* إعادة ربط عمود الريلز (السحب بالماوس + تبديل التعليقات + شريط التقدّم) بعد
   كل تركيب جديد للصفحة الرئيسية — initMainScripts محروسة بمرة واحدة. */
export function initReels() {
  const setup = (window as any).__setupReels;
  if (typeof setup === "function") setup();
}

export function replayComments() {
  if (!document.getElementById("commentsList")) return;
  // الحاوية تعود إلى أعلى عند إعادة التركيب، فنعيد الريل النشط إلى الأول
  const setReel = (window as any).setActiveReel;
  if (typeof setReel === "function") {
    setReel(0, true);
    return;
  }
  const render = (window as any).renderComments;
  if (typeof render === "function") render();
}

/* Group the top contact bar (nav-face) + navbar into one .header-bar wrapper.
   The header does NOT follow the scroll: it sits at the top of the document and
   leaves the viewport with the rest of the page, so there is no pinning, no
   spacer and no scroll listener here anymore. The wrapper still matters — it
   keeps the two rows as one block for the hero's negative-margin overlap, and
   the phone breakpoint positions the whole card over the hero through it.
   Exported so LegacyInit can re-run it on every visit: each page renders its
   own <header> (SiteNav lives inside the hero), and initMainScripts() is
   one-time-guarded, so it can't rebuild the wrapper on a client-side nav. */
export function initHeaderPin() {
  // undo whatever the previous page left behind (older builds pinned the bar)
  if ((window as any).__headerPinCleanup) {
    (window as any).__headerPinCleanup();
    (window as any).__headerPinCleanup = null;
  }

  const navbar = document.querySelector("header .navbar");
  if (!navbar) return;
  const navFace = document.querySelector("header .nav-face");

  // Reuse the wrapper if this header is already wrapped (double-init guard).
  let bar = navbar.closest(".header-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "header-bar";
    const firstNode = navFace || navbar;
    firstNode.parentNode.insertBefore(bar, firstNode);
    if (navFace) bar.appendChild(navFace);
    bar.appendChild(navbar);
  }

  // A pinned bar used to reserve its height with a spacer; nothing is pinned
  // now, so both the flag and any adopted spacer are dead weight in the flow.
  bar.classList.remove("is-fixed");
  const spacer = bar.parentNode.querySelector(":scope > .header-bar-spacer");
  if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
}

export function initMainScripts() {
  const __ready = (fn) => { try { fn(); } catch (e) { console.error(e); } };
  if ((window as any).__initMainScripts) return; (window as any).__initMainScripts = true;
const mybutton = document.getElementById("backToTop");

window.onscroll = function () {
  if (!mybutton) return;
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

const cardContainer = document.querySelector(".main-container");

const observerOptions = {
  threshold: 0.5,
};

// العدّادات تُشغَّل من LegacyInit عند كل زيارة للصفحة الرئيسية — انظر runCounters أعلاه

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // التحقق من أن الشاشة أصغر من 992px (جوال أو تابلت)
    if (window.innerWidth <= 992) {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("is-flipped");
        }, 1000);
      }
    }
  });
}, observerOptions);

if (cardContainer) observer.observe(cardContainer);

const users = [
  {
    name: "user_1_name",
    location: "user_1_location",
    avatar: "/assets/images/يوسف الدوس.png",
    text: "user_1_text",
  },
  {
    name: "user_2_name",
    location: "user_2_location",
    avatar: "/assets/images/محمود زعيتر 2.png",
    text: "user_2_text",
  },
  {
    name: "user_3_name",
    location: "user_3_location",
    avatar: "/assets/images/يوسف الدوس.png",
    text: "user_3_text",
  },
  {
    name: "user_4_name",
    location: "user_4_location",
    avatar: "/assets/images/محمود زعيتر 2.png",
    text: "user_4_text",
  },
  {
    name: "user_5_name",
    location: "user_5_location",
    avatar: "/assets/images/يوسف الدوس.png",
    text: "user_5_text",
  },
];

function updateCardContent(index, carouselId) {
  const user = users[index];
  if (!user) return;

  const isMobile = carouselId === "mobileCarousel";
  const cardSelector = isMobile
    ? ".mobile-slider .opinion-card, .mobile-slider .carousel-item.active"
    : ".opinion-card-wrapper .opinion-card";

  // تحديث الصورة الكبيرة
  const scope = isMobile
    ? document.querySelector(".mobile-slider")
    : document.querySelector(".opinion-card-wrapper");
  if (!scope) return;

  const avatar = scope.querySelector(".user-avatar");
  const name = scope.querySelector("strong");
  const location = scope.querySelector(".text-muted.small");
  const text = scope.querySelector(".opinion-text");

  if (avatar) avatar.src = t(user.avatar);
  if (name) name.textContent = t(user.name);
  if (location) location.textContent = t(user.location);
  if (text) text.textContent = t(user.text);
}

function goToSlide(carouselId, type, index) {
  const el = document.getElementById(carouselId);
  const carousel = bootstrap.Carousel.getOrCreateInstance(el);
  carousel.to(index);

  const selector =
    type === "desktop" ? ".avatar-indicator" : ".avatar-indicator-mobile";
  document.querySelectorAll(selector).forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  updateCardContent(index, carouselId);
}

__ready(() => {
  // تحميل أول مستخدم ابتداءً
  updateCardContent(0, "opinionsCarousel");
  updateCardContent(0, "mobileCarousel");

  ["opinionsCarousel", "mobileCarousel"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const type = id === "opinionsCarousel" ? "desktop" : "mobile";
    const selector =
      type === "desktop" ? ".avatar-indicator" : ".avatar-indicator-mobile";

    el.addEventListener("slid.bs.carousel", (e) => {
      document.querySelectorAll(selector).forEach((img, i) => {
        img.classList.toggle("active", i === e.to);
      });
      updateCardContent(e.to, id);
    });
  });
});

// ====== البيانات ======

/* لكل ريل تعليقاته الخاصة: الفهرس هنا = data-index على .reel-item.
   commentsData يشير دائماً إلى تعليقات الريل الظاهر حالياً، حتى تبقى بقية
   الدوال (renderComments / addComment / addReply) كما هي. */
const reelsData = [
  {
    count: 341,
    comments: [
      {
        id: 1,
        av: "av-green",
        letter: "ر",
        name: "رنا الصالح",
        text: "قصة ملهمة رغم كل التحديات 💚",
        time: "منذ ساعة",
        likes: 13,
        liked: false,
        replies: [
          {
            av: "av-orange",
            letter: "م",
            name: "مها العبد",
            text: "فعلاً، كلامك صح 🌷",
          },
        ],
      },
      {
        id: 2,
        av: "av-orange",
        letter: "م",
        name: "مها العبد",
        text: "إصرار بيستحق الاحترام 👏",
        time: "منذ ساعتين",
        likes: 13,
        liked: true,
        replies: [],
      },
      {
        id: 3,
        av: "av-blue",
        letter: "أ",
        name: "أحمد باسم",
        text: "حكاية بتعطي دافع للاستمرار",
        time: "22 فبراير",
        likes: 5,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    count: 187,
    comments: [
      {
        id: 11,
        av: "av-blue",
        letter: "س",
        name: "سامي درويش",
        text: "التصوير والمونتاج بمستوى احترافي 🎬",
        time: "منذ 20 دقيقة",
        likes: 9,
        liked: false,
        replies: [],
      },
      {
        id: 12,
        av: "av-gray",
        letter: "ه",
        name: "هبة النجار",
        text: "الصوت واضح والرسالة وصلت من أول ثانية",
        time: "منذ 3 ساعات",
        likes: 21,
        liked: true,
        replies: [
          {
            av: "av-green",
            letter: "س",
            name: "سامي درويش",
            text: "تماماً، الإخراج مدروس 👌",
          },
        ],
      },
      {
        id: 13,
        av: "av-orange",
        letter: "و",
        name: "وسام أبو ندى",
        text: "بانتظار الجزء الثاني من هذه الحكاية",
        time: "أمس",
        likes: 6,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    count: 96,
    comments: [
      {
        id: 21,
        av: "av-orange",
        letter: "ل",
        name: "لينا مطر",
        text: "أصدق ما شاهدت هذا الأسبوع 🌿",
        time: "منذ 45 دقيقة",
        likes: 15,
        liked: false,
        replies: [],
      },
      {
        id: 22,
        av: "av-green",
        letter: "خ",
        name: "خالد شاهين",
        text: "شكراً لأنكم تنقلون الصورة كما هي",
        time: "منذ 5 ساعات",
        likes: 11,
        liked: false,
        replies: [],
      },
      {
        id: 23,
        av: "av-blue",
        letter: "د",
        name: "دعاء الأغا",
        text: "محتوى يستحق المشاركة مع الجميع 🔁",
        time: "3 مارس",
        likes: 8,
        liked: true,
        replies: [
          {
            av: "av-gray",
            letter: "ل",
            name: "لينا مطر",
            text: "شاركته فعلاً 💚",
          },
        ],
      },
    ],
  },
];

let activeReel = 0;
let commentsData = reelsData[0].comments;

const extraComments = [
  {
    id: 4,
    av: "av-gray",
    letter: "ي",
    name: "يوسف خالد",
    text: "ما توقعت أشوف قصة بهالمستوى",
    time: "3 مارس",
    likes: 4,
    liked: false,
    replies: [],
  },
  {
    id: 5,
    av: "av-green",
    letter: "ن",
    name: "نور حسن",
    text: "شكراً على هالمحتوى الرائع 🌿",
    time: "5 مارس",
    likes: 7,
    liked: false,
    replies: [],
  },
  {
    id: 6,
    av: "av-orange",
    letter: "ر",
    name: "رامي سمير",
    text: "بتمنى أشوف المزيد من هيك قصص",
    time: "8 مارس",
    likes: 2,
    liked: false,
    replies: [],
  },
];

let commentIdSeq = 7;
let showing = false;
let currentOrder = "newest";

function findComment(id) {
  for (const reel of reelsData) {
    const found = reel.comments.find((c) => c.id === id);
    if (found) return found;
  }
  return extraComments.find((c) => c.id === id);
}

/* عدّاد الترويسة "التعليقات (n)" — يُكتب من هنا لأن كل ريل له عدده الخاص،
   ولذلك أُزيل data-i18n من .comments-count حتى لا تعيده الترجمة إلى 341. */
function updateCommentsCount() {
  const counter = document.querySelector(".comments-count");
  if (!counter) return;
  counter.textContent = `${t("comments_word")} (${reelsData[activeReel].count})`;
}

/* تبديل التعليقات عند الوصول إلى ريل آخر */
function setActiveReel(index, force) {
  if (!reelsData[index]) return;
  if (index === activeReel && !force) return;
  activeReel = index;
  commentsData = reelsData[index].comments;
  renderComments();
  updateCommentsCount();
}

function replyMarkup(r) {
  const styleAttr = r.style ? ` style="${r.style}"` : "";
  return `
    <div class="rv-reply">
      <div class="avatar-circle ${r.av} rv-avatar-sm"${styleAttr}>${r.letter}</div>
      <div class="rv-reply-body">
        <span class="rv-name">${r.name || ""}</span>
        <p class="rv-text">${r.text}</p>
      </div>
    </div>`;
}

function repliesMarkup(replies) {
  if (!replies || !replies.length) return "";
  return replies.map(replyMarkup).join("");
}

function commentMarkup(c) {
  const styleAttr = c.style ? ` style="${c.style}"` : "";
  const likes = c.likes != null ? c.likes : 0;
  return `
    <div class="rv-comment-head">
      <div class="rv-user">
        <div class="avatar-circle ${c.av}"${styleAttr}>${c.letter}</div>
        <span class="rv-name">${c.name || ""}</span>
      </div>
      <span class="rv-time">${c.time || ""}</span>
    </div>
    <p class="rv-text">${c.text}</p>
    <div class="rv-actions">
      <div class="rv-like ${c.liked ? "liked" : ""}" onclick="toggleCommentLike(this)">
        <i class="fa-${c.liked ? "solid" : "regular"} fa-heart"></i>
        <span>${likes}</span>
      </div>
      <button type="button" class="rv-reply-btn" onclick="toggleReplyBox(this)">
        <i class="fa-solid fa-reply"></i>
        <span>${t("reply_label")}</span>
      </button>
    </div>
    <div class="rv-replies">${repliesMarkup(c.replies)}</div>
    <div class="rv-reply-box">
      <input
        type="text"
        class="rv-reply-input"
        placeholder="${t("reply_placeholder")}"
        onkeydown="replyKeydown(event, this)"
      />
      <button type="button" class="rv-reply-send" onclick="addReply(this)">
        <i class="fas fa-paper-plane" style="transform: scaleX(-1)"></i>
      </button>
    </div>`;
}

function toggleCommentLike(el) {
  const icon = el.querySelector("i");
  const count = el.querySelector("span");
  const liked = el.classList.toggle("liked");
  icon.classList.toggle("fa-solid", liked);
  icon.classList.toggle("fa-regular", !liked);
  count.textContent = parseInt(count.textContent || "0") + (liked ? 1 : -1);
}

function toggleReplyBox(btn) {
  const box = btn.closest(".rv-comment").querySelector(".rv-reply-box");
  const open = box.classList.toggle("open");
  if (open) {
    const input = box.querySelector(".rv-reply-input");
    setTimeout(() => input.focus(), 50);
  }
}

function replyKeydown(e, input) {
  if (e.key === "Enter") {
    e.preventDefault();
    addReply(input);
  }
}

function addReply(el) {
  const commentEl = el.closest(".rv-comment");
  const box = commentEl.querySelector(".rv-reply-box");
  const input = box.querySelector(".rv-reply-input");
  const text = input.value.trim();
  if (!text) return;

  const colors = ["av-green", "av-orange", "av-blue", "av-gray"];
  const reply = {
    av: colors[Math.floor(Math.random() * colors.length)],
    letter: text[0],
    name: t("you_label"),
    text,
  };

  const comment = findComment(parseInt(commentEl.dataset.id));
  if (comment) {
    comment.replies = comment.replies || [];
    comment.replies.push(reply);
  }

  const repliesEl = commentEl.querySelector(".rv-replies");
  const d = document.createElement("div");
  d.innerHTML = replyMarkup(reply).trim();
  const node = d.firstChild;
  node.style.opacity = "0";
  node.style.transition = "opacity 0.3s";
  repliesEl.appendChild(node);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => (node.style.opacity = "1")),
  );

  input.value = "";
  box.classList.remove("open");
}

function renderComments() {
  const list = document.getElementById("commentsList");
  if (!list) return;

  const sorted =
    currentOrder === "newest" ? [...commentsData].reverse() : [...commentsData];

  list.style.opacity = "0";
  list.style.transition = "opacity 0.2s";

  setTimeout(() => {
    list
      .querySelectorAll(".rv-comment:not(.extra-comment)")
      .forEach((el) => el.remove());

    sorted.forEach((c) => {
      const d = document.createElement("div");
      d.className = "rv-comment";
      d.dataset.id = c.id;
      d.innerHTML = commentMarkup(c);
      list.appendChild(d);
    });

    list.style.opacity = "1";
    list.scrollTop = currentOrder === "newest" ? 0 : list.scrollHeight;
  }, 200);
}

function setTab(el, type) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  currentOrder = type === "الأحدث" ? "newest" : "oldest";
  renderComments();
}

function showLess() {
  const list = document.getElementById("commentsList");
  const btn = document.querySelector(".show-more");

  list.querySelectorAll(".extra-comment").forEach((el) => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  });

  setTimeout(() => {
    list.scrollTop = 0;
  }, 300);

  btn.textContent = t("show_more");
  btn.style.color = "#e1723b";
}

function addComment() {
  const input = document.getElementById("newComment");
  const text = input.value.trim();
  if (!text) return;

  const colors = ["av-green", "av-orange", "av-blue", "av-gray"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const firstLetter = text[0];

  // أضفه للـ data
  const newC = {
    id: commentIdSeq++,
    av: randomColor,
    letter: firstLetter,
    name: t("you_label"),
    text,
    time: t("now_label"),
    likes: 0,
    liked: false,
    replies: [],
  };
  commentsData.push(newC);

  // ارسمه مباشرة
  const list = document.getElementById("commentsList");
  const d = document.createElement("div");
  d.className = "rv-comment";
  d.dataset.id = newC.id;
  d.style.opacity = "0";
  d.style.transform = "translateY(10px)";
  d.style.transition = "opacity 0.3s, transform 0.3s";
  d.innerHTML = commentMarkup(newC);

  if (currentOrder === "newest") {
    list.insertBefore(d, list.firstChild);
    setTimeout(() => {
      list.scrollTop = 0;
    }, 50);
  } else {
    list.appendChild(d);
    setTimeout(() => {
      list.scrollTop = list.scrollHeight;
    }, 50);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      d.style.opacity = "1";
      d.style.transform = "translateY(0)";
    });
  });

  // حدّث العداد (لكل ريل عدّاده الخاص)
  reelsData[activeReel].count++;
  updateCommentsCount();

  input.value = "";
  input.style.height = "auto";
}

__ready(() => {
  const newComment = document.getElementById("newComment");
  if (!newComment) return;

  renderComments();
  updateCommentsCount();

  // العدّاد لم يعد يحمل data-i18n، فنعيد كتابته بعد كل تبديل للغة
  document.addEventListener("langchange", updateCommentsCount);

  newComment.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  });

  newComment.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

function togglePlay(element) {
  // الحصول على عنصر الفيديو (الـ reel-item الذي يحتوي على الـ play-overlay)
  const reelItem = element.closest(".reel-item");
  const video = reelItem.querySelector("video");
  const playOverlay = element;

  if (video.paused) {
    // تشغيل الفيديو
    video.play();
    // إخفاء أيقونة التشغيل
    playOverlay.style.opacity = "0";
    playOverlay.style.pointerEvents = "none";
    // إضافة كلاس playing
    reelItem.classList.add("playing");
  } else {
    // إيقاف الفيديو
    video.pause();
    // إظهار أيقونة التشغيل
    playOverlay.style.opacity = "1";
    playOverlay.style.pointerEvents = "all";
    // إزالة كلاس playing
    reelItem.classList.remove("playing");
  }
}

// دالة جديدة للتعامل مع الضغط على الفيديو مباشرة
function toggleVideoPlay(videoElement) {
  const reelItem = videoElement.closest(".reel-item");
  const playOverlay = reelItem.querySelector(".play-overlay");

  if (videoElement.paused) {
    // تشغيل الفيديو
    videoElement.play();
    if (playOverlay) {
      playOverlay.style.opacity = "0";
      playOverlay.style.pointerEvents = "none";
    }
    reelItem.classList.add("playing");
  } else {
    // إيقاف الفيديو
    videoElement.pause();
    if (playOverlay) {
      playOverlay.style.opacity = "1";
      playOverlay.style.pointerEvents = "all";
    }
    reelItem.classList.remove("playing");
  }
}

/* ============================================================
   أزرار الريل: الحفظ · الإعجاب · المشاركة
   ============================================================
   كانت الحالة تعيش في الـ DOM وحده فتضيع مع كل إعادة تركيب للصفحة، وكانت
   المشاركة مجرد alert. صارت الحالة تُحفظ في localStorage بمفتاح يخصّ كل ريل
   (المسار + رابط الفيديو + الفهرس)، وتُعاد كتابتها على الأيقونات عند كل تهيئة. */

const LIKE_RED = "#e0245e";
const REEL_STORE_KEY = "sawt_reel_social";

function readReelStore() {
  try {
    return JSON.parse(localStorage.getItem(REEL_STORE_KEY) || "{}") || {};
  } catch (err) {
    // التخزين قد يكون معطّلاً (تصفّح خاص) — نكمل بلا حفظ
    return {};
  }
}

/* مفتاح ثابت للريل: نفس الفيديو في نفس الموضع من نفس الصفحة = نفس المفتاح.
   الصفحة الرئيسية تكرّر الفيديو ذاته ثلاث مرات فيفرّقها data-index، وريل
   التعاونات فهرسه 0 دائماً لكن رابط الفيديو يتغيّر مع كل شركة. */
function reelKeyOf(el) {
  const item = el && el.closest ? el.closest(".reel-item") : null;
  if (!item) return null;

  const video = item.querySelector("video");
  let src = "";
  if (video) {
    const raw = video.getAttribute("src") || "";
    try {
      src = new URL(raw, location.href).pathname;
    } catch (err) {
      src = raw;
    }
  }
  return location.pathname + "|" + src + "|" + (item.dataset.index || "0");
}

function readReelState(key) {
  const entry = (key && readReelStore()[key]) || {};
  return { liked: !!entry.liked, saved: !!entry.saved };
}

function writeReelState(key, patch) {
  if (!key) return;
  const store = readReelStore();
  store[key] = Object.assign({ liked: false, saved: false }, store[key], patch);
  try {
    localStorage.setItem(REEL_STORE_KEY, JSON.stringify(store));
  } catch (err) {}
}

/* الأزرار عناصر <span>، فنمنحها دور الزر واسمه حتى يقرأها القارئ الصوتي */
function labelAction(span, key, pressed) {
  const label = t(key);
  span.setAttribute("aria-label", label);
  span.setAttribute("title", label);
  if (pressed !== undefined) span.setAttribute("aria-pressed", String(pressed));
}

/* قلب الريلز أيقونة SVG مضمّنة (وليست Font Awesome)، فتبديل fa-solid/fa-regular
   وحده لا يغيّر شيئاً — نملأ مسار القلب باللون الأحمر عند الإعجاب. */
function paintLike(span, liked) {
  span.classList.toggle("liked", liked);

  // المسار الأول في هذه الأيقونات هو مربّع شفاف، فنستهدف مسار القلب بالحد
  const heart = span.querySelector("svg path[stroke]");
  if (heart) {
    heart.setAttribute("fill", liked ? LIKE_RED : "none");
    heart.setAttribute("stroke", liked ? LIKE_RED : "currentColor");
  } else {
    // النسخة القديمة بأيقونة Font Awesome
    const icon = span.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-solid", liked);
      icon.classList.toggle("fa-regular", !liked);
      icon.style.color = liked ? "red" : "";
    }
  }

  labelAction(span, liked ? "reel_action_unlike" : "reel_action_like", liked);
}

/* نفس حالة القلب: أيقونة الحفظ SVG مضمّنة، فنملأها بلون النص عند الحفظ */
function paintSave(span, saved) {
  span.classList.toggle("saved", saved);

  const mark = span.querySelector("svg path[stroke]");
  if (mark) {
    mark.setAttribute("fill", saved ? "currentColor" : "none");
  } else {
    const icon = span.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-solid", saved);
      icon.classList.toggle("fa-regular", !saved);
    }
  }

  labelAction(span, saved ? "reel_action_unsave" : "reel_action_save", saved);
}

function toggleLike(button) {
  const liked = !button.classList.contains("liked");
  paintLike(button, liked);
  writeReelState(reelKeyOf(button), { liked });
}

function toggleSave(button) {
  const saved = !button.classList.contains("saved");
  paintSave(button, saved);
  writeReelState(reelKeyOf(button), { saved });
  showReelToast(t(saved ? "reel_saved_toast" : "reel_unsaved_toast"));
}

/* رسالة صغيرة غير حاجبة أسفل الشاشة (نفس فكرة search-toast) */
let reelToastEl = null;
let reelToastTimer = null;

function showReelToast(message) {
  if (!reelToastEl || !reelToastEl.isConnected) {
    reelToastEl = document.createElement("div");
    reelToastEl.className = "reel-toast";
    reelToastEl.setAttribute("role", "status");
    document.body.appendChild(reelToastEl);
  }
  reelToastEl.textContent = message;
  reelToastEl.classList.remove("show");
  void reelToastEl.offsetWidth; // إعادة تشغيل الحركة عند الضغط المتتالي
  reelToastEl.classList.add("show");

  clearTimeout(reelToastTimer);
  reelToastTimer = setTimeout(() => {
    if (reelToastEl) reelToastEl.classList.remove("show");
  }, 2200);
}

/* رابط الريل نفسه: عنوان الصفحة + مرساة العنصر التي نضيفها في initReelActions */
function reelShareUrl(item) {
  const base = location.origin + location.pathname + location.search;
  return item && item.id ? base + "#" + item.id : base;
}

function copyReelText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // http://localhost وما شابه: الحافظة غير متاحة، فنعود إلى execCommand
  return new Promise((resolve, reject) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    ok ? resolve() : reject(new Error("copy failed"));
  });
}

function copyReelLink(url) {
  copyReelText(url).then(
    () => showReelToast(t("reel_share_copied")),
    // آخر حل: نعرض الرابط للمستخدم لينسخه بنفسه
    () => window.prompt(t("reel_share_copy"), url),
  );
}

/* قائمة المشاركة الأصلية على الأجهزة التي تدعمها (الهواتف غالباً)، وعلى
   سطح المكتب ننسخ رابط الريل مباشرة ونؤكّد ذلك برسالة. */
function shareVideo(button) {
  const item = button && button.closest ? button.closest(".reel-item") : null;
  const url = reelShareUrl(item);
  const titleEl = item && item.querySelector(".reel-title");
  const title = (titleEl && titleEl.textContent.trim()) || document.title;

  if (navigator.share) {
    navigator.share({ title, url }).catch((err) => {
      // AbortError = أغلق المستخدم القائمة بنفسه، فلا بديل هنا
      if (!err || err.name !== "AbortError") copyReelLink(url);
    });
    return;
  }
  copyReelLink(url);
}

/* تهيئة أزرار كل ريل: مرساة للمشاركة، استرجاع حالة الإعجاب/الحفظ المحفوظة،
   وتشغيل الأزرار بلوحة المفاتيح. تُستدعى عند كل تهيئة وبعد تبديل اللغة،
   والحارس يمنع ازدواج المستمعين. ترتيب الأزرار في الترميز: حفظ · إعجاب · مشاركة. */
function initReelActions() {
  document.querySelectorAll(".reel-item").forEach((item, i) => {
    const actions = item.querySelector(".reel-actions");
    if (!actions) return;

    if (!item.id) item.id = "reel-" + (item.dataset.index || i);

    const saveBtn = actions.children[0];
    const likeBtn = actions.children[1];
    const shareBtn = actions.children[2];

    const state = readReelState(reelKeyOf(actions));
    if (saveBtn) paintSave(saveBtn, state.saved);
    if (likeBtn) paintLike(likeBtn, state.liked);
    if (shareBtn) labelAction(shareBtn, "reel_action_share");

    if (actions.__reelActionsInit) return;
    actions.__reelActionsInit = true;

    Array.prototype.forEach.call(actions.children, (span) => {
      span.setAttribute("role", "button");
      span.setAttribute("tabindex", "0");
      span.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        span.click();
      });
    });
  });
}

// ===== تقديم / ترجيع الريلز =====
function skipReel(btn, delta) {
  const video = btn.closest(".reel-item").querySelector("video");
  if (!video || !video.duration) return;
  video.currentTime = Math.min(
    Math.max(video.currentTime + delta, 0),
    video.duration,
  );
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

function initReelSeek() {
  document.querySelectorAll(".reel-item").forEach((item) => {
    if (item.__reelSeekInit) return;
    item.__reelSeekInit = true;
    const video = item.querySelector("video");
    const bar = item.querySelector(".reel-progress");
    const fill = item.querySelector(".reel-progress-fill");
    const timeEl = item.querySelector(".reel-time");
    if (!video || !bar || !fill) return;

    const updateTime = () => {
      if (timeEl) {
        timeEl.textContent = formatTime(video.currentTime);
      }
    };

    video.addEventListener("loadedmetadata", updateTime);
    video.addEventListener("timeupdate", () => {
      if (video.duration) {
        fill.style.width = (video.currentTime / video.duration) * 100 + "%";
      }
      updateTime();
    });
    updateTime();

    const seek = (clientX) => {
      const rect = bar.getBoundingClientRect();
      let ratio = (clientX - rect.left) / rect.width;
      ratio = Math.min(Math.max(ratio, 0), 1);
      if (video.duration) {
        video.currentTime = ratio * video.duration;
        fill.style.width = ratio * 100 + "%";
        updateTime();
      }
    };

    /* الضغط على الشريط لم يعد ينقل الوقت فوراً: قد تكون بدايةَ سحبٍ عمودي
       لتبديل الريل. ننتظر اتجاه الحركة — أفقي ⇒ تقديم/ترجيع، عمودي ⇒ نترك
       الحركة لسحب الريلز فلا يتغيّر موضع الفيديو. النقرة المجرّدة (بلا حركة)
       تبقى تنقل الوقت كما كانت. */
    let seeking = false;
    let pending = false;
    let downX = 0;
    let downY = 0;

    bar.addEventListener("pointerdown", (e) => {
      pending = true;
      seeking = false;
      downX = e.clientX;
      downY = e.clientY;
    });

    bar.addEventListener("pointermove", (e) => {
      if (seeking) {
        seek(e.clientX);
        return;
      }
      if (!pending) return;
      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      if (Math.abs(dy) > 4 && Math.abs(dy) >= Math.abs(dx)) {
        pending = false; // سحب عمودي — يخصّ تبديل الريلز وحده
        return;
      }
      if (Math.abs(dx) > 4) {
        seeking = true;
        try {
          bar.setPointerCapture(e.pointerId);
        } catch (err) {}
        seek(e.clientX);
      }
    });

    bar.addEventListener("pointerup", (e) => {
      if (pending && !seeking) seek(e.clientX);
      pending = false;
      seeking = false;
    });
    bar.addEventListener("pointercancel", () => {
      pending = false;
      seeking = false;
    });
  });
}

/* أي ريل يقف في منتصف الحاوية الآن؟ */
function detectActiveReel(container) {
  const items = container.querySelectorAll(".reel-item");
  if (!items.length) return;
  const containerRect = container.getBoundingClientRect();
  const center = containerRect.top + containerRect.height / 2;

  let best = 0;
  let bestDist = Infinity;
  items.forEach((item, i) => {
    const r = item.getBoundingClientRect();
    const dist = Math.abs(r.top + r.height / 2 - center);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  setActiveReel(best);
}

/* بعد السحب باليد نعيد الحاوية إلى أقرب ريل (scroll-snap معطّل أثناء السحب) */
function snapToNearestReel(container) {
  const items = container.querySelectorAll(".reel-item");
  if (!items.length) return;
  const step = items[0].offsetHeight || container.clientHeight;
  if (!step) return;
  const index = Math.min(
    Math.max(Math.round(container.scrollTop / step), 0),
    items.length - 1,
  );
  container.scrollTo({ top: index * step, behavior: "smooth" });
  // نُعيد تفعيل التثبيت بعد أن يهدأ التمرير الناعم
  setTimeout(() => {
    container.style.scrollSnapType = "";
  }, 400);
}

/* تحريك الريلز بالسحب بالماوس (اللمس يبقى على التمرير الأصلي) */
function initReelsDrag(container) {
  if (container.__reelsDragInit) return;
  container.__reelsDragInit = true;

  container.style.cursor = "grab";

  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startScroll = 0;
  let capturedId = null;

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    container.style.cursor = "grab";
    if (capturedId !== null) {
      try {
        container.releasePointerCapture(capturedId);
      } catch (err) {}
      capturedId = null;
    }
    if (moved) snapToNearestReel(container);
    else container.style.scrollSnapType = "";
  };

  container.addEventListener("pointerdown", (e) => {
    moved = false;
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    // الضغط على أزرار الحفظ/الإعجاب/المشاركة ليس سحباً
    if (e.target.closest(".reel-actions")) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startScroll = container.scrollTop;
    container.style.cursor = "grabbing";
    // التثبيت الإجباري يقاوم تغيير scrollTop يدوياً
    container.style.scrollSnapType = "none";
  });

  container.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved) {
      // حركة أفقية ⇒ المقصود شريط التقدّم، لا تبديل الريلز
      if (Math.abs(dy) < 4 || Math.abs(dy) < Math.abs(dx)) return;
      moved = true;
      capturedId = e.pointerId;
      try {
        container.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
    e.preventDefault();
    container.scrollTop = startScroll - dy;
  });

  container.addEventListener("pointerup", endDrag);
  container.addEventListener("pointercancel", endDrag);
  // منع سحب الفيديو/الصورة الافتراضي حتى لا يظهر شبح السحب
  container.addEventListener("dragstart", (e) => e.preventDefault());

  // ابتلاع النقرة التي تنهي السحب حتى لا تشغّل الفيديو أو تضغط زر الإعجاب
  container.addEventListener(
    "click",
    (e) => {
      if (!moved) return;
      e.stopPropagation();
      e.preventDefault();
    },
    true,
  );
}

/* كل ما يخص عمود الريلز. يُعاد استدعاؤها من initReels المُصدَّرة عند كل زيارة
   للصفحة الرئيسية، لأن initMainScripts محروسة بمرة واحدة. الحراسات أعلاه تمنع
   ازدواج المستمعين على نفس العناصر. */
function setupReels() {
  initReelSeek();
  initReelActions();

  // أسماء الأزرار مكتوبة من t()، فنعيد كتابتها بعد كل تبديل للغة
  if (!(document as any).__reelActionsLangBound) {
    (document as any).__reelActionsLangBound = true;
    document.addEventListener("langchange", initReelActions);
  }

  const reelsContainer = document.getElementById("reelsContainer");
  if (!reelsContainer) return;

  initReelsDrag(reelsContainer);
  detectActiveReel(reelsContainer);

  if (reelsContainer.__reelsScrollInit) return;
  reelsContainer.__reelsScrollInit = true;

  let scrollTimeout;
  reelsContainer.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const reelItems = reelsContainer.querySelectorAll(".reel-item");
      const containerRect = reelsContainer.getBoundingClientRect();

      reelItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const video = item.querySelector("video");
        const playOverlay = item.querySelector(".play-overlay");
        const isVisible =
          itemRect.top >= containerRect.top &&
          itemRect.bottom <= containerRect.bottom;

        if (!isVisible && video && !video.paused) {
          video.pause();
          if (playOverlay) {
            playOverlay.style.opacity = "1";
            playOverlay.style.pointerEvents = "all";
          }
          item.classList.remove("playing");
        }
      });

      // بدّل التعليقات إلى تعليقات الريل الذي استقرّ في المنتصف
      detectActiveReel(reelsContainer);
    }, 100);
  });
}

__ready(setupReels);

const video = document.querySelector(".my-video");
const progress = document.querySelector(".progress");

if (video && progress) {
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + "%";
  });
}

const progressBar = document.querySelector(".progress-bar");

if (progressBar && video) {
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * video.duration;
    video.currentTime = newTime;
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

__ready(function () {
  // Strip the trailing slash before taking the last segment: the static export
  // (output: 'export') is served as /team/index.html, so the live URL is
  // "/team/" and a bare .split("/").pop() returned "" -> "index.html". That
  // cleared .active from every link and underlined الرئيسية on every page.
  const lastSegment = (value) =>
    (value || "").replace(/\/+$/, "").split("/").pop().toLowerCase();

  const path = lastSegment(window.location.pathname) || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  let matched = false;

  navLinks.forEach((link) => {
    const href = lastSegment(link.getAttribute("href"));
    link.classList.remove("active");
    if (href && href !== "#" && href === path) {
      link.classList.add("active");
      matched = true;
    }
  });

  if (!matched && (path === "" || path === "index.html")) {
    const home = document.querySelector(
      '.navbar-nav .nav-link[data-i18n="nav_home"]',
    );
    if (home) home.classList.add("active");
  }
});

__ready(function () {
  const navCollapse = document.getElementById("mainNav");
  const navToggler = document.querySelector(
    '.navbar-toggler[data-bs-target="#mainNav"]',
  );
  if (!navCollapse || !navToggler) return;

  function closeNav() {
    if (!navCollapse.classList.contains("show")) return;
    if (window.bootstrap && bootstrap.Collapse) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    } else {
      navCollapse.classList.remove("show");
    }
  }

  document.addEventListener("click", function (e) {
    if (!navCollapse.classList.contains("show")) return;
    if (navCollapse.contains(e.target) || navToggler.contains(e.target)) return;
    closeNav();
  });

  navCollapse.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
});

__ready(function () {
  const items = document.querySelectorAll(".timeline-item[data-story]");
  const paragraphs = document.querySelectorAll(".story-content .story-text");
  if (!items.length || paragraphs.length < 2) return;

  function selectStory(story) {
    items.forEach((el) => {
      el.classList.toggle("active", el.dataset.story === story);
    });
    paragraphs[0].setAttribute("data-i18n-html", `story_paragraph_${story}_1`);
    paragraphs[1].setAttribute("data-i18n-html", `story_paragraph_${story}_2`);

    if (typeof applyTranslations === "function") {
      const lang =
        typeof getCurrentLang === "function"
          ? getCurrentLang()
          : localStorage.getItem("lang") || "ar";
      applyTranslations(lang);
    }
  }

  const storyBox = document.querySelector(".story-box");

  items.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const story = el.dataset.story;
      if (story) selectStory(story);
      if (storyBox) {
        storyBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  const initial = document.querySelector(".timeline-item.active[data-story]");
  selectStory(initial ? initial.dataset.story : "journey");
});

// Pin the top contact bar (nav-face) and the navbar to the top while scrolling.
// LegacyInit re-runs this on every page mount — see initHeaderPin above.
__ready(function () {
  initHeaderPin();
});

  // expose functions used by inline JSX handlers
  (window as any).togglePlay = typeof togglePlay !== 'undefined' ? togglePlay : (window as any).togglePlay;
  (window as any).toggleVideoPlay = typeof toggleVideoPlay !== 'undefined' ? toggleVideoPlay : (window as any).toggleVideoPlay;
  (window as any).toggleLike = typeof toggleLike !== 'undefined' ? toggleLike : (window as any).toggleLike;
  (window as any).toggleSave = typeof toggleSave !== 'undefined' ? toggleSave : (window as any).toggleSave;
  (window as any).shareVideo = typeof shareVideo !== 'undefined' ? shareVideo : (window as any).shareVideo;
  (window as any).goToSlide = typeof goToSlide !== 'undefined' ? goToSlide : (window as any).goToSlide;
  (window as any).toggleCommentLike = typeof toggleCommentLike !== 'undefined' ? toggleCommentLike : (window as any).toggleCommentLike;
  (window as any).toggleReplyBox = typeof toggleReplyBox !== 'undefined' ? toggleReplyBox : (window as any).toggleReplyBox;
  (window as any).replyKeydown = typeof replyKeydown !== 'undefined' ? replyKeydown : (window as any).replyKeydown;
  (window as any).addReply = typeof addReply !== 'undefined' ? addReply : (window as any).addReply;
  (window as any).setTab = typeof setTab !== 'undefined' ? setTab : (window as any).setTab;
  (window as any).showLess = typeof showLess !== 'undefined' ? showLess : (window as any).showLess;
  (window as any).addComment = typeof addComment !== 'undefined' ? addComment : (window as any).addComment;
  (window as any).scrollToTop = typeof scrollToTop !== 'undefined' ? scrollToTop : (window as any).scrollToTop;
  (window as any).skipReel = typeof skipReel !== 'undefined' ? skipReel : (window as any).skipReel;
  (window as any).renderComments = typeof renderComments !== 'undefined' ? renderComments : (window as any).renderComments;
  (window as any).setActiveReel = typeof setActiveReel !== 'undefined' ? setActiveReel : (window as any).setActiveReel;
  (window as any).__setupReels = typeof setupReels !== 'undefined' ? setupReels : (window as any).__setupReels;
  (window as any).initReelActions = typeof initReelActions !== 'undefined' ? initReelActions : (window as any).initReelActions;

}
