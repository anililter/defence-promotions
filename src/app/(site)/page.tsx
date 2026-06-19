import { getAllEvents, getFightsByEventId } from '@/lib/db';
import EventCard from '@/components/EventCard';
import type { Event, Fight } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const upcomingEvents = getAllEvents('upcoming') as Event[];
  const allEvents = getAllEvents() as Event[];
  const featuredEvent = upcomingEvents[0] || allEvents[0] || null;
  const featuredFights = featuredEvent ? getFightsByEventId(featuredEvent.id) as Fight[] : [];
  const mainFight = featuredFights.find(f => f.is_main_event) || featuredFights[0] || null;

  const otherEvents = allEvents.filter(e => e.id !== featuredEvent?.id).slice(0, 6);

  function formatDate(dateStr: string | null) {
    if (!dateStr) return 'Tarih TBD';
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div className="min-h-screen bg-black">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        {featuredEvent?.poster_url ? (
          <Image
            src={featuredEvent.poster_url}
            alt={featuredEvent.title}
            fill
            className="object-cover opacity-20"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '60px 60px'
        }} />

        {/* Content */}
        <div className="container-site relative z-10 pt-24 pb-12">
          <div className="max-w-2xl">
            <div className="section-label mb-4">
              {featuredEvent?.status === 'upcoming' ? '🔴 Yaklaşan Etkinlik' : 'Öne Çıkan Etkinlik'}
            </div>

            <h1 className="section-title text-white mb-4 animate-slide-left" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 10vw, 120px)' }}>
              {featuredEvent?.title || 'Defence Promotions'}
            </h1>

            {featuredEvent?.subtitle && (
              <p className="text-gray-400 text-lg mb-2">{featuredEvent.subtitle}</p>
            )}

            {/* Meta */}
            {featuredEvent && (
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                {featuredEvent.event_date && (
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatDate(featuredEvent.event_date)}
                  </span>
                )}
                {(featuredEvent.venue || featuredEvent.city) && (
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {[featuredEvent.venue, featuredEvent.city].filter(Boolean).join(', ')}
                  </span>
                )}
              </div>
            )}

            {/* Main fight teaser */}
            {mainFight && (
              <div className="mb-8 p-4 border border-red-900/30 bg-red-950/10 rounded-sm">
                <div className="text-gray-600 text-xs tracking-widest uppercase mb-2">Ana Maç</div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold tracking-widest uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px' }}>
                    {mainFight.fighter1_name}
                  </span>
                  <span className="text-red-600 font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>VS</span>
                  <span className="text-white font-bold tracking-widest uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px' }}>
                    {mainFight.fighter2_name}
                  </span>
                </div>
                {mainFight.weight_class && (
                  <div className="text-gray-600 text-xs mt-1">{mainFight.weight_class}</div>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              {featuredEvent && (
                <Link href={`/etkinlik/${featuredEvent.slug}`} className="btn-red">
                  Etkinlik Detayı
                </Link>
              )}
              {featuredEvent?.ticket_url && (
                <a href={featuredEvent.ticket_url} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Bilet Al
                </a>
              )}
              {!featuredEvent && (
                <Link href="/etkinlikler" className="btn-red">
                  Tüm Etkinlikler
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────────────── */}
      <div className="bg-red-600 overflow-hidden py-2">
        <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="text-white text-xs font-bold tracking-widest uppercase px-8">
              DEFENCE PROMOTIONS &nbsp;•&nbsp; MMA &nbsp;•&nbsp; FIGHT NIGHT &nbsp;•&nbsp; KAFES SAVAŞLARI &nbsp;•&nbsp; TÜRKİYE MMA &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── UPCOMING EVENTS ──────────────────────────────────────── */}
      {upcomingEvents.length > 1 && (
        <section className="py-20">
          <div className="container-site">
            <div className="section-label">Yaklaşan Etkinlikler</div>
            <h2 className="section-title text-white mb-10">
              KAFES KAPISI <span className="text-red-600">AÇILIYOR</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(1).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── ALL EVENTS ───────────────────────────────────────────── */}
      {otherEvents.length > 0 && (
        <section className="py-20 bg-dark" style={{ backgroundColor: 'var(--color-dark)' }}>
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="section-label">Tüm Etkinlikler</div>
                <h2 className="section-title text-white">ETKİNLİK ARŞİVİ</h2>
              </div>
              <Link href="/etkinlikler" className="btn-outline hidden md:flex">
                Tümünü Gör
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="flex justify-center mt-10 md:hidden">
              <Link href="/etkinlikler" className="btn-outline">Tümünü Gör</Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── NO EVENTS STATE ──────────────────────────────────────── */}
      {allEvents.length === 0 && (
        <section className="py-32 text-center">
          <div className="container-site">
            <div className="text-red-600 text-8xl mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>DP</div>
            <h2 className="text-white text-4xl mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>YAKINDA</h2>
            <p className="text-gray-500">Etkinlikler yakında duyurulacak.</p>
          </div>
        </section>
      )}

      {/* ─── PROMO BANNER ─────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, rgba(200,16,46,0.05) 50%, #0A0A0A 100%)' }} />
        <div className="container-site relative z-10 text-center">
          <div className="section-label justify-center">Defence Promotions</div>
          <h2 className="section-title text-white mb-6" style={{ fontSize: 'clamp(40px, 8vw, 96px)' }}>
            TÜRKİYE'NİN<br />
            <span className="text-red-600">EN BÜYÜK</span> MMA<br />
            ORGANİZASYONU
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Her etkinlikte dünyaca ünlü savaşçılar ve nefes kesen karşılaşmalar. Kafes savaşlarının gerçek adresine hoş geldiniz.
          </p>
          <Link href="/etkinlikler" className="btn-red text-base px-10 py-4">
            Tüm Etkinlikleri Keşfet
          </Link>
        </div>
      </section>

    </div>
  );
}
