/* =============================================================================
   RETRO ZAZ — публичный рендер контента из Firestore (с HTML-fallback).
   ============================================================================= */

(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function escAttr(s) {
    return esc(s).replace(/'/g, "&#39;");
  }

  function L(value) {
    return window.RZi18n ? RZi18n.localize(value) : (value == null ? "" : String(value));
  }

  function carHtml(car, opts) {
    opts = opts || {};
    var reverse = opts.reverse ? " reverse" : "";
    var heading = opts.h2 ? "h2" : "h3";
    var ribbonClass = car.ribbonClass ? " " + car.ribbonClass : "";
    var specs = Array.isArray(car.specs) ? car.specs : [];
    var specsHtml = specs.map(function (s) {
      return '<div class="car-spec"><div class="k">' + esc(L(s.k)) + '</div><div class="v">' + esc(L(s.v)) + '</div></div>';
    }).join("");
    var priceNote = L(car.priceNote) || (window.RZi18n ? RZi18n.t("price.hour_note") : "/ час · ≈ $50");
    var bookLabel = window.RZi18n ? RZi18n.t("cta.book") : "Забронировать";
    var fromLabel = window.RZi18n ? RZi18n.t("price.from") : "от";
    var cover = car.coverUrl || "";
    var name = L(car.name);
    return (
      '<article class="car' + reverse + ' reveal in">' +
        '<div class="car-media">' +
          (car.ribbon ? '<div class="ribbon' + ribbonClass + '">' + esc(L(car.ribbon)) + '</div>' : "") +
          '<div class="photo-slot on-ink has-img"><img src="' + escAttr(cover) + '" alt="' + escAttr(name || "ЗАЗ-965") + '" loading="lazy" width="900" height="700" /></div>' +
        '</div>' +
        '<div class="car-body">' +
          '<span class="plate car-plate"><span class="plate-main">' + esc(car.plateMain || "965") + '</span><span class="plate-region">' + esc(L(car.plateRegion) || "") + '</span></span>' +
          '<' + heading + ' class="car-name">' + esc(name || "") + '</' + heading + '>' +
          (car.tag ? '<div class="car-tag">' + esc(L(car.tag)) + '</div>' : "") +
          (car.description ? '<p class="car-desc">' + esc(L(car.description)) + '</p>' : "") +
          '<div class="car-specs">' + specsHtml + '</div>' +
          '<div class="car-footer">' +
            '<div class="car-price">' + esc(fromLabel) + ' ' + esc(car.priceFrom != null ? car.priceFrom : "—") + ' BYN <small>' + esc(priceNote) + '</small></div>' +
            '<a href="contacts.html" class="btn btn-mustard">' + esc(bookLabel) + '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function miniGalleryHtml(urls, name) {
    if (!urls || !urls.length) return "";
    return (
      '<div class="gallery-grid reveal in" style="margin-bottom:56px;">' +
        urls.map(function (url) {
          return (
            '<a class="gallery-item" href="' + escAttr(url) + '" target="_blank" rel="noopener"><div class="photo-slot on-ink square has-img">' +
              '<img src="' + escAttr(url) + '" alt="' + escAttr(name || "ЗАЗ-965") + '" loading="lazy" width="600" height="600" />' +
            '</div></a>'
          );
        }).join("") +
      '</div>'
    );
  }

  function priceTableHtml(items) {
    return items.map(function (row) {
      var cls = row.featured ? ' class="price-row is-featured"' : ' class="price-row"';
      var note = row.badge ? '<span class="note">' + esc(L(row.badge)) + '</span>' : "";
      return (
        '<div' + cls + '>' +
          '<div class="price-dur"><span class="d">' + esc(L(row.label)) + '</span>' + note + '</div>' +
          '<div class="price-byn">' + esc(row.byn) + ' BYN</div>' +
          '<div class="price-usd">≈ $' + esc(row.usd) + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function galleryGridHtml(items) {
    return items.map(function (g) {
      var href = g.link || "https://www.instagram.com/retro_zaz";
      return (
        '<a class="gallery-item" href="' + escAttr(href) + '" target="_blank" rel="noopener">' +
          '<div class="photo-slot square has-img">' +
            '<img src="' + escAttr(g.imageUrl) + '" alt="' + escAttr(L(g.alt) || "RETRO ZAZ") + '" loading="lazy" width="600" height="600" />' +
          '</div>' +
        '</a>'
      );
    }).join("");
  }

  function bindFleetPreview(cars) {
    var host = document.querySelector("[data-bind=\"fleet-preview\"]");
    if (!host || !cars.length) return;
    var cta = host.querySelector(".fleet-preview-cta");
    var html = cars.map(function (car, i) {
      return carHtml(car, { reverse: i % 2 === 1, h2: false });
    }).join("");
    if (cta) html += cta.outerHTML;
    else {
      html +=
        '<div style="text-align:center;margin-top:40px;" class="reveal in fleet-preview-cta">' +
          '<a href="fleet.html" class="btn btn-outline btn-lg">' +
          esc(window.RZi18n ? RZi18n.t("cta.fleet_details") : "Все детали автопарка") +
          '</a>' +
        '</div>';
    }
    host.innerHTML = html;
  }

  function bindFleetPage(cars) {
    var host = document.querySelector("[data-bind=\"fleet-list\"]");
    if (!host || !cars.length) return;
    host.innerHTML = cars.map(function (car, i) {
      return carHtml(car, { reverse: i % 2 === 1, h2: true }) + miniGalleryHtml(car.galleryUrls, car.name);
    }).join("");
  }

  function bindPricing(items) {
    if (!items.length) return;
    document.querySelectorAll("[data-bind=\"pricing\"]").forEach(function (el) {
      el.innerHTML = priceTableHtml(items);
    });
  }

  function bindGallery(items) {
    var host = document.querySelector("[data-bind=\"gallery\"]");
    if (!host || !items.length) return;
    host.innerHTML = galleryGridHtml(items);
  }

  function refreshPublicUI() {
    if (typeof window.RZRefreshPublicUI === "function") {
      window.RZRefreshPublicUI();
      return;
    }
    /* script.js ещё не успел — просто покажем блоки */
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }

  var cache = { fleet: null, gallery: null, pricing: null };

  function boot() {
    if (typeof RZContent === "undefined" || typeof initFirebase !== "function") return;
    try { initFirebase(); } catch (e) { return; }

    function renderAll() {
      var fleet = cache.fleet || [];
      var gallery = cache.gallery || [];
      var pricing = cache.pricing || [];
      bindFleetPreview(fleet);
      bindFleetPage(fleet);
      bindGallery(gallery);
      bindPricing(pricing);
      refreshPublicUI();
    }

    var live = { fallback: false };
    Promise.all([
      RZContent.fetchFleet(live),
      RZContent.fetchGallery(live),
      RZContent.fetchPricing(live),
    ]).then(function (pack) {
      cache.fleet = pack[0] || [];
      cache.gallery = pack[1] || [];
      cache.pricing = pack[2] || [];
      renderAll();
    }).catch(function () { /* keep static HTML */ });

    if (window.RZi18n) {
      RZi18n.onChange(function () {
        if (cache.fleet || cache.gallery || cache.pricing) renderAll();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
