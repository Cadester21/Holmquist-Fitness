const workoutPlans = [
  {
    id: "strength-builder",
    name: "Strength Builder",
    summary: "Full-body power with a focus on compound lifts and clean form.",
    duration: 45,
    difficulty: "Intermediate",
    exercises: [
      { name: "Goblet Squat", detail: "4 sets x 10 reps", seconds: 45 },
      { name: "Push-Up", detail: "4 sets x 12 reps", seconds: 40 },
      { name: "Dumbbell Row", detail: "3 sets x 12 reps each side", seconds: 45 },
      { name: "Romanian Deadlift", detail: "3 sets x 10 reps", seconds: 50 },
      { name: "Plank Hold", detail: "3 rounds x 45 seconds", seconds: 45 }
    ]
  },
  {
    id: "cardio-burn",
    name: "Cardio Burn",
    summary: "Quick intervals to raise your heart rate and improve endurance.",
    duration: 28,
    difficulty: "All levels",
    exercises: [
      { name: "Jump Rope", detail: "5 rounds x 60 seconds", seconds: 60 },
      { name: "High Knees", detail: "4 rounds x 40 seconds", seconds: 40 },
      { name: "Skater Hops", detail: "4 rounds x 30 seconds", seconds: 30 },
      { name: "Burpees", detail: "3 rounds x 12 reps", seconds: 35 },
      { name: "Mountain Climbers", detail: "3 rounds x 45 seconds", seconds: 45 }
    ]
  },
  {
    id: "core-control",
    name: "Core Control",
    summary: "Anti-rotation and trunk stability work to support every lift.",
    duration: 22,
    difficulty: "Beginner",
    exercises: [
      { name: "Dead Bug", detail: "3 sets x 10 reps each side", seconds: 40 },
      { name: "Russian Twist", detail: "3 sets x 20 reps", seconds: 35 },
      { name: "Side Plank", detail: "3 rounds x 30 seconds each side", seconds: 30 },
      { name: "Leg Raise", detail: "3 sets x 12 reps", seconds: 35 },
      { name: "Bird Dog", detail: "3 sets x 10 reps each side", seconds: 40 }
    ]
  },
  {
    id: "mobility-reset",
    name: "Mobility Reset",
    summary: "Loosen hips, shoulders, and spine with a recovery-first flow.",
    duration: 18,
    difficulty: "Recovery",
    exercises: [
      { name: "World's Greatest Stretch", detail: "2 rounds x 30 seconds each side", seconds: 30 },
      { name: "Deep Squat Hold", detail: "3 rounds x 30 seconds", seconds: 30 },
      { name: "Thoracic Rotation", detail: "2 sets x 8 reps each side", seconds: 35 },
      { name: "Hip Flexor Stretch", detail: "2 rounds x 40 seconds each side", seconds: 40 },
      { name: "Box Breathing", detail: "4 rounds x 30 seconds", seconds: 30 }
    ]
  }
];

const storageKey = "forge-fitness-state";
const defaultState = {
  selectedPlanId: workoutPlans[0].id,
  streak: 0,
  sessionsCompleted: 0,
  minutesTrained: 0,
  lastCompletedOn: null,
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
  resetProgress: document.getElementById("resetProgress")
};

let state = loadState();
let activePlan = getPlanById(state.selectedPlanId);
let currentExerciseIndex = 0;
let timeLeft = activePlan.exercises[0].seconds;
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

function getPlanById(planId) {
  return workoutPlans.find((plan) => plan.id === planId) ?? workoutPlans[0];
}

function pickPlan(planId) {
  state.selectedPlanId = planId;
  saveState();
  activePlan = getPlanById(planId);
  resetSession(false);
  render();
}

function resetSession(updateBadge = true) {
  stopTimer();
  currentExerciseIndex = 0;
  timeLeft = activePlan.exercises[0].seconds;
  if (updateBadge) {
    elements.sessionBadge.textContent = "Ready";
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
    }
    renderTimer();
  }, 1000);
}

