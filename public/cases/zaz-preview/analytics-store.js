/* =============================================================================
   RETRO ZAZ — аналитика посещений (Firestore).
   ============================================================================= */

(function (global) {
  "use strict";

  var SKIP_PREFIXES = [
    "/admin", "/dashboard", "/bookings", "/dates",
    "/fleet-admin", "/gallery-admin", "/prices", "/stats",
  ];

  var PAGE_LABELS = {
    _home: "Главная",
    fleet: "Автопарк",
    services: "Услуги",
    contacts: "Контакты",
  };

  function db() {
    return global.initFirebase().db;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function dayShiftISO(iso, delta) {
    var p = String(iso).split("-");
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    d.setDate(d.getDate() + delta);
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function normalizePath(path) {
    var p = String(path || "/").split("?")[0].split("#")[0];
    p = p.replace(/\.html$/i, "");
    if (p.length > 1) p = p.replace(/\/+$/, "");
    if (!p) p = "/";
    return p;
  }

  function shouldSkip(path) {
    var p = normalizePath(path);
    return SKIP_PREFIXES.some(function (pre) {
      return p === pre || p.indexOf(pre + "/") === 0;
    });
  }

  function pageKey(path) {
    var p = normalizePath(path);
    if (p === "/") return "_home";
    return p.replace(/^\//, "").replace(/[\/.#$\[\]]/g, "_").slice(0, 60) || "_other";
  }

  function pageLabel(key) {
    if (PAGE_LABELS[key]) return PAGE_LABELS[key];
    if (key === "_home") return "Главная";
    return "/" + String(key).replace(/_/g, "/");
  }

  function recordVisit(payload) {
    payload = payload || {};
    var path = normalizePath(payload.path || "/");
    if (shouldSkip(path)) return Promise.resolve({ ok: true, skipped: true });

    var day = todayISO();
    var key = pageKey(path);
    var isNew = !!payload.new_session;
    var FieldValue = firebase.firestore.FieldValue;
    var updates = {
      pageviews: FieldValue.increment(1),
      updated_at: new Date().toISOString(),
    };
    updates["pages." + key] = FieldValue.increment(1);
    if (isNew) updates.sessions = FieldValue.increment(1);

    var totalUpdates = {
      totalPageviews: FieldValue.increment(1),
      updated_at: new Date().toISOString(),
    };
    if (isNew) totalUpdates.totalSessions = FieldValue.increment(1);

    return Promise.all([
      db().collection("siteStats").doc(day).set(updates, { merge: true }),
      db().collection("siteStats").doc("_totals").set(totalUpdates, { merge: true }),
    ]).then(function () {
      return { ok: true, path: path, day: day };
    });
  }

  function emptyDay() {
    return { pageviews: 0, sessions: 0, pages: {} };
  }

  function fetchRange(days) {
    var today = todayISO();
    var ids = [];
    var i;
    for (i = days - 1; i >= 0; i--) ids.push(dayShiftISO(today, -i));

    return Promise.all(
      ids.map(function (id) {
        return db()
          .collection("siteStats")
          .doc(id)
          .get()
          .then(function (doc) {
            var data = doc.exists ? doc.data() || {} : {};
            return {
              date: id,
              pageviews: Number(data.pageviews) || 0,
              sessions: Number(data.sessions) || 0,
              pages: data.pages || {},
            };
          })
          .catch(function () {
            return { date: id, pageviews: 0, sessions: 0, pages: {} };
          });
      })
    );
  }

  function fetchTotals() {
    return db()
      .collection("siteStats")
      .doc("_totals")
      .get()
      .then(function (doc) {
        if (!doc.exists) return { totalPageviews: 0, totalSessions: 0 };
        var d = doc.data() || {};
        return {
          totalPageviews: Number(d.totalPageviews) || 0,
          totalSessions: Number(d.totalSessions) || 0,
        };
      })
      .catch(function () {
        return { totalPageviews: 0, totalSessions: 0 };
      });
  }

  function sumDays(list) {
    var views = 0;
    var sessions = 0;
    var pages = {};
    list.forEach(function (d) {
      views += d.pageviews || 0;
      sessions += d.sessions || 0;
      Object.keys(d.pages || {}).forEach(function (k) {
        pages[k] = (pages[k] || 0) + (Number(d.pages[k]) || 0);
      });
    });
    return { pageviews: views, sessions: sessions, pages: pages };
  }

  function topPages(pagesMap, limit) {
    return Object.keys(pagesMap || {})
      .map(function (k) {
        return { key: k, label: pageLabel(k), views: Number(pagesMap[k]) || 0 };
      })
      .sort(function (a, b) { return b.views - a.views; })
      .slice(0, limit || 8);
  }

  function fetchDashboard() {
    return Promise.all([fetchRange(30), fetchTotals()]).then(function (pack) {
      var days30 = pack[0];
      var totals = pack[1];
      var today = days30[days30.length - 1] || emptyDay();
      var yesterday = days30[days30.length - 2] || emptyDay();
      var last7 = days30.slice(-7);
      var sum7 = sumDays(last7);
      var sum30 = sumDays(days30);

      /* если _totals пуст — считаем из дней */
      if (!totals.totalPageviews && sum30.pageviews) {
        totals = {
          totalPageviews: sum30.pageviews,
          totalSessions: sum30.sessions,
        };
      }

      return {
        today: today,
        yesterday: yesterday,
        last7: last7,
        last14: days30.slice(-14),
        last30: days30,
        sum7: sum7,
        sum30: sum30,
        totals: totals,
        topPages7: topPages(sum7.pages, 8),
        topPages30: topPages(sum30.pages, 8),
      };
    });
  }

  /** Одноразовый импорт старых данных из бота (visits.json shape). */
  function seedFromLegacy(legacy) {
    if (!legacy || !legacy.days) return Promise.resolve(false);
    var col = db().collection("siteStats");
    return col.doc("_totals").get().then(function (doc) {
      if (doc.exists && (doc.data().totalPageviews || 0) > 0) return false;
      var jobs = [];
      Object.keys(legacy.days).forEach(function (day) {
        var d = legacy.days[day] || {};
        var pages = {};
        Object.keys(d.pages || {}).forEach(function (p) {
          pages[pageKey(p)] = Number(d.pages[p]) || 0;
        });
        jobs.push(
          col.doc(day).set(
            {
              pageviews: Number(d.pageviews) || 0,
              sessions: Number(d.sessions) || 0,
              pages: pages,
              seeded: true,
              updated_at: new Date().toISOString(),
            },
            { merge: true }
          )
        );
      });
      jobs.push(
        col.doc("_totals").set(
          {
            totalPageviews: Number(legacy.totalPageviews) || 0,
            totalSessions: Number(legacy.totalSessions) || 0,
            seeded: true,
            updated_at: new Date().toISOString(),
          },
          { merge: true }
        )
      );
      return Promise.all(jobs).then(function () { return true; });
    });
  }

  global.RZAnalytics = {
    recordVisit: recordVisit,
    fetchDashboard: fetchDashboard,
    fetchRange: fetchRange,
    seedFromLegacy: seedFromLegacy,
    pageLabel: pageLabel,
    todayISO: todayISO,
    dayShiftISO: dayShiftISO,
    shouldSkip: shouldSkip,
  };
})(window);
