'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Fight {
  id: number;
  fighter1_name: string;
  fighter1_record: string | null;
  fighter1_country: string | null;
  fighter2_name: string;
  fighter2_record: string | null;
  fighter2_country: string | null;
  weight_class: string | null;
  is_main_event: boolean;
  bout_order: number;
  result: string | null;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  venue: string | null;
  city: string | null;
  event_date: string | null;
  poster_url: string | null;
  ticket_url: string | null;
  status: string;
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [fights, setFights] = useState<Fight[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showFightForm, setShowFightForm] = useState(false);
  const [deletingFight, setDeletingFight] = useState<number | null>(null);
  const router = useRouter();

  const [fightForm, setFightForm] = useState({
    fighter1_name: '',
    fighter1_record: '',
    fighter1_country: 'TR',
    fighter2_name: '',
    fighter2_record: '',
    fighter2_country: 'TR',
    weight_class: '',
    is_main_event: false,
    bout_order: 1,
    result: '',
  });

  const [form, setForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    venue: '',
    city: '',
    event_date: '',
    poster_url: '',
    ticket_url: '',
    status: 'draft',
  });

  useEffect(() => {
    params.then(p => setEventId(p.id));
  }, [params]);

  const loadFights = useCallback((id: string) => {
    fetch(`/api/maclar?etkinlik_id=${id}`)
      .then(r => r.json())
      .then(data => setFights(data.fights || []));
  }, []);

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/etkinlikler/${eventId}`)
      .then(r => r.json())
      .then(data => {
        if (data.event) {
          const e = data.event;
          setEvent(e);
          setForm({
            title: e.title || '',
            slug: e.slug || '',
            subtitle: e.subtitle || '',
            description: e.description || '',
            venue: e.venue || '',
            city: e.city || '',
            event_date: e.event_date ? e.event_date.slice(0, 16) : '',
            poster_url: e.poster_url || '',
            ticket_url: e.ticket_url || '',
            status: e.status || 'draft',
          });
        }
      });
    loadFights(eventId);
  }, [eventId, loadFights]);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) setForm(f => ({ ...f, poster_url: data.url }));
    else setError(data.error);
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    const res = await fetch(`/api/etkinlikler/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Değişiklikler kaydedildi.');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(data.error || 'Hata oluştu.');
    }
    setSaving(false);
  };

  const handleAddFight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) return;
    const res = await fetch('/api/maclar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fightForm, event_id: Number(eventId) }),
    });
    if (res.ok) {
      setShowFightForm(false);
      setFightForm({ fighter1_name: '', fighter1_record: '', fighter1_country: 'TR', fighter2_name: '', fighter2_record: '', fighter2_country: 'TR', weight_class: '', is_main_event: false, bout_order: fights.length + 1, result: '' });
      loadFights(eventId);
    }
  };

  const handleDeleteFight = async (id: number) => {
    if (!confirm('Bu maçı silmek istediğinize emin misiniz?')) return;
    setDeletingFight(id);
    await fetch(`/api/maclar/${id}`, { method: 'DELETE' });
    if (eventId) loadFights(eventId);
    setDeletingFight(null);
  };

  if (!event) return <div className="p-8 text-gray-600">Yükleniyor...</div>;

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/etkinlikler" className="text-gray-600 hover:text-white transition-colors">← Geri</Link>
        <h1 className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.06em' }}>
          ETKİNLİĞİ DÜZENLE
        </h1>
      </div>

      {/* Event Form */}
      <form id="edit-event-form" onSubmit={handleSave} className="space-y-4 mb-12">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Başlık *</label>
            <input className="form-input" type="text" value={form.title} onChange={set('title')} required />
          </div>
          <div>
            <label className="form-label">Slug *</label>
            <input className="form-input" type="text" value={form.slug} onChange={set('slug')} required />
          </div>
        </div>

        <div>
          <label className="form-label">Alt Başlık</label>
          <input className="form-input" type="text" value={form.subtitle} onChange={set('subtitle')} />
        </div>

        <div>
          <label className="form-label">Açıklama</label>
          <textarea className="form-input" value={form.description} onChange={set('description')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Mekan</label>
            <input className="form-input" type="text" value={form.venue} onChange={set('venue')} />
          </div>
          <div>
            <label className="form-label">Şehir</label>
            <input className="form-input" type="text" value={form.city} onChange={set('city')} />
          </div>
        </div>

        <div>
          <label className="form-label">Tarih & Saat</label>
          <input className="form-input" type="datetime-local" value={form.event_date} onChange={set('event_date')} />
        </div>

        <div>
          <label className="form-label">Afiş Görseli</label>
          <div className="space-y-2">
            <input className="form-input" type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
            {uploading && <p className="text-xs text-gray-500">Yükleniyor...</p>}
            <input className="form-input" type="text" value={form.poster_url} onChange={set('poster_url')} placeholder="URL" />
          </div>
        </div>

        <div>
          <label className="form-label">Bilet Linki</label>
          <input className="form-input" type="url" value={form.ticket_url} onChange={set('ticket_url')} placeholder="https://..." />
        </div>

        <div>
          <label className="form-label">Durum</label>
          <select className="form-input" value={form.status} onChange={set('status')}>
            <option value="draft">Taslak</option>
            <option value="upcoming">Yaklaşan</option>
            <option value="past">Geçmiş</option>
          </select>
        </div>

        {error && <div className="p-3 bg-red-950/50 border border-red-900/50 rounded text-red-400 text-sm">{error}</div>}
        {success && <div className="p-3 bg-green-950/50 border border-green-900/50 rounded text-green-400 text-sm">{success}</div>}

        <button type="submit" disabled={saving} className="btn-red text-sm disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </form>

      {/* Fights Section */}
      <div className="border-t border-white/5 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '0.06em' }}>
            MAÇLAR ({fights.length})
          </h2>
          <button onClick={() => setShowFightForm(!showFightForm)} className="btn-outline text-xs py-2 px-4">
            {showFightForm ? 'İptal' : '+ Maç Ekle'}
          </button>
        </div>

        {/* Add fight form */}
        {showFightForm && (
          <form onSubmit={handleAddFight} className="glass-card p-5 rounded-sm mb-6 space-y-4">
            <h3 className="text-white text-sm font-bold tracking-widest uppercase">Yeni Maç</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="form-label">Savaşçı 1 Adı *</label>
                <input className="form-input" type="text" value={fightForm.fighter1_name} onChange={e => setFightForm(f => ({ ...f, fighter1_name: e.target.value }))} required />
                <input className="form-input" type="text" placeholder="Galibiyet-Mağlubiyet-Beraberlik (10-2-0)" value={fightForm.fighter1_record} onChange={e => setFightForm(f => ({ ...f, fighter1_record: e.target.value }))} />
                <input className="form-input" type="text" placeholder="Ülke kodu (TR, US...)" value={fightForm.fighter1_country} onChange={e => setFightForm(f => ({ ...f, fighter1_country: e.target.value }))} maxLength={2} />
              </div>
              <div className="space-y-2">
                <label className="form-label">Savaşçı 2 Adı *</label>
                <input className="form-input" type="text" value={fightForm.fighter2_name} onChange={e => setFightForm(f => ({ ...f, fighter2_name: e.target.value }))} required />
                <input className="form-input" type="text" placeholder="Galibiyet-Mağlubiyet-Beraberlik" value={fightForm.fighter2_record} onChange={e => setFightForm(f => ({ ...f, fighter2_record: e.target.value }))} />
                <input className="form-input" type="text" placeholder="Ülke kodu" value={fightForm.fighter2_country} onChange={e => setFightForm(f => ({ ...f, fighter2_country: e.target.value }))} maxLength={2} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Siklet</label>
                <input className="form-input" type="text" placeholder="Welterweight (77 kg)" value={fightForm.weight_class} onChange={e => setFightForm(f => ({ ...f, weight_class: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Sıra</label>
                <input className="form-input" type="number" min="1" value={fightForm.bout_order} onChange={e => setFightForm(f => ({ ...f, bout_order: Number(e.target.value) }))} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input id="is-main-event" type="checkbox" checked={fightForm.is_main_event} onChange={e => setFightForm(f => ({ ...f, is_main_event: e.target.checked }))} className="w-4 h-4 accent-red-600" />
              <label htmlFor="is-main-event" className="text-gray-400 text-sm">Ana Maç</label>
            </div>

            <button type="submit" className="btn-red text-xs py-2 px-5">Maç Ekle</button>
          </form>
        )}

        {/* Fights list */}
        {fights.length === 0 ? (
          <p className="text-gray-600 text-sm py-4">Henüz maç eklenmemiş.</p>
        ) : (
          <div className="space-y-2">
            {fights.map(fight => (
              <div key={fight.id} className="glass-card p-4 rounded-sm flex items-center justify-between">
                <div>
                  {fight.is_main_event && <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mr-2">Ana Maç</span>}
                  <span className="text-white text-sm">{fight.fighter1_name} <span className="text-red-500">vs</span> {fight.fighter2_name}</span>
                  {fight.weight_class && <span className="text-gray-600 text-xs ml-2">· {fight.weight_class}</span>}
                </div>
                <button
                  onClick={() => handleDeleteFight(fight.id)}
                  disabled={deletingFight === fight.id}
                  className="text-red-700 text-xs hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
