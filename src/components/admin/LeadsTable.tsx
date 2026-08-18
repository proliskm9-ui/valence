'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LeadStatus } from '@/lib/leads';

type Lead = {
  id: string;
  name: string;
  contact: string;
  message: string;
  budget: string | null;
  createdAt: string | null;
  status: LeadStatus;
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'новая',
  contacted: 'связались',
  kp_sent: 'КП отправлено',
  prepaid: 'предоплата',
  in_progress: 'в работе',
  done: 'завершена',
};

const STATUS_NEXT: Record<LeadStatus, LeadStatus> = {
  new: 'contacted',
  contacted: 'kp_sent',
  kp_sent: 'prepaid',
  prepaid: 'in_progress',
  in_progress: 'done',
  done: 'new',
};

const STATUS_CLS: Record<LeadStatus, string> = {
  new: 'bg-accent text-bg',
  contacted: 'border border-blue-400 text-blue-400',
  kp_sent: 'border border-amber-400 text-amber-400',
  prepaid: 'border border-purple-400 text-purple-400',
  in_progress: 'border border-fg/40 text-fg',
  done: 'border border-line text-muted',
};

const FILTERS: { id: LeadStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'все' },
  { id: 'new', label: 'новые' },
  { id: 'in_progress', label: 'в работе' },
  { id: 'done', label: 'завершенные' },
];

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [desc, setDesc] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [firebaseOff, setFirebaseOff] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/leads', { cache: 'no-store' });
      if (res.status === 401) {
        setError('Сессия истекла. Обновите страницу и войдите снова.');
        return;
      }
      const json = (await res.json()) as {
        leads?: Lead[];
        firebase?: boolean;
        error?: string;
      };
      if (!res.ok) {
        setError(json.error ?? 'Не удалось загрузить заявки.');
        return;
      }
      setFirebaseOff(json.firebase === false);
      setLeads(json.leads ?? []);
      setError('');
    } catch {
      setError('Не удалось загрузить заявки.');
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 15_000);
    return () => window.clearInterval(id);
  }, [load]);

  const cycleStatus = async (lead: Lead) => {
    const next = STATUS_NEXT[lead.status];
    setLeads((ls) =>
      ls?.map((l) => (l.id === lead.id ? { ...l, status: next } : l)) ?? null,
    );
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, status: next }),
      });
      if (!res.ok) throw new Error('fail');
    } catch {
      setLeads((ls) =>
        ls?.map((l) => (l.id === lead.id ? { ...l, status: lead.status } : l)) ??
          null,
      );
    }
  };

  const newCount = useMemo(
    () => leads?.filter((l) => l.status === 'new').length ?? 0,
    [leads],
  );

  const visible = useMemo(() => {
    if (!leads) return [];
    const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);
    return desc ? filtered : [...filtered].reverse();
  }, [leads, filter, desc]);

  if (error) {
    return <p className="m-auto font-mono text-sm text-[#ff6b6b]">{error}</p>;
  }
  if (!leads) {
    return <p className="m-auto font-mono text-sm text-muted">загрузка заявок…</p>;
  }
  if (firebaseOff) {
    return (
      <p className="m-auto max-w-md text-center font-mono text-sm text-muted">
        Вы вошли, но Firebase не настроен — заявки появятся после заполнения{' '}
        <code>NEXT_PUBLIC_FIREBASE_*</code> в <code>.env.local</code>.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                filter === f.id
                  ? 'bg-fg text-bg'
                  : 'border border-line text-muted hover:text-fg'
              }`}
            >
              {f.label}
              {f.id === 'new' && newCount > 0 && (
                <span className="ml-2 rounded-full bg-accent px-1.5 text-bg">
                  {newCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDesc((d) => !d)}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
        >
          по дате {desc ? '↓' : '↑'}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center font-mono text-sm text-muted">
          {filter === 'all' ? 'Заявок пока нет.' : 'В этом статусе заявок нет.'}
        </p>
      ) : (
        <>
          <div className="mt-6 hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  <th className="py-3 pr-4 font-normal">дата</th>
                  <th className="py-3 pr-4 font-normal">имя</th>
                  <th className="py-3 pr-4 font-normal">контакт</th>
                  <th className="py-3 pr-4 font-normal">сообщение</th>
                  <th className="py-3 pr-4 font-normal">бюджет</th>
                  <th className="py-3 font-normal">статус</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((l) => (
                  <tr key={l.id} className="border-b border-line align-top">
                    <td className="whitespace-nowrap py-4 pr-4 font-mono text-xs text-muted">
                      {formatDate(l.createdAt)}
                    </td>
                    <td className="py-4 pr-4">{l.name}</td>
                    <td className="py-4 pr-4 font-mono text-xs">{l.contact}</td>
                    <td className="max-w-md py-4 pr-4 text-muted">
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                        className={`text-left ${expanded === l.id ? '' : 'line-clamp-2'}`}
                        title="Показать полностью"
                      >
                        {l.message}
                      </button>
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4 font-mono text-xs text-muted">
                      {l.budget ?? '—'}
                    </td>
                    <td className="py-4">
                      <button
                        type="button"
                        onClick={() => cycleStatus(l)}
                        title="Кликните, чтобы сменить статус"
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-transform active:scale-95 ${STATUS_CLS[l.status]}`}
                      >
                        {STATUS_LABEL[l.status]}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-4 md:hidden">
            {visible.map((l) => (
              <div key={l.id} className="border border-line bg-bg2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted">
                    {formatDate(l.createdAt)}
                  </span>
                  <button
                    type="button"
                    onClick={() => cycleStatus(l)}
                    className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${STATUS_CLS[l.status]}`}
                  >
                    {STATUS_LABEL[l.status]}
                  </button>
                </div>
                <p className="mt-3 font-medium">{l.name}</p>
                <p className="font-mono text-xs text-muted">{l.contact}</p>
                <p className="mt-2 text-sm text-muted">{l.message}</p>
                {l.budget && (
                  <p className="mt-2 font-mono text-xs text-muted">бюджет: {l.budget}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
