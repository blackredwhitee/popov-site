import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./config";

export const abs = (p: string) => `${SITE_URL}${p}`;

/** Метаданные страницы: title, description, canonical, OG. */
export function meta(o: { title: string; description: string; path: string; noindex?: boolean; type?: "website" | "article" }): Metadata {
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: abs(o.path) },
    robots: o.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title: o.title, description: o.description, url: abs(o.path), siteName: SITE_NAME, locale: "ru_RU", type: o.type ?? "website", images: [{ url: abs("/og.jpg"), width: 1200, height: 630 }] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Хлебные крошки + разметка BreadcrumbList. Последний пункт — текущая страница. */
export function Crumbs({ items }: { items: { t: string; href?: string }[] }) {
  const all = [{ t: "Главная", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Навигационная цепочка" className="crumbs">
        {all.map((c, i) => (
          <span key={i} style={{ display: "contents" }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href && i < all.length - 1 ? <Link href={c.href}>{c.t}</Link> : <span aria-current="page">{c.t}</span>}
          </span>
        ))}
      </nav>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.t, ...(c.href ? { item: abs(c.href) } : {}) })),
      }} />
    </>
  );
}
