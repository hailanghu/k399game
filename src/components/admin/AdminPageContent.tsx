"use client";

import { useState, useEffect, useCallback } from "react";
import type { Game } from "@/data/games";
import GenerateForm from "@/components/admin/GenerateForm";
import AdminGameList from "@/components/admin/AdminGameList";

export default function AdminPage() {
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  // Check for saved token
  useEffect(() => {
    const saved = localStorage.getItem("k399_admin_token");
    if (saved) {
      setToken(saved);
      setAuthenticated(true);
    }
  }, []);

  // Fetch games
  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/games");
      const data = await res.json();
      setGames(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchGames();
  }, [authenticated, fetchGames]);

  // Auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setAuthenticated(true);
        localStorage.setItem("k399_admin_token", data.token);
      } else {
        setAuthError("Invalid password");
      }
    } catch {
      setAuthError("Login failed");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setToken("");
    setPassword("");
    localStorage.removeItem("k399_admin_token");
  };

  const handleGameCreated = (game: Game) => {
    setGames((prev) => [game, ...prev]);
  };

  const handleGameDeleted = (slug: string) => {
    setGames((prev) => prev.filter((g) => g.slug !== slug));
  };

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-green-400 mb-2">
              k399 Admin
            </h1>
            <p className="text-gray-500 text-sm">
              Enter admin password to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-green-600 transition-colors text-sm"
              autoFocus
            />
            {authError && (
              <p className="text-red-400 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              disabled={!password}
              className="w-full py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-green-400">
            k399 Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchGames}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Generate Form */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <GenerateForm
              token={token}
              onGameCreated={handleGameCreated}
            />
          </div>

          {/* Right: Game List */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            {loading ? (
              <div className="text-gray-500 text-sm py-8 text-center">
                Loading games...
              </div>
            ) : (
              <AdminGameList
                games={games}
                token={token}
                onGameDeleted={handleGameDeleted}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
