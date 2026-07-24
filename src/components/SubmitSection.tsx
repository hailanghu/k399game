"use client";

import { useTranslations } from "next-intl";

export default function SubmitSection() {
  const t = useTranslations("submit");

  return (
    <section id="submit" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-400 mb-4">{t("subtitle")}</p>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          {t("description")}
        </p>
        <a
          href="mailto:submit@k399game.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-500 transition-all shadow-lg shadow-green-600/25 hover:shadow-green-500/30"
        >
          <span>🚀</span>
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
