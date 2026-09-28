/** Логотипы (монохром через CSS-маску). r — соотношение сторон файла. Источники — Wikimedia Commons и сайты компаний. */
/** s — поправка на оптический вес (жирные знаки меньше, тонкие больше). */
export type Logo = { file: string; name: string; r: number; s?: number; url?: string };

export const COMPANY_LOGOS: Logo[] = [
  { file: "magnit.svg", name: "«Магнит»", r: 5.32, s: 0.9, url: "https://magnit.ru" },
  { file: "pik.svg", name: "ГК ПИК", r: 3.25, s: 0.72, url: "https://www.pik.ru" },
  { file: "bork.png", name: "BORK", r: 5.03, s: 0.8, url: "https://www.bork.ru" },
  { file: "facilicom.png", name: "Facilicom", r: 3.37, s: 1.15, url: "https://www.facilicom.ru" },
  { file: "vredestein.png", name: "Amtel Vredestein", r: 10.04, s: 1.15, url: "https://www.vredestein.com" },
  { file: "talkbank.svg", name: "Talkbank", r: 4.06, url: "https://talkbank.io" },
];

export const OUTLET_LOGOS: Logo[] = [
  { file: "rbc.svg", name: "РБК", r: 1.72, s: 0.75, url: "https://www.rbc.ru" },
  { file: "vedomosti.svg", name: "«Ведомости»", r: 5.28, url: "https://www.vedomosti.ru" },
  { file: "kommersant.svg", name: "«Коммерсантъ»", r: 7.62, url: "https://www.kommersant.ru" },
  { file: "rg.svg", name: "«Российская газета»", r: 12.27, s: 1.2, url: "https://rg.ru" },
  { file: "forbes.svg", name: "Forbes", r: 3.99, url: "https://www.forbes.ru/profile/361969" },
  { file: "izvestia.svg", name: "«Известия»", r: 3.42, url: "https://iz.ru" },
  { file: "expert.svg", name: "«Эксперт»", r: 3.6, url: "https://expert.ru" },
  { file: "aif.svg", name: "«Аргументы и факты»", r: 4.42, url: "https://aif.ru" },
  { file: "techcrunch.svg", name: "TechCrunch", r: 2.0, s: 0.7, url: "https://techcrunch.com" },
  { file: "microsoft.svg", name: "Microsoft", r: 4.69, url: "https://news.microsoft.com/ru-ru/" },
];

export const PRESS_LOGOS: Logo[] = [
  { file: "forbes.svg", name: "Forbes", r: 3.99, url: "https://www.forbes.ru/profile/361969" },
  { file: "rbru.svg", name: "RB.ru", r: 4.28, url: "https://rb.ru" },
  { file: "vedomosti.svg", name: "«Ведомости»", r: 5.28, url: "https://www.vedomosti.ru" },
];
