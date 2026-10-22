import { redirect } from "next/navigation";
import { AccountView } from "@/components/ui";
import { AUTH_ENABLED } from "@/lib/flags";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (!AUTH_ENABLED) return <AccountView enabled={false} />;
  const { auth } = await import("@/auth"); const s = await auth();
  if (!s?.user) redirect("/signin");
  return <AccountView enabled email={s.user.email} />;
}
