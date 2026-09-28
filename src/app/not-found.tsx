import Link from "next/link";
import type { Metadata } from "next";
import s from "./inner.module.css";

export const metadata: Metadata = { title: "Страница не найдена", robots: { index: false } };

export default function NotFound() {
  return (
    <main className={`container ${s.nf}`}>
      <span aria-hidden="true">404</span>
      <div>
        <h1>Такой страницы нет</h1>
        <p className="lead" style={{ maxWidth: 440 }}>Возможно, ссылка устарела. Начните с главной или посмотрите кейсы — там цифры по реальным проектам.</p>
        <div className={s.btns}>
          <Link href="/" className="btn btn-primary">На главную</Link>
          <Link href="/cases/" className="btn btn-outline">Смотреть кейсы</Link>
        </div>
      </div>
    </main>
  );
}
