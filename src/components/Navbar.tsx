'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Anasayfa' },
    { href: '/etkinlikler', label: 'Etkinlikler' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60" />

      <nav className="container-site flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center" style={{clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)'}}>
              <span className="text-white font-bold text-xs">DP</span>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-widest uppercase leading-none">Defence</div>
            <div className="text-red-500 text-xs tracking-widest uppercase leading-none">Promotions</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin" className="btn-red text-xs py-2 px-5">
            Admin Panel
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 navbar-glass ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="container-site py-4 flex flex-col gap-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-widest uppercase ${
                pathname === link.href ? 'text-red-500' : 'text-gray-400'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin" className="btn-red text-xs py-2 px-5 self-start" onClick={() => setMenuOpen(false)}>
            Admin Panel
          </Link>
        </div>
      </div>
    </header>
  );
}
