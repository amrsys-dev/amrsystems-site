import { AuthForm } from "@/components/ui";
import { AUTH_ENABLED, GOOGLE_ENABLED } from "@/lib/flags";
export const dynamic = "force-dynamic";
export default function Page() { return <AuthForm mode="up" enabled={AUTH_ENABLED} google={GOOGLE_ENABLED} />; }
