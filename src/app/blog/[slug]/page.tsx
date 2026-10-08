import Link from "next/link";
import { notFound } from "next/navigation";
import LeadButton from "@/components/LeadButton";
import Note from "@/components/Note";
import Pic from "@/components/Pic";
import { POSTS, postHref, type Block } from "@/data/blog";
import { SITE_URL } from "@/lib/config";
import { abs, Crumbs, JsonLd, meta } from "@/lib/seo";
import s from "../../inner.module.css";
import Share from "../Share";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.filter((p) => !p.href).map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };
const find = (slug: string) => POSTS.find((p) => p.slug === slug && !p.href);

export async function generateMetadata({ params }: Props) {
  const p = find((await params).slug)!;
  return meta({ title: `${p.t} · Блог`, description: p.lead.startsWith("[") ? p.t : p.lead, path: `/blog/${p.slug}/`, type: "article" });
}

function Body({ blocks }: { blocks: Block[] }) {
  return blocks.map((b, i) => {
    if ("h2" in b) return <h2 key={i}>{b.h2}</h2>;
    if ("p" in b) return <p key={i}>{b.p}</p>;
    if ("quote" in b) return <blockquote key={i}>{b.quote}</blockquote>;
    return (
      <div key={i} className={s.scroll}>
        <table className={s.table}>
          <thead><tr>{b.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{b.table.rows.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  });
}

export default async function ArticlePage({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();
  const same = POSTS.filter((x) => x !== p && x.rub === p.rub);
  const also = [...same, ...POSTS.filter((x) => x !== p && x.rub !== p.rub)].slice(0, 3);
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", headline: p.t, ...(p.iso ? { datePublished: p.iso } : {}),
        author: { "@type": "Person", name: "Михаил Попов", url: SITE_URL }, mainEntityOfPage: abs(`/blog/${p.slug}/`),
      }} />
      <article>
        <header className={s.artHead}>
          <Crumbs items={[{ t: "Блог", href: "/blog/" }, { t: p.rub }]} />
          <span className={s.postMeta} style={{ fontSize: 15 }}>{p.rub} · {p.date} · {p.time}</span>
          <h1 className={s.artH1}>{p.t}</h1>
          <p className={s.artLead}>{p.lead}</p>
          <Note style={{ marginTop: 20 }}>{p.body ? "Черновой текст для макета — финальную версию пишет Михаил или редактор." : "Текст статьи ещё не готов — страница показывает шаблон."}</Note>
        </header>
        <div className={s.artCover}><div className="ph">Обложка статьи</div></div>
        <div className={s.artBody}>
          {p.body ? <Body blocks={p.body} /> : <p>[Текст статьи]</p>}
        </div>
        <div className={s.artFoot}>
          <Share title={p.t} />
          <div className={s.author}>
            <div className={s.ava}><Pic name="avatar" widths={[192]} sizes="72px" alt="" /></div>
            <div><b>Михаил Попов</b><span>Предприниматель, основатель Talkbank и EasyFinance. 25+ лет в управлении, 6 советов директоров.</span></div>
          </div>
          <div className={s.artCta}>
            <span>Хотите разобрать свой бизнес? Запишитесь на диагностику</span>
            <LeadButton>Записаться</LeadButton>
          </div>
        </div>
      </article>
      <section className={`container ${s.also}`}>
        <h2>Читайте также</h2>
        <div className={s.posts}>
          {also.map((a) => (
            <Link key={a.slug} href={postHref(a)} className={s.post}>
              <div className={s.img} />
              <span className={s.postMeta}>{a.rub} · {a.time}</span>
              <span className={s.t}>{a.t}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
