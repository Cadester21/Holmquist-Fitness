const exerciseLibrary = [
  { id: "barbell-back-squat", name: "Barbell Back Squat", focus: "Legs", equipment: "Barbell", detail: "4 sets x 6 reps", seconds: 60 },
  { id: "goblet-squat", name: "Goblet Squat", focus: "Legs", equipment: "Dumbbell", detail: "4 sets x 10 reps", seconds: 45 },
  { id: "walking-lunge", name: "Walking Lunge", focus: "Legs", equipment: "Bodyweight", detail: "3 sets x 12 reps each side", seconds: 40 },
  { id: "romanian-deadlift", name: "Romanian Deadlift", focus: "Posterior Chain", equipment: "Barbell", detail: "3 sets x 10 reps", seconds: 50 },
  { id: "bench-press", name: "Bench Press", focus: "Chest", equipment: "Barbell", detail: "4 sets x 8 reps", seconds: 55 },
  { id: "push-up", name: "Push-Up", focus: "Chest", equipment: "Bodyweight", detail: "4 sets x 12 reps", seconds: 40 },
  { id: "incline-dumbbell-press", name: "Incline Dumbbell Press", focus: "Chest", equipment: "Dumbbells", detail: "3 sets x 10 reps", seconds: 45 },
  { id: "pull-up", name: "Pull-Up", focus: "Back", equipment: "Pull-Up Bar", detail: "4 sets x 8 reps", seconds: 45 },
  { id: "dumbbell-row", name: "Dumbbell Row", focus: "Back", equipment: "Dumbbell", detail: "3 sets x 12 reps each side", seconds: 45 },
  { id: "lat-pulldown", name: "Lat Pulldown", focus: "Back", equipment: "Cable", detail: "3 sets x 12 reps", seconds: 45 },
  { id: "shoulder-press", name: "Shoulder Press", focus: "Shoulders", equipment: "Dumbbells", detail: "3 sets x 10 reps", seconds: 45 },
  { id: "lateral-raise", name: "Lateral Raise", focus: "Shoulders", equipment: "Dumbbells", detail: "3 sets x 15 reps", seconds: 35 },
  { id: "bicep-curl", name: "Bicep Curl", focus: "Arms", equipment: "Dumbbells", detail: "3 sets x 12 reps", seconds: 35 },
  { id: "tricep-dips", name: "Tricep Dips", focus: "Arms", equipment: "Bench", detail: "3 sets x 15 reps", seconds: 35 },
  { id: "plank-hold", name: "Plank Hold", focus: "Core", equipment: "Bodyweight", detail: "3 rounds x 45 seconds", seconds: 45 },
  { id: "dead-bug", name: "Dead Bug", focus: "Core", equipment: "Bodyweight", detail: "3 sets x 10 reps each side", seconds: 40 },
  { id: "russian-twist", name: "Russian Twist", focus: "Core", equipment: "Medicine Ball", detail: "3 sets x 20 reps", seconds: 35 },
  { id: "jump-rope", name: "Jump Rope", focus: "Conditioning", equipment: "Rope", detail: "5 rounds x 60 seconds", seconds: 60 },
  { id: "high-knees", name: "High Knees", focus: "Conditioning", equipment: "Bodyweight", detail: "4 rounds x 40 seconds", seconds: 40 },
  { id: "burpees", name: "Burpees", focus: "Conditioning", equipment: "Bodyweight", detail: "3 rounds x 12 reps", seconds: 35 },
  { id: "mountain-climbers", name: "Mountain Climbers", focus: "Conditioning", equipment: "Bodyweight", detail: "3 rounds x 45 seconds", seconds: 45 },
  { id: "worlds-greatest-stretch", name: "World's Greatest Stretch", focus: "Mobility", equipment: "Bodyweight", detail: "2 rounds x 30 seconds each side", seconds: 30 },
  { id: "thoracic-rotation", name: "Thoracic Rotation", focus: "Mobility", equipment: "Bodyweight", detail: "2 sets x 8 reps each side", seconds: 35 },
  { id: "hip-flexor-stretch", name: "Hip Flexor Stretch", focus: "Mobility", equipment: "Bodyweight", detail: "2 rounds x 40 seconds each side", seconds: 40 }
];

