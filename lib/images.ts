import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

let cache: Record<string, string> | null = null;

function loadImages(): Record<string, string> {
  const isDev = process.env.NODE_ENV === "development";
  if (cache && !isDev) return cache;
  cache = {};
  try {
    if (!fs.existsSync(IMAGES_DIR)) return cache;
    const files = fs.readdirSync(IMAGES_DIR);
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) continue;
      const base = path.basename(f, ext);
      const key = base.toLowerCase().replace(/\s+/g, "-");
      cache[key] = `/images/${f}`;
    }
  } catch {
    // ignore
  }
  return cache;
}

/**
 * Returns the path for an image in public/images by base name.
 * Place all images in public/images; this picks the file that matches the key (e.g. "about" → about.jpg or about.png).
 * Lookup is case-insensitive; "Permissions-Spreadsheet.jpg" matches getImage("permissions-spreadsheet", ...).
 * Falls back to fallback path if no file is found.
 */
export function getImage(key: string, fallback: string): string {
  const map = loadImages();
  const baseKey = key
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return map[baseKey] ?? fallback;
}
