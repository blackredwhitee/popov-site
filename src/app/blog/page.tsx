import Note from "@/components/Note";
import { TgIcon } from "@/components/icons";
import { TELEGRAM } from "@/lib/config";
import { Crumbs, meta } from "@/lib/seo";
import s from "../inner.module.css";
import BlogList from "./BlogList";

export const metadata = meta({
  title: "Блог",
  description: "Где бизнес теряет деньги и как их вернуть. Статьи, выступления и интервью Михаила Попова.",
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <main>
      <section className={`container ${s.top}`}>
        <Crumbs items={[{ t: "Блог" }]} />
        <div className={s.headRow}>
          <h1 className="h1">Блог</h1>
          <div className={s.blogHeadRight}>
            <p className="lead">Где бизнес теряет деньги и как их вернуть. Статьи, выступления и интервью.</p>
            <a href={TELEGRAM} className="btn btn-outline" target="_blank" rel="noopener"><TgIcon color="#13243B" size={18} />Telegram-канал</a>
          </div>
        </div>
      </section>
      <BlogList note={<Note>Стартовые статьи — по Дополнению №1 (п. 6), тексты — черновики из «Банка контента», утверждает Михаил. Даты и время чтения условные. Подкаст UP business — реальный материал из Приложения А.</Note>} />
      <section className="band-navy">
        <div className={`container ${s.subscribe}`}>
          <div>
            <h2>Новые разборы — в Telegram-канале</h2>
            <p>Кейсы, статьи и записи выступлений — 2–4 материала в месяц.</p>
          </div>
          <a href={TELEGRAM} className="btn btn-gold" target="_blank" rel="noopener">Подписаться</a>
        </div>
      </section>
    </main>
  );
}