const workoutPlans = [
  {
    id: "liberty-strength",
    name: "Liberty Strength",
    summary: "Classic full-body strength work with heavy hitters and steady pacing.",
    duration: 46,
    difficulty: "Intermediate",
    exercises: ["barbell-back-squat", "bench-press", "dumbbell-row", "romanian-deadlift", "plank-hold"]
  },
  {
    id: "patriot-pump",
    name: "Patriot Pump",
    summary: "Upper-body hypertrophy with chest, back, shoulders, and arm finishers.",
    duration: 38,
    difficulty: "All levels",
    exercises: ["incline-dumbbell-press", "pull-up", "shoulder-press", "lateral-raise", "bicep-curl", "tricep-dips"]
  },
  {
    id: "freedom-conditioning",
    name: "Freedom Conditioning",
    summary: "Fast-paced intervals to build engine, grit, and recovery.",
    duration: 28,
    difficulty: "High energy",
    exercises: ["jump-rope", "high-knees", "burpees", "mountain-climbers", "walking-lunge"]
  },
  {
    id: "republic-recovery",
    name: "Republic Recovery",
    summary: "Mobility and core training to reset your body and stay durable.",
    duration: 24,
    difficulty: "Recovery",
    exercises: ["worlds-greatest-stretch", "thoracic-rotation", "hip-flexor-stretch", "dead-bug", "russian-twist"]
  }
];

const storageKey = "holmquist-fitness-state";
const defaultState = {
  selectedPlanId: workoutPlans[0].id,
  activeTab: "train",
  streak: 0,
  sessionsCompleted: 0,
  minutesTrained: 0,
  lastCompletedOn: null,
  exerciseSearch: "",
  customWorkout: ["goblet-squat", "push-up", "dumbbell-row"],
  goals: {
    daysPerWeek: 4,
    sessionMinutes: 45
  },
  history: []
};

const elements = {
  planGrid: document.getElementById("planGrid"),
  todayFocus: document.getElementById("todayFocus"),
  todaySummary: document.getElementById("todaySummary"),
  activePlanTitle: document.getElementById("activePlanTitle"),
  sessionBadge: document.getElementById("sessionBadge"),
  exerciseName: document.getElementById("exerciseName"),
  exerciseDetail: document.getElementById("exerciseDetail"),
  exerciseList: document.getElementById("exerciseList"),
  timerDisplay: document.getElementById("timerDisplay"),
  toggleTimer: document.getElementById("toggleTimer"),
  skipExercise: document.getElementById("skipExercise"),
  startTodayPlan: document.getElementById("startTodayPlan"),
  shufflePlan: document.getElementById("shufflePlan"),
  streakCount: document.getElementById("streakCount"),
  sessionsCount: document.getElementById("sessionsCount"),
  minutesCount: document.getElementById("minutesCount"),
  goalsForm: document.getElementById("goalsForm"),
  goalDays: document.getElementById("goalDays"),
  goalMinutes: document.getElementById("goalMinutes"),
  goalStatus: document.getElementById("goalStatus"),
  historyList: document.getElementById("historyList"),
  resetProgress: document.getElementById("resetProgress"),
  exerciseSearch: document.getElementById("exerciseSearch"),
  libraryList: document.getElementById("libraryList"),
  customWorkoutList: document.getElementById("customWorkoutList"),
  customWorkoutTitle: document.getElementById("customWorkoutTitle"),
  startCustomWorkout: document.getElementById("startCustomWorkout"),
  splashScreen: document.getElementById("splashScreen"),
  tabButtons: Array.from(document.querySelectorAll(".tab-button")),
  tabPanels: Array.from(document.querySelectorAll(".tab-panel"))
};

