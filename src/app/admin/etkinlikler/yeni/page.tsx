'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
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

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm(f => ({ ...f, title, slug }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setForm(f => ({ ...f, poster_url: data.url }));
      } else {
        setError(data.error);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/etkinlikler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin/etkinlikler');
      } else {
        setError(data.error || 'Hata oluştu.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/etkinlikler" className="text-gray-600 hover:text-white transition-colors">
          ← Geri
        </Link>
        <h1 className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', letterSpacing: '0.06em' }}>
          YENİ ETKİNLİK
        </h1>
      </div>

      <form id="new-event-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="form-label">Başlık *</label>
          <input id="event-title" className="form-input" type="text" value={form.title} onChange={handleTitleChange} placeholder="Fight Night 2" required />
        </div>

        <div>
          <label className="form-label">URL Slug *</label>
          <input id="event-slug" className="form-input" type="text" value={form.slug} onChange={set('slug')} placeholder="fight-night-2" required />
        </div>

        <div>
          <label className="form-label">Alt Başlık</label>
          <input id="event-subtitle" className="form-input" type="text" value={form.subtitle} onChange={set('subtitle')} placeholder="Kafes Kapısı Açılıyor" />
        </div>

        <div>
          <label className="form-label">Açıklama</label>
          <textarea id="event-description" className="form-input" value={form.description} onChange={set('description')} placeholder="Etkinlik hakkında açıklama..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Mekan</label>
            <input id="event-venue" className="form-input" type="text" value={form.venue} onChange={set('venue')} placeholder="Volkswagen Arena" />
          </div>
          <div>
            <label className="form-label">Şehir</label>
            <input id="event-city" className="form-input" type="text" value={form.city} onChange={set('city')} placeholder="İstanbul" />
          </div>
        </div>

        <div>
          <label className="form-label">Tarih & Saat</label>
          <input id="event-date" className="form-input" type="datetime-local" value={form.event_date} onChange={set('event_date')} />
        </div>

        <div>
          <label className="form-label">Afiş Görseli</label>
          <div className="space-y-2">
            <input id="event-poster-upload" className="form-input" type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
            {uploading && <p className="text-gray-500 text-xs">Yükleniyor...</p>}
            {form.poster_url && <p className="text-green-500 text-xs">✓ {form.poster_url}</p>}
            <p className="text-gray-600 text-xs">Veya URL girin:</p>
            <input id="event-poster-url" className="form-input" type="text" value={form.poster_url} onChange={set('poster_url')} placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="form-label">Bilet Linki</label>
          <input id="event-ticket-url" className="form-input" type="url" value={form.ticket_url} onChange={set('ticket_url')} placeholder="https://biletix.com/..." />
        </div>

        <div>
          <label className="form-label">Durum</label>
          <select id="event-status" className="form-input" value={form.status} onChange={set('status')}>
            <option value="draft">Taslak</option>
            <option value="upcoming">Yaklaşan</option>
            <option value="past">Geçmiş</option>
          </select>
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-900/50 rounded text-red-400 text-sm">{error}</div>
        )}

        <div className="flex gap-4 pt-2">
          <button id="save-event-btn" type="submit" disabled={saving} className="btn-red text-sm disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Etkinliği Kaydet'}
          </button>
          <Link href="/admin/etkinlikler" className="btn-outline text-sm">İptal</Link>
        </div>
      </form>
    </div>
  );
}
