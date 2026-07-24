"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { games } from "@/data/games";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const totalPlays = games.reduce((sum, g) => sum + g.plays, 0);
  const models = [...new Set(games.map((g) => g.aiModel))];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-500/10 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[96px] animate-pulse-glow" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ai-badge mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider">
            {locale === "zh" ? "AI 驱动 · 无限可能" : "AI Powered · Infinite Possibilities"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 text-balance">
          <span className="text-gradient">{t("title")}</span>
        </h1>

        <p className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href={`/${locale}#games`}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-neon-500 to-neon-600 text-dark-950 font-bold text-lg hover:shadow-lg hover:shadow-neon-500/25 transition-all hover:scale-105"
          >
            {t("cta")}
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-dark-600 text-dark-300 hover:text-white hover:border-dark-400 transition-all font-medium"
          >
            {locale === "zh" ? "了解更多" : "Learn More"}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient">{games.length}+</div>
            <div className="text-dark-500 text-sm mt-1">{t("stats.games")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient">{models.length}</div>
            <div className="text-dark-500 text-sm mt-1">{t("stats.models")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient">
              {(totalPlays / 1000).toFixed(0)}K+
            </div>
            <div className="text-dark-500 text-sm mt-1">{t("stats.players")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
