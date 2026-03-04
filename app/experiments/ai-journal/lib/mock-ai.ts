import type {
  GoalCategory,
  JournalEntry,
  JournalPrompt,
  MoodLevel,
  InsightData,
} from "./types";

// ─── Prompt Bank (~40 curated prompts) ───

const PROMPT_BANK: JournalPrompt[] = [
  // Anxiety
  { id: "p1", text: "What is one worry you can release right now, and why does it no longer serve you?", goalCategories: ["anxiety"], moodRange: [1, 3] },
  { id: "p2", text: "Describe a time you felt anxious but everything turned out okay. What did you learn?", goalCategories: ["anxiety"], moodRange: [1, 4] },
  { id: "p3", text: "Write about three things that are within your control today.", goalCategories: ["anxiety", "stress"], moodRange: [1, 5] },
  { id: "p4", text: "What would you tell a friend who is feeling the same anxiety you feel right now?", goalCategories: ["anxiety"], moodRange: [1, 3] },
  { id: "p5", text: "List five things you can see, four you can touch, three you can hear. How do you feel now?", goalCategories: ["anxiety", "mindfulness"], moodRange: [1, 4] },
  { id: "p6", text: "What is the best possible outcome for the situation worrying you?", goalCategories: ["anxiety"], moodRange: [2, 4] },

  // Sleep
  { id: "p7", text: "What does your ideal evening wind-down routine look like?", goalCategories: ["sleep"], moodRange: [1, 5] },
  { id: "p8", text: "Write about a night you slept deeply. What made it different?", goalCategories: ["sleep"], moodRange: [2, 5] },
  { id: "p9", text: "What thoughts keep you awake at night? Write them here to let them go.", goalCategories: ["sleep", "anxiety"], moodRange: [1, 3] },
  { id: "p10", text: "How does your body feel right now? Scan from head to toe and describe what you notice.", goalCategories: ["sleep", "mindfulness"], moodRange: [1, 5] },

  // Gratitude
  { id: "p11", text: "Name three small things from today that made you smile, even briefly.", goalCategories: ["gratitude"], moodRange: [1, 5] },
  { id: "p12", text: "Write a thank-you letter to someone who has positively impacted your life.", goalCategories: ["gratitude", "relationships"], moodRange: [2, 5] },
  { id: "p13", text: "What is a challenge you've faced that you're now grateful for? How did it shape you?", goalCategories: ["gratitude", "self-esteem"], moodRange: [2, 5] },
  { id: "p14", text: "Describe a simple pleasure you often take for granted.", goalCategories: ["gratitude", "mindfulness"], moodRange: [3, 5] },
  { id: "p15", text: "What part of your daily routine are you most thankful for?", goalCategories: ["gratitude"], moodRange: [2, 5] },
  { id: "p16", text: "Who made a difference in your week? Write about how they helped.", goalCategories: ["gratitude", "relationships"], moodRange: [3, 5] },

  // Self-esteem
  { id: "p17", text: "Write about a recent accomplishment, no matter how small. How did it feel?", goalCategories: ["self-esteem"], moodRange: [1, 5] },
  { id: "p18", text: "List five qualities you genuinely like about yourself.", goalCategories: ["self-esteem"], moodRange: [1, 4] },
  { id: "p19", text: "What would your life look like if you fully believed in yourself?", goalCategories: ["self-esteem"], moodRange: [2, 5] },
  { id: "p20", text: "Write about a time someone complimented you. How did you receive it?", goalCategories: ["self-esteem", "relationships"], moodRange: [2, 5] },
  { id: "p21", text: "What is something hard you did recently that you're proud of getting through?", goalCategories: ["self-esteem", "stress"], moodRange: [1, 4] },

  // Relationships
  { id: "p22", text: "Describe a relationship in your life that brings you peace. What makes it special?", goalCategories: ["relationships"], moodRange: [2, 5] },
  { id: "p23", text: "Is there a conversation you've been avoiding? What would you say if fear wasn't a factor?", goalCategories: ["relationships"], moodRange: [1, 4] },
  { id: "p24", text: "Write about a moment of genuine connection you experienced recently.", goalCategories: ["relationships", "gratitude"], moodRange: [3, 5] },
  { id: "p25", text: "What boundaries would help you show up better in your relationships?", goalCategories: ["relationships", "self-esteem"], moodRange: [1, 4] },

  // Stress
  { id: "p26", text: "What is the biggest source of stress in your life right now? Break it into smaller parts.", goalCategories: ["stress"], moodRange: [1, 3] },
  { id: "p27", text: "Describe your stress as a weather pattern. Is it a storm, overcast, or clearing up?", goalCategories: ["stress", "mindfulness"], moodRange: [1, 4] },
  { id: "p28", text: "Write about one thing you can do today to lighten your mental load.", goalCategories: ["stress"], moodRange: [1, 4] },
  { id: "p29", text: "When was the last time you truly relaxed? What were you doing?", goalCategories: ["stress", "sleep"], moodRange: [2, 5] },
  { id: "p30", text: "If you could delegate one responsibility right now, what would it be and why?", goalCategories: ["stress"], moodRange: [1, 3] },

  // Mindfulness
  { id: "p31", text: "Describe this exact moment using all five senses.", goalCategories: ["mindfulness"], moodRange: [1, 5] },
  { id: "p32", text: "What emotion are you feeling right now? Where do you feel it in your body?", goalCategories: ["mindfulness"], moodRange: [1, 5] },
  { id: "p33", text: "Write without stopping for two minutes about whatever comes to mind. Don't edit.", goalCategories: ["mindfulness"], moodRange: [1, 5] },
  { id: "p34", text: "What are you holding onto that you could benefit from releasing?", goalCategories: ["mindfulness", "anxiety"], moodRange: [1, 4] },
  { id: "p35", text: "Describe your breathing right now. Slow, fast, shallow, deep? Just notice it.", goalCategories: ["mindfulness"], moodRange: [1, 5] },

  // General / multi-category
  { id: "p36", text: "If today had a theme, what would it be? Write about why.", goalCategories: ["mindfulness", "gratitude"], moodRange: [1, 5] },
  { id: "p37", text: "What are you looking forward to this week?", goalCategories: ["gratitude", "self-esteem"], moodRange: [2, 5] },
  { id: "p38", text: "Write a letter to your future self one year from now.", goalCategories: ["self-esteem", "mindfulness"], moodRange: [1, 5] },
  { id: "p39", text: "What does 'healing' mean to you right now?", goalCategories: ["anxiety", "self-esteem", "mindfulness"], moodRange: [1, 4] },
  { id: "p40", text: "Describe a safe place — real or imagined — in vivid detail.", goalCategories: ["anxiety", "sleep", "mindfulness"], moodRange: [1, 3] },
  { id: "p41", text: "What lesson has this past month taught you?", goalCategories: ["gratitude", "self-esteem", "stress"], moodRange: [1, 5] },
  { id: "p42", text: "Write about one kind thing you did for yourself recently.", goalCategories: ["self-esteem", "gratitude"], moodRange: [2, 5] },
];

