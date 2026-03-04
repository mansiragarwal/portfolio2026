"use client";

import type { JournalPrompt } from "../lib/types";

interface PromptCardProps {
  prompts: JournalPrompt[];
  onSelect: (prompt: JournalPrompt) => void;
  onRegenerate: () => void;
}

export function PromptCard({ prompts, onSelect, onRegenerate }: PromptCardProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
        Choose a Prompt
      </p>
      <h2 className="mb-2 text-center text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
        What would you like to reflect on?
      </h2>
      <p className="mb-8 text-center text-[14px] text-[#6B6360]">
        Pick a prompt that resonates, or refresh for new ones.
      </p>

      <div className="mb-6 w-full space-y-3">
        {prompts.map((prompt, i) => (
          <button
            key={prompt.id}
            onClick={() => onSelect(prompt)}
            className="group w-full rounded-xl border border-[#EAE4DE] bg-white p-5 text-left transition-all hover:border-[#C74B6F] hover:shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EFEB] text-[11px] font-bold text-[#A09893] transition-colors group-hover:bg-[#C74B6F]/10 group-hover:text-[#C74B6F]">
                {i + 1}
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-[#1A1A1A]">
              {prompt.text}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 text-[13px] font-medium text-[#A09893] transition-colors hover:text-[#C74B6F]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 8a6 6 0 0110.472-4M14 8a6 6 0 01-10.472 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 1v3h-3M4 15v-3h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Show different prompts
      </button>
    </div>
  );
}
