import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Şubelerimiz — Defence Athletics",
  description: "İstanbul ve Dubai'nin en seçkin lokasyonlarında spor salonlarımızı keşfedin. Beşiktaş, Kadıköy, Levent ve Dubai Marina şubelerimizin detayları.",
};

const branches = [
  {
    id: "besiktas",
    city: "İstanbul",
    name: "Beşiktaş",
    address: "Barbaros Bulvarı No:45, Beşiktaş",
    hours: "06:00 – 23:00",
    phone: "+90 212 288 45 45",
    highlight: "Ana Merkez",
    description: "Şehrin kalbinde, Boğaz manzaralı premium lokasyonumuz.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop",
    amenities: ["VIP Soyunma Odaları", "Sauna & Buhar Odası", "Özel Otopark & Vale", "Protein Bar & Cafe"],
  },
  {
    id: "kadikoy",
    city: "İstanbul",
    name: "Kadıköy",
    address: "Moda Caddesi No:78, Kadıköy",
    hours: "06:00 – 23:00",
    phone: "+90 216 345 78 78",
    highlight: "Anadolu Yakası",
    description: "Dinamik Kadıköy'ün ruhunu taşıyan ferah antrenman alanı.",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80&auto=format&fit=crop",
    amenities: ["Geniş CrossFit Alanı", "Dış Mekan Antrenman Parkı", "Fizyoterapi Odası", "Sosyal Lounge"],
  },
  {
    id: "levent",
    city: "İstanbul",
    name: "Levent",
    address: "Büyükdere Caddesi No:102, Levent",
    hours: "06:00 – 22:00",
    phone: "+90 212 325 02 02",
    highlight: "İş Merkezi",
    description: "İstanbul'un finans merkezi içinde, kurumsal antrenman çözümleri.",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80&auto=format&fit=crop",
    amenities: ["Özel Toplantı & Çalışma Odaları", "Ekspres Duş & Giyinme Kabinleri", "Kurumsal Üyelik Paketleri", "Detoks Bar"],
  },
  {
    id: "dubai",
    city: "Dubai",
    name: "Dubai Marina",
    address: "Dubai Marina Walk, Dubai, UAE",
    hours: "05:30 – 23:30",
    phone: "+971 4 456 7890",
    highlight: "International",
    description: "Dubai Marina'nın ikonik silueti karşısında, global elite deneyim.",
    image: "https://images.unsplash.com/photo-1582653280643-e395ea61f510?w=800&q=80&auto=format&fit=crop",
    amenities: ["Panoramik Marina Manzarası", "Açık Hava Çatı Katı Ring", "Krioterapi Kabini", "Premium Concierge Servisi"],
  },
];

export default function BranchesPage() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1600&q=80&auto=format&fit=crop" 
            alt="Şubeler Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/70 to-charcoal" />
        
        <div className="container-site relative z-10 text-center">
          <span className="label-tag">Lokasyonlarımız</span>
          <h1 
            className="text-ivory text-5xl md:text-7xl font-display font-light uppercase tracking-wider mt-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Şubelerimiz
          </h1>
          <p 
            className="text-gold/80 text-sm md:text-base font-body tracking-[0.2em] uppercase mt-4 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Size en yakın premium antrenman alanını keşfedin.
          </p>
        </div>
      </section>

      {/* Intro section */}
      <section className="section-padding bg-ivory">
        <div className="container-site text-center max-w-3xl">
          <span className="label-tag">Seçkin Lokasyonlar</span>
          <h2 
            className="text-charcoal text-4xl lg:text-5xl font-display font-light mt-2 mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Sizi en yakın <span className="text-gold italic">mükemmeliyete</span> bağlıyoruz.
          </h2>
          <p 
            className="text-text-muted text-base font-body leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            İstanbul&apos;un en hareketli ve merkezi noktalarından Dubai Marina&apos;nın lüks kıyılarına kadar uzanan kulüplerimiz, sadece antrenman yapacağınız bir alan değil; spor sonrası dinlenebileceğiniz, sosyalleşebileceğiniz ve kendinizi yenileyebileceğiniz lüks yaşam merkezleri olarak tasarlandı.
          </p>
        </div>
      </section>

      {/* Branches List */}
      <section className="py-12 pb-24 bg-ivory">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {branches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-bege/20 border border-gold/10 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="overflow-hidden aspect-16/10 relative group">
                  <span className="absolute top-4 left-4 z-20 bg-charcoal text-gold text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1.5">
                    {branch.highlight}
                  </span>
                  <img 
                    src={branch.image} 
                    alt={branch.name} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-8 flex-grow">
                  <span className="text-gold text-[10px] font-body font-bold tracking-[0.25em] uppercase mb-1 block">
                    {branch.city}
                  </span>
                  <h3 
                    className="text-charcoal text-3xl font-display font-light mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {branch.name}
                  </h3>
                  <p 
                    className="text-text-muted text-sm font-body leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {branch.description}
                  </p>

                  {/* Quick details */}
                  <div className="space-y-3 mb-6 border-t border-gold/10 pt-6">
                    <div className="flex items-center gap-3">
                      <MapPin size={14} className="text-gold flex-shrink-0" />
                      <span className="text-charcoal/80 text-xs font-body" style={{ fontFamily: "var(--font-inter)" }}>
                        {branch.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-gold flex-shrink-0" />
                      <span className="text-charcoal/80 text-xs font-body" style={{ fontFamily: "var(--font-inter)" }}>
                        {branch.hours}
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <span className="block text-[10px] text-text-light uppercase tracking-wider font-body mb-3">İmkanlar &amp; Özellikler</span>
                    <div className="grid grid-cols-2 gap-2">
                      {branch.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                          <span className="text-charcoal/70 text-[11px] font-body truncate" style={{ fontFamily: "var(--font-inter)" }}>
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-8 pb-8 pt-0 border-t border-gold/5 mt-auto">
                  <Link 
                    href={`/subeler/${branch.id}`} 
                    className="btn-outline-gold w-full justify-center text-center py-3"
                  >
                    Şubeyi İncele <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Overview CTA */}
      <section className="section-padding bg-charcoal text-ivory text-center">
        <div className="container-site max-w-2xl">
          <span className="label-tag">İletişim &amp; Rezervasyon</span>
          <h2 
            className="text-ivory text-4xl font-display font-light my-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Seansınızı planlamak veya kulübümüzü <br />
            <span className="text-gold italic">ziyaret etmek mi istiyorsunuz?</span>
          </h2>
          <p 
            className="text-ivory/60 text-xs font-body mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Seans rezervasyonları, üyelik detayları ya da şube turlarımız için temsilcilerimizle hemen iletişime geçin. Size en kısa sürede dönüş sağlayalım.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/iletisim" className="btn-gold">
              İletişime Geç
            </Link>
            <Link href="/iletisim#uyelik" className="btn-outline-ivory">
              Üyelik Paketleri
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