// ─── Prompt Generation ───

export function generatePrompts(
  mood: MoodLevel | null,
  goalCategories: GoalCategory[],
  usedPromptIds: string[] = []
): JournalPrompt[] {
  let pool = PROMPT_BANK.filter((p) => !usedPromptIds.includes(p.id));

  if (goalCategories.length > 0) {
    const goalMatches = pool.filter((p) =>
      p.goalCategories.some((gc) => goalCategories.includes(gc))
    );
    if (goalMatches.length >= 3) pool = goalMatches;
  }

  if (mood !== null) {
    const moodMatches = pool.filter(
      (p) => mood >= p.moodRange[0] && mood <= p.moodRange[1]
    );
    if (moodMatches.length >= 3) pool = moodMatches;
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

// ─── Reflective Response ───

const REFLECTIONS = {
  empathy: [
    "It sounds like you're carrying a lot right now. Thank you for being honest with yourself.",
    "I appreciate you sharing that. It takes courage to put these feelings into words.",
    "What you're feeling is valid. Writing about it is a powerful step.",
  ],
  encouragement: [
    "You've shown real self-awareness here. That's something to be proud of.",
    "I notice a lot of strength in what you wrote, even if it doesn't feel that way.",
    "The fact that you're reflecting on this shows genuine growth.",
  ],
  curiosity: [
    "What do you think might shift if you approached this with more compassion for yourself?",
    "Is there a pattern here that you've noticed before?",
    "What would it feel like to let go of just one piece of this?",
  ],
  gratitude: [
    "It's beautiful that you can recognize the good, even on harder days.",
    "Noticing these positive moments is a skill — and you're building it.",
    "Gratitude has a way of reshaping our perspective. You're doing that work right now.",
  ],
  lowMood: [
    "I hear you, and I want you to know that difficult days don't define you.",
    "It's okay to not be okay. This journal is a safe space for all of it.",
    "Even on the hardest days, you showed up for yourself by writing. That matters.",
  ],
  highMood: [
    "It's wonderful to see you in a good place. Let this feeling anchor you.",
    "Capture this energy — you can come back to it on harder days.",
    "Your positivity is contagious, even on paper. Keep building on this.",
  ],
};

export function generateReflection(
  entryText: string,
  mood: MoodLevel | null
): string {
  const text = entryText.toLowerCase();
  const parts: string[] = [];

  if (mood !== null && mood <= 2) {
    parts.push(pick(REFLECTIONS.lowMood));
  } else if (mood !== null && mood >= 4) {
    parts.push(pick(REFLECTIONS.highMood));
  } else {
    parts.push(pick(REFLECTIONS.empathy));
  }

  if (
    text.includes("grateful") ||
    text.includes("thankful") ||
    text.includes("appreciate")
  ) {
    parts.push(pick(REFLECTIONS.gratitude));
  } else if (
    text.includes("hard") ||
    text.includes("difficult") ||
    text.includes("struggle")
  ) {
    parts.push(pick(REFLECTIONS.encouragement));
  } else {
    parts.push(pick(REFLECTIONS.curiosity));
  }

  return parts.join(" ");
}

// ─── Distress Detection ───

const DISTRESS_PATTERNS = [
  /\b(want to die|don'?t want to (live|be here|exist))\b/i,
  /\b(suicid|self[- ]?harm|hurt myself|end it all)\b/i,
  /\b(hopeless|no reason to (live|go on|continue))\b/i,
  /\b(can'?t (go on|take it|do this) anymore)\b/i,
  /\b(better off (dead|without me))\b/i,
  /\b(no one (cares|would miss me|would notice))\b/i,
];

export function detectDistress(entryText: string): {
  detected: boolean;
  severity: "low" | "high";
} {
  const matches = DISTRESS_PATTERNS.filter((p) => p.test(entryText));
  if (matches.length === 0) return { detected: false, severity: "low" };
  return {
    detected: true,
    severity: matches.length >= 2 ? "high" : "low",
  };
}

// ─── Insights Generation ───

const THEME_KEYWORDS: Record<string, string[]> = {
  Anxiety: ["anxious", "worry", "nervous", "fear", "panic", "overwhelm"],
  Gratitude: ["grateful", "thankful", "appreciate", "blessed", "fortunate"],
  Growth: ["learn", "grow", "improve", "progress", "better", "goal"],
  Relationships: ["friend", "family", "love", "partner", "connection", "people"],
  "Self-care": ["rest", "relax", "sleep", "care", "boundary", "recharge"],
  Stress: ["stress", "pressure", "busy", "deadline", "overwhelm", "exhausted"],
  Mindfulness: ["present", "breath", "aware", "notice", "moment", "calm"],
};

export function generateInsights(entries: JournalEntry[]): InsightData {
  const moodTrend = entries
    .filter((e) => e.moodAtTime !== null)
    .slice(0, 30)
    .reverse()
    .map((e) => ({
      date: e.createdAt.split("T")[0],
      mood: e.moodAtTime!,
    }));

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(today);
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split("T")[0];
    const hasEntry = entries.some(
      (e) => e.createdAt.split("T")[0] === dateStr
    );
    if (hasEntry) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  const allText = entries.map((e) => e.content.toLowerCase()).join(" ");
  const themeCounts: Record<string, number> = {};
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    themeCounts[theme] = keywords.reduce(
      (count, kw) => count + (allText.split(kw).length - 1),
      0
    );
  }
  const topThemes = Object.entries(themeCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([theme]) => theme);

  const summaries = buildSummaries(entries, moodTrend, topThemes, currentStreak);

  return {
    moodTrend,
    currentStreak,
    totalEntries: entries.length,
    topThemes,
    summaries,
  };
}

function buildSummaries(
  entries: JournalEntry[],
  moodTrend: { date: string; mood: MoodLevel }[],
  topThemes: string[],
  streak: number
): string[] {
  const summaries: string[] = [];

  if (moodTrend.length >= 3) {
    const recent = moodTrend.slice(-5);
    const avgMood =
      recent.reduce((sum, m) => sum + m.mood, 0) / recent.length;
    if (avgMood >= 3.5) {
      summaries.push(
        "Your recent mood has been trending positively. Whatever you're doing, it seems to be working. Keep it up!"
      );
    } else if (avgMood <= 2.5) {
      summaries.push(
        "Your mood has been lower lately. Remember, it's okay to have tough stretches. Consider revisiting your goals or reaching out to someone you trust."
      );
    } else {
      summaries.push(
        "Your mood has been relatively steady. Consistency in journaling can help deepen your self-awareness over time."
      );
    }
  }

  if (topThemes.length > 0) {
    summaries.push(
      `Your writing frequently touches on themes of ${topThemes.slice(0, 3).join(", ")}. These recurring themes may reflect what matters most to you right now.`
    );
  }

  if (streak >= 7) {
    summaries.push(
      `You're on a ${streak}-day journaling streak! Consistent reflection builds emotional resilience and self-understanding.`
    );
  } else if (streak >= 3) {
    summaries.push(
      `Nice — ${streak} days in a row! You're building a healthy habit. Every session counts.`
    );
  }

  if (entries.length >= 10) {
    const distressCount = entries.filter((e) => e.distressDetected).length;
    if (distressCount === 0) {
      summaries.push(
        "Across your entries, your writing reflects resilience and thoughtfulness. Keep nurturing this practice."
      );
    }
  }

  if (summaries.length === 0) {
    summaries.push(
      "Keep writing! The more you journal, the richer your insights will become."
    );
  }

  return summaries;
}

// ─── Tag Extraction ───

export function extractTags(
  entryText: string,
  goalCategories: GoalCategory[]
): string[] {
  const text = entryText.toLowerCase();
  const tags: string[] = [];

  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      tags.push(theme);
    }
  }

  goalCategories.forEach((gc) => {
    const label = gc.charAt(0).toUpperCase() + gc.slice(1);
    if (!tags.includes(label)) tags.push(label);
  });

  return tags.slice(0, 5);
}

// ─── Helpers ───

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
