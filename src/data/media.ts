import raw from "./publications.json";

/** Коллекция «Публикации» (Дополнение №1 к ТЗ, п. 3.3). Источник — Публикации_для_сайта.xlsx + Приложение А. */
export type Publication = {
  date: string; pub: string; tier: "ТОП СМИ" | "Tier 1" | "Tier 2"; title: string; url: string;
  type: string; home: boolean;
  /** Дата известна только до года (ручные записи из Приложения А). */
  approx?: boolean;
};

export const PUBLICATIONS = raw as Publication[];

/** Счётчики считаются из коллекции, а не вписываются руками. */
const total = PUBLICATIONS.length;
export const MEDIA_STATS = {
  total: `${Math.floor(total / 50) * 50}+`,
  outlets: new Set(PUBLICATIONS.map((p) => p.pub)).size,
  top: PUBLICATIONS.filter((p) => p.tier === "ТОП СМИ").length,
};

/** Карусель: порядок и короткие подписи — п. 3.2 дополнения. Ключ — фрагмент ссылки. */
const FEATURED_ORDER: { key: string; pub: string; title: string; type: string }[] = [
  { key: "news.microsoft.com", pub: "Microsoft", title: "Настоящий предприниматель грустит по наступлении пятницы", type: "Интервью" },
  { key: "pro.rbc.ru", pub: "РБК Pro", title: "Бот подаст: как финансист наладил банковские платежи через мессенджеры", type: "Материал о Михаиле" },
  { key: "forbes.ru", pub: "Forbes", title: "Серпом по рынку. Почему закон о краудинвестинге больше вредит инвесторам", type: "Колонка" },
  { key: "sravni.ru/text/lichnyj-opyt", pub: "Сравни.ру", title: "Личный опыт: как вести бизнес с родственниками и не испортить отношения", type: "Личная история" },
  { key: "frankrg.com/34513", pub: "Frank RG", title: "Основатель TalkBank назвал причины закрытия Рокетбанка", type: "Интервью" },
  { key: "ecm-journal.ru", pub: "ECM-Journal", title: "Сегодня нельзя быть частично диджитал", type: "Интервью" },
  { key: "smebanking.news", pub: "SME Banking Club", title: "В call-центре TalkBank 87% запросов обрабатываются роботом", type: "Интервью" },
  { key: "bankiros.ru/news/izmenitsa", pub: "Bankiros", title: "Изменится ли экономическая ситуация в ближайшие полгода?", type: "Мнение" },
  { key: "vedomosti.ru/finance/articles/2021/04/12", pub: "«Ведомости»", title: "В России появился банк, стать клиентом которого можно только по приглашению", type: "Комментарий" },
  { key: "611217c59a794776346ad2de", pub: "РБК Тренды", title: "Идея для продвинутых: как заработать на чат-боте", type: "Комментарий" },
  { key: "62cea47d9a79478b106e8cd6", pub: "РБК Тренды", title: "В России три пути: что ждет отечественные стартапы", type: "Комментарий" },
  { key: "bosfera.ru", pub: "«Банковское обозрение»", title: "Гибкость, скорость, масштабирование — это TalkBank", type: "Интервью" },
];

export const FEATURED = FEATURED_ORDER.flatMap((f) => {
  const p = PUBLICATIONS.find((x) => x.home && x.url.includes(f.key));
  return p ? [{ ...p, pub: f.pub, title: f.title, type: f.type }] : [];
});

/** Дата публикации; пустая — дата неизвестна (ссылка из пресс-кита, страница недоступна). */
export const fmtDate = (p: Publication) =>
  !p.date ? "—" : p.approx ? p.date.slice(0, 4) : p.date.split("-").reverse().join(".");
