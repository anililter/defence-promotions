import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Info } from "lucide-react";

interface DisciplineData {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  intensity: string;
  duration: string;
  focus: string;
  longDescription: string;
  features: string[];
  schedule: string[];
  targetAudience: string;
}

const disciplineData: Record<string, DisciplineData> = {
  boks: {
    title: "Boks",
    subtitle: "Combat & Kondisyon",
    tag: "Savaş Sanatı",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&q=80&auto=format&fit=crop",
    intensity: "Çok Yüksek",
    duration: "60 Dakika",
    focus: "Refleks, Kardiyo & Güç",
    longDescription: "Boks branşımız hem teknik savunma sanatlarını öğrenmek hem de olağanüstü bir kardiyovasküler dayanıklılık kazanmak isteyenlere hitap eder. Laktat eşiğini zorlayan interval antrenmanlar ile yağ yakımını maksimize ederken; refleks, el-göz koordinasyonu ve mental dayanıklılığınızı zirveye çıkarırsınız.",
    features: [
      "Birebir antrenör eşliğinde lapa ve teknik çalışmalar",
      "Grup seanslarında kontrollü teknik boks ve sparring",
      "Kondisyon ve patlayıcı gücü artıran interval torba çalışmaları",
      "Koordinasyon ve çevikliği geliştiren profesyonel ayak oyunları drills"
    ],
    schedule: [
      "Pazartesi, Çarşamba, Cuma: 19:30 - 20:30",
      "Salı, Perşembe: 08:00 - 09:00",
      "Cumartesi: 11:00 - 12:00"
    ],
    targetAudience: "Boks seanslarımız başlangıç seviyesinden profesyonel dövüşçü seviyesine kadar her düzeye uygun olarak adapte edilmektedir. Kendini zihnen ve bedenen zorlamak isteyen herkese açıktır."
  },
  crossfit: {
    title: "CrossFit",
    subtitle: "Fonksiyonel Güç & Topluluk",
    tag: "Yüksek Performans",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
    intensity: "Yüksek",
    duration: "60 Dakika",
    focus: "Kuvvet, Kondisyon & Jimnastik",
    longDescription: "CrossFit, sürekli değişen yüksek yoğunluklu fonksiyonel hareketlerden oluşur. Olimpik halter teknikleri, temel jimnastik hareketleri ve kardiyovasküler kapasitenin birleştiği bu program, Defence Athletics topluluk ruhu ve profesyonel head coach kontrolü ile birleşerek sizi her gün daha güçlü kılacaktır.",
    features: [
      "Günün Antrenmanı (WOD) ile her gün farklı bir fiziksel mücadele",
      "Olimpik halter teknikleri ve bar kontrolü geliştirme seansları",
      "Vücut ağırlığı egzersizleri ve ileri seviye jimnastik becerileri",
      "Metabolic Conditioning (MetCon) ile maksimum yağ yakımı ve kondisyon"
    ],
    schedule: [
      "Hafta İçi Her Gün: 07:00, 12:00, 18:30 (Çoklu Seanslar)",
      "Salı, Perşembe: 19:45 - 20:45",
      "Cumartesi (Team WOD): 10:00 - 11:30"
    ],
    targetAudience: "Gücünü, hızını ve fonksiyonel hareket kabiliyetini test etmek, sınırlarını zorlamak ve bunu bir toplulukla paylaşmak isteyenler için mükemmeldir. Coach gözetiminde tüm hareketler bireysel kapasiteye göre ölçeklendirilir."
  },
  pilates: {
    title: "Pilates",
    subtitle: "Reformer & Core Gücü",
    tag: "Zihin & Beden",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&auto=format&fit=crop",
    intensity: "Orta",
    duration: "50 Dakika",
    focus: "Postür, Esneklik & Core Kuvveti",
    longDescription: "Reformer ve mat seanslarımız, vücut hizalanmasını düzeltmeye, derin core kaslarını güçlendirmeye ve esnekliği artırmaya odaklanır. Zihin-beden kontrolünü geliştirerek hem günlük yaşam kalitenizi artırır hem de ağır antrenmanlar için sağlam bir fiziksel temel hazırlarsınız.",
    features: [
      "Kişiye özel postür ve duruş analizi",
      "Reformer, Tower ve Cadillac ekipmanları ile zengin içerikli seanslar",
      "Core (merkez bölge) stabilizasyonu ve derin omurga destek kasları çalışması",
      "Nefes kontrolü ile zihinsel rahatlama ve kas uzatma egzersizleri"
    ],
    schedule: [
      "Salı, Perşembe: 09:00 - 10:00 / 14:00 - 15:00 / 19:00 - 20:00",
      "Pazartesi, Çarşamba: 12:00 - 13:00",
      "Cumartesi: 12:00 - 13:00"
    ],
    targetAudience: "Duruş bozukluklarını gidermek, sırt ve bel ağrılarından kurtulmak, esnekliğini artırmak ve dengeli bir kas yapısına sahip olmak isteyen üyelerimiz için son derece idealdir."
  },
  mobilite: {
    title: "Mobilite",
    subtitle: "Hareket Kabiliyeti & Rejenerasyon",
    tag: "Fonksiyonel",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&auto=format&fit=crop",
    intensity: "Düşük / Orta",
    duration: "45 Dakika",
    focus: "Eklem Sağlığı & Esneklik",
    longDescription: "Mobilite antrenmanı, eklemlerinizin tam hareket açısında (Range of Motion) güvenle çalışmasını sağlar. Kas kısalıklarını gidermek, eklem sıkışmalarını önlemek ve sakatlık risklerini minimize etmek amacıyla tasarlanan bu dersler, ağır antrenman rutinlerinizin en önemli destekçisidir.",
    features: [
      "Kalça, omuz ve omurga hareketliliğini artırıcı özel egzersiz dizileri",
      "Fasya dokusunun gevşetilmesi (Myofascial Release) teknikleri",
      "Aktif esneme ve dinamik eklem stabilizasyonu çalışmaları",
      "Yaralanma ve sakatlık sonrası spora dönüşü destekleyen rehabilitatif hareketler"
    ],
    schedule: [
      "Pazartesi, Çarşamba: 08:30 - 09:15 / 17:30 - 18:15",
      "Cuma: 12:00 - 12:45",
      "Pazar: 11:00 - 11:45"
    ],
    targetAudience: "Atletik performansını artırmak, eklem kısıtlılıklarını gidermek, kas sertliğini azaltmak ve daha esnek bir bedene kavuşmak isteyen her seviyedeki üyemiz seanslarımıza katılabilir."
  },
  kondisyon: {
    title: "Kondisyon",
    subtitle: "Güç & Atletik Performans",
    tag: "Elite Training",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=1200&q=80&auto=format&fit=crop",
    intensity: "Yüksek",
    duration: "60 Dakika",
    focus: "Kuvvet, Çeviklik & Atletizm",
    longDescription: "Kondisyon seanslarımız, atletik performansınızı en üst seviyeye taşımak amacıyla geliştirilen bilimsel metodolojilerden oluşur. Hız, çeviklik, reaksiyon süresi ve patlayıcı kuvvetinizi geliştirirken, kardiyovasküler kapasitenizi maksimuma çıkararak dayanıklılığınızı baştan tanımlarsınız.",
    features: [
      "Kişiye özel kardiyovasküler ve laktat kapasitesi testleri",
      "Hız, ivmelenme ve yön değiştirme (Agility) antrenmanları",
      "Fonksiyonel güç gelişimi ve kuvvet-hız (Power) kombinasyonu",
      "Performans ölçümleri ve bilimsel gelişim takibi"
    ],
    schedule: [
      "Salı, Perşembe: 07:00 - 08:00 / 18:00 - 19:00",
      "Pazartesi, Çarşamba: 19:00 - 20:00",
      "Cumartesi: 09:00 - 10:00"
    ],
    targetAudience: "Belli bir spor dalında yarışan profesyonel veya amatör sporcular, ya da günlük yaşamında yüksek enerji, atletik görünüm ve üstün kondisyon seviyesi hedefleyen üyelerimiz içindir."
  }
};

