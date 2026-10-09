import Link from "next/link";
import { EMAIL, FORBES, REQUISITES, TELEGRAM_CHANNEL } from "@/lib/config";
import CookieBanner from "./CookieBanner";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={s.footer}>
        <div className={s.inner}>
          <div className={s.brand}><b>Михаил Попов</b><span>Предприниматель в финтехе и инновациях</span></div>
          <nav className={s.menu} aria-label="Меню в подвале">
            <Link href="/#services">Услуги</Link><Link href="/#how">Как я работаю</Link><Link href="/cases/">Кейсы</Link>
            <Link href="/#about">Обо мне</Link><Link href="/blog/">Блог</Link><Link href="/media/">Публикации</Link>
          </nav>
          <div className={s.contacts}>
            <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener">Telegram-канал</a>
            <a href={FORBES} target="_blank" rel="noopener">Профиль Forbes</a>
            {EMAIL ? <a href={`mailto:${EMAIL}`}>{EMAIL}</a> : <span>[e-mail]</span>}
          </div>
          <div className={s.bottom}>
            <span>© {new Date().getFullYear()} Михаил Попов</span><span>{REQUISITES}</span>
            <Link href="/privacy/">Политика обработки персональных данных</Link>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}
