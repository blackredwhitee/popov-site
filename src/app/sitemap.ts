import type { MetadataRoute } from "next";
import { POSTS } from "@/data/blog";
import { CASE_DETAILS } from "@/data/cases";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/cases/", "/blog/", "/media/", "/privacy/",
    ...Object.keys(CASE_DETAILS).map((s) => `/cases/${s}/`),
    ...POSTS.filter((p) => !p.href).map((p) => `/blog/${p.slug}/`)];
  return paths.map((p) => ({ url: abs(p) }));
}
