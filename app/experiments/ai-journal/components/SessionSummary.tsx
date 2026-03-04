"use client";

import Link from "next/link";
import { MOOD_EMOJI, type MoodLevel } from "../lib/types";

interface SessionSummaryProps {
  mood: MoodLevel | null;
  streak: number;
  entryCount: number;
}

const ENCOURAGEMENTS = [
  "Every entry is a step toward knowing yourself better.",
  "You showed up for yourself today. That takes real strength.",
  "Your commitment to self-reflection is something to be proud of.",
  "Writing your thoughts down is one of the kindest things you can do for your mind.",
  "Another day, another page of growth. Well done.",
];

export function SessionSummary({
  mood,
  streak,
  entryCount,
}: SessionSummaryProps) {
  const encouragement =
    ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C74B6F]/10">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="#C74B6F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
        Session Complete
      </h2>
      <p className="mb-8 max-w-[360px] text-[15px] leading-relaxed text-[#6B6360]">
        {encouragement}
      </p>

      <div className="mb-8 grid w-full max-w-[360px] grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#EAE4DE] bg-white p-4">
          <p className="text-[24px] font-bold text-[#1A1A1A]">
            {mood ? MOOD_EMOJI[mood] : "—"}
          </p>
          <p className="mt-1 text-[11px] text-[#A09893]">Mood</p>
        </div>
        <div className="rounded-xl border border-[#EAE4DE] bg-white p-4">
          <p className="text-[24px] font-bold text-[#1A1A1A]">{streak}</p>
          <p className="mt-1 text-[11px] text-[#A09893]">Day streak</p>
        </div>
        <div className="rounded-xl border border-[#EAE4DE] bg-white p-4">
          <p className="text-[24px] font-bold text-[#1A1A1A]">{entryCount}</p>
          <p className="mt-1 text-[11px] text-[#A09893]">Total entries</p>
        </div>
      </div>

      <div className="flex w-full max-w-[360px] flex-col gap-3">
        <Link
          href="/experiments/ai-journal"
          className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f]"
        >
          Back to Home
        </Link>
        <Link
          href="/experiments/ai-journal/insights"
          className="w-full rounded-xl border border-[#EAE4DE] bg-white px-6 py-3.5 text-center text-[15px] font-semibold text-[#6B6360] transition-colors hover:border-[#C0B9B4]"
        >
          View Insights
        </Link>
      </div>
    </div>
  );
}
