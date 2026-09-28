"use client";
import { useEffect, useMemo, useState } from "react";
import { fmtDate, PUBLICATIONS } from "@/data/media";
import s from "../inner.module.css";

const ALL = "Все";
const PER_PAGE = 20;
const years = [...new Set(PUBLICATIONS.map((p) => p.date.slice(0, 4)))];
const outlets = [...new Set(PUBLICATIONS.map((p) => p.pub))].sort((a, b) => a.localeCompare(b, "ru"));
const types = [...new Set(PUBLICATIONS.map((p) => p.type))];

/** Архив публикаций: фильтры по году, изданию и типу (синхронизированы с URL), по 20 на странице. */
export default function MediaList() {
  const [f, setF] = useState({ year: ALL, pub: ALL, type: ALL });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setF({
      year: years.includes(q.get("year") || "") ? q.get("year")! : ALL,
      pub: outlets.includes(q.get("pub") || "") ? q.get("pub")! : ALL,
      type: types.includes(q.get("type") || "") ? q.get("type")! : ALL,
    });
    setPage(Math.max(1, Number(q.get("page")) || 1));
  }, []);

  function sync(next: typeof f, nextPage: number) {
    setF(next); setPage(nextPage);
    const q = new URLSearchParams();
    (Object.keys(next) as (keyof typeof f)[]).forEach((k) => next[k] !== ALL && q.set(k, next[k]));
    if (nextPage > 1) q.set("page", String(nextPage));
    const qs = q.toString();
    history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : ""));
  }
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLSelectElement>) => sync({ ...f, [k]: e.target.value }, 1);

  const list = useMemo(() => PUBLICATIONS.filter((p) =>
    (f.year === ALL || p.date.startsWith(f.year)) && (f.pub === ALL || p.pub === f.pub) && (f.type === ALL || p.type === f.type)), [f]);
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  const go = (n: number) => { sync(f, n); document.getElementById("media-list")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section className="container" style={{ paddingBottom: "var(--sec-y)" }}>
      <div className={s.filters} style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        <label className={s.select}>Год
          <select value={f.year} onChange={set("year")}><option>{ALL}</option>{years.map((y) => <option key={y}>{y}</option>)}</select>
        </label>
        <label className={s.select}>Издание
          <select value={f.pub} onChange={set("pub")}><option>{ALL}</option>{outlets.map((y) => <option key={y}>{y}</option>)}</select>
        </label>
        <label className={s.select}>Тип
          <select value={f.type} onChange={set("type")}><option>{ALL}</option>{types.map((y) => <option key={y}>{y}</option>)}</select>
        </label>
      </div>
      <p id="media-list" className={s.count} style={{ marginTop: 28 }} aria-live="polite">Публикаций: {list.length}</p>
      <div className="rule">
        {shown.map((p, i) => {
          const inner = (
            <>
              <span className={s.mDate}>{fmtDate(p)}</span>
              <span className={s.mPub}>{p.pub}</span>
              <span className={s.mTitle}>{p.title}</span>
              <span className={s.mType}>{p.type}</span>
            </>
          );
          return p.url
            ? <a key={p.url + i} href={p.url} target="_blank" rel="nofollow noopener" className={s.mRow}>{inner}</a>
            : <div key={p.title} className={s.mRow}>{inner}</div>;
        })}
      </div>
      {!list.length && (
        <div className={s.empty}>
          <b>По этому сочетанию публикаций нет</b>
          <button type="button" className="link link-sm" onClick={() => sync({ year: ALL, pub: ALL, type: ALL }, 1)}>Сбросить фильтры</button>
        </div>
      )}
      {pages > 1 && (
        <nav className={s.pager} aria-label="Страницы">
          <button type="button" className="chip" disabled={cur === 1} onClick={() => go(cur - 1)} aria-label="Предыдущая страница">←</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" className="chip" aria-pressed={n === cur} aria-current={n === cur ? "page" : undefined} onClick={() => go(n)}>{n}</button>
          ))}
          <button type="button" className="chip" disabled={cur === pages} onClick={() => go(cur + 1)} aria-label="Следующая страница">→</button>
        </nav>
      )}
    </section>
  );
}
