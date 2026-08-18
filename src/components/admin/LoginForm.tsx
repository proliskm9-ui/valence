'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';

type Props = {
  onSuccess: () => void;
};

export const ALLOWED_USERS: Record<string, string> = {
  ivanbylba: 'admin676767',
  dimasrus: 'admin676767',
  admin: 'admin676767',
};

export default function LoginForm({ onSuccess }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const login = String(data.get('login') ?? '').trim().toLowerCase();
    const password = String(data.get('password') ?? '').trim();
    setPending(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      if (res.ok) {
        localStorage.setItem('agency_admin_session', login);
        onSuccess();
        return;
      }
    } catch {
      // static export fallback
    }

    if (ALLOWED_USERS[login] && ALLOWED_USERS[login] === password) {
      localStorage.setItem('agency_admin_session', login);
      onSuccess();
    } else {
      setError('Неверный логин или пароль');
    }
    setPending(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#06090e] p-4 text-slate-100 font-sans selection:bg-[var(--accent)] selection:text-black">
      {/* Background Valence Lighting Effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0d131f]/90 p-8 shadow-2xl backdrop-blur-xl transition-all"
      >
        {/* Valence Header Badge */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)] shadow-[0_0_15px_rgba(255,77,0,0.2)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            VALENCE // CONTROL PANEL
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white uppercase">
            Авторизация в CRM
          </h1>
          <p className="mt-1 text-xs text-slate-400 font-sans">
            Введите логин и пароль для доступа к системе
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Логин
            </label>
            <input
              name="login"
              type="text"
              required
              placeholder="Логин сотрудника..."
              autoComplete="username"
              className="w-full rounded-xl border border-white/10 bg-[#06090e] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-[#06090e] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-mono text-xs text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-4 w-full rounded-xl bg-[var(--accent)] py-3.5 font-display text-sm font-bold text-black shadow-[0_0_25px_rgba(255,77,0,0.35)] transition-all hover:bg-[var(--accent)]/90 active:scale-[0.99] disabled:opacity-50"
          >
            {pending ? 'Проверка доступа...' : 'Войти в панель →'}
          </button>
        </div>

        <div className="mt-6 text-center font-mono text-[11px] text-slate-500">
          Защищенный доступ для команды Valence
        </div>
      </form>
    </div>
  );
}
