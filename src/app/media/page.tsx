import Note from "@/components/Note";
import { MEDIA_STATS } from "@/data/media";
import { Crumbs, meta } from "@/lib/seo";
import s from "../inner.module.css";
import MediaList from "./MediaList";

export const metadata = meta({
  title: "Публикации в СМИ",
  description: `${MEDIA_STATS.total} публикаций Михаила Попова в ${MEDIA_STATS.outlets} изданиях: РБК, «Ведомости», «Коммерсантъ», Forbes, «Российская газета» и другие.`,
  path: "/media/",
});

export default function MediaPage() {
  return (
    <main>
      <section className={`container ${s.top}`}>
        <Crumbs items={[{ t: "Публикации" }]} />
        <div className={s.headRow}>
          <h1 className="h1">Публикации в СМИ</h1>
          <p className="lead">Интервью, колонки и комментарии 2016–2022 годов — {MEDIA_STATS.total} материалов в {MEDIA_STATS.outlets} изданиях, {MEDIA_STATS.top} из них — в ТОП СМИ.</p>
        </div>
        <Note style={{ marginTop: 20 }}>Ссылки ещё не проверены (статус «Проверить»): нерабочие — заменить скриншотом или скрыть. Четыре материала из Приложения А добавлены вручную, ссылки и точные даты уточнить.</Note>
      </section>
      <MediaList />
    </main>
  );
}
