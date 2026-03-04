"use client";

import { useState } from "react";
import { MOOD_EMOJI, MOOD_LABELS, type MoodLevel } from "../lib/types";

interface MoodCheckInProps {
  onSelect: (mood: MoodLevel) => void;
  onSkip: () => void;
}

const MOODS: MoodLevel[] = [1, 2, 3, 4, 5];

export function MoodCheckIn({ onSelect, onSkip }: MoodCheckInProps) {
  const [hovered, setHovered] = useState<MoodLevel | null>(null);
  const [selected, setSelected] = useState<MoodLevel | null>(null);

  function handleSelect(mood: MoodLevel) {
    setSelected(mood);
    setTimeout(() => onSelect(mood), 400);
  }

  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
        Mood Check-In
      </p>
      <h2 className="mb-2 text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
        How are you feeling right now?
      </h2>
      <p className="mb-10 text-[14px] text-[#6B6360]">
        Take a moment to check in with yourself. There are no wrong answers.
      </p>

      <div className="mb-6 flex items-center gap-4">
        {MOODS.map((mood) => {
          const isActive = selected === mood;
          const isHovered = hovered === mood;
          return (
            <button
              key={mood}
              onClick={() => handleSelect(mood)}
              onMouseEnter={() => setHovered(mood)}
              onMouseLeave={() => setHovered(null)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 ${
                isActive
                  ? "scale-110 border-[#C74B6F] bg-[#C74B6F]/10 shadow-md"
                  : isHovered
                    ? "border-[#C0B9B4] bg-white shadow-sm"
                    : "border-[#EAE4DE] bg-white"
              }`}
            >
              <span className="text-[36px] leading-none">
                {MOOD_EMOJI[mood]}
              </span>
              <span
                className={`text-[12px] font-medium transition-colors ${
                  isActive ? "text-[#C74B6F]" : "text-[#A09893]"
                }`}
              >
                {MOOD_LABELS[mood]}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onSkip}
        className="mt-2 text-[13px] font-medium text-[#A09893] transition-colors hover:text-[#6B6360]"
      >
        Skip for now
      </button>
    </div>
  );
}
