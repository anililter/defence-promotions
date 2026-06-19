import { getFightsByEventId, createFight } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('etkinlik_id');
  if (!eventId) return Response.json({ error: 'etkinlik_id gerekli.' }, { status: 400 });
  const fights = await getFightsByEventId(Number(eventId));
  return Response.json({ fights });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const result = await createFight(body);
    return Response.json({ success: true, id: result.lastInsertRowid });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Sunucu hatası.';
    return Response.json({ error: msg }, { status: 500 });
  }
}
