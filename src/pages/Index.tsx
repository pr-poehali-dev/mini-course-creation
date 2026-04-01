import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const FEATURES = [
  {
    icon: "Zap",
    title: "В 30× быстрее",
    desc: "Сайт за минуты, а не недели. ИИ пишет код — вы видите результат мгновенно.",
  },
  {
    icon: "Palette",
    title: "Дизайн-система",
    desc: "Стильные компоненты, адаптивная вёрстка и единый стиль из коробки.",
  },
  {
    icon: "Code2",
    title: "Настоящий код",
    desc: "Не конструктор — чистый React + TypeScript. Можно доработать любой элемент.",
  },
  {
    icon: "Globe",
    title: "Деплой в один клик",
    desc: "Публикуем сайт сразу с доменом и SSL. Никаких сложных настроек.",
  },
];

const STEPS = [
  { num: "01", title: "Описываете идею", desc: "Напишите, что должен делать ваш сайт — как другу, без технических деталей." },
  { num: "02", title: "ИИ строит сайт", desc: "Claude пишет код, создаёт дизайн и настраивает всё за секунды." },
  { num: "03", title: "Вы правите детали", desc: "Уточняйте цвета, тексты, поведение кнопок — в чате, без программирования." },
  { num: "04", title: "Публикуете", desc: "Один клик — и ваш сайт в интернете с собственным адресом." },
];

const TICKER_ITEMS = [
  "Лендинг за 3 минуты",
  "Интернет-магазин",
  "Портфолио",
  "Корпоративный сайт",
  "Форма заявки",
  "Личный блог",
  "Каталог товаров",
  "Запись на услуги",
];

