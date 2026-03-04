export interface UserProfile {
  name: string;
  goals: Goal[];
  habits: string[];
  journalTime: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  label: string;
  category: GoalCategory;
}

export type GoalCategory =
  | "anxiety"
  | "sleep"
  | "gratitude"
  | "self-esteem"
  | "relationships"
  | "stress"
  | "mindfulness";

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export const MOOD_LABELS: Record<MoodLevel, string> = {
  1: "Struggling",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export const MOOD_EMOJI: Record<MoodLevel, string> = {
  1: "\u{1F61E}",
  2: "\u{1F614}",
  3: "\u{1F610}",
  4: "\u{1F60A}",
  5: "\u{1F60D}",
};

export interface MoodEntry {
  id: string;
  mood: MoodLevel;
  timestamp: string;
}

export interface JournalEntry {
  id: string;
  promptUsed: string;
  content: string;
  moodAtTime: MoodLevel | null;
  aiReflection: string;
  tags: string[];
  distressDetected: boolean;
  createdAt: string;
}

export interface HabitLog {
  id: string;
  habitName: string;
  date: string;
  completed: boolean;
}

export interface JournalPrompt {
  id: string;
  text: string;
  goalCategories: GoalCategory[];
  moodRange: [MoodLevel, MoodLevel];
}

export type SessionStep =
  | "mood"
  | "prompts"
  | "writing"
  | "reflection"
  | "crisis"
  | "summary";

export interface InsightData {
  moodTrend: { date: string; mood: MoodLevel }[];
  currentStreak: number;
  totalEntries: number;
  topThemes: string[];
  summaries: string[];
}

export const AVAILABLE_GOALS: Goal[] = [
  { id: "g1", label: "Reduce anxiety", category: "anxiety" },
  { id: "g2", label: "Improve sleep quality", category: "sleep" },
  { id: "g3", label: "Practice gratitude", category: "gratitude" },
  { id: "g4", label: "Build self-esteem", category: "self-esteem" },
  { id: "g5", label: "Strengthen relationships", category: "relationships" },
  { id: "g6", label: "Manage stress", category: "stress" },
  { id: "g7", label: "Cultivate mindfulness", category: "mindfulness" },
];

export const AVAILABLE_HABITS = [
  "Morning journaling",
  "Evening reflection",
  "Meditation",
  "Gratitude list",
  "Mood logging",
  "Deep breathing",
  "Digital detox",
  "Nature walk",
];
