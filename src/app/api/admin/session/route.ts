import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-static';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, configured: true });
  }
  return NextResponse.json({
    authenticated: true,
    configured: true,
    login: session.login,
  });
}
