"use client";

import { useEffect, useRef } from "react";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".reveal");
            elements.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="felsefe" ref={sectionRef} className="section-padding bg-ivory overflow-hidden">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div>
            <div
              className="reveal"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <span className="label-tag" style={{ fontFamily: "var(--font-inter)" }}>
                Felsefemiz
              </span>
            </div>

            <h2
              className="reveal font-display font-light text-charcoal mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: "1.1",
                opacity: 0,
                transform: "translateY(30px)",
                transition: "all 0.7s ease",
              }}
            >
              Sıradan bir salon değil.
              <br />
              <em className="not-italic text-gold">Bir dönüşüm merkezi.</em>
            </h2>

            <div
              className="reveal space-y-5"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <p
                className="text-muted text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", color: "var(--color-text-muted)" }}
              >
                Defence Athletics&apos;te her bir antrenman seansı, yalnızca fiziksel bir egzersizden çok daha fazlasını temsil eder. Uzman kadromuz eşliğinde geliştirilen kişisel programlar, sizi limitlerinizdeki gerçek potansiyelinizle buluşturur.
              </p>
              <p
                className="text-muted text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", color: "var(--color-text-muted)" }}
              >
                Mimarimiz, ekipmanlarımız ve antrenörlerimiz tek bir vizyonla seçildi: <strong className="font-semibold text-charcoal">Mükemmeli normal kılmak.</strong>
              </p>
            </div>

            <div
              className="reveal mt-10 flex flex-col sm:flex-row gap-6"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              {/* Mini Stats */}
              {[
                { num: "10+", label: "Yıllık Deneyim" },
                { num: "25+", label: "Elite Antrenör" },
                { num: "5", label: "Özel Branş" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="font-display text-4xl font-light text-gold"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {stat.num}
                  </span>
                  <span
                    className="text-xs font-body font-semibold tracking-widest uppercase"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="reveal mt-10"
              style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}
            >
              <a
                id="philosophy-cta"
                href="#iletisim"
                className="btn-outline-gold text-[11px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Hikayeni Başlat
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className="reveal relative"
            style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease 0.3s" }}
          >
            {/* Gold accent border */}
            <div className="absolute -top-5 -right-5 w-full h-full border border-gold/20 z-0" />
            <div className="relative z-10 overflow-hidden">
              <img
                src="/philosophy.jpg"
                alt="Defence Athletics Felsefesi — Premium Fitness"
                className="w-full h-full object-cover"
                style={{ maxHeight: "600px" }}
              />
              {/* Overlay badge */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent">
                <p
                  className="text-ivory font-display text-xl font-light italic"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  &ldquo;Beden önce zihinle dönüşür.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
