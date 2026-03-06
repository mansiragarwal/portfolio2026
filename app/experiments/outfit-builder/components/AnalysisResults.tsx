"use client";

import type { OutfitAnalysis } from "../lib/types";

interface AnalysisResultsProps {
  analysis: OutfitAnalysis;
}

const CATEGORY_LABELS: Record<string, string> = {
  top: "Top",
  bottom: "Bottom",
  outerwear: "Outerwear",
  shoes: "Shoes",
  accessory: "Accessory",
  dress: "Dress",
  bag: "Bag",
};

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-8">
      {/* Source image + style */}
      <div className="flex gap-6">
        <div className="w-[180px] shrink-0 overflow-hidden rounded-xl border border-[#EAE4DE]">
          <img
            src={analysis.imageData}
            alt="Outfit inspiration"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Style
          </p>
          <p className="mb-4 text-[18px] font-medium tracking-tight text-[#1A1A1A]">
            {analysis.style}
          </p>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Silhouette
          </p>
          <p className="text-[14px] leading-relaxed text-[#6B6360]">
            {analysis.silhouette}
          </p>
        </div>
      </div>

      {/* Color palette */}
      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
          Color Palette
        </h3>
        <div className="flex gap-3">
          {analysis.colors.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="h-12 w-12 rounded-full border border-[#EAE4DE] shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[11px] text-[#6B6360]">{color.name}</span>
              <span className="text-[10px] font-mono text-[#A09893]">{color.hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detected items */}
      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
          Detected Items
        </h3>
        <div className="space-y-2">
          {analysis.items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-[#EAE4DE] bg-white p-4"
            >
              <div
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-[#EAE4DE]"
                style={{ backgroundColor: analysis.colors.find((c) => c.name.toLowerCase().includes(item.color.toLowerCase()))?.hex || "#ddd" }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-medium text-[#1A1A1A]">
                    {item.name}
                  </p>
                  <span className="rounded-full bg-[#F3EFEB] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#6B6360]">
                    {CATEGORY_LABELS[item.category] || item.category}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] text-[#6B6360]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping alternatives */}
      {analysis.shoppingAlternatives.length > 0 && (
        <div>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Shopping Alternatives
          </h3>
          <div className="space-y-2">
            {analysis.shoppingAlternatives.map((alt, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#EAE4DE] bg-white p-4"
              >
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[13px] font-medium text-[#1A1A1A]">
                    {alt.originalItem}
                  </p>
                  <span className="rounded-full bg-[#FDF0F3] px-2.5 py-0.5 text-[11px] font-semibold text-[#C74B6F]">
                    {alt.priceRange}
                  </span>
                </div>
                <p className="text-[13px] text-[#6B6360]">{alt.suggestion}</p>
                <a
                  href={`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(alt.searchTerm)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[12px] font-medium text-[#C74B6F] hover:underline"
                >
                  Search &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wardrobe matches */}
      {analysis.wardrobeMatches.length > 0 && (
        <div>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Matches From Your Wardrobe
          </h3>
          <div className="space-y-2">
            {analysis.wardrobeMatches.map((match, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#EAE4DE] bg-white p-4"
              >
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-[14px] font-medium text-[#1A1A1A]">
                    {match.wardrobeItemName}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      match.confidence === "high"
                        ? "bg-green-50 text-green-700"
                        : match.confidence === "medium"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {match.confidence}
                  </span>
                </div>
                <p className="text-[12px] text-[#A09893]">
                  matches &ldquo;{match.matchedTo}&rdquo;
                </p>
                <p className="mt-1 text-[13px] text-[#6B6360]">{match.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
