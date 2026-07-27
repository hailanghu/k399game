export interface Game {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  emoji: string;
  description: string;
  descriptionZh: string;
  category: "puzzle" | "action" | "strategy" | "arcade" | "adventure";
  thumbnail: string;
  gameUrl: string;
  aiModel: string;
  aiModelZh: string;
  plays: number;
  rating: number;
  featured: boolean;
  tags: string[];
}

// Static seed data — used as fallback for server-side rendering and static generation.
// In production, data is fetched from D1 via getAllGames().
export { seedGames as games } from "@/data/games-seed";

export const categories = [
  { id: "all", label: "All", labelZh: "全部" },
  { id: "puzzle", label: "Puzzle", labelZh: "益智" },
  { id: "action", label: "Action", labelZh: "动作" },
  { id: "strategy", label: "Strategy", labelZh: "策略" },
  { id: "arcade", label: "Arcade", labelZh: "街机" },
  { id: "adventure", label: "Adventure", labelZh: "冒险" },
] as const;
