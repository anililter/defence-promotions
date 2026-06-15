import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Phone, Mail, CheckCircle2 } from "lucide-react";

interface BranchDetails {
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  highlight: string;
  description: string;
  longDescription: string;
  image: string;
  facilities: string[];
  coaches: { name: string; role: string; image: string }[];
}

const branchData: Record<string, BranchDetails> = {
  besiktas: {
    name: "Beşiktaş",
    city: "İstanbul",
    address: "Barbaros Bulvarı No:45, Beşiktaş, İstanbul",
    hours: "Hafta İçi: 06:00 – 23:00 / Hafta Sonu: 08:00 – 21:00",
    phone: "+90 212 288 45 45",
    email: "besiktas@defenceathletics.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8573981881677!2d29.0069399!3d41.0436859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a389270dbb%3A0xc3b8602b9ff9b867!2sBarbaros%20Blv.%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str",
    highlight: "Ana Merkez / HQ",
    description: "Şehrin kalbinde, Boğaz manzaralı premium lokasyonumuz.",
    longDescription: "Defence Athletics Beşiktaş, kulübümüzün ana merkezidir. İki kattan oluşan devasa tesisimiz, en son teknolojiye sahip kardiyo üniteleri, profesyonel boks ringi ve reformer pilates stüdyosuyla donatılmıştır. Boğaz manzaralı özel dinlenme alanlarımız ve lüks soyunma odalarımız ile antrenmandan önce ve sonra kendinizi şımartın.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&auto=format&fit=crop",
    facilities: [
      "Profesyonel Ölçülü Boks Ringi",
      "Tam Teşekküllü Reformer & Tower Pilates Stüdyosu",
      "Kişiye Özel Havalandırmalı VIP Soyunma Odaları",
      "Sauna, Fin Hamamı & Şok Duşları",
      "Özel Protein Bar & Kahve Dükkanı",
      "Vale ve Kapalı Otopark Hizmeti"
    ],
    coaches: [
      { name: "Murat Güler", role: "Kurucu & Baş Antrenör", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80&auto=format&fit=crop" },
      { name: "Elena Petrova", role: "Pilates Direktörü", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80&auto=format&fit=crop" }
    ]
  },
  kadikoy: {
    name: "Kadıköy",
    city: "İstanbul",
    address: "Moda Caddesi No:78, Kadıköy, İstanbul",
    hours: "Hafta İçi: 06:00 – 23:00 / Hafta Sonu: 07:00 – 22:00",
    phone: "+90 216 345 78 78",
    email: "kadikoy@defenceathletics.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.666991196429!2d29.0274299!3d40.9822859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab85faee92d6b%3A0xc3b8602b9ff9b867!2sModa%20Cd.%2C%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000001!5m2!1str!2str",
    highlight: "Anadolu Yakası",
    description: "Dinamik Kadıköy'ün ruhunu taşıyan ferah antrenman alanı.",
    longDescription: "Moda'nın kalbinde yer alan Kadıköy şubemiz, genç ve dinamik spor topluluğumuzun merkezidir. Yüksek tavanlı endüstriyel mimarisi, geniş CrossFit WOD alanı ve özel dış mekan fonksiyonel antrenman parkı ile alışılmışın dışında bir spor deneyimi sunar. Antrenman sonrası bahçe terasımızda sosyalleşebilirsiniz.",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80&auto=format&fit=crop",
    facilities: [
      "Geniş Kapsamlı CrossFit ve Fonksiyonel Antrenman Alanı",
      "Açık Hava Sentetik Çim Parkuru",
      "Fizyoterapi ve Sporcu Masajı Odası",
      "Sosyal Lounge ve Bahçe Terası",
      "Eleiko Ağırlık Barları & Ekipmanları",
      "Bisiklet ve Motosiklet Park Alanları"
    ],
    coaches: [
      { name: "Caner Yılmaz", role: "CrossFit Head Coach", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80&auto=format&fit=crop" },
      { name: "Selin Demir", role: "Mobilite & Kondisyon Antrenörü", image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&q=80&auto=format&fit=crop" }
    ]
  },
  levent: {
    name: "Levent",
    city: "İstanbul",
    address: "Büyükdere Caddesi No:102, Levent, İstanbul",
    hours: "Hafta İçi: 06:00 – 22:00 / Cumartesi: 08:00 – 20:00 / Pazar: Kapalı",
    phone: "+90 212 325 02 02",
    email: "levent@defenceathletics.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.4573981881677!2d29.0099399!3d41.0736859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab61489270dbb%3A0xc3b8602b9ff9b867!2sB%C3%BCy%C3%BCkdere%20Cd.%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000002!5m2!1str!2str",
    highlight: "İş & Kurumsal",
    description: "İstanbul'un finans merkezi içinde, kurumsal antrenman çözümleri.",
    longDescription: "Levent şubemiz, yoğun iş hayatına sahip profesyoneller için özel olarak tasarlandı. Metro çıkışına yakın lokasyonu, ekspres giyinme kabinleri, çalışma alanları ve antrenman sırasında veya sonrasında işinizi takip edebileceğiniz sessiz çalışma locaları ile zaman yönetiminizi en üst seviyeye taşır. Hızlı, etkili ve premium.",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&q=80&auto=format&fit=crop",
    facilities: [
      "Hızlı ve Etkili Seanslar İçin Optimize Edilmiş Kondisyon Parkuru",
      "Ekspres Duş ve Akıllı Şifreli Kabinler",
      "Sessiz Çalışma Alanları & Toplantı Odası",
      "Taze Sıkılmış Detoks Suları & Sağlıklı Snack Bar",
      "Özel Havalandırma ve HEPA Hava Filtreleme Sistemi",
      "Kurumsal Üyelere Özel Esnek Saat Rezervasyonları"
    ],
    coaches: [
      { name: "Ali Rıza Kaya", role: "Kuvvet & Kondisyon Antrenörü", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop" },
      { name: "Elena Petrova", role: "Pilates Direktörü", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80&auto=format&fit=crop" }
    ]
  },
  dubai: {
    name: "Dubai Marina",
    city: "Dubai",
    address: "Dubai Marina Walk, Marina Heights Tower, Dubai, UAE",
    hours: "Her Gün: 05:30 – 23:30",
    phone: "+971 4 456 7890",
    email: "dubai@defenceathletics.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.333333333333!2d55.1388889!3d25.0805556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f134567890abc%3A0x1234567890abcdef!2sDubai%20Marina%20Walk!5e0!3m2!1sen!2sae!4v1700000000003!5m2!1sen!2sae",
    highlight: "Global Elite / VIP",
    description: "Dubai Marina'nın ikonik silueti karşısında, global elite deneyim.",
    longDescription: "Defence Athletics Dubai Marina, markamızın amiral gemisidir. Marina kıyısındaki görkemli lokasyonunda, tamamen lüks detaylarla harmanlanmış ultra premium bir fitness deneyimi sunar. Çatı katındaki açık hava boks ringi, krioterapi odaları, kişiye özel concierge ve beslenme uzmanları ile dünya standartlarında bir spor kulübü.",
    image: "https://images.unsplash.com/photo-1582653280643-e395ea61f510?w=1200&q=80&auto=format&fit=crop",
    facilities: [
      "Çatı Katı Açık Hava Boks Ringi (Marina Manzaralı)",
      "Kriyoterapi Kabini & Buz Banyoları",
      "Kişisel Sporcu Havlusu ve Premium Kozmetik Ürünleri",
      "Kişiye Özel Antrenör & Diyetisyen Eşleşmesi",
      "Özel VIP Dinlenme Odası & Lounge Alanı",
      "Uluslararası Misafirler İçin Çok Dilli Eğitim Kadrosu"
    ],
    coaches: [
      { name: "Michael Vance", role: "Senior Performance Coach", image: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400&q=80&auto=format&fit=crop" },
      { name: "Yasmin Al-Jamil", role: "Yol Tarifi & Yoga Direktörü", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80&auto=format&fit=crop" }
    ]
  }
};

export async function generateStaticParams() {
  return [
    { id: "besiktas" },
    { id: "kadikoy" },
    { id: "levent" },
    { id: "dubai" }
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BranchDetailPage({ params }: Props) {
  const { id } = await params;
  const data = branchData[id];

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-charcoal" />

        <div className="container-site relative z-10">
          <Link 
            href="/subeler" 
            className="inline-flex items-center gap-2 text-gold text-xs font-body font-semibold tracking-wider uppercase mb-6 hover:text-gold-light transition-colors"
          >
            <ArrowLeft size={14} /> Tüm Şubeler
          </Link>
          <span className="label-tag block">{data.highlight}</span>
          <h1 
            className="text-ivory text-5xl md:text-7xl font-display font-light uppercase tracking-wide mt-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {data.name} Şubesi
          </h1>
          <p 
            className="text-gold text-sm md:text-base font-body tracking-[0.2em] uppercase mt-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {data.city}
          </p>
        </div>
      </section>

      {/* Detail Content */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Description & Amenities */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <span className="label-tag">Şube Tanıtımı</span>
                <h2 
                  className="text-charcoal text-3xl md:text-4xl font-display font-light mt-1 mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Sıra dışı imkanlarla <span className="text-gold italic">premium konfor.</span>
                </h2>
                <p 
                  className="text-text-muted text-base font-body leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {data.longDescription}
                </p>
              </div>

              {/* Facilities List */}
              <div>
                <h3 
                  className="text-charcoal text-2xl font-display font-light mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Şube Ayrıcalıkları
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {data.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-gold flex-shrink-0" size={18} />
                      <span className="text-charcoal/80 text-sm font-body" style={{ fontFamily: "var(--font-inter)" }}>
                        {fac}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Coaches */}
              <div>
                <h3 
                  className="text-charcoal text-2xl font-display font-light mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Bu Şubedeki Eğitmenlerimiz
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {data.coaches.map((coach, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-bege/20 p-4 border border-gold/10">
                      <img 
                        src={coach.image} 
                        alt={coach.name} 
                        className="w-16 h-16 rounded-full object-cover border border-gold/30"
                      />
                      <div>
                        <h4 className="text-charcoal font-display text-lg font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
                          {coach.name}
                        </h4>
                        <p className="text-gold text-[10px] font-body uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                          {coach.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Details & Map Mockup */}
            <div className="lg:col-span-4 bg-charcoal text-ivory p-8 lg:p-10 border-t-4 border-gold space-y-8">
              <div>
                <span className="label-tag text-gold mb-2 block">İletişim Bilgileri</span>
                <h3 className="text-ivory font-display text-2xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Adres &amp; Ulaşım
                </h3>

                <div className="space-y-4 text-sm font-body" style={{ fontFamily: "var(--font-inter)" }}>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-ivory/80 text-xs">{data.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-ivory/80 text-xs">{data.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-gold flex-shrink-0" size={16} />
                    <span className="text-ivory/80 text-xs">{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-gold flex-shrink-0" size={16} />
                    <span className="text-ivory/80 text-xs">{data.email}</span>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="w-full aspect-video border border-gold/20 overflow-hidden relative">
                <iframe 
                  src={data.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Tour reservation button */}
              <Link href="/iletisim" className="btn-gold w-full justify-center text-center">
                Şube Turu Rezervasyonu Ayarla
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
