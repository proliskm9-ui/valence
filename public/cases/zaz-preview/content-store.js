/* =============================================================================
   RETRO ZAZ — контент сайта (fleet / gallery / pricing) в Firestore.
   ============================================================================= */

(function (global) {
  "use strict";

  var DEFAULT_FLEET = [
    {
      id: "city",
      order: 1,
      name: { ru: "«Городской» ЗАЗ-965", en: "“City” ZAZ-965" },
      plateMain: "965",
      plateRegion: { ru: "ГОРОД", en: "CITY" },
      ribbon: { ru: "РЕКОМЕНДУЕМ", en: "RECOMMENDED" },
      ribbonClass: "ribbon--teal",
      tag: {
        ru: "Уверенно ездит — берите на разъезды",
        en: "Drives confidently — take it for the day",
      },
      description: {
        ru: "Восстановленный и надёжный: спокойно катает по локациям, встречает молодых и позирует камере. Идеален, когда важно, чтобы машина именно ездила, а не только стояла в кадре.",
        en: "Restored and reliable: moves between locations, meets the couple and poses for camera. Ideal when the car must drive, not only stand still.",
      },
      year: "1963",
      color: { ru: "Серый", en: "Grey" },
      capacity: { ru: "до 3 чел.", en: "up to 3 people" },
      statusLabel: { ru: "Восстановлен", en: "Restored" },
      status: "available",
      priceFrom: 145,
      priceNote: { ru: "/ час · ≈ $50", en: "/ hour · ≈ $50" },
      coverUrl: "assets/images/главная%202.JPG",
      galleryUrls: [
        "assets/images/полубок%202.JPG",
        "assets/images/бок%202.JPG",
        "assets/images/зад%202.JPG",
        "assets/images/салон%202.JPG",
      ],
      specs: [
        { k: { ru: "Год", en: "Year" }, v: "1963" },
        { k: { ru: "Цвет", en: "Colour" }, v: { ru: "Серый", en: "Grey" } },
        { k: { ru: "Вместимость", en: "Seats" }, v: { ru: "до 3 чел.", en: "up to 3 people" } },
        { k: { ru: "Статус", en: "Status" }, v: { ru: "Восстановлен", en: "Restored" } },
      ],
    },
    {
      id: "original",
      order: 2,
      name: { ru: "«Оригинал» ЗАЗ-965", en: "“Original” ZAZ-965" },
      plateMain: "965",
      plateRegion: { ru: "ОРИГИНАЛ", en: "ORIGINAL" },
      ribbon: { ru: "1 ИЗ 1", en: "1 OF 1" },
      ribbonClass: "",
      tag: {
        ru: "100% оригинальные запчасти — единственный в Минске",
        en: "100% original parts — one of a kind in Minsk",
      },
      description: {
        ru: "Коллекционный экземпляр: собран из оригинальных деталей, без новодела. Для тех, кому важна настоящая, аутентичная фактура — каждый винтик из своей эпохи. Такого второго в городе нет.",
        en: "A collector car built from original parts, no modern replicas. For projects that need authentic texture — every bolt from its era. There isn’t a second one in the city.",
      },
      year: "1967",
      color: { ru: "Зелёный", en: "Green" },
      capacity: { ru: "до 3 чел.", en: "up to 3 people" },
      statusLabel: { ru: "Коллекционный", en: "Collector" },
      status: "available",
      priceFrom: 145,
      priceNote: { ru: "/ час · ≈ $50", en: "/ hour · ≈ $50" },
      coverUrl: "assets/images/главная.JPG",
      galleryUrls: [
        "assets/images/перед.JPG",
        "assets/images/полубок.JPG",
        "assets/images/бок.JPG",
        "assets/images/салон.JPG",
      ],
      specs: [
        { k: { ru: "Год", en: "Year" }, v: "1967" },
        { k: { ru: "Цвет", en: "Colour" }, v: { ru: "Зелёный", en: "Green" } },
        { k: { ru: "Комплектация", en: "Spec" }, v: { ru: "Оригинал 100%", en: "100% original" } },
        { k: { ru: "Статус", en: "Status" }, v: { ru: "Коллекционный", en: "Collector" } },
      ],
    },
  ];

  var DEFAULT_GALLERY = [];
  var gi;
  for (gi = 1; gi <= 8; gi++) {
    DEFAULT_GALLERY.push({
      id: "g" + gi,
      order: gi,
      imageUrl: "assets/images/" + gi + ".JPG",
      alt: "RETRO ZAZ — кадр " + gi,
      link: "https://www.instagram.com/retro_zaz",
    });
  }

  var DEFAULT_PRICING = [
    { id: "1h", order: 1, label: { ru: "1 час", en: "1 hour" }, byn: 145, usd: 50, featured: false },
    { id: "2h", order: 2, label: { ru: "2 часа", en: "2 hours" }, byn: 290, usd: 100, featured: true, badge: { ru: "Минимальный заказ", en: "Minimum booking" } },
    { id: "3h", order: 3, label: { ru: "3 часа", en: "3 hours" }, byn: 377, usd: 130, featured: false },
    { id: "5h", order: 4, label: { ru: "5 часов", en: "5 hours" }, byn: 580, usd: 200, featured: false },
    { id: "12h", order: 5, label: { ru: "12 часов", en: "12 hours" }, byn: 1015, usd: 350, featured: false, badge: { ru: "Полный день", en: "Full day" } },
  ];

  function db() {
    return global.initFirebase().db;
  }

  function storage() {
    var fb = global.initFirebase();
    return fb.storage;
  }

  function mapDocs(snap) {
    var list = [];
    snap.forEach(function (doc) {
      var row = doc.data() || {};
      row.id = doc.id;
      list.push(row);
    });
    return list;
  }

  function withFallback(opts) {
    return !opts || opts.fallback !== false;
  }

  function fetchFleet(opts) {
    var fb = withFallback(opts);
    return db()
      .collection("fleet")
      .get()
      .then(function (snap) {
        var list = mapDocs(snap);
        list.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
        if (list.length) return list;
        return fb ? DEFAULT_FLEET.slice() : [];
      })
      .catch(function () {
        return fb ? DEFAULT_FLEET.slice() : [];
      });
  }

  function fetchGallery(opts) {
    var fb = withFallback(opts);
    return db()
      .collection("gallery")
      .get()
      .then(function (snap) {
        var list = mapDocs(snap);
        list.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
        if (list.length) return list;
        return fb ? DEFAULT_GALLERY.slice() : [];
      })
      .catch(function () {
        return fb ? DEFAULT_GALLERY.slice() : [];
      });
  }

  function fetchPricing(opts) {
    var fb = withFallback(opts);
    return db()
      .collection("siteContent")
      .doc("pricing")
      .get()
      .then(function (doc) {
        if (doc.exists && Array.isArray(doc.data().items) && doc.data().items.length) {
          return doc.data().items.slice().sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
          });
        }
        return fb ? DEFAULT_PRICING.slice() : [];
      })
      .catch(function () {
        return fb ? DEFAULT_PRICING.slice() : [];
      });
  }

  function saveFleetItem(id, data) {
    var ref = id ? db().collection("fleet").doc(id) : db().collection("fleet").doc();
    var payload = Object.assign({}, data);
    delete payload.id;
    return ref.set(payload, { merge: true }).then(function () {
      return ref.id;
    });
  }

  function deleteFleetItem(id) {
    return db().collection("fleet").doc(id).delete();
  }

  function saveGalleryItem(id, data) {
    var ref = id ? db().collection("gallery").doc(id) : db().collection("gallery").doc();
    var payload = Object.assign({}, data);
    delete payload.id;
    return ref.set(payload, { merge: true }).then(function () {
      return ref.id;
    });
  }

  function deleteGalleryItem(id) {
    return db().collection("gallery").doc(id).delete();
  }

  function savePricing(items) {
    return db().collection("siteContent").doc("pricing").set({
      items: items,
      updated_at: new Date().toISOString(),
    });
  }

  function uploadImage(folder, file) {
    var st = storage();
    if (!st) return Promise.reject(new Error("Storage SDK не загружен"));
    var name = Date.now() + "-" + String(file.name || "img").replace(/[^\w.\-]+/g, "_");
    var ref = st.ref().child(folder + "/" + name);
    return ref.put(file).then(function () {
      return ref.getDownloadURL();
    });
  }

  function seedIfEmpty() {
    var fleetCol = db().collection("fleet");
    var galleryCol = db().collection("gallery");
    var pricingDoc = db().collection("siteContent").doc("pricing");

    return Promise.all([fleetCol.limit(1).get(), galleryCol.limit(1).get(), pricingDoc.get()])
      .then(function (pack) {
        var jobs = [];
        if (pack[0].empty) {
          DEFAULT_FLEET.forEach(function (car) {
            var copy = Object.assign({}, car);
            var id = copy.id;
            delete copy.id;
            jobs.push(fleetCol.doc(id).set(copy));
          });
        }
        if (pack[1].empty) {
          DEFAULT_GALLERY.forEach(function (g) {
            var copy = Object.assign({}, g);
            var id = copy.id;
            delete copy.id;
            jobs.push(galleryCol.doc(id).set(copy));
          });
        }
        if (!pack[2].exists) {
          jobs.push(savePricing(DEFAULT_PRICING));
        }
        return Promise.all(jobs);
      });
  }

  global.RZContent = {
    DEFAULT_FLEET: DEFAULT_FLEET,
    DEFAULT_GALLERY: DEFAULT_GALLERY,
    DEFAULT_PRICING: DEFAULT_PRICING,
    fetchFleet: fetchFleet,
    fetchGallery: fetchGallery,
    fetchPricing: fetchPricing,
    saveFleetItem: saveFleetItem,
    deleteFleetItem: deleteFleetItem,
    saveGalleryItem: saveGalleryItem,
    deleteGalleryItem: deleteGalleryItem,
    savePricing: savePricing,
    uploadImage: uploadImage,
    seedIfEmpty: seedIfEmpty,
  };
})(window);
