"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = locale === "en" ? "zh" : "en";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-dark-700/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-400 to-neon-600 flex items-center justify-center text-dark-950 font-bold text-sm font-mono">
            K3
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">k399</span>
            <span className="text-neon-400">game</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href={`/${locale}`}
            className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
          >
            {t("home")}
          </Link>
          <Link
            href={`/${locale}#games`}
            className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
          >
            {t("games")}
          </Link>
          <Link
            href={`/${locale}#about`}
            className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
          >
            {t("about")}
          </Link>
          <Link
            href={`/${locale}#submit`}
            className="px-4 py-2 rounded-lg ai-badge text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {t("submit")}
          </Link>
          <Link
            href={pathname.replace(`/${locale}`, `/${switchLocale}`)}
            className="ml-2 px-3 py-1.5 rounded-lg border border-dark-600 text-dark-400 hover:text-white hover:border-dark-400 transition-all text-xs font-mono uppercase"
          >
            {switchLocale}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-dark-300 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-dark-700/50 mt-2">
          <nav className="flex flex-col gap-3 px-4 py-4">
            <Link
              href={`/${locale}`}
              onClick={() => setMobileOpen(false)}
              className="text-dark-300 hover:text-white transition-colors py-2"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}#games`}
              onClick={() => setMobileOpen(false)}
              className="text-dark-300 hover:text-white transition-colors py-2"
            >
              {t("games")}
            </Link>
            <Link
              href={`/${locale}#about`}
              onClick={() => setMobileOpen(false)}
              className="text-dark-300 hover:text-white transition-colors py-2"
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}#submit`}
              onClick={() => setMobileOpen(false)}
              className="ai-badge inline-block w-fit px-4 py-2 rounded-lg text-sm"
            >
              {t("submit")}
            </Link>
            <Link
              href={pathname.replace(`/${locale}`, `/${switchLocale}`)}
              onClick={() => setMobileOpen(false)}
              className="text-dark-400 hover:text-white transition-colors py-2 text-xs font-mono uppercase"
            >
              {switchLocale === "en" ? "English" : "中文"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
