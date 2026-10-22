import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { GOOGLE_ENABLED } from "@/lib/flags";

export const { handlers, auth, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c) {
        const email = String(c?.email || "").trim().toLowerCase();
        const password = String(c?.password || "");
        if (!email || password.length < 8) return null;
        const rows = (await sql()`SELECT id, email, name, password_hash FROM users WHERE email = ${email}`) as any[];
        const u = rows[0];
        if (!u?.password_hash || !(await bcrypt.compare(password, u.password_hash))) return null;
        return { id: String(u.id), email: u.email, name: u.name };
      },
    }),
    ...(GOOGLE_ENABLED ? [Google] : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        await sql()`INSERT INTO users (email, name, provider) VALUES (${user.email.toLowerCase()}, ${user.name ?? null}, 'google') ON CONFLICT (email) DO NOTHING`;
      }
      return true;
    },
  },
});
