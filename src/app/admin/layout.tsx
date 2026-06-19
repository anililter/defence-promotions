'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface AdminUser {
  userId: number;
  username: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router, pathname]);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [pathname, checkAuth]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse-red w-2 h-2 rounded-full bg-red-600" />
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!user) return null;

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '⊞' },
    { href: '/admin/etkinlikler', label: 'Etkinlikler', icon: '🥊' },
    { href: '/admin/kullanicilar', label: 'Kullanıcılar', icon: '👤', adminOnly: true },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="admin-sidebar flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-red-900/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-600 flex items-center justify-center text-white font-bold text-xs" style={{clipPath: 'polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)'}}>
              DP
            </div>
            <div>
              <div className="text-white font-bold text-xs tracking-widest uppercase">Defence</div>
              <div className="text-red-500 text-xs tracking-wider">Promotions</div>
            </div>
          </Link>
          <div className="mt-3 text-xs text-gray-600 font-mono">Admin Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map(item => {
            if (item.adminOnly && user.role !== 'admin') return null;
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-red-600/20 rounded flex items-center justify-center text-red-500 text-sm font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{user.username}</div>
              <div className="text-gray-600 text-xs capitalize">{user.role}</div>
            </div>
          </div>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="w-full text-left text-gray-600 text-xs hover:text-red-500 transition-colors tracking-widest uppercase"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-black">
        {children}
      </main>
    </div>
  );
}
