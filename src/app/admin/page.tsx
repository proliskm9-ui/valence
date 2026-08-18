'use client';

import { useCallback, useEffect, useState } from 'react';
import LoginForm, { ALLOWED_USERS } from '@/components/admin/LoginForm';
import CRMDashboard from '@/components/admin/CRMDashboard';
import Cursor from '@/components/ui/Cursor';

type SessionState =
  | { status: 'loading' }
  | { status: 'guest' }
  | { status: 'auth'; login: string };

export default function AdminPage() {
  const [session, setSession] = useState<SessionState>({ status: 'loading' });

  const refreshSession = useCallback(async () => {
    // Check localStorage fallback for static export (Firebase Hosting)
    const localUser = localStorage.getItem('agency_admin_session');
    if (localUser && ALLOWED_USERS[localUser.toLowerCase()]) {
      setSession({ status: 'auth', login: localUser });
      return;
    } else if (localUser) {
      localStorage.removeItem('agency_admin_session');
    }

    try {
      const res = await fetch('/api/admin/session', { cache: 'no-store' });
      const json = (await res.json()) as {
        authenticated?: boolean;
        login?: string;
      };
      if (json.authenticated && json.login) {
        setSession({ status: 'auth', login: json.login });
        return;
      }
      setSession({ status: 'guest' });
    } catch {
      setSession({ status: 'guest' });
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const signOut = async () => {
    localStorage.removeItem('agency_admin_session');
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    setSession({ status: 'guest' });
  };

  if (session.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b] font-mono text-xs text-[var(--accent)]">
        <Cursor />
        VALENCE // CONTROL PANEL LOADING...
      </div>
    );
  }

  if (session.status === 'guest') {
    return (
      <>
        <Cursor />
        <LoginForm onSuccess={refreshSession} />
      </>
    );
  }

  return (
    <>
      <Cursor />
      <CRMDashboard onSignOut={signOut} />
    </>
  );
}
