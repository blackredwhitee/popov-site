import { asset } from "@/lib/config";
import type { Logo } from "@/data/logos";

/**
 * Монохромный логотип: файл как CSS-маска, цвет — currentColor.
 * Высота выравнивается по «оптическому весу»: широкие логотипы ниже, компактные выше.
 */
export default function LogoMark({ logo, h = 30 }: { logo: Logo; h?: number }) {
  const height = Math.round((logo.s ?? 1) * Math.min(h * 1.5, Math.max(h * 0.55, h * Math.sqrt(4 / logo.r))));
  const url = `url("${asset(`/logos/${logo.file}`)}")`;
  const mark = (
    <span role="img" aria-label={logo.name} title={logo.name} style={{
      display: "inline-block", flex: "none", height, width: Math.round(height * logo.r), backgroundColor: "currentColor",
      WebkitMask: `${url} center / contain no-repeat`, mask: `${url} center / contain no-repeat`,
    }} />
  );
  if (!logo.url) return mark;
  return <a href={logo.url} target="_blank" rel="noopener" className="logo-link" aria-label={logo.name}>{mark}</a>;
}
