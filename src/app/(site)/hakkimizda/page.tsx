export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <div className="pt-8 mb-16">
          <div className="section-label">Biz Kimiz</div>
          <h1 className="section-title text-white" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
            DEFENCE<br /><span className="text-red-600">PROMOTIONS</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              Defence Promotions, Türkiye'nin önde gelen MMA organizasyon şirketidir. 
              Yerli ve yabancı savaşçıları bir araya getirerek ülkemizde dünya standartlarında 
              karşılaşmalar düzenliyoruz.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Amacımız; Türk MMA sporunun gelişimine katkıda bulunmak, izleyicilere 
              unutulmaz deneyimler yaşatmak ve savaşçılara uluslararası bir platform sunmaktır.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { num: '10+', label: 'Etkinlik' },
              { num: '50+', label: 'Savaşçı' },
              { num: '3', label: 'Şehir' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-4 border-l-2 border-red-600 pl-4">
                <span className="text-white text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{stat.num}</span>
                <span className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
          <h2 className="text-white text-2xl mb-8" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.06em' }}>
            İLETİŞİM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-sm">
              <div className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2">E-posta</div>
              <p className="text-white">info@defencepromotions.com</p>
            </div>
            <div className="glass-card p-6 rounded-sm">
              <div className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2">Konum</div>
              <p className="text-white">İstanbul, Türkiye</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
