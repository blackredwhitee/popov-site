import type { Metadata, Viewport } from "next";
import { Golos_Text, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeadModal from "@/components/LeadModal";
import Reveal from "@/components/Reveal";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["cyrillic", "latin"], weight: ["400", "500"], variable: "--font-playfair", display: "swap" });
const golos = Golos_Text({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "600"], variable: "--font-golos", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: { default: "Михаил Попов — внешний директор по развитию", template: `%s — ${SITE_NAME}` },
  description: "Нахожу, где бизнес теряет деньги, и остаюсь, пока это не превратится в прибыль. 25+ лет в управлении: «Магнит», ГК ПИК, BORK. Для собственников с выручкой от 300 млн ₽.",
};

export const viewport: Viewport = { themeColor: "#F5F3EE" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${playfair.variable} ${golos.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <LeadModal />
        <Reveal />
      </body>
    </html>
  );
}
