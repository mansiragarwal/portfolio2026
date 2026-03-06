"use client";

import { useState, useCallback } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { AnalysisResults } from "./components/AnalysisResults";
import { getWardrobe, saveAnalysis, getAnalyses } from "./lib/store";
import type { OutfitAnalysis, WardrobeMatch } from "./lib/types";
import Link from "next/link";

export default function OutfitBuilderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<OutfitAnalysis | null>(null);
  const [recentAnalyses] = useState(() => getAnalyses());

  const handleImage = useCallback(async (imageData: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const analyzeRes = await fetch("/api/outfit/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData }),
      });

      if (!analyzeRes.ok) {
        const data = await analyzeRes.json();
        throw new Error(data.error || "Analysis failed");
      }

      const analyzeData = await analyzeRes.json();

      let wardrobeMatches: WardrobeMatch[] = [];
      const wardrobe = getWardrobe();

      if (wardrobe.length > 0) {
        try {
          const matchRes = await fetch("/api/outfit/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              extractedItems: analyzeData.items,
              wardrobeItems: wardrobe.map((w) => ({
                id: w.id,
                name: w.name,
                category: w.category,
                color: w.color,
                description: w.description,
              })),
            }),
          });
          if (matchRes.ok) {
            const matchData = await matchRes.json();
            wardrobeMatches = matchData.matches || [];
          }
        } catch {
          // wardrobe matching is optional
        }
      }

      const result: OutfitAnalysis = {
        id: crypto.randomUUID(),
        imageData,
        items: analyzeData.items || [],
        colors: analyzeData.colors || [],
        silhouette: analyzeData.silhouette || "",
        style: analyzeData.style || "",
        shoppingAlternatives: analyzeData.shoppingAlternatives || [],
        wardrobeMatches,
        createdAt: new Date().toISOString(),
      };

      saveAnalysis(result);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10">
      <div className="mb-8">
        <Link
          href="/experiments"
          className="mb-6 inline-block text-[13px] text-[#C74B6F] no-underline hover:underline"
        >
          &larr; Back to experiments
        </Link>
        <h1 className="mb-2 text-[28px] font-semibold tracking-tight text-[#1A1A1A]">
          Outfit Analyzer
        </h1>
        <p className="text-[15px] text-[#6B6360]">
          Upload a Pinterest outfit or any fashion photo. AI extracts the items,
          colors, and style — then suggests alternatives and matches from your wardrobe.
        </p>
      </div>

      {!analysis && <ImageUpload onImageSelected={handleImage} loading={loading} />}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-[14px] text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-[13px] font-medium text-red-600 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {analysis && (
        <div className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
              Analysis Results
            </h2>
            <button
              onClick={() => setAnalysis(null)}
              className="rounded-lg border border-[#EAE4DE] bg-white px-4 py-2 text-[13px] font-medium text-[#6B6360] transition-colors hover:border-[#C74B6F] hover:text-[#C74B6F]"
            >
              Analyze another
            </button>
          </div>
          <AnalysisResults analysis={analysis} />

          {analysis.wardrobeMatches.length === 0 && getWardrobe().length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-[#EAE4DE] bg-white p-6 text-center">
              <p className="mb-2 text-[15px] font-medium text-[#1A1A1A]">
                Want to match against your closet?
              </p>
              <p className="mb-4 text-[13px] text-[#A09893]">
                Add items to your wardrobe and we&apos;ll find pieces you already own that work.
              </p>
              <Link
                href="/experiments/outfit-builder/wardrobe"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#C74B6F] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#b3405f]"
              >
                Build Your Wardrobe
              </Link>
            </div>
          )}
        </div>
      )}

      {!analysis && !loading && recentAnalyses.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
            Recent Analyses
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {recentAnalyses.slice(0, 6).map((a) => (
              <button
                key={a.id}
                onClick={() => setAnalysis(a)}
                className="group overflow-hidden rounded-xl border border-[#EAE4DE] bg-white transition-all hover:border-[#C74B6F] hover:shadow-sm"
              >
                <img
                  src={a.imageData}
                  alt={a.style}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="p-2.5">
                  <p className="truncate text-[12px] font-medium text-[#1A1A1A] group-hover:text-[#C74B6F]">
                    {a.style}
                  </p>
                  <p className="text-[11px] text-[#A09893]">
                    {a.items.length} items
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
