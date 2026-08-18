import { NextResponse } from 'next/server';
import { getDbData } from '@/lib/db';

export const dynamic = 'force-static';

export async function GET() {
  const data = getDbData();
  return NextResponse.json(data.cases || []);
}
