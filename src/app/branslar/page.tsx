import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Flame, Layers, ShieldCheck, Zap, Activity } from "lucide-react";

export const metadata = {
  title: "Branşlarımız — Defence Athletics",
  description: "Boks, CrossFit, Pilates, Mobilite ve Kondisyon branşlarımızla zihin ve beden potansiyelinizi yeniden tanımlayın. Branş detaylarımızı keşfedin.",
};

const disciplines = [
  {
    id: "boks",
    title: "Boks",
    subtitle: "Combat & Güç",
    description: "Uzman antrenörler eşliğinde teknik boks antrenmanı. Refleks, dayanıklılık ve mental güç geliştirme programları.",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80&auto=format&fit=crop",
    tag: "Savaş Sanatı",
    intensity: "Çok Yüksek",
    duration: "60 Dk",
    focus: "Refleks, Kondisyon & Yağ Yakımı",
    icon: Flame,
  },
  {
    id: "crossfit",
    title: "CrossFit",
    subtitle: "Fonksiyonel Güç",
    description: "Yüksek yoğunluklu fonksiyonel antrenmanlar ile tüm vücudu güçlendirin. Topluluk ruhu ile motivasyonunuzu zirveye taşıyın.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop",
    tag: "Yüksek Performans",
    intensity: "Yüksek",
    duration: "60 Dk",
    focus: "Kuvvet, Hız & Patlayıcı Güç",
    icon: Zap,
  },
  {
    id: "pilates",
    title: "Pilates",
    subtitle: "Denge & Esneklik",
    description: "Reformer ve mat pilates ile postür, core gücü ve esnekliğinizi geliştirin. Zihin-beden bütünlüğü için tasarlanmış seanlar.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&auto=format&fit=crop",
    tag: "Zihin & Beden",
    intensity: "Orta",
    duration: "50 Dk",
    focus: "Core Kuvveti, Duruş & Esneklik",
    icon: Layers,
  },
  {
    id: "mobilite",
    title: "Mobilite",
    subtitle: "Hareket Kalitesi",
    description: "Eklem hareket açıklığı, esneklik ve yaralanma önleme. Atletik performansınızın temel taşıdır.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&auto=format&fit=crop",
    tag: "Fonksiyonel",
    intensity: "Düşük / Orta",
    duration: "45 Dk",
    focus: "Eklem Sağlığı, Esneklik & Rejenerasyon",
    icon: ShieldCheck,
  },
  {
    id: "kondisyon",
    title: "Kondisyon",
    subtitle: "Kuvvet & Dayanıklılık",
    description: "Kişiye özel güç ve kondisyon programları. Atletik performansınızı bir üst seviyeye taşıyın.",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80&auto=format&fit=crop",
    tag: "Elite Training",
    intensity: "Yüksek",
    duration: "60 Dk",
    focus: "Atletik Performans & Kardiyovasküler Kapasite",
    icon: Activity,
  },
];

export default function DisciplinesPage() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80&auto=format&fit=crop" 
            alt="Branşlar Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/70 to-charcoal" />
        
        <div className="container-site relative z-10 text-center">
          <span className="label-tag">Antrenman Programlarımız</span>
          <h1 
            className="text-ivory text-5xl md:text-7xl font-display font-light uppercase tracking-wider mt-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Branşlarımız
          </h1>
          <p 
            className="text-gold/80 text-sm md:text-base font-body tracking-[0.2em] uppercase mt-4 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Hedeflerinize ulaşmanızı sağlayacak bilimsel antrenman metodolojileri.
          </p>
        </div>
      </section>

      {/* Intro section */}
      <section className="section-padding bg-ivory">
        <div className="container-site text-center max-w-3xl">
          <span className="label-tag">Potansiyelini Yeniden Tanımla</span>
          <h2 
            className="text-charcoal text-4xl lg:text-5xl font-display font-light mt-2 mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Size en uygun disiplini <span className="text-gold italic">seçin.</span>
          </h2>
          <p 
            className="text-text-muted text-base font-body leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Defence Athletics olarak sunduğumuz beş özel branşta da amacımız aynı: bilimsel temelli yaklaşımlarla fiziksel limitlerinizi yukarı çekmek ve zihinsel direncinizi güçlendirmek. İster dövüş sanatlarının teknik disiplinini, ister reformer pilatesin zihin-beden dengesini arayın, burada sizin için bir yol var.
          </p>
        </div>
      </section>

      {/* Grid List Section */}
      <section className="py-12 pb-24 bg-ivory">
        <div className="container-site">
          <div className="space-y-16">
            {disciplines.map((disc, index) => {
              const Icon = disc.icon;
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={disc.id} 
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-gold/10 pb-16 last:border-none last:pb-0`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="relative group overflow-hidden">
                      <div className="absolute -top-3 -left-3 w-full h-full border border-gold/10 z-0 group-hover:top-0 group-hover:left-0 transition-all duration-300" />
                      <img 
                        src={disc.image} 
                        alt={disc.title} 
                        className="relative z-10 w-full object-cover aspect-16/10 group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                    <span className="label-tag flex items-center gap-2">
                      <Icon size={14} className="text-gold flex-shrink-0" />
                      {disc.tag}
                    </span>
                    <h3 
                      className="text-charcoal text-4xl font-display font-light mt-1 mb-4"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {disc.title}
                    </h3>
                    <p 
                      className="text-gold text-xs font-body font-semibold tracking-wider mb-6 uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {disc.subtitle}
                    </p>
                    <p 
                      className="text-text-muted text-sm font-body leading-relaxed mb-8"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {disc.description}
                    </p>

                    {/* Features row */}
                    <div className="grid grid-cols-3 gap-4 border-t border-gold/10 pt-6 mb-8">
                      <div>
                        <span className="block text-[10px] text-text-light uppercase tracking-wider font-body">Yoğunluk</span>
                        <span className="text-charcoal text-xs font-semibold font-body">{disc.intensity}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-text-light uppercase tracking-wider font-body">Süre</span>
                        <span className="text-charcoal text-xs font-semibold font-body">{disc.duration}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-text-light uppercase tracking-wider font-body">Odak</span>
                        <span className="text-charcoal text-xs font-semibold font-body truncate block">{disc.focus}</span>
                      </div>
                    </div>

                    <Link 
                      href={`/branslar/${disc.id}`} 
                      className="inline-flex items-center gap-2 text-gold text-xs font-body font-bold tracking-widest uppercase hover:text-gold-dark transition-colors duration-200"
                    >
                      Detayları İncele <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Book Session */}
      <section className="section-padding bg-charcoal text-ivory text-center">
        <div className="container-site max-w-2xl">
          <span className="label-tag">Hemen Başla</span>
          <h2 
            className="text-ivory text-4xl font-display font-light my-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Hangi branşın size uygun olduğunu <br />
            <span className="text-gold italic">birlikte seçelim.</span>
          </h2>
          <p 
            className="text-ivory/60 text-xs font-body mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Uzman antrenörlerimizle hedeflerinizi görüşün, sizin için en doğru kombinasyonu ve seviyeyi belirleyerek ilk deneme seansınızı planlayın.
          </p>
          <Link href="/iletisim" className="btn-gold">
            Ücretsiz Danışmanlık Ayarla
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
