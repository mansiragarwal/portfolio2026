const DEFAULT_BLOCKED_SITES = [
  "instagram.com",
  "twitter.com",
  "x.com",
  "reddit.com",
  "tiktok.com",
  "youtube.com",
  "facebook.com",
];

const DEFAULT_CONFIG = {
  blockedHoursStart: "10:00",
  blockedHoursEnd: "17:00",
  enabled: true,
};

const DEFAULT_TASKS = [
  { id: "t1", title: "Do 10 push-ups", description: "Drop and give me 10. No excuses.", status: "queued" },
  { id: "t2", title: "Drink a glass of water", description: "Full glass. Hydrate.", status: "queued" },
  { id: "t3", title: "Write down 3 things you're grateful for", description: "Grab a sticky note or open Notes. Be specific.", status: "queued" },
  { id: "t4", title: "Stretch for 2 minutes", description: "Neck, shoulders, back. Stand up.", status: "queued" },
  { id: "t5", title: "Clean your desk for 1 minute", description: "Toss trash, stack papers, wipe surface.", status: "queued" },
  { id: "t6", title: "Text someone you care about", description: "Not a meme. An actual message.", status: "queued" },
  { id: "t7", title: "Close 3 unnecessary browser tabs", description: "You know which ones.", status: "queued" },
  { id: "t8", title: "Take 5 deep breaths", description: "In for 4, hold for 4, out for 4. Five times.", status: "queued" },
];

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["blockedSites", "config", "tasks", "stats"]);

  if (!data.blockedSites) {
    await chrome.storage.local.set({ blockedSites: DEFAULT_BLOCKED_SITES });
  }
  if (!data.config) {
    await chrome.storage.local.set({ config: DEFAULT_CONFIG });
  }
  if (!data.tasks) {
    await chrome.storage.local.set({ tasks: DEFAULT_TASKS });
  }
  if (!data.stats) {
    await chrome.storage.local.set({
      stats: { completed: 0, skipped: 0, streak: 0, lastCompletedDate: null, cooldownUntil: null },
    });
  }
});

function isWithinBlockedHours(config) {
  if (!config.enabled) return false;

  const now = new Date();
  const [startH, startM] = config.blockedHoursStart.split(":").map(Number);
  const [endH, endM] = config.blockedHoursEnd.split(":").map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

function matchesBlockedSite(url, blockedSites) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return blockedSites.some((site) => {
      const normalizedSite = site.replace(/^www\./, "");
      return hostname === normalizedSite || hostname.endsWith("." + normalizedSite);
    });
  } catch {
    return false;
  }
}

const PASS_DURATION_MS = 10 * 60 * 1000; // 10 minutes of access after completing a task

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;

  const blockedPageUrl = chrome.runtime.getURL("blocked.html");
  if (details.url.startsWith(blockedPageUrl)) return;
  if (details.url.startsWith("chrome://") || details.url.startsWith("chrome-extension://")) return;

  const data = await chrome.storage.local.get(["blockedSites", "config", "stats", "passes"]);
  const { blockedSites = [], config = DEFAULT_CONFIG, stats = {}, passes = {} } = data;

  if (!matchesBlockedSite(details.url, blockedSites)) return;
  if (!isWithinBlockedHours(config)) return;

  // Check for an active pass (granted after completing a task)
  const hostname = new URL(details.url).hostname.replace(/^www\./, "");
  const matchedSite = blockedSites.find((site) => {
    const s = site.replace(/^www\./, "");
    return hostname === s || hostname.endsWith("." + s);
  });
  if (matchedSite && passes[matchedSite] && Date.now() < passes[matchedSite]) {
    return; // pass is active, let them through
  }

  if (stats.cooldownUntil && Date.now() < stats.cooldownUntil) {
    chrome.tabs.update(details.tabId, {
      url: blockedPageUrl + "?cooldown=true&until=" + stats.cooldownUntil,
    });
    return;
  }

  const blockedUrl = encodeURIComponent(details.url);
  chrome.tabs.update(details.tabId, {
    url: blockedPageUrl + "?from=" + blockedUrl,
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TASK_COMPLETED") {
    handleTaskCompleted(message.taskId, message.fromUrl).then(sendResponse);
    return true;
  }
  if (message.type === "TASK_SKIPPED") {
    handleTaskSkipped(message.taskId).then(sendResponse);
    return true;
  }
  if (message.type === "GET_NEXT_TASK") {
    getNextTask().then(sendResponse);
    return true;
  }
});

async function getNextTask() {
  const { tasks = [] } = await chrome.storage.local.get("tasks");
  const queued = tasks.filter((t) => t.status === "queued");
  if (queued.length === 0) return null;
  return queued[Math.floor(Math.random() * queued.length)];
}

async function handleTaskCompleted(taskId, fromUrl) {
  const data = await chrome.storage.local.get(["tasks", "stats", "taskLog", "passes", "blockedSites"]);
  const tasks = data.tasks || [];
  const stats = data.stats || { completed: 0, skipped: 0, streak: 0, lastCompletedDate: null, cooldownUntil: null };
  const taskLog = data.taskLog || [];
  const passes = data.passes || {};
  const blockedSites = data.blockedSites || [];

  const task = tasks.find((t) => t.id === taskId);
  if (task) task.status = "done";

  const today = new Date().toISOString().split("T")[0];
  if (stats.lastCompletedDate === today) {
    stats.streak = stats.streak;
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    stats.streak = stats.lastCompletedDate === yesterday ? stats.streak + 1 : 1;
  }
  stats.completed++;
  stats.lastCompletedDate = today;
  stats.cooldownUntil = null;

  taskLog.push({ taskId, action: "completed", timestamp: Date.now() });

  // Grant a temporary pass for the site the user was trying to visit
  if (fromUrl) {
    try {
      const hostname = new URL(decodeURIComponent(fromUrl)).hostname.replace(/^www\./, "");
      const matchedSite = blockedSites.find((site) => {
        const s = site.replace(/^www\./, "");
        return hostname === s || hostname.endsWith("." + s);
      });
      if (matchedSite) {
        passes[matchedSite] = Date.now() + PASS_DURATION_MS;
      }
    } catch {}
  }

  const allDone = tasks.every((t) => t.status !== "queued");
  if (allDone) {
    tasks.forEach((t) => { t.status = "queued"; });
  }

  await chrome.storage.local.set({ tasks, stats, taskLog, passes });
  return { success: true, stats };
}

async function handleTaskSkipped(taskId) {
  const data = await chrome.storage.local.get(["stats", "taskLog"]);
  const stats = data.stats || { completed: 0, skipped: 0, streak: 0, lastCompletedDate: null, cooldownUntil: null };
  const taskLog = data.taskLog || [];

  stats.skipped++;
  stats.cooldownUntil = Date.now() + 5 * 60 * 1000;

  taskLog.push({ taskId, action: "skipped", timestamp: Date.now() });

  await chrome.storage.local.set({ stats, taskLog });
  return { success: true, stats, cooldownUntil: stats.cooldownUntil };
}
