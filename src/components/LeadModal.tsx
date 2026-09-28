"use client";
import { useEffect, useRef, useState } from "react";
import { TELEGRAM, TELEGRAM_HANDLE } from "@/lib/config";
import { CloseIcon } from "./icons";
import LeadForm from "./LeadForm";
import s from "./LeadModal.module.css";

const FOCUSABLE = "a[href],button:not([disabled]),input:not([tabindex='-1']),select,textarea,[tabindex]:not([tabindex='-1'])";

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => { returnTo.current = document.activeElement as HTMLElement; setOpen(true); };
    const onSent = () => setOpen(false);
    window.addEventListener("open-lead", onOpen);
    window.addEventListener("lead-sent", onSent);
    return () => { window.removeEventListener("open-lead", onOpen); window.removeEventListener("lead-sent", onSent); };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("input[name='name']")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panel.current) return;
      const els = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      returnTo.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className={s.overlay} onClick={() => setOpen(false)}>
      <div ref={panel} className={s.panel} role="dialog" aria-modal="true" aria-labelledby="lead-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className={s.close} aria-label="Закрыть" onClick={() => setOpen(false)}><CloseIcon /></button>
        <div className={s.head}>
          <h2 id="lead-title" className={s.title}>Расскажите о задаче</h2>
          <p className={s.sub}>Отвечу лично в течение 1 рабочего дня. Или напишите в Telegram: <a href={TELEGRAM}>{TELEGRAM_HANDLE}</a></p>
        </div>
        <LeadForm source="modal" />
      </div>
    </div>
  );
}
