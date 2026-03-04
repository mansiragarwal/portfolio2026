"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AVAILABLE_GOALS, AVAILABLE_HABITS, type Goal } from "../lib/types";
import { createProfile } from "../lib/store";

type OnboardingStep = "welcome" | "goals" | "habits" | "reminders";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [name, setName] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [journalTime, setJournalTime] = useState("21:00");

  function toggleGoal(goal: Goal) {
    setSelectedGoals((prev) =>
      prev.find((g) => g.id === goal.id)
        ? prev.filter((g) => g.id !== goal.id)
        : [...prev, goal]
    );
  }

  function toggleHabit(habit: string) {
    setSelectedHabits((prev) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]
    );
  }

  function handleComplete() {
    createProfile(
      name || "Journal User",
      selectedGoals,
      selectedHabits,
      journalTime
    );
    router.replace("/experiments/ai-journal/session");
  }

  const progress =
    step === "welcome" ? 25 : step === "goals" ? 50 : step === "habits" ? 75 : 100;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F4]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-[#EAE4DE]">
        <div
          className="h-full bg-[#C74B6F] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-[480px]">
          {step === "welcome" && (
            <div className="animate-in fade-in">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
                Welcome to MindJournal
              </p>
              <h1 className="mb-4 text-[32px] font-semibold leading-tight tracking-tight text-[#1A1A1A]">
                Your guided space for reflection and growth.
              </h1>
              <p className="mb-10 text-[15px] leading-relaxed text-[#6B6360]">
                Personalized prompts, mood tracking, and gentle AI
                companionship — all private and on your device.
              </p>

              <label className="mb-2 block text-[13px] font-medium text-[#6B6360]">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mb-8 w-full rounded-xl border border-[#EAE4DE] bg-white px-4 py-3 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#C0B9B4] focus:border-[#C74B6F]"
              />

              <button
                onClick={() => setStep("goals")}
                className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f]"
              >
                Get Started
              </button>
            </div>
          )}

          {step === "goals" && (
            <div>
              <button
                onClick={() => setStep("welcome")}
                className="mb-6 text-[13px] font-medium text-[#A09893] hover:text-[#6B6360]"
              >
                &larr; Back
              </button>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
                Step 1 of 3
              </p>
              <h2 className="mb-2 text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
                Set your mental health goals
              </h2>
              <p className="mb-8 text-[14px] text-[#6B6360]">
                Choose what you&apos;d like to focus on. This helps us
                personalize your prompts.
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                {AVAILABLE_GOALS.map((goal) => {
                  const selected = selectedGoals.some((g) => g.id === goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal)}
                      className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all ${
                        selected
                          ? "border-[#C74B6F] bg-[#C74B6F]/10 text-[#C74B6F]"
                          : "border-[#EAE4DE] bg-white text-[#6B6360] hover:border-[#C0B9B4]"
                      }`}
                    >
                      {goal.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep("habits")}
                disabled={selectedGoals.length === 0}
                className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f] disabled:opacity-40 disabled:hover:bg-[#C74B6F]"
              >
                Continue
              </button>
            </div>
          )}

          {step === "habits" && (
            <div>
              <button
                onClick={() => setStep("goals")}
                className="mb-6 text-[13px] font-medium text-[#A09893] hover:text-[#6B6360]"
              >
                &larr; Back
              </button>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
                Step 2 of 3
              </p>
              <h2 className="mb-2 text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
                Choose habits to track
              </h2>
              <p className="mb-8 text-[14px] text-[#6B6360]">
                Pick habits you want to build alongside your journaling
                practice.
              </p>

              <div className="mb-8 space-y-2">
                {AVAILABLE_HABITS.map((habit) => {
                  const selected = selectedHabits.includes(habit);
                  return (
                    <button
                      key={habit}
                      onClick={() => toggleHabit(habit)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-5 py-3.5 text-left text-[14px] font-medium transition-all ${
                        selected
                          ? "border-[#C74B6F] bg-[#C74B6F]/5 text-[#C74B6F]"
                          : "border-[#EAE4DE] bg-white text-[#6B6360] hover:border-[#C0B9B4]"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[12px] transition-colors ${
                          selected
                            ? "border-[#C74B6F] bg-[#C74B6F] text-white"
                            : "border-[#D5CEC8]"
                        }`}
                      >
                        {selected && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {habit}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep("reminders")}
                className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f]"
              >
                Continue
              </button>
            </div>
          )}

          {step === "reminders" && (
            <div>
              <button
                onClick={() => setStep("habits")}
                className="mb-6 text-[13px] font-medium text-[#A09893] hover:text-[#6B6360]"
              >
                &larr; Back
              </button>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A09893]">
                Step 3 of 3
              </p>
              <h2 className="mb-2 text-[24px] font-semibold tracking-tight text-[#1A1A1A]">
                Set your journaling time
              </h2>
              <p className="mb-8 text-[14px] text-[#6B6360]">
                When would you like to be reminded to journal? You can always
                change this later.
              </p>

              <div className="mb-4">
                <input
                  type="time"
                  value={journalTime}
                  onChange={(e) => setJournalTime(e.target.value)}
                  className="w-full rounded-xl border border-[#EAE4DE] bg-white px-4 py-3 text-[15px] text-[#1A1A1A] outline-none transition-colors focus:border-[#C74B6F]"
                />
              </div>

              <div className="mb-8 flex flex-wrap gap-2">
                {["07:00", "12:00", "18:00", "21:00"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setJournalTime(time)}
                    className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all ${
                      journalTime === time
                        ? "border-[#C74B6F] bg-[#C74B6F]/10 text-[#C74B6F]"
                        : "border-[#EAE4DE] bg-white text-[#6B6360] hover:border-[#C0B9B4]"
                    }`}
                  >
                    {time === "07:00"
                      ? "Morning"
                      : time === "12:00"
                        ? "Midday"
                        : time === "18:00"
                          ? "Evening"
                          : "Night"}
                  </button>
                ))}
              </div>

              <button
                onClick={handleComplete}
                className="w-full rounded-xl bg-[#C74B6F] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#b3405f]"
              >
                Start Journaling
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
