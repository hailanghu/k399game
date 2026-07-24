"use client";

import { useTranslations } from "next-intl";

export default function ShareButton() {
  const t = useTranslations("game");

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full py-3 rounded-xl border border-gray-700 text-gray-300 hover:text-green-400 hover:border-green-700 transition-all text-sm font-medium"
    >
      {t("share")}
    </button>
  );
}
