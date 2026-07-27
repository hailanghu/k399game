import { notFound } from "next/navigation";
import { getGameBySlug } from "@/lib/db";
import GameDetail from "@/components/GameDetail";
import { unstable_setRequestLocale } from "next-intl/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function GameDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  const game = await getGameBySlug(slug);
  if (!game) notFound();

  return <GameDetail game={game} locale={locale} />;
}
