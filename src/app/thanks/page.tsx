import Link from "next/link";
import { TELEGRAM_CHANNEL as TELEGRAM } from "@/lib/config";
import { meta } from "@/lib/seo";
import s from "../inner.module.css";
import Title from "./Title";

export const metadata = meta({ title: "Спасибо", description: "Заявка отправлена. Михаил ответит лично в течение 1 рабочего дня.", path: "/thanks/", noindex: true });

const NEXT = [
  { t: "Отвечу лично", d: "Уточню пару вопросов о компании и задаче." },
  { t: "Созвонимся", d: "Обсудим ситуацию и цифры. Если нужно — подпишем NDA." },
  { t: "Предложу формат", d: "Чаще всего начинаем с экспресс-диагностики." },
];

export default function Thanks() {
  return (
    <main className={`container ${s.split}`}>
      <div>
        <Title className={s.thanksH1} />
        <p className="lead" style={{ maxWidth: 480, fontSize: "clamp(17px, 1.5vw, 19px)" }}>Я прочитаю её сам и отвечу в течение 1 рабочего дня — в Telegram или по телефону, который вы указали.</p>
        <div className={s.btns}>
          <a href={TELEGRAM} className="btn btn-primary" target="_blank" rel="noopener">Подписаться на Telegram-канал</a>
          <Link href="/cases/" className="btn btn-outline">Смотреть кейсы</Link>
        </div>
      </div>
      <div>
        <span className="eyebrow" style={{ display: "block", marginBottom: 8, fontSize: 15 }}>Что будет дальше</span>
        <ol className="rule" style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {NEXT.map((x, i) => <li key={x.t} className={s.next}><b>{i + 1}</b><div><strong>{x.t}</strong><span>{x.d}</span></div></li>)}
        </ol>
      </div>
    </main>
  );
}
