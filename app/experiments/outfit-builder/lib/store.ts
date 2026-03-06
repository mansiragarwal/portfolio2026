import type { WardrobeItem, OutfitAnalysis } from "./types";

const KEYS = {
  wardrobe: "outfit-wardrobe",
  analyses: "outfit-analyses",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getWardrobe(): WardrobeItem[] {
  return read<WardrobeItem[]>(KEYS.wardrobe, []);
}

export function addWardrobeItem(item: WardrobeItem): void {
  const items = getWardrobe();
  items.unshift(item);
  write(KEYS.wardrobe, items);
}

export function removeWardrobeItem(id: string): void {
  const items = getWardrobe().filter((i) => i.id !== id);
  write(KEYS.wardrobe, items);
}

export function getAnalyses(): OutfitAnalysis[] {
  return read<OutfitAnalysis[]>(KEYS.analyses, []);
}

export function saveAnalysis(analysis: OutfitAnalysis): void {
  const analyses = getAnalyses();
  analyses.unshift(analysis);
  if (analyses.length > 10) analyses.pop();
  write(KEYS.analyses, analyses);
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
