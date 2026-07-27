import { getAllGames } from "@/lib/db";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GameGrid from "@/components/GameGrid";
import SubmitSection from "@/components/SubmitSection";

export const runtime = "edge";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const games = await getAllGames();

  return (
    <>
      <HeroSection locale={locale} />
      <FeaturesSection />
      <GameGrid locale={locale} games={games} />
      <SubmitSection />
    </>
  );
}
