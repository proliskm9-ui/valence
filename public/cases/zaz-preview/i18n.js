/* =============================================================================
   RETRO ZAZ — клиентский RU/EN.
   Словари: locales/ru.js, locales/en.js → window.RZ_I18N_DICT
   ============================================================================= */
(function (global) {
  "use strict";

  var STORAGE_KEY = "rz_lang";
  var SUPPORTED = { ru: true, en: true };
  var current = "ru";
  var listeners = [];

  function dict() {
    return (global.RZ_I18N_DICT && global.RZ_I18N_DICT[current]) || {};
  }

  function t(key, vars) {
    var d = dict();
    var s = d[key];
    if (s == null && global.RZ_I18N_DICT && global.RZ_I18N_DICT.ru) {
      s = global.RZ_I18N_DICT.ru[key];
    }
    if (s == null) return key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = String(s).split("{" + k + "}").join(String(vars[k]));
      });
    }
    return s;
  }

  function detect() {
    try {
      var params = new URLSearchParams(location.search);
      var q = (params.get("lang") || "").toLowerCase();
      if (SUPPORTED[q]) return q;
    } catch (e1) { /* */ }
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED[stored]) return stored;
    } catch (e2) { /* */ }
    try {
      var nav = (navigator.language || navigator.userLanguage || "ru").toLowerCase();
      if (nav.indexOf("en") === 0) return "en";
    } catch (e3) { /* */ }
    return "ru";
  }

  function persist(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* */ }
    try {
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e2) { /* */ }
  }

  function metaKey(base) {
    var prefix = document.documentElement.getAttribute("data-i18n-meta-prefix");
    if (prefix) {
      var keyed = prefix + "." + base;
      if (dict()[keyed] != null || (global.RZ_I18N_DICT && global.RZ_I18N_DICT.ru && global.RZ_I18N_DICT.ru[keyed] != null)) {
        return keyed;
      }
    }
    return base;
  }

  function applyMeta() {
    var title = t(metaKey("meta.title"));
    var description = t(metaKey("meta.description"));
    if (title && title !== metaKey("meta.title")) document.title = title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && description && description !== metaKey("meta.description")) {
      desc.setAttribute("content", description);
    }
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute("content", title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute("content", description);
    var twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && title) twTitle.setAttribute("content", title);
    var twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && description) twDesc.setAttribute("content", description);
  }

  function applyDom(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var val = t(key);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val;
      else el.textContent = val;
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var map = el.getAttribute("data-i18n-attr");
      if (!map) return;
      map.split(",").forEach(function (pair) {
        var parts = pair.trim().split(":");
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
  }

  function updateSwitcher() {
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      var lang = btn.getAttribute("data-lang");
      var on = lang === current;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function updateMap() {
    var iframe = document.querySelector(".map-slot iframe");
    if (!iframe) return;
    var src = iframe.getAttribute("src") || "";
    if (!src) return;
    var next = src.replace(/([?&])hl=[a-z]{2}/i, "$1hl=" + current);
    if (next === src && src.indexOf("hl=") === -1) {
      next = src + (src.indexOf("?") >= 0 ? "&" : "?") + "hl=" + current;
    }
    if (next !== src) iframe.setAttribute("src", next);
  }

  function apply(lang, opts) {
    opts = opts || {};
    if (!SUPPORTED[lang]) lang = "ru";
    current = lang;
    document.documentElement.setAttribute("lang", lang);
    if (!opts.skipPersist) persist(lang);
    applyMeta();
    applyDom(document);
    updateSwitcher();
    updateMap();
    listeners.forEach(function (fn) {
      try { fn(lang); } catch (e) { console.warn("i18n listener", e); }
    });
  }

  function onChange(fn) {
    if (typeof fn === "function") listeners.push(fn);
  }

  function bindSwitcher() {
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        if (lang && lang !== current) apply(lang);
      });
    });
  }

  function localize(value, fallbackLang) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (typeof value === "object") {
      if (value[current] != null && value[current] !== "") return String(value[current]);
      if (value.ru != null && value.ru !== "") return String(value.ru);
      if (value.en != null && value.en !== "") return String(value.en);
      if (fallbackLang && value[fallbackLang] != null) return String(value[fallbackLang]);
    }
    return "";
  }

  function init() {
    bindSwitcher();
    apply(detect(), { skipPersist: false });
  }

  global.RZi18n = {
    t: t,
    getLang: function () { return current; },
    setLang: apply,
    applyDom: applyDom,
    onChange: onChange,
    localize: localize,
    init: init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
