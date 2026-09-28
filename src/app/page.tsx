import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Note from "@/components/Note";
import Pic from "@/components/Pic";
import { TgIcon } from "@/components/icons";
import {
  ABOUT, AWARDS, CAREER_CASES, COMPANIES, FAQ, FIT, GALLERY, HEADLINES, HERO_STATS, NOT_FIT, PAINS, QUOTES, SERVICES, STEPS, TIMELINE,
} from "@/data/home";
import { FEATURED, fmtDate, MEDIA_STATS, OUTLETS } from "@/data/media";
import { asset, FORBES, RESUME_PDF, SITE_URL, TELEGRAM, TELEGRAM_HANDLE } from "@/lib/config";
import { JsonLd, meta } from "@/lib/seo";
import { Faq, MethodScheme } from "./_home/Interactive";
import s from "./home.module.css";

export const metadata = meta({
  title: "Михаил Попов — внешний директор по развитию",
  description: "Нахожу, где бизнес теряет деньги, и остаюсь, пока это не превратится в прибыль. 25+ лет в управлении: «Магнит», ГК ПИК, BORK. Фикс + процент от результата.",
  path: "/",
});

function Quote({ children }: { children: string }) {
  return (
    <figure className={`container ${s.quote}`} data-reveal>
      <blockquote>«{children}»</blockquote>
      <figcaption>Михаил Попов</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Person", name: "Михаил Попов", jobTitle: "Внешний директор по развитию",
        url: SITE_URL, image: SITE_URL + "/img/portrait-840.jpg", sameAs: [TELEGRAM, FORBES],
        worksFor: { "@type": "Organization", name: "Михаил Попов — внешний директор по развитию", url: SITE_URL },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQ.filter((f) => !f.a.startsWith("[")).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />

      {/* 01 Первый экран */}
      <section id="top" className={`container ${s.hero}`}>
        <div className={s.heroRow}>
          <div className={s.heroText}>
            <span className="eyebrow">Внешний директор по развитию</span>
            <h1 className={s.h1}>{HEADLINES[0]}</h1>
            <div className={s.heroSub}>
              <p>Захожу в компанию, перестраиваю процессы и довожу до роста прибыли. Работаю за фикс и процент от результата.</p>
              <div className={s.heroCtas}>
                <a href="#form" className="btn btn-primary">Обсудить задачу</a>
                <a href="#cases" className="link">Смотреть кейсы</a>
              </div>
            </div>
          </div>
          <div className={s.portrait}>
            <Pic name="portrait" widths={[420, 840]} sizes="(max-width: 480px) 90vw, 420px" alt="Михаил Попов" priority />
          </div>
        </div>
        <div className={`stats ${s.heroStats}`}>
          {HERO_STATS.map((x) => (
            <div key={x.n} className="stat"><span className="big-num" data-count={x.n}>{x.n}</span><span>{x.d}</span></div>
          ))}
        </div>
        <div className={s.press}>
          {/* TODO: монохромные SVG-логотипы изданий */}
          <span>О нас пишут</span>
          <span style={{ font: "600 24px/1 var(--serif)" }}>Forbes</span>
          <span style={{ font: "600 18px/1 var(--sans)" }}>RB.ru <span style={{ fontWeight: 400, fontSize: 14 }}>· Топ-35 в AI</span></span>
          <span style={{ font: "500 20px/1 var(--serif)" }}>«Ведомости»</span>
        </div>
      </section>

      {/* 02 Компании */}
      <section className="band-white">
        <div className={`container ${s.companies}`}>
          <span>От финансового аналитика до члена совета директоров</span>
          {/* TODO: SVG-логотипы после юр. проверки */}
          <div className={s.logos}>{COMPANIES.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
      </section>

      {/* 03 С чем приходят */}
      <section className="container sec" data-reveal>
        <div className="sec-head">
          <h2 className="h2" style={{ maxWidth: 720 }}>С чем ко мне приходят</h2>
          <p className="lead" style={{ maxWidth: 400 }}>Семь типовых ситуаций собственника — и что я делаю в каждой.</p>
        </div>
        <div className={s.pains}>
          {PAINS.map((p) => (
            <div key={p.q} className={s.pain}><b>«{p.q}»</b><span>{p.a}</span></div>
          ))}
          <a href="#form" className={`${s.pain} ${s.painCta}`}><b>Узнали свою ситуацию?</b><span className="link">Обсудим</span></a>
        </div>
      </section>
      <Quote>{QUOTES.afterPains}</Quote>

      {/* 04 Как я работаю */}
      <section id="how" className="band-navy">
        <div className="container sec" data-reveal>
          <div className="sec-head" style={{ marginBottom: 56 }}>
            <h2 className="h2" style={{ maxWidth: 640, color: "#fff" }}>Как я работаю</h2>
            <p className="lead" style={{ color: "var(--on-navy)" }}>Я не пишу отчёт и не ухожу. Работаю внутри компании вместе с вашей командой, пока изменения не появятся в отчётности.</p>
          </div>
          <ol className={s.steps} style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {STEPS.map((x, i) => (
              <li key={x.t} className={s.step}><b>{i + 1}</b><strong>{x.t}</strong><span>{x.d}</span></li>
            ))}
          </ol>
          <div className={s.pay}>
            <div>
              <span>Модель оплаты</span>
              <p>Фиксированная часть плюс процент от прироста выручки или прибыли. При долгосрочном партнёрстве — доля в бизнесе, которая реализуется при продаже компании.</p>
              <span>Мне выгодно, чтобы вы заработали больше.</span>
            </div>
            <a href="#form" className="btn btn-gold">Узнать условия для вашего бизнеса</a>
          </div>
          <Note style={{ marginTop: 16 }}>Черновик: формулировку, размеры и условия утверждает Михаил. Сроки этапов уточняются.</Note>
        </div>
      </section>

      {/* 05 Услуги */}
      <section id="services" className="container sec" data-reveal>
        <div className="sec-head">
          <h2 className="h2">Услуги</h2>
          <p className="lead">От короткой диагностики до многолетнего партнёрства. Большинство клиентов начинают с диагностики.</p>
        </div>
        <div className={s.services}>
          {SERVICES.map((v) => (
            <article key={v.t} className={s.service}>
              <h3>{v.t}</h3>
              <dl>
                <dt>Для кого</dt><dd>{v.who}</dd>
                <dt>Что входит и результат</dt><dd>{v.what}</dd>
              </dl>
              <div className={s.serviceFoot}><span>{v.term}</span><a href="#form" className="link">Обсудить</a></div>
            </article>
          ))}
        </div>
        <Note style={{ marginTop: 16 }}>Названия, сроки и форматы оплаты предварительные — утверждает Михаил.</Note>
      </section>

      {/* 06 Методология «7П+1» */}
      <section className="band-white">
        <div className={`container sec ${s.method}`} data-reveal>
          <MethodScheme note={<Note>Черновые описания — финальный текст даёт Михаил. Нажмите на элемент схемы.</Note>} />
        </div>
      </section>

      {/* 07 Кейсы */}
      <section id="cases" className="container sec" data-reveal>
        <div className="sec-head">
          <h2 className="h2">Кейсы</h2>
          <Link href="/cases/" className="link">Смотреть все кейсы</Link>
        </div>
        <div className={s.caseHero}>
          <span>Акселератор · 2026 · производственная компания, выручка 800 млн ₽</span>
          <div className={s.caseRow}>
            <p>Собственник хотел продать убыточный бизнес. После трансформации компания вышла в прибыль.</p>
            <div className={s.caseNums}>
              <div><b>+20%</b><span>выручка год к году</span></div>
              <div><b>в прибыли</b><span>вместо убытка</span></div>
            </div>
          </div>
          <Link href="/cases/proizvodstvo-800-mln/" className="link link-gold">Разбор кейса</Link>
        </div>
        <div className={s.careerGrid}>
          {CAREER_CASES.map((c) => (
            <div key={c.co} className={s.career}><span>Из карьеры · {c.co}</span><b>{c.num}</b><span>{c.d}</span></div>
          ))}
        </div>
      </section>
      <Quote>{QUOTES.afterCases}</Quote>
      <div className="container"><Note style={{ marginTop: -24, marginBottom: 32 }}>Цитата — пересказ мысли из интервью, формулировку утверждает Михаил.</Note></div>

      {/* 08 Обо мне */}
      <section id="about" className="band-white">
        <div className={`container sec ${s.about}`} data-reveal>
          <div className={s.aboutText}>
            <h2 className="h2">Обо мне</h2>
            <div className={s.paras}>
              {ABOUT.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <Note>Черновик на согласование (Дополнение №1, п. 2.1). Уточнить: 20 или 25 тыс. сотрудников; можно ли упоминать брата Александра.</Note>
            <div className={s.boards}><b>6</b><span>советов директоров с 2001 года — защищаю интересы акционеров и контролирую менеджмент</span></div>
            {RESUME_PDF
              ? <a href={asset(RESUME_PDF)} download className="btn btn-outline">Скачать резюме (PDF)</a>
              : <Note>Кнопка «Скачать резюме (PDF)» появится, когда резюме будет утверждено (в черновике — заглушки контактов и цифр).</Note>}
            <div className={s.aboutPhoto}>
              <Pic name="about" widths={[520, 1040]} sizes="(max-width: 560px) 90vw, 520px" alt="Михаил Попов" />
            </div>
          </div>
          <div className={s.timeline}>
            <div className="rule">
              {TIMELINE.map((t) => <div key={t.co} className={s.tl}><b>{t.co}</b><span>{t.f}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* 09 Акселератор */}
      <section className="container sec" data-reveal>
        <div className={s.accel}>
          <div>
            <h2 className="h2">Акселератор для собственников</h2>
            <p className="lead">Сообщество компаний, которые растут по методологии «7П+1» и работают на платформе операционного контроля с ИИ. Собственники обмениваются опытом друг с другом.</p>
            <a href="#form" className="btn btn-primary">Подать заявку в акселератор</a>
            <Note>Нужно от Михаила: название, формат, критерии входа.</Note>
          </div>
          <div className={s.accelNums}>
            <div><span className="big-num">10+</span><span>компаний-участников</span></div>
            <div><span className="big-num">5+ млрд ₽</span><span>совокупная выручка</span></div>
            <p>Работает с декабря 2025 года.</p>
          </div>
        </div>
      </section>

      {/* 10 Признание и медиа (+ Дополнение №1, п. 3) */}
      <section className="band-white">
        <div className="container sec" data-reveal>
          <div className="sec-head">
            <h2 className="h2">Признание и медиа</h2>
            <Link href="/media/" className="link">Все публикации</Link>
          </div>
          <div className={s.mediaStats}>
            <div><span className="big-num" data-count={MEDIA_STATS.total}>{MEDIA_STATS.total}</span><span>публикаций в СМИ</span></div>
            <div><span className="big-num" data-count={String(MEDIA_STATS.outlets)}>{MEDIA_STATS.outlets}</span><span>изданий</span></div>
            <div><span className="big-num" data-count={String(MEDIA_STATS.top)}>{MEDIA_STATS.top}</span><span>материалов в ТОП СМИ</span></div>
          </div>
          {/* TODO: монохромные SVG-логотипы изданий */}
          <div className={s.outlets}>{OUTLETS.map((o) => <span key={o}>{o}</span>)}</div>
          <div className={s.pubs} tabIndex={0} aria-label="Избранные публикации">
            {FEATURED.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="nofollow noopener" className={s.pub}>
                <span className={s.pubHead}><b>{p.pub}</b><span>{fmtDate(p)}</span></span>
                <span className={s.pubTitle}>{p.title}</span>
                <span className={s.pubFoot}><span>{p.type}</span><span className="link link-sm">Читать</span></span>
              </a>
            ))}
          </div>
          <div className="rule" style={{ marginTop: 56 }}>
            {AWARDS.map((w) => {
              const inner = <><b>{w.n}</b><span>{w.d}</span><span>{w.y}</span></>;
              return w.url
                ? <a key={w.n} href={w.url} className={s.award} target="_blank" rel="noopener">{inner}</a>
                : <div key={w.n} className={s.award}>{inner}</div>;
            })}
          </div>
          <div className={s.gallery} tabIndex={0} aria-label="Фотографии">
            {GALLERY.map((g) => (
              <figure key={g.src}><Pic name={g.src} widths={[720]} sizes="360px" alt={g.alt} /></figure>
            ))}
          </div>
          <Note style={{ marginTop: 16 }}>Ссылки 2018–2022 годов проверить перед запуском (колонка «Статус ссылки»); нерабочие — заменить скриншотом или скрыть. Ссылки на награды — из ТЗ, Приложение А. Фото и видео со сцены — от Михаила.</Note>
        </div>
      </section>

      {/* 11 Отзывы */}
      <section className="container sec" data-reveal>
        <h2 className="h2" style={{ marginBottom: 48 }}>Отзывы собственников</h2>
        <div className={s.reviews}>
          <div className={s.review}><div className={s.video}><span className={s.play} /></div><span>Видеоотзыв 30–60 секунд · имя, должность, компания</span></div>
          <div className={s.review}><span>Текст отзыва, 2–4 строки — только реальный, с письменным согласием автора</span><span>Собственник производственной компании, выручка N млрд ₽</span></div>
          <div className={s.review}><span>Текст отзыва</span><span>Имя, должность, компания</span></div>
        </div>
      </section>

      {/* 12 Кому подходит */}
      <section className="band-white">
        <div className={`container sec ${s.fit}`} data-reveal>
          <div><h2>Подходит</h2><ul>{FIT.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className={s.notFit}><h2>Не подходит</h2><ul>{NOT_FIT.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </section>

      {/* 13 FAQ */}
      <section className={`container sec ${s.faqWrap}`} data-reveal>
        <h2 className="h2" style={{ marginBottom: 40 }}>Частые вопросы</h2>
        <Faq />
      </section>

      {/* 14 Заявка */}
      <section id="form" className="band-navy">
        <div className={`container sec ${s.formSec}`}>
          <div>
            <h2 className="h2-form">Расскажите о задаче — отвечу лично в течение 1 рабочего дня</h2>
            <figure className={s.formQuote}>
              <blockquote>«{QUOTES.form}»</blockquote>
              <figcaption>Михаил Попов</figcaption>
            </figure>
            <p>Или напишите напрямую в Telegram.</p>
            <a href={TELEGRAM} className="btn btn-outline-light" target="_blank" rel="noopener"><TgIcon color="#fff" size={18} />{TELEGRAM_HANDLE}</a>
          </div>
          <div><LeadForm source="home" /></div>
        </div>
      </section>
    </main>
  );
}
