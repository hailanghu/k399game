"use client";

import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations("features");
  const items = [t("items.0"), t("items.1"), t("items.2")];

  const icons = [
    <svg key="1" className="w-8 h-8 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>,
    <svg key="2" className="w-8 h-8 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>,
    <svg key="3" className="w-8 h-8 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>,
  ];

  function getItem(obj: any): { title: string; desc: string } {
    if (typeof obj === "string") return { title: obj, desc: "" };
    return obj as { title: string; desc: string };
  }

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
        {t("title")}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item: any, i: number) => {
          const data = getItem(item);
          return (
            <div
              key={i}
              className="glass rounded-2xl p-8 transition-all duration-300 glass-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-neon-500/10 flex items-center justify-center mb-6">
                {icons[i]}
              </div>
              <h3 className="text-xl font-bold mb-3">{data.title}</h3>
              <p className="text-dark-400 leading-relaxed">{data.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
