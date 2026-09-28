"use client";
import { useEffect, useState } from "react";

/** Временный переключатель палитр для выбора с заказчиком. Выбор сохраняется и читается из ?palette=. */
const OPTIONS = [
  { id: "", t: "Исходная", c: ["#13243B", "#C8A15A", "#F5F3EE"] },
  { id: "warm", t: "Тёплая", c: ["#13243B", "#C9532F", "#F6F0E6"] },
  { id: "green", t: "Зелёная", c: ["#173A2F", "#E0A548", "#F3EFE4"] },
  { id: "contrast", t: "Контраст", c: ["#111418", "#FF5A1F", "#F4F4F1"] },
];
const KEY = "popov_palette";

export default function PaletteSwitcher() {
  const [cur, setCur] = useState("");
  useEffect(() => { setCur(document.documentElement.dataset.palette || ""); }, []);
  const pick = (id: string) => {
    setCur(id);
    if (id) document.documentElement.dataset.palette = id; else delete document.documentElement.dataset.palette;
    try { localStorage.setItem(KEY, id); } catch {}
  };
  return (
    <div className="palette-switch" role="group" aria-label="Палитра">
      <span>Палитра</span>
      {OPTIONS.map((o) => (
        <button key={o.id} type="button" aria-pressed={cur === o.id} onClick={() => pick(o.id)}>
          <i style={{ background: `linear-gradient(90deg, ${o.c[0]} 0 50%, ${o.c[1]} 50% 100%)` }} />{o.t}
        </button>
      ))}
    </div>
  );
}
