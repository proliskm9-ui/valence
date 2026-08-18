import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'agency_admin_session';
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Загружает список admin-пользователей из env-переменных.
 *
 * Формат ADMINS (рекомендуется):
 *   ADMINS=ivanbylba:mypassword1,dimasrus:mypassword2
 *
 * Fallback (legacy):
 *   ADMIN_LOGIN=admin
 *   ADMIN_PASSWORD=secretpassword
 */
function loadAllowedAdmins(): Record<string, string> {
  const adminsEnv = process.env.ADMINS?.trim();
  if (adminsEnv) {
    const result: Record<string, string> = {};
    for (const entry of adminsEnv.split(',')) {
      const colonIdx = entry.indexOf(':');
      if (colonIdx < 1) continue;
      const login = entry.slice(0, colonIdx).trim().toLowerCase();
      const pass = entry.slice(colonIdx + 1).trim();
      if (login && pass) result[login] = pass;
    }
    if (Object.keys(result).length > 0) return result;
  }

  // Legacy fallback: single admin from ADMIN_LOGIN / ADMIN_PASSWORD
  const login = (process.env.ADMIN_LOGIN?.trim() || 'admin').toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim() || '';
  if (password) return { [login]: password };

  // Dev-only fallback — warn in console if no env is set
  console.warn(
    '[admin-auth] ⚠️  No ADMINS or ADMIN_PASSWORD env variable found! ' +
    'Set ADMINS=login:password in .env.local'
  );
  return {};
}

export function getAdminConfig() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || 'valence_crm_secret_key_2026';
  return { secret };
}

/** Email, под которым админ ходит в Firebase Auth (скрыт от UI). */
export function adminFirebaseEmail(login: string) {
  const safe = login.toLowerCase().replace(/[^a-z0-9._-]/g, '_').slice(0, 64);
  return `${safe || 'admin'}@agency.admin`;
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) {
    timingSafeEqual(ba, ba);
    return false;
  }
  return timingSafeEqual(ba, bb);
}

export function verifyAdminCredentials(login: string, password: string): boolean {
  const allowedAdmins = loadAllowedAdmins();
  const cleanLogin = login.trim().toLowerCase();
  const expectedPassword = allowedAdmins[cleanLogin];
  if (!expectedPassword) return false;
  return safeEqual(password, expectedPassword);
}

export function createAdminSessionToken(login: string) {
  const { secret } = getAdminConfig();
  const exp = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = `${login}.${exp}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string): { login: string } | null {
  const { secret } = getAdminConfig();
  if (!secret) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [login, expStr, sig] = parts;
  const payload = `${login}.${expStr}`;
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  if (!safeEqual(sig, expected)) return null;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  const allowedAdmins = loadAllowedAdmins();
  if (!allowedAdmins[login.toLowerCase()]) return null;
  return { login };
}

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}

export function adminSessionCookie(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}

