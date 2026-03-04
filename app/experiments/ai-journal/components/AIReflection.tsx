"use client";

import { useEffect, useState } from "react";

interface AIReflectionProps {
  reflection: string;
  onContinue: () => void;
}

export function AIReflection({ reflection, onContinue }: AIReflectionProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < reflection.length) {
        setDisplayed(reflection.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [reflection]);

  return (
    <div className="w-full">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
        AI Reflection
      </p>
      <h2 className="mb-6 text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
        Here&apos;s what I noticed
      </h2>

      <div className="mb-8 rounded-xl border border-[#EAE4DE] bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C74B6F]/10">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 1a7 7 0 100 14A7 7 0 008 1z"
                stroke="#C74B6F"
                strokeWidth="1.5"
              />
              <path
                d="M5.5 6.5S6.5 5 8 5s2.5 1.5 2.5 1.5M6 10s.75 1 2 1 2-1 2-1"
                stroke="#C74B6F"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#C74B6F]">
            MindJournal AI
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-[#6B6360]">
          {displayed}
          {!done && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#C74B6F]" />
          )}
        </p>
      </div>

      {done && (
        <button
          onClick={onContinue}
          className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f]"
        >
          Save &amp; Continue
        </button>
      )}
    </div>
  );
}
