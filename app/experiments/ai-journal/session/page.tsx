"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  type MoodLevel,
  type JournalPrompt,
  type GoalCategory,
  type SessionStep,
  type UserProfile,
} from "../lib/types";
import {
  getProfile,
  saveMoodEntry,
  createJournalEntry,
  getJournalEntries,
  getJournalingStreak,
} from "../lib/store";
import {
  generatePrompts,
  generateReflection,
  detectDistress,
  extractTags,
} from "../lib/mock-ai";
import { MoodCheckIn } from "../components/MoodCheckIn";
import { PromptCard } from "../components/PromptCard";
import { JournalEditor } from "../components/JournalEditor";
import { AIReflection } from "../components/AIReflection";
import { CrisisResources } from "../components/CrisisResources";
import { SessionSummary } from "../components/SessionSummary";

export default function SessionPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [step, setStep] = useState<SessionStep>("mood");
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [prompts, setPrompts] = useState<JournalPrompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(
    null
  );
  const [entryContent, setEntryContent] = useState("");
  const [reflection, setReflection] = useState("");
  const [usedPromptIds, setUsedPromptIds] = useState<string[]>([]);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.replace("/experiments/ai-journal/onboarding");
      return;
    }
    setProfile(p);
  }, [router]);

  const goalCategories: GoalCategory[] =
    profile?.goals.map((g) => g.category) ?? [];

  const loadPrompts = useCallback(
    (currentMood: MoodLevel | null, excludeIds: string[]) => {
      const newPrompts = generatePrompts(currentMood, goalCategories, excludeIds);
      setPrompts(newPrompts);
      setUsedPromptIds((prev) => [
        ...prev,
        ...newPrompts.map((p) => p.id),
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile]
  );

  function handleMoodSelect(selected: MoodLevel) {
    setMood(selected);
    saveMoodEntry(selected);
    loadPrompts(selected, usedPromptIds);
    setStep("prompts");
  }

  function handleMoodSkip() {
    setMood(null);
    loadPrompts(null, usedPromptIds);
    setStep("prompts");
  }

  function handlePromptSelect(prompt: JournalPrompt) {
    setSelectedPrompt(prompt);
    setStep("writing");
  }

  function handleRegenerate() {
    loadPrompts(mood, usedPromptIds);
  }

  function handleEntrySubmit(content: string) {
    setEntryContent(content);

    const distress = detectDistress(content);
    const reflectionText = generateReflection(content, mood);
    setReflection(reflectionText);

    if (distress.detected) {
      setStep("crisis");
    } else {
      setStep("reflection");
    }
  }

  function handleCrisisAcknowledge() {
    setStep("reflection");
  }

  function handleReflectionContinue() {
    const tags = extractTags(entryContent, goalCategories);
    const distress = detectDistress(entryContent);

    createJournalEntry(
      selectedPrompt?.text ?? "",
      entryContent,
      mood,
      reflection,
      tags,
      distress.detected
    );
    setStep("summary");
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C74B6F] border-t-transparent" />
      </div>
    );
  }

  const streak = getJournalingStreak();
  const entryCount = getJournalEntries().length;

  const stepLabels: Record<SessionStep, string> = {
    mood: "Check In",
    prompts: "Prompts",
    writing: "Write",
    reflection: "Reflect",
    crisis: "Support",
    summary: "Done",
  };

  const stepOrder: SessionStep[] = [
    "mood",
    "prompts",
    "writing",
    "reflection",
    "summary",
  ];
  const currentIndex = stepOrder.indexOf(
    step === "crisis" ? "reflection" : step
  );

  return (
    <div className="mx-auto max-w-[600px] px-6 pb-20 pt-8">
      {/* Step indicator */}
      {step !== "summary" && (
        <div className="mb-10 flex items-center justify-center gap-1">
          {stepOrder.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div
                className={`flex h-7 items-center rounded-full px-3 text-[11px] font-semibold transition-colors ${
                  i <= currentIndex
                    ? "bg-[#C74B6F]/10 text-[#C74B6F]"
                    : "bg-[#F3EFEB] text-[#C0B9B4]"
                }`}
              >
                {stepLabels[s]}
              </div>
              {i < stepOrder.length - 1 && (
                <div
                  className={`h-px w-4 transition-colors ${
                    i < currentIndex ? "bg-[#C74B6F]/30" : "bg-[#EAE4DE]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {step === "mood" && (
        <MoodCheckIn onSelect={handleMoodSelect} onSkip={handleMoodSkip} />
      )}

      {step === "prompts" && (
        <PromptCard
          prompts={prompts}
          onSelect={handlePromptSelect}
          onRegenerate={handleRegenerate}
        />
      )}

      {step === "writing" && selectedPrompt && (
        <JournalEditor
          prompt={selectedPrompt.text}
          onSubmit={handleEntrySubmit}
        />
      )}

      {step === "crisis" && (
        <CrisisResources onAcknowledge={handleCrisisAcknowledge} />
      )}

      {step === "reflection" && (
        <AIReflection
          reflection={reflection}
          onContinue={handleReflectionContinue}
        />
      )}

      {step === "summary" && (
        <SessionSummary
          mood={mood}
          streak={streak}
          entryCount={entryCount}
        />
      )}
    </div>
  );
}
