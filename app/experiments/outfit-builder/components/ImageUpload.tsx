"use client";

import { useCallback, useState, useRef } from "react";

interface ImageUploadProps {
  onImageSelected: (dataUrl: string) => void;
  loading?: boolean;
  label?: string;
  compact?: boolean;
}

export function ImageUpload({ onImageSelected, loading, label, compact }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 1024;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = (h / w) * maxDim;
              w = maxDim;
            } else {
              w = (w / h) * maxDim;
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, w, h);
          onImageSelected(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) processFile(file);
          break;
        }
      }
    },
    [processFile]
  );

  if (compact) {
    return (
      <>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) processFile(file);
          }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-[#EAE4DE] bg-white px-4 py-2.5 text-[13px] font-medium text-[#6B6360] transition-colors hover:border-[#C74B6F] hover:text-[#C74B6F] disabled:opacity-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {label || "Upload Photo"}
        </button>
      </>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onPaste={handlePaste}
      tabIndex={0}
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
        dragOver
          ? "border-[#C74B6F] bg-[#FDF0F3]"
          : "border-[#EAE4DE] bg-white hover:border-[#C74B6F]/40"
      } ${loading ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
        }}
      />

      {loading ? (
        <>
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-[3px] border-[#EAE4DE] border-t-[#C74B6F]" />
          <p className="text-[15px] font-medium text-[#1A1A1A]">Analyzing outfit...</p>
          <p className="mt-1 text-[13px] text-[#A09893]">AI is extracting items, colors, and style</p>
        </>
      ) : (
        <>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDF0F3]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C74B6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p className="text-[15px] font-medium text-[#1A1A1A]">
            {label || "Drop your outfit inspiration here"}
          </p>
          <p className="mt-1 text-[13px] text-[#A09893]">
            or click to upload &middot; paste from clipboard
          </p>
        </>
      )}
    </div>
  );
}
