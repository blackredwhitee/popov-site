"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RUBRICS } from "@/data/common";
import { POSTS, postHref } from "@/data/blog";
import { TELEGRAM_CHANNEL } from "@/lib/config";
import s from "../inner.module.css";

const ALL = "Все";

/** Рубрики блога, синхронизированы с ?rubric=. */
export default function BlogList({ note }: { note?: React.ReactNode }) {
  const [rub, setRub] = useState(ALL);
  useEffect(() => {
    const r = new URLSearchParams(location.search).get("rubric");
    if (r && RUBRICS.includes(r)) setRub(r);
  }, []);
  function pick(r: string) {
    setRub(r);
    const q = new URLSearchParams(location.search);
    r === ALL ? q.delete("rubric") : q.set("rubric", r);
    const qs = q.toString();
    history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : ""));
  }
  const list = POSTS.filter((p) => rub === ALL || p.rub === rub);
  const [first, ...rest] = list;

  if (!POSTS.length) {
    return (
      <section className={`container ${s.list}`}>
        <div className={s.empty}>
          <b>Статьи скоро появятся</b>
          <span>Пока новые разборы и заметки Михаил публикует в Telegram-канале.</span>
          <a href={TELEGRAM_CHANNEL} className="link link-sm" target="_blank" rel="noopener">Читать канал</a>
        </div>
        {note}
      </section>
    );
  }
  return (
    <>
      <div className="container">
        <div className={s.rubrics} role="group" aria-label="Рубрики">
          {[ALL, ...RUBRICS].map((t) => <button key={t} type="button" className="chip" aria-pressed={rub === t} onClick={() => pick(t)}>{t}</button>)}
        </div>
      </div>
      <section className={`container ${s.list}`}>
        {first && (
          <Link href={postHref(first)} className={s.featured}>
            <div className="ph">Обложка</div>
            <div>
              <span className={s.postMeta}>{first.rub} · {first.date} · {first.time}</span>
              <span className={s.t}>{first.t}</span>
              {first.lead && <span className={s.l}>{first.lead}</span>}
              <span className="link link-sm">Читать</span>
            </div>
          </Link>
        )}
        {rest.length > 0 && (
          <div className={s.posts}>
            {rest.map((a) => (
              <Link key={a.slug} href={postHref(a)} className={s.post}>
                <div className={s.img} />
                <span className={s.postMeta}>{a.rub} · {a.time}</span>
                <span className={s.t}>{a.t}</span>
                <span className={s.d}>{a.date}</span>
              </Link>
            ))}
          </div>
        )}
        {!list.length && <p className="lead">В этой рубрике пока нет материалов.</p>}
        {note}
      </section>
    </>
  );
}
