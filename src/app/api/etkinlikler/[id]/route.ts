import { getEventById, updateEvent, deleteEvent } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = await getEventById(Number(id));
  if (!event) return Response.json({ error: 'Etkinlik bulunamadı.' }, { status: 404 });
  return Response.json({ event });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const result = await updateEvent(Number(id), body);
    if (result.changes === 0) return Response.json({ error: 'Etkinlik bulunamadı.' }, { status: 404 });
    return Response.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Sunucu hatası.';
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const result = await deleteEvent(Number(id));
  if (result.changes === 0) return Response.json({ error: 'Etkinlik bulunamadı.' }, { status: 404 });
  return Response.json({ success: true });
}
