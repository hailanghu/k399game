import { NextResponse } from "next/server";
import { chatCompletion, extractHtml } from "@/lib/ai";
import {
  buildGeneratePrompt,
  buildGameMetadata,
} from "@/lib/game-generator";
import { createGame } from "@/lib/db";
import type { CreateGameInput } from "@/lib/db";

export const runtime = "edge";

interface GenerateRequest {
  prompt: string;
  title: string;
  category: string;
}

export async function POST(request: Request) {
  try {
    // Auth check
    const auth = request.headers.get("Authorization");
    const adminPassword = (() => {
      try { return (globalThis as any).ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "k399admin"; }
      catch { return "k399admin"; }
    })();
    if (auth !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: GenerateRequest = await request.json();

    if (!body.prompt || !body.title || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: prompt, title, category" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ["puzzle", "action", "strategy", "arcade", "adventure"];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(", ")}` },
        { status: 400 }
      );
    }

    // 1. Build prompts
    const { system, user } = buildGeneratePrompt(
      body.prompt,
      body.category,
      body.title
    );

    console.log(`[generate] Starting: "${body.title}" (${body.category})`);

    // 2. Call DeepSeek API
    let rawResponse: string;
    try {
      rawResponse = await chatCompletion(
        [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        { temperature: 0.8, maxTokens: 8192 }
      );
    } catch (err: any) {
      console.error("[generate] AI API error:", err.message);
      return NextResponse.json(
        { error: `AI API error: ${err.message}` },
        { status: 502 }
      );
    }

    // 3. Extract HTML from response
    let html: string;
    try {
      html = extractHtml(rawResponse);
    } catch {
      return NextResponse.json(
        {
          error: "AI returned invalid HTML. Please try again with a different prompt.",
          rawPreview: rawResponse.slice(0, 500),
        },
        { status: 422 }
      );
    }

    // Quick validation
    if (html.length < 200) {
      return NextResponse.json(
        { error: "Generated HTML is too short. Please try again." },
        { status: 422 }
      );
    }

    // 4. Build metadata
    const meta = buildGameMetadata(body.prompt, body.category, body.title);

    // 5. Save to database
    const gameInput: CreateGameInput = {
      slug: body.title,
      title: meta.title,
      titleZh: meta.titleZh,
      emoji: meta.emoji,
      description: meta.description,
      descriptionZh: meta.descriptionZh,
      category: meta.category,
      aiModel: "DeepSeek",
      aiModelZh: "DeepSeek",
      tags: meta.tags,
      prompt: body.prompt,
      htmlContent: html,
    };

    const game = await createGame(gameInput);

    console.log(
      `[generate] Success: "${game.title}" (/${game.slug}) — ${html.length} bytes`
    );

    return NextResponse.json({
      success: true,
      game,
      stats: {
        htmlSize: html.length,
      },
    });
  } catch (error: any) {
    console.error("[generate] Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
