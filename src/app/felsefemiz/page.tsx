import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Award, Users, Target } from "lucide-react";

export const metadata = {
  title: "Felsefemiz — Defence Athletics",
  description: "Beden önce zihinle dönüşür. Defence Athletics'in elite spor felsefesini, vizyonunu ve lüks antrenman deneyimini keşfedin.",
};

const values = [
  {
    icon: Shield,
    title: "Mükemmeliyet",
    description: "Ekipmandan antrenöre, tasarımdan atmosfere kadar her detayda en yüksek kalite standardını sunuyoruz."
  },
  {
    icon: Target,
    title: "Kişiselleştirilmiş Yaklaşım",
    description: "Her bedenin ve zihnin eşsiz olduğuna inanıyoruz. Antrenman programlarınızı genetik yapınız ve hedeflerinize göre tasarlıyoruz."
  },
  {
    icon: Award,
    title: "Bilimsel Metotlar",
    description: "Geleneksel spor yaklaşımlarını modern spor bilimleri ve fonksiyonel antrenman teknikleriyle harmanlıyoruz."
  },
  {
    icon: Users,
    title: "Seçkin Topluluk",
    description: "Benzer hedeflere sahip, birbirini motive eden ve başarıyı paylaşan elit bir üye grubunun parçası olursunuz."
  }
];

const coaches = [
  {
    name: "Murat Güler",
    role: "Kurucu & Boks Baş Antrenörü",
    specialty: "Profesyonel Boks & Kondisyon",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&q=80&auto=format&fit=crop"
  },
  {
    name: "Elena Petrova",
    role: "Pilates & Mobilite Direktörü",
    specialty: "Klinik Pilates & Postür Düzeltme",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&q=80&auto=format&fit=crop"
  },
  {
    name: "Caner Yılmaz",
    role: "CrossFit Head Coach",
    specialty: "Olimpik Halter & Atletik Performans",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80&auto=format&fit=crop"
  }
];

export default function PhilosophyPage() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80&auto=format&fit=crop" 
            alt="Felsefe Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/70 to-charcoal" />
        
        <div className="container-site relative z-10 text-center">
          <span className="label-tag">Vizyonumuz &amp; Metodumuz</span>
          <h1 
            className="text-ivory text-5xl md:text-7xl font-display font-light uppercase tracking-wider mt-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Beden önce <br className="sm:hidden" />
            <span className="text-gold italic">zihinle</span> dönüşür.
          </h1>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="label-tag">Hikayemiz</span>
              <h2 
                className="text-charcoal text-4xl lg:text-5xl font-display font-light mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Sıradan bir kulüp değil, <br />
                <em className="text-gold not-italic">yüksek performans felsefesi.</em>
              </h2>
              <div className="space-y-6 font-body text-sm text-text-muted leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                <p>
                  Defence Athletics, yalnızca bedenini çalıştırmak değil, aynı zamanda potansiyelinin en üst sınırına ulaşmak isteyen bireyler için 2018 yılında kuruldu. İstanbul&apos;dan Dubai&apos;ye uzanan yolculuğumuzda, her zaman lüks, bilim ve sporu bir araya getirmeyi hedefledik.
                </p>
                <p>
                  Burası, egzersizin sadece bir kalori yakma yöntemi değil, zihinsel berraklık, disiplin ve bütünsel sağlık arayışı olduğuna inananların kulübüdür. Sunduğumuz tüm hizmetler, en ince ayrıntısına kadar bu vizyon doğrultusunda şekillendirilmiştir.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/20 z-0" />
              <img 
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80&auto=format&fit=crop" 
                alt="Felsefemiz Detay" 
                className="relative z-10 w-full object-cover aspect-4/3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="label-tag">Temel Değerlerimiz</span>
            <h2 
              className="text-ivory text-4xl lg:text-5xl font-display font-light mt-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Bizi <span className="text-gold italic">benzersiz</span> kılan unsurlar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-charcoal-light p-8 border-t-2 border-gold/30 hover:border-gold transition-colors duration-300">
                  <Icon className="text-gold mb-6" size={32} />
                  <h3 
                    className="text-ivory text-2xl font-display font-light mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {val.title}
                  </h3>
                  <p 
                    className="text-ivory/60 text-xs font-body leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trainers/Coaches Section */}
      <section id="antrenorler" className="section-padding bg-ivory">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="label-tag">Eğitmen Kadromuz</span>
            <h2 
              className="text-charcoal text-4xl lg:text-5xl font-display font-light mt-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Potansiyelinize yön veren <br />
              <span className="text-gold italic">elite eğitmenler</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coaches.map((coach, idx) => (
              <div key={idx} className="group overflow-hidden bg-bege/30 pb-6">
                <div className="overflow-hidden aspect-square mb-6">
                  <img 
                    src={coach.image} 
                    alt={coach.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-6">
                  <span className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-gold">
                    {coach.role}
                  </span>
                  <h3 
                    className="text-charcoal text-2xl font-display font-light mt-1 mb-2"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {coach.name}
                  </h3>
                  <p 
                    className="text-text-muted text-xs font-body"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {coach.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal text-ivory text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.1)_0%,transparent_70%)]" />
        <div className="container-site relative z-10 max-w-3xl">
          <span className="label-tag">Harekete Geç</span>
          <h2 
            className="text-ivory text-4xl md:text-5xl lg:text-6xl font-display font-light my-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Kendinin en yüksek <br />
            <em className="text-gold not-italic">versiyonuna</em> hazır mısın?
          </h2>
          <p 
            className="text-ivory/60 text-sm font-body mb-8 leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Hemen bugün elit spor dünyamıza katılın, hedeflerinize ve yaşam tarzınıza özel tasarlanmış ayrıcalıklı antrenman programlarıyla tanışın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/iletisim" className="btn-gold">
              Seans Ayarla
            </Link>
            <Link href="/branslar" className="btn-outline-ivory">
              Branşları İncele
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
