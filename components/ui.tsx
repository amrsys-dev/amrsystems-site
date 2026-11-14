"use client";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { LANGS, META, SLUGS, T, type Lang, type Slug } from "@/lib/i18n";

const TH = ["light", "dark", "desert", "rose"];
const Ctx = createContext<{ l: Lang; setL: (l: Lang) => void; th: string; setTh: (t: string) => void; apps: Record<string, { url?: string }> }>(null as any);
export const useT = () => { const c = useContext(Ctx); return { ...c, t: T[c.l] }; };
const store = (k: string, v?: string) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch { return null; } };

export function Providers({ children }: { children: React.ReactNode }) {
  const [l, sl] = useState<Lang>("ru"); const [th, st] = useState("light"); const [apps, setApps] = useState({});
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const ql = (q.get("l") || store("amr-l") || "ru") as Lang; if (T[ql]) sl(ql);
    const qt = q.get("t") || store("amr-t") || "light"; if (TH.includes(qt)) st(qt);
    fetch("/apps.json").then(r => r.json()).then(setApps).catch(() => {});
  }, []);
  useEffect(() => { document.documentElement.lang = l; document.documentElement.dir = l === "ar" ? "rtl" : "ltr"; }, [l]);
  const setL = (x: Lang) => { sl(x); store("amr-l", x); };
  const setTh = (x: string) => { st(x); store("amr-t", x); };
  return <Ctx.Provider value={{ l, setL, th, setTh, apps }}><div className="app" data-th={th === "light" ? undefined : th}>{children}</div></Ctx.Provider>;
}

export const Ico = ({ id, s = 44 }: { id: string; s?: number }) => <svg className="bi" width={s} height={s} aria-hidden><use href={"#" + id} /></svg>;

export function Nav() {
  const { t, l, setL, th, setTh } = useT(); const [m, setM] = useState<"" | "p" | "l">("");
  useEffect(() => { const c = () => setM(""); document.addEventListener("click", c); return () => document.removeEventListener("click", c); }, []);
  const flag = LANGS.find(x => x[0] === l)![1];
  return (
    <header className="hdr"><div className="wrap bar">
      <Link href="/" aria-label="AMR"><img className="mono" src="/amr-monogram.jpg" width={104} height={64} alt="AMR — official monogram" /></Link>
      <nav className="links">
        <div className="dd"><button className="nl" onClick={e => { e.stopPropagation(); setM(m === "p" ? "" : "p"); }}>{t.products} ▾</button>
          {m === "p" && <div className="menu pm">{SLUGS.map(s => <Link key={s} href={"/" + s} className="mi"><Ico id={META[s].icon} s={30} /><span>{META[s].name}</span></Link>)}</div>}
        </div>
        <Link className="nl hide-s" href="/signin">{t.signin}</Link>
      </nav>
      <div className="hr">
        <Link className="rb" href="/account" aria-label={t.account}><Ico id="i-profile" s={24} /></Link>
        <button className="rb lng" aria-label="Language" onClick={e => { e.stopPropagation(); setM(m === "l" ? "" : "l"); }}>{flag}</button>
        <button className="rb pal" aria-label="Theme" onClick={() => setTh(TH[(TH.indexOf(th) + 1) % 4])} />
        {m === "l" && <div className="menu lm">{LANGS.map(([k, f, n]) => <button key={k} className="mi" onClick={() => setL(k)}>{f} {n}</button>)}</div>}
      </div>
    </div></header>
  );
}

export function Footer() {
  const { t } = useT();
  return <footer className="ft"><div className="wrap">
    <div className="fcols"><div><b>{t.products}</b>{SLUGS.map(s => <Link key={s} href={"/" + s}>{META[s].name}</Link>)}</div>
      <div><b>Telegram</b><a href="https://t.me/amrservic" target="_blank" rel="noopener">AMR SERVICE</a><a href="https://t.me/amrsystems" target="_blank" rel="noopener">AMR Systems</a><a href="https://t.me/AMRPUB" target="_blank" rel="noopener">AMR PUB</a></div></div>
    <p className="copy">© 2026 AMR Systems</p></div></footer>;
}

