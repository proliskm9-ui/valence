/* =============================================================================
   RETRO ZAZ — общий script.js для всех страниц.
   Чистый vanilla JS, без библиотек. Каждый модуль сам проверяет свои элементы,
   поэтому один файл спокойно подключается на все 4 страницы.
   ============================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initImageSkeletons();
  initHeaderScroll();
  initBurgerMenu();
  initReveal();
  initCountUp();
  initMarquee();
  initFaq();
  initContactForm();
  initYear();
  initVisitTracker();
});

/** После динамической подмены HTML из Firestore (site-content.js). */
window.RZRefreshPublicUI = function () {
  initImageSkeletons();
  initReveal();
};

/* ---------- Skeleton-загрузка фотографий ---------- */
function initImageSkeletons() {
  var shells = document.querySelectorAll(".photo-slot.has-img");

  shells.forEach(function (shell) {
    var img = shell.querySelector(":scope > img");
    if (!img) return;

    function showImage() {
      shell.classList.add("is-image-loaded");
      shell.classList.remove("is-image-error");
    }

    function showFallback() {
      shell.classList.add("is-image-error");
      shell.classList.remove("is-image-loaded");
    }

    if (img.complete) {
      if (img.naturalWidth > 0) showImage();
      else showFallback();
      return;
    }

    img.addEventListener("load", showImage, { once: true });
    img.addEventListener("error", showFallback, { once: true });
  });
}

/* ---------- Текущий год в футере ---------- */
function initYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -----------------------------------------------------------------------------
   АДРЕС ПРИЁМА ЗАЯВОК (бот из папки /bot).
   - Локально при запущенном боте: http://localhost:8787/api/booking
   - На проде: замени на публичный HTTPS-адрес, где крутится сервис.
     ВАЖНО: если сайт открыт по https://, эндпоинт тоже должен быть https://.
   --------------------------------------------------------------------------- */
/* Бот — вторичный канал (Telegram). Основное хранилище заявок — Firestore.
   На проде используем публичный HTTPS API на VPS. */
var IS_LOCAL_HOST =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";
var BOOKING_API_BASE = IS_LOCAL_HOST
  ? "http://localhost:8787"
  : "https://62-60-148-232.sslip.io";
var BOOKING_ENDPOINT = BOOKING_API_BASE ? BOOKING_API_BASE + "/api/booking" : "";
var DATES_ENDPOINT = BOOKING_API_BASE ? BOOKING_API_BASE + "/api/dates" : "";
var VISIT_ENDPOINT = BOOKING_API_BASE ? BOOKING_API_BASE + "/api/visit" : "";

function pad2(n) { return String(n).padStart(2, "0"); }

/* ---------- Счётчик заходов (Firestore → CRM /stats; бот — best-effort) ---------- */
function initVisitTracker() {
  try {
    var KEY = "rz_sid";
    var sid = sessionStorage.getItem(KEY);
    var isNew = false;
    if (!sid) {
      sid =
        Math.random().toString(36).slice(2, 10) +
        Date.now().toString(36);
      sessionStorage.setItem(KEY, sid);
      isNew = true;
    }

    var path = location.pathname || "/";
    var payload = {
      path: path,
      session: sid,
      new_session: isNew,
    };

    /* Основной учёт — Firestore (виден в админке даже если бот лежит) */
    try {
      if (typeof initFirebase === "function" && typeof RZAnalytics !== "undefined") {
        initFirebase();
        RZAnalytics.recordVisit(payload).catch(function () { /* */ });
      }
    } catch (e1) { /* */ }

    /* Дубль в Telegram-бот только если endpoint задан (не на проде без публичного URL) */
    if (VISIT_ENDPOINT) {
      fetch(VISIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function () { /* бот офлайн — тихо игнорируем */ });
    }
  } catch (e) { /* private mode / старые браузеры */ }
}
function toISODate(d) {
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}
function parseISODate(s) {
  if (!s) return null;
  var p = String(s).split("-");
  if (p.length !== 3) return null;
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
}