export async function generateStaticParams() {
  return [
    { id: "boks" },
    { id: "crossfit" },
    { id: "pilates" },
    { id: "mobilite" },
    { id: "kondisyon" }
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DisciplineDetailPage({ params }: Props) {
  const { id } = await params;
  const data = disciplineData[id];

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-charcoal" />

        <div className="container-site relative z-10">
          <Link 
            href="/branslar" 
            className="inline-flex items-center gap-2 text-gold text-xs font-body font-semibold tracking-wider uppercase mb-6 hover:text-gold-light transition-colors"
          >
            <ArrowLeft size={14} /> Tüm Branşlar
          </Link>
          <span className="label-tag block">{data.tag}</span>
          <h1 
            className="text-ivory text-5xl md:text-7xl font-display font-light uppercase tracking-wide mt-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {data.title}
          </h1>
          <p 
            className="text-gold text-sm md:text-base font-body tracking-[0.2em] uppercase mt-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <span className="label-tag">Genel Bakış</span>
                <h2 
                  className="text-charcoal text-3xl md:text-4xl font-display font-light mt-1 mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Bu disiplin size ne <span className="text-gold italic">kazandıracak?</span>
                </h2>
                <p 
                  className="text-text-muted text-base font-body leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {data.longDescription}
                </p>
              </div>

              {/* Features list */}
              <div>
                <h3 
                  className="text-charcoal text-2xl font-display font-light mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Öne Çıkan Özellikler
                </h3>
                <ul className="space-y-4">
                  {data.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-gold flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-charcoal/80 text-sm font-body" style={{ fontFamily: "var(--font-inter)" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target audience */}
              <div className="bg-bege/20 p-8 border-l-2 border-gold/30 flex items-start gap-4">
                <Info className="text-gold flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-charcoal font-display text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Kimler İçin Uygundur?
                  </h4>
                  <p className="text-text-muted text-xs font-body leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {data.targetAudience}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Schedule & Quick Info */}
            <div className="lg:col-span-4 bg-charcoal text-ivory p-8 lg:p-10 relative overflow-hidden border-t-4 border-gold">
              <span className="label-tag text-gold mb-2 block">Seans Detayları</span>
              <h3 className="text-ivory font-display text-2xl font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                Haftalık Program
              </h3>

              <div className="space-y-6 mb-8">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-ivory/10">
                  <div>
                    <span className="block text-[10px] text-ivory/40 uppercase tracking-wider font-body">Yoğunluk</span>
                    <span className="text-gold text-sm font-semibold font-body">{data.intensity}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-ivory/40 uppercase tracking-wider font-body">Süre</span>
                    <span className="text-gold text-sm font-semibold font-body">{data.duration}</span>
                  </div>
                </div>

                {/* Schedule list */}
                <div className="space-y-3">
                  <span className="block text-[10px] text-ivory/40 uppercase tracking-wider font-body mb-2">Örnek Seans Saatleri</span>
                  {data.schedule.map((time, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Clock className="text-gold flex-shrink-0" size={14} />
                      <span className="text-ivory/80 text-xs font-body" style={{ fontFamily: "var(--font-inter)" }}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation CTA Button */}
              <Link href="/iletisim" className="btn-gold w-full justify-center text-center">
                İlk Seansı Planla
              </Link>
              <span className="block text-[10px] text-ivory/40 text-center mt-3 font-body">
                *İlk deneme seansı kulübümüzün ikramıdır.
              </span>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
