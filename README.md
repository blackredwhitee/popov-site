# Михаил Попов — персональный сайт

Next.js 15 (App Router, static export) + TypeScript + CSS Modules. Вёрстка по дизайн-хэндову и ТЗ (+ Дополнение №1).

- `npm run dev` — локально, `npm run build` — статическая сборка в `out/`.
- Деплой: GitHub Actions → GitHub Pages на каждый push в `main`.

## Настройки
- `src/lib/config.ts` — домен, контакты, ID Метрики, реквизиты, файл резюме.
- `NEXT_PUBLIC_LEAD_ENDPOINT` — куда POST-ить заявки (JSON). Пусто — заявка только валидируется и ведёт на `/thanks`.
- `NEXT_PUBLIC_HIDE_NOTES=1` — скрыть пометки-черновики для заказчика (для продакшна).

## Контент
Весь контент — в `src/data/*` (в продакшне переносится в headless CMS, ТЗ §8.3):
`home.ts` — главная, `cases.ts` — кейсы, `blog.ts` — статьи, `publications.json` + `media.ts` — 263 публикации в СМИ (счётчики считаются автоматически).