/* ---------- Шапка: тень/рамка при скролле ---------- */
function initHeaderScroll() {
  var header = document.querySelector(".site-header");
  if (!header) return;
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Бургер-меню (мобильная навигация) ---------- */
function initBurgerMenu() {
  var burger = document.getElementById("burger");
  var nav = document.getElementById("main-nav");
  if (!burger || !nav) return;

  var headerInner = document.querySelector(".header-inner");
  var headerCta = headerInner ? headerInner.querySelector(".header-cta") : null;
  var mq = window.matchMedia("(max-width: 899px)");

  var setOpen = function (isOpen) {
    nav.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    var openLabel = window.RZi18n ? RZi18n.t("burger.open") : "Открыть меню";
    var closeLabel = window.RZi18n ? RZi18n.t("burger.close") : "Закрыть меню";
    burger.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
    document.body.classList.toggle("nav-open", isOpen);
  };

  /* На мобилке выносим меню в body (иначе sticky-шапка ломает fixed).
     На ПК возвращаем nav обратно в шапку между лого и кнопкой. */
  var syncNavPlacement = function () {
    if (mq.matches) {
      if (nav.parentElement !== document.body) {
        document.body.appendChild(nav);
      }
    } else {
      setOpen(false);
      if (headerInner && nav.parentElement !== headerInner) {
        if (headerCta) headerInner.insertBefore(nav, headerCta);
        else headerInner.insertBefore(nav, burger);
      }
    }
  };

  syncNavPlacement();
  if (mq.addEventListener) mq.addEventListener("change", syncNavPlacement);
  else if (mq.addListener) mq.addListener(syncNavPlacement);

  burger.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------- Плавное появление блоков при скролле ---------- */
var revealObserver = null;
var revealFailsafeTimer = null;

function revealShow(el) {
  if (!el || el.classList.contains("in")) return;
  el.classList.add("in");
  if (revealObserver) revealObserver.unobserve(el);
}

function initReveal() {
  var items = document.querySelectorAll(".reveal:not(.in)");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach(revealShow);
    return;
  }

  /* На тач/узких экранах не ждём IO — сразу показываем. */
  var narrow = window.matchMedia("(max-width: 899px)").matches;
  if (narrow) {
    items.forEach(revealShow);
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) revealShow(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "64px 0px 64px 0px" }
    );
  }

  items.forEach(function (el) { revealObserver.observe(el); });

  /* Страховка: контент не должен навсегда остаться opacity:0 (в т.ч. после
     перезаписи DOM из Firestore, если observe не успел). */
  if (revealFailsafeTimer) window.clearTimeout(revealFailsafeTimer);
  revealFailsafeTimer = window.setTimeout(function () {
    document.querySelectorAll(".reveal:not(.in)").forEach(revealShow);
  }, 800);
}

