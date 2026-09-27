const focusStates = {
  scattered: {
    label: "For a scattered mind",
    title: "Find one point.",
    intro: "You do not need to hold everything at once. Give your attention one quiet place to land.",
    time: "30-second reset",
    activity: "Your thoughts are floating around. Choose the one you want to gather and carry into your next study moment."
  },
  stuck: {
    label: "For a stuck moment",
    title: "Make it smaller.",
    intro: "Momentum can begin with a step that feels almost too easy. Small still counts.",
    time: "Build a tiny plan",
    activity: "Name only your first move and give it a few minutes. The way forward does not need to be perfectly clear yet."
  },
  drained: {
    label: "For low energy",
    title: "Restore a little.",
    intro: "You are allowed to pause before asking your attention to return. Start with your body.",
    time: "Three gentle steps",
    activity: "Follow each tiny movement below. Every completed step adds one gummy to your energy reset."
  }
};

const choiceView = document.querySelector("#choice-view");
const resetView = document.querySelector("#reset-view");
const resetLabel = document.querySelector("#reset-label");
const resetTitle = document.querySelector("#reset-title");
const resetIntro = document.querySelector("#reset-intro");
const activityTime = document.querySelector("#activity-time");
const activityText = document.querySelector("#activity-text");
const backButton = document.querySelector("#back-button");
const stateButtons = document.querySelectorAll("[data-choice]");
const energyReset = document.querySelector("#energy-reset");
const thoughtGather = document.querySelector("#thought-gather");
const thoughtNotes = document.querySelectorAll("[data-thought]");
const chosenThought = document.querySelector("#chosen-thought");
const activityComplete = document.querySelector("#activity-complete");
const firstMoveWindow = document.querySelector("#first-move-window");
const firstMoveForm = document.querySelector("#first-move-form");
const firstMoveInput = document.querySelector("#first-move");
const focusTime = document.querySelector("#focus-time");
const planResult = document.querySelector("#plan-result");
const planTime = document.querySelector("#plan-time");
const planAction = document.querySelector("#plan-action");
const energyIcon = document.querySelector("#energy-icon");
const stepCount = document.querySelector("#step-count");
const energyTitle = document.querySelector("#energy-title");
const energyInstruction = document.querySelector("#energy-instruction");
const energyButton = document.querySelector("#energy-button");
const gummyDots = document.querySelectorAll("[data-step-dot]");

const energySteps = [
  {
    icon: "cloud",
    title: "Cloud breathing",
    instruction: "Follow the soft balls: breathe in as they rise, and out as they settle.",
    button: "I took three breaths"
  },
  {
    icon: "waves",
    title: "Shoulder waves",
    instruction: "Roll your shoulders slowly backward, then forward, like two gentle waves.",
    button: "My shoulders moved"
  },
  {
    icon: "lightning",
    title: "Shake it out",
    instruction: "Shake out your hands and feet for ten seconds. Let the extra tension go.",
    button: "I shook it out"
  }
];

let currentEnergyStep = 0;

function resetThoughts() {
  thoughtGather.classList.remove("has-selection");
  thoughtNotes.forEach((note) => {
    note.classList.remove("is-selected");
    note.style.removeProperty("--gather-x");
    note.style.removeProperty("--gather-y");
  });
  chosenThought.textContent = "Pick one thought";
  activityComplete.hidden = true;
}

function resetFirstMove() {
  firstMoveForm.reset();
  firstMoveForm.hidden = false;
  planResult.hidden = true;
  firstMoveWindow.classList.remove("is-thinning", "is-clear");
}

function updateFog() {
  const hasMove = firstMoveInput.value.trim().length > 0;
  const hasTime = focusTime.value !== "";
  firstMoveWindow.classList.toggle("is-thinning", hasMove && hasTime);
}

function renderEnergyStep() {
  const step = energySteps[currentEnergyStep];

  if (!step) {
    energyIcon.dataset.icon = "done";
    stepCount.textContent = "Reset complete";
    energyTitle.textContent = "A little lighter.";
    energyInstruction.textContent = "You gave your body a moment to return. Take that softness with you.";
    energyButton.textContent = "Do the steps again";
    return;
  }

  energyIcon.dataset.icon = step.icon;
  stepCount.textContent = `Step ${currentEnergyStep + 1} of ${energySteps.length}`;
  energyTitle.textContent = step.title;
  energyInstruction.textContent = step.instruction;
  energyButton.textContent = step.button;
}

function resetEnergy() {
  currentEnergyStep = 0;
  gummyDots.forEach((dot) => dot.classList.remove("is-filled"));
  renderEnergyStep();
}

function showReset(stateName) {
  const selectedState = focusStates[stateName];

  document.body.dataset.state = stateName;
  resetLabel.textContent = selectedState.label;
  resetTitle.textContent = selectedState.title;
  resetIntro.textContent = selectedState.intro;
  activityTime.textContent = selectedState.time;
  activityText.textContent = selectedState.activity;

  const isScattered = stateName === "scattered";
  const isStuck = stateName === "stuck";
  const isDrained = stateName === "drained";
  energyReset.hidden = !isDrained;
  thoughtGather.hidden = !isScattered;
  firstMoveWindow.hidden = !isStuck;
  resetThoughts();
  resetFirstMove();
  resetEnergy();

  choiceView.hidden = true;
  resetView.hidden = false;
  resetTitle.focus?.();
}

function showChoices() {
  document.body.dataset.state = "home";
  resetView.hidden = true;
  choiceView.hidden = false;
  stateButtons[0].focus();
}

stateButtons.forEach((button) => {
  button.addEventListener("click", () => showReset(button.dataset.choice));
});

backButton.addEventListener("click", showChoices);

thoughtNotes.forEach((note) => {
  note.addEventListener("click", () => {
    if (thoughtGather.classList.contains("has-selection")) return;

    const noteBox = note.getBoundingClientRect();
    const centerBox = chosenThought.parentElement.getBoundingClientRect();
    const gatherX = centerBox.left + centerBox.width / 2 - (noteBox.left + noteBox.width / 2);
    const gatherY = centerBox.top + centerBox.height / 2 - (noteBox.top + noteBox.height / 2);

    note.style.setProperty("--gather-x", `${gatherX}px`);
    note.style.setProperty("--gather-y", `${gatherY}px`);
    note.classList.add("is-selected");
    thoughtGather.classList.add("has-selection");
    chosenThought.textContent = note.dataset.thought;
    activityComplete.hidden = false;
  });
});

firstMoveInput.addEventListener("input", updateFog);
focusTime.addEventListener("change", updateFog);

firstMoveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = firstMoveInput.value.trim().replace(/[.!?]+$/, "");
  if (!action || !focusTime.value) return;

  planTime.textContent = `${focusTime.value} minutes`;
  planAction.textContent = `${action}.`;
  firstMoveForm.hidden = true;
  planResult.hidden = false;
  firstMoveWindow.classList.add("is-clear");
  planResult.focus();
});

energyButton.addEventListener("click", () => {
  energyButton.classList.remove("is-popping");
  void energyButton.offsetWidth;
  energyButton.classList.add("is-popping");

  if (currentEnergyStep >= energySteps.length) {
    resetEnergy();
    return;
  }

  gummyDots[currentEnergyStep].classList.add("is-filled");
  currentEnergyStep += 1;
  renderEnergyStep();
});
