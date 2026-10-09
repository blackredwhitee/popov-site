import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import LogoMark from "@/components/LogoMark";
import Note from "@/components/Note";
import Pic from "@/components/Pic";
import CaseIcon from "@/components/CaseIcon";
import { CASES } from "@/data/cases";
import { TgIcon } from "@/components/icons";
import {
  ABOUT, AWARDS, CAREER_CASES, FAQ, FIT, HERO_STATS, NOT_FIT, PAINS, QUOTES, SERVICES, STEPS,
} from "@/data/home";
import { COMPANY_LOGOS, OUTLET_LOGOS, PRESS_LOGOS } from "@/data/logos";
import { FEATURED, fmtDate, MEDIA_STATS } from "@/data/media";
import { asset, FORBES, RESUME_PDF, shown, SHOW_NOTES, SITE_URL, TELEGRAM, TELEGRAM_HANDLE } from "@/lib/config";
import { JsonLd, meta } from "@/lib/seo";
import { Faq, MethodScheme } from "./_home/Interactive";
import s from "./home.module.css";

export const metadata = meta({
  title: "Михаил Попов — предприниматель, основатель Talkbank и EasyFinance",
  description: "Михаил Попов — предприниматель в финтехе и инновациях, основатель Talkbank и EasyFinance. Нахожу, где бизнес теряет деньги, и помогаю собственнику превратить потери в прибыль.",
  path: "/",
});

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function Home() {
  const faq = FAQ.filter((f) => shown(f.a));
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Person", name: "Михаил Попов", jobTitle: "Предприниматель, основатель и CEO Talkbank",
        url: SITE_URL, image: SITE_URL + "/img/portrait-840.jpg", sameAs: [TELEGRAM, FORBES],
        worksFor: { "@type": "Organization", name: "Talkbank" },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQ.filter((f) => !f.a.startsWith("[")).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />

      {/* Первый экран */}
      <section id="top" className={`container ${s.hero}`}>
        <div className={s.heroText}>
          <p className={s.byline}>Михаил Попов <span>—</span> предприниматель в финтехе и инновациях, основатель Talkbank и EasyFinance</p>
          <h1 className={s.h1}>Нахожу, где ваш бизнес теряет деньги, — и&nbsp;<em>помогаю</em> собственнику превратить потери в&nbsp;прибыль</h1>
          <p className={s.heroLead}>Захожу в компанию, перестраиваю процессы вместе с&nbsp;вашей командой и довожу до роста прибыли.</p>
          <div className={s.heroCtas}>
            <a href="#form" className="btn btn-primary">Обсудить задачу</a>
            <a href="#cases" className="btn btn-outline">Посмотреть кейсы</a>
          </div>
        </div>
        <figure className={s.portrait}>
          <Pic name="portrait" widths={[420, 840]} sizes="(max-width: 700px) 90vw, 440px" alt="Михаил Попов" priority />
        </figure>
        <dl className={s.facts}>
          {HERO_STATS.map((x) => <div key={x.n}><dt>{x.n}</dt><dd>{x.d}</dd></div>)}
        </dl>
      </section>

      {/* Где работал / кто писал */}
      <section className={s.logosBand}>
        <div className={`container ${s.logosInner}`}>
          <div className={s.logoRow}>
            <span className={s.logoLabel}>Работал в</span>
            <div className={s.logos}>{COMPANY_LOGOS.map((l) => <LogoMark key={l.file} logo={l} h={24} />)}</div>
          </div>
          <div className={s.logoRow}>
            <span className={s.logoLabel}>Обо мне писали</span>
            <div className={s.logos} style={{ justifyContent: "flex-start", gap: "20px 44px" }}>
              <LogoMark logo={PRESS_LOGOS[0]} h={24} />
              <span className={s.pressItem}><LogoMark logo={PRESS_LOGOS[1]} h={22} /><span>Топ-35 в AI</span></span>
              <LogoMark logo={PRESS_LOGOS[2]} h={22} />
            </div>
          </div>
        </div>
      </section>

      {/* С чем приходят */}
      <section className={`container sec ${s.split}`} data-reveal>
        <div className={s.rail}>
          <h2 className="h2">С чем ко мне приходят</h2>
          <p className="lead">Обычно собственник формулирует это одной фразой. За каждой — понятный набор действий.</p>
          <a href="#form" className="link">Узнали себя? Напишите</a>
        </div>
        <ol className={s.pains}>
          {PAINS.map((p, i) => (
            <li key={p.q}>
              <span className={s.num}>{pad(i)}</span>
              <b>{p.q}</b>
              <span>{p.a}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Цитата с фото */}
      <section className={`container ${s.photoQuote}`} data-reveal>
        <figure className={s.pqPhoto}>
          <Pic name="about" widths={[520, 1040]} sizes="(max-width: 900px) 90vw, 560px" alt="Михаил Попов" />
        </figure>
        <figure className={s.pqText}>
          <blockquote>{QUOTES.afterPains}</blockquote>
          <figcaption>— Михаил Попов</figcaption>
        </figure>
      </section>

      {/* Как я работаю */}
      <section id="how" className="band-navy">
        <div className="container sec" data-reveal>
          <div className={s.howHead}>
            <h2 className="h2" style={{ color: "#fff" }}>Как я работаю</h2>
            <p>Я работаю с собственником и его командой внутри компании по авторской методике «7П+1». Она позволяет получить устойчивый рост выручки и прибыли и вывести компанию на более высокий уровень развития.</p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((x, i) => (
              <li key={x.t}><span className={s.dot}>{i + 1}</span><strong>{x.t}</strong><span>{x.d}</span></li>
            ))}
          </ol>
          <div className={s.pay}>
            <p><span>Как считается оплата.</span> Фиксированная часть плюс процент от&nbsp;прироста выручки или прибыли. При долгосрочном партнёрстве — доля в&nbsp;бизнесе, которая реализуется при продаже компании. Мне выгодно, чтобы вы заработали больше.</p>
            <a href="#form" className="btn btn-gold">Узнать условия для вашего бизнеса</a>
          </div>
          <Note style={{ marginTop: 16 }}>Черновик: формулировку, размеры и условия утверждает Михаил. Сроки этапов уточняются.</Note>
        </div>
      </section>

      {/* Услуги — прейскурант */}
      <section id="services" className="container sec" data-reveal>
        <div className={s.servicesHead}>
          <h2 className="h2">Услуги</h2>
          <p className="lead">Большинство клиентов начинают с диагностики — через 2–4 недели понятно, где компания теряет деньги и в каком приоритете строить работу по исправлению ситуации.</p>
        </div>
        <div className={s.services}>
          {SERVICES.map((v, i) => (
            <article key={v.t} className={s.service}>
              <div className={s.svcTitle}>
                <h3>{v.t}</h3>
                {i === 0 && <span className={s.tag}>С этого обычно начинаем</span>}
              </div>
              <p className={s.svcWho}>{v.who}</p>
              <p className={s.svcWhat}>{v.what}</p>
              <div className={s.svcTerm}><span>{v.term}</span><a href="#form" className="link link-sm">Обсудить</a></div>
            </article>
          ))}
        </div>
        <Note style={{ marginTop: 16 }}>Названия, сроки и форматы оплаты предварительные — утверждает Михаил.</Note>
      </section>

      {/* Методология «7П+1» */}
      <section className="band-white">
        <div className={`container sec ${s.method}`} data-reveal>
          <MethodScheme note={<Note>Черновые описания — финальный текст даёт Михаил. Нажмите на элемент схемы.</Note>} />
        </div>
      </section>

      {/* Кейсы */}
      <section id="cases" className="container sec" data-reveal>
        <div className={s.casesHead}>
          <h2 className="h2">Кейсы</h2>
          <Link href="/cases/" className="link">Все кейсы</Link>
        </div>
        <Link href="/cases/proizvodstvo-800-mln/" className={s.caseHero}>
          <span className={s.caseMeta}>Акселератор, 2026 · производственная компания, выручка 800&nbsp;млн&nbsp;₽</span>
          <p>Собственник хотел продать убыточный бизнес. После трансформации компания вышла в&nbsp;прибыль.</p>
          <div className={s.caseNums}>
            <div><b>+20%</b><span>выручка год к году</span></div>
            <div><b>в прибыли</b><span>вместо убытка</span></div>
            <span className="link link-gold">Разбор кейса</span>
          </div>
        </Link>
        <div className={s.practice}>
          <span className={s.careerLabel}>Проекты</span>
          <ul>
            {CASES.filter((c) => c.icon).map((c) => (
              <li key={c.title}>
                <span className={s.pIcon}>{c.icon && <CaseIcon name={c.icon} size={30} />}</span>
                <b>{c.title}</b>
                <span className={s.pText}>{c.num && <strong>{c.num} </strong>}{c.numLabel}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.career}>
          <span className={s.careerLabel}>Из прошлой карьеры</span>
          {CAREER_CASES.map((c) => (
            <div key={c.co}><b>{c.num}</b><span>{c.d}</span><em>{c.co}</em></div>
          ))}
        </div>
      </section>

      {/* Обо мне */}
      <section id="about" className="band-white">
        <div className={`container sec ${s.about}`} data-reveal>
          <div className={s.aboutText}>
            <h2 className="h2">Обо мне</h2>
            <div className={s.paras}>
              {ABOUT.filter(shown).map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            
            <p className={s.boards}><b>6 советов директоров</b> с 2001 года. Там моя работа — защищать интересы акционеров и контролировать менеджмент.</p>
            {RESUME_PDF
              ? <a href={asset(RESUME_PDF)} download className="btn btn-outline" style={{ alignSelf: "flex-start" }}>Скачать резюме (PDF)</a>
              : <Note>Кнопка «Скачать резюме (PDF)» появится, когда резюме будет утверждено.</Note>}
          </div>
          <div className={s.aboutSide}>
            <figure className={s.aboutPhoto}>
              <Pic name="gallery-5" widths={[720, 1100]} sizes="(max-width: 900px) 90vw, 520px" alt="Михаил Попов" />
            </figure>
          </div>
        </div>
      </section>

      {/* Акселератор */}
      <section className={`container sec ${s.accel}`} data-reveal>
        <div>
          <h2 className="h2">Акселератор для собственников</h2>
          <p className="lead">Сообщество компаний, которые растут по методологии «7П+1» и работают на платформе операционного контроля с ИИ. Собственники обмениваются опытом друг с другом.</p>
          <Note>Нужно от Михаила: название, формат, критерии входа.</Note>
        </div>
        <div className={s.accelSide}>
          <p><b>10+</b> компаний с совокупной выручкой <b>5+&nbsp;млрд&nbsp;₽</b>. Работает с декабря 2025 года.</p>
          <a href="#form" className="btn btn-primary">Подать заявку в акселератор</a>
        </div>
      </section>

      {/* Медиа */}
      <section className="band-white">
        <div className="container sec" data-reveal>
          <div className={s.mediaHead}>
            <h2 className="h2">Публикации и&nbsp;признание</h2>
            <p className={s.mediaLine}>
              {MEDIA_STATS.total} публикаций в&nbsp;{MEDIA_STATS.outlets} изданиях с&nbsp;2016 года, {MEDIA_STATS.top} из&nbsp;них — в&nbsp;РБК, «Ведомостях», «Коммерсанте», «Российской газете», Forbes и&nbsp;«Известиях».
            </p>
          </div>
          <div className={s.outlets}>{OUTLET_LOGOS.map((l) => <LogoMark key={l.file} logo={l} h={26} />)}</div>
          <div className={s.mediaCols}>
            <div>
              <h3 className={s.colTitle}>Избранное</h3>
              <ul className={s.clips}>
                {FEATURED.slice(0, 8).map((p) => (
                  <li key={p.url}>
                    <a href={p.url} target="_blank" rel="nofollow noopener">
                      <span className={s.clipMeta}>{p.pub} · {fmtDate(p).slice(-4)}</span>
                      <span className={s.clipTitle}>{p.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link href="/media/" className="link" style={{ marginTop: 28, display: "inline-block" }}>Все {MEDIA_STATS.total} публикаций</Link>
            </div>
            <div>
              <h3 className={s.colTitle}>Награды и рейтинги</h3>
              <ul className={s.awards}>
                {AWARDS.map((w) => (
                  <li key={w.n}>{w.url ? <a href={w.url} target="_blank" rel="noopener"><b>{w.n} ↗</b></a> : <b>{w.n}</b>}<span>{w.d}{w.y && <em> · {w.y}</em>}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <Note style={{ marginTop: 16 }}>Ссылки 2018–2022 годов проверить перед запуском; нерабочие — заменить скриншотом или скрыть.</Note>
        </div>
      </section>

      {/* Отзывы — только когда будут реальные */}
      {SHOW_NOTES && (
        <section className="container sec" data-reveal>
          <h2 className="h2" style={{ marginBottom: 40 }}>Отзывы собственников</h2>
          <div className={s.reviews}>
            <div className={s.review}><div className={s.video}><span className={s.play} /></div><span>Видеоотзыв 30–60 секунд · имя, должность, компания</span></div>
            <div className={s.review}><span>Текст отзыва, 2–4 строки — только реальный, с письменным согласием автора</span><span>Собственник производственной компании, выручка N млрд ₽</span></div>
            <div className={s.review}><span>Текст отзыва</span><span>Имя, должность, компания</span></div>
          </div>
          <Note style={{ marginTop: 16 }}>Блок скрыт на боевой версии, пока нет реальных отзывов с согласием.</Note>
        </section>
      )}

      {/* Кому подходит */}
      <section className={`container sec ${s.fit}`} data-reveal>
        <div>
          <h2>Кому подходит</h2>
          <ul>{FIT.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className={s.notFit}>
          <h2>Кому нет</h2>
          <ul>{NOT_FIT.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="band-white">
        <div className={`container sec ${s.split}`} data-reveal>
          <div className={s.rail}>
            <h2 className="h2">Частые вопросы</h2>
            <p className="lead">Не нашли свой — задайте в Telegram, отвечаю сам.</p>
            <a href={TELEGRAM} className="link" target="_blank" rel="noopener">{TELEGRAM_HANDLE}</a>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      {/* Заявка */}
      <section id="form" className="band-navy">
        <div className={`container sec ${s.formSec}`}>
          <div>
            <h2 className="h2-form">Расскажите о задаче — отвечу лично в&nbsp;течение 1&nbsp;рабочего дня</h2>
            <figure className={s.formQuote}>
              <blockquote>«{QUOTES.form}»</blockquote>
            </figure>
            <p>Можно и без формы — напишите в Telegram.</p>
            <a href={TELEGRAM} className="btn btn-outline-light" target="_blank" rel="noopener"><TgIcon color="#fff" size={18} />{TELEGRAM_HANDLE}</a>
          </div>
          <div><LeadForm source="home" /></div>
        </div>
      </section>
    </main>
  );
}
