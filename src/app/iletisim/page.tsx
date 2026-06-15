"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Deneme seansı ücretli midir?",
    answer: "Hayır. Defence Athletics kalitesini ve atmosferini deneyimlemeniz için ilk seansınız tamamen ücretsiz ve kulübümüzün ikramıdır."
  },
  {
    question: "Üyelik paketleriniz neleri kapsıyor?",
    answer: "Üyelik paketlerimiz aylık seans adetlerine göre (8 seans, 12 seans veya Sınırsız) değişkenlik gösterir. Tüm üyeliklerde sauna, VIP soyunma odaları ve protein bar indirimleri dahildir."
  },
  {
    question: "Üyeliğimi dondurma veya iptal etme hakkım var mı?",
    answer: "Evet. 3 aylık üyeliklerde 15 gün, 6 aylık ve üzeri üyeliklerde ise 30 güne kadar ücretsiz dondurma hakkınız bulunur. Haklarınızı dilediğiniz zaman dondurabilirsiniz."
  },
  {
    question: "Seanslara gelirken yanımda ne getirmeliyim?",
    answer: "Kulübümüz size temiz spor havlusu, şampuan, saç kremi ve duş jeli temin etmektedir. Yanınızda sadece temiz tabanlı bir salon spor ayakkabısı ve rahat antrenman kıyafetleri getirmeniz yeterlidir."
  },
  {
    question: "Birebir özel ders (PT) hizmeti sunuyor musunuz?",
    answer: "Evet. Tüm branşlarımızda (özellikle boks, pilates ve kondisyon) alanında uzman elit antrenörlerimizle birebir Personal Training (PT) seansları alabilirsiniz."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "besiktas",
    discipline: "boks",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "besiktas",
        discipline: "boks",
        message: ""
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[300px] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80&auto=format&fit=crop" 
            alt="İletişim Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/70 to-charcoal" />
        
        <div className="container-site relative z-10 text-center">
          <span className="label-tag">Bize Ulaşın</span>
          <h1 
            className="text-ivory text-5xl md:text-7xl font-display font-light uppercase tracking-wider mt-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            İletişim &amp; Rezervasyon
          </h1>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <span className="label-tag">Bizimle Görüşün</span>
                <h2 
                  className="text-charcoal text-4xl font-display font-light mt-1 mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Dönüşüm yolculuğunuzu <br />
                  <span className="text-gold italic">bugün başlatın.</span>
                </h2>
                <p 
                  className="text-text-muted text-sm font-body leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Defence Athletics deneyimini yerinde görmek, eğitmenlerimizle tanışmak ve üyelik modellerimiz hakkında detaylı bilgi almak için aşağıdaki formdan seans talep edebilir veya doğrudan şubelerimize ulaşabilirsiniz.
                </p>
              </div>

              {/* General HQ Stats / Details */}
              <div className="space-y-6 border-t border-gold/10 pt-10 font-body text-sm text-text-muted" style={{ fontFamily: "var(--font-inter)" }}>
                <div className="flex items-start gap-4">
                  <MapPin className="text-gold flex-shrink-0 mt-1" size={18} />
                  <div>
                    <strong className="block text-charcoal font-semibold">Genel Merkez (HQ)</strong>
                    <span className="text-xs">Barbaros Bulvarı No:45, Beşiktaş, İstanbul</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-gold flex-shrink-0 mt-1" size={18} />
                  <div>
                    <strong className="block text-charcoal font-semibold">Telefon</strong>
                    <span className="text-xs">+90 212 288 45 45</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-gold flex-shrink-0 mt-1" size={18} />
                  <div>
                    <strong className="block text-charcoal font-semibold">E-posta</strong>
                    <span className="text-xs">info@defenceathletics.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-gold flex-shrink-0 mt-1" size={18} />
                  <div>
                    <strong className="block text-charcoal font-semibold">Çalışma Saatleri</strong>
                    <span className="text-xs">Hafta İçi: 06:00 – 23:00 / Hafta Sonu: 07:00 – 22:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7 bg-charcoal text-ivory p-8 lg:p-12 relative overflow-hidden border-t-4 border-gold">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <CheckCircle2 className="text-gold mx-auto" size={64} />
                  <h3 className="text-ivory font-display text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Talebiniz Alındı
                  </h3>
                  <p className="text-ivory/60 text-sm font-body max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
                    Ücretsiz deneme seansı ve danışmanlık talebiniz başarıyla kaydedilmiştir. Müşteri ilişkileri temsilcimiz en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button 
                    id="reset-form-btn"
                    onClick={() => setSubmitted(false)} 
                    className="btn-outline-gold text-xs mt-6"
                  >
                    Yeni Talep Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="label-tag text-gold mb-1 block">Rezervasyon Formu</span>
                    <h3 className="text-ivory font-display text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                      Deneme Seansı Talep Et
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[10px] text-ivory/40 uppercase tracking-wider mb-2 font-body">Adınız Soyadınız *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-ivory/20 py-2 text-ivory text-sm outline-none focus:border-gold transition-colors font-body"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] text-ivory/40 uppercase tracking-wider mb-2 font-body">E-posta Adresiniz *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-ivory/20 py-2 text-ivory text-sm outline-none focus:border-gold transition-colors font-body"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-[10px] text-ivory/40 uppercase tracking-wider mb-2 font-body">Telefon Numaranız</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        placeholder="+90 XXX XXX XX XX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-ivory/20 py-2 text-ivory text-sm outline-none focus:border-gold transition-colors font-body"
                      />
                    </div>
                    <div>
                      <label htmlFor="branch" className="block text-[10px] text-ivory/40 uppercase tracking-wider mb-2 font-body">Tercih Edilen Şube</label>
                      <select 
                        id="branch" 
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full bg-charcoal border-b border-ivory/20 py-2 text-ivory text-sm outline-none focus:border-gold transition-colors font-body"
                      >
                        <option value="besiktas">Beşiktaş (Merkez)</option>
                        <option value="kadikoy">Kadıköy</option>
                        <option value="levent">Levent</option>
                        <option value="dubai">Dubai Marina</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="discipline" className="block text-[10px] text-ivory/40 uppercase tracking-wider mb-2 font-body">İlgi Duyulan Branş</label>
                      <select 
                        id="discipline" 
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleChange}
                        className="w-full bg-charcoal border-b border-ivory/20 py-2 text-ivory text-sm outline-none focus:border-gold transition-colors font-body"
                      >
                        <option value="boks">Boks</option>
                        <option value="crossfit">CrossFit</option>
                        <option value="pilates">Pilates</option>
                        <option value="mobilite">Mobilite</option>
                        <option value="kondisyon">Kondisyon</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] text-ivory/40 uppercase tracking-wider mb-2 font-body">Mesajınız / Eklemek İstedikleriniz</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-ivory/10 p-3 text-ivory text-sm outline-none focus:border-gold transition-colors font-body"
                    />
                  </div>

                  <button 
                    id="submit-form-btn"
                    type="submit" 
                    className="btn-gold w-full justify-center flex items-center gap-2"
                  >
                    <Send size={14} /> Talebi Gönder
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="kvkk" className="section-padding bg-bege/20 border-t border-gold/10">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-12">
            <span className="label-tag">Sıkça Sorulan Sorular</span>
            <h2 
              className="text-charcoal text-4xl font-display font-light mt-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Aklınızdaki <span className="text-gold italic">sorular</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-ivory border border-gold/10 hover:border-gold/30 transition-all duration-300"
              >
                <button 
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                >
                  <h3 
                    className="text-charcoal font-display text-xl font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {faq.question}
                  </h3>
                  {openFaq === idx ? (
                    <ChevronUp className="text-gold flex-shrink-0" size={18} />
                  ) : (
                    <ChevronDown className="text-gold flex-shrink-0" size={18} />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-0 border-t border-gold/5">
                    <p 
                      className="text-text-muted text-sm font-body leading-relaxed pt-4"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
