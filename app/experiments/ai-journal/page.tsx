"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, getJournalEntries } from "./lib/store";
import Link from "next/link";
import {
  MOOD_EMOJI,
  MOOD_LABELS,
  type JournalEntry,
  type UserProfile,
} from "./lib/types";

function getStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  let checkDate = new Date(today);

  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split("T")[0];
    const hasEntry = entries.some(
      (e) => e.createdAt.split("T")[0] === dateStr
    );
    if (hasEntry) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
      continue;
    } else {
      break;
    }
  }
  return streak;
}

export default function AIJournalHome() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.replace("/experiments/ai-journal/onboarding");
      return;
    }
    setProfile(p);
    setEntries(getJournalEntries());
    setLoaded(true);
  }, [router]);

  if (!loaded || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C74B6F] border-t-transparent" />
      </div>
    );
  }

  const streak = getStreak(entries);
  const todayEntry = entries.find(
    (e) => e.createdAt.split("T")[0] === new Date().toISOString().split("T")[0]
  );
  const lastMood = entries.length > 0 ? entries[0].moodAtTime : null;

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10">
      <div className="mb-10">
        <p className="mb-1 text-[13px] text-[#A09893]">
          Welcome back
        </p>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#1A1A1A]">
          {profile.name}
        </h1>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#EAE4DE] bg-white p-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Streak
          </p>
          <p className="text-[32px] font-bold leading-none text-[#1A1A1A]">
            {streak}
          </p>
          <p className="mt-1 text-[12px] text-[#A09893]">days</p>
        </div>
        <div className="rounded-xl border border-[#EAE4DE] bg-white p-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Entries
          </p>
          <p className="text-[32px] font-bold leading-none text-[#1A1A1A]">
            {entries.length}
          </p>
          <p className="mt-1 text-[12px] text-[#A09893]">total</p>
        </div>
        <div className="rounded-xl border border-[#EAE4DE] bg-white p-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#A09893]">
            Last Mood
          </p>
          <p className="text-[32px] leading-none">
            {lastMood ? MOOD_EMOJI[lastMood] : "—"}
          </p>
          <p className="mt-1 text-[12px] text-[#A09893]">
            {lastMood ? MOOD_LABELS[lastMood] : "No data"}
          </p>
        </div>
      </div>

      <Link
        href="/experiments/ai-journal/session"
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C74B6F] px-6 py-4 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#b3405f] hover:shadow-md"
      >
        {todayEntry ? "Start Another Entry" : "Start Today's Journal"}
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {entries.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
              Recent Entries
            </h2>
            <Link
              href="/experiments/ai-journal/history"
              className="text-[13px] font-medium text-[#C74B6F] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {entries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-[#EAE4DE] bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[12px] text-[#A09893]">
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {entry.moodAtTime && (
                    <span className="text-[16px]">
                      {MOOD_EMOJI[entry.moodAtTime]}
                    </span>
                  )}
                </div>
                <p className="line-clamp-2 text-[14px] leading-relaxed text-[#6B6360]">
                  {entry.content}
                </p>
                {entry.tags.length > 0 && (
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
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
          Your Goals
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.goals.map((goal) => (
            <span
              key={goal.id}
              className="rounded-full border border-[#EAE4DE] bg-white px-4 py-1.5 text-[13px] text-[#6B6360]"
            >
              {goal.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
