"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const nextLocale = locale === "en" ? "zh" : "en";
  const languageLabel = locale === "en" ? "中文" : "English";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-xl text-white hover:text-green-400 transition-colors"
          >
            <span className="text-2xl">🎮</span>
            <span>
              k399
              <span className="text-green-400">game</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}#hero`}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}#games`}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {t("games")}
            </Link>
            <Link
              href={`/${locale}#features`}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}#submit`}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {t("submit")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Link
              href={`/${nextLocale}`}
              className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 text-xs font-medium transition-colors"
            >
              {languageLabel}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800 pt-3">
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}#hero`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium px-2 py-1"
              >
                {t("home")}
              </Link>
              <Link
                href={`/${locale}#games`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium px-2 py-1"
              >
                {t("games")}
              </Link>
              <Link
                href={`/${locale}#features`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium px-2 py-1"
              >
                {t("about")}
              </Link>
              <Link
                href={`/${locale}#submit`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium px-2 py-1"
              >
                {t("submit")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
