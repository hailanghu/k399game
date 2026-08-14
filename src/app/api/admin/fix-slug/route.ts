import { NextResponse } from "next/server";

export const runtime = "edge";

/**
 * TEMPORARY endpoint: fix games with empty slug (Chinese titles generated
 * before generateSlug fallback was added). Assigns `game-<id>` slugs.
 * Remove after running once.
 */
export async function POST(request: Request) {
  try {
    const auth = request.headers.get("Authorization");
    const adminPassword =
      (globalThis as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD ||
      process.env.ADMIN_PASSWORD ||
      "k399admin";
    if (auth !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let db: D1Database | null = null;
    try {
      // @ts-expect-error D1 binding
      if (typeof DB !== "undefined") db = DB as D1Database;
    } catch {
      /* dev */
    }
    if (!db && typeof process !== "undefined" && process.env.DB) {
      // @ts-expect-error D1 via env in Cloudflare Pages
      db = process.env.DB as D1Database;
    }
    if (!db) {
      return NextResponse.json({ error: "DB not available" }, { status: 500 });
    }

    const { results } = await db
      .prepare("SELECT id, title FROM games WHERE slug = ''")
      .all<{ id: number; title: string }>();

    const fixed: { id: number; title: string; slug: string }[] = [];
    for (const row of results) {
      const slug = `game-${row.id}`;
      await db
        .prepare("UPDATE games SET slug = ?, updated_at = ? WHERE id = ?")
        .bind(slug, new Date().toISOString(), row.id)
        .run();
      fixed.push({ id: row.id, title: row.title, slug });
    }

    return NextResponse.json({ fixed });
  } catch (error) {
    console.error("fix-slug failed:", error);
    return NextResponse.json(
      { error: "Failed to fix slugs" },
      { status: 500 }
    );
  }
}
