import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GameGrid from "@/components/GameGrid";
import SubmitSection from "@/components/SubmitSection";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <HeroSection locale={locale} />
      <FeaturesSection />
      <GameGrid locale={locale} />
      <SubmitSection />
    </>
  );
}
