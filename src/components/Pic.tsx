import { asset } from "@/lib/config";

/** <picture> из public/img: {name}-{w}.webp + .jpg. */
export default function Pic({ name, widths, sizes, alt, priority }: { name: string; widths: number[]; sizes: string; alt: string; priority?: boolean }) {
  const set = (ext: string) => widths.map((w) => `${asset(`/img/${name}-${w}.${ext}`)} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img src={asset(`/img/${name}-${widths[0]}.jpg`)} srcSet={set("jpg")} sizes={sizes} alt={alt}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
    </picture>
  );
}
