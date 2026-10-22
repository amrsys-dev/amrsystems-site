import bcrypt from "bcryptjs";
import { AUTH_ENABLED } from "@/lib/flags";
import { sql } from "@/lib/db";
export async function POST(req: Request) {
  if (!AUTH_ENABLED) return Response.json({ error: "auth_disabled" }, { status: 503 });
  // same-origin check (CSRF) for this non-Auth.js endpoint
  const origin = req.headers.get("origin"); const host = req.headers.get("host");
  if (!origin || new URL(origin).host !== host) return Response.json({ error: "bad_origin" }, { status: 403 });
  const b = await req.json().catch(() => ({}));
  const email = String(b.email || "").trim().toLowerCase(), password = String(b.password || ""), name = String(b.name || "").slice(0, 80);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || password.length < 8) return Response.json({ error: "invalid" }, { status: 400 });
  const hash = await bcrypt.hash(password, 12);
  const r = (await sql()`INSERT INTO users (email, name, password_hash) VALUES (${email}, ${name || null}, ${hash}) ON CONFLICT (email) DO NOTHING RETURNING id`) as any[];
  if (!r.length) return Response.json({ error: "exists" }, { status: 409 });
  return Response.json({ ok: true });
}
