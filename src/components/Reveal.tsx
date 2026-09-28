"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Появление блоков при скролле (opacity/translateY, 400 мс, один раз) и счётчики цифр
 * [data-count] (~1,2 с). Уважает prefers-reduced-motion. ТЗ §9.
 */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")];
    const counters = [...document.querySelectorAll<HTMLElement>("[data-count]")];
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        count(en.target as HTMLElement);
      });
    });
    counters.forEach((c) => cio.observe(c));
    return () => { io.disconnect(); cio.disconnect(); };
  }, [path]);
  return null;
}

function count(el: HTMLElement) {
  const text = el.dataset.count || el.textContent || "";
  const m = text.match(/\d+/);
  if (!m) return;
  const target = Number(m[0]);
  const [pre, post] = [text.slice(0, m.index), text.slice((m.index || 0) + m[0].length)];
  const t0 = performance.now(), dur = 1200;
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = pre + v + post;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
