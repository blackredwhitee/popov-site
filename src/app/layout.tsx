import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeadModal from "@/components/LeadModal";
import Reveal from "@/components/Reveal";
import { SITE_NAME, SITE_URL } from "@/lib/config";
// Шрифты лежат в npm-пакетах — сборка не зависит от Google Fonts
import "@fontsource/literata/300.css";
import "@fontsource/literata/400.css";
import "@fontsource/literata/500.css";
import "@fontsource/literata/300-italic.css";
import "@fontsource/literata/400-italic.css";
import "@fontsource/golos-text/400.css";
import "@fontsource/golos-text/500.css";
import "@fontsource/golos-text/600.css";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: { default: "Михаил Попов — предприниматель, основатель Talkbank и EasyFinance", template: `%s — ${SITE_NAME}` },
  description: "Михаил Попов — предприниматель в финтехе и инновациях, основатель Talkbank и EasyFinance. Нахожу, где бизнес теряет деньги, и помогаю собственнику превратить потери в прибыль.",
};

export const viewport: Viewport = { themeColor: "#F5F3EE" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
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
