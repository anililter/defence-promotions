"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Felsefemiz", href: "/felsefemiz" },
  { label: "Branşlar", href: "/branslar" },
  { label: "Şubeler", href: "/subeler" },
  { label: "Yorumlar", href: "/#yorumlar" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "navbar-glass" : "bg-transparent"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Logo className="w-12 h-12 text-ivory group-hover:text-gold transition-colors duration-300" />
              <div className="flex flex-col leading-none">
                <span
                  className="text-ivory text-xl font-display font-light tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-ivory"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Defence
                </span>
                <span
                  className="text-gold text-[10px] font-body font-semibold tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Athletics
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ivory/70 hover:text-ivory text-[13px] font-body font-medium tracking-[0.12em] uppercase transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/iletisim"
                className="hidden lg:block btn-gold text-[11px] py-3 px-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Seans Ayarla
              </Link>
              <button
                id="mobile-menu-btn"
                className="lg:hidden text-ivory p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menüyü aç"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal transition-all duration-500 lg:hidden flex flex-col justify-center items-center gap-8 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-ivory"
          onClick={() => setMobileOpen(false)}
        >
          <X size={28} />
        </button>
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-ivory text-3xl font-display font-light tracking-widest hover:text-gold transition-colors duration-200"
            style={{
              fontFamily: "var(--font-cormorant)",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/iletisim"
          onClick={() => setMobileOpen(false)}
          className="btn-gold mt-4"
        >
          Seans Ayarla
        </Link>
      </div>
    </>
  );
}
