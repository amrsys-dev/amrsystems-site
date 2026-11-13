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
      <Link href="/" aria-label="AMR"><img className="mono" src="/amr-logo.svg" width={120} height={52} alt="AMR" /></Link>
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
  return <main>
    <section className="hero wrap"><img className="heroimg" src="/amr-hero.webp" width={798} height={320} alt="AMR Systems" />
      <h1>{t.tagline}</h1><p className="lead">{t.sub}</p></section>
    {SLUGS.map((s, i) => <section key={s} className={"tile " + (i % 2 ? "alt" : "")}><div className="wrap tin">
      <Ico id={META[s].icon} s={72} /><Badge s={s} /><h2 className="pt">{META[s].name}</h2><p className="ptag">{t.p[s].tag}</p><p className="lead">{t.p[s].value}</p>
      <div className="ctas"><Link className="btn s" href={"/" + s}>{t.learn}</Link><Launch s={s} /></div></div></section>)}
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
