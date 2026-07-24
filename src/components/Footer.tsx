"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-dark-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-400 to-neon-600 flex items-center justify-center text-dark-950 font-bold text-sm font-mono">
              K3
            </div>
            <span className="text-lg font-bold">
              <span className="text-white">k399</span>
              <span className="text-neon-400">game</span>
            </span>
          </div>

          <p className="text-dark-500 text-sm max-w-md text-center md:text-left">
            {t("tagline")}
          </p>

          <p className="text-dark-600 text-xs">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
