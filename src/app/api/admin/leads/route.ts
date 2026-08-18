import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { listAdminLeads, updateLeadStatus } from '@/lib/admin-leads';
import { firebaseEnabled } from '@/lib/firebase';
import type { LeadStatus } from '@/lib/leads';

const STATUSES: LeadStatus[] = ['new', 'in_progress', 'done'];

export const dynamic = 'force-static';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!firebaseEnabled) {
    return NextResponse.json({ leads: [], firebase: false });
  }
  try {
    const leads = await listAdminLeads();
    return NextResponse.json({ leads, firebase: true });
  } catch (err) {
    console.error('[admin/leads]', err);
    return NextResponse.json(
      { error: 'Не удалось загрузить заявки' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!firebaseEnabled) {
    return NextResponse.json({ error: 'Firebase не настроен' }, { status: 503 });
  }

  let body: { id?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
  }

  const id = String(body.id ?? '');
  const status = body.status as LeadStatus;
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
  }

  try {
    await updateLeadStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/leads PATCH]', err);
    return NextResponse.json(
      { error: 'Не удалось обновить статус' },
      { status: 500 },
    );
  }
}
