"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadMetrika } from "@/lib/metrika";
import s from "./Footer.module.css";

const KEY = "popov_cookie_ok";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ok = false;
    try { ok = localStorage.getItem(KEY) === "1"; } catch {}
    // TODO: порядок включения Метрики — по заключению юриста (ТЗ §11). Сейчас — после «Понятно».
    if (ok) loadMetrika(); else setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className={s.cookie} role="region" aria-label="Cookie">
      <p>Сайт использует cookie и Яндекс Метрику, чтобы понимать, какие материалы полезны. <Link href="/privacy/">Подробнее</Link></p>
      <button type="button" className="btn btn-primary" onClick={() => { try { localStorage.setItem(KEY, "1"); } catch {} loadMetrika(); setShow(false); }}>Понятно</button>
    </div>
  );
}
