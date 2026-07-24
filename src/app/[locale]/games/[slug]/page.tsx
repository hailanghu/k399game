import { notFound } from "next/navigation";
import { games } from "@/data/games";
import GameDetail from "@/components/GameDetail";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return games.flatMap((game) => [
    { locale: "en", slug: game.slug },
    { locale: "zh", slug: game.slug },
  ]);
}

export default function GameDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  return <GameDetail game={game} locale={locale} />;
}
