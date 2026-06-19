'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Giriş başarısız.');
      }
    } catch {
      setError('Sunucu bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(200,16,46,0.08) 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600" />

      {/* Card */}
      <div className="w-full max-w-md px-6 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4" style={{clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'}}>
            DP
          </div>
          <h1 className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', letterSpacing: '0.1em' }}>
            DEFENCE PROMOTIONS
          </h1>
          <p className="text-gray-600 text-sm tracking-widest uppercase">Admin Girişi</p>
        </div>

        {/* Form */}
        <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="form-input"
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/50 border border-red-900/50 rounded text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="btn-red w-full py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="text-center mt-8">
          <a href="/" className="text-gray-700 text-xs hover:text-gray-500 transition-colors tracking-widest uppercase">
            ← Siteye Dön
          </a>
        </div>
      </div>
    </div>
  );
}
