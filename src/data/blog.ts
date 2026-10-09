/** Статьи блога. Темы — ТЗ §7.4; даты и время чтения условные. В продакшне — из CMS. */
export type Block =
  | { h2: string }
  | { p: string }
  | { quote: string }
  | { table: { head: string[]; rows: string[][] } };

export type Post = {
  slug: string; t: string; rub: string; date: string; iso?: string; time: string; lead: string;
  /** Внешняя страница вместо статьи (например, разбор кейса). */
  href?: string;
  body?: Block[];
};

/** Статьи блога. Пока пусто — материалы готовит Михаил. */
export const POSTS: Post[] = [];

export const postHref = (p: Post) => p.href ?? `/blog/${p.slug}/`;
