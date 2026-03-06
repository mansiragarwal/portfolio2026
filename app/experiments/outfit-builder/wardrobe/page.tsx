"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageUpload } from "../components/ImageUpload";
import { getWardrobe, addWardrobeItem, removeWardrobeItem } from "../lib/store";
import type { WardrobeItem } from "../lib/types";

export default function WardrobePage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(getWardrobe());
  }, []);

  const handleUpload = useCallback(async (imageData: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/outfit/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      const mainItem = data.items?.[0];

      if (!mainItem) {
        throw new Error("Could not identify a clothing item");
      }

      const wardrobeItem: WardrobeItem = {
        id: crypto.randomUUID(),
        imageData,
        name: mainItem.name,
        category: mainItem.category,
        color: mainItem.color,
        description: mainItem.description,
        addedAt: new Date().toISOString(),
      };

      addWardrobeItem(wardrobeItem);
      setItems(getWardrobe());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = useCallback((id: string) => {
    removeWardrobeItem(id);
    setItems(getWardrobe());
  }, []);

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10">
      <div className="mb-8">
        <h1 className="mb-2 text-[28px] font-semibold tracking-tight text-[#1A1A1A]">
          My Wardrobe
        </h1>
        <p className="text-[15px] text-[#6B6360]">
          Upload photos of your clothes. When you analyze an outfit, we&apos;ll
          match pieces you already own.
        </p>
      </div>

      <div className="mb-8">
        <ImageUpload
          onImageSelected={handleUpload}
          loading={loading}
          label="Upload a clothing item"
        />
        {loading && (
          <p className="mt-3 text-center text-[13px] text-[#A09893]">
            Identifying item...
          </p>
        )}
        {error && (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-[13px] text-red-700">{error}</p>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#EAE4DE] bg-white p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3EFEB]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A09893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
            </svg>
          </div>
          <p className="mb-1 text-[15px] font-medium text-[#1A1A1A]">
            Your wardrobe is empty
          </p>
          <p className="text-[13px] text-[#A09893]">
            Upload photos of your clothing items to start matching
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
              {items.length} {items.length === 1 ? "Item" : "Items"}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-[#EAE4DE] bg-white"
              >
                <img
                  src={item.imageData}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-3">
                  <p className="truncate text-[13px] font-medium text-[#1A1A1A]">
                    {item.name}
                  </p>
                  <p className="truncate text-[12px] text-[#A09893]">
                    {item.color} &middot; {item.category}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                  aria-label="Remove item"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
