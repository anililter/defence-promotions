import { getAllEvents } from '@/lib/db';
import EventCard from '@/components/EventCard';
import type { Event } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function EventsPage() {
  const upcomingEvents = getAllEvents('upcoming') as Event[];
  const pastEvents = getAllEvents('past') as Event[];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container-site">
        {/* Header */}
        <div className="mb-16 pt-8">
          <div className="section-label">Defence Promotions</div>
          <h1 className="section-title text-white" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
            TÜM ETKİNLİKLER
          </h1>
          <div className="h-px bg-white/5 mt-8" />
        </div>

        {/* Upcoming */}
        {upcomingEvents.length > 0 && (
          <section className="mb-20">
            <div className="section-label mb-6">Yaklaşan</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past */}
        {pastEvents.length > 0 && (
          <section>
            <div className="section-label mb-6">Geçmiş Etkinlikler</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
              {pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Empty */}
        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-600 text-lg">Henüz etkinlik bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