/* ---------- Счётчик-«одометр» (data-count) ---------- */
function initCountUp() {
  var nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    nums.forEach(function (el) { el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1200;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // ease-out
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  nums.forEach(function (el) { io.observe(el); });
}

/* ---------- Бегущая лента: дублируем содержимое для бесшовной прокрутки ---------- */
function initMarquee() {
  var track = document.querySelector(".marquee-track");
  if (!track) return;
  // клонируем набор элементов один раз, чтобы -50% сдвиг зациклился без стыка
  track.innerHTML = track.innerHTML + track.innerHTML;
}

/* ---------- FAQ-аккордеон ---------- */
function initFaq() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;

    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      items.forEach(function (other) {
        other.classList.remove("is-open");
        var oa = other.querySelector(".faq-a");
        var oq = other.querySelector(".faq-q");
        if (oa) oa.style.maxHeight = null;
        if (oq) oq.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------- Форма брони: модалки даты и услуги ---------- */
function initContactForm() {
  var form = document.getElementById("booking-form");
  if (!form) return;

  var successBox = document.getElementById("form-success");
  var errorBox = document.getElementById("form-error");
  var errorText = document.getElementById("form-error-text");
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.textContent : "";

  var dateInput = document.getElementById("f-date");
  var dateHint = document.getElementById("date-hint");
  var datePicked = document.getElementById("date-picked");
  var dateTrigger = document.getElementById("date-trigger");
  var dateSheet = document.getElementById("date-sheet");

  var serviceInput = document.getElementById("f-service");
  var serviceHint = document.getElementById("service-hint");
  var servicePicked = document.getElementById("service-picked");
  var serviceTrigger = document.getElementById("service-trigger");
  var serviceSheet = document.getElementById("service-sheet");

  var calTitle = document.getElementById("cal-title");
  var calGrid = document.getElementById("cal-grid");
  var calPrev = document.getElementById("cal-prev");
  var calNext = document.getElementById("cal-next");
  var nameInput = document.getElementById("f-name");
  var phoneInput = document.getElementById("f-phone");

  function tt(key, vars) {
    return window.RZi18n ? RZi18n.t(key, vars) : key;
  }

  function serviceLabels() {
    return {
      photo: tt("contacts.svc.photo"),
      wedding: tt("contacts.svc.wed"),
      event: tt("contacts.svc.event"),
      other: tt("contacts.svc.other"),
    };
  }

  function monthNames() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) {
      return tt("js.month." + i);
    });
  }

  var bookedSet = {};
  var viewYear;
  var viewMonth;
  var openSheetEl = null;

  function showBanner(box, message) {
    if (successBox) successBox.classList.remove("is-visible");
    if (errorBox) errorBox.classList.remove("is-visible");
    if (box === errorBox && errorText && message) errorText.textContent = message;
    if (box) {
      box.classList.add("is-visible");
      box.setAttribute("role", "status");
      box.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    }
  }

  function clearBanner() {
    if (successBox) successBox.classList.remove("is-visible");
    if (errorBox) errorBox.classList.remove("is-visible");
  }

  function setHint(el, text, kind) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove("is-error", "is-ok");
    if (kind) el.classList.add(kind);
  }

  function markInvalid(el, on) {
    if (!el) return;
    el.classList.toggle("is-invalid", !!on);
  }

  function formatRu(iso) {
    var d = parseISODate(iso);
    if (!d) return iso;
    return pad2(d.getDate()) + "." + pad2(d.getMonth() + 1) + "." + d.getFullYear();
  }

  function syncSheetOpenClass() {
    var any = document.querySelector(".sheet.is-open");
    document.body.classList.toggle("sheet-open", !!any);
  }

  function closeSheet(sheet, trigger) {
    if (!sheet || !sheet.classList.contains("is-open")) return;
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (openSheetEl === sheet) openSheetEl = null;
    syncSheetOpenClass();
  }

  function openSheet(sheet, trigger) {
    if (!sheet) return;
    if (openSheetEl && openSheetEl !== sheet) {
      var otherTrigger =
        openSheetEl === dateSheet ? dateTrigger :
        openSheetEl === serviceSheet ? serviceTrigger : null;
      closeSheet(openSheetEl, otherTrigger);
    }
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    openSheetEl = sheet;
    syncSheetOpenClass();
  }

  function toggleSheet(sheet, trigger) {
    if (!sheet) return;
    if (sheet.classList.contains("is-open")) closeSheet(sheet, trigger);
    else openSheet(sheet, trigger);
  }

  function updateDateUI(iso, ok) {
    if (!datePicked || !dateTrigger) return;
    if (!iso) {
      datePicked.textContent = tt("contacts.pick.date");
      dateTrigger.classList.remove("is-set");
      return;
    }
    datePicked.textContent = formatRu(iso) + (ok === false ? tt("js.busy_suffix") : "");
    dateTrigger.classList.add("is-set");
  }

  function updateServiceUI(value) {
    if (!servicePicked || !serviceTrigger) return;
    var labels = serviceLabels();
    if (!value) {
      servicePicked.textContent = tt("contacts.pick.service");
      serviceTrigger.classList.remove("is-set");
    } else {
      servicePicked.textContent = labels[value] || value;
      serviceTrigger.classList.add("is-set");
    }
    document.querySelectorAll(".service-option").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-value") === value);
    });
  }

  function isBooked(iso) {
    return !!bookedSet[iso];
  }

  function validateDate(iso, silent) {
    markInvalid(dateTrigger, false);
    if (!iso) {
      if (!silent) {
        setHint(dateHint, tt("js.date_need"), "is-error");
        markInvalid(dateTrigger, true);
      } else {
        setHint(dateHint, tt("contacts.hint.date"));
      }
      updateDateUI("");
      return false;
    }
    var today = toISODate(new Date());
    if (iso < today) {
      setHint(dateHint, tt("js.date_past"), "is-error");
      updateDateUI(iso, false);
      markInvalid(dateTrigger, true);
      return false;
    }
    if (isBooked(iso)) {
      setHint(dateHint, tt("js.date_taken"), "is-error");
      updateDateUI(iso, false);
      markInvalid(dateTrigger, true);
      return false;
    }
    setHint(dateHint, tt("js.date_free", { date: formatRu(iso) }), "is-ok");
    updateDateUI(iso, true);
    return true;
  }

  function validateService(value, silent) {
    markInvalid(serviceTrigger, false);
    if (!value) {
      if (!silent) {
        setHint(serviceHint, tt("js.service_need"), "is-error");
        markInvalid(serviceTrigger, true);
      }
      return false;
    }
    setHint(serviceHint, tt("js.service_ok"), "is-ok");
    return true;
  }

  function validateForm() {
    var missing = [];
    markInvalid(nameInput, false);
    markInvalid(phoneInput, false);

    if (!nameInput || !String(nameInput.value || "").trim()) {
      missing.push(tt("js.field_name"));
      markInvalid(nameInput, true);
    }
    if (!phoneInput || !String(phoneInput.value || "").trim()) {
      missing.push(tt("js.field_phone"));
      markInvalid(phoneInput, true);
    }
    var dateOk = validateDate(dateInput ? dateInput.value : "", false);
    if (!dateOk) missing.push(tt("js.field_date"));
    var serviceOk = validateService(serviceInput ? serviceInput.value : "", false);
    if (!serviceOk) missing.push(tt("js.field_service"));

    if (missing.length) {
      showBanner(
        errorBox,
        missing.length === 1
          ? tt("js.fill_one", { field: missing[0] })
          : tt("js.fill_many", { fields: missing.join(", ") })
      );
      return false;
    }
    clearBanner();
    return true;
  }

  function renderCalendar() {
    if (!calGrid || !calTitle) return;
    calTitle.textContent = monthNames()[viewMonth] + " " + viewYear;

    var first = new Date(viewYear, viewMonth, 1);
    var startPad = (first.getDay() + 6) % 7;
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    var today = toISODate(new Date());
    var selected = dateInput ? dateInput.value : "";

    calGrid.innerHTML = "";

    var i;
    for (i = 0; i < startPad; i++) {
      var empty = document.createElement("span");
      empty.className = "date-calendar__day is-muted";
      empty.setAttribute("aria-hidden", "true");
      calGrid.appendChild(empty);
    }

    for (i = 1; i <= daysInMonth; i++) {
      var iso = viewYear + "-" + pad2(viewMonth + 1) + "-" + pad2(i);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "date-calendar__day";
      btn.textContent = String(i);
      btn.dataset.date = iso;

      var past = iso < today;
      var busy = isBooked(iso);
      if (iso === today) btn.classList.add("is-today");
      if (iso === selected) btn.classList.add("is-selected");

      if (past) {
        btn.disabled = true;
        btn.classList.add("is-muted");
      } else if (busy) {
        btn.disabled = true;
        btn.classList.add("is-busy");
        btn.title = tt("js.busy");
      } else {
        btn.title = tt("js.free");
        btn.addEventListener("click", function (ev) {
          var day = ev.currentTarget.dataset.date;
          if (dateInput) dateInput.value = day;
          validateDate(day, false);
          clearBanner();
          renderCalendar();
          window.setTimeout(function () {
            closeSheet(dateSheet, dateTrigger);
          }, prefersReducedMotion ? 0 : 180);
        });
      }
      calGrid.appendChild(btn);
    }
  }

  function mergeBooked(dates) {
    (dates || []).forEach(function (d) {
      if (d) bookedSet[d] = true;
    });
  }

  function loadBookedDates() {
    bookedSet = {};
    var fromBot = DATES_ENDPOINT
      ? fetch(DATES_ENDPOINT)
          .then(function (res) {
            if (!res.ok) throw new Error("dates_http_" + res.status);
            return res.json();
          })
          .then(function (data) {
            mergeBooked(data.booked || []);
          })
          .catch(function () { /* бот офлайн — ок */ })
      : Promise.resolve();

    var fromStore = Promise.resolve();
    if (window.RZBookings && typeof initFirebase === "function") {
      try {
        initFirebase();
        fromStore = RZBookings.fetchBookedDates()
          .then(mergeBooked)
          .catch(function () { /* Firestore ещё не готов */ });
      } catch (e) { /* SDK не загружен на этой странице */ }
    }

    return Promise.all([fromBot, fromStore]).then(function () {
      renderCalendar();
      if (dateInput && dateInput.value) validateDate(dateInput.value, true);
      if (!Object.keys(bookedSet).length) {
        setHint(dateHint, tt("contacts.hint.date"));
      }
    });
  }

  var now = new Date();
  viewYear = now.getFullYear();
  viewMonth = now.getMonth();
  renderCalendar();
  loadBookedDates();
  updateServiceUI(serviceInput ? serviceInput.value : "");

  if (dateTrigger) {
    dateTrigger.addEventListener("click", function () {
      toggleSheet(dateSheet, dateTrigger);
      if (dateSheet && dateSheet.classList.contains("is-open")) renderCalendar();
    });
  }
  if (serviceTrigger) {
    serviceTrigger.addEventListener("click", function () {
      toggleSheet(serviceSheet, serviceTrigger);
    });
  }

  document.querySelectorAll("[data-sheet-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      var sheet = el.closest(".sheet");
      if (sheet === dateSheet) closeSheet(dateSheet, dateTrigger);
      if (sheet === serviceSheet) closeSheet(serviceSheet, serviceTrigger);
    });
  });

  document.querySelectorAll(".service-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-value");
      if (serviceInput) serviceInput.value = value;
      updateServiceUI(value);
      validateService(value, false);
      clearBanner();
      window.setTimeout(function () {
        closeSheet(serviceSheet, serviceTrigger);
      }, prefersReducedMotion ? 0 : 160);
    });
  });

  if (calPrev) {
    calPrev.addEventListener("click", function () {
      viewMonth -= 1;
      if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
      renderCalendar();
    });
  }
  if (calNext) {
    calNext.addEventListener("click", function () {
      viewMonth += 1;
      if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
      renderCalendar();
    });
  }

  window.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeSheet(dateSheet, dateTrigger);
    closeSheet(serviceSheet, serviceTrigger);
  });

  [nameInput, phoneInput].forEach(function (el) {
    if (!el) return;
    el.addEventListener("input", function () { markInvalid(el, false); clearBanner(); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    closeSheet(dateSheet, dateTrigger);
    closeSheet(serviceSheet, serviceTrigger);
    if (!validateForm()) return;

    var data = Object.fromEntries(new FormData(form).entries());
    data.locale = window.RZi18n ? RZi18n.getLang() : "ru";
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = tt("js.sending"); }

    /* 1) Сначала Firestore (заявка не потеряется). 2) Потом бот (Telegram). */
    var savePromise;
    if (window.RZBookings && typeof initFirebase === "function") {
      try {
        initFirebase();
        savePromise = RZBookings.createBooking(data);
      } catch (e) {
        savePromise = Promise.reject(e);
      }
    } else {
      savePromise = Promise.reject(new Error("store_unavailable"));
    }

    savePromise
      .then(function (booking) {
        if (booking && booking.skipped) {
          showBanner(successBox);
          return;
        }

        form.reset();
        if (dateInput) dateInput.value = "";
        if (serviceInput) serviceInput.value = "";
        updateDateUI("");
        updateServiceUI("");
        setHint(dateHint, tt("contacts.hint.date"));
        setHint(serviceHint, tt("contacts.hint.service"));
        showBanner(successBox);
        window.setTimeout(function () {
          if (successBox) successBox.classList.remove("is-visible");
        }, 9000);

        /* Bot best-effort: skip when no public URL (avoids Chrome LNA prompt) */
        if (BOOKING_ENDPOINT) {
          RZBookings.notifyBot(booking, BOOKING_ENDPOINT).then(function (result) {
            if (!result.ok) {
              console.warn("Bot not notified, booking saved:", result);
            }
          });
        }
      })
      .catch(function (err) {
        console.error("Booking save failed:", err);
        var msg = String(err && err.message || err);
        if (/permission|unavailable|firestore|403|store_unavailable/i.test(msg)) {
          if (!BOOKING_ENDPOINT) {
            showBanner(
              errorBox,
              tt("js.save_fail")
            );
            return;
          }
          /* Firestore not ready — try bot path */
          return fetch(BOOKING_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then(function (res) {
              return res.json().then(function (body) {
                return { res: res, body: body || {} };
              }).catch(function () {
                return { res: res, body: {} };
              });
            })
            .then(function (pack) {
              var body = pack.body || {};
              if (pack.res.status === 409 || body.error === "date_taken") {
                if (data.event_date) bookedSet[data.event_date] = true;
                validateDate(data.event_date, false);
                renderCalendar();
                showBanner(errorBox, tt("js.date_taken"));
                return;
              }
              if (pack.res.status === 422) {
                showBanner(errorBox, body.message || tt("js.check_fields"));
                return;
              }
              if (!pack.res.ok || body.ok !== true) throw new Error("bad_response");

              form.reset();
              if (dateInput) dateInput.value = "";
              if (serviceInput) serviceInput.value = "";
              updateDateUI("");
              updateServiceUI("");
              showBanner(successBox);
            })
            .catch(function () {
              showBanner(errorBox, tt("js.save_fail"));
            });
        }
        showBanner(errorBox, tt("contacts.error"));
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = tt("contacts.submit");
        }
      });
  });

  if (window.RZi18n) {
    RZi18n.onChange(function () {
      updateDateUI(dateInput ? dateInput.value : "", dateInput && dateInput.value ? !isBooked(dateInput.value) : undefined);
      updateServiceUI(serviceInput ? serviceInput.value : "");
      renderCalendar();
      if (submitBtn && !submitBtn.disabled) submitBtn.textContent = tt("contacts.submit");
    });
  }
}
