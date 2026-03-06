export interface ClothingItem {
  name: string;
  category: "top" | "bottom" | "outerwear" | "shoes" | "accessory" | "dress" | "bag";
  color: string;
  description: string;
}

export interface ColorPalette {
  hex: string;
  name: string;
}

export interface OutfitAnalysis {
  id: string;
  imageData: string;
  items: ClothingItem[];
  colors: ColorPalette[];
  silhouette: string;
  style: string;
  shoppingAlternatives: ShoppingAlternative[];
  wardrobeMatches: WardrobeMatch[];
  createdAt: string;
}

export interface ShoppingAlternative {
  originalItem: string;
  suggestion: string;
  priceRange: string;
  searchTerm: string;
}

export interface WardrobeItem {
  id: string;
  imageData: string;
  name: string;
  category: ClothingItem["category"];
  color: string;
  description: string;
  addedAt: string;
}

export interface WardrobeMatch {
  wardrobeItemId: string;
  wardrobeItemName: string;
  matchedTo: string;
  reason: string;
  confidence: "high" | "medium" | "low";
}
