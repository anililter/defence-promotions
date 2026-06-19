import bcrypt from 'bcryptjs';
import { getUserByUsername } from '@/lib/db';
import { cookies } from 'next/headers';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return Response.json({ error: 'Kullanıcı adı ve şifre gerekli.' }, { status: 400 });
    }

    const user = await getUserByUsername(username) as { id: number; username: string; password_hash: string; role: string } | null;
    if (!user) {
      return Response.json({ error: 'Geçersiz kullanıcı adı veya şifre.' }, { status: 401 });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return Response.json({ error: 'Geçersiz kullanıcı adı veya şifre.' }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, username: user.username, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set('defence_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return Response.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