export const Badge = ({ s }: { s: Slug }) => { const { t } = useT(); return <span className="chip">{META[s].status === "live" ? t.open : META[s].status === "dev" ? t.dev : t.soon}</span>; };

export function Launch({ s }: { s: Slug }) {
  const { t, apps } = useT(); const url = apps[s]?.url;
  return url ? <a className="btn" href={url} rel="noopener">{t.open}</a> : <span className="btn off" aria-disabled="true">{t.open} · {t.soon}</span>;
}

export function Home() {
  const { t } = useT();
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("amr-intro-seen");
    if (!seen && !reduced) setIntro(true);
  }, []);
  useEffect(() => {
    if (!intro) return;
    const timer = window.setTimeout(() => {
      setIntro(false);
      window.sessionStorage.setItem("amr-intro-seen", "1");
    }, 4300);
    return () => window.clearTimeout(timer);
  }, [intro]);
  const closeIntro = () => {
    setIntro(false);
    window.sessionStorage.setItem("amr-intro-seen", "1");
  };
  return <main className="home">
    {intro && <div className="intro" role="dialog" aria-label="AMR Systems introduction">
      <div className="intro-orbit" />
      <img src="/amr-monogram-glow.jpg" alt="" className="intro-mark" />
      <div className="intro-name">AMR <span>SYSTEMS</span></div>
      <div className="intro-line" />
      <button className="intro-skip" onClick={closeIntro}>{t.home.introSkip} <span>→</span></button>
    </div>}
    <section className="hero hero-main">
      <div className="hero-grid" />
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> {t.home.eyebrow}</div>
        <img className="hero-monogram" src="/amr-monogram.jpg" width={460} height={460} alt="AMR official monogram" />
        <p className="hero-kicker">{t.home.welcome}</p>
        <h1>AMR <span>SYSTEMS</span></h1>
        <p className="hero-statement">{t.home.statement}</p>
        <p className="hero-description">{t.home.description}</p>
        <div className="hero-actions">
          <a className="btn hero-primary" href="#ecosystem">{t.home.explore} <span>↘</span></a>
          <a className="hero-secondary" href="#about">{t.home.discover} <span>→</span></a>
        </div>
      </div>
      <div className="hero-foot"><span>{t.home.foot[0]}</span><i /><span>{t.home.foot[1]}</span><i /><span>{t.home.foot[2]}</span></div>
    </section>

    <section className="manifesto" id="about">
      <div className="wrap manifesto-inner">
        <p className="section-index">{t.home.principle}</p>
        <h2>{t.home.principleTitle}<br/><em>{t.home.principleEmphasis}</em></h2>
        <p>{t.home.principleBody}</p>
      </div>
    </section>

    <section className="ecosystem-section" id="ecosystem">
      <div className="wrap">
        <div className="section-head">
          <div><p className="section-index">{t.home.ecosystem}</p><h2>{t.home.ecosystemTitle} <em>{t.home.ecosystemEmphasis}</em></h2></div>
          <p>{t.home.ecosystemBody}</p>
        </div>
        <div className="product-grid">
          {SLUGS.map((s, i) => <article key={s} className={`product-card product-card-${i}`}>
            <div className="product-card-top"><span className="product-number">0{i + 1}</span><Badge s={s} /></div>
            <div className="product-symbol"><Ico id={META[s].icon} s={48} /></div>
            <h3>{META[s].name}</h3>
            <p className="product-tagline">{t.p[s].tag}</p>
            <p className="product-description">{t.p[s].value}</p>
            <div className="product-links"><Link href={`/${s}`}>{t.learn} <span>↗</span></Link><Launch s={s} /></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="vision-strip">
      <div className="wrap vision-inner">
        <div><p className="section-index">{t.home.approach}</p><h2>{t.home.approachTitle}<br/>{t.home.approachEmphasis}</h2></div>
        <div className="vision-steps"><div><b>01</b><span>{t.home.steps[0]}</span></div><i /> <div><b>02</b><span>{t.home.steps[1]}</span></div><i /> <div><b>03</b><span>{t.home.steps[2]}</span></div><i /> <div><b>04</b><span>{t.home.steps[3]}</span></div></div>
      </div>
    </section>

    <section className="closing-cta"><div className="wrap"><img src="/amr-monogram.jpg" alt="AMR" /><p>AMR SYSTEMS</p><h2>{t.home.closingTitle}<br/><em>{t.home.closingEmphasis}</em></h2><a href="#ecosystem">{t.home.closingLink} <span>↗</span></a></div></section>
  </main>;
}

export function Product({ s }: { s: Slug }) {
  const { t } = useT(); const p = t.p[s];
  return <main>
    <div className="sub"><div className="wrap"><b>{META[s].name}</b><Badge s={s} /></div></div>
    <section className="hero wrap"><Ico id={META[s].icon} s={96} /><h1>{META[s].name}</h1><p className="ptag">{p.tag}</p><p className="lead">{p.value}</p>
      <div className="ctas one"><Launch s={s} /></div></section>
    <section className="wrap"><h2>{t.features}</h2><div className="grid">{p.f.map(([a, b]) => <div key={a} className="card feat"><b>{a}</b><p>{b}</p></div>)}</div></section>
    <section className="wrap more"><Link className="btn s" href="/">{t.explore}</Link></section>
  </main>;
}

export function AuthForm({ mode, enabled, google }: { mode: "in" | "up"; enabled: boolean; google: boolean }) {
  const { t } = useT(); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!enabled) return; setBusy(true); setErr("");
    const fd = new FormData(e.currentTarget); const email = String(fd.get("email")), password = String(fd.get("password"));
    const { signIn } = await import("next-auth/react");
    if (mode === "up") {
      const r = await fetch("/api/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password, name: fd.get("name") }) });
      if (!r.ok) { setBusy(false); setErr(r.status === 409 ? "Email already registered" : "Error"); return; }
    }
    const r = await signIn("credentials", { email, password, redirect: false });
    setBusy(false); if (r?.error) setErr("Wrong email or password"); else location.href = "/account";
  }
  const g = async () => { const { signIn } = await import("next-auth/react"); signIn("google", { callbackUrl: "/account" }); };
  return <main className="wrap auth"><div className="card af">
    <h1>{mode === "in" ? t.signin : t.signup}</h1>
    {!enabled && <p className="chip warn">{t.authoff}</p>}
    <form onSubmit={submit}>
      {mode === "up" && <label>{t.name}<input name="name" autoComplete="name" disabled={!enabled} /></label>}
      <label>{t.email}<input name="email" type="email" required autoComplete="email" disabled={!enabled} /></label>
      <label>{t.password}<input name="password" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} disabled={!enabled} placeholder={t.pwhint} /></label>
      {err && <p className="err">{err}</p>}
      <button className={"btn" + (enabled ? "" : " off")} disabled={!enabled || busy}>{mode === "in" ? t.signin : t.signup}</button>
    </form>
    <p className="or">{t.or}</p>
    <button className={"btn s" + (google ? "" : " off")} disabled={!google} onClick={g}>G · {t.google}</button>
    <p className="sw"><Link href={mode === "in" ? "/signup" : "/signin"}>{mode === "in" ? t.noacc : t.haveacc}</Link></p>
  </div></main>;
}

export function AccountView({ email, enabled }: { email?: string | null; enabled: boolean }) {
  const { t } = useT();
  return <main className="wrap auth"><div className="card af"><Ico id="i-profile" s={64} /><h1>{t.account}</h1>
    {!enabled ? <p className="chip warn">{t.authoff}</p> : email ? <><p className="lead">{t.hello} <b>{email}</b></p>
      <button className="btn s" onClick={async () => { const { signOut } = await import("next-auth/react"); signOut({ callbackUrl: "/" }); }}>{t.signout}</button></> : null}
  </div></main>;
}