function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 1200);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-light text-[hsl(38,95%,54%)] leading-none">
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm text-[hsl(30,10%,55%)] font-sans tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="min-h-screen bg-[hsl(16,12%,6%)] text-[hsl(40,20%,94%)] font-sans overflow-x-hidden">
      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, hsl(38,95%,54%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-10 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, hsl(38,95%,54%) 0%, transparent 70%)", animationDelay: "1.5s" }}
        />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="font-display text-2xl font-semibold tracking-tight text-[hsl(40,20%,94%)]">поехали</span>
          <span className="ml-1 text-[hsl(38,95%,54%)] font-display text-2xl">.dev</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[hsl(30,10%,55%)]">
          <a href="#how" className="hover:text-[hsl(40,20%,94%)] transition-colors">Как работает</a>
          <a href="#features" className="hover:text-[hsl(40,20%,94%)] transition-colors">Возможности</a>
          <a href="#start" className="hover:text-[hsl(40,20%,94%)] transition-colors">Цены</a>
        </div>
        <button className="hidden md:block px-5 py-2 rounded-full border border-[hsl(38,95%,54%)] text-[hsl(38,95%,54%)] text-sm font-medium hover:bg-[hsl(38,95%,54%)] hover:text-[hsl(16,12%,6%)] transition-all duration-200">
          Войти
        </button>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 pt-16 pb-24 max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(251,191,36,0.1)",
            border: "1px solid rgba(251,191,36,0.25)",
            color: "hsl(38,95%,54%)",
            animationDelay: "0s",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(38,95%,54%)] animate-pulse" />
          Ваш личный разработчик — работает 24/7
        </div>

        <h1
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-light tracking-tight mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          Запусти сайт
          <br />
          <span className="italic text-[hsl(38,95%,54%)]">за минуту</span>
        </h1>

        <p
          className="text-lg md:text-xl text-[hsl(30,10%,60%)] max-w-lg leading-relaxed mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          Просто опишите идею — ИИ напишет код, создаст дизайн и опубликует сайт.
          Без программирования. Без конструкторов. Настоящий результат.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <button
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-[1.03] active:scale-95"
            style={{
              background: "hsl(38,95%,54%)",
              color: "hsl(16,12%,6%)",
              boxShadow: "0 0 40px rgba(251,191,36,0.3)",
            }}
          >
            Попробовать бесплатно
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium text-[hsl(40,20%,94%)] border border-[hsl(20,8%,20%)] hover:border-[hsl(20,8%,35%)] transition-all duration-200">
            <Icon name="Play" size={16} className="text-[hsl(38,95%,54%)]" />
            Смотреть демо
          </button>
        </div>

        {/* Social proof */}
        <div
          className="mt-16 flex flex-wrap items-center gap-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <div className="flex -space-x-2">
            {["🧑‍💻", "👩‍🎨", "🧑‍🚀", "👩‍💼", "🧑‍🔬"].map((emoji, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[hsl(16,12%,6%)] flex items-center justify-center text-sm"
                style={{ background: `hsl(${20 + i * 15},15%,16%)` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <div className="text-sm text-[hsl(30,10%,55%)]">
            <span className="text-[hsl(40,20%,94%)] font-semibold">2 400+</span> проектов запущено на этой неделе
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={14} className="text-[hsl(38,95%,54%)] fill-current" />
            ))}
            <span className="text-sm text-[hsl(30,10%,55%)] ml-1">4.9 / 5.0</span>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="relative z-10 border-y border-[hsl(20,8%,14%)] py-4 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm text-[hsl(30,10%,45%)] shrink-0">
              <span className="w-1 h-1 rounded-full bg-[hsl(38,95%,54%)]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="relative z-10 px-6 md:px-12 py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCard value={30} suffix="×" label="Быстрее разработки" />
          <StatCard value={2400} suffix="+" label="Сайтов запущено" />
          <StatCard value={3} suffix=" мин" label="До первой версии" />
          <StatCard value={99} suffix="%" label="Довольных клиентов" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[hsl(38,95%,54%)] text-sm font-medium uppercase tracking-widest mb-4">Как это работает</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight">
            Четыре шага —<br />
            <span className="italic">от идеи к сайту</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl border border-[hsl(20,8%,14%)] hover:border-[hsl(38,95%,54%,0.3)] transition-all duration-300 cursor-default"
              style={{ background: "hsl(20,10%,9%)" }}
            >
              <div
                className="text-[hsl(38,95%,54%,0.2)] font-display text-7xl font-light absolute top-4 right-6 select-none group-hover:text-[hsl(38,95%,54%,0.35)] transition-colors"
                style={{ color: "rgba(251,191,36,0.12)" }}
              >
                {step.num}
              </div>
              <div className="relative">
                <h3 className="font-sans font-semibold text-lg text-[hsl(40,20%,94%)] mb-3">{step.title}</h3>
                <p className="text-[hsl(30,10%,55%)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[hsl(38,95%,54%)] text-sm font-medium uppercase tracking-widest mb-4">Возможности</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight">
            Всё что нужно,<br />
            <span className="italic">ничего лишнего</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-[hsl(20,8%,14%)] hover:border-[rgba(251,191,36,0.25)] transition-all duration-300 hover:-translate-y-1"
              style={{ background: "hsl(20,10%,9%)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(251,191,36,0.1)" }}
              >
                <Icon name={f.icon} fallback="Zap" size={20} className="text-[hsl(38,95%,54%)]" />
              </div>
              <h3 className="font-semibold text-[hsl(40,20%,94%)] mb-2">{f.title}</h3>
              <p className="text-sm text-[hsl(30,10%,50%)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO WINDOW */}
      <section className="relative z-10 px-6 md:px-12 py-12 max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden border border-[hsl(20,8%,16%)]"
          style={{ background: "hsl(20,10%,8%)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[hsl(20,8%,14%)]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(40,80%,55%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(120,50%,50%)]" />
            </div>
            <div
              className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs text-[hsl(30,10%,45%)] flex items-center gap-2"
              style={{ background: "hsl(20,8%,12%)" }}
            >
              <Icon name="Lock" size={10} className="text-[hsl(38,95%,54%)]" />
              poehali.dev/my-project
            </div>
          </div>

          {/* Fake content */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-20 h-2 rounded bg-[hsl(20,8%,16%)] mb-4" />
                <div className="w-full h-6 rounded bg-[hsl(20,8%,16%)] mb-3" />
                <div className="w-3/4 h-6 rounded bg-[hsl(20,8%,16%)] mb-6" />
                <div className="space-y-2 mb-8">
                  <div className="w-full h-3 rounded bg-[hsl(20,8%,13%)]" />
                  <div className="w-5/6 h-3 rounded bg-[hsl(20,8%,13%)]" />
                  <div className="w-4/6 h-3 rounded bg-[hsl(20,8%,13%)]" />
                </div>
                <div className="flex gap-3">
                  <div
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-[hsl(16,12%,6%)]"
                    style={{ background: "hsl(38,95%,54%)" }}
                  >
                    Начать
                  </div>
                  <div className="px-5 py-2.5 rounded-full text-xs border border-[hsl(20,8%,20%)] text-[hsl(30,10%,55%)]">
                    Узнать больше
                  </div>
                </div>
              </div>
              <div
                className="rounded-2xl aspect-video flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(20,10%,12%) 0%, hsl(30,12%,15%) 100%)" }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <div className="text-xs text-[hsl(30,10%,45%)]">Ваш сайт здесь</div>
                </div>
              </div>
            </div>
          </div>

          {/* Build time bar */}
          <div
            className="px-8 py-3 flex items-center gap-3 border-t border-[hsl(20,8%,14%)]"
            style={{ background: "rgba(251,191,36,0.04)" }}
          >
            <Icon name="Zap" size={14} className="text-[hsl(38,95%,54%)]" />
            <span className="text-xs text-[hsl(30,10%,50%)]">
              Сайт сгенерирован за <span className="text-[hsl(38,95%,54%)] font-medium">47 секунд</span>
            </span>
            <div className="flex-1 h-1 rounded-full bg-[hsl(20,8%,14%)] ml-2">
              <div
                className="h-1 rounded-full"
                style={{ width: "100%", background: "hsl(38,95%,54%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="relative z-10 px-6 md:px-12 py-32 max-w-4xl mx-auto text-center">
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight mb-6">
          Готовы запустить<br />
          <span className="italic text-[hsl(38,95%,54%)]">свой проект?</span>
        </h2>
        <p className="text-[hsl(30,10%,55%)] text-lg mb-12 max-w-md mx-auto">
          Первый сайт — бесплатно. Без регистрации карты.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="ваш@email.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded-full text-sm outline-none text-[hsl(40,20%,94%)] placeholder-[hsl(30,10%,40%)] border border-[hsl(20,8%,18%)] focus:border-[hsl(38,95%,54%)] transition-colors"
            style={{ background: "hsl(20,10%,10%)" }}
          />
          <button
            onClick={() => setSubmitted(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
            style={{
              background: "hsl(38,95%,54%)",
              color: "hsl(16,12%,6%)",
            }}
          >
            {submitted ? "✓ Записались!" : "Попробовать"}
          </button>
        </div>
        <p className="mt-4 text-xs text-[hsl(30,10%,35%)]">
          Уже 2 400+ проектов запущено. Присоединяйтесь.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[hsl(20,8%,12%)] px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-display text-xl text-[hsl(40,20%,94%)]">поехали<span className="text-[hsl(38,95%,54%)]">.dev</span></span>
          </div>
          <div className="flex gap-8 text-sm text-[hsl(30,10%,40%)]">
            <a href="#" className="hover:text-[hsl(40,20%,94%)] transition-colors">Условия</a>
            <a href="#" className="hover:text-[hsl(40,20%,94%)] transition-colors">Политика</a>
            <a href="#" className="hover:text-[hsl(40,20%,94%)] transition-colors">Контакты</a>
          </div>
          <div className="text-xs text-[hsl(30,10%,30%)]">© 2025 poehali.dev</div>
        </div>
      </footer>
    </div>
  );
}