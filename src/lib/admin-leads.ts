import { adminFirebaseEmail } from '@/lib/admin-auth';
import { firebaseEnabled, getFirebaseApp } from '@/lib/firebase';
import type { LeadStatus } from '@/lib/leads';

async function identityToolkit(
  path: 'signInWithPassword' | 'signUp',
  email: string,
  password: string,
) {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) throw new Error('firebase-not-configured');

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${path}?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    },
  );
  const data = (await res.json()) as {
    idToken?: string;
    error?: { message?: string };
  };
  if (!res.ok || !data.idToken) {
    throw new Error(data.error?.message ?? 'firebase-auth-failed');
  }
}

/**
 * Создаёт Firebase-пользователя админа при первом входе, если его ещё нет.
 * Принимает login и password явно, не зависит от getAdminConfig().
 */
export async function ensureAdminFirebaseUser(login?: string, password?: string) {
  if (!firebaseEnabled || !login || !password) return;
  const email = adminFirebaseEmail(login);
  try {
    await identityToolkit('signInWithPassword', email, password);
  } catch {
    try {
      await identityToolkit('signUp', email, password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('EMAIL_EXISTS')) {
        // Пользователь есть, но пароль в Firebase не совпадает с переданным
        throw new Error('firebase-password-mismatch');
      }
      throw err;
    }
  }
}


async function getAdminDb() {
  if (!firebaseEnabled) {
    throw new Error('firebase-not-configured');
  }

  const app = await getFirebaseApp();
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(app);
}


export type AdminLead = {
  id: string;
  name: string;
  contact: string;
  message: string;
  budget: string | null;
  createdAt: string | null;
  status: LeadStatus;
};

export async function listAdminLeads(): Promise<AdminLead[]> {
  const db = await getAdminDb();
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const snap = await getDocs(
    query(collection(db, 'leads'), orderBy('createdAt', 'desc')),
  );
  return snap.docs.map((d) => {
    const data = d.data();
    const createdAt = data.createdAt?.toDate?.() as Date | undefined;
    return {
      id: d.id,
      name: String(data.name ?? ''),
      contact: String(data.contact ?? ''),
      message: String(data.message ?? ''),
      budget: data.budget == null ? null : String(data.budget),
      createdAt: createdAt ? createdAt.toISOString() : null,
      status: (data.status ?? 'new') as LeadStatus,
    };
  });
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const db = await getAdminDb();
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(db, 'leads', id), { status });
}
