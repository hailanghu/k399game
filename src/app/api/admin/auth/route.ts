import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword =
    (globalThis as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD ||
    process.env.ADMIN_PASSWORD ||
    "k399admin";

    if (password === adminPassword) {
      return NextResponse.json({
        success: true,
        token: adminPassword,
      });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Bad request" },
      { status: 400 }
    );
  }
}
