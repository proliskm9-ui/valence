/* Firebase web-конфиг RETRO ZAZ (проект zazretro). */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCwo0jzx8duQYK5y3pn5btf367PKxbegY4",
  authDomain: "zazretro.firebaseapp.com",
  projectId: "zazretro",
  storageBucket: "zazretro.firebasestorage.app",
  messagingSenderId: "580731637399",
  appId: "1:580731637399:web:b84e24546bec428219e3d2",
  measurementId: "G-V87HW204DF",
};

/* Вход в админку */
window.ADMIN_LOGIN = "Admin";
window.ADMIN_PASSWORD = "k8wR2mXs";

window.initFirebase = function initFirebase() {
  if (window._rzFirebase) return window._rzFirebase;
  if (typeof firebase === "undefined") {
    throw new Error("Firebase SDK не загружен");
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(window.FIREBASE_CONFIG);
  }
  var storage = null;
  try {
    if (firebase.storage) storage = firebase.storage();
  } catch (e) { /* */ }
  window._rzFirebase = {
    app: firebase.app(),
    db: firebase.firestore(),
    storage: storage,
  };
  return window._rzFirebase;
};
