import { deleteUser, updateUserRole, updateUserPassword } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.role) {
    updateUserRole(Number(id), body.role);
  }
  if (body.password) {
    updateUserPassword(Number(id), body.password);
  }

  return Response.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // Prevent self-deletion
  if (Number(id) === user.userId) {
    return Response.json({ error: 'Kendinizi silemezsiniz.' }, { status: 400 });
  }

  deleteUser(Number(id));
  return Response.json({ success: true });
}
