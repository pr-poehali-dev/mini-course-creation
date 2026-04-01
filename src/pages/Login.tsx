import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

// Пастельная палитра (синхронизирована с Index.tsx)
const C = {
  bg: "hsl(45,30%,96%)",
  bgCard: "hsl(0,0%,100%)",
  text: "hsl(220,15%,25%)",
  textMuted: "hsl(220,10%,52%)",
  textLight: "hsl(220,10%,68%)",
  pink: "hsl(340,60%,70%)",
  pinkLight: "hsl(340,60%,93%)",
  pinkBorder: "hsl(340,50%,84%)",
  green: "hsl(150,40%,62%)",
  greenLight: "hsl(150,40%,92%)",
  greenBorder: "hsl(150,35%,80%)",
  blue: "hsl(200,55%,68%)",
  blueLight: "hsl(200,55%,92%)",
  border: "hsl(220,15%,88%)",
};

type Tab = "login" | "register";

export default function Login() {
  const [tab, setTab] = useState<Tab>("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPassword) {
      setLoginError("Заполните все поля");
      return;
    }
    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoginLoading(false);
    setLoginError("Неверный email или пароль");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regName || !regEmail || !regPassword) {
      setRegError("Заполните все поля");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Пароль должен содержать минимум 6 символов");
      return;
    }
    setRegLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRegLoading(false);
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col overflow-x-hidden"
      style={{ background: C.bg, color: C.text }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] left-[25%] w-[700px] h-[700px] rounded-full opacity-25 animate-glow-pulse"
          style={{
            background: `radial-gradient(circle, ${C.pinkLight} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 animate-glow-pulse"
          style={{
            background: `radial-gradient(circle, ${C.blueLight} 0%, transparent 70%)`,
            animationDelay: "1.5s",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🚀</span>
          <span
            className="font-display text-2xl font-semibold tracking-tight"
            style={{ color: C.text }}
          >
            поехали
          </span>
          <span className="ml-1 font-display text-2xl" style={{ color: C.pink }}>
            .dev
          </span>
        </Link>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-md rounded-3xl p-8 md:p-10 shadow-sm"
          style={{
            background: C.bgCard,
            border: `1px solid ${C.border}`,
          }}
        >
          {/* Tabs */}
          <div
            className="flex rounded-2xl p-1 mb-8 gap-1"
            style={{ background: C.bg }}
          >
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={
                  tab === t
                    ? {
                        background: C.bgCard,
                        color: C.text,
                        boxShadow: `0 1px 4px ${C.border}`,
                      }
                    : { color: C.textMuted }
                }
              >
                {t === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-5 animate-fade-in" style={{ animationFillMode: "forwards" }}>
              <div>
                <h2
                  className="font-display text-3xl font-light tracking-tight mb-1"
                  style={{ color: C.text }}
                >
                  С возвращением
                </h2>
                <p className="text-sm" style={{ color: C.textMuted }}>
                  Войдите в свой аккаунт
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: C.textMuted }}>
                  Email
                </label>
                <div className="relative">
                  <Icon
                    name="Mail"
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                    style={{
                      background: C.bg,
                      border: `1.5px solid ${C.border}`,
                      color: C.text,
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: C.textMuted }}>
                    Пароль
                  </label>
                  <button
                    type="button"
                    className="text-xs transition-opacity hover:opacity-70"
                    style={{ color: C.pink }}
                  >
                    Забыли пароль?
                  </button>
                </div>
                <div className="relative">
                  <Icon
                    name="Lock"
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                    style={{
                      background: C.bg,
                      border: `1.5px solid ${C.border}`,
                      color: C.text,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                    style={{ color: C.textLight }}
                  >
                    <Icon name={showLoginPassword ? "EyeOff" : "Eye"} size={16} />
                  </button>
                </div>
              </div>

              {/* Error */}
              {loginError && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm animate-fade-in"
                  style={{
                    background: "hsl(0,70%,96%)",
                    border: "1.5px solid hsl(0,60%,88%)",
                    color: "hsl(0,65%,55%)",
                    animationFillMode: "forwards",
                  }}
                >
                  <Icon name="AlertCircle" size={15} />
                  {loginError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loginLoading}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                style={{
                  background: C.pink,
                  color: "#fff",
                  boxShadow: `0 6px 24px ${C.pinkBorder}`,
                }}
              >
                {loginLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Входим…
                  </>
                ) : (
                  <>
                    Войти
                    <Icon name="ArrowRight" size={16} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: C.border }} />
                <span className="text-xs" style={{ color: C.textLight }}>или</span>
                <div className="flex-1 h-px" style={{ background: C.border }} />
              </div>

              {/* OAuth buttons */}
              <div className="flex flex-col gap-3">
                <OAuthButton icon="Github" label="Войти через GitHub" />
                <OAuthButton icon="Chrome" label="Войти через Google" />
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="flex flex-col gap-5 animate-fade-in" style={{ animationFillMode: "forwards" }}>
              <div>
                <h2
                  className="font-display text-3xl font-light tracking-tight mb-1"
                  style={{ color: C.text }}
                >
                  Создать аккаунт
                </h2>
                <p className="text-sm" style={{ color: C.textMuted }}>
                  Начните бесплатно — без карты
                </p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: C.textMuted }}>
                  Имя
                </label>
                <div className="relative">
                  <Icon
                    name="User"
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Ваше имя"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                    style={{
                      background: C.bg,
                      border: `1.5px solid ${C.border}`,
                      color: C.text,
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: C.textMuted }}>
                  Email
                </label>
                <div className="relative">
                  <Icon
                    name="Mail"
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                    style={{
                      background: C.bg,
                      border: `1.5px solid ${C.border}`,
                      color: C.text,
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: C.textMuted }}>
                  Пароль
                </label>
                <div className="relative">
                  <Icon
                    name="Lock"
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Минимум 6 символов"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                    style={{
                      background: C.bg,
                      border: `1.5px solid ${C.border}`,
                      color: C.text,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                    style={{ color: C.textLight }}
                  >
                    <Icon name={showRegPassword ? "EyeOff" : "Eye"} size={16} />
                  </button>
                </div>
                {/* Password strength */}
                {regPassword.length > 0 && (
                  <PasswordStrength password={regPassword} />
                )}
              </div>

              {/* Error */}
              {regError && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm animate-fade-in"
                  style={{
                    background: "hsl(0,70%,96%)",
                    border: "1.5px solid hsl(0,60%,88%)",
                    color: "hsl(0,65%,55%)",
                    animationFillMode: "forwards",
                  }}
                >
                  <Icon name="AlertCircle" size={15} />
                  {regError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={regLoading}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                style={{
                  background: C.pink,
                  color: "#fff",
                  boxShadow: `0 6px 24px ${C.pinkBorder}`,
                }}
              >
                {regLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Создаём аккаунт…
                  </>
                ) : (
                  <>
                    Создать аккаунт
                    <Icon name="ArrowRight" size={16} />
                  </>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-center leading-relaxed" style={{ color: C.textLight }}>
                Регистрируясь, вы соглашаетесь с{" "}
                <span className="underline cursor-pointer hover:opacity-70" style={{ color: C.textMuted }}>
                  условиями использования
                </span>{" "}
                и{" "}
                <span className="underline cursor-pointer hover:opacity-70" style={{ color: C.textMuted }}>
                  политикой конфиденциальности
                </span>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div className="relative z-10 text-center pb-8">
        <p className="text-xs" style={{ color: C.textLight }}>
          © 2025 поехали.dev — ваш ИИ-разработчик
        </p>
      </div>
    </div>
  );
}

// ─── OAuth Button ─────────────────────────────────────────────────────────────
function OAuthButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 active:scale-95"
      style={{
        background: C.bg,
        border: `1.5px solid ${C.border}`,
        color: C.text,
      }}
    >
      <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={16} style={{ color: C.textMuted }} />
      {label}
    </button>
  );
}

// ─── Password Strength ────────────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const score = getPasswordScore(password);
  const labels = ["Слабый", "Средний", "Хороший", "Сильный"];
  const colors = [
    "hsl(0,65%,65%)",
    "hsl(35,80%,60%)",
    "hsl(150,45%,55%)",
    C.green,
  ];

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{
              background: i < score ? colors[score - 1] : C.border,
            }}
          />
        ))}
      </div>
      <span className="text-xs font-medium w-14 text-right" style={{ color: colors[score - 1] || C.textLight }}>
        {score > 0 ? labels[score - 1] : ""}
      </span>
    </div>
  );
}

function getPasswordScore(password: string): number {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) || /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}