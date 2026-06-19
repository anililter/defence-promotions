import { getAllEvents, createEvent } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const events = await getAllEvents(status);
  return Response.json({ events });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { slug, title, subtitle, description, venue, city, event_date, poster_url, ticket_url, status } = body;
    if (!slug || !title) return Response.json({ error: 'Slug ve başlık zorunludur.' }, { status: 400 });

    const result = await createEvent({ slug, title, subtitle, description, venue, city, event_date, poster_url, ticket_url, status: status || 'draft' });
    return Response.json({ success: true, id: result.lastInsertRowid });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Sunucu hatası.';
    if (msg.includes('UNIQUE')) return Response.json({ error: 'Bu slug zaten kullanılıyor.' }, { status: 400 });
    return Response.json({ error: msg }, { status: 500 });
  }
}
