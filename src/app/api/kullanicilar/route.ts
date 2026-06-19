import { getAllUsers, createUser } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const users = getAllUsers();
  return Response.json({ users });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { username, password, role } = await request.json();
    if (!username || !password) {
      return Response.json({ error: 'Kullanıcı adı ve şifre zorunludur.' }, { status: 400 });
    }
    const result = createUser(username, password, role || 'editor');
    return Response.json({ success: true, id: result.lastInsertRowid });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Sunucu hatası.';
    if (msg.includes('UNIQUE')) {
      return Response.json({ error: 'Bu kullanıcı adı zaten kullanılıyor.' }, { status: 400 });
    }
    return Response.json({ error: msg }, { status: 500 });
  }
}
