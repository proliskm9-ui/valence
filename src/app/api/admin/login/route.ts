import { NextResponse } from 'next/server';
import {
  adminSessionCookie,
  createAdminSessionToken,
  verifyAdminCredentials,
} from '@/lib/admin-auth';
import { firebaseEnabled } from '@/lib/firebase';

export async function POST(req: Request) {
  let body: { login?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
  }

  const login = String(body.login ?? '');
  const password = String(body.password ?? '');
  if (!verifyAdminCredentials(login, password)) {
    const errRes = NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
    errRes.cookies.set('agency_admin_session', '', { maxAge: 0, path: '/' });
    return errRes;
  }

  const cleanLogin = login.trim().toLowerCase();
  const token = createAdminSessionToken(cleanLogin);
  const res = NextResponse.json({ ok: true, login: cleanLogin });
  res.cookies.set(adminSessionCookie(token));
  return res;
}

