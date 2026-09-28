"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CASE_INDUSTRIES as INDUSTRIES, CASE_TASKS } from "@/data/common";
import { CASES } from "@/data/cases";
import s from "../inner.module.css";

const ALL = "Все";

/** Фильтры кейсов (AND), синхронизированы с ?industry=&task=. */
export default function CasesList({ note }: { note?: React.ReactNode }) {
  const [ind, setInd] = useState(ALL);
  const [task, setTask] = useState(ALL);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const i = q.get("industry"), t = q.get("task");
    if (i && INDUSTRIES.includes(i)) setInd(i);
    if (t && CASE_TASKS.includes(t)) setTask(t);
  }, []);

  function update(nextInd: string, nextTask: string) {
    setInd(nextInd); setTask(nextTask);
    const q = new URLSearchParams(location.search);
    nextInd === ALL ? q.delete("industry") : q.set("industry", nextInd);
    nextTask === ALL ? q.delete("task") : q.set("task", nextTask);
    const qs = q.toString();
    history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : ""));
  }

  const list = CASES.filter((c) => (ind === ALL || c.ind === ind) && (task === ALL || c.task === task));

  return (
    <>
      <div className="container">
        <div className={s.filters}>
          <div className={s.filterRow} role="group" aria-label="Отрасль">
            <span>Отрасль</span>
            {[ALL, ...INDUSTRIES].map((t) => <button key={t} type="button" className="chip" aria-pressed={ind === t} onClick={() => update(t, task)}>{t}</button>)}
          </div>
          <div className={s.filterRow} role="group" aria-label="Задача">
            <span>Задача</span>
            {[ALL, ...CASE_TASKS].map((t) => <button key={t} type="button" className="chip" aria-pressed={task === t} onClick={() => update(ind, t)}>{t}</button>)}
          </div>
        </div>
      </div>
      <section className="container" style={{ paddingTop: 28, paddingBottom: "var(--sec-y)" }}>
        <p className={s.count} aria-live="polite">{list.length ? `Кейсов: ${list.length}` : ""}</p>
        <div className={s.caseGrid}>
          {list.map((c) => {
            const inner = (
              <>
                <span className={s.meta}>{c.meta}</span>
                <span className={s.title}>{c.title}</span>
                <div className={s.foot}><b>{c.num}</b><span className={s.sub}>{c.numLabel}</span></div>
                <div className={s.tags}>
                  <span>{c.ind} · {c.task}</span>
                  {c.slug && <span className="link link-sm link-gold">Разбор кейса</span>}
                </div>
              </>
            );
            const cls = `${s.caseCard} ${c.accel ? s.dark : ""}`;
            return c.slug
              ? <Link key={c.title} href={`/cases/${c.slug}/`} className={cls}>{inner}</Link>
              : <div key={c.title} className={cls}>{inner}</div>;
          })}
        </div>
        {!list.length && (
          <div className={s.empty}>
            <b>По этому сочетанию кейсов пока нет</b>
            <span>Расскажите о своей задаче — скорее всего, я решал похожую.</span>
            <button type="button" className="link link-sm" onClick={() => update(ALL, ALL)}>Сбросить фильтры</button>
          </div>
        )}
        {note}
      </section>
    </>
  );
}
