'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  slug: string;
  status: string;
  event_date: string | null;
  city: string | null;
  venue: string | null;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const router = useRouter();

  const loadEvents = () => {
    setLoading(true);
    fetch('/api/etkinlikler')
      .then(r => r.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      });
  };

  useEffect(() => { loadEvents(); }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" etkinliğini silmek istediğinize emin misiniz?`)) return;
    setDeleting(id);
    const res = await fetch(`/api/etkinlikler/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadEvents();
    }
    setDeleting(null);
  };

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', letterSpacing: '0.06em' }}>
            ETKİNLİKLER
          </h1>
          <p className="text-gray-600 text-sm">{events.length} etkinlik</p>
        </div>
        <Link href="/admin/etkinlikler/yeni" id="add-event-btn" className="btn-red text-sm">
          + Yeni Etkinlik
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-600 text-sm py-12 text-center">Yükleniyor...</div>
      ) : events.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-sm">
          <p className="text-gray-600 mb-4">Henüz etkinlik yok.</p>
          <Link href="/admin/etkinlikler/yeni" className="btn-red text-sm">
            İlk Etkinliği Ekle
          </Link>
        </div>
      ) : (
        <div className="glass-card rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase">Başlık</th>
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase hidden md:table-cell">Tarih</th>
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase hidden md:table-cell">Mekan</th>
                <th className="px-5 py-3 text-left text-gray-600 text-xs font-bold tracking-widest uppercase">Durum</th>
                <th className="px-5 py-3 text-right text-gray-600 text-xs font-bold tracking-widest uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={event.id} className={`border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors ${i % 2 === 0 ? '' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="text-white text-sm font-medium">{event.title}</div>
                    <div className="text-gray-600 text-xs">{event.slug}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm hidden md:table-cell">{formatDate(event.event_date)}</td>
                  <td className="px-5 py-4 text-gray-400 text-sm hidden md:table-cell">{[event.venue, event.city].filter(Boolean).join(', ') || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={
                      event.status === 'upcoming' ? 'badge-upcoming' :
                      event.status === 'past' ? 'badge-past' : 'badge-draft'
                    }>
                      {event.status === 'upcoming' ? 'Yaklaşan' : event.status === 'past' ? 'Geçmiş' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <a
                        href={`/etkinlik/${event.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 text-xs hover:text-white transition-colors"
                      >
                        Görüntüle
                      </a>
                      <Link
                        href={`/admin/etkinlikler/${event.id}/duzenle`}
                        className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
                      >
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        disabled={deleting === event.id}
                        className="text-red-600 text-xs hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {deleting === event.id ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
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
