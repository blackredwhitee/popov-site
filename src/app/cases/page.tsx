import LeadForm from "@/components/LeadForm";
import Note from "@/components/Note";
import { Crumbs, meta } from "@/lib/seo";
import s from "../inner.module.css";
import CasesList from "./CasesList";

export const metadata = meta({
  title: "Кейсы",
  description: "Проекты акселератора и результаты из карьеры Михаила Попова: выход из убытков, рост прибыли, цифровизация. Цифры с базой и периодом.",
  path: "/cases/",
});

export default function CasesPage() {
  return (
    <main>
      <section className={`container ${s.top}`}>
        <Crumbs items={[{ t: "Кейсы" }]} />
        <div className={s.headRow}>
          <h1 className="h1">Кейсы</h1>
          <p className="lead">Проекты акселератора и результаты из прошлой карьеры. Цифры — с базой и периодом, названия компаний — только с согласия владельцев.</p>
        </div>
      </section>
      <CasesList note={<Note style={{ marginTop: 24 }}>К запуску: ещё 2+ кейса акселератора после согласия клиентов (ТЗ §6.2). Цифры по «Трансазии» уточняются. Кейсы TalkBank: нужны цифры «до/после» и период — без них перенести в блог как истории (Дополнение №1, п. 5).</Note>} />
      <section className="band-navy">
        <div className={`container sec ${s.formSec}`}>
          <div>
            <h2 className="h2-form">Похожая ситуация? Расскажите о задаче</h2>
            <p>Отвечу лично в течение 1 рабочего дня.</p>
          </div>
          <div><LeadForm source="cases" /></div>
        </div>
      </section>
    </main>
  );
}
