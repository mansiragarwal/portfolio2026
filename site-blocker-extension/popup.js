const siteList = document.getElementById("siteList");
const taskList = document.getElementById("taskList");
const newSiteInput = document.getElementById("newSiteInput");
const addSiteBtn = document.getElementById("addSiteBtn");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const enabledToggle = document.getElementById("enabledToggle");
const toggleLabel = document.getElementById("toggleLabel");
const resetBtn = document.getElementById("resetBtn");

async function load() {
  const data = await chrome.storage.local.get(["blockedSites", "tasks", "config", "stats"]);

  const sites = data.blockedSites || [];
  const tasks = data.tasks || [];
  const config = data.config || { blockedHoursStart: "10:00", blockedHoursEnd: "17:00", enabled: true };
  const stats = data.stats || { completed: 0, skipped: 0, streak: 0 };

  document.getElementById("statCompleted").textContent = stats.completed;
  document.getElementById("statSkipped").textContent = stats.skipped;
  document.getElementById("statStreak").textContent = stats.streak;

  startTime.value = config.blockedHoursStart;
  endTime.value = config.blockedHoursEnd;
  enabledToggle.checked = config.enabled;
  toggleLabel.textContent = config.enabled ? "On" : "Off";

  renderSites(sites);
  renderTasks(tasks);
}

function renderSites(sites) {
  siteList.innerHTML = "";
  sites.forEach((site, i) => {
    const el = document.createElement("div");
    el.className = "site-item";
    el.innerHTML = `
      <span class="site-name">${site}</span>
      <button class="remove-btn" data-index="${i}">&times;</button>
    `;
    siteList.appendChild(el);
  });

  siteList.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const { blockedSites = [] } = await chrome.storage.local.get("blockedSites");
      blockedSites.splice(Number(btn.dataset.index), 1);
      await chrome.storage.local.set({ blockedSites });
      renderSites(blockedSites);
    });
  });
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  const queued = tasks.filter((t) => t.status === "queued");
  queued.forEach((task) => {
    const el = document.createElement("div");
    el.className = "task-item";
    el.innerHTML = `
      <span class="task-title">${task.title}</span>
      <button class="remove-btn" data-id="${task.id}">&times;</button>
    `;
    taskList.appendChild(el);
  });

  taskList.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const { tasks = [] } = await chrome.storage.local.get("tasks");
      const updated = tasks.filter((t) => t.id !== btn.dataset.id);
      await chrome.storage.local.set({ tasks: updated });
      renderTasks(updated);
    });
  });
}

addSiteBtn.addEventListener("click", addSite);
newSiteInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addSite(); });

async function addSite() {
  let site = newSiteInput.value.trim().toLowerCase();
  if (!site) return;
  site = site.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
  const { blockedSites = [] } = await chrome.storage.local.get("blockedSites");
  if (blockedSites.includes(site)) return;
  blockedSites.push(site);
  await chrome.storage.local.set({ blockedSites });
  newSiteInput.value = "";
  renderSites(blockedSites);
}

addTaskBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

async function addTask() {
  const title = newTaskInput.value.trim();
  if (!title) return;
  const { tasks = [] } = await chrome.storage.local.get("tasks");
  tasks.push({ id: "t" + Date.now(), title, description: "", status: "queued" });
  await chrome.storage.local.set({ tasks });
  newTaskInput.value = "";
  renderTasks(tasks);
}

startTime.addEventListener("change", saveSchedule);
endTime.addEventListener("change", saveSchedule);

async function saveSchedule() {
  const { config = {} } = await chrome.storage.local.get("config");
  config.blockedHoursStart = startTime.value;
  config.blockedHoursEnd = endTime.value;
  await chrome.storage.local.set({ config });
}

enabledToggle.addEventListener("change", async () => {
  const { config = {} } = await chrome.storage.local.get("config");
  config.enabled = enabledToggle.checked;
  toggleLabel.textContent = config.enabled ? "On" : "Off";
  await chrome.storage.local.set({ config });
});

resetBtn.addEventListener("click", async () => {
  await chrome.storage.local.set({
    stats: { completed: 0, skipped: 0, streak: 0, lastCompletedDate: null, cooldownUntil: null },
    taskLog: [],
  });
  load();
});

load();
