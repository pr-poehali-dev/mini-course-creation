import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// Пастельная палитра
const C = {
  bg: "hsl(45,30%,96%)",          // слоновая кость — фон
  bgCard: "hsl(0,0%,100%)",       // белая карточка
  bgCard2: "hsl(45,25%,98%)",     // чуть тёплая карточка
  text: "hsl(220,15%,25%)",       // основной тёмный текст
  textMuted: "hsl(220,10%,52%)",  // приглушённый текст
  textLight: "hsl(220,10%,68%)",  // ещё светлее
  pink: "hsl(340,60%,70%)",       // пастельный розовый
  pinkLight: "hsl(340,60%,93%)",  // светло-розовый фон
  pinkBorder: "hsl(340,50%,84%)", // розовая рамка
  green: "hsl(150,40%,62%)",      // пастельный зелёный
  greenLight: "hsl(150,40%,92%)", // светло-зелёный фон
  greenBorder: "hsl(150,35%,80%)",// зелёная рамка
  blue: "hsl(200,55%,68%)",       // пастельный голубой
  blueLight: "hsl(200,55%,92%)",  // светло-голубой фон
  blueBorder: "hsl(200,45%,82%)", // голубая рамка
  border: "hsl(220,15%,88%)",     // общая рамка
};

const FEATURES = [
  {
    icon: "Zap",
    title: "В 30× быстрее",
    desc: "Сайт за минуты, а не недели. ИИ пишет код — вы видите результат мгновенно.",
    accent: C.pink,
    accentLight: C.pinkLight,
  },
  {
    icon: "Palette",
    title: "Дизайн-система",
    desc: "Стильные компоненты, адаптивная вёрстка и единый стиль из коробки.",
    accent: C.green,
    accentLight: C.greenLight,
  },
  {
    icon: "Code2",
    title: "Настоящий код",
    desc: "Не конструктор — чистый React + TypeScript. Можно доработать любой элемент.",
    accent: C.blue,
    accentLight: C.blueLight,
  },
  {
    icon: "Globe",
    title: "Деплой в один клик",
    desc: "Публикуем сайт сразу с доменом и SSL. Никаких сложных настроек.",
    accent: C.pink,
    accentLight: C.pinkLight,
  },
];