function advanceExercise() {
  if (currentExerciseIndex >= activePlan.exercises.length - 1) {
    completeSession();
    return;
  }

  currentExerciseIndex += 1;
  timeLeft = activePlan.exercises[currentExerciseIndex].seconds;
  render();
}

function completeSession() {
  stopTimer();

  const now = new Date();
  const todayLabel = now.toLocaleDateString();
  const todayKey = now.toISOString().slice(0, 10);

  state.sessionsCompleted += 1;
  state.minutesTrained += activePlan.duration;
  if (!state.lastCompletedOn) {
    state.streak = 1;
  } else if (state.lastCompletedOn === todayKey) {
    state.streak = state.streak;
  } else {
    const last = new Date(`${state.lastCompletedOn}T00:00:00`);
    const todayStart = new Date(todayKey + "T00:00:00");
    const diffDays = Math.round((todayStart.getTime() - last.getTime()) / 86400000);
    state.streak = diffDays === 1 ? state.streak + 1 : 1;
  }
  state.lastCompletedOn = todayKey;
  state.history.unshift({
    planName: activePlan.name,
    duration: activePlan.duration,
    date: todayLabel
  });
  state.history = state.history.slice(0, 6);
  saveState();

  elements.sessionBadge.textContent = "Completed";
  currentExerciseIndex = 0;
  timeLeft = activePlan.exercises[0].seconds;
  render();
}

function shufflePlan() {
  const currentIndex = workoutPlans.findIndex((plan) => plan.id === state.selectedPlanId);
  const nextPlan = workoutPlans[(currentIndex + 1) % workoutPlans.length];
  pickPlan(nextPlan.id);
}

function renderPlans() {
  elements.planGrid.innerHTML = "";

  workoutPlans.forEach((plan) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `plan-card ${plan.id === activePlan.id ? "active" : ""}`;
    card.innerHTML = `
      <p class="card-label">${plan.difficulty}</p>
      <h4>${plan.name}</h4>
      <p>${plan.summary}</p>
      <div class="plan-meta">
        <span>${plan.duration} min</span>
        <span>${plan.exercises.length} moves</span>
      </div>
    `;
    card.addEventListener("click", () => pickPlan(plan.id));
    elements.planGrid.appendChild(card);
  });
}

function renderSession() {
  const exercise = activePlan.exercises[currentExerciseIndex];
  elements.todayFocus.textContent = activePlan.name;
  elements.todaySummary.textContent = activePlan.summary;
  elements.activePlanTitle.textContent = activePlan.name;
  elements.exerciseName.textContent = exercise.name;
  elements.exerciseDetail.textContent = exercise.detail;
  elements.exerciseList.innerHTML = "";

  activePlan.exercises.forEach((item, index) => {
    const li = document.createElement("li");
    if (index === currentExerciseIndex) {
      li.classList.add("active");
    }
    li.innerHTML = `
      <span>${index + 1}. ${item.name}</span>
      <span>${item.detail}</span>
    `;
    elements.exerciseList.appendChild(li);
  });

  renderTimer();
}

function renderTimer() {
  const currentExercise = activePlan.exercises[currentExerciseIndex];
  const progress = timeLeft / currentExercise.seconds;
  document.documentElement.style.setProperty("--progress", `${progress}`);
  elements.timerDisplay.textContent = String(timeLeft);
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

function render() {
  renderPlans();
  renderSession();
  renderStats();
  renderGoals();
  renderHistory();
}

elements.toggleTimer.addEventListener("click", toggleTimer);
elements.skipExercise.addEventListener("click", advanceExercise);
elements.startTodayPlan.addEventListener("click", () => {
  resetSession();
  render();
  toggleTimer();
});
elements.shufflePlan.addEventListener("click", shufflePlan);
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
  activePlan = getPlanById(state.selectedPlanId);
  resetSession();
  render();
});

render();
