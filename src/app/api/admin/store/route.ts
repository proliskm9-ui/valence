import { NextResponse } from 'next/server';
import { getDbData, addLead, updateLead, deleteLead, addProject, updateProject, deleteProject, addCaseItem, updateCaseItem, deleteCaseItem, addClientItem, updateClientItem, deleteClientItem } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-static';



export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = getDbData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { entity, action, payload } = body;

    if (entity === 'leads') {
      if (action === 'update') {
        const updated = updateLead(payload.id, payload.patch);
        return NextResponse.json({ ok: true, item: updated });
      }
      if (action === 'delete') {
        deleteLead(payload.id);
        return NextResponse.json({ ok: true });
      }
    }

    if (entity === 'projects') {
      if (action === 'create') {
        const created = addProject(payload);
        return NextResponse.json({ ok: true, item: created });
      }
      if (action === 'update') {
        const updated = updateProject(payload.id, payload.patch);
        return NextResponse.json({ ok: true, item: updated });
      }
      if (action === 'delete') {
        deleteProject(payload.id);
        return NextResponse.json({ ok: true });
      }
    }

    if (entity === 'cases') {
      if (action === 'create') {
        const created = addCaseItem(payload);
        return NextResponse.json({ ok: true, item: created });
      }
      if (action === 'update') {
        const updated = updateCaseItem(payload.id, payload.patch);
        return NextResponse.json({ ok: true, item: updated });
      }
      if (action === 'delete') {
        deleteCaseItem(payload.id);
        return NextResponse.json({ ok: true });
      }
    }

    if (entity === 'clients') {
      if (action === 'create') {
        const created = addClientItem(payload);
        return NextResponse.json({ ok: true, item: created });
      }
      if (action === 'update') {
        const updated = updateClientItem(payload.id, payload.patch);
        return NextResponse.json({ ok: true, item: updated });
      }
      if (action === 'delete') {
        deleteClientItem(payload.id);
        return NextResponse.json({ ok: true });
      }
    }

    return NextResponse.json({ error: 'Invalid entity or action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
