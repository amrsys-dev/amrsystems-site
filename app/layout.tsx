import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SPRITE } from "@/lib/sprite";
import { Providers, Nav, Footer } from "@/components/ui";
export const metadata: Metadata = { title: "AMR Systems — Engineering Intelligent Systems", description: "Independent digital products and engineering technologies, connected through the AMR ecosystem.", icons: { icon: "/favicon.svg", apple: "/icon.png" }, manifest: "/manifest.json" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090c" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru" dir="ltr"><body><div dangerouslySetInnerHTML={{ __html: SPRITE }} />
    <Providers><Nav />{children}<Footer /></Providers></body></html>;
}
