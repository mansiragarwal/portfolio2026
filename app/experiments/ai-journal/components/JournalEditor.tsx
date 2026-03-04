"use client";

import { useState } from "react";

interface JournalEditorProps {
  prompt: string;
  onSubmit: (content: string) => void;
}

export function JournalEditor({ prompt, onSubmit }: JournalEditorProps) {
  const [content, setContent] = useState("");

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
        Your Prompt
      </p>
      <div className="mb-6 rounded-xl border border-[#EAE4DE] bg-[#F9F6F3] px-5 py-4">
        <p className="text-[15px] leading-relaxed text-[#6B6360] italic">
          &ldquo;{prompt}&rdquo;
        </p>
      </div>

      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts..."
          rows={12}
          className="w-full resize-none rounded-xl border border-[#EAE4DE] bg-white px-5 py-4 text-[15px] leading-relaxed text-[#1A1A1A] outline-none transition-colors placeholder:text-[#C0B9B4] focus:border-[#C74B6F]"
          autoFocus
        />
        <div className="absolute bottom-3 right-4 text-[12px] text-[#C0B9B4]">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </div>
      </div>

      <button
        onClick={() => onSubmit(content)}
        disabled={content.trim().length < 10}
        className="mt-6 w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f] disabled:opacity-40 disabled:hover:bg-[#C74B6F]"
      >
        Complete Entry
      </button>
    </div>
  );
}
