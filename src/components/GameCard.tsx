"use client";

import Link from "next/link";
import type { Game } from "@/data/games";

export default function GameCard({
  game,
  locale,
}: {
  game: Game;
  locale: string;
}) {
  const title = locale === "zh" ? game.titleZh : game.title;
  const desc = locale === "zh" ? game.descriptionZh : game.description;
  const model = locale === "zh" ? game.aiModelZh : game.aiModel;

  const categoryGradient: Record<string, string> = {
    puzzle: "from-purple-500/20 to-purple-600/20",
    action: "from-red-500/20 to-orange-500/20",
    strategy: "from-blue-500/20 to-cyan-500/20",
    arcade: "from-yellow-500/20 to-green-500/20",
    adventure: "from-pink-500/20 to-rose-500/20",
  };

  return (
    <Link
      href={`/${locale}/games/${game.slug}`}
      className="group glass rounded-2xl overflow-hidden transition-all duration-300 glass-hover"
    >
      {/* Thumbnail */}
      <div
        className={`relative aspect-video bg-gradient-to-br ${
          categoryGradient[game.category] || "from-dark-700 to-dark-800"
        } flex items-center justify-center overflow-hidden`}
      >
        <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
          {game.category === "puzzle" && "🧩"}
          {game.category === "action" && "⚡"}
          {game.category === "strategy" && "🏰"}
          {game.category === "arcade" && "🕹️"}
          {game.category === "adventure" && "🗺️"}
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-6 py-3 rounded-xl bg-neon-500 text-dark-950 font-bold text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
            {locale === "zh" ? "开始游戏" : "Play Now"}
          </span>
        </div>

        {/* AI Badge on thumbnail */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full ai-badge text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-pulse" />
          AI
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg group-hover:text-neon-400 transition-colors line-clamp-1">
            {title}
          </h3>
          {game.featured && (
            <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono bg-neon-500/10 text-neon-400 border border-neon-500/20">
              {locale === "zh" ? "精选" : "FEATURED"}
            </span>
          )}
        </div>
        <p className="text-dark-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {desc}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-dark-500">
            <span className="flex items-center gap-1">
              ⭐ {game.rating}
            </span>
            <span>{game.plays.toLocaleString()} plays</span>
          </div>
          <span className="text-[11px] text-dark-500 font-mono">{model}</span>
        </div>
      </div>
    </Link>
  );
}
