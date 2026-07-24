"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { games, categories } from "@/data/games";
import GameCard from "./GameCard";

export default function GameGrid({ locale }: { locale: string }) {
  const t = useTranslations("games");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? games
      : games.filter((g) => g.category === activeCategory);

  return (
    <section id="games" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-dark-400 text-lg">{t("subtitle")}</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const label = locale === "zh" ? cat.labelZh : cat.label;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-neon-500/20 text-neon-400 border border-neon-500/30"
                  : "text-dark-400 hover:text-dark-200 border border-transparent hover:border-dark-600"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Game Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((game) => (
          <GameCard key={game.id} game={game} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-dark-500">
          {locale === "zh" ? "这个分类下暂无游戏" : "No games in this category yet"}
        </div>
      )}
    </section>
  );
}
