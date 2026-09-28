"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { INDUSTRIES, LEAD_TASKS, REVENUES } from "@/data/common";
import { LEAD_ENDPOINT, TELEGRAM, TELEGRAM_HANDLE } from "@/lib/config";
import { goal } from "@/lib/metrika";
import s from "./LeadForm.module.css";

type Errors = Partial<Record<"name" | "contact" | "industry" | "revenue" | "consent", true>>;
const PRIORITY = new Set(["300 млн – 1 млрд ₽", "1–5 млрд ₽", "5+ млрд ₽"]);

function validContact(c: string) {
  if (c.startsWith("@")) return /^@[A-Za-z0-9_]{4,}$/.test(c);
  return /^\+?[\d\s()-]+$/.test(c) && c.replace(/\D/g, "").length >= 10;
}

/** Метки источника: UTM из адреса + метка мероприятия (QR: ?event=...). */
function tracking() {
  const q = new URLSearchParams(location.search);
  const out: Record<string, string> = {};
  q.forEach((v, k) => { if (k.startsWith("utm_") || k === "event") out[k] = v; });
  return out;
}

export default function LeadForm({ source }: { source: "home" | "cases" | "modal" }) {
  const router = useRouter();
  const id = useId();
  const [tasks, setTasks] = useState<string[]>([]);
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const toggle = (t: string) => setTasks((xs) => (xs.includes(t) ? xs.filter((x) => x !== t) : [...xs, t]));

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const f = new FormData(form);
    if (f.get("website")) return; // honeypot
    const v = (k: string) => String(f.get(k) || "").trim();
    const e: Errors = {};
    if (!v("name")) e.name = true;
    if (!validContact(v("contact"))) e.contact = true;
    if (!v("industry")) e.industry = true;
    if (!v("revenue")) e.revenue = true;
    if (!f.get("consent")) e.consent = true;
    setErr(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    const lead = {
      name: v("name"), contact: v("contact"), company: v("company"), industry: v("industry"),
      revenue: v("revenue"), tasks, comment: v("comment"), source,
      priority: PRIORITY.has(v("revenue")), page: location.pathname, ...tracking(),
    };
    setStatus("submitting");
    try {
      if (LEAD_ENDPOINT) {
        const r = await fetch(LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
        if (!r.ok) throw new Error(String(r.status));
      }
      try { sessionStorage.setItem("popov_lead", JSON.stringify({ name: lead.name, revenue: lead.revenue, source })); } catch {}
      goal("lead_submit", { source, priority: lead.priority });
      window.dispatchEvent(new Event("lead-sent"));
      router.push("/thanks/");
    } catch {
      setStatus("error");
    }
  }

  const inv = (k: keyof Errors) => (err[k] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${k}` } : {});
  const cls = (k: keyof Errors) => `${s.input} ${err[k] ? s.bad : ""}`;
  const msg = (k: keyof Errors, t: string) => err[k] && <span id={`${id}-${k}`} className={s.err}>{t}</span>;

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <label className={s.field}>Имя *
        <input name="name" autoComplete="name" className={cls("name")} {...inv("name")} />
        {msg("name", "Укажите имя")}
      </label>
      <label className={s.field}>Телефон или Telegram *
        <input name="contact" inputMode="text" placeholder="+7 900 000-00-00 или @username" className={cls("contact")} {...inv("contact")} />
        {msg("contact", "Телефон из 10+ цифр или @username")}
      </label>
      <label className={s.field}>Компания
        <input name="company" autoComplete="organization" className={s.input} />
      </label>
      <label className={s.field}>Отрасль *
        <select name="industry" defaultValue="" className={cls("industry")} {...inv("industry")}>
          <option value="">Выберите</option>
          {[...INDUSTRIES, "Другое"].map((o) => <option key={o}>{o}</option>)}
        </select>
        {msg("industry", "Выберите отрасль")}
      </label>
      <label className={`${s.field} ${s.full}`}>Выручка за год *
        <select name="revenue" defaultValue="" className={cls("revenue")} {...inv("revenue")}>
          <option value="">Выберите</option>
          {REVENUES.map((o) => <option key={o}>{o}</option>)}
        </select>
        {msg("revenue", "Выберите диапазон выручки")}
      </label>
      <div className={`${s.full}`} style={{ display: "flex", flexDirection: "column", gap: 10 }} role="group" aria-labelledby={`${id}-tasks`}>
        <span id={`${id}-tasks`} className={s.field}>Задача</span>
        <div className={s.chips}>
          {LEAD_TASKS.map((t) => (
            <button key={t} type="button" className={s.chip} aria-pressed={tasks.includes(t)} onClick={() => toggle(t)}>{t}</button>
          ))}
        </div>
      </div>
      <label className={`${s.field} ${s.full}`}>Комментарий
        <textarea name="comment" rows={4} className={s.input} />
      </label>
      <div className={s.full} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label className={s.consent}>
          <input type="checkbox" name="consent" {...inv("consent")} />
          <span>Согласен на обработку персональных данных в соответствии с <Link href="/privacy/">политикой</Link></span>
        </label>
        {err.consent && <span id={`${id}-consent`} className={s.err} style={{ paddingLeft: 32 }}>Без согласия мы не можем принять заявку</span>}
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={s.hp} />
      {status === "error" && (
        <p className={s.net} role="alert">Не получилось отправить. Напишите в Telegram <a href={TELEGRAM}>{TELEGRAM_HANDLE}</a></p>
      )}
      <button type="submit" className={`btn btn-gold ${s.submit}`} disabled={status === "submitting"}>
        {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}
