"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";


// SVG brand icons (lucide-react removed brand icons in v1+)
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="3.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.42z"/>
    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48 9.75,15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const footerLinks = {
  services: [
    { label: "Boks", href: "/branslar/boks" },
    { label: "CrossFit", href: "/branslar/crossfit" },
    { label: "Pilates", href: "/branslar/pilates" },
    { label: "Mobilite", href: "/branslar/mobilite" },
    { label: "Kondisyon", href: "/branslar/kondisyon" },
  ],
  branches: [
    { label: "Beşiktaş", href: "/subeler/besiktas" },
    { label: "Kadıköy", href: "/subeler/kadikoy" },
    { label: "Levent", href: "/subeler/levent" },
    { label: "Dubai Marina", href: "/subeler/dubai" },
  ],
  company: [
    { label: "Felsefemiz", href: "/felsefemiz" },
    { label: "Antrenörlerimiz", href: "/felsefemiz#antrenorler" },
    { label: "Üyelik Seçenekleri", href: "/iletisim#uyelik" },
    { label: "Kurumsal", href: "/felsefemiz#kurumsal" },
    { label: "KVKK & Gizlilik", href: "/iletisim#kvkk" },
  ],
};

const socialLinks = [
  { icon: InstagramIcon, href: "https://instagram.com/defenceathletics", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com/defenceathletics", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://youtube.com/@defenceathletics", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="footer" className="bg-charcoal border-t border-ivory/5">
      {/* Top Section */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Logo className="w-14 h-14 text-ivory group-hover:text-gold transition-colors duration-300" />
              <div className="flex flex-col leading-none">
                <span
                  className="text-ivory text-2xl font-display font-light tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-ivory"
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

            <p
              className="text-ivory/40 text-sm font-body leading-relaxed mb-8 max-w-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              İstanbul ve Dubai&apos;nin prestijli lokasyonlarında, zihin ve beden dönüşümü için tasarlanmış premium spor kulübü.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-ivory/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-gold mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Branşlar
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/40 text-sm font-body hover:text-ivory transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-gold mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Şubeler
            </h4>
            <ul className="space-y-3">
              {footerLinks.branches.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/40 text-sm font-body hover:text-ivory transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-gold mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Kurumsal
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/40 text-sm font-body hover:text-ivory transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-gold mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bülten
            </h4>
            <p
              className="text-ivory/40 text-xs font-body mb-4 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Özel içerik ve kampanyalar için bültenimize kayıt olun.
            </p>
            {subscribed ? (
              <p className="text-gold text-xs font-body" style={{ fontFamily: "var(--font-inter)" }}>
                ✓ Kayıt başarılı, teşekkürler!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b border-ivory/20 py-2 text-ivory text-sm font-body placeholder:text-ivory/30 outline-none focus:border-gold transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                <button
                  id="newsletter-submit"
                  type="submit"
                  className="btn-gold text-[10px] py-2.5 px-4 self-start flex items-center gap-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <Mail size={12} />
                  Kayıt Ol
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/5">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-ivory/20 text-xs font-body"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Defence Athletics. Tüm hakları saklıdır.
          </p>
          <p
            className="text-ivory/20 text-xs font-body"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            İstanbul · Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