const STEPS = [
  { num: "01", title: "Описываете идею", desc: "Напишите, что должен делать ваш сайт — как другу, без технических деталей.", color: C.pink, bg: C.pinkLight },
  { num: "02", title: "ИИ строит сайт", desc: "Claude пишет код, создаёт дизайн и настраивает всё за секунды.", color: C.green, bg: C.greenLight },
  { num: "03", title: "Вы правите детали", desc: "Уточняйте цвета, тексты, поведение кнопок — в чате, без программирования.", color: C.blue, bg: C.blueLight },
  { num: "04", title: "Публикуете", desc: "Один клик — и ваш сайт в интернете с собственным адресом.", color: C.pink, bg: C.pinkLight },
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

function StatCard({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const { count, ref } = useCountUp(value, 1200);
  return (
    <div ref={ref} className="text-center p-6 rounded-2xl" style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
      <div className="font-display text-5xl md:text-6xl font-light leading-none" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm font-sans tracking-wide uppercase" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: C.bg, color: C.text }}>

      {/* Ambient pastel blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] left-[25%] w-[700px] h-[700px] rounded-full opacity-30 animate-glow-pulse"
          style={{ background: `radial-gradient(circle, ${C.pinkLight} 0%, transparent 70%)` }}
        />
        <div
          className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-25 animate-glow-pulse"
          style={{ background: `radial-gradient(circle, ${C.blueLight} 0%, transparent 70%)`, animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-20 animate-glow-pulse"
          style={{ background: `radial-gradient(circle, ${C.greenLight} 0%, transparent 70%)`, animationDelay: "3s" }}
        />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="font-display text-2xl font-semibold tracking-tight" style={{ color: C.text }}>поехали</span>
          <span className="ml-1 font-display text-2xl" style={{ color: C.pink }}>.dev</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: C.textMuted }}>
          <a href="#how" className="transition-colors hover:opacity-80">Как работает</a>
          <a href="#features" className="transition-colors hover:opacity-80">Возможности</a>
          <a href="#start" className="transition-colors hover:opacity-80">Цены</a>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
          style={{
            border: `1.5px solid ${C.pink}`,
            color: C.pink,
            background: C.pinkLight,
          }}
        >
          Войти
        </button>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 pt-16 pb-24 max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: C.greenLight,
            border: `1px solid ${C.greenBorder}`,
            color: C.green,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.green }} />
          Ваш личный разработчик — работает 24/7
        </div>

        <h1
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-light tracking-tight mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards", color: C.text }}
        >
          Запусти сайт
          <br />
          <span className="italic" style={{ color: C.pink }}>за минуту</span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-lg leading-relaxed mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards", color: C.textMuted }}
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
              background: C.pink,
              color: "#fff",
              boxShadow: `0 8px 32px ${C.pinkBorder}`,
            }}
          >
            Попробовать бесплатно
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all duration-200"
            style={{
              color: C.text,
              border: `1.5px solid ${C.border}`,
              background: C.bgCard,
            }}
          >
            <Icon name="Play" size={16} style={{ color: C.blue }} />
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
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                style={{
                  borderColor: C.bg,
                  background: [C.pinkLight, C.greenLight, C.blueLight, C.pinkLight, C.greenLight][i],
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <div className="text-sm" style={{ color: C.textMuted }}>
            <span className="font-semibold" style={{ color: C.text }}>2 400+</span> проектов запущено на этой неделе
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={14} className="fill-current" style={{ color: C.pink }} />
            ))}
            <span className="text-sm ml-1" style={{ color: C.textMuted }}>4.9 / 5.0</span>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="relative z-10 py-4 overflow-hidden" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bgCard }}>
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm shrink-0" style={{ color: C.textMuted }}>
              <span className="w-1 h-1 rounded-full" style={{ background: [C.pink, C.green, C.blue][i % 3] }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="relative z-10 px-6 md:px-12 py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard value={30} suffix="×" label="Быстрее разработки" color={C.pink} />
          <StatCard value={2400} suffix="+" label="Сайтов запущено" color={C.green} />
          <StatCard value={3} suffix=" мин" label="До первой версии" color={C.blue} />
          <StatCard value={99} suffix="%" label="Довольных клиентов" color={C.pink} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: C.green }}>Как это работает</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight" style={{ color: C.text }}>
            Четыре шага —<br />
            <span className="italic" style={{ color: C.pink }}>от идеи к сайту</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl transition-all duration-300 cursor-default hover:-translate-y-1"
              style={{
                background: step.bg,
                border: `1.5px solid transparent`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="font-display text-7xl font-light absolute top-4 right-6 select-none transition-colors"
                style={{ color: step.color, opacity: 0.18 }}
              >
                {step.num}
              </div>
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4 text-xs font-bold text-white" style={{ background: step.color }}>
                  {step.num}
                </div>
                <h3 className="font-sans font-semibold text-lg mb-3" style={{ color: C.text }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: C.blue }}>Возможности</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight" style={{ color: C.text }}>
            Всё что нужно,<br />
            <span className="italic" style={{ color: C.pink }}>ничего лишнего</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: C.bgCard,
                border: `1.5px solid ${C.border}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: f.accentLight }}
              >
                <Icon name={f.icon} fallback="Zap" size={20} style={{ color: f.accent }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: C.text }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO WINDOW */}
      <section className="relative z-10 px-6 md:px-12 py-12 max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: C.bgCard, border: `1.5px solid ${C.border}`, boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${C.border}`, background: C.bgCard2 }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0,70%,75%)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(40,80%,72%)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(120,40%,65%)" }} />
            </div>
            <div
              className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs flex items-center gap-2"
              style={{ background: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }}
            >
              <Icon name="Lock" size={10} style={{ color: C.green }} />
              poehali.dev/my-project
            </div>
          </div>

          {/* Fake content */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-20 h-2 rounded-full mb-4" style={{ background: C.pinkLight }} />
                <div className="w-full h-6 rounded-lg mb-3" style={{ background: C.blueLight }} />
                <div className="w-3/4 h-6 rounded-lg mb-6" style={{ background: C.blueLight }} />
                <div className="space-y-2 mb-8">
                  <div className="w-full h-3 rounded-full" style={{ background: C.bg }} />
                  <div className="w-5/6 h-3 rounded-full" style={{ background: C.bg }} />
                  <div className="w-4/6 h-3 rounded-full" style={{ background: C.bg }} />
                </div>
                <div className="flex gap-3">
                  <div
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-white"
                    style={{ background: C.pink }}
                  >
                    Начать
                  </div>
                  <div
                    className="px-5 py-2.5 rounded-full text-xs"
                    style={{ border: `1px solid ${C.border}`, color: C.textMuted }}
                  >
                    Узнать больше
                  </div>
                </div>
              </div>
              <div
                className="rounded-2xl aspect-video flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${C.pinkLight} 0%, ${C.blueLight} 50%, ${C.greenLight} 100%)` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>Ваш сайт здесь</div>
                </div>
              </div>
            </div>
          </div>

          {/* Build time bar */}
          <div
            className="px-8 py-3 flex items-center gap-3"
            style={{ borderTop: `1px solid ${C.border}`, background: C.greenLight }}
          >
            <Icon name="Zap" size={14} style={{ color: C.green }} />
            <span className="text-xs" style={{ color: C.textMuted }}>
              Сайт сгенерирован за <span className="font-medium" style={{ color: C.green }}>47 секунд</span>
            </span>
            <div className="flex-1 h-1.5 rounded-full ml-2" style={{ background: C.border }}>
              <div
                className="h-1.5 rounded-full"
                style={{ width: "100%", background: `linear-gradient(90deg, ${C.green}, ${C.blue})` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="relative z-10 px-6 md:px-12 py-32 max-w-4xl mx-auto text-center">
        <h2
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight mb-6"
          style={{ color: C.text }}
        >
          Готовы запустить<br />
          <span className="italic" style={{ color: C.pink }}>свой проект?</span>
        </h2>
        <p className="text-lg mb-12 max-w-md mx-auto" style={{ color: C.textMuted }}>
          Первый сайт — бесплатно. Без регистрации карты.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="ваш@email.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded-full text-sm outline-none transition-colors"
            style={{
              background: C.bgCard,
              color: C.text,
              border: `1.5px solid ${C.border}`,
            }}
            onFocus={(e) => e.target.style.borderColor = C.pink}
            onBlur={(e) => e.target.style.borderColor = C.border}
          />
          <button
            onClick={() => setSubmitted(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 text-white"
            style={{
              background: C.pink,
              boxShadow: `0 4px 20px ${C.pinkBorder}`,
            }}
          >
            {submitted ? "✓ Записались!" : "Попробовать"}
          </button>
        </div>
        <p className="mt-4 text-xs" style={{ color: C.textLight }}>
          Уже 2 400+ проектов запущено. Присоединяйтесь.
        </p>
      </section>

      {/* FOOTER */}
      <footer
        className="relative z-10 px-6 md:px-12 py-10"
        style={{ borderTop: `1px solid ${C.border}`, background: C.bgCard }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-display text-xl" style={{ color: C.text }}>
              поехали<span style={{ color: C.pink }}>.dev</span>
            </span>
          </div>
          <div className="flex gap-8 text-sm" style={{ color: C.textMuted }}>
            <a href="#" className="hover:opacity-70 transition-opacity">Условия</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Политика</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Контакты</a>
          </div>
          <div className="text-xs" style={{ color: C.textLight }}>© 2025 poehali.dev</div>
        </div>
      </footer>
    </div>
  );
}