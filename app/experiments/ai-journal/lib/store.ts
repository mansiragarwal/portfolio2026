import type {
  UserProfile,
  MoodEntry,
  JournalEntry,
  HabitLog,
  MoodLevel,
  Goal,
} from "./types";

const KEYS = {
  profile: "mindjournal-profile",
  entries: "mindjournal-entries",
  moods: "mindjournal-moods",
  habits: "mindjournal-habits",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Profile ---

export function getProfile(): UserProfile | null {
  return read<UserProfile | null>(KEYS.profile, null);
}

export function saveProfile(profile: UserProfile): void {
  write(KEYS.profile, profile);
}

export function createProfile(
  name: string,
  goals: Goal[],
  habits: string[],
  journalTime: string
): UserProfile {
  const profile: UserProfile = {
    name,
    goals,
    habits,
    journalTime,
    createdAt: new Date().toISOString(),
  };
  saveProfile(profile);
  return profile;
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.profile);
}

// --- Journal Entries ---

export function getJournalEntries(): JournalEntry[] {
  return read<JournalEntry[]>(KEYS.entries, []);
}

export function getJournalEntryById(id: string): JournalEntry | undefined {
  return getJournalEntries().find((e) => e.id === id);
}

export function saveJournalEntry(entry: JournalEntry): JournalEntry {
  const entries = getJournalEntries();
  entries.unshift(entry);
  write(KEYS.entries, entries);
  return entry;
}

export function createJournalEntry(
  promptUsed: string,
  content: string,
  moodAtTime: MoodLevel | null,
  aiReflection: string,
  tags: string[],
  distressDetected: boolean
): JournalEntry {
  const entry: JournalEntry = {
    id: crypto.randomUUID(),
    promptUsed,
    content,
    moodAtTime,
    aiReflection,
    tags,
    distressDetected,
    createdAt: new Date().toISOString(),
  };
  return saveJournalEntry(entry);
}

// --- Mood Entries ---

export function getMoodEntries(): MoodEntry[] {
  return read<MoodEntry[]>(KEYS.moods, []);
}

export function saveMoodEntry(mood: MoodLevel): MoodEntry {
  const entry: MoodEntry = {
    id: crypto.randomUUID(),
    mood,
    timestamp: new Date().toISOString(),
  };
  const entries = getMoodEntries();
  entries.unshift(entry);
  write(KEYS.moods, entries);
  return entry;
}

// --- Habit Logs ---

export function getHabitLogs(): HabitLog[] {
  return read<HabitLog[]>(KEYS.habits, []);
}

export function getHabitLogsForDate(date: string): HabitLog[] {
  return getHabitLogs().filter((h) => h.date === date);
}

export function toggleHabit(habitName: string, date: string): HabitLog {
  const logs = getHabitLogs();
  const existing = logs.find(
    (h) => h.habitName === habitName && h.date === date
  );

  if (existing) {
    existing.completed = !existing.completed;
    write(KEYS.habits, logs);
    return existing;
  }

  const log: HabitLog = {
    id: crypto.randomUUID(),
    habitName,
    date,
    completed: true,
  };
  logs.unshift(log);
  write(KEYS.habits, logs);
  return log;
}

// --- Aggregate Helpers ---

export function getJournalingStreak(): number {
  const entries = getJournalEntries();
  if (entries.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  const checkDate = new Date(today);

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
    } else {
      break;
    }
  }
  return streak;
}

export function getTodayDateStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function resetAllData(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
