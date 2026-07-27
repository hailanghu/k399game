/**
 * Database abstraction layer.
 *
 * In production (Cloudflare Pages + D1 binding): uses D1Database
 * In development: uses local JSON file storage as fallback
 */
import type { Game } from "@/data/games";
import { seedGames } from "@/data/games-seed";

// ── D1 record shape ──────────────────────────────────────────────
interface D1GameRow {
  id: number;
  slug: string;
  title: string;
  title_zh: string;
  emoji: string;
  description: string;
  description_zh: string;
  category: string;
  thumbnail: string;
  ai_model: string;
  ai_model_zh: string;
  plays: number;
  rating: number;
  featured: number;
  tags: string;
  html_content: string;
  prompt: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGameInput {
  slug: string;
  title: string;
  titleZh: string;
  emoji: string;
  description: string;
  descriptionZh: string;
  category: string;
  aiModel: string;
  aiModelZh: string;
  tags: string[];
  prompt: string;
  htmlContent: string;
}

// ── Row → Game mapper ───────────────────────────────────────────
function rowToGame(row: D1GameRow): Game {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    titleZh: row.title_zh,
    emoji: row.emoji,
    description: row.description,
    descriptionZh: row.description_zh,
    category: row.category as Game["category"],
    thumbnail:
      row.thumbnail || `/thumbnails/${row.slug}.svg`,
    gameUrl:
      row.html_content
        ? `/api/games/${row.slug}/play`
        : `/games/${row.slug}/index.html`,
    aiModel: row.ai_model,
    aiModelZh: row.ai_model_zh,
    plays: row.plays,
    rating: row.rating,
    featured: row.featured === 1,
    tags: (() => {
      try { return JSON.parse(row.tags); } catch { return []; }
    })(),
  };
}

// ── Dev fallback (file-based) ────────────────────────────────────
let devStore: D1GameRow[] | null = null;

async function loadDevStore(): Promise<D1GameRow[]> {
  if (devStore) return devStore;

  // In dev, start with seed data
  devStore = seedGames.map((g, i) => ({
    id: i + 1,
    slug: g.slug,
    title: g.title,
    title_zh: g.titleZh,
    emoji: g.emoji,
    description: g.description,
    description_zh: g.descriptionZh,
    category: g.category,
    thumbnail: g.thumbnail,
    ai_model: g.aiModel,
    ai_model_zh: g.aiModelZh,
    plays: g.plays,
    rating: g.rating,
    featured: g.featured ? 1 : 0,
    tags: JSON.stringify(g.tags),
    html_content: "",
    prompt: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  return devStore;
}

function saveDevStore() {
  // keep in-memory for the process lifetime
}

// ── Helpers ──────────────────────────────────────────────────────
function getD1(): D1Database | null {
  // Cloudflare D1 binding — available as env.DB or process.env.DB in production
  try {
    // @ts-expect-error D1 binding exists in Cloudflare Pages runtime
    if (typeof DB !== "undefined") return DB as D1Database;
  } catch {
    /* dev */
  }
  if (typeof process !== "undefined" && process.env.DB) {
    return process.env.DB as unknown as D1Database;
  }
  return null;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function generateId(): string {
  return `g_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ── Public API ───────────────────────────────────────────────────

export async function getAllGames(): Promise<Game[]> {
  const db = getD1();
  if (db) {
    const { results } = await db
      .prepare("SELECT * FROM games ORDER BY featured DESC, created_at DESC")
      .all<D1GameRow>();
    return results.map(rowToGame);
  }

  // Dev fallback
  const store = await loadDevStore();
  const rows = [...store].sort((a, b) => {
    if (a.featured !== b.featured) return b.featured - a.featured;
    return b.created_at.localeCompare(a.created_at);
  });
  return rows.map(rowToGame);
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const db = getD1();
  if (db) {
    const row = await db
      .prepare("SELECT * FROM games WHERE slug = ?")
      .bind(slug)
      .first<D1GameRow>();
    return row ? rowToGame(row) : null;
  }

  // Dev fallback
  const store = await loadDevStore();
  const row = store.find((r) => r.slug === slug);
  return row ? rowToGame(row) : null;
}

export async function getGameHtml(slug: string): Promise<string | null> {
  const db = getD1();
  if (db) {
    const row = await db
      .prepare("SELECT html_content FROM games WHERE slug = ?")
      .bind(slug)
      .first<{ html_content: string }>();
    return row?.html_content || null;
  }

  // Dev fallback
  const store = await loadDevStore();
  const row = store.find((r) => r.slug === slug);
  return row?.html_content || null;
}

export async function createGame(input: CreateGameInput): Promise<Game> {
  const slug = generateSlug(input.slug || input.title);
  const now = new Date().toISOString();
  const id = generateId();

  const db = getD1();
  if (db) {
    await db
      .prepare(
        `INSERT INTO games (slug, title, title_zh, emoji, description, description_zh,
         category, ai_model, ai_model_zh, plays, rating, featured, tags,
         html_content, prompt, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        slug,
        input.title,
        input.titleZh,
        input.emoji,
        input.description,
        input.descriptionZh,
        input.category,
        input.aiModel,
        input.aiModelZh,
        0,
        4.0,
        1,
        JSON.stringify(input.tags),
        input.htmlContent,
        input.prompt,
        now,
        now
      )
      .run();

    const row = await db
      .prepare("SELECT * FROM games WHERE slug = ?")
      .bind(slug)
      .first<D1GameRow>();

    return rowToGame(row!);
  }

  // Dev fallback
  const store = await loadDevStore();
  const newRow: D1GameRow = {
    id: store.length + 1,
    slug,
    title: input.title,
    title_zh: input.titleZh,
    emoji: input.emoji,
    description: input.description,
    description_zh: input.descriptionZh,
    category: input.category,
    thumbnail: "",
    ai_model: input.aiModel,
    ai_model_zh: input.aiModelZh,
    plays: 0,
    rating: 4.0,
    featured: 1,
    tags: JSON.stringify(input.tags),
    html_content: input.htmlContent,
    prompt: input.prompt,
    created_at: now,
    updated_at: now,
  };
  store.push(newRow);
  saveDevStore();
  return rowToGame(newRow);
}

export async function deleteGame(slug: string): Promise<boolean> {
  const db = getD1();
  if (db) {
    const result = await db
      .prepare("DELETE FROM games WHERE slug = ?")
      .bind(slug)
      .run();
    return result.meta.changes > 0;
  }

  // Dev fallback
  const store = await loadDevStore();
  const idx = store.findIndex((r) => r.slug === slug);
  if (idx === -1) return false;
  store.splice(idx, 1);
  saveDevStore();
  return true;
}

export async function getGameCount(): Promise<number> {
  const db = getD1();
  if (db) {
    const result = await db
      .prepare("SELECT COUNT(*) as count FROM games")
      .first<{ count: number }>();
    return result?.count ?? 0;
  }

  const store = await loadDevStore();
  return store.length;
}
