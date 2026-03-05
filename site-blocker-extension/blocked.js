const params = new URLSearchParams(window.location.search);
const fromUrl = params.get("from");
const isCooldown = params.get("cooldown") === "true";
const cooldownUntil = Number(params.get("until"));

const taskScreen = document.getElementById("taskScreen");
const cooldownScreen = document.getElementById("cooldownScreen");
const emptyState = document.getElementById("emptyState");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const completeBtn = document.getElementById("completeBtn");
const skipBtn = document.getElementById("skipBtn");
const shameBox = document.getElementById("shameBox");
const skipCount = document.getElementById("skipCount");
const nudge = document.getElementById("nudge");
const cooldownTimer = document.getElementById("cooldownTimer");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const NUDGES = [
  "You're better than this scroll hole.",
  "Future you will be glad you did the thing.",
  "Instagram will still be there. Your momentum won't.",
  "One task. That's it. Then freedom.",
  "This takes less time than deciding what to watch.",
  "Discipline is choosing between what you want now and what you want most.",
];

let currentTask = null;

if (isCooldown && cooldownUntil > Date.now()) {
  showCooldown();
} else {
  loadTask();
}

async function loadTask() {
  chrome.runtime.sendMessage({ type: "GET_NEXT_TASK" }, (task) => {
    if (!task) {
      showEmptyState();
      return;
    }
    currentTask = task;
    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description || "";
    nudge.textContent = NUDGES[Math.floor(Math.random() * NUDGES.length)];
    showTaskScreen();
  });
}

function showTaskScreen() {
  taskScreen.style.display = "block";
  cooldownScreen.style.display = "none";
  emptyState.style.display = "none";
}

function showCooldown() {
  taskScreen.style.display = "none";
  cooldownScreen.style.display = "block";
  emptyState.style.display = "none";

  const tick = () => {
    const remaining = Math.max(0, cooldownUntil - Date.now());
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    cooldownTimer.textContent = `${mins}:${String(secs).padStart(2, "0")}`;

    if (remaining <= 0) {
      clearInterval(interval);
      loadTask();
    }
  };

  tick();
  const interval = setInterval(tick, 1000);
}

function showEmptyState() {
  taskScreen.style.display = "none";
  cooldownScreen.style.display = "none";
  emptyState.style.display = "block";
}

completeBtn.addEventListener("click", () => {
  if (!currentTask) return;
  completeBtn.disabled = true;
  completeBtn.textContent = "Nice! ✓";

  chrome.runtime.sendMessage({ type: "TASK_COMPLETED", taskId: currentTask.id, fromUrl }, (response) => {
    setTimeout(() => {
      if (fromUrl) {
        window.location.href = decodeURIComponent(fromUrl);
      } else {
        window.close();
      }
    }, 800);
  });
});

skipBtn.addEventListener("click", () => {
  if (!currentTask) return;

  chrome.runtime.sendMessage({ type: "TASK_SKIPPED", taskId: currentTask.id }, (response) => {
    if (response && response.stats) {
      skipCount.textContent = response.stats.skipped;
    }
    shameBox.style.display = "block";
    skipBtn.style.display = "none";
    completeBtn.style.display = "none";

    setTimeout(() => {
      showCooldown();
    }, 2500);

    if (response && response.cooldownUntil) {
      const newParams = new URLSearchParams(window.location.search);
      newParams.set("cooldown", "true");
      newParams.set("until", response.cooldownUntil);
      history.replaceState(null, "", "?" + newParams.toString());
    }
  });
});

addTaskBtn.addEventListener("click", addNewTask);
newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewTask();
});

async function addNewTask() {
  const title = newTaskInput.value.trim();
  if (!title) return;

  const { tasks = [] } = await chrome.storage.local.get("tasks");
  tasks.push({
    id: "t" + Date.now(),
    title,
    description: "",
    status: "queued",
  });
  await chrome.storage.local.set({ tasks });
  newTaskInput.value = "";
  loadTask();
}

document.querySelectorAll(".quick-task-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const title = btn.dataset.task;
    const { tasks = [] } = await chrome.storage.local.get("tasks");
    tasks.push({
      id: "t" + Date.now(),
      title,
      description: "",
      status: "queued",
    });
    await chrome.storage.local.set({ tasks });
    loadTask();
  });
});
