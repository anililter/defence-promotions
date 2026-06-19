import Image from 'next/image';
import type { Fight } from '@/lib/types';

interface FightCardProps {
  fight: Fight;
}

const flagEmoji: Record<string, string> = {
  TR: '🇹🇷',
  US: '🇺🇸',
  BR: '🇧🇷',
  RU: '🇷🇺',
  GB: '🇬🇧',
  DE: '🇩🇪',
  AZ: '🇦🇿',
  KZ: '🇰🇿',
  GE: '🇬🇪',
};

export default function FightCard({ fight }: FightCardProps) {
  const flag1 = fight.fighter1_country ? flagEmoji[fight.fighter1_country] || '🏳️' : '';
  const flag2 = fight.fighter2_country ? flagEmoji[fight.fighter2_country] || '🏳️' : '';

  return (
    <div className={`fight-card rounded-sm ${fight.is_main_event ? 'main-event' : ''}`}>
      {fight.is_main_event && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      )}

      {/* Weight class + label */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-xs tracking-widest uppercase">
          {fight.weight_class || 'TBD'}
        </span>
        {fight.is_main_event && (
          <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">
            ★ Ana Maç
          </span>
        )}
      </div>

      {/* Fighters */}
      <div className="flex items-center gap-4">
        {/* Fighter 1 */}
        <div className="flex-1 flex flex-col items-center text-center">
          {fight.fighter1_photo ? (
            <div className="relative w-16 h-16 mb-3 overflow-hidden" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
              <Image src={fight.fighter1_photo} alt={fight.fighter1_name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 mb-3 bg-gray-800 flex items-center justify-center" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,16,46,0.6)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          )}
          <span className="text-red-500 text-xs mb-1">{flag1}</span>
          <h3 className="fighter-name text-white text-center">
            {fight.fighter1_name.split(' ').map((word, i) => (
              <span key={i}>{word}<br /></span>
            ))}
          </h3>
          {fight.fighter1_record && (
            <span className="text-gray-500 text-xs mt-1">{fight.fighter1_record}</span>
          )}
        </div>

        {/* VS */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="vs-badge">VS</div>
          {fight.result && (
            <div className="text-gray-500 text-xs text-center mt-2 max-w-24">
              {fight.result}
            </div>
          )}
        </div>

        {/* Fighter 2 */}
        <div className="flex-1 flex flex-col items-center text-center">
          {fight.fighter2_photo ? (
            <div className="relative w-16 h-16 mb-3 overflow-hidden" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
              <Image src={fight.fighter2_photo} alt={fight.fighter2_name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 mb-3 bg-gray-800 flex items-center justify-center" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,16,46,0.6)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          )}
          <span className="text-blue-400 text-xs mb-1">{flag2}</span>
          <h3 className="fighter-name text-white text-center">
            {fight.fighter2_name.split(' ').map((word, i) => (
              <span key={i}>{word}<br /></span>
            ))}
          </h3>
          {fight.fighter2_record && (
            <span className="text-gray-500 text-xs mt-1">{fight.fighter2_record}</span>
          )}
        </div>
      </div>
    </div>
  );
}
