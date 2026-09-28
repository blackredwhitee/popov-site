import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

// TODO: до переезда на финальный домен закрыть от индексации целиком (disallow: "/").
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/thanks/"] }, sitemap: abs("/sitemap.xml") };
}
