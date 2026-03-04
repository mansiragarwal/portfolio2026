"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJournalEntries, getProfile } from "../lib/store";
import { MOOD_EMOJI, MOOD_LABELS, type JournalEntry } from "../lib/types";

export default function HistoryPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.replace("/experiments/ai-journal/onboarding");
      return;
    }
    setEntries(getJournalEntries());
    setLoaded(true);
  }, [router]);

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C74B6F] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
        Journal Archive
      </p>
      <h1 className="mb-2 text-[28px] font-semibold tracking-tight text-[#1A1A1A]">
        Past Entries
      </h1>
      <p className="mb-8 text-[14px] text-[#6B6360]">
        {entries.length} {entries.length === 1 ? "entry" : "entries"} total
      </p>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#EAE4DE] py-16 text-center">
          <p className="mb-2 text-[40px]">{"\u{1F4D3}"}</p>
          <p className="mb-1 text-[16px] font-medium text-[#1A1A1A]">
            No entries yet
          </p>
          <p className="text-[14px] text-[#A09893]">
            Start a journaling session to see your entries here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => {
            const isExpanded = expandedId === entry.id;
            return (
              <div
                key={entry.id}
                className="rounded-xl border border-[#EAE4DE] bg-white transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : entry.id)
                  }
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {entry.moodAtTime && (
                        <span
                          className="text-[20px]"
                          title={MOOD_LABELS[entry.moodAtTime]}
                        >
                          {MOOD_EMOJI[entry.moodAtTime]}
                        </span>
                      )}
                      <div>
                        <p className="text-[14px] font-medium text-[#1A1A1A]">
                          {new Date(entry.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[13px] text-[#A09893]">
                          {entry.promptUsed}
                        </p>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`shrink-0 text-[#C0B9B4] transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {!isExpanded && entry.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#F3EFEB] px-2.5 py-0.5 text-[11px] font-medium text-[#6B6360]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-[#EAE4DE] px-5 pb-5 pt-4">
                    <div className="mb-4">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
                        Prompt
                      </p>
                      <p className="text-[14px] italic text-[#6B6360]">
                        &ldquo;{entry.promptUsed}&rdquo;
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
                        Your Entry
                      </p>
                      <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#1A1A1A]">
                        {entry.content}
                      </p>
                    </div>

                    {entry.aiReflection && (
                      <div className="mb-4 rounded-lg bg-[#F9F6F3] p-4">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
                          AI Reflection
                        </p>
                        <p className="text-[14px] leading-relaxed text-[#6B6360]">
                          {entry.aiReflection}
                        </p>
                      </div>
                    )}

                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#F3EFEB] px-2.5 py-0.5 text-[11px] font-medium text-[#6B6360]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.distressDetected && (
                      <div className="mt-3 rounded-lg bg-[#FDF0F3] px-3 py-2">
                        <p className="text-[12px] font-medium text-[#C74B6F]">
                          Support resources were shown during this session
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
