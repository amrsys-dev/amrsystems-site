import type { NextRequest } from "next/server";
import { AUTH_ENABLED } from "@/lib/flags";
const off = () => Response.json({ error: "auth_disabled" }, { status: 503 });
export async function GET(req: NextRequest) { if (!AUTH_ENABLED) return off(); const { handlers } = await import("@/auth"); return handlers.GET(req); }
export async function POST(req: NextRequest) { if (!AUTH_ENABLED) return off(); const { handlers } = await import("@/auth"); return handlers.POST(req); }
