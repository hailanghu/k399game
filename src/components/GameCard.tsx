"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Game } from "@/data/games";

const categoryIcons: Record<string, string> = {
  puzzle: "🧩",
  action: "🎯",
  strategy: "♟️",
  arcade: "🕹️",
  adventure: "🗺️",
};

export default function GameCard({ game, locale }: { game: Game; locale: string }) {
  const t = useTranslations("games");
  const tc = useTranslations("games.categories");

  const categoryKey = game.category.toLowerCase();
  const categoryLabel = tc(categoryKey);

  return (
    <Link
      href={`/${locale}/games/${game.slug}`}
      className="group block bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-800/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.thumbnail || `/thumbnails/${game.slug}.svg`}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-500 transition-colors shadow-lg">
            {t("playNow")}
          </span>
        </div>
        {/* AI Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-950/80 text-green-400 text-xs font-medium border border-green-800/50 backdrop-blur-sm">
            {t("aiGenerated")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{game.emoji}</span>
          <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
            {game.title}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">
            🤖 {game.aiModel}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">
            {categoryIcons[categoryKey] || "🎮"} {categoryLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
