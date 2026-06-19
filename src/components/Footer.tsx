import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="container-site">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center font-bold text-sm" style={{clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)'}}>
                DP
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-widest uppercase">Defence</div>
                <div className="text-red-500 text-xs tracking-widest uppercase">Promotions</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Türkiye'nin önde gelen MMA organizasyonu. Premium etkinlikler, gerçek savaşçılar.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Anasayfa' },
                { href: '/etkinlikler', label: 'Etkinlikler' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 text-sm hover:text-red-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-4">İletişim</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>info@defencepromotions.com</li>
              <li>İstanbul, Türkiye</li>
              <li className="flex items-center gap-3 pt-2">
                {['Instagram', 'YouTube', 'Twitter'].map(s => (
                  <a
                    key={s}
                    href="#"
                    className="text-xs text-gray-600 hover:text-red-500 transition-colors uppercase tracking-wider"
                  >
                    {s}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {currentYear} Defence Promotions. Tüm hakları saklıdır.
          </p>
          <Link
            href="/admin"
            className="text-gray-700 text-xs hover:text-gray-400 transition-colors tracking-widest uppercase"
          >
            Admin Girişi
          </Link>
        </div>
      </div>
    </footer>
  );
}
