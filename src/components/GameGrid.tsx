"use client";

import { useState } from "react";
import { games, categories } from "@/data/games";
import { useTranslations } from "next-intl";
import GameCard from "./GameCard";

type TagKey = "all" | "puzzle" | "action" | "strategy" | "arcade" | "adventure";

export default function GameGrid({ locale }: { locale: string }) {
  const [activeTag, setActiveTag] = useState<TagKey>("all");
  const t = useTranslations("games");
  const tc = useTranslations("games.categories");

  const filteredGames =
    activeTag === "all"
      ? games
      : games.filter((g) => g.category.toLowerCase() === activeTag);

  return (
    <section id="games" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const key = cat.id as TagKey;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTag(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === key
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
              }`}
            >
              {tc(key)}
            </button>
          );
        })}
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.slug} game={game} locale={locale} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No games found in this category yet.</p>
        </div>
      )}
    </section>
  );
}
