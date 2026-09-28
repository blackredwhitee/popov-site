"use client";
import { useState } from "react";
import { FAQ, METHOD, METHOD_CENTER } from "@/data/home";
import s from "../home.module.css";

/** Позиции узлов: радиус 40%, старт сверху, шаг 360/7°. */
const POS = [["50%", "10%"], ["81.3%", "25.1%"], ["89%", "58.9%"], ["67.4%", "86%"], ["32.6%", "86%"], ["11%", "58.9%"], ["18.7%", "25.1%"]];

export function MethodScheme({ note }: { note?: React.ReactNode }) {
  const [node, setNode] = useState(0);
  const act = node === 7 ? METHOD_CENTER : METHOD[node];
  // hover выбирает элемент только на устройствах с мышью
  const hover = (i: number) => () => { if (matchMedia("(hover: hover)").matches) setNode(i); };
  return (
    <>
      <div className={s.methodText}>
        <h2 className="h2">Методология «7П+1»</h2>
        <p className="lead">Проверяю бизнес по семи направлениям и цифровым инструментам управления. Так потери находятся системно, а не по интуиции.</p>
        <div className={s.methodPanel} aria-live="polite">
          <b>{act.t}</b>
          <span>{act.d}</span>
        </div>
        {note}
      </div>
      <div className={s.scheme} role="group" aria-label="Схема «7П+1»">
        <div className={s.circle} />
        {METHOD.map((m, i) => (
          <button key={m.t} type="button" className={s.node} style={{ left: POS[i][0], top: POS[i][1] }}
            aria-pressed={node === i} onClick={() => setNode(i)} onMouseEnter={hover(i)}>{m.t}</button>
        ))}
        <button type="button" className={s.center} aria-pressed={node === 7} onClick={() => setNode(7)} onMouseEnter={hover(7)} aria-label="+1 — цифровые инструменты">
          <b>+1</b><span>цифровые инструменты</span>
        </button>
      </div>
    </>
  );
}

export function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <div className="rule">
      {FAQ.map((f, i) => (
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
