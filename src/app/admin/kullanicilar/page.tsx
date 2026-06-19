'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  role: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'editor' });

  const loadUsers = () => {
    setLoading(true);
    fetch('/api/kullanicilar')
      .then(r => r.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadUsers(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/kullanicilar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Kullanıcı eklendi.');
      setShowForm(false);
      setNewUser({ username: '', password: '', role: 'editor' });
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(data.error || 'Hata oluştu.');
    }
  };

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`"${username}" kullanıcısını silmek istediğinize emin misiniz?`)) return;
    setDeleting(id);
    const res = await fetch(`/api/kullanicilar/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      loadUsers();
    } else {
      setError(data.error || 'Silinemedi.');
    }
    setDeleting(null);
  };

  const handleRoleChange = async (id: number, role: string) => {
    await fetch(`/api/kullanicilar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    loadUsers();
  };

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('tr-TR');
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', letterSpacing: '0.06em' }}>
            KULLANICILAR
          </h1>
          <p className="text-gray-600 text-sm">{users.length} kullanıcı</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-red text-sm">
          {showForm ? 'İptal' : '+ Kullanıcı Ekle'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form id="add-user-form" onSubmit={handleAdd} className="glass-card p-6 rounded-sm mb-6 space-y-4">
          <h2 className="text-white text-sm font-bold tracking-widest uppercase">Yeni Kullanıcı</h2>
          <div>
            <label className="form-label">Kullanıcı Adı *</label>
            <input
              id="new-username"
              className="form-input"
              type="text"
              value={newUser.username}
              onChange={e => setNewUser(u => ({ ...u, username: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="form-label">Şifre *</label>
            <input
              id="new-password"
              className="form-input"
              type="password"
              value={newUser.password}
              onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="form-label">Rol</label>
            <select
              id="new-role"
              className="form-input"
              value={newUser.role}
              onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button id="save-user-btn" type="submit" className="btn-red text-xs py-2 px-5">Ekle</button>
        </form>
      )}

      {success && <div className="mb-4 p-3 bg-green-950/50 border border-green-900/50 rounded text-green-400 text-sm">{success}</div>}

      {/* Users table */}
      {loading ? (
        <div className="text-gray-600 text-sm py-8 text-center">Yükleniyor...</div>
      ) : (
        <div className="glass-card rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase">Kullanıcı</th>
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase">Rol</th>
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase hidden md:table-cell">Oluşturulma</th>
                <th className="px-5 py-3 text-right text-gray-600 text-xs font-bold tracking-widest uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600/20 rounded flex items-center justify-center text-red-500 text-sm font-bold">
                        {user.username[0].toUpperCase()}
                      </div>
                      <span className="text-white text-sm">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user.id, e.target.value)}
                      className="bg-transparent text-xs text-gray-400 border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-red-600"
                    >
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-sm hidden md:table-cell">{formatDate(user.created_at)}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id, user.username)}
                      disabled={deleting === user.id}
                      className="text-red-700 text-xs hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      {deleting === user.id ? 'Siliniyor...' : 'Sil'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
