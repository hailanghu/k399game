import { NextResponse } from "next/server";
import { getGameHtml, staticGameUrl } from "@/lib/db";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const html = await getGameHtml(params.slug);
    if (!html) {
      // If no HTML in DB, try redirect to static file
      return NextResponse.redirect(
        new URL(staticGameUrl(params.slug), _request.url)
      );
    }

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Failed to serve game:", error);
    return NextResponse.json(
      { error: "Failed to serve game" },
      { status: 500 }
    );
  }
}
