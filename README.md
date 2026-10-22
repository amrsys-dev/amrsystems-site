# AMR Systems — ecosystem portal (Next.js 15 + Auth.js v5)

Pages: `/` (ecosystem), `/safar`, `/hub`, `/3d-constructor`, `/vision`, `/materials`, `/signin`, `/signup`, `/account`.
Languages RU (default) / UZ / AR (RTL) / EN, 4 themes (v5 design system). Choice saved in localStorage; `?l=` and `?t=` work too.

## Plug in a PWA
Edit `public/apps.json` → set `"url"` for a product. The "Открыть приложение" button becomes active. Redeploy.

## Enable accounts (currently OFF: AUTH_ENABLED=false → auth API returns 503, forms are disabled)
1. **Database (free):** Vercel dashboard → project `amrsystems` → Storage → Create → Neon (Free plan). This injects `DATABASE_URL`.
   Then open the Neon SQL editor and run `schema.sql`.
2. **Secret:** add env `AUTH_SECRET` = output of `openssl rand -base64 32`; `AUTH_URL=https://amrsystems.vercel.app`.
3. **Google login (optional):** console.cloud.google.com → new project → APIs & Services → OAuth consent screen (External, app name AMR Systems, support email) →
   Credentials → Create OAuth client ID → Web application →
   Authorized JavaScript origin: `https://amrsystems.vercel.app`
   Authorized redirect URI: `https://amrsystems.vercel.app/api/auth/callback/google`
   → put Client ID / Secret into `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
4. Set `AUTH_ENABLED=true` and redeploy.

Security: passwords hashed with bcrypt (cost 12); Auth.js handles CSRF for sign-in; `/api/register` checks same Origin; JWT sessions; no secrets in repo (`.env*` ignored, see `.env.example`).
