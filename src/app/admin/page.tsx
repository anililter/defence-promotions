'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  total: number;
  upcoming: number;
  past: number;
  draft: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, upcoming: 0, past: 0, draft: 0 });
  const [recentEvents, setRecentEvents] = useState<{ id: number; title: string; status: string; event_date: string | null }[]>([]);

  useEffect(() => {
    fetch('/api/etkinlikler')
      .then(r => r.json())
      .then(data => {
        const events = data.events || [];
        setRecentEvents(events.slice(0, 5));
        setStats({
          total: events.length,
          upcoming: events.filter((e: { status: string }) => e.status === 'upcoming').length,
          past: events.filter((e: { status: string }) => e.status === 'past').length,
          draft: events.filter((e: { status: string }) => e.status === 'draft').length,
        });
      });
  }, []);

  const statCards = [
    { label: 'Toplam Etkinlik', value: stats.total, color: '#C8102E', icon: '🥊' },
    { label: 'Yaklaşan', value: stats.upcoming, color: '#22c55e', icon: '📅' },
    { label: 'Geçmiş', value: stats.past, color: '#888', icon: '📁' },
    { label: 'Taslak', value: stats.draft, color: '#FFD700', icon: '✏️' },
  ];

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('tr-TR');
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', letterSpacing: '0.06em' }}>
          DASHBOARD
        </h1>
        <p className="text-gray-600 text-sm">Defence Promotions Yönetim Paneli</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(card => (
          <div key={card.label} className="glass-card p-5 rounded-sm" style={{ borderColor: `${card.color}20` }}>
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', color: card.color }}>
              {card.value}
            </div>
            <div className="text-gray-500 text-xs uppercase tracking-widest">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="glass-card p-6 rounded-sm">
          <h2 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Hızlı İşlemler</h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/etkinlikler/yeni" id="new-event-btn" className="btn-red text-xs py-3 px-5 self-start">
              + Yeni Etkinlik
            </Link>
            <Link href="/admin/etkinlikler" className="btn-outline text-xs py-3 px-5 self-start">
              Tüm Etkinlikleri Yönet
            </Link>
          </div>
        </div>

        <div className="glass-card p-6 rounded-sm">
          <h2 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Site Linkleri</h2>
          <div className="flex flex-col gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
              <span>→</span> Anasayfa
            </a>
            <a href="/etkinlikler" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
              <span>→</span> Etkinlikler
            </a>
          </div>
        </div>
      </div>

      {/* Recent events */}
      {recentEvents.length > 0 && (
        <div className="glass-card rounded-sm overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-white text-sm font-bold tracking-widest uppercase">Son Etkinlikler</h2>
            <Link href="/admin/etkinlikler" className="text-red-500 text-xs hover:text-red-400 transition-colors tracking-widest uppercase">
              Tümünü Gör →
            </Link>
          </div>
          <table className="w-full">
            <tbody>
              {recentEvents.map((event, i) => (
                <tr key={event.id} className={`border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
                  <td className="px-5 py-3 text-white text-sm font-medium">{event.title}</td>
                  <td className="px-5 py-3 text-gray-500 text-sm">{formatDate(event.event_date)}</td>
                  <td className="px-5 py-3">
                    <span className={
                      event.status === 'upcoming' ? 'badge-upcoming' :
                      event.status === 'past' ? 'badge-past' : 'badge-draft'
                    }>
                      {event.status === 'upcoming' ? 'Yaklaşan' : event.status === 'past' ? 'Geçmiş' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/etkinlikler/${event.id}/duzenle`} className="text-gray-600 text-xs hover:text-white transition-colors">
                      Düzenle →
                    </Link>
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
