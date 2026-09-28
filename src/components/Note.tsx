import { SHOW_NOTES } from "@/lib/config";

/** Пометка-черновик для заказчика. В продакшн-сборке скрыта (NEXT_PUBLIC_HIDE_NOTES=1). */
export default function Note({ children, box, style }: { children: React.ReactNode; box?: boolean; style?: React.CSSProperties }) {
  if (!SHOW_NOTES) return null;
  return <p className={box ? "notebox" : "note"} style={style}>{children}</p>;
}
