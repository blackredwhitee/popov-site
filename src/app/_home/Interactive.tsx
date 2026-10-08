"use client";
import { useEffect, useRef, useState } from "react";
import { METHOD, METHOD_CENTER } from "@/data/home";
import s from "../home.module.css";

/** Позиции узлов: радиус 40%, старт сверху, шаг 360/7°. */
const POS = [["50%", "10%"], ["81.3%", "25.1%"], ["89%", "58.9%"], ["67.4%", "86%"], ["32.6%", "86%"], ["11%", "58.9%"], ["18.7%", "25.1%"]];

export function MethodScheme({ note }: { note?: React.ReactNode }) {
  const [node, setNode] = useState(0);
  const [auto, setAuto] = useState(true);
  const [angle, setAngle] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const act = node === 7 ? METHOD_CENTER : METHOD[node];

  // Точка на орбите едет к активному элементу кратчайшим путём
  const cur = useRef(0);
  const ring = useRef(0); // последний выбранный элемент на круге — там сейчас точка
  const go = (i: number) => {
    cur.current = i;
    if (i !== 7) {
      let step = (((i - ring.current) % 7) + 7) % 7;
      ring.current = i;
      if (step > 3.5) step -= 7;
      setAngle((a) => a + (step * 360) / 7);
    }
    setNode(i);
  };
  const pick = (i: number) => { setAuto(false); go(i); };
  // hover выбирает элемент только на устройствах с мышью
  const hover = (i: number) => () => { if (matchMedia("(hover: hover)").matches) pick(i); };

  // Автопоказ: элементы переключаются сами, пока схема на экране и её не трогали
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches || !box.current) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => go(cur.current >= 6 ? 0 : cur.current + 1), 3200);
    }, { threshold: 0.5 });
    io.observe(box.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [auto]);

  return (
    <>
      <div className={s.methodText}>
        <h2 className="h2">Методология «7П+1»</h2>
        <p className="lead">Проверяю бизнес по семи направлениям и личной эффективности собственника. Так потери находятся системно, а не по интуиции.</p>
        <div className={s.methodPanel} aria-live="polite">
          <div key={node} className={s.panelIn}>
            <b>{act.t}</b>
            <span>{act.d}</span>
          </div>
        </div>
        {note}
      </div>
      <div ref={box} className={s.scheme} role="group" aria-label="Схема «7П+1»" onPointerDown={() => setAuto(false)}>
        <svg className={s.orbit} viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="40" pathLength={1} />
        </svg>
        <div className={s.marker} style={{ transform: `rotate(${angle}deg)`, opacity: node === 7 ? 0 : 1 }} aria-hidden="true"><span /></div>
        {METHOD.map((m, i) => (
          <button key={m.t} type="button" className={s.node} style={{ left: POS[i][0], top: POS[i][1], ["--i" as string]: i }}
            aria-pressed={node === i} onClick={() => pick(i)} onMouseEnter={hover(i)}>{m.t}</button>
        ))}
        <button type="button" className={s.center} aria-pressed={node === 7} onClick={() => pick(7)} onMouseEnter={hover(7)} aria-label="+1 — личная эффективность">
          <b>+1</b><span>личная эффективность</span>
        </button>
      </div>
    </>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="rule">
      {items.map((f, i) => (
        <div key={f.q} className={s.faqItem}>
          <h3>
            <button type="button" className={s.faqBtn} aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span><span aria-hidden="true">{open === i ? "−" : "+"}</span>
            </button>
          </h3>
          <p id={`faq-${i}`} className={s.faqA} hidden={open !== i}>{f.a}</p>
        </div>
      ))}
    </div>
  );
}
