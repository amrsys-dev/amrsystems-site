import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SPRITE } from "@/lib/sprite";
import { Providers, Nav, Footer } from "@/components/ui";
export const metadata: Metadata = { title: "AMR Systems — One ecosystem. Infinite possibilities.", description: "AMR Ecosystem: AMR Safar, AMR Service Hub, AMR 3D Constructor, AMR Vision, AMR Materials.", icons: { icon: "/icon.png", apple: "/icon.png" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0F5C3A" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru" dir="ltr"><body><div dangerouslySetInnerHTML={{ __html: SPRITE }} />
    <Providers><Nav />{children}<Footer /></Providers></body></html>;
}
