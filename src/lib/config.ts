/** Глобальные настройки сайта. Значения с TODO подтверждает заказчик. */
export const SITE_URL = "https://blackredwhitee.github.io/popov-site"; // TODO: финальный домен (ТЗ §10)
export const SITE_NAME = "Михаил Попов";
export const TELEGRAM = "https://t.me/popovmb";
export const TELEGRAM_HANDLE = "@popovmb";
export const FORBES = "https://www.forbes.ru/profile/361969";
export const EMAIL = ""; // TODO: e-mail для связи
/** Резюме для скачивания (public/). Пусто — PDF ещё не утверждён (в черновике заглушки). */
export const RESUME_PDF = "";
export const REQUISITES = "[ИП / ООО, ИНН, ОГРН]"; // TODO

/** Яндекс Метрика. Пустой ID — счётчик не подключается. TODO: ID счётчика. */
export const METRIKA_ID = "";

/**
 * Куда отправлять заявку (POST JSON). Пусто — бэкенда нет, заявка только
 * проходит валидацию и ведёт на /thanks (статичный хостинг).
 */
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "";

/** Пометки-черновики на страницах. В продакшне выключить: NEXT_PUBLIC_HIDE_NOTES=1. */
export const SHOW_NOTES = process.env.NEXT_PUBLIC_HIDE_NOTES !== "1";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Путь к файлу из public/ с учётом basePath (для <img>, CSS url, скачивания). */
export const asset = (p: string) => `${BASE_PATH}${p}`;