let state = loadState();
let sessionSource = "preset";
let currentWorkout = buildPresetPlan(state.selectedPlanId);
let currentExerciseIndex = 0;
let timeLeft = currentWorkout.exercises[0]?.seconds ?? 30;
let timerId = null;
let isRunning = false;

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function setActiveTab(tabName) {
  state.activeTab = tabName;
  saveState();
  elements.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });
  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function getExerciseById(id) {
  return exerciseLibrary.find((exercise) => exercise.id === id);
}

function buildWorkoutFromIds(name, summary, ids, meta = {}) {
  const exercises = ids.map(getExerciseById).filter(Boolean);
  const duration = exercises.reduce((total, exercise) => total + Math.ceil(exercise.seconds / 60) + 1, 0);
  return {
    id: meta.id ?? "custom-workout",
    name,
    summary,
    difficulty: meta.difficulty ?? "Build your own",
    exercises,
    duration: Math.max(duration, exercises.length * 2)
  };
}

function buildPresetPlan(planId) {
  const plan = workoutPlans.find((item) => item.id === planId) ?? workoutPlans[0];
  return buildWorkoutFromIds(plan.name, plan.summary, plan.exercises, {
    id: plan.id,
    difficulty: plan.difficulty
  });
}

function buildCustomWorkout() {
  return buildWorkoutFromIds(
    "Stars and Stripes Builder",
    "A custom Holmquist Fitness session built from your own exercise picks.",
    state.customWorkout,
    { id: "custom-workout", difficulty: "Custom" }
  );
}

function setCurrentWorkoutFromPreset(planId) {
  state.selectedPlanId = planId;
  sessionSource = "preset";
  currentWorkout = buildPresetPlan(planId);
  saveState();
  resetSession(false);
  render();
}

function setCurrentWorkoutToCustom() {
  sessionSource = "custom";
  currentWorkout = buildCustomWorkout();
  resetSession();
  render();
}

function resetSession(updateBadge = true) {
  stopTimer();
  currentExerciseIndex = 0;
  timeLeft = currentWorkout.exercises[0]?.seconds ?? 30;
  if (updateBadge) {
    elements.sessionBadge.textContent = currentWorkout.exercises.length ? "Ready" : "Build a workout";
  }
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  isRunning = false;
  elements.toggleTimer.textContent = "Start Timer";
}

function toggleTimer() {
  if (!currentWorkout.exercises.length) {
    elements.sessionBadge.textContent = "Add exercises first";
    return;
  }

  if (isRunning) {
    stopTimer();
    return;
  }

  isRunning = true;
  elements.sessionBadge.textContent = "In progress";
  elements.toggleTimer.textContent = "Pause Timer";
  timerId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      advanceExercise();
      return;
    }
    renderTimer();
  }, 1000);
}

function advanceExercise() {
  if (!currentWorkout.exercises.length) {
    elements.sessionBadge.textContent = "Add exercises first";
    return;
  }

  if (currentExerciseIndex >= currentWorkout.exercises.length - 1) {
    completeSession();
    return;
  }

  currentExerciseIndex += 1;
  timeLeft = currentWorkout.exercises[currentExerciseIndex].seconds;
  render();
}

function completeSession() {
  stopTimer();

  const now = new Date();
  const todayLabel = now.toLocaleDateString();
  const todayKey = now.toISOString().slice(0, 10);

  state.sessionsCompleted += 1;
  state.minutesTrained += currentWorkout.duration;

  if (!state.lastCompletedOn) {
    state.streak = 1;
  } else if (state.lastCompletedOn !== todayKey) {
    const last = new Date(`${state.lastCompletedOn}T00:00:00`);
    const todayStart = new Date(`${todayKey}T00:00:00`);
    const diffDays = Math.round((todayStart.getTime() - last.getTime()) / 86400000);
    state.streak = diffDays === 1 ? state.streak + 1 : 1;
  }

  state.lastCompletedOn = todayKey;
  state.history.unshift({
    planName: currentWorkout.name,
    duration: currentWorkout.duration,
    date: todayLabel
  });
  state.history = state.history.slice(0, 6);
  saveState();

  elements.sessionBadge.textContent = "Completed";
  currentExerciseIndex = 0;
  timeLeft = currentWorkout.exercises[0]?.seconds ?? 30;
  render();
}

