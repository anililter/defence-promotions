import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Defence Promotions — MMA Organizasyon",
  description:
    "Türkiye'nin önde gelen MMA organizasyonu. Yaklaşan etkinlikler, maç kartları ve bilet bilgileri için resmi site.",
  keywords: "MMA, dövüş, organizasyon, etkinlik, kafes, mixed martial arts, Türkiye",
  openGraph: {
    title: "Defence Promotions — MMA Organizasyon",
    description: "Türkiye'nin önde gelen MMA organizasyonu.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
