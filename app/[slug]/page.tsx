import { notFound } from "next/navigation";
import { Product } from "@/components/ui";
import { META, SLUGS, type Slug } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return SLUGS.map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: (META as any)[slug]?.name + " — AMR Systems" }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; if (!(SLUGS as readonly string[]).includes(slug)) notFound();
  return <Product s={slug as Slug} />;
}