function shufflePlan() {
  const currentIndex = workoutPlans.findIndex((plan) => plan.id === state.selectedPlanId);
  const nextPlan = workoutPlans[(currentIndex + 1) % workoutPlans.length];
  setCurrentWorkoutFromPreset(nextPlan.id);
}

function addToCustomWorkout(exerciseId) {
  state.customWorkout.push(exerciseId);
  saveState();
  if (sessionSource === "custom") {
    currentWorkout = buildCustomWorkout();
    resetSession(false);
  }
  render();
}

function removeFromCustomWorkout(index) {
  state.customWorkout.splice(index, 1);
  saveState();
  if (sessionSource === "custom") {
    currentWorkout = buildCustomWorkout();
    resetSession(false);
  }
  render();
}

function renderPlans() {
  elements.planGrid.innerHTML = "";

  workoutPlans.forEach((plan) => {
    const card = document.createElement("button");
    card.type = "button";
    const isActivePreset = sessionSource === "preset" && currentWorkout.id === plan.id;
    card.className = `plan-card ${isActivePreset ? "active" : ""}`;
    card.innerHTML = `
      <p class="card-label">${plan.difficulty}</p>
      <h4>${plan.name}</h4>
      <p>${plan.summary}</p>
      <div class="plan-meta">
        <span>${plan.duration} min</span>
        <span>${plan.exercises.length} moves</span>
      </div>
    `;
    card.addEventListener("click", () => setCurrentWorkoutFromPreset(plan.id));
    elements.planGrid.appendChild(card);
  });
}

function renderSession() {
  const currentExercise = currentWorkout.exercises[currentExerciseIndex];
  elements.todayFocus.textContent = currentWorkout.name;
  elements.todaySummary.textContent = currentWorkout.summary;
  elements.activePlanTitle.textContent = currentWorkout.name;
  elements.exerciseName.textContent = currentExercise?.name ?? "Select a plan or custom workout";
  elements.exerciseDetail.textContent = currentExercise?.detail ?? "Pick a preset plan or build your own workout from the library below.";
  elements.exerciseList.innerHTML = "";

  currentWorkout.exercises.forEach((exercise, index) => {
    const li = document.createElement("li");
    if (index === currentExerciseIndex) {
      li.classList.add("active");
    }
    li.innerHTML = `
      <span>${index + 1}. ${exercise.name}</span>
      <span>${exercise.detail}</span>
    `;
    elements.exerciseList.appendChild(li);
  });

  if (!currentWorkout.exercises.length) {
    const li = document.createElement("li");
    li.innerHTML = "<span>No exercises yet</span><span>Use the builder to create your workout.</span>";
    elements.exerciseList.appendChild(li);
  }

  renderTimer();
}

function renderTimer() {
  const currentExercise = currentWorkout.exercises[currentExerciseIndex];
  const progress = currentExercise ? timeLeft / currentExercise.seconds : 1;
  document.documentElement.style.setProperty("--progress", `${progress}`);
  elements.timerDisplay.textContent = String(currentExercise ? timeLeft : 0);
}

function renderStats() {
  elements.streakCount.textContent = state.streak;
  elements.sessionsCount.textContent = state.sessionsCompleted;
  elements.minutesCount.textContent = state.minutesTrained;
}

function renderGoals() {
  elements.goalDays.value = state.goals.daysPerWeek;
  elements.goalMinutes.value = state.goals.sessionMinutes;
  elements.goalStatus.textContent = `Goal: ${state.goals.daysPerWeek} workout days each week with ${state.goals.sessionMinutes}-minute sessions.`;
}

