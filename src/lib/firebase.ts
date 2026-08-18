// Firebase подключается лениво (динамические import), чтобы не тянуть SDK
// в основной бандл страницы — форма грузит его только при отправке.

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(config.apiKey && config.projectId);

export async function getFirebaseApp() {
  const { initializeApp, getApps, getApp } = await import('firebase/app');
  return getApps().length ? getApp() : initializeApp(config);
}

export async function getDb() {
  const app = await getFirebaseApp();
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(app);
}
