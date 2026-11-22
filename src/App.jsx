import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  contacts,
  demoOrdersStorageKey,
  galleryPhotos,
  instagramTiles,
  unlimitedPlans,
  visitPlans,
  trainers,
} from "./data.js";

function waLink(text) {
  return `https://wa.me/${contacts.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function contactWaLink(text = contacts.whatsappGreeting) {
  return waLink(text);
}

function formatPrice(amount) {
  return new Intl.NumberFormat("ru-RU").format(amount);
}

function toMembershipOffer(plan) {
  return {
    id: plan.id,
    title: plan.title,
    terms: plan.terms,
    amount: plan.price,
    type: "membership",
  };
}

function formatKazakhPhone(value) {
  let digits = value.replace(/\D/g, "");
  const hasCountryPrefix = /^\s*\+7/.test(value);
  if (hasCountryPrefix) {
    digits = digits.slice(1);
  }
  if (digits.length > 10 && (digits.startsWith("8") || digits.startsWith("7"))) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return "+7 (";
  const area = digits.slice(0, 3);
  const first = digits.slice(3, 6);
  const second = digits.slice(6, 8);
  const third = digits.slice(8, 10);
  const separator = first.length === 3 ? "-" : " ";
  return `+7 (${area}${area.length === 3 ? ")" : ""}${first ? ` ${first}` : ""}${second ? `${separator}${second}` : ""}${third ? `-${third}` : ""}`;
}

function BrandMark({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#top" aria-label="Titan Arms — главная">
      <span className="brand__mark" aria-hidden="true">
        <img src="./assets/profile-reference.jpg" alt="" />
      </span>
      <span className="brand__word">
        <strong>TITAN</strong>
        <strong>ARMS<span className="brand__dot">.</span></strong>
      </span>
    </a>
  );
}

function ArrowIcon({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Preloader({ onComplete }) {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduceMotion ? 100 : 1500);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={reduceMotion ? { duration: 0 } : { delay: 0.72, duration: 0.75, ease: [0.8, 0, 0.2, 1] }}
      aria-label="Titan Arms"
    >
      <div className="preloader__beam" />
      <span className="preloader__eyebrow">ALMATY · ALMA CITY</span>
      <div className="preloader__title">TITAN <i>ARMS</i></div>
      <div className="preloader__progress"><span /></div>
    </motion.div>
  );
}

function Header({ onBuy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header__inner">
        <BrandMark />
        <a className="header__location" href={contacts.mapUrl} target="_blank" rel="noreferrer">
          <span className="location-pin">⌖</span>
          <span>ЖК ALMA CITY<small>{contacts.venue.replace("ЖК Alma City, ", "")} · 2GIS ↗</small></span>
        </a>
        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`} aria-label="Основная навигация">
          <a href="#about" onClick={closeMenu}>О зале</a>
          <a href="#plans" onClick={closeMenu}>Абонементы</a>
          <a href="#team" onClick={closeMenu}>Тренеры</a>
          <a href="#gallery" onClick={closeMenu}>Атмосфера</a>
        </nav>
        <div className="header__actions">
          <a className="header__phone" href={`tel:${contacts.phone}`}>ПОЗВОНИТЬ</a>
          <a className="header__whatsapp" href={contactWaLink()} target="_blank" rel="noreferrer">WHATSAPP <ArrowIcon diagonal /></a>
          <button className="button button--small button--orange" onClick={onBuy}>
            КУПИТЬ АБОНЕМЕНТ <ArrowIcon diagonal />
          </button>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <motion.div
        className="hero__image"
        style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}
        aria-hidden="true"
      />
      <div className="hero__veil" />
      <div className="hero__grid" />
      <div className="hero__content page-wrap">
        <div className="hero__copy">
          <div className="eyebrow"><span className="eyebrow__line" /> ТРЕНАЖЁРНЫЙ ЗАЛ · ALMA CITY</div>
          <h1>TITAN ARMS —<br /><span>ТВОЙ ХАРАКТЕР.</span><br /><i>ТВОЯ СИЛА.</i></h1>
          <p className="hero__lead">
            Не ищи лёгкий путь. Найди место, где каждый повтор делает тебя сильнее.
          </p>
          <div className="hero__buttons">
            <a className="button button--orange" href="#plans">ВЫБРАТЬ АБОНЕМЕНТ <ArrowIcon /></a>
            <a className="button button--ghost" href="#about"><span className="play-icon">▶</span> ПОЧУВСТВОВАТЬ АТМОСФЕРУ</a>
          </div>
        </div>
        <div className="hero__side-note"><span>01 / 04</span><i /> МЕСТО, ГДЕ КОВАЮТ СИЛУ</div>
        <div className="hero__stats">
          <div><strong>ALMA<br />CITY</strong><span>ТВОЙ РАЙОН<br />ТВОЙ ЗАЛ</span></div>
          <div><strong>PRO</strong><span>ЖЕЛЕЗО<br />ДЛЯ РЕЗУЛЬТАТА</span></div>
          <div><strong>∞</strong><span>ТВОЙ ТЕМП<br />ТВОИ ПРАВИЛА</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span /> SCROLL TO GET STRONGER</a>
      </div>
      <div className="hero__index">T / A — 001</div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Сила. Дисциплина. Результат.">
      <div className="marquee__track">
        {[0, 1].map((item) => (
          <span key={item} aria-hidden={item === 1}>
            СИЛА <b>✳</b> ДИСЦИПЛИНА <b>✳</b> РЕЗУЛЬТАТ <b>✳</b> БЕЗ ОТГОВОРОК <b>✳</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="page-wrap about__layout">
        <Reveal className="about__intro">
          <div className="eyebrow"><span className="eyebrow__line" /> НЕ ПРОСТО ЗАЛ</div>
          <h2>СИЛА<br />НЕ <i>СЛУЧАЕТСЯ.</i></h2>
          <p>Она появляется там, где ты приходишь снова. Titan Arms — твоя точка силы в Alma City.</p>
          <a className="text-link" href={contacts.mapUrl} target="_blank" rel="noreferrer">НАЙТИ НА КАРТЕ <ArrowIcon diagonal /></a>
        </Reveal>
        <div className="about__tiles">
          <Reveal className="about-card about-card--large">
            <span className="about-card__number">01</span>
            <div className="about-card__symbol">✳</div>
            <div><h3>ТВОЙ РИТМ.<br />ТВОИ ПРАВИЛА.</h3><p>Абонементы на 12 посещений и безлимит — выбери свой режим.</p></div>
            <span className="corner-mark">↗</span>
          </Reveal>
          <Reveal className="about-card about-card--image" delay={0.1}>
            <span className="about-card__number">02 / ALMA CITY</span>
            <div className="about-card__image-label">ТВОЯ ТЕРРИТОРИЯ<br /><i>ТВОЯ РАБОТА.</i></div>
          </Reveal>
          <Reveal className="about-card about-card--blue" delay={0.18}>
            <span className="about-card__number">03</span>
            <div className="about-card__symbol">↗</div>
            <div><h3>ВЫЖИМАЙ<br />МАКСИМУМ.</h3><p>Каждый подход — шаг к версии себя сильнее.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MembershipCard({ plan, selected, onSelect, onBuy }) {
  const isSelected = selected === plan.period;

  const handlePointerMove = (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--mouse-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--mouse-y", `${y * 100}%`);
    event.currentTarget.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-4px)`;
  };

  const resetPointer = (event) => { event.currentTarget.style.transform = ""; };

  return (
    <motion.article
      className={`plan-card ${plan.deal ? "plan-card--deal" : ""} ${isSelected ? "plan-card--selected" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onClick={() => onSelect(plan.period)}
    >
      {plan.deal && <span className="deal-badge">TITAN DEAL · {plan.discount}</span>}
      <span className="plan-card__top">{plan.deal ? "ЛУЧШАЯ ЦЕНА" : plan.note.toUpperCase()}</span>
      <h3>{plan.period}</h3>
      <div className="plan-card__price">{formatPrice(plan.price)}<small> ₸</small></div>
      <p className="plan-card__note">{plan.discount ? `${plan.note} от тарифа на 1 месяц` : "Безлимитный доступ в зал"}</p>
      <button
        className={`button plan-card__button ${plan.deal ? "button--orange" : "button--outline"}`}
        onClick={(event) => { event.stopPropagation(); onBuy(toMembershipOffer(plan)); }}
      >
        ЗАБРАТЬ АБОНЕМЕНТ <ArrowIcon />
      </button>
      <span className="plan-card__corner" aria-hidden="true">✳</span>
    </motion.article>
  );
}

function Pricing({ onBuy }) {
  const [mode, setMode] = useState("unlimited");
  const [visitIndex, setVisitIndex] = useState(2);
  const [selectedPeriod, setSelectedPeriod] = useState("unlimited-1-year");
  const currentVisit = visitPlans[visitIndex];

  return (
    <section className="pricing section-pad" id="plans">
      <div className="page-wrap">
        <Reveal className="section-heading section-heading--center">
          <div className="eyebrow"><span className="eyebrow__line" /> ВЫБИРАЙ СВОЙ РЕЖИМ</div>
          <h2>ТВОЙ ДОСТУП.<br /><i>ТВОЯ СИЛА.</i></h2>
          <p>Честный прайс. Никаких отговорок — только следующий подход.</p>
        </Reveal>
        <div className="pricing__switch-wrap">
          <div className="pricing-switch" role="tablist" aria-label="Вид абонемента">
            <motion.span
              className="pricing-switch__active"
              animate={{ x: mode === "visits" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
            />
            <button role="tab" aria-selected={mode === "visits"} onClick={() => setMode("visits")}>12 ПОСЕЩЕНИЙ</button>
            <button role="tab" aria-selected={mode === "unlimited"} onClick={() => setMode("unlimited")}>БЕЗЛИМИТ</button>
          </div>
          <span className="pricing__currency">ЦЕНЫ В ТЕНГЕ · ₸</span>
        </div>
        <AnimatePresence mode="wait">
          {mode === "visits" ? (
            <motion.div
              className="visits-panel"
              key="visits"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div className="visits-panel__copy">
                <div className="eyebrow eyebrow--muted">ОДИН АБОНЕМЕНТ · 12 ВХОДОВ</div>
                <h3>12 РАЗ.<br /><i>БЕЗ КОМПРОМИССОВ.</i></h3>
                <p>Выбери удобное время — цена обновится мгновенно.</p>
                <div className="visit-options">
                  {visitPlans.map((visit, index) => (
                    <button
                      key={visit.time}
                      className={`visit-option ${visitIndex === index ? "visit-option--active" : ""}`}
                      onClick={() => setVisitIndex(index)}
                      aria-pressed={visitIndex === index}
                    >
                      <span>{visit.time}</span><small>{visit.note}</small><b>{formatPrice(visit.price)} ₸</b>
                    </button>
                  ))}
                </div>
              </div>
              <div className="visits-panel__price">
                <span>12 ПОСЕЩЕНИЙ</span>
                <strong key={currentVisit.price}>{formatPrice(currentVisit.price)}<small> ₸</small></strong>
                <p>{currentVisit.time}</p>
                <button className="button button--orange" onClick={() => onBuy(toMembershipOffer(currentVisit))}>
                  ВЫБРАТЬ ЭТОТ ТАРИФ <ArrowIcon />
                </button>
                <div className="visits-panel__stamp">12<span>×</span></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="plans-grid"
              key="unlimited"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {unlimitedPlans.map((plan, index) => (
                <Reveal key={plan.period} delay={index * 0.06}>
                  <MembershipCard plan={plan} selected={selectedPeriod === plan.id ? plan.period : ""} onSelect={() => setSelectedPeriod(plan.id)} onBuy={onBuy} />
                </Reveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="pricing__fineprint">
          <span>✳ УТОЧНИТЬ УСЛОВИЯ ПО АБОНЕМЕНТУ</span>
          <a href={contactWaLink("Здравствуйте! Пишу с сайта Titan Arms. Подскажите, пожалуйста, условия абонементов.")} target="_blank" rel="noreferrer">НАПИСАТЬ В WHATSAPP <ArrowIcon diagonal /></a>
        </div>
      </div>
    </section>
  );
}

function Team({ onCoach }) {
  return (
    <section className="team section-pad" id="team">
      <div className="page-wrap">
        <div className="team__heading">
          <Reveal className="section-heading">
            <div className="eyebrow"><span className="eyebrow__line" /> ЛЮДИ, КОТОРЫЕ ВЕДУТ ВПЕРЁД</div>
            <h2>КОМАНДА<br /><i>ТИТАНОВ.</i></h2>
          </Reveal>
          <Reveal className="team__aside">
            <p>Три тренера Titan Arms с разным опытом и специализациями. Выбери своего и запишись на персональную тренировку.</p>
              <a className="text-link" href={contacts.instagramUrl} target="_blank" rel="noreferrer">СМОТРЕТЬ INSTAGRAM <ArrowIcon diagonal /></a>
            </Reveal>
        </div>
        <div className="team-grid">
            {trainers.map((trainer, index) => (
              <Reveal className="coach-card" key={trainer.id} delay={index * 0.07}>
                <img className="coach-card__image" src={trainer.image} alt={trainer.alt} loading="lazy" />
                <div className="coach-card__details">
                  <h3>{trainer.name}</h3>
                  <div className="coach-card__meta">
                    <span>{trainer.experience}</span>
                    <span>{trainer.clients}</span>
                  </div>
                  <div className="coach-card__specialties">
                    {trainer.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}
                  </div>
                  <button className="button button--outline" onClick={() => onCoach(trainer.name)}>
                    ЗАПИСАТЬСЯ К ТРЕНЕРУ <ArrowIcon diagonal />
                  </button>
                </div>
              </Reveal>
            ))}
        </div>
        <Reveal className="team-callout">
            <span className="team-callout__cross">✳</span>
            <div>
              <span>ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ</span>
              <h3>НЕ ОДИН. <i>С КОМАНДОЙ.</i></h3>
              <p>Напиши, чтобы узнать о свободном времени персональных тренировок.</p>
            </div>
            <button className="button button--outline" onClick={() => onCoach("тренером Titan Arms")}>НАЙТИ СВОЕГО ТРЕНЕРА <ArrowIcon /></button>
        </Reveal>
        <p className="team__note">Данные и достижения указаны по карточкам тренеров, предоставленным залом.</p>
      </div>
    </section>
  );
}

function Gallery() {
  const railRef = useRef(null);
  const moveRail = (direction) => {
    if (railRef.current) railRef.current.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  return (
    <section className="gallery section-pad" id="gallery">
      <div className="page-wrap">
        <div className="gallery__top">
          <Reveal className="section-heading">
            <div className="eyebrow"><span className="eyebrow__line" /> ВНУТРИ TITAN ARMS</div>
            <h2>АТМОСФЕРА<br /><i>РАБОТЫ.</i></h2>
          </Reveal>
          <div className="gallery__controls">
            <a className="text-link" href={contacts.instagramUrl} target="_blank" rel="noreferrer">БОЛЬШЕ В INSTAGRAM <ArrowIcon diagonal /></a>
            <button onClick={() => moveRail(-1)} aria-label="Предыдущие фотографии">←</button>
            <button onClick={() => moveRail(1)} aria-label="Следующие фотографии">→</button>
          </div>
        </div>
      </div>
      <div className="gallery-rail" ref={railRef} tabIndex="0" aria-label="Фотогалерея зала">
        {galleryPhotos.map((photo, index) => (
          <motion.article
            className="gallery-card"
            key={photo.title}
            whileHover={{ scale: 0.985 }}
          >
            <img src={photo.src} alt={`Атмосфера тренировок — ${photo.title}`} loading="lazy" />
            <div className="gallery-card__shade" />
            <span className="gallery-card__tag">{photo.tag}</span>
            <div className="gallery-card__bottom"><h3>{photo.title}</h3><span>0{index + 1} / 03</span></div>
          </motion.article>
        ))}
        <a className="gallery-card gallery-card--cta" href={contacts.instagramUrl} target="_blank" rel="noreferrer">
          <span>ОТКРОЙ БОЛЬШЕ</span><strong>СМОТРИ<br /><i>INSTAGRAM.</i></strong><ArrowIcon diagonal />
        </a>
      </div>
      <div className="page-wrap gallery__mobile-hint">СВАЙПНИ, ЧТОБЫ УВИДЕТЬ БОЛЬШЕ <span>→</span></div>
    </section>
  );
}

function Instagram() {
  return (
    <section className="instagram section-pad">
      <div className="page-wrap instagram__layout">
        <Reveal className="instagram__copy">
          <div className="eyebrow"><span className="eyebrow__line" /> СЛЕДИ ЗА TITAN ARMS</div>
          <h2>ЖИВИ<br /><i>В РЕЖИМЕ.</i></h2>
          <p>Тренировки, команда и новости зала — в официальном профиле Titan Arms.</p>
          <a className="button button--ghost" href={contacts.instagramUrl} target="_blank" rel="noreferrer">{contacts.instagramHandle.toUpperCase()} <ArrowIcon diagonal /></a>
          <small className="instagram__disclaimer">Посты, Reels и новости зала смотри в официальном профиле Titan Arms.</small>
        </Reveal>
        <div className="instagram__grid">
          {instagramTiles.map((tile, index) => (
            <a
              className={`instagram-tile instagram-tile--${index + 1}`}
              href={contacts.instagramUrl}
              key={tile.title}
              target="_blank"
              rel="noreferrer"
            >
              <img src={tile.image} alt="" style={{ objectPosition: tile.position }} loading="lazy" />
              <span className="instagram-tile__type">{tile.kind}</span>
              <strong>{tile.title}</strong>
              <span className="instagram-tile__arrow"><ArrowIcon diagonal /></span>
            </a>
          ))}
          <a className="instagram-follow" href={contacts.instagramUrl} target="_blank" rel="noreferrer">
            <span>✳</span><strong>ПОДПИШИСЬ<br />НА НАС</strong><small>ПЕРЕЙТИ В INSTAGRAM ↗</small>
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact({ onBuy }) {
  return (
    <section className="contact section-pad" id="contact">
      <div className="page-wrap contact__layout">
        <Reveal className="contact__title">
          <div className="eyebrow"><span className="eyebrow__line" /> МЫ УЖЕ ЖДЁМ ТЕБЯ</div>
          <h2>ХАРАКТЕР<br /><i>НЕ ЖДЁТ.</i></h2>
          <button className="button button--orange" onClick={onBuy}>ВЫБРАТЬ АБОНЕМЕНТ <ArrowIcon /></button>
        </Reveal>
        <Reveal className="contact__details" delay={0.1}>
          <a className="contact-row" href={contacts.mapUrl} target="_blank" rel="noreferrer">
            <span className="contact-row__index">01</span><span className="contact-row__label">АДРЕС</span>
            <strong>{contacts.address}<small>Цокольный этаж · Открыть в 2GIS ↗</small></strong>
          </a>
          <a className="contact-row" href={`tel:${contacts.phone}`}>
            <span className="contact-row__index">02</span><span className="contact-row__label">ТЕЛЕФОН</span>
            <strong>{contacts.phoneLabel}<small>Звонок в Titan Arms ↗</small></strong>
          </a>
          <a className="contact-row" href={contactWaLink()} target="_blank" rel="noreferrer">
            <span className="contact-row__index">03</span><span className="contact-row__label">WHATSAPP</span>
            <strong>Напиши нам<small>Ответим по абонементам и тренировкам ↗</small></strong>
          </a>
          <div className="contact-row contact-row--hours">
            <span className="contact-row__index">04</span><span className="contact-row__label">ГРАФИК</span>
            <strong>Воскресенье — выходной<small>Будни и суббота: актуальное время уточняйте по телефону</small></strong>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="page-wrap">
        <div className="footer__top">
          <BrandMark />
          <strong className="footer__slogan">ВЫЖИМАЙ<br /><i>МАКСИМУМ.</i></strong>
          <a className="footer__up" href="#top">ВВЕРХ ↑</a>
        </div>
        <div className="footer__bottom">
          <span>© TITAN ARMS · ALMATY</span>
          <span>{contacts.venue.toUpperCase()}</span>
          <div><a href={contacts.instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={contactWaLink()} target="_blank" rel="noreferrer">WHATSAPP ↗</a></div>
          <span>СИЛА — ЭТО ВЫБОР.</span>
        </div>
      </div>
    </footer>
  );
}

function BankBadge({ bank }) {
  if (bank === "kaspi") {
    return <span className="bank-badge bank-badge--kaspi"><b>K</b><span>Kaspi.kz</span></span>;
  }
  return (
    <span className="bank-badge bank-badge--halyk">
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <circle cx="21" cy="21" r="20" fill="#087f74" />
        <path d="M12 12h6v18h-6zm12 0h6v18h-6zm-8 7h14v5H16z" fill="#fff" />
        <path d="M10 10h5v5h-5zm17 17h5v5h-5z" fill="#f3bd46" />
      </svg>
      <span>Halyk</span>
    </span>
  );
}

function CheckoutDrawer({ offer, onClose }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("details");
  const [selectedBank, setSelectedBank] = useState("kaspi");
  const [order, setOrder] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);
  const isTrainingRequest = offer?.type === "training";

  useEffect(() => {
    if (!offer) return;
    setFullName("");
    setPhone("");
    setStep("details");
    setSelectedBank("kaspi");
    setOrder(null);
    setProcessing(false);
    setError("");
  }, [offer?.id]);

  useEffect(() => {
    if (!offer) return undefined;
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("drawer-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("drawer-open");
      window.clearTimeout(timerRef.current);
    };
  }, [offer, onClose]);

  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    if (!fullName.trim()) {
      setError("Укажи ФИО, чтобы оформить заявку.");
      return;
    }
    if (!/^\+7 \(7\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
      setError("Введи полный номер в формате +7 (7XX) XXX-XX-XX.");
      return;
    }
    setError("");
    if (isTrainingRequest) {
      const message = `Здравствуйте! Пишу с сайта Titan Arms. Хочу записаться на персональную тренировку.\nТренер: ${offer.title}\nФИО: ${fullName.trim()}\nТелефон: ${phone.trim()}\nПодскажите, пожалуйста, свободное время и условия.`;
      window.open(contactWaLink(message), "_blank", "noopener,noreferrer");
      return;
    }
    setStep("payment");
  };

  const startDemoPayment = () => {
    if (processing) return;
    setError("");
    setProcessing(true);
    setStep("processing");
    timerRef.current = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(demoOrdersStorageKey);
        const existingOrders = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(existingOrders)) {
          throw new Error("Сохранённые заявки имеют неверный формат.");
        }
        const orderId = `TA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const completedOrder = {
          orderId,
          offer: { ...offer },
          fullName: fullName.trim(),
          phone,
          paymentMethod: selectedBank,
          status: "demo-confirmed",
          demo: true,
          amountCharged: 0,
          createdAt: new Date().toISOString(),
        };
        window.localStorage.setItem(demoOrdersStorageKey, JSON.stringify([...existingOrders, completedOrder]));
        setOrder(completedOrder);
        setStep("confirmation");
      } catch (storageError) {
        console.error("Не удалось сохранить демо-заказ Titan Arms.", storageError);
        setError("Не удалось сохранить демо-заявку в этом браузере. Проверь доступ к локальному хранилищу и повтори попытку.");
        setStep("payment");
      } finally {
        setProcessing(false);
      }
    }, 1100);
  };

  return (
    <AnimatePresence>
      {offer && (
        <>
          <motion.button
            className="drawer-backdrop"
            aria-label="Закрыть оформление"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="checkout-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            initial={false}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="checkout-drawer__top">
              <span className="eyebrow"><span className="eyebrow__line" /> {isTrainingRequest ? "ЗАПИСЬ НА ТРЕНИРОВКУ" : "ДЕМО-ОФОРМЛЕНИЕ"}</span>
              <button className="drawer-close" onClick={onClose} aria-label="Закрыть">×</button>
            </div>
            <div className="checkout-progress" aria-label="Этап оформления">
              <span className={step === "details" || step === "payment" || step === "processing" || step === "confirmation" ? "is-current" : ""}>01 · ДАННЫЕ</span>
              {!isTrainingRequest && <><i /><span className={step !== "details" ? "is-current" : ""}>02 · ОПЛАТА</span><i /><span className={step === "confirmation" ? "is-current" : ""}>03 · ГОТОВО</span></>}
            </div>
            <AnimatePresence mode="wait">
              {step === "details" && (
                <motion.div key="details" className="checkout-step" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                  <h2 id="checkout-title">{isTrainingRequest ? <>ТВОЯ<br /><i>ТРЕНИРОВКА.</i></> : <>ТВОЙ<br /><i>АБОНЕМЕНТ.</i></>}</h2>
                  <div className="checkout-offer">
                    <span>{isTrainingRequest ? "ФОРМАТ" : "ВЫБРАННЫЙ ТАРИФ"}</span>
                    <strong>{offer.title}</strong>
                    {offer.terms && <small>{offer.terms}</small>}
                    {!isTrainingRequest && <b>{formatPrice(offer.amount)} ₸</b>}
                  </div>
                  <form className="checkout-form" onSubmit={handleDetailsSubmit}>
                    <label>ФИО<input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Фамилия Имя Отчество" autoComplete="name" required /></label>
                    <label>НОМЕР ТЕЛЕФОНА<input type="tel" inputMode="tel" value={phone || "+7 ("} onChange={(event) => setPhone(formatKazakhPhone(event.target.value))} placeholder="+7 (7XX) XXX-XX-XX" autoComplete="tel" aria-describedby={error ? "checkout-error" : undefined} required /></label>
                    {error && <p className="form-error" id="checkout-error" role="alert">{error}</p>}
                    <button className="button button--orange checkout-submit" type="submit">
                      {isTrainingRequest ? "ПЕРЕЙТИ В WHATSAPP" : "ПЕРЕЙТИ К ОПЛАТЕ"} <ArrowIcon />
                    </button>
                  </form>
                  {isTrainingRequest ? (
                    <p className="checkout-intro">Откроется WhatsApp с готовым запросом тренеру. Оплата тренировок не проводится этим демо-окном.</p>
                  ) : (
                    <p className="demo-disclaimer">ДЕМО-РЕЖИМ · Реального списания денег нет.</p>
                  )}
                </motion.div>
              )}
              {step === "payment" && (
                <motion.div key="payment" className="checkout-step" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                  <button className="checkout-back" onClick={() => { setError(""); setStep("details"); }}>← НАЗАД К ДАННЫМ</button>
                  <h2 id="checkout-title">ВЫБЕРИ<br /><i>БАНК.</i></h2>
                  <div className="checkout-offer checkout-offer--compact">
                    <span>{offer.terms}</span><strong>{offer.title}</strong><b>{formatPrice(offer.amount)} ₸</b>
                  </div>
                  <p className="checkout-intro">Демо-оплата имитирует подтверждение заказа. Выбери Kaspi или Halyk — списания не будет.</p>
                  <div className="bank-options" role="radiogroup" aria-label="Способ оплаты">
                    {["kaspi", "halyk"].map((bank) => (
                      <button key={bank} className={`bank-option ${selectedBank === bank ? "bank-option--selected" : ""}`} onClick={() => setSelectedBank(bank)} role="radio" aria-checked={selectedBank === bank}>
                        <BankBadge bank={bank} />
                        <span>{selectedBank === bank ? "ВЫБРАН" : "ВЫБРАТЬ"}</span>
                      </button>
                    ))}
                  </div>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <button className="button button--orange checkout-submit" onClick={startDemoPayment}>ОПЛАТИТЬ В ДЕМО-РЕЖИМЕ · {formatPrice(offer.amount)} ₸ <ArrowIcon /></button>
                  <p className="demo-disclaimer">ДЕМО · Денежные средства не списываются.</p>
                </motion.div>
              )}
              {step === "processing" && (
                <motion.div key="processing" className="checkout-status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="processing-spinner" />
                  <span className="eyebrow">ДЕМО-ПЛАТЁЖ · {selectedBank === "kaspi" ? "KASPI" : "HALYK"}</span>
                  <h2 id="checkout-title">ПРОВЕРЯЕМ<br /><i>ПЛАТЁЖ.</i></h2>
                  <p>Подтверждаем демо-заказ… Это займёт всего пару секунд.</p>
                  <span className="demo-disclaimer">Реального списания нет.</span>
                </motion.div>
              )}
              {step === "confirmation" && order && (
                <motion.div key="confirmation" className="checkout-confirmation" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
                  <div className="confirmation-icon">✓</div>
                  <span className="eyebrow">ДЕМО-ЗАКАЗ ПОДТВЕРЖДЁН</span>
                  <h2 id="checkout-title">ДО ВСТРЕЧИ<br /><i>В ЗАЛЕ.</i></h2>
                  <div className="confirmation-order">
                    <span>НОМЕР ДЕМО-ЗАКАЗА</span><strong>{order.orderId}</strong>
                    <div><small>Абонемент</small><b>{order.offer.title}</b></div>
                    <div><small>Условия</small><b>{order.offer.terms}</b></div>
                    <div><small>Сумма заявки</small><b>{formatPrice(order.offer.amount)} ₸</b></div>
                    <div><small>ФИО</small><b>{order.fullName}</b></div>
                    <div><small>Телефон</small><b>{order.phone}</b></div>
                    <div><small>Способ оплаты</small><b>{order.paymentMethod === "kaspi" ? "Kaspi" : "Halyk"} · демо</b></div>
                    <div className="confirmation-zero"><small>Списано</small><b>0 ₸ · демо-режим</b></div>
                  </div>
                  <div className="activation-note">
                    <strong>КАК АКТИВИРОВАТЬ АБОНЕМЕНТ</strong>
                    <p>Приходи в зал <b>Titan Arms</b>: {contacts.venue}. Подойди на стойку администрации и предъяви паспорт для сверки с базой. После проверки можно сразу приступать к тренировкам.</p>
                  </div>
                  <button className="button button--orange checkout-submit" onClick={onClose}>ЗАКРЫТЬ И ВЕРНУТЬСЯ НА САЙТ <ArrowIcon /></button>
                </motion.div>
              )}
            </AnimatePresence>
            {step !== "confirmation" && <div className="checkout-drawer__foot">Демо-оплата не подключена к банку и не списывает деньги.</div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCheckout = useCallback((selection) => {
    setOffer(selection || toMembershipOffer(unlimitedPlans.at(-1)));
  }, []);
  const closeCheckout = useCallback(() => setOffer(null), []);

  return (
    <>
      <div className={scrolled ? "app app--scrolled" : "app"}>
        <Header onBuy={() => openCheckout()} />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Pricing onBuy={openCheckout} />
          <Team onCoach={(coach) => setOffer({ id: `training-${coach}`, title: coach, type: "training" })} />
          <Gallery />
          <Instagram />
          <Contact onBuy={() => openCheckout()} />
        </main>
        <Footer />
      </div>
      <CheckoutDrawer offer={offer} onClose={closeCheckout} />
      <AnimatePresence>{loading && <Preloader onComplete={finishLoading} />}</AnimatePresence>
    </>
  );
}

export default App;
