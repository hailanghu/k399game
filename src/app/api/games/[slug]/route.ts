import { NextResponse } from "next/server";
import { getGameBySlug, deleteGame } from "@/lib/db";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const game = await getGameBySlug(params.slug);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json(game);
  } catch (error) {
    console.error("Failed to fetch game:", error);
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Auth check
    const auth = request.headers.get("Authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "k399admin";
    if (auth !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await deleteGame(params.slug);
    if (!deleted) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