function renderHistory() {
  elements.historyList.innerHTML = "";
  if (state.history.length === 0) {
    const empty = document.createElement("li");
    empty.innerHTML = "<span>No sessions yet</span><span>Your finished workouts will appear here.</span>";
    elements.historyList.appendChild(empty);
    return;
  }

  state.history.forEach((session) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${session.planName}</span>
      <span>${session.duration} min - ${session.date}</span>
    `;
    elements.historyList.appendChild(li);
  });
}

function renderLibrary() {
  elements.exerciseSearch.value = state.exerciseSearch;
  elements.libraryList.innerHTML = "";

  const query = state.exerciseSearch.trim().toLowerCase();
  const filtered = exerciseLibrary.filter((exercise) => {
    const haystack = `${exercise.name} ${exercise.focus} ${exercise.equipment}`.toLowerCase();
    return haystack.includes(query);
  });

  filtered.forEach((exercise) => {
    const item = document.createElement("li");
    item.className = "library-item";
    item.innerHTML = `
      <div class="library-top">
        <div>
          <h4>${exercise.name}</h4>
          <p>${exercise.detail}</p>
        </div>
        <button type="button" class="library-button">Add</button>
      </div>
      <p><span class="pill">${exercise.focus}</span> <span class="pill">${exercise.equipment}</span></p>
    `;
    item.querySelector("button").addEventListener("click", () => addToCustomWorkout(exercise.id));
    elements.libraryList.appendChild(item);
  });

  if (!filtered.length) {
    const item = document.createElement("li");
    item.className = "builder-empty";
    item.textContent = "No exercises matched that search.";
    elements.libraryList.appendChild(item);
  }
}

function renderCustomWorkout() {
  elements.customWorkoutTitle.textContent = `Stars and Stripes Builder (${state.customWorkout.length} moves)`;
  elements.customWorkoutList.innerHTML = "";

  if (!state.customWorkout.length) {
    const item = document.createElement("li");
    item.className = "builder-empty";
    item.textContent = "Add exercises from the library to build your custom session.";
    elements.customWorkoutList.appendChild(item);
    return;
  }

  state.customWorkout.forEach((exerciseId, index) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) {
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${index + 1}. ${exercise.name} - ${exercise.detail}</span>
      <button type="button" class="library-button">Remove</button>
    `;
    li.querySelector("button").addEventListener("click", () => removeFromCustomWorkout(index));
    elements.customWorkoutList.appendChild(li);
  });
}

function render() {
  setActiveTab(state.activeTab);
  renderPlans();
  renderSession();
  renderStats();
  renderGoals();
  renderHistory();
  renderLibrary();
  renderCustomWorkout();
}

elements.toggleTimer.addEventListener("click", toggleTimer);
elements.skipExercise.addEventListener("click", advanceExercise);
elements.startTodayPlan.addEventListener("click", () => {
  sessionSource = "preset";
  currentWorkout = buildPresetPlan(state.selectedPlanId);
  resetSession();
  render();
  toggleTimer();
});
elements.shufflePlan.addEventListener("click", shufflePlan);
elements.startCustomWorkout.addEventListener("click", () => {
  setCurrentWorkoutToCustom();
  setActiveTab("train");
  if (currentWorkout.exercises.length) {
    toggleTimer();
  }
});
elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});
elements.exerciseSearch.addEventListener("input", (event) => {
  state.exerciseSearch = event.target.value;
  saveState();
  renderLibrary();
});
elements.goalsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.goals.daysPerWeek = Number(elements.goalDays.value);
  state.goals.sessionMinutes = Number(elements.goalMinutes.value);
  saveState();
  renderGoals();
});
elements.resetProgress.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  state = structuredClone(defaultState);
  sessionSource = "preset";
  currentWorkout = buildPresetPlan(state.selectedPlanId);
  resetSession();
  render();
});

document.body.classList.add("splash-visible");
window.addEventListener("load", () => {
  window.setTimeout(() => {
    elements.splashScreen.classList.add("hidden");
    document.body.classList.remove("splash-visible");
  }, 900);
});

render();
