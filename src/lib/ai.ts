/**
 * DeepSeek AI integration for game generation.
 *
 * Uses OpenAI-compatible chat completions API:
 * https://api.deepseek.com/v1/chat/completions
 *
 * Environment variable required: DEEPSEEK_API_KEY
 */

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  id: string;
  choices: {
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const MODEL = "deepseek-chat";

function getApiKey(): string {
  // Cloudflare env var or Node process.env
  try {
    // @ts-expect-error Cloudflare env
    if (typeof DEEPSEEK_API_KEY !== "undefined") return DEEPSEEK_API_KEY;
  } catch {}
  return process.env.DEEPSEEK_API_KEY || "";
}

export async function chatCompletion(
  messages: DeepSeekMessage[],
  options?: {
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured.");
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: options?.temperature ?? 0.8,
      max_tokens: options?.maxTokens ?? 8192,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `DeepSeek API error (${response.status}): ${errText.slice(0, 300)}`
    );
  }

  const data: DeepSeekResponse = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("DeepSeek returned empty response.");
  }

  return content;
}

/**
 * Extract HTML from AI response.
 * Handles response wrapped in markdown code blocks or raw HTML.
 */
export function extractHtml(response: string): string {
  // Try to extract from markdown code block ```html ... ```
  const codeBlockMatch = response.match(
    /```html?\s*\n([\s\S]*?)```/i
  );
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // Try to extract anything between <!DOCTYPE html> and </html>
  const doctypeMatch = response.match(
    /(<!DOCTYPE html>[\s\S]*?<\/html>)/i
  );
  if (doctypeMatch) {
    return doctypeMatch[1].trim();
  }

  // Try to extract anything between <html> and </html>
  const htmlMatch = response.match(
    /(<html[\s\S]*?<\/html>)/i
  );
  if (htmlMatch) {
    return htmlMatch[1].trim();
  }

  // If starts with <, assume it's raw HTML
  if (response.trim().startsWith("<")) {
    return response.trim();
  }

  throw new Error("Could not extract valid HTML from AI response.");
}
