"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,197,94,0.04),transparent_50%)]" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-950/50 border border-green-800/50 text-green-400 text-sm mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Platform Beta
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}#games`}
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-500 transition-all shadow-lg shadow-green-600/25 hover:shadow-green-500/30"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {([
              { value: "8", label: t("stats.games") },
              { value: "3", label: t("stats.models") },
              { value: "1.2K+", label: t("stats.players") },
            ] as const).map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
