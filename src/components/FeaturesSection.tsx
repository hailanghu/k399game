"use client";

import { useTranslations } from "next-intl";

const icons = ["🤖", "✨", "⚡"];

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-green-800/50 hover:bg-gray-900 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-green-950/50 rounded-xl flex items-center justify-center text-3xl mb-6 border border-green-800/30 group-hover:border-green-600 group-hover:bg-green-950 transition-all">
                {icons[i]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(`items.${i}.title`)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(`items.${i}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
