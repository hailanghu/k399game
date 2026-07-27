/**
 * Prompt templates for game generation.
 *
 * The system prompt gives clear instructions to the AI
 * about the expected output format (a complete HTML5 game).
 */

const SYSTEM_PROMPT = `You are an expert HTML5 game developer. Your task is to generate a COMPLETE, PLAYABLE, single-file HTML5 game based on the user's description.

## CRITICAL RULES
1. Output ONLY the complete HTML file. No explanations, no markdown outside the code block.
2. The game MUST be fully self-contained: all CSS and JavaScript inline in one HTML file.
3. Use Canvas API for graphics. Make the game visually polished and fun to play.
4. Include clear game instructions, score tracking, and a restart button.
5. Keep the game responsive — use relative sizing where possible.
6. The game should work on both desktop and mobile (touch support if applicable).

## STYLE REQUIREMENTS
- Dark theme background: #020617 (slate-950)
- Accent color: #22c55e (green-500) for highlights, scores, buttons
- Font: 'JetBrains Mono', 'Courier New', monospace
- Subtle glowing effects: box-shadow with rgba(34, 197, 94, 0.1)
- Clean, modern, retro-futuristic aesthetic
- Add "100% AI Generated" badge text somewhere in the game UI

## OUTPUT FORMAT
Wrap your output in a code block:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
...complete game...
</html>
\`\`\`

## IMPORTANT
- Make sure the game actually works! Test mentally that all variables are defined and interactions are handled.
- Include keyboard controls and/or mouse/touch controls.
- Add a simple scoring system.
- Make it fun and replayable.`;

export function buildGeneratePrompt(
  userPrompt: string,
  category: string,
  title: string
): { system: string; user: string } {
  return {
    system: SYSTEM_PROMPT,
    user: `Create a ${category} game with the following description:

Title: ${title}
Description: ${userPrompt}

Make sure this is a ${category} genre game. Follow ALL the style and quality requirements from the system prompt.`,
  };
}

export function buildGameMetadata(
  userPrompt: string,
  category: string,
  title: string
) {
  return {
    title,
    titleZh: title, // Will be auto-translated or user-provided
    emoji: getCategoryEmoji(category),
    description: userPrompt.slice(0, 200),
    descriptionZh: userPrompt.slice(0, 200),
    category,
    tags: [category, "AI Generated", "New"],
  };
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    puzzle: "🧩",
    action: "🎯",
    strategy: "♟️",
    arcade: "🕹️",
    adventure: "🗺️",
  };
  return emojis[category] || "🎮";
}
