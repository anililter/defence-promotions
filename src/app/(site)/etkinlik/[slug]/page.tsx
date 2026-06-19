import { getEventBySlug, getFightsByEventId } from '@/lib/db';
import FightCard from '@/components/FightCard';
import type { Event, Fight } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Tarih TBD';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(dateStr: string | null) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug) as Event | undefined;

  if (!event) notFound();

  const fights = getFightsByEventId(event.id) as Fight[];
  const mainEvent = fights.find(f => f.is_main_event);
  const undercard = fights.filter(f => !f.is_main_event);

  return (
    <div className="min-h-screen bg-black">
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {event.poster_url ? (
          <Image
            src={event.poster_url}
            alt={event.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="container-site relative z-10 pt-32 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/etkinlikler" className="text-gray-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Etkinlikler
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-500 text-xs tracking-widest uppercase">{event.title}</span>
          </div>

          {/* Status */}
          <span className={`${event.status === 'upcoming' ? 'badge-upcoming' : event.status === 'past' ? 'badge-past' : 'badge-draft'} mb-4 inline-block`}>
            {event.status === 'upcoming' ? 'Yaklaşan' : event.status === 'past' ? 'Geçmiş' : 'Taslak'}
          </span>

          <h1 className="text-white mb-2 leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 10vw, 112px)', letterSpacing: '0.04em' }}>
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="text-gray-400 text-xl mb-4">{event.subtitle}</p>
          )}
        </div>
      </section>

      {/* ─── EVENT INFO + TICKET ───────────────────────────────────── */}
      <section className="border-y border-white/5 bg-dark" style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="container-site py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            {/* Meta */}
            <div className="flex flex-wrap gap-6">
              {event.event_date && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600/10 flex items-center justify-center rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider">Tarih</div>
                    <div className="text-white text-sm font-medium">{formatDate(event.event_date)}</div>
                    {formatTime(event.event_date) && (
                      <div className="text-gray-500 text-xs">{formatTime(event.event_date)}</div>
                    )}
                  </div>
                </div>
              )}

              {(event.venue || event.city) && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600/10 flex items-center justify-center rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider">Mekan</div>
                    {event.venue && <div className="text-white text-sm font-medium">{event.venue}</div>}
                    {event.city && <div className="text-gray-500 text-xs">{event.city}</div>}
                  </div>
                </div>
              )}
            </div>

            {/* Ticket CTA */}
            {event.ticket_url ? (
              <a
                href={event.ticket_url}
                target="_blank"
                rel="noopener noreferrer"
                id="ticket-link"
                className="btn-gold text-sm px-8 py-4 self-start"
              >
                🎟️ Bilet Al
              </a>
            ) : event.status === 'upcoming' && (
              <div className="text-gray-600 text-sm italic">Bilet linki yakında eklenecek.</div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FIGHT CARD ────────────────────────────────────────────── */}
      {fights.length > 0 && (
        <section className="py-20">
          <div className="container-site">
            <div className="section-label">Maç Kartı</div>
            <h2 className="section-title text-white mb-10">
              DÖVÜŞLER
            </h2>

            {/* Main Event */}
            {mainEvent && (
              <div className="mb-8">
                <h3 className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="inline-block w-4 h-0.5 bg-yellow-400" />
                  Ana Maç
                </h3>
                <FightCard fight={mainEvent} />
              </div>
            )}

            {/* Undercard */}
            {undercard.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="inline-block w-4 h-0.5 bg-gray-700" />
                  Alt Kart
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {undercard.map(fight => (
                    <FightCard key={fight.id} fight={fight} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── DESCRIPTION ───────────────────────────────────────────── */}
      {event.description && (
        <section className="py-16 border-t border-white/5">
          <div className="container-site max-w-3xl">
            <div className="section-label">Etkinlik Hakkında</div>
            <div
              className="text-gray-400 text-base leading-relaxed prose prose-invert"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>
        </section>
      )}

      {/* ─── TICKET FOOTER CTA ─────────────────────────────────────── */}
      {event.ticket_url && (
        <section className="py-16 bg-red-600/5 border-t border-red-600/10">
          <div className="container-site text-center">
            <h2 className="text-white mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px' }}>
              BİLETİNİ HEMEN AL
            </h2>
            <p className="text-gray-500 mb-8">Kontenjan sınırlıdır. Yerini şimdiden garantile.</p>
            <a
              href={event.ticket_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base px-12 py-4"
            >
              🎟️ Bilet Satın Al
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
