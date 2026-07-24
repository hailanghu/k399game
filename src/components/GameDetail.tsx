"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Game } from "@/data/games";
import ShareButton from "./ShareButton";

const categoryIcons: Record<string, string> = {
  puzzle: "🧩",
  action: "🎯",
  strategy: "♟️",
  arcade: "🕹️",
  adventure: "🗺️",
};

export default function GameDetail({ game, locale }: { game: Game; locale: string }) {
  const t = useTranslations("game");
  const tc = useTranslations("games.categories");

  const categoryKey = game.category.toLowerCase();
  const categoryLabel = tc(categoryKey);
  const categoryIcon = categoryIcons[categoryKey] || "🎮";

  return (
    <main className="min-h-screen bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#games`}
          className="inline-flex items-center text-gray-400 hover:text-green-400 transition-colors mb-6 text-sm"
        >
          {t("back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{game.emoji}</span>
                  <div>
                    <h1 className="text-xl font-bold text-white">{game.title}</h1>
                    <p className="text-xs text-gray-500">
                      {t("generatedBy", { model: game.aiModel })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-950 text-green-400 text-xs font-medium border border-green-800">
                    🤖 {t("aiModel")}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 text-xs">
                    {categoryIcon} {categoryLabel}
                  </span>
                </div>
              </div>

              <div className="relative w-full" style={{ height: "600px" }}>
                <iframe
                  src={game.gameUrl}
                  className="w-full h-full border-0"
                  title={game.title}
                  sandbox="allow-scripts allow-same-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-4">{t("aboutGame")}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{game.description}</p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {t("aiModel")}
                  </span>
                  <p className="text-white font-medium mt-1">{game.aiModel}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {t("category")}
                  </span>
                  <p className="text-white font-medium mt-1 flex items-center gap-2">
                    <span>{categoryIcon}</span> {categoryLabel}
                  </p>
                </div>
                {game.tags && game.tags.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Tags</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {game.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ShareButton />
          </div>
        </div>
      </div>
    </main>
  );
}
