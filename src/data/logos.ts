/** Логотипы (монохром через CSS-маску). r — соотношение сторон файла. Источники — Wikimedia Commons и сайты компаний. */
/** s — поправка на оптический вес (жирные знаки меньше, тонкие больше). */
export type Logo = { file: string; name: string; r: number; s?: number };

export const COMPANY_LOGOS: Logo[] = [
  { file: "magnit.svg", name: "«Магнит»", r: 5.32, s: 0.9 },
  { file: "pik.svg", name: "ГК ПИК", r: 3.25, s: 0.72 },
  { file: "bork.png", name: "BORK", r: 5.03, s: 0.8 },
  { file: "facilicom.png", name: "Facilicom", r: 3.37, s: 1.15 },
  { file: "vredestein.png", name: "Amtel Vredestein", r: 10.04, s: 1.15 },
  { file: "talkbank.svg", name: "Talkbank", r: 4.06 },
];

export const OUTLET_LOGOS: Logo[] = [
  { file: "rbc.svg", name: "РБК", r: 1.72, s: 0.75 },
  { file: "vedomosti.svg", name: "«Ведомости»", r: 5.28 },
  { file: "kommersant.svg", name: "«Коммерсантъ»", r: 7.62 },
  { file: "rg.svg", name: "«Российская газета»", r: 12.27, s: 1.2 },
  { file: "forbes.svg", name: "Forbes", r: 3.99 },
  { file: "izvestia.svg", name: "«Известия»", r: 3.42 },
  { file: "expert.svg", name: "«Эксперт»", r: 3.6 },
  { file: "aif.svg", name: "«Аргументы и факты»", r: 4.42 },
  { file: "techcrunch.svg", name: "TechCrunch", r: 2.0, s: 0.7 },
  { file: "microsoft.svg", name: "Microsoft", r: 4.69 },
];

export const PRESS_LOGOS: Logo[] = [
  { file: "forbes.svg", name: "Forbes", r: 3.99 },
  { file: "rbru.svg", name: "RB.ru", r: 4.28 },
  { file: "vedomosti.svg", name: "«Ведомости»", r: 5.28 },
];
