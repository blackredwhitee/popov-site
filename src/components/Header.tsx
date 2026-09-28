"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TELEGRAM } from "@/lib/config";
import { openLead } from "@/lib/lead";
import { TgIcon } from "./icons";
import s from "./Header.module.css";

const NAV = [
  { href: "/#services", t: "Услуги" },
  { href: "/#how", t: "Как я работаю" },
  { href: "/cases/", t: "Кейсы", key: "/cases" },
  { href: "/#about", t: "Обо мне" },
  { href: "/blog/", t: "Блог", key: "/blog" },
];

export default function Header() {
  const path = usePathname() || "/";
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);
  const cur = (key?: string) => (key && path.startsWith(key) ? "page" : undefined);

  return (
    <>
      <header className={s.header}>
        <div className={s.bar}>
          <Link href="/" className={s.mark}>Михаил Попов</Link>
          <nav className={s.nav} aria-label="Основное меню">
            {NAV.map((n) => <Link key={n.t} href={n.href} aria-current={cur(n.key)}>{n.t}</Link>)}
            <button type="button" className={`btn btn-primary ${s.cta}`} onClick={openLead}>Обсудить задачу</button>
          </nav>
          <button type="button" className={s.burger} aria-label="Меню" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
            <span /><span />
          </button>
        </div>
        {menu && (
          <nav id="mobile-menu" className={s.menu} aria-label="Мобильное меню">
            {NAV.map((n) => <Link key={n.t} href={n.href} onClick={() => setMenu(false)}>{n.t}</Link>)}
          </nav>
        )}
      </header>
      <div className={s.mbar}>
        <button type="button" className="btn btn-primary" onClick={openLead}>Обсудить задачу</button>
        <a href={TELEGRAM} className={s.tg} aria-label="Telegram" target="_blank" rel="noopener"><TgIcon color="currentColor" /></a>
      </div>
    </>
  );
}
