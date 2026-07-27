"use client";

import { useState, useCallback } from "react";
import type { Game } from "@/data/games";

interface AdminGameListProps {
  games: Game[];
  token: string;
  onGameDeleted: (slug: string) => void;
}

export default function AdminGameList({
  games,
  token,
  onGameDeleted,
}: AdminGameListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = useCallback(
    async (slug: string, title: string) => {
      if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

      setDeleting(slug);
      try {
        const res = await fetch(`/api/games/${slug}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          onGameDeleted(slug);
        } else {
          const data = await res.json();
          alert(data.error || "Delete failed");
        }
      } catch {
        alert("Delete failed");
      } finally {
        setDeleting(null);
      }
    },
    [token, onGameDeleted]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span>🎮</span> Game List
        <span className="text-sm font-normal text-gray-500">
          ({games.length} total)
        </span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
              <th className="py-2 pr-4 font-medium">Game</th>
              <th className="py-2 pr-4 font-medium">Category</th>
              <th className="py-2 pr-4 font-medium">AI Model</th>
              <th className="py-2 pr-4 font-medium">Source</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.slug} className="border-b border-gray-800/50">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{game.emoji}</span>
                    <div>
                      <div className="text-white font-medium">{game.title}</div>
                      <div className="text-gray-600 text-xs">/{game.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs">
                    {game.category}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-400 text-xs">
                  {game.aiModel}
                </td>
                <td className="py-3 pr-4 text-gray-500 text-xs">
                  {game.gameUrl.startsWith("/api/") ? "D1 Dynamic" : "Static File"}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => handleDelete(game.slug, game.title)}
                    disabled={deleting === game.slug}
                    className="px-3 py-1 bg-red-950/50 hover:bg-red-900/50 border border-red-800/50 text-red-400 rounded text-xs transition-colors disabled:opacity-50"
                  >
                    {deleting === game.slug ? "..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
