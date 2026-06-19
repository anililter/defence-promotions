import { updateFight, deleteFight } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    await updateFight(Number(id), body);
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
  const result = await deleteFight(Number(id));
  if (result.changes === 0) return Response.json({ error: 'Maç bulunamadı.' }, { status: 404 });
  return Response.json({ success: true });
}
