import Link from "next/link";
import { notFound } from "next/navigation";
import LeadButton from "@/components/LeadButton";
import Note from "@/components/Note";
import { CAREER_CASES } from "@/data/home";
import { CASE_DETAILS, type CaseSlug } from "@/data/cases";
import { Crumbs, meta } from "@/lib/seo";
import s from "../../inner.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(CASE_DETAILS).map((slug) => ({ slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = CASE_DETAILS[slug as CaseSlug];
  return meta({ title: `${c.title.replace(" ", " ")} · Кейсы`, description: c.description, path: `/cases/${slug}/`, type: "article" });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = CASE_DETAILS[slug as CaseSlug];
  if (!c) notFound();
  return (
    <main>
      <section className={`container ${s.top}`}>
        <Crumbs items={[{ t: "Кейсы", href: "/cases/" }, { t: c.crumb }]} />
        <Note box>Шаблон кейса по ТЗ §6.2. Известные факты — выручка 800 млн ₽, выход в прибыль, +20% г/г. Остальное в [скобках] — заполняет Михаил.</Note>
        <span className="eyebrow">{c.meta}</span>
        <h1 className={s.caseH1}>{c.title}</h1>
        <div className="stats" style={{ marginTop: 48 }}>
          {c.stats.map((x) => <div key={x.d} className="stat"><span className="big-num">{x.n}</span><span>{x.d}</span></div>)}
        </div>
      </section>

      <section className={`container ${s.body}`}>
        <div className={s.part} data-reveal>
          <h2>Ситуация «до»</h2>
          <div className={s.prose}>{c.before.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
        <div className={s.part} data-reveal>
          <h2>Диагностика по «7П+1»</h2>
          <div className="rule">{c.diagnostics.map((d) => <div key={d.k} className={s.diag}><b>{d.k}</b><span>{d.v}</span></div>)}</div>
        </div>
        <div className={s.part} data-reveal>
          <h2>Что сделали</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {c.steps.map((x, i) => (
              <li key={x.t} className={s.cstep}><b>{i + 1}</b><div><strong>{x.t}</strong><span>{x.d}</span></div></li>
            ))}
          </ol>
        </div>
        <div className={s.part} data-reveal>
          <h2>Результат</h2>
          <div className={s.scroll}>
            <table className={s.table}>
              <thead><tr><th>Показатель</th><th>Было</th><th>Стало</th></tr></thead>
              <tbody>
                {c.results.map((r) => (
                  <tr key={r.k}>
                    <td>{r.k}</td>
                    <td>{r.was} {r.wasNote && <span className={s.gray}>{r.wasNote}</span>}</td>
                    <td>{r.now && <span className={s.big}>{r.now}</span>} {r.nowNote && <span className={s.gray}>{r.nowNote}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <figure className={s.quote} data-reveal>
          <div className={s.avatar} />
          <div><blockquote>{c.quote}</blockquote><figcaption>{c.quoteBy}</figcaption></div>
        </figure>
      </section>

      <section className="band-navy">
        <div className={`container ${s.cta}`}>
          <div className={s.ctaHead}>
            <h2 className="h2-form">Похожая ситуация? Обсудим</h2>
            <LeadButton>Обсудить задачу</LeadButton>
          </div>
          <div>
            <span className={s.similarLabel}>Похожие кейсы</span>
            <div className={s.similar}>
              {CAREER_CASES.map((x) => (
                <Link key={x.co} href="/cases/"><span>Из карьеры · {x.co}</span><b>{x.num}</b><span>{x.d}</span></Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
