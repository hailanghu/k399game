-- D1 Migration: Create games table
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_zh TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '🎮',
  description TEXT NOT NULL DEFAULT '',
  description_zh TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'arcade',
  thumbnail TEXT NOT NULL DEFAULT '',
  ai_model TEXT NOT NULL DEFAULT 'DeepSeek',
  ai_model_zh TEXT NOT NULL DEFAULT 'DeepSeek',
  plays INTEGER NOT NULL DEFAULT 0,
  rating REAL NOT NULL DEFAULT 4.0,
  featured INTEGER NOT NULL DEFAULT 1,
  tags TEXT NOT NULL DEFAULT '[]',
  html_content TEXT NOT NULL DEFAULT '',
  prompt TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_games_slug ON games(slug);
CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);
CREATE INDEX IF NOT EXISTS idx_games_featured ON games(featured);
