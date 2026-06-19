import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Tarih TBD';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(dateStr: string | null) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export default function EventCard({ event }: EventCardProps) {
  const badge = event.status === 'upcoming' ? 'badge-upcoming' : event.status === 'past' ? 'badge-past' : 'badge-draft';
  const badgeText = event.status === 'upcoming' ? 'Yaklaşan' : event.status === 'past' ? 'Geçmiş' : 'Taslak';

  return (
    <Link href={`/etkinlik/${event.slug}`} className="block group">
      <article className="event-card rounded-sm">
        {/* Poster */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {event.poster_url ? (
            <Image
              src={event.poster_url}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-black tracking-widest uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'rgba(200,16,46,0.3)' }}>
                  DP
                </div>
                <div className="text-xs text-gray-700 tracking-widest uppercase mt-2">Defence Promotions</div>
              </div>
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className={badge}>{badgeText}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl text-white mb-1 leading-tight group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            {event.title}
          </h2>
          {event.subtitle && (
            <p className="text-gray-500 text-sm mb-3">{event.subtitle}</p>
          )}

          <div className="red-divider" style={{ margin: '12px 0' }} />

          {/* Meta */}
          <div className="flex flex-col gap-1.5">
            {event.event_date && (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{formatDate(event.event_date)}</span>
                {formatTime(event.event_date) && (
                  <span className="text-gray-600">• {formatTime(event.event_date)}</span>
                )}
              </div>
            )}
            {(event.venue || event.city) && (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{[event.venue, event.city].filter(Boolean).join(', ')}</span>
              </div>
            )}
          </div>

          {/* CTA */}
          {event.status === 'upcoming' && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Etkinliği Görüntüle
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
