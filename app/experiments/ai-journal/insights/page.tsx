"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJournalEntries, getProfile } from "../lib/store";
import { generateInsights } from "../lib/mock-ai";
import { MOOD_EMOJI, type InsightData } from "../lib/types";
import { InsightCard } from "../components/InsightCard";
import { ProgressRing } from "../components/ProgressRing";

export default function InsightsPage() {
  const router = useRouter();
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.replace("/experiments/ai-journal/onboarding");
      return;
    }
    const entries = getJournalEntries();
    setInsights(generateInsights(entries));
    setLoaded(true);
  }, [router]);

  if (!loaded || !insights) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C74B6F] border-t-transparent" />
      </div>
    );
  }

  const avgMood =
    insights.moodTrend.length > 0
      ? insights.moodTrend.reduce((s, m) => s + m.mood, 0) /
        insights.moodTrend.length
      : 0;

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
        Insights
      </p>
      <h1 className="mb-2 text-[28px] font-semibold tracking-tight text-[#1A1A1A]">
        Your Patterns
      </h1>
      <p className="mb-8 text-[14px] text-[#6B6360]">
        Trends and observations from your journaling practice.
      </p>

      {insights.totalEntries === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#EAE4DE] py-16 text-center">
          <p className="mb-2 text-[40px]">{"\u{1F4CA}"}</p>
          <p className="mb-1 text-[16px] font-medium text-[#1A1A1A]">
            No data yet
          </p>
          <p className="text-[14px] text-[#A09893]">
            Complete a few journaling sessions to see insights.
          </p>
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center rounded-xl border border-[#EAE4DE] bg-white p-5">
              <ProgressRing
                value={insights.currentStreak}
                max={Math.max(insights.currentStreak, 7)}
                label="Day streak"
              />
            </div>
            <div className="flex flex-col items-center rounded-xl border border-[#EAE4DE] bg-white p-5">
              <ProgressRing
                value={insights.totalEntries}
                max={Math.max(insights.totalEntries, 30)}
                label="Total entries"
              />
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#EAE4DE] bg-white p-5">
              <p className="text-[36px] leading-none">
                {avgMood > 0
                  ? MOOD_EMOJI[Math.round(avgMood) as 1 | 2 | 3 | 4 | 5]
                  : "—"}
              </p>
              <p className="mt-2 text-[11px] text-[#A09893]">Avg mood</p>
            </div>
          </div>

          {/* Mood trend */}
          {insights.moodTrend.length >= 2 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
                Mood Over Time
              </h2>
              <div className="rounded-xl border border-[#EAE4DE] bg-white p-5">
                <div className="flex items-end gap-1" style={{ height: 120 }}>
                  {insights.moodTrend.map((point, i) => {
                    const height = (point.mood / 5) * 100;
                    return (
                      <div
                        key={`${point.date}-${i}`}
                        className="group relative flex flex-1 flex-col items-center"
                      >
                        <div className="absolute -top-6 hidden rounded bg-[#1A1A1A] px-2 py-1 text-[10px] text-white group-hover:block">
                          {MOOD_EMOJI[point.mood]} {point.date.slice(5)}
                        </div>
                        <div
                          className="w-full max-w-[24px] rounded-t-md bg-[#C74B6F]/20 transition-all hover:bg-[#C74B6F]/40"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-[#C0B9B4]">
                  <span>{insights.moodTrend[0]?.date.slice(5)}</span>
                  <span>
                    {insights.moodTrend[insights.moodTrend.length - 1]?.date.slice(5)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Themes */}
          {insights.topThemes.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
                Top Themes
              </h2>
              <div className="flex flex-wrap gap-2">
                {insights.topThemes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-[#C74B6F]/20 bg-[#C74B6F]/5 px-4 py-2 text-[13px] font-medium text-[#C74B6F]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI summaries */}
          <div>
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-[#A09893]">
              AI Observations
            </h2>
            <div className="space-y-3">
              {insights.summaries.map((summary, i) => (
                <InsightCard key={i} text={summary} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
