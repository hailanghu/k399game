"use client";

import { useState, useEffect, useCallback } from "react";
import type { Game } from "@/data/games";

interface GenerateFormProps {
  token: string;
  onGameCreated: (game: Game) => void;
}

const CATEGORIES = [
  { value: "arcade", label: "Street Machine / 街机" },
  { value: "action", label: "Action / 动作" },
  { value: "puzzle", label: "Puzzle / 益智" },
  { value: "strategy", label: "Strategy / 策略" },
  { value: "adventure", label: "Adventure / 冒险" },
];

export default function GenerateForm({ token, onGameCreated }: GenerateFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("arcade");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !prompt.trim()) return;

      setLoading(true);
      setError("");
      setStatus("Calling DeepSeek AI to generate game...");

      try {
        const res = await fetch("/api/admin/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            category,
            prompt: prompt.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || `HTTP ${res.status}`);
        }

        setStatus(
          `Game created! "${data.game.title}" (${data.stats.htmlSize} bytes)`
        );
        onGameCreated(data.game);

        // Reset form
        setTitle("");
        setPrompt("");
        setCategory("arcade");
      } catch (err: any) {
        setError(err.message);
        setStatus("");
      } finally {
        setLoading(false);
      }
    },
    [title, category, prompt, token, onGameCreated]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span>🤖</span> Create New Game
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">
          Game Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Space Invaders 3000"
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors text-sm"
          disabled={loading}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-600 transition-colors text-sm"
          disabled={loading}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Prompt */}
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">
          Game Description / Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the game you want to create...
e.g. A side-scrolling space shooter where players control a starship, dodge asteroids, and shoot alien enemies. WASD to move, space to shoot. Include power-ups that randomly appear."
          rows={5}
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors text-sm resize-none"
          disabled={loading}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !title.trim() || !prompt.trim()}
        className="w-full py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors text-sm"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            Generating...
          </span>
        ) : (
          "Generate Game with DeepSeek AI"
        )}
      </button>

      {/* Status */}
      {status && (
        <div className="p-3 bg-green-950/50 border border-green-800/50 rounded-lg text-green-400 text-sm">
          {status}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
    </form>
  );
}
