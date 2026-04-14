const MAX_PLAYERS = 24;
const MAX_ZOMBIES = 4;
const MIN_UNION_REPS = 2;
const MAX_UNION_REPS = 3;
const ENGLISH_LANG_RE = /^en(?:-|_|$)/i;
const PREFERRED_ENGLISH_LANGS = ["en-AU", "en-GB", "en-US"];
const ACCESS_CODE = "runaway";
const ACCESS_SESSION_KEY = "zombie-leaders-unlocked";
const DEFAULT_AMBIENCE_ID = "mozart-requiem";
const DEFAULT_BACKGROUND_AUDIO_VOLUME_RATIO = 0.5;
const DEFAULT_NARRATION_VOLUME_RATIO = 1;
const MIN_COUNTDOWN_MINUTES = 1;
const MAX_COUNTDOWN_MINUTES = 10;
const DEFAULT_COUNTDOWN_MINUTES = 5;
const DEFAULT_TIMER_WARNING_SECONDS = Object.freeze([60, 10]);
const TIMER_WARNING_OPTIONS = Object.freeze([60, 30, 20, 10]);
const DEFAULT_TIMER_SIREN_VOLUME_RATIO = 1;
const DEFAULT_TIMER_WARNING_VOICE_ID = "samantha";
const DEFAULT_TIMER_WARNING_RATE = 0.8;
const SCRIPT_PAUSE_MARKER = "__SCRIPT_PAUSE__";
const SCRIPT_PAUSE_2S_MARKER = "__SCRIPT_PAUSE_2S__";
const SCRIPT_TYPES = ["orientation", "intro", "day", "night"];
const LESSON_TYPES = ["lesson1", "lesson2", "lesson3", "lesson4", "lesson5", "lesson6"];
const PANEL_TYPES = [...SCRIPT_TYPES, ...LESSON_TYPES];
const SCRIPT_LABELS = Object.freeze({
  orientation: "Orientation",
  intro: "Introduction",
  day: "Day Sequence",
  night: "Night Sequence",
  lesson1: "Lesson 1",
  lesson2: "Lesson 2",
  lesson3: "Lesson 3",
  lesson4: "Lesson 4",
  lesson5: "Lesson 5",
  lesson6: "Lesson 6",
});
const VOICE_OPTIONS = Object.freeze([
  {
    id: "daniel",
    name: "Daniel",
    kind: "local",
    sourceLabel: "Device voice",
    matcher: /\bdaniel\b/i,
    image: "01_thumbnail icons/Departmental Administrator M30.png",
  },
  {
    id: "samantha",
    name: "Samantha",
    kind: "local",
    sourceLabel: "Device voice",
    matcher: /\bsamantha\b/i,
    image: "01_thumbnail icons/Departmental Administrator F30.png",
  },
  {
    id: "moira",
    name: "Moira",
    kind: "local",
    sourceLabel: "Device voice",
    matcher: /\bmoira\b/i,
    image: "01_thumbnail icons/Departmental Administrator F60.png",
  },
]);
const AMBIENT_PRESETS = [
  {
    id: "mozart-requiem",
    name: "Mozart - Requiem",
    engine: "recording",
    gain: 0.58,
    audioSrc: "assets/audio/mozart-requiem-lacrimosa.ogg",
  },
  {
    id: "moonlight-sonata",
    name: "Beethoven - Moonlight Sonata",
    engine: "recording",
    gain: 0.55,
    audioSrc: "assets/audio/moonlight-sonata.ogg",
  },
  {
    id: "graveyard-drizzle",
    name: "Graveyard Drizzle",
    engine: "rain",
    gain: 0.18,
    thunder: 0.08,
    rainMin: 220,
    rainMax: 420,
    dropStrength: 0.017,
    rainBedGain: 0.12,
    rainTone: 2200,
  },
  { id: "warning-pulse", name: "Warning Pulse", engine: "pulse", bpm: 62, gain: 0.24 },
  { id: "amplified-heartbeat", name: "Beating Heart", engine: "heartbeat", bpm: 70, gain: 0.46 },
];

const BASE_CITIZEN_ROLE = {
  id: "organizational-citizen",
  name: "Organizational citizen",
  summary: "You do the hard work that Zombie Leaders like to take credit for.",
};

const CITIZEN_ROLES = [
  {
    id: "office-manager",
    name: "Integrity Officer",
    summary: "You can do a background check on someone every day to see if they are a Zombie Leader.",
  },
  {
    id: "hr-lead",
    name: "Personnel Manager",
    summary: "You identify one person every day whose career you will save from destruction by the Zombie Leaders.",
  },
  {
    id: "it-specialist",
    name: "IT Specialist",
    summary: "You can hack the organization’s IT system on two separate occasions — once to get rid of someone; once to save someone.",
  },
  {
    id: "office-matchmaker",
    name: "Office Matchmaker",
    summary: "You select two organizational members to fall in love — so that if one of them leaves, the other does too.",
  },
  {
    id: "union-rep",
    name: "Union Rep",
    count: MIN_UNION_REPS,
    summary: "You work secretly with the other Reps to fight Zombie Leadership. But if you reveal your identity you will be instantly dismissed.",
  },
  {
    id: "training-supervisor",
    name: "Training Supervisor",
    summary: "Every day you send one member of the organization off to complete mandatory training.",
  },
  {
    id: "schosshundchen",
    name: "Schoßhündchen (Boss’s Pet)",
    summary: "You are protected by people high up in the organization — so the first time that you are targeted by Zombie Leaders you are not harmed.",
  },
  {
    id: "intern",
    name: "Intern",
    summary: "Every day you can choose to spend time with a new mentor. If you are targeted by the ZLs you are protected from harm; but if your mentor is terminated, you are too.",
  },
  {
    id: "sycophant",
    name: "Sycophant",
    summary: "Unbeknown to the Zombie Leaders, you are working secretly for their victory. If they win, so do you.",
  },
  {
    id: "office-gossip",
    name: "Office Gossip",
    summary: "You know a lot of dirt about your colleagues. This means that if you are fired by the Zombie Leaders, you can take someone else down with you.",
  },
  {
    id: "social-club-organizer",
    name: "Social Club Organizer",
    summary: "In a round of your choosing, you arrange a group activity for yourself and three other people. This protects you from being harmed by the ZLs in that round.",
  },
];

const ROLE_ICON_META = Object.freeze({
  "zombie-leader": {
    label: "Zombie Leader",
    symbol: "🧟",
    hue: 12,
    images: [
      "01_thumbnail icons/Zombie Leader 1.png",
      "01_thumbnail icons/Zombie Leader 2.png",
      "01_thumbnail icons/Zombie Leader 3.png",
      "01_thumbnail icons/Zombie Leader 4.png",
    ],
  },
  "organizational-citizen": {
    label: "Organizational Citizen",
    symbol: "🏢",
    hue: 160,
    images: [
      "01_thumbnail icons/Organizational Citizen 1.png",
      "01_thumbnail icons/Organizational Citizen 2.png",
      "01_thumbnail icons/Organizational Citizen 3.png",
      "01_thumbnail icons/Organizational Citizen 4.png",
      "01_thumbnail icons/Organizational Citizen 5.png",
    ],
  },
  "office-manager": {
    label: "Integrity Officer",
    symbol: "📋",
    hue: 205,
    images: ["01_thumbnail icons/Integrity Officer.png"],
  },
  "hr-lead": {
    label: "Personnel Manager",
    symbol: "🛡️",
    hue: 182,
    images: ["01_thumbnail icons/Personnel Manager.png"],
  },
  "it-specialist": {
    label: "IT Specialist",
    symbol: "💻",
    hue: 226,
    images: ["01_thumbnail icons/IT Specialist.png"],
  },
  "office-matchmaker": {
    label: "Office Matchmaker",
    symbol: "💘",
    hue: 332,
    images: ["01_thumbnail icons/Office Matchmaker.png"],
  },
  "union-rep": {
    label: "Union Rep",
    symbol: "✊",
    hue: 34,
    images: [
      "01_thumbnail icons/Union Rep 1.png",
      "01_thumbnail icons/Union Rep 2.png",
      "01_thumbnail icons/Union Rep 3.png",
    ],
  },
  "training-supervisor": {
    label: "Training Supervisor",
    symbol: "🎓",
    hue: 274,
    images: ["01_thumbnail icons/Training supervisor.png"],
  },
  "schosshundchen": {
    label: "Schoßhündchen (Boss’s Pet)",
    symbol: "🐾",
    hue: 42,
    images: ["01_thumbnail icons/Boss's Pet.png"],
  },
  "intern": {
    label: "Intern",
    symbol: "🌱",
    hue: 124,
    images: ["01_thumbnail icons/Intern.png"],
  },
  "sycophant": {
    label: "Sycophant",
    symbol: "🎭",
    hue: 316,
    images: ["01_thumbnail icons/Sycophant.png"],
  },
  "office-gossip": {
    label: "Office Gossip",
    symbol: "🗣️",
    hue: 350,
    images: ["01_thumbnail icons/Office Gossip.png"],
  },
  "social-club-organizer": {
    label: "Social Club Organizer",
    symbol: "🎉",
    hue: 52,
    images: ["01_thumbnail icons/Social Club Organizer.png"],
  },
});

const SCRIPT_TEXT = {
  orientation: [
    "Welcome to Happy Days Corporation (HDC) — an organization where we like to put the smile on everyone’s faces and keep it there. I’m the Departmental Administrator and my goal is to make your time here as fulfilling and rewarding as possible. Unfortunately, as you are about to find out, there are some extreme structural constraints that limit my ability to do this. Historically, as our name suggests, we have been a very happy organization. Our leaders worked hard to create, advance, represent and embed a sense of shared identity among employees. As a result, this was a place where people enjoyed their work and were both healthy and productive. But HDC has recently been going through a tough time. Things started going downhill after some of our senior executives went on a shonky Leadership Development course last year. This led to them being infected with a toxic mindset that researchers have identified as arising from an approach to management known as ZOMBIE LEADERSHIP.",
    "Devotees of Zombie Leadership — known as Zombie Leaders — are committed to the idea that leaders are inherently superior to everyone else and hence that they are natural leaders. They think that everything they do is right, that they alone know how best to do things, that everyone can see how wonderful they are, and that they should be extravagantly rewarded for the work they do. Sadly, HDC now has a number of Zombie Leaders in its top ranks. Precisely how many there are of them is unknown — but they are in the process of destroying our organization. If the Zombie Leaders destroy the organization, they will have won.",
    "But the good news is, there are still plenty of decent, sensible people working here.",
    "Finally, we have a number of Organizational Citizens. They are the backbone of HDC and they have been serving the company loyally for a great many years. We are grateful for their service but mindful that the Zombie Leaders are always looking for ways to reduce their ranks — while at the same time taking credit for everything they achieve.",
    "The big question, then, is whether we can save ourselves from the impending Zombie Leadership Apocalypse. Let us not go quietly into that dark night.",
  ],
  intro: [
    "The first thing I’d like to do is work out what role everyone has, because, after the last restructure that the Zombie Leaders initiated everyone — including me — is very confused. And because some of this information is secret, I’d also like everyone to close your eyes. First, I’d like the Zombie Leaders to open your eyes and acknowledge each other.",
    "You are dirtbags and proud of it.",
    "Now please close your eyes.",
    "Now could the Sycophant please open your eyes and look at me. Now Zombie Leaders please keep your eyes closed but just raise your hands.",
    "Sycophant, take note of the Zombie Leaders with their hands raised. Now Zombie Leaders please put your hands down. Sycophant please close your eyes and do your worst.",
    "Now could the Integrity Officer open your eyes and look at me please. Thank you and good luck. Please close your eyes.",
    "Now could the Personnel Manager please open your eyes and look at me. Thank you and good luck. Please close your eyes.",
    "Now IT Specialist open your eyes and look at me please. Thank you and good luck. Please close your eyes.",
    "Now could the Training Supervisor open your eyes and look at me please. Thank you and good luck. Please close your eyes.",
    "Now could the Schoßhündchen (Boss’s Pet) open your eyes and look at me please. Thank you and good luck. Please close your eyes.",
    "Now could the Social Club Organiser open your eyes and look at me please. Thank you and good luck. Please close your eyes.",
    "Now could the Office Gossip open your eyes and look at me please. Thank you and good luck. Please close your eyes.",
    "Now could the Matchmaker open your eyes and look at me. Can you point to two people who you would like to fall in love with each other?",
    "Thank you — you can close your eyes. Now if I tap you on the knee, please open your eyes and gaze upon your new life partner. Your fates will now be inextricably intertwined — so if one of you leaves us, the other will too.",
    "Now please close your eyes and commit yourselves to a future in which you are bound together in perpetuity.",
    "Now could the Union Reps open your eyes and identify each other. You have a difficult job ahead of you and you will need to work as a united force. Your strength lies in your solidarity and your unwavering commitment to the AntiZombie Leadership Alliance. Remember, you are fighting for fairness, for dignity, and for a better future — but you can never speak of this endeavour. Thank you. And now please close your eyes.",
    "Finally, could the Organizational Citizens please keep your eyes closed and raise your hands so that I can see who you are?",
    "Thank you.",
    "We are now ready to get to work.",
    "This is a new day at Happy Days Corporation and the first thing I’d like you to do is elect a Head of Department. This person is going to be in charge of your meetings and they will also have the deciding vote if any votes are tied. So, as always, you need to choose this leader wisely.",
  ],
  day: [
    "We would like you to have a discussion to see if there is anyone you would like to remove from the organization because you suspect them of being a Zombie Leader. You can also choose not to remove anyone, but that decision must be unanimous. This will be the last thing we do today before we go to bed.",
    "Now I know it’s been a long day and that everyone is very tired, but before you go home we need to make plans for tomorrow. I’d also like you to close your eyes so that we can do this in private.",
    "Integrity Officer please open your eyes and tell me whose CV you would like to take home to have a look at.",
    "Thank you. Please close your eyes.",
    "Personnel Manager please open your eyes and indicate whose career you would like to save from attack by Zombie Leaders tonight.",
    "Thank you. Please close your eyes.",
    "Now IT Specialist please open your eyes and let me know if you would like to use your one chance to save the person who is going to be targeted by the Zombie Leaders tonight. Do you want to use your one chance to get rid of someone?",
    "Thank you. Now please close your eyes.",
  ],
  night: [
    "The day has faded into night.",
    "Could the Training Supervisor open your eyes and let me know who you would like to send on mandatory training tomorrow. Tomorrow’s course promises to be very exciting and is on",
    "Thank you. Please close your eyes.",
    "Now could the Social Club Organiser open your eyes and let me know if you want to use your one chance to go on a 24-hour excursion and, if so, who you would like to take with you.",
    "Thank you. Please close your eyes.",
    "Now could the Office Gossip please open your eyes and look at me. If your career is destroyed by the Zombie Leaders tonight, is there anyone you would like to take down with you?",
    "Thank you. Please close your eyes.",
    "Now, finally, could the Intern open your eyes and let me know who, if anyone, you would like to have as your mentor for the next 24 hours.",
    "Thank you. Please close your eyes.",
    "Thank you everyone for your work today. It’s now time for everyone to get a good night’s rest, as it’s going to be another busy day tomorrow.",
    "So please close your eyes.",
    "It’s now time for the Zombie Leaders to get to work.",
    "Zombie Leaders, open your eyes. Your task is to identify one person whose position in HDC you will terminate (typically someone you see as the greatest threat, or to throw the Organizational Citizens off your scent). Please remain silent and use only non-verbal communication to agree on your next victim. Once you have reached an agreement, silently point to the person you wish to remove from the organization.",
    "Thank you. Please close your eyes.",
    "Now everyone, enjoy the rest of the night.",
  ],
};

const LESSON_TEXT = Object.freeze({
  lesson1: [
    "Standard models of human psychology don’t tell us what we really need to know. In particular, knowing a lot about someone’s personality, e.g., whether they are conscientious, extraverted or agreeable, doesn’t help us understand how they are going to behave in a complex organizational system that is characterised — as most are — by group division and asymmetric access to information.",
  ],
  lesson2: [
    "Reliance on zombie leadership models leads us astray. In particular, belief in great men (or women) will typically mean that we end up listening to the wrong people, while failing to heed the urgings of the ordinary group members we should really be attending to.",
  ],
  lesson3: [
    "The most reliable predictor of behaviour is a person’s social identity and the motivations this creates. As is true in a range of social and organizational contexts, people’s behaviour is driven by the group they identify with and the needs and priorities of that group in the situation at hand. What someone is like as an individual is secondary to this. What we need to discover (but struggle to discern — and hence the appeal of the game) is what group a person identifies with. Once we know this, we understand everything. But usually too late.",
  ],
  lesson4: [
    "Note that the Sycophant is particularly instructive in pointing to the important difference between a psychological group and a sociological group (a group we identify with vs. a group we are simply a member of). The Sycophant is an Organizational Citizen but they identify with the Zombie Leaders, and it is their identification with the Zombie Leaders that ultimately shapes their behaviour.",
  ],
  lesson5: [
    "The machinations of social identity are hard to predict. Even if we know what group someone identifies with, we can’t predict what they are going to do unless we can anticipate the situation that they and their group are going to find themselves in. Mapping these situations and their implications is therefore a priority for psychological analysis.",
  ],
  lesson6: [
    "Being right is not enough. In psychology, as in science, we often imagine that all we need to do is know the truth and be right. But this is never enough to influence others and change the world in the ways we and the groups we identify with want it to change. To do this, we need to persuade others that we are right while also protecting ourselves against the groups who are threatened by our knowledge.",
  ],
});

const dom = {
  authGate: document.getElementById("auth-gate"),
  authForm: document.getElementById("auth-form"),
  accessCode: document.getElementById("access-code"),
  authStatus: document.getElementById("auth-status"),
  playerCount: document.getElementById("player-count"),
  playerNames: document.getElementById("player-names"),
  zombieCount: document.getElementById("zombie-count"),
  zombieCountIcons: document.getElementById("zombie-count-icons"),
  rolesGrid: document.getElementById("roles-grid"),
  roleIconLegend: document.getElementById("role-icon-legend"),
  selectAllRoles: document.getElementById("select-all-roles"),
  clearAllRoles: document.getElementById("clear-all-roles"),
  generateGame: document.getElementById("generate-game"),
  setupStatus: document.getElementById("setup-status"),
  gameSummary: document.getElementById("game-summary"),
  cardsGrid: document.getElementById("cards-grid"),
  revealAllCards: document.getElementById("reveal-all-cards"),
  hideAllCards: document.getElementById("hide-all-cards"),
  orientationEnabled: document.getElementById("orientation-enabled"),
  countdownTimerBox: document.getElementById("countdown-timer-box"),
  countdownMinutes: document.getElementById("countdown-minutes"),
  countdownMinutesValue: document.getElementById("countdown-minutes-value"),
  startTimer: document.getElementById("start-timer"),
  pauseTimer: document.getElementById("pause-timer"),
  resetTimer: document.getElementById("reset-timer"),
  timerSirenVolume: document.getElementById("timer-siren-volume"),
  timerSirenVolumeValue: document.getElementById("timer-siren-volume-value"),
  playSirenDemo: document.getElementById("play-siren-demo"),
  stopSiren: document.getElementById("stop-siren"),
  timerStatus: document.getElementById("timer-status"),
  timerVoiceChoices: document.getElementById("timer-voice-choices"),
  startNight: document.getElementById("start-night"),
  pauseNight: document.getElementById("pause-night"),
  ambienceSelect: document.getElementById("ambience-select"),
  backgroundVolume: document.getElementById("background-volume"),
  backgroundVolumeValue: document.getElementById("background-volume-value"),
  backgroundAudioProgress: document.getElementById("background-audio-progress"),
  backgroundAudioProgressMeta: document.getElementById("background-audio-progress-meta"),
  voiceRate: document.getElementById("voice-rate"),
  voiceRateValue: document.getElementById("voice-rate-value"),
  voiceVolume: document.getElementById("voice-volume"),
  voiceVolumeValue: document.getElementById("voice-volume-value"),
  voiceChoices: document.getElementById("voice-choices"),
  lessonsVoiceRate: document.getElementById("lessons-voice-rate"),
  lessonsVoiceRateValue: document.getElementById("lessons-voice-rate-value"),
  lessonsVoiceVolume: document.getElementById("lessons-voice-volume"),
  lessonsVoiceVolumeValue: document.getElementById("lessons-voice-volume-value"),
  lessonsVoiceChoices: document.getElementById("lessons-voice-choices"),
  testVoice: document.getElementById("test-voice"),
  audioStatus: document.getElementById("audio-status"),
  lessonsAudioStatus: document.getElementById("lessons-audio-status"),
  orientationScript: document.getElementById("orientation-script"),
  introScript: document.getElementById("intro-script"),
  dayScript: document.getElementById("day-script"),
  nightScript: document.getElementById("night-script"),
};
dom.scriptPanels = buildScriptPanelDom();
dom.timerDigits = Object.fromEntries(
  ["m1", "m2", "s1", "s2"].map((id) => [id, document.querySelector(`[data-timer-digit="${id}"]`)])
);
dom.timerWarningInputs = Array.from(document.querySelectorAll(".warning-options input[type=\"checkbox\"]"));

const state = {
  assignments: [],
  activeRoles: [],
  scripts: { orientation: [], intro: [], day: [], night: [] },
  voices: [],
  voiceMap: new Map(),
  selectedVoiceId: "daniel",
  zombieLeaderSelection: Array.from({ length: MAX_ZOMBIES }, (_, index) => index < 3),
  backgroundVolumeRatio: DEFAULT_BACKGROUND_AUDIO_VOLUME_RATIO,
  narrationVolumeRatio: DEFAULT_NARRATION_VOLUME_RATIO,
  nightAudio: null,
  speechSessionId: 0,
  unionRepCount: MIN_UNION_REPS,
  scriptPlayback: null,
  scriptPendingResume: null,
  completedScriptPlayback: null,
  scriptScrub: null,
  nightAudioScrub: null,
  timer: {
    durationMinutes: DEFAULT_COUNTDOWN_MINUTES,
    remainingMs: DEFAULT_COUNTDOWN_MINUTES * 60 * 1000,
    targetTimeMs: 0,
    intervalId: 0,
    isRunning: false,
    warningSeconds: new Set(DEFAULT_TIMER_WARNING_SECONDS),
    firedWarnings: new Set(),
    voiceId: DEFAULT_TIMER_WARNING_VOICE_ID,
  },
  timerSiren: null,
  timerSirenVolumeRatio: DEFAULT_TIMER_SIREN_VOLUME_RATIO,
  timerDemoTimeoutId: 0,
};

function init() {
  renderZombieCountIcons();
  renderRolePicker();
  renderAmbienceOptions();
  bindEvents();
  updateTimerDurationReadout();
  syncTimerWarningAvailability();
  renderTimerVoiceChoices();
  updateTimerSirenVolumeReadout();
  syncCountdownTimerUI();
  updateNightAudioButton();
  syncNightAudioUI();
  updateBackgroundVolumeReadout();
  updateVoiceControlReadouts();
  populateVoiceList();
  state.scripts = buildFallbackScripts();
  updateScriptViews();
  syncScriptPlaybackUI();
  setupAccessGate();
  setSetupStatus("After you have selected the roles you want to include, click here to generate game instructions in the Audio Director below.");
}

function bindEvents() {
  dom.authForm.addEventListener("submit", handleAuthSubmit);
  dom.selectAllRoles.addEventListener("click", () => setRoleCheckboxes(true));
  dom.clearAllRoles.addEventListener("click", () => setRoleCheckboxes(false));
  dom.generateGame.addEventListener("click", handleGenerateGame);
  dom.revealAllCards.addEventListener("click", revealAllCards);
  dom.hideAllCards.addEventListener("click", hideAllCards);
  bindScriptPanelEvents();
  dom.countdownMinutes?.addEventListener("input", handleTimerDurationInput);
  dom.startTimer?.addEventListener("click", startCountdownTimer);
  dom.pauseTimer?.addEventListener("click", toggleCountdownTimerPause);
  dom.resetTimer?.addEventListener("click", resetCountdownTimer);
  dom.timerSirenVolume?.addEventListener("input", handleTimerSirenVolumeInput);
  dom.playSirenDemo?.addEventListener("click", playTimerSirenDemo);
  dom.stopSiren?.addEventListener("click", () => stopTimerSiren());
  dom.timerWarningInputs.forEach((input) => {
    input.addEventListener("change", handleTimerWarningChange);
  });
  dom.timerVoiceChoices?.querySelectorAll("[data-timer-voice-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const voiceId = button.dataset.timerVoiceId;
      if (!voiceId) return;
      state.timer.voiceId = voiceId;
      renderTimerVoiceChoices();
      const label = voiceId === "daniel" ? "Daniel" : "Samantha";
      setTimerStatus(`Warning voice set to ${label}.`);
    });
  });
  dom.startNight.addEventListener("click", handlePlayNightAudio);
  dom.pauseNight.addEventListener("click", toggleNightAudioPause);
  dom.ambienceSelect.addEventListener("change", handleAmbienceChange);
  dom.backgroundVolume.addEventListener("input", handleBackgroundVolumeInput);
  dom.backgroundAudioProgress?.addEventListener("pointerdown", beginNightAudioScrub);
  dom.backgroundAudioProgress?.addEventListener("pointerup", endNightAudioScrub);
  dom.backgroundAudioProgress?.addEventListener("pointercancel", endNightAudioScrub);
  dom.backgroundAudioProgress?.addEventListener("input", handleNightAudioScrubInput);
  dom.backgroundAudioProgress?.addEventListener("change", endNightAudioScrub);
  dom.zombieCount.addEventListener("input", handleZombieCountInput);
  dom.orientationEnabled.addEventListener("change", handleOrientationToggle);
  dom.voiceRate?.addEventListener("input", handleVoiceRateInput);
  dom.lessonsVoiceRate?.addEventListener("input", handleVoiceRateInput);
  dom.voiceVolume?.addEventListener("input", handleVoiceVolumeInput);
  dom.lessonsVoiceVolume?.addEventListener("input", handleVoiceVolumeInput);
  dom.testVoice.addEventListener("click", handleTestVoice);
  window.speechSynthesis?.addEventListener?.("voiceschanged", populateVoiceList);
  window.addEventListener("beforeunload", () => {
    stopSpeech();
    stopCountdownTimer({ keepRemaining: true });
    stopTimerSiren({ silent: true });
    stopNightAudio();
  });
}

function handleTimerDurationInput() {
  if (!dom.countdownMinutes) return;
  const nextMinutes = clamp(
    Number(dom.countdownMinutes.value) || DEFAULT_COUNTDOWN_MINUTES,
    MIN_COUNTDOWN_MINUTES,
    MAX_COUNTDOWN_MINUTES
  );
  dom.countdownMinutes.value = String(nextMinutes);
  state.timer.durationMinutes = nextMinutes;
  updateTimerDurationReadout();
  syncTimerWarningAvailability();

  if (state.timer.isRunning) return;

  state.timer.remainingMs = nextMinutes * 60 * 1000;
  state.timer.firedWarnings = new Set();
  stopTimerSiren({ silent: true });
  syncCountdownTimerUI();
  setTimerStatus(`Ready at ${formatCountdownClock(state.timer.remainingMs)}.`);
}

function updateTimerDurationReadout() {
  if (!dom.countdownMinutesValue || !dom.countdownMinutes) return;
  const minutes = clamp(
    Number(dom.countdownMinutes.value) || state.timer.durationMinutes || DEFAULT_COUNTDOWN_MINUTES,
    MIN_COUNTDOWN_MINUTES,
    MAX_COUNTDOWN_MINUTES
  );
  dom.countdownMinutesValue.textContent = `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

function handleTimerWarningChange() {
  const nextWarnings = new Set(
    dom.timerWarningInputs
      .filter((input) => input.checked)
      .map((input) => Number(input.value))
      .filter((seconds) => TIMER_WARNING_OPTIONS.includes(seconds))
  );
  state.timer.warningSeconds = nextWarnings;
}

function renderTimerVoiceChoices() {
  if (!dom.timerVoiceChoices) return;
  dom.timerVoiceChoices.querySelectorAll("[data-timer-voice-id]").forEach((button) => {
    const voiceId = button.dataset.timerVoiceId;
    const isActive = voiceId === state.timer.voiceId;
    const isAvailable = isVoiceOptionAvailable(VOICE_OPTIONS.find((option) => option.id === voiceId));
    button.classList.toggle("active", isActive);
    button.classList.toggle("unavailable", !isAvailable);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.disabled = false;
  });
}

function syncTimerWarningAvailability() {
  const enableSixtySecondWarning = state.timer.durationMinutes >= 2;
  const sixtySecondInput = dom.timerWarningInputs.find((input) => Number(input.value) === 60);
  if (!sixtySecondInput) {
    handleTimerWarningChange();
    return;
  }

  sixtySecondInput.disabled = !enableSixtySecondWarning;
  sixtySecondInput.closest(".warning-option")?.classList.toggle("disabled", !enableSixtySecondWarning);
  if (!enableSixtySecondWarning) {
    sixtySecondInput.checked = false;
  }
  handleTimerWarningChange();
}

function startCountdownTimer() {
  if (state.timer.isRunning) return;

  const fullDurationMs = state.timer.durationMinutes * 60 * 1000;
  const wasPaused = state.timer.remainingMs > 0 && state.timer.remainingMs < fullDurationMs;
  if (state.timer.remainingMs <= 0) {
    state.timer.remainingMs = fullDurationMs;
    state.timer.firedWarnings = new Set();
  }

  stopTimerSiren({ silent: true });
  window.clearInterval(state.timer.intervalId);
  state.timer.targetTimeMs = Date.now() + state.timer.remainingMs;
  state.timer.intervalId = window.setInterval(tickCountdownTimer, 120);
  state.timer.isRunning = true;
  syncCountdownTimerUI();
  tickCountdownTimer();
  setTimerStatus(wasPaused ? "Timer resumed." : `Timer started for ${formatCountdownClock(fullDurationMs)}.`);
}

function toggleCountdownTimerPause() {
  if (state.timer.isRunning) {
    pauseCountdownTimer();
    return;
  }

  const fullDurationMs = state.timer.durationMinutes * 60 * 1000;
  if (state.timer.remainingMs > 0 && state.timer.remainingMs < fullDurationMs) {
    startCountdownTimer();
  }
}

function pauseCountdownTimer() {
  if (!state.timer.isRunning) return;
  state.timer.remainingMs = Math.max(0, state.timer.targetTimeMs - Date.now());
  window.clearInterval(state.timer.intervalId);
  state.timer.intervalId = 0;
  state.timer.targetTimeMs = 0;
  state.timer.isRunning = false;
  syncCountdownTimerUI();
  setTimerStatus(`Timer paused at ${formatCountdownClock(state.timer.remainingMs)}.`);
}

function resetCountdownTimer() {
  stopCountdownTimer({ keepRemaining: false });
  stopTimerSiren({ silent: true });
  state.timer.firedWarnings = new Set();
  syncCountdownTimerUI();
  setTimerStatus(`Ready at ${formatCountdownClock(state.timer.remainingMs)}.`);
}

function stopCountdownTimer(options = {}) {
  const keepRemaining = Boolean(options.keepRemaining);
  if (state.timer.isRunning) {
    state.timer.remainingMs = Math.max(0, state.timer.targetTimeMs - Date.now());
  }
  window.clearInterval(state.timer.intervalId);
  state.timer.intervalId = 0;
  state.timer.targetTimeMs = 0;
  state.timer.isRunning = false;
  if (!keepRemaining) {
    state.timer.remainingMs = state.timer.durationMinutes * 60 * 1000;
  }
}

function tickCountdownTimer() {
  if (!state.timer.isRunning) return;

  const previousMs = state.timer.remainingMs;
  const nextMs = Math.max(0, state.timer.targetTimeMs - Date.now());
  state.timer.remainingMs = nextMs;
  handleTimerWarningThresholds(previousMs, nextMs);
  syncCountdownTimerUI();

  if (nextMs > 0) return;

  window.clearInterval(state.timer.intervalId);
  state.timer.intervalId = 0;
  state.timer.targetTimeMs = 0;
  state.timer.isRunning = false;
  state.timer.remainingMs = 0;
  syncCountdownTimerUI();
  startTimerSiren({ mode: "alert" });
  setTimerStatus("Time expired. Air raid siren active.", true);
}

function handleTimerWarningThresholds(previousMs, nextMs) {
  const thresholds = [...state.timer.warningSeconds].sort((a, b) => b - a);
  thresholds.forEach((seconds) => {
    const thresholdMs = seconds * 1000;
    if (state.timer.firedWarnings.has(seconds)) return;
    if (previousMs >= thresholdMs && nextMs <= thresholdMs) {
      state.timer.firedWarnings.add(seconds);
      speakTimerWarning(`${seconds} seconds left.`);
    }
  });
}

function speakTimerWarning(message) {
  speakShortMessage(message, { voiceId: state.timer.voiceId, rate: DEFAULT_TIMER_WARNING_RATE });
}

function speakShortMessage(message, options = {}) {
  if (!window.speechSynthesis) return false;
  const text = String(message || "").trim();
  if (!text) return false;

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = resolveVoiceForId(options.voiceId) || selectedLocalVoice() || pickBestVoice(state.voices);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-AU";
  } else {
    utterance.lang = "en-AU";
  }

  utterance.rate = clamp(Number(options.rate) || 1, 0.8, 1.4);
  utterance.volume = clamp(
    typeof options.volume === "number" ? options.volume : state.narrationVolumeRatio,
    0,
    1
  );
  window.speechSynthesis.speak(utterance);
  return true;
}

function resolveVoiceForId(voiceId) {
  if (!voiceId) return null;
  return state.voiceMap.get(voiceId) || null;
}

function handleTimerSirenVolumeInput() {
  updateTimerSirenVolumeReadout();
  applyTimerSirenVolume();
}

function updateTimerSirenVolumeReadout() {
  if (!dom.timerSirenVolume || !dom.timerSirenVolumeValue) return;
  const ratio = clamp((Number(dom.timerSirenVolume.value) || 0) / 100, 0, 1);
  state.timerSirenVolumeRatio = ratio;
  dom.timerSirenVolumeValue.textContent = `${Math.round(ratio * 100)}%`;
}

function applyTimerSirenVolume(sirenState = state.timerSiren) {
  if (!sirenState?.masterGain?.gain) return;
  sirenState.masterGain.gain.value = clamp(
    (Number(sirenState.baseGain) || 0.55) * state.timerSirenVolumeRatio,
    0,
    0.9
  );
}

function playTimerSirenDemo() {
  startTimerSiren({ mode: "demo", durationMs: 3500 });
  setTimerStatus("Playing siren demo.");
}

function startTimerSiren(options = {}) {
  stopTimerSiren({ silent: true });

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    setTimerStatus("Web Audio API is not available in this browser.", true);
    return;
  }

  const context = new AudioContextCtor();
  const masterGain = context.createGain();
  masterGain.connect(context.destination);

  const cleanups = [
    addSirenLayer(context, masterGain, 0.16),
    addNoiseLayer(context, masterGain, {
      type: "highpass",
      frequency: 1600,
      q: 0.7,
      gain: 0.08,
    }),
  ];

  const sirenState = {
    context,
    masterGain,
    baseGain: 0.72,
    mode: options.mode || "alert",
    stop() {
      cleanups.forEach((cleanup) => {
        try {
          cleanup();
        } catch (_) {}
      });
      try {
        context.close();
      } catch (_) {}
    },
  };

  state.timerSiren = sirenState;
  applyTimerSirenVolume(sirenState);
  context.resume().catch(() => {});
  syncCountdownTimerUI();

  if (options.durationMs) {
    window.clearTimeout(state.timerDemoTimeoutId);
    state.timerDemoTimeoutId = window.setTimeout(() => {
      stopTimerSiren({ silent: true });
      setTimerStatus("Siren demo ended.");
    }, options.durationMs);
  }
}

function stopTimerSiren(options = {}) {
  window.clearTimeout(state.timerDemoTimeoutId);
  state.timerDemoTimeoutId = 0;
  if (!state.timerSiren) {
    syncCountdownTimerUI();
    return;
  }

  try {
    state.timerSiren.stop();
  } catch (_) {}
  state.timerSiren = null;
  syncCountdownTimerUI();

  if (!options.silent) {
    setTimerStatus("Siren stopped.");
  }
}

function syncCountdownTimerUI() {
  const fullDurationMs = state.timer.durationMinutes * 60 * 1000;
  updateFlipClockDisplay(state.timer.remainingMs);

  if (dom.countdownTimerBox) {
    dom.countdownTimerBox.classList.toggle("running", state.timer.isRunning);
    dom.countdownTimerBox.classList.toggle("expired", !state.timer.isRunning && state.timer.remainingMs <= 0);
  }

  if (dom.startTimer) {
    dom.startTimer.disabled = state.timer.isRunning;
    dom.startTimer.classList.toggle("active", state.timer.isRunning);
  }

  if (dom.pauseTimer) {
    const canResume = !state.timer.isRunning && state.timer.remainingMs > 0 && state.timer.remainingMs < fullDurationMs;
    dom.pauseTimer.disabled = !state.timer.isRunning && !canResume;
    dom.pauseTimer.innerHTML = state.timer.isRunning ? "&#9208; Pause" : "&#9654; Resume";
    dom.pauseTimer.classList.toggle("active", canResume);
  }

  if (dom.resetTimer) {
    dom.resetTimer.disabled = false;
  }

  if (dom.countdownMinutes) {
    dom.countdownMinutes.disabled = state.timer.isRunning;
  }

  if (dom.playSirenDemo) {
    const isAlertActive = state.timerSiren?.mode === "alert";
    const isDemoActive = state.timerSiren?.mode === "demo";
    dom.playSirenDemo.disabled = isAlertActive;
    dom.playSirenDemo.classList.toggle("active", Boolean(isDemoActive));
  }

  if (dom.stopSiren) {
    dom.stopSiren.disabled = !state.timerSiren;
    dom.stopSiren.classList.toggle("active", Boolean(state.timerSiren));
  }
}

function updateFlipClockDisplay(remainingMs) {
  const displaySeconds = remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
  const minutes = Math.floor(displaySeconds / 60);
  const seconds = displaySeconds % 60;
  const minuteText = String(minutes).padStart(2, "0");
  const secondText = String(seconds).padStart(2, "0");
  const digits = {
    m1: minuteText[0],
    m2: minuteText[1],
    s1: secondText[0],
    s2: secondText[1],
  };

  Object.entries(digits).forEach(([key, value]) => {
    const node = dom.timerDigits[key];
    if (!node) return;
    if (node.textContent === value) return;
    node.textContent = value;
    animateFlipDigitChange(node);
  });
}

function animateFlipDigitChange(node) {
  const digit = node.closest(".flip-digit");
  if (!digit) return;
  digit.classList.remove("digit-flip");
  window.requestAnimationFrame(() => {
    digit.classList.add("digit-flip");
    window.setTimeout(() => digit.classList.remove("digit-flip"), 240);
  });
}

function formatCountdownClock(milliseconds) {
  const totalSeconds = milliseconds > 0 ? Math.ceil(milliseconds / 1000) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderZombieCountIcons() {
  if (!dom.zombieCountIcons) return;
  dom.zombieCountIcons.innerHTML = Array.from({ length: MAX_ZOMBIES }, (_, index) => {
    return `
      <button
        type="button"
        class="zombie-count-icon"
        data-action="toggle-zombie-count"
        data-index="${index}"
        aria-label="Toggle Zombie Leader ${index + 1}"
      >
        ${renderRoleThumb("zombie-leader", {
          team: "zombie",
          label: `Zombie Leader ${index + 1}`,
          className: "zombie-count-thumb",
          variantSeed: index,
        })}
      </button>
    `;
  }).join("");
  dom.zombieCountIcons.querySelectorAll('[data-action="toggle-zombie-count"]').forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      if (!Number.isInteger(index)) return;
      toggleZombieLeaderSelection(index);
      syncZombieCountIcons();
    });
  });
  syncZombieCountIcons();
}

function handleZombieCountInput() {
  const nextValue = clamp(Number(dom.zombieCount.value) || 0, 1, MAX_ZOMBIES);
  dom.zombieCount.value = String(nextValue);
  syncZombieLeaderSelectionFromCount(nextValue);
  syncZombieCountIcons();
}

function syncZombieCountIcons() {
  if (!dom.zombieCountIcons) return;
  dom.zombieCountIcons.querySelectorAll('[data-action="toggle-zombie-count"]').forEach((button) => {
    const index = Number(button.dataset.index);
    const isActive = Boolean(state.zombieLeaderSelection[index]);
    button.classList.toggle("active", isActive);
    button.classList.toggle("inactive", !isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function toggleZombieLeaderSelection(index) {
  if (!Array.isArray(state.zombieLeaderSelection)) {
    state.zombieLeaderSelection = Array.from({ length: MAX_ZOMBIES }, (_, slot) => slot < 3);
  }
  const nextSelection = [...state.zombieLeaderSelection];
  const activeCount = nextSelection.filter(Boolean).length;
  if (nextSelection[index] && activeCount <= 1) return;
  nextSelection[index] = !nextSelection[index];
  state.zombieLeaderSelection = nextSelection;
  dom.zombieCount.value = String(nextSelection.filter(Boolean).length);
}

function syncZombieLeaderSelectionFromCount(targetCount) {
  const nextSelection = Array.isArray(state.zombieLeaderSelection)
    ? [...state.zombieLeaderSelection]
    : Array.from({ length: MAX_ZOMBIES }, () => false);

  while (nextSelection.filter(Boolean).length < targetCount) {
    const nextIndex = nextSelection.findIndex((value) => !value);
    if (nextIndex === -1) break;
    nextSelection[nextIndex] = true;
  }

  while (nextSelection.filter(Boolean).length > targetCount) {
    const nextIndex = nextSelection.lastIndexOf(true);
    if (nextIndex === -1) break;
    nextSelection[nextIndex] = false;
  }

  state.zombieLeaderSelection = nextSelection;
}

function buildScriptPanelDom() {
  return Object.fromEntries(
    PANEL_TYPES.map((type) => {
      const panel = document.querySelector(`[data-script-panel="${type}"]`);
      return [
        type,
        {
          panel,
          playButton: panel?.querySelector('[data-script-action="play"]') || null,
          pauseButton: panel?.querySelector('[data-script-action="pause"]') || null,
          progressInput: panel?.querySelector("[data-script-progress-input]") || null,
          progressMeta: panel?.querySelector("[data-script-progress-meta]") || null,
          textarea: panel?.querySelector("textarea") || null,
        },
      ];
    })
  );
}

function bindScriptPanelEvents() {
  PANEL_TYPES.forEach((type) => {
    const panelDom = dom.scriptPanels[type];
    if (!panelDom) return;
    panelDom.playButton?.addEventListener("click", () => playScript(type));
    panelDom.pauseButton?.addEventListener("click", () => toggleScriptPause(type));
    panelDom.progressInput?.addEventListener("pointerdown", (event) => beginScriptScrub(type, event));
    panelDom.progressInput?.addEventListener("pointerup", () => endScriptScrub(type));
    panelDom.progressInput?.addEventListener("pointercancel", () => endScriptScrub(type));
    panelDom.progressInput?.addEventListener("input", (event) => updateScriptScrub(type, event));
    panelDom.progressInput?.addEventListener("change", () => endScriptScrub(type));
  });
}

function handleOrientationToggle() {
  if (!dom.orientationEnabled.checked && state.scriptPlayback?.type === "orientation") {
    stopSpeech();
  }
  updateScriptViews();
}

function setupAccessGate() {
  const isUnlocked = getSessionUnlockState();
  if (isUnlocked) {
    unlockApp();
    return;
  }
  lockApp();
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const entered = String(dom.accessCode.value || "").trim().toLowerCase();
  if (!entered) {
    setAuthStatus("Enter the access code.", true);
    return;
  }
  if (entered !== ACCESS_CODE) {
    setAuthStatus("Incorrect access code.", true);
    dom.accessCode.focus();
    dom.accessCode.select();
    return;
  }

  setSessionUnlockState(true);
  setAuthStatus("");
  unlockApp();
}

function lockApp() {
  document.body.classList.add("locked");
  dom.accessCode.value = "";
  dom.accessCode.focus();
}

function unlockApp() {
  document.body.classList.remove("locked");
}

function getSessionUnlockState() {
  try {
    return window.sessionStorage.getItem(ACCESS_SESSION_KEY) === "true";
  } catch (_) {
    return false;
  }
}

function setSessionUnlockState(value) {
  try {
    if (value) {
      window.sessionStorage.setItem(ACCESS_SESSION_KEY, "true");
    } else {
      window.sessionStorage.removeItem(ACCESS_SESSION_KEY);
    }
  } catch (_) {}
}

function renderRolePicker() {
  const html = CITIZEN_ROLES.map((role) => {
    return `
      <div class="role-item">
        <label>
          <span class="role-content-row">
            <span class="role-check-row">
              <input type="checkbox" value="${role.id}">
            </span>
            ${renderRoleThumb(role.id, { label: role.name, className: "picker-thumb" })}
          </span>
          <span class="role-copy">
            <span class="role-title">${role.name}</span>
            <span class="role-summary">${role.summary}</span>
          </span>
        </label>
        ${renderRolePickerExtras(role)}
      </div>
    `;
  }).join("");
  dom.rolesGrid.innerHTML = html;
  bindRolePickerControls();
  renderRoleIconLegend();
}

function renderRolePickerExtras(role) {
  if (role.id !== "union-rep") return "";
  return `
    <div class="role-extra">
      <span class="role-extra-label">No. of Union Reps</span>
      <div class="count-toggle" data-role-count="union-rep" aria-label="Number of Union Reps">
        ${renderCountChoice(MIN_UNION_REPS, state.unionRepCount === MIN_UNION_REPS)}
        ${renderCountChoice(MAX_UNION_REPS, state.unionRepCount === MAX_UNION_REPS)}
      </div>
    </div>
  `;
}

function renderCountChoice(count, isActive) {
  return `
    <button
      type="button"
      class="count-choice${isActive ? " active" : ""}"
      data-action="set-union-count"
      data-count="${count}"
      aria-pressed="${isActive ? "true" : "false"}"
    >${count}</button>
  `;
}

function bindRolePickerControls() {
  dom.rolesGrid.querySelectorAll('[data-action="set-union-count"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextCount = Number(event.currentTarget.dataset.count);
      if (nextCount !== MIN_UNION_REPS && nextCount !== MAX_UNION_REPS) return;
      state.unionRepCount = nextCount;
      updateUnionRepCountButtons();

      const unionCheckbox = dom.rolesGrid.querySelector('input[value="union-rep"]');
      if (unionCheckbox) {
        unionCheckbox.checked = true;
      }
    });
  });
}

function updateUnionRepCountButtons() {
  dom.rolesGrid.querySelectorAll('[data-action="set-union-count"]').forEach((button) => {
    const count = Number(button.dataset.count);
    const isActive = count === state.unionRepCount;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function renderRoleIconLegend() {
  if (!dom.roleIconLegend) return;
  const entries = [
    ...CITIZEN_ROLES.map((role) => ({ id: role.id, name: role.name, team: "citizen" })),
    { id: BASE_CITIZEN_ROLE.id, name: BASE_CITIZEN_ROLE.name, team: "citizen" },
    { id: "zombie-leader", name: "Zombie Leader", team: "zombie" },
  ];

  dom.roleIconLegend.innerHTML = entries
    .map((entry) => {
      return `
        <span class="icon-chip">
          ${renderRoleThumb(entry.id, {
            team: entry.team,
            label: entry.name,
            className: "icon-chip-thumb",
          })}
          <span>${escapeHtml(entry.name)}</span>
        </span>
      `;
    })
    .join("");
}

function getRoleIconMeta(roleId, team) {
  if (roleId && ROLE_ICON_META[roleId]) return ROLE_ICON_META[roleId];
  if (team === "zombie") return ROLE_ICON_META["zombie-leader"];
  return ROLE_ICON_META["organizational-citizen"];
}

function pickRoleIconImage(meta, variantSeed) {
  if (!meta) return null;
  const images = Array.isArray(meta.images) ? meta.images.filter(Boolean) : [];
  if (!images.length) return null;
  const safeSeed = Math.abs(Number.isFinite(variantSeed) ? Number(variantSeed) : 0);
  return images[safeSeed % images.length];
}

function hashString(text) {
  const input = String(text || "");
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function renderRoleThumb(roleId, options = {}) {
  const { team = "citizen", label = "", className = "", variantSeed = 0 } = options;
  const meta = getRoleIconMeta(roleId, team);
  const title = label || meta.label;
  const classNames = ["role-thumb"];
  if (className) classNames.push(className);
  const imagePath = pickRoleIconImage(meta, variantSeed);

  if (imagePath) {
    classNames.push("role-thumb-photo");
    return `<span class="${classNames.join(" ")}" title="${escapeHtml(title)}" aria-hidden="true">
      <img class="role-thumb-image" src="${escapeHtml(encodeURI(imagePath))}" alt="">
    </span>`;
  }

  classNames.push("role-thumb-glyph");
  return `<span class="${classNames.join(" ")}" style="--thumb-hue:${meta.hue};" title="${escapeHtml(
    title
  )}" aria-hidden="true">${meta.symbol || "?"}</span>`;
}

function renderHiddenThumb(className = "") {
  const classNames = ["role-thumb", "role-thumb-hidden"];
  if (className) classNames.push(className);
  return `<span class="${classNames.join(" ")}" title="Hidden role" aria-hidden="true">?</span>`;
}

function renderAmbienceOptions() {
  if (!dom.ambienceSelect) return;
  dom.ambienceSelect.innerHTML = "";
  AMBIENT_PRESETS.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.name;
    dom.ambienceSelect.appendChild(option);
  });
  dom.ambienceSelect.value = DEFAULT_AMBIENCE_ID;
}

function setRoleCheckboxes(checked) {
  const boxes = dom.rolesGrid.querySelectorAll('input[type="checkbox"]');
  boxes.forEach((box) => {
    box.checked = checked;
  });
}

function getSelectedRoles() {
  const checkedIds = Array.from(
    dom.rolesGrid.querySelectorAll('input[type="checkbox"]:checked')
  ).map((input) => input.value);
  const selected = CITIZEN_ROLES.filter((role) => checkedIds.includes(role.id)).map((role) => {
    if (role.id === "union-rep") {
      return { ...role, count: state.unionRepCount };
    }
    return role;
  });
  return selected;
}

function parsePlayers(raw) {
  const input = String(raw || "").trim();
  if (!input) return [];

  const delimiterPattern = /[\n,;]+/;
  const names = (delimiterPattern.test(input) ? input.split(delimiterPattern) : input.split(/\s+/))
    .map((name) => name.trim())
    .filter(Boolean);
  const seen = new Set();
  return names.filter((name) => {
    const key = name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function handleGenerateGame() {
  stopSpeech();
  stopNightAudio();

  const requestedCount = Number(dom.playerCount.value);
  const providedNames = parsePlayers(dom.playerNames.value);
  const zombieCount = Number(dom.zombieCount.value);
  const selectedRoles = getSelectedRoles();

  const validation = validateSetup(
    providedNames,
    requestedCount,
    zombieCount,
    selectedRoles
  );
  if (!validation.ok) {
    setSetupStatus(validation.message, true);
    return;
  }

  const playerBuild = buildPlayersForGame(providedNames, requestedCount);
  const players = playerBuild.players;

  state.assignments = buildAssignments(players, zombieCount, selectedRoles);
  state.activeRoles = uniqueById(
    state.assignments
      .filter((a) => a.team === "citizen" && a.role.id !== BASE_CITIZEN_ROLE.id)
      .map((a) => a.role)
  );
  state.scripts = buildScripts(state.assignments, state.activeRoles);

  renderSummary();
  renderCards();
  updateScriptViews();
  setSetupStatus(
    `Game generated for ${players.length} players (${zombieCount} Zombie Leaders). ${playerBuild.note}`
  );
  setAudioStatus("Scripts are ready.");
}

function validateSetup(providedNames, requestedCount, zombieCount, selectedRoles) {
  if (!Number.isInteger(requestedCount) || requestedCount < 1 || requestedCount > MAX_PLAYERS) {
    return {
      ok: false,
      message: `Number of players must be an integer between 1 and ${MAX_PLAYERS}.`,
    };
  }
  if (providedNames.length > requestedCount) {
    return {
      ok: false,
      message: `You entered ${providedNames.length} names but player count is ${requestedCount}. Increase player count or remove names.`,
    };
  }
  if (!Number.isInteger(zombieCount) || zombieCount < 1 || zombieCount > MAX_ZOMBIES) {
    return {
      ok: false,
      message: `Zombie Leaders must be an integer between 1 and ${MAX_ZOMBIES}.`,
    };
  }
  if (zombieCount >= requestedCount) {
    return {
      ok: false,
      message: "Zombie Leaders must be fewer than total number of players.",
    };
  }
  const citizenSlots = requestedCount - zombieCount;
  const selectedRoleSlots = expandedRoleCount(selectedRoles);
  if (selectedRoleSlots > citizenSlots) {
    return {
      ok: false,
      message: `You selected ${selectedRoleSlots} special-role slot(s), but only ${citizenSlots} citizen slot(s) are available. Deselect some roles, reduce Zombie Leaders, or add more players.`,
    };
  }
  return { ok: true };
}

function expandedRoleCount(roles) {
  return roles.reduce((sum, role) => {
    const copies = Number.isInteger(role.count) && role.count > 0 ? role.count : 1;
    return sum + copies;
  }, 0);
}

function buildPlayersForGame(providedNames, requestedCount) {
  const players = [...providedNames];
  const existing = new Set(players.map((name) => name.toLowerCase()));
  let nextNumber = 1;
  while (players.length < requestedCount) {
    const candidate = `Player ${nextNumber}`;
    nextNumber += 1;
    if (existing.has(candidate.toLowerCase())) continue;
    players.push(candidate);
    existing.add(candidate.toLowerCase());
  }

  if (!providedNames.length) {
    return {
      players,
      note: `Auto-created ${requestedCount} placeholder names (Player 1..${requestedCount}).`,
    };
  }
  if (providedNames.length < requestedCount) {
    const added = requestedCount - providedNames.length;
    return {
      players,
      note: `Added ${added} placeholder name${added === 1 ? "" : "s"} to match player count.`,
    };
  }
  return {
    players,
    note: "Using provided player names only.",
  };
}

function buildAssignments(players, zombieCount, selectedRoles) {
  const shuffledPlayers = shuffle(players);
  const zombieNames = shuffledPlayers.slice(0, zombieCount);
  const citizenNames = shuffledPlayers.slice(zombieCount);

  const rolePool = shuffle(
    selectedRoles.flatMap((role) => {
      const copies = Number.isInteger(role.count) && role.count > 0 ? role.count : 1;
      return Array.from({ length: copies }, () => role);
    })
  );
  const citizenAssignments = citizenNames.map((name, index) => {
    const role = rolePool[index] || BASE_CITIZEN_ROLE;
    return {
      player: name,
      team: "citizen",
      role,
      allies: [],
    };
  });

  const zombieAssignments = zombieNames.map((name) => {
    return {
      player: name,
      team: "zombie",
      role: {
        id: "zombie-leader",
        name: "Zombie Leader",
        summary: "Work together at night to eliminate citizens without revealing your identity.",
      },
      allies: zombieNames.filter((z) => z !== name),
    };
  });

  const allAssignments = [...zombieAssignments, ...citizenAssignments];

  // Preserve the original player order for easier card handout.
  return players.map((name) => allAssignments.find((entry) => entry.player === name)).filter(Boolean);
}

function buildScripts(assignments, activeRoles) {
  const roleIds = new Set(activeRoles.map((role) => role.id));

  const orientation = [
    SCRIPT_TEXT.orientation[0],
    SCRIPT_TEXT.orientation[1],
    SCRIPT_TEXT.orientation[2],
  ];

  const orientationRoleLines = [];
  if (roleIds.has("office-manager")) {
    orientationRoleLines.push(
      "We have a great Integrity Officer, who can view one person's CV each morning to see if they are a Zombie Leader."
    );
  }
  if (roleIds.has("hr-lead")) {
    orientationRoleLines.push(
      "We also have a great Personnel Manager who can identify one person every day that they will protect from attack by the Zombie Leaders (but note that they must choose a different person every day)."
    );
  }
  if (roleIds.has("it-specialist")) {
    orientationRoleLines.push(
      "We have a very cluey IT Specialist who can hack the IT system twice in the course of the game — once to get rid of someone they suspect of being a Zombie Leader; once to save someone they want to protect from the Zombie Leaders."
    );
  }
  if (roleIds.has("office-matchmaker")) {
    orientationRoleLines.push(
      "We have a Matchmaker who is keen to cultivate office romance and who is going to weave their magic to make two members of HDC fall in love. However, this means that if one of these two Lovers leaves the organization (for whatever reason) the other will too. …."
    );
  }
  if (roleIds.has("union-rep")) {
    orientationRoleLines.push(
      "Defending everyone’s rights, we also have some Union Reps. They will be known to each other and will act in solidarity to defend us from the Zombie Leaders. However, because the Zombie Leaders are very vindictive, if the Union Reps ever reveal — or even hint at —their identity they will be instantly dismissed. And if anyone else hints at the Union Reps’ identity they too will be fired."
    );
  }
  if (roleIds.has("training-supervisor")) {
    orientationRoleLines.push(
      "We also have a very enthusiastic Training Supervisor. They take their job seriously and every day will be send one person off to complete mandatory training. There are a range of courses that people will be completing — covering everything from Managing Conflicts of Interest and Respectful Relationships in the Workplace to Fire Safety. These courses were mandated by the Zombie Leaders, but, as you’ll discover, they don’t pay much attention to them themselves."
    );
  }
  if (roleIds.has("schosshundchen")) {
    orientationRoleLines.push(
      "There is also one member of HDC who is the Schoßhündchen (the Boss’s Pet). They are protected by one of the non-zombie senior managers, and this means that they will not lose their position the first time that the Zombie Leaders target them."
    );
  }
  if (roleIds.has("intern")) {
    orientationRoleLines.push(
      "Happily, we also have an Intern. Every day they can, if they want, decide to spend time with a Mentor of their choosing. This means that if they are targeted by the Zombie Leaders that night, they won’t be terminated. However, if their mentor is terminated, the intern will be terminated along with them."
    );
  }
  if (roleIds.has("office-gossip")) {
    orientationRoleLines.push(
      "We also have a very enthusiastic Office Gossip. They have the dirt on everybody and if they are targeted by the Zombie Leaders they will not necessarily go quietly — and can take someone down with them in retaliation if they so desire."
    );
  }
  if (roleIds.has("social-club-organizer")) {
    orientationRoleLines.push(
      "In light of the increasing job demands that the Zombie Leaders are placing on us, we are also lucky to have a Social Club Organizer. In a round of their choosing they can set up a social club for themselves and up to three other people in HDC. Due to the well-evidenced socially curative effects of group memberships, this protects them all from being harmed by the Zombie Leaders in that round."
    );
  }

  if (orientationRoleLines.length) {
    orientation.push(...orientationRoleLines);
  }
  orientation.push(SCRIPT_TEXT.orientation[3]);
  orientation.push(SCRIPT_TEXT.orientation[4]);

  const intro = [
    SCRIPT_TEXT.intro[0],
    SCRIPT_PAUSE_2S_MARKER,
    SCRIPT_TEXT.intro[1],
    SCRIPT_PAUSE_2S_MARKER,
    SCRIPT_TEXT.intro[2],
    SCRIPT_PAUSE_MARKER,
  ];
  if (roleIds.has("sycophant")) {
    intro.push(SCRIPT_TEXT.intro[3]);
    intro.push(SCRIPT_PAUSE_2S_MARKER);
    intro.push(SCRIPT_TEXT.intro[4]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("office-manager")) {
    intro.push(SCRIPT_TEXT.intro[5]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("hr-lead")) {
    intro.push(SCRIPT_TEXT.intro[6]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("it-specialist")) {
    intro.push(SCRIPT_TEXT.intro[7]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("training-supervisor")) {
    intro.push(SCRIPT_TEXT.intro[8]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("schosshundchen")) {
    intro.push(SCRIPT_TEXT.intro[9]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("social-club-organizer")) {
    intro.push(SCRIPT_TEXT.intro[10]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("office-gossip")) {
    intro.push(SCRIPT_TEXT.intro[11]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("intern")) {
    intro.push("Now could the Intern open your eyes and look at me please. Thank you and good luck. Please close your eyes.");
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("office-matchmaker")) {
    intro.push(SCRIPT_TEXT.intro[12]);
    intro.push(SCRIPT_PAUSE_MARKER);
    intro.push(SCRIPT_TEXT.intro[13]);
    intro.push(SCRIPT_PAUSE_2S_MARKER);
    intro.push(SCRIPT_TEXT.intro[14]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  if (roleIds.has("union-rep")) {
    intro.push(SCRIPT_TEXT.intro[15]);
    intro.push(SCRIPT_PAUSE_MARKER);
  }
  intro.push(SCRIPT_TEXT.intro[16]);
  intro.push(SCRIPT_PAUSE_MARKER);
  intro.push(SCRIPT_TEXT.intro[17]);
  intro.push(SCRIPT_TEXT.intro[18]);
  intro.push(SCRIPT_TEXT.intro[19]);

  const day = [SCRIPT_TEXT.day[0]];
  const hasDayRoleActions =
    roleIds.has("office-manager") ||
    roleIds.has("hr-lead") ||
    roleIds.has("it-specialist");

  if (hasDayRoleActions) {
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[1]);
  }
  if (roleIds.has("office-manager")) {
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[2]);
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[3]);
  }
  if (roleIds.has("hr-lead")) {
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[4]);
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[5]);
  }
  if (roleIds.has("it-specialist")) {
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[6]);
    day.push(SCRIPT_PAUSE_MARKER);
    day.push(SCRIPT_TEXT.day[7]);
  }

  const night = [SCRIPT_TEXT.night[0]];
  if (roleIds.has("training-supervisor")) {
    night.push(SCRIPT_TEXT.night[1]);
    night.push(SCRIPT_PAUSE_MARKER);
    night.push(SCRIPT_TEXT.night[2]);
  }
  if (roleIds.has("social-club-organizer")) {
    night.push(SCRIPT_TEXT.night[3]);
    night.push(SCRIPT_PAUSE_MARKER);
    night.push(SCRIPT_TEXT.night[4]);
  }
  if (roleIds.has("office-gossip")) {
    night.push(SCRIPT_TEXT.night[5]);
    night.push(SCRIPT_PAUSE_MARKER);
    night.push(SCRIPT_TEXT.night[6]);
  }
  if (roleIds.has("intern")) {
    night.push(SCRIPT_TEXT.night[7]);
    night.push(SCRIPT_PAUSE_MARKER);
    night.push(SCRIPT_TEXT.night[8]);
  }
  night.push(SCRIPT_TEXT.night[9]);
  night.push(SCRIPT_TEXT.night[10]);
  night.push(SCRIPT_TEXT.night[11]);
  night.push(SCRIPT_TEXT.night[12]);
  night.push(SCRIPT_PAUSE_MARKER);
  night.push(SCRIPT_TEXT.night[13]);
  night.push(SCRIPT_TEXT.night[14]);

  return { orientation, intro, day, night };
}

function buildFallbackScripts() {
  return buildScripts([], []);
}

function renderSummary() {
  const players = state.assignments.length;
  const zombies = state.assignments.filter((a) => a.team === "zombie").length;
  const citizens = players - zombies;
  const roles = state.activeRoles.length;

  dom.gameSummary.innerHTML = `
    <span class="pill">Players: ${players}</span>
    <span class="pill">Zombie Leaders: ${zombies}</span>
    <span class="pill">Citizens: ${citizens}</span>
    <span class="pill">Special Roles Active: ${roles}</span>
  `;
}

function displayPlayerName(entry, index) {
  const raw = String(entry?.player ?? "").trim();
  return raw || `Player ${index + 1}`;
}

function setAssignmentPlayerName(index, rawName, normalize = false) {
  const entry = state.assignments[index];
  if (!entry) return;
  const next = String(rawName ?? "");
  if (!normalize) {
    entry.player = next;
    return;
  }
  const trimmed = next.trim();
  entry.player = trimmed || `Player ${index + 1}`;
}

function zombieAlliesText(index) {
  const entry = state.assignments[index];
  if (!entry || entry.team !== "zombie") return "No allies";
  const allies = state.assignments
    .map((assignment, assignmentIndex) => ({ assignment, assignmentIndex }))
    .filter(
      ({ assignment, assignmentIndex }) =>
        assignment.team === "zombie" && assignmentIndex !== index
    )
    .map(({ assignment, assignmentIndex }) =>
      displayPlayerName(assignment, assignmentIndex)
    );
  return allies.length ? naturalList(allies) : "No allies";
}

function unionAlliesText(index) {
  const entry = state.assignments[index];
  if (!entry || entry.role?.id !== "union-rep") return "No allies";
  const allies = state.assignments
    .map((assignment, assignmentIndex) => ({ assignment, assignmentIndex }))
    .filter(
      ({ assignment, assignmentIndex }) =>
        assignment.role?.id === "union-rep" && assignmentIndex !== index
    )
    .map(({ assignment, assignmentIndex }) =>
      displayPlayerName(assignment, assignmentIndex)
    );
  return allies.length ? naturalList(allies) : "No allies";
}

function refreshCardAllyText() {
  dom.cardsGrid.querySelectorAll("[data-zombie-allies-for]").forEach((line) => {
    const index = Number(line.getAttribute("data-zombie-allies-for"));
    const textNode = line.querySelector("[data-zombie-allies-text]");
    if (!textNode || Number.isNaN(index)) return;
    textNode.textContent = zombieAlliesText(index);
  });
  dom.cardsGrid.querySelectorAll("[data-union-allies-for]").forEach((line) => {
    const index = Number(line.getAttribute("data-union-allies-for"));
    const textNode = line.querySelector("[data-union-allies-text]");
    if (!textNode || Number.isNaN(index)) return;
    textNode.textContent = unionAlliesText(index);
  });
}

function renderCards() {
  const html = state.assignments
    .map((entry, index) => {
      const visibleName = displayPlayerName(entry, index);
      const cardVariantSeed = hashString(`${visibleName}|${entry.role.id}`);
      const cardClassNames = [
        "card",
        entry.team === "zombie" ? "card-zombie" : "card-citizen",
        entry.role.id === "sycophant" ? "card-sycophant" : "",
      ].filter(Boolean).join(" ");
      return `
        <article class="${cardClassNames}" data-index="${index}">
          <div class="card-header">
            <div class="card-header-main">
              ${renderHiddenThumb("card-thumb card-thumb-hidden")}
              ${renderRoleThumb(entry.role.id, {
                team: entry.team,
                label: entry.role.name,
                className: "card-thumb card-thumb-revealed",
                variantSeed: cardVariantSeed,
              })}
              <input
                type="text"
                class="card-name-input"
                data-action="edit-name"
                data-index="${index}"
                value="${escapeHtml(visibleName)}"
                placeholder="Player ${index + 1}"
                aria-label="Player name for card ${index + 1}"
              >
            </div>
            <span class="badge hidden">Hidden</span>
          </div>
          <div class="card-details">
            <p class="card-role-line">
              <strong>Role:</strong>
              <span>${escapeHtml(entry.role.name)}</span>
            </p>
            <p>${escapeHtml(entry.role.summary)}</p>
            ${
              entry.team === "zombie"
                ? `<p data-zombie-allies-for="${index}">
                    <strong>Zombie Allies:</strong>
                    <span data-zombie-allies-text>${escapeHtml(zombieAlliesText(index))}</span>
                  </p>`
                : ""
            }
            ${
              entry.role.id === "union-rep"
                ? `<p data-union-allies-for="${index}">
                    <strong>Union Allies:</strong>
                    <span data-union-allies-text>${escapeHtml(unionAlliesText(index))}</span>
                  </p>`
                : ""
            }
          </div>
          <div class="card-actions">
            <button type="button" data-action="toggle">Reveal</button>
          </div>
        </article>
      `;
    })
    .join("");
  dom.cardsGrid.innerHTML = html;

  dom.cardsGrid.querySelectorAll('[data-action="toggle"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.currentTarget.closest(".card");
      if (!card) return;
      toggleCard(card);
    });
  });

  dom.cardsGrid.querySelectorAll('[data-action="edit-name"]').forEach((input) => {
    input.addEventListener("input", (event) => {
      const field = event.currentTarget;
      const index = Number(field.dataset.index);
      if (Number.isNaN(index)) return;
      setAssignmentPlayerName(index, field.value, false);
      refreshCardAllyText();
    });
    input.addEventListener("blur", (event) => {
      const field = event.currentTarget;
      const index = Number(field.dataset.index);
      if (Number.isNaN(index)) return;
      setAssignmentPlayerName(index, field.value, true);
      field.value = state.assignments[index]?.player || "";
      refreshCardAllyText();
    });
  });
}

function toggleCard(card) {
  const isRevealed = card.classList.toggle("revealed");
  const badge = card.querySelector(".badge");
  const toggleButton = card.querySelector('[data-action="toggle"]');
  const index = Number(card.dataset.index);
  const entry = state.assignments[index];

  if (!entry || !badge || !toggleButton) return;

  if (isRevealed) {
    badge.className = `badge ${entry.team}`;
    badge.textContent = entry.team === "zombie" ? "Zombie" : "Citizen";
    toggleButton.textContent = "Hide";
  } else {
    badge.className = "badge hidden";
    badge.textContent = "Hidden";
    toggleButton.textContent = "Reveal";
  }
}

function hideAllCards() {
  dom.cardsGrid.querySelectorAll(".card.revealed").forEach((card) => {
    card.classList.remove("revealed");
    const badge = card.querySelector(".badge");
    const button = card.querySelector('[data-action="toggle"]');
    if (badge) {
      badge.className = "badge hidden";
      badge.textContent = "Hidden";
    }
    if (button) {
      button.textContent = "Reveal";
    }
  });
}

function revealAllCards() {
  dom.cardsGrid.querySelectorAll(".card").forEach((card) => {
    card.classList.add("revealed");
    const badge = card.querySelector(".badge");
    const button = card.querySelector('[data-action="toggle"]');
    const index = Number(card.dataset.index);
    const entry = state.assignments[index];

    if (badge && entry) {
      badge.className = `badge ${entry.team}`;
      badge.textContent = entry.team === "zombie" ? "Zombie" : "Citizen";
    }
    if (button) {
      button.textContent = "Hide";
    }
  });
}

function populateVoiceList() {
  if (!window.speechSynthesis) {
    state.voices = [];
    state.voiceMap = new Map();
    if (!isVoiceOptionAvailable(selectedVoiceOption())) {
      const firstAvailable = VOICE_OPTIONS.find((option) => isVoiceOptionAvailable(option));
      if (firstAvailable) {
        state.selectedVoiceId = firstAvailable.id;
      }
    }
    renderVoiceChoices();
    renderTimerVoiceChoices();
    syncScriptPlaybackUI();
    return;
  }

  const allVoices = window.speechSynthesis.getVoices();
  state.voices = allVoices;

  if (!allVoices.length) {
    state.voiceMap = new Map();
    renderVoiceChoices();
    renderTimerVoiceChoices();
    syncScriptPlaybackUI();
    return;
  }

  state.voiceMap = new Map();
  VOICE_OPTIONS.filter((option) => option.kind === "local").forEach((option) => {
    const bestMatch = findVoiceForOption(option, allVoices);
    if (bestMatch) {
      state.voiceMap.set(option.id, bestMatch);
    }
  });

  if (!isVoiceOptionAvailable(selectedVoiceOption())) {
    const firstAvailable = VOICE_OPTIONS.find((option) => isVoiceOptionAvailable(option));
    state.selectedVoiceId = firstAvailable ? firstAvailable.id : VOICE_OPTIONS[0].id;
  }

  renderVoiceChoices();
  renderTimerVoiceChoices();
  syncScriptPlaybackUI();
}

function selectedVoiceOption() {
  return VOICE_OPTIONS.find((option) => option.id === state.selectedVoiceId) || VOICE_OPTIONS[0];
}

function selectedLocalVoice() {
  const option = selectedVoiceOption();
  if (option.kind !== "local") return null;
  return state.voiceMap.get(option.id) || null;
}

function findVoiceForOption(option, voices) {
  const exactMatches = voices.filter((voice) => option.matcher.test(voice.name || ""));
  if (exactMatches.length) {
    return sortVoicesByQuality(exactMatches)[0];
  }

  const fallbackMatches = voices.filter((voice) => {
    const name = voice.name || "";
    const lang = normalizeLang(voice.lang);
    return Boolean(option.fallbackMatcher?.test(name) && option.langMatcher?.test(lang));
  });

  if (fallbackMatches.length) {
    return sortVoicesByQuality(fallbackMatches)[0];
  }

  return null;
}

function sortVoicesByQuality(voices) {
  return [...voices].sort((a, b) => getVoiceScore(a) - getVoiceScore(b));
}

function getVoiceScore(voice) {
  const lang = normalizeLang(voice.lang);
  const preferredLangIndex = PREFERRED_ENGLISH_LANGS.indexOf(lang);
  const langPenalty = preferredLangIndex === -1 ? 40 : preferredLangIndex * 3;
  const localPenalty = voice.localService ? 0 : 100;
  const defaultBonus = voice.default ? -10 : 0;
  const namePenalty = voice.name ? voice.name.toLowerCase().charCodeAt(0) : 0;
  return localPenalty + langPenalty + defaultBonus + namePenalty;
}

function pickBestVoice(voices) {
  if (!voices.length) return null;
  const danielVoice = voices.find((voice) => /\bdaniel\b/i.test(voice.name || ""));
  if (danielVoice) return danielVoice;
  return sortVoicesByQuality(voices)[0];
}

function renderVoiceChoices() {
  [dom.voiceChoices, dom.lessonsVoiceChoices].forEach((container) => {
    renderVoiceChoiceGroup(container);
  });

  if (dom.testVoice) {
    dom.testVoice.disabled = !isSelectedVoiceAvailable();
  }
}

function renderVoiceChoiceGroup(container) {
  if (!container) return;
  container.innerHTML = VOICE_OPTIONS.map((option) => {
    const isAvailable = isVoiceOptionAvailable(option);
    const isActive = option.id === state.selectedVoiceId && isAvailable;
    const meta = getVoiceOptionMeta(option);
    return `
      <button
        type="button"
        class="voice-choice${isActive ? " active" : ""}${isAvailable ? "" : " unavailable"}"
        data-action="select-voice"
        data-voice-id="${option.id}"
        aria-pressed="${isActive ? "true" : "false"}"
      >
        <span class="voice-choice-thumb">
          <img class="voice-choice-image" src="${escapeHtml(encodeURI(option.image))}" alt="">
        </span>
        <span class="voice-choice-copy">
          <span class="voice-choice-name">${escapeHtml(option.name)}</span>
          <span class="voice-choice-meta">${escapeHtml(meta)}</span>
        </span>
      </button>
    `;
  }).join("");

  container.querySelectorAll('[data-action="select-voice"]').forEach((button) => {
    button.addEventListener("click", () => {
      const voiceId = button.dataset.voiceId;
      const option = VOICE_OPTIONS.find((entry) => entry.id === voiceId);
      if (!option) return;
      if (!isVoiceOptionAvailable(option)) {
        setAudioStatus(`${option.name} is not ready yet. ${getVoiceUnavailableReason(option)}`, true);
        return;
      }
      state.selectedVoiceId = voiceId;
      renderVoiceChoices();
      syncScriptPlaybackUI();
      setAudioStatus(`${option.name} selected.`);
    });
  });
}

function isVoiceOptionAvailable(option) {
  return Boolean(option && state.voiceMap.has(option.id));
}

function isSelectedVoiceAvailable() {
  return isVoiceOptionAvailable(selectedVoiceOption());
}

function getVoiceOptionMeta(option) {
  if (!option) return "";
  const voice = state.voiceMap.get(option.id);
  if (!voice) return "Unavailable on this device";
  return `${voice.lang || "en"}`;
}

function getVoiceUnavailableReason(option) {
  if (!option) return "Select a voice first.";
  return "That voice is not available on this computer.";
}

function getVoiceKey(voice) {
  return [voice.voiceURI || "", voice.name || "", voice.lang || ""].join("|");
}

function normalizeLang(lang) {
  return String(lang || "").replace("_", "-");
}

function updateVoiceControlReadouts() {
  const speed = clamp(Number(dom.voiceRate?.value ?? dom.lessonsVoiceRate?.value ?? 1), 0.6, 1.8);
  if (dom.voiceRate) dom.voiceRate.value = String(speed);
  if (dom.lessonsVoiceRate) dom.lessonsVoiceRate.value = String(speed);
  const speedText = `${speed.toFixed(2)}x`;
  if (dom.voiceRateValue) dom.voiceRateValue.textContent = speedText;
  if (dom.lessonsVoiceRateValue) dom.lessonsVoiceRateValue.textContent = speedText;

  const volumePercent = clamp(
    Number(dom.voiceVolume?.value ?? dom.lessonsVoiceVolume?.value ?? 100),
    0,
    100
  );
  if (dom.voiceVolume) dom.voiceVolume.value = String(volumePercent);
  if (dom.lessonsVoiceVolume) dom.lessonsVoiceVolume.value = String(volumePercent);
  const ratio = clamp(volumePercent / 100, 0, 1);
  state.narrationVolumeRatio = ratio;
  const volumeText = `${Math.round(ratio * 100)}%`;
  if (dom.voiceVolumeValue) dom.voiceVolumeValue.textContent = volumeText;
  if (dom.lessonsVoiceVolumeValue) dom.lessonsVoiceVolumeValue.textContent = volumeText;
}

function handleVoiceRateInput(event) {
  const nextValue = clamp(Number(event.currentTarget?.value ?? 1), 0.6, 1.8);
  if (dom.voiceRate) dom.voiceRate.value = String(nextValue);
  if (dom.lessonsVoiceRate) dom.lessonsVoiceRate.value = String(nextValue);
  updateVoiceControlReadouts();
}

function handleVoiceVolumeInput(event) {
  const nextValue = clamp(Number(event.currentTarget?.value ?? 100), 0, 100);
  if (dom.voiceVolume) dom.voiceVolume.value = String(nextValue);
  if (dom.lessonsVoiceVolume) dom.lessonsVoiceVolume.value = String(nextValue);
  updateVoiceControlReadouts();
}

function handleTestVoice() {
  const sample = [
    "Voice test for Zombie Leaders.",
    "This is the current voice and speed setting.",
  ];
  speakLines(sample, { label: "Voice test" });
}

function getPanelLines(type) {
  if (LESSON_TYPES.includes(type)) {
    return buildLessonSpeechLines(LESSON_TEXT[type] || []);
  }
  return state.scripts[type] || [];
}

function getPanelDisplayLines(type) {
  if (type === "orientation" && !dom.orientationEnabled.checked) {
    return ["Orientation disabled for this session."];
  }
  if (LESSON_TYPES.includes(type)) {
    return LESSON_TEXT[type] || [];
  }
  return getPanelLines(type);
}

function buildLessonSpeechLines(lines = []) {
  return lines.flatMap((line) => splitSpeechChunks(line));
}

function splitSpeechChunks(text) {
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const sentenceChunks = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentenceChunks.flatMap((chunk) => splitLongSpeechChunk(chunk));
}

function splitLongSpeechChunk(chunk) {
  const cleaned = String(chunk || "").trim();
  if (!cleaned) return [];
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length <= 18) return [cleaned];

  const clauseChunks = cleaned.split(/(?<=[,;:—])\s+/).filter(Boolean);
  if (clauseChunks.length > 1) {
    return clauseChunks.flatMap((part) => splitLongSpeechChunk(part));
  }

  const midpoint = Math.ceil(words.length / 2);
  return [
    words.slice(0, midpoint).join(" "),
    words.slice(midpoint).join(" "),
  ].filter(Boolean);
}

function playScript(type) {
  if (state.scriptPendingResume?.type === type) {
    resumeScriptFromPending(type);
    return;
  }

  if (type === "orientation" && !dom.orientationEnabled.checked) {
    setAudioStatus("Orientation is optional and currently disabled.", true);
    return;
  }

  const lines = getPanelLines(type);
  if (!lines || !lines.length) {
    setAudioStatus("No narration available for this item.", true);
    return;
  }

  const fullSegments = buildSpeechSegments(lines);
  speakLines(lines, {
    label: SCRIPT_LABELS[type] || "Script",
    scriptType: type,
    fullLines: lines,
    fullSegments,
    startSegmentIndex: 0,
  });
}

function speakLines(lines, options = {}) {
  const voiceOption = selectedVoiceOption();
  if (!isVoiceOptionAvailable(voiceOption)) {
    setAudioStatus(`${voiceOption.name} is not ready yet. ${getVoiceUnavailableReason(voiceOption)}`, true);
    return;
  }

  if (!window.speechSynthesis) {
    setAudioStatus("Speech synthesis is not supported in this browser.", true);
    return;
  }
  speakLinesWithLocalVoice(lines, options, voiceOption);
}

function speakLinesWithLocalVoice(lines, options = {}, voiceOption) {
  stopSpeech();
  const {
    label = "Voice",
    scriptType = null,
    fullLines = lines,
    fullSegments = buildSpeechSegments(fullLines),
    startSegmentIndex = 0,
  } = options;
  const sessionId = state.speechSessionId;
  let chosenVoice = selectedLocalVoice();
  let chosenVoiceId = voiceOption.id;
  const rate = Number(dom.voiceRate.value);
  const segmentsToSpeak = fullSegments.slice(startSegmentIndex);
  let currentSegment = 0;
  let useFallbackVoice = false;
  const isCurrentSession = () => state.speechSessionId === sessionId;
  if (scriptType) {
    startScriptPlayback(scriptType, fullLines, fullSegments, rate, sessionId);
  }

  const speakNext = () => {
    if (!isCurrentSession()) return;

    if (currentSegment >= segmentsToSpeak.length) {
      finishScriptPlayback(sessionId, true);
      setAudioStatus(`${label} complete.`);
      return;
    }

    const fullSegmentIndex = startSegmentIndex + currentSegment;
    const currentSegmentData = segmentsToSpeak[currentSegment];
    const currentText = currentSegmentData.text;
    if (currentText === SCRIPT_PAUSE_MARKER) {
      pauseScriptAtCue(sessionId, fullLines, fullSegments, fullSegmentIndex + 1);
      setAudioStatus(`${label} paused at cue. Press Resume to continue.`);
      return;
    }
    if (currentText === SCRIPT_PAUSE_2S_MARKER) {
      markScriptPlaybackLineStart(sessionId, fullSegmentIndex);
      setAudioStatus(`${label}: pausing for 2 seconds.`);
      window.setTimeout(() => {
        if (!isCurrentSession()) return;
        markScriptPlaybackLineEnd(sessionId, fullSegmentIndex);
        currentSegment += 1;
        speakNext();
      }, 2000);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentText);
    if (chosenVoice && !useFallbackVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang || "en-AU";
    } else if (chosenVoice?.lang) {
      utterance.lang = chosenVoice.lang;
    } else {
      utterance.lang = "en-AU";
    }

    utterance.rate = rate;
    utterance.volume = clamp(state.narrationVolumeRatio, 0, 1);
    utterance.onstart = () => {
      if (!isCurrentSession()) return;
      markScriptPlaybackLineStart(sessionId, fullSegmentIndex);
      setAudioStatus(`${label} currently playing.`);
    };
    utterance.onpause = () => {
      if (!isCurrentSession()) return;
      pauseScriptPlayback(sessionId);
    };
    utterance.onresume = () => {
      if (!isCurrentSession()) return;
      resumeScriptPlayback(sessionId);
    };
    utterance.onerror = (event) => {
      if (!isCurrentSession()) return;

      const errorName = String(event?.error || "unknown").toLowerCase();
      if (errorName === "interrupted" || errorName === "canceled" || errorName === "cancelled") {
        return;
      }

      if (chosenVoice && !useFallbackVoice) {
        const fallbackOption = VOICE_OPTIONS.find(
          (option) => option.kind === "local" && option.id !== chosenVoiceId && state.voiceMap.has(option.id)
        );
        if (fallbackOption) {
          useFallbackVoice = true;
          chosenVoiceId = fallbackOption.id;
          chosenVoice = state.voiceMap.get(fallbackOption.id) || null;
          state.selectedVoiceId = chosenVoiceId;
          renderVoiceChoices();
          setAudioStatus(
            `Selected voice failed (${errorName}). Switching to ${fallbackOption.name}.`,
            true
          );
          window.setTimeout(speakNext, 25);
          return;
        }

        finishScriptPlayback(sessionId, false);
        setAudioStatus(`Selected voice failed (${errorName}).`, true);
        return;
      }
      finishScriptPlayback(sessionId, false);
      setAudioStatus(`Speech playback failed (${errorName}).`, true);
    };
    utterance.onend = () => {
      if (!isCurrentSession()) return;
      markScriptPlaybackLineEnd(sessionId, fullSegmentIndex);
      currentSegment += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  speakNext();
}

function stopSpeech() {
  clearScriptPlayback(false);
  state.speechSessionId += 1;
  if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
    window.speechSynthesis.cancel();
  }
}

function toggleScriptPause(type) {
  if (state.scriptPendingResume?.type === type) return;
  if (state.scriptPlayback?.type !== type) return;
  if (!window.speechSynthesis) return;

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    setAudioStatus(`${SCRIPT_LABELS[type] || "Script"} resumed.`);
    return;
  }

  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.pause();
    setAudioStatus(`${SCRIPT_LABELS[type] || "Script"} paused.`);
  }
}

function setScriptPlaybackControlsDisabled(disabled) {
  PANEL_TYPES.forEach((type) => {
    const panelDom = dom.scriptPanels[type];
    if (!panelDom) return;
    if (panelDom.playButton) panelDom.playButton.disabled = disabled;
    if (panelDom.pauseButton) panelDom.pauseButton.disabled = true;
  });
}

function startScriptPlayback(type, lines, fullSegments, rate, sessionId) {
  clearScriptPlayback(false);
  state.completedScriptPlayback = null;
  const timeline = buildScriptTimeline(fullSegments, rate);

  state.scriptPlayback = {
    type,
    label: SCRIPT_LABELS[type] || "Script",
    sessionId,
    fullLines: lines,
    fullSegments,
    rate,
    lineDurations: timeline.lineDurations,
    lineOffsets: timeline.lineOffsets,
    totalMs: timeline.totalMs,
    currentLine: -1,
    lineStartedAt: 0,
    pausedAt: 0,
    isPaused: false,
    timerId: 0,
    lastElapsedMs: 0,
  };

  state.scriptPlayback.timerId = window.setInterval(syncScriptPlaybackUI, 160);
  syncScriptPlaybackUI();
}

function pauseScriptAtCue(sessionId, fullLines, fullSegments, nextLineIndex) {
  const playback = getScriptPlayback(sessionId);
  if (!playback) return;
  const clampedNext = clamp(nextLineIndex, 0, fullSegments.length);
  const elapsedMs = playback.lineOffsets[clampedNext] || playback.totalMs || 0;
  setScriptResumePoint(playback.type, fullLines, fullSegments, playback.rate, clampedNext, elapsedMs, {
    reason: "cue",
    sessionId: playback.sessionId,
  });
}

function resumeScriptFromPending(type) {
  const pending = state.scriptPendingResume;
  if (!pending || pending.type !== type) return;
  const remainingLines = pending.fullSegments.slice(pending.nextLineIndex);
  state.scriptPendingResume = null;
  if (!remainingLines.length) {
    state.completedScriptPlayback = {
      type,
      totalMs: pending.elapsedMs,
      elapsedMs: pending.elapsedMs,
    };
    syncScriptPlaybackUI();
    setAudioStatus(`${SCRIPT_LABELS[type] || "Script"} complete.`);
    return;
  }
  speakLines(remainingLines, {
    label: pending.label,
    scriptType: type,
    fullLines: pending.fullLines,
    fullSegments: pending.fullSegments,
    startSegmentIndex: pending.nextLineIndex,
  });
}

function beginScriptScrub(type, event) {
  const panelDom = dom.scriptPanels[type];
  const fullLines = getPanelLines(type);
  if (!panelDom?.progressInput || !fullLines?.length || !window.speechSynthesis) return;
  if (type === "orientation" && !dom.orientationEnabled.checked) return;
  const initialValue = Number(panelDom.progressInput.value || 0);

  const hasQueuedSpeech = Boolean(
    window.speechSynthesis?.speaking ||
    window.speechSynthesis?.pending ||
    window.speechSynthesis?.paused
  );
  const currentlyActive = state.scriptPlayback?.type === type;
  const currentlyAwaitingRestart = state.scriptPendingResume?.type === type;
  const shouldResumeOnRelease =
    currentlyActive && !currentlyAwaitingRestart && !state.scriptPlayback?.isPaused &&
    Boolean(
      window.speechSynthesis?.speaking ||
      window.speechSynthesis?.pending
    );

  if (hasQueuedSpeech) {
    stopSpeech();
  }

  state.scriptScrub = {
    type,
    pointerId: event.pointerId,
    shouldResumeOnRelease,
  };
  panelDom.progressInput.value = String(initialValue);
  updateScriptScrub(type, { currentTarget: panelDom.progressInput });
}

function updateScriptScrub(type, event) {
  const panelDom = dom.scriptPanels[type];
  const fullLines = getPanelLines(type);
  if (!panelDom?.progressInput || !fullLines?.length) return;
  const value = Number(event.currentTarget?.value ?? panelDom.progressInput.value ?? 0);
  const max = Number(event.currentTarget?.max ?? panelDom.progressInput.max ?? 1000);
  const ratio = max > 0 ? clamp(value / max, 0, 1) : 0;
  const rate = Number(dom.voiceRate.value);
  const fullSegments = buildSpeechSegments(fullLines);
  const timeline = buildScriptTimeline(fullSegments, rate);
  const elapsedMs = Math.round(timeline.totalMs * ratio);
  const nextLineIndex = findSeekLineIndex(
    fullSegments,
    timeline.lineOffsets,
    timeline.lineDurations,
    elapsedMs
  );
  const snappedElapsed = timeline.lineOffsets[nextLineIndex] || timeline.totalMs || 0;
  setScriptResumePoint(type, fullLines, fullSegments, rate, nextLineIndex, snappedElapsed, {
    reason: "seek",
  });
}

function endScriptScrub(type) {
  if (state.scriptScrub?.type !== type) return;
  const shouldResume = Boolean(state.scriptScrub?.shouldResumeOnRelease);
  state.scriptScrub = null;
  if (shouldResume) {
    resumeScriptFromPending(type);
  }
}

function setScriptResumePoint(type, fullLines, fullSegments, rate, nextLineIndex, elapsedMs, options = {}) {
  const timeline = buildScriptTimeline(fullSegments, rate);
  const safeIndex = clamp(nextLineIndex, 0, fullSegments.length);
  const safeElapsed = clamp(elapsedMs, 0, timeline.totalMs);
  if (state.scriptPlayback?.timerId) {
    window.clearInterval(state.scriptPlayback.timerId);
  }

  state.completedScriptPlayback = null;
  state.scriptPlayback = {
    type,
    label: SCRIPT_LABELS[type] || "Script",
    sessionId: options.sessionId ?? state.speechSessionId,
    fullLines,
    fullSegments,
    rate,
    lineDurations: timeline.lineDurations,
    lineOffsets: timeline.lineOffsets,
    totalMs: timeline.totalMs,
    currentLine: Math.max(0, safeIndex - 1),
    lineStartedAt: 0,
    pausedAt: 0,
    isPaused: true,
    timerId: 0,
    lastElapsedMs: safeElapsed,
  };
  state.scriptPendingResume = {
    type,
    label: SCRIPT_LABELS[type] || "Script",
    fullLines,
    fullSegments,
    nextLineIndex: safeIndex,
    elapsedMs: safeElapsed,
    reason: options.reason || "seek",
  };
  syncScriptPlaybackUI();
}

function markScriptPlaybackLineStart(sessionId, lineIndex) {
  const playback = getScriptPlayback(sessionId);
  if (!playback) return;
  playback.currentLine = lineIndex;
  playback.lineStartedAt = performance.now();
  playback.pausedAt = 0;
  playback.isPaused = false;
  playback.lastElapsedMs = playback.lineOffsets[lineIndex] || 0;
  syncScriptPlaybackUI();
}

function markScriptPlaybackLineEnd(sessionId, lineIndex) {
  const playback = getScriptPlayback(sessionId);
  if (!playback) return;
  const lineOffset = playback.lineOffsets[lineIndex] || 0;
  const lineDuration = playback.lineDurations[lineIndex] || 0;
  playback.lastElapsedMs = lineOffset + lineDuration;
  syncScriptPlaybackUI();
}

function pauseScriptPlayback(sessionId) {
  const playback = getScriptPlayback(sessionId);
  if (!playback || playback.isPaused) return;
  playback.lastElapsedMs = getScriptPlaybackElapsedMs(playback);
  playback.isPaused = true;
  playback.pausedAt = performance.now();
  syncScriptPlaybackUI();
}

function resumeScriptPlayback(sessionId) {
  const playback = getScriptPlayback(sessionId);
  if (!playback || !playback.isPaused) return;
  if (playback.lineStartedAt && playback.pausedAt) {
    playback.lineStartedAt += performance.now() - playback.pausedAt;
  }
  playback.isPaused = false;
  playback.pausedAt = 0;
  syncScriptPlaybackUI();
}

function finishScriptPlayback(sessionId, completed = false) {
  const playback = getScriptPlayback(sessionId);
  if (!playback) return;
  if (playback.timerId) {
    window.clearInterval(playback.timerId);
    playback.timerId = 0;
  }
  playback.isPaused = false;
  playback.lastElapsedMs = completed ? playback.totalMs : getScriptPlaybackElapsedMs(playback);
  state.scriptPlayback = null;
  state.scriptPendingResume = null;
  state.completedScriptPlayback = completed
    ? {
        type: playback.type,
        totalMs: playback.totalMs,
        elapsedMs: playback.totalMs,
      }
    : null;
  syncScriptPlaybackUI();
}

function clearScriptPlayback(completed = false) {
  if (!state.scriptPlayback) {
    if (!completed) {
      state.completedScriptPlayback = null;
      syncScriptPlaybackUI();
    }
    return;
  }
  finishScriptPlayback(state.scriptPlayback.sessionId, completed);
}

function getScriptPlayback(sessionId = null) {
  if (!state.scriptPlayback) return null;
  if (sessionId != null && state.scriptPlayback.sessionId !== sessionId) return null;
  return state.scriptPlayback;
}

function getScriptPlaybackElapsedMs(playback) {
  if (!playback) return 0;
  if (playback.currentLine < 0 || !playback.lineStartedAt) {
    return clamp(playback.lastElapsedMs || 0, 0, playback.totalMs || 0);
  }
  const lineOffset = playback.lineOffsets[playback.currentLine] || 0;
  const lineDuration = playback.lineDurations[playback.currentLine] || 0;
  if (playback.isPaused) {
    return clamp(playback.lastElapsedMs || lineOffset, 0, playback.totalMs || 0);
  }
  const liveElapsed = performance.now() - playback.lineStartedAt;
  return clamp(lineOffset + Math.min(liveElapsed, lineDuration), 0, playback.totalMs || 0);
}

function syncScriptPlaybackUI() {
  const activePlayback = state.scriptPlayback;
  const pendingResume = state.scriptPendingResume;
  const completedPlayback = state.completedScriptPlayback;

  PANEL_TYPES.forEach((type) => {
    const panelDom = dom.scriptPanels[type];
    if (!panelDom?.panel) return;

    const hasSpeechSupport = isSelectedVoiceAvailable();
    const hasScript = Boolean(getPanelLines(type)?.length);
    const orientationDisabled = type === "orientation" && !dom.orientationEnabled.checked;
    const isActive = activePlayback?.type === type;
    const isPaused = isActive && activePlayback?.isPaused;
    const isAwaitingRestart = pendingResume?.type === type;
    const isCompleted = !isActive && completedPlayback?.type === type;

    panelDom.panel.classList.toggle("active", Boolean(isActive));
    panelDom.panel.classList.toggle("paused", Boolean(isPaused));

    if (panelDom.playButton) {
      panelDom.playButton.disabled = !hasSpeechSupport || !hasScript || orientationDisabled;
      const playButtonActive = Boolean(isAwaitingRestart || (isActive && !isPaused && !isAwaitingRestart));
      panelDom.playButton.classList.toggle("active", playButtonActive);
      panelDom.playButton.setAttribute("aria-pressed", playButtonActive ? "true" : "false");
      panelDom.playButton.innerHTML = isAwaitingRestart ? "&#9654; Resume" : "&#9654; Play";
    }

    if (panelDom.pauseButton) {
      panelDom.pauseButton.disabled = !isActive || isAwaitingRestart;
      panelDom.pauseButton.innerHTML = isPaused && !isAwaitingRestart ? "&#9654; Resume" : "&#9208; Pause";
      panelDom.pauseButton.classList.toggle("active", Boolean(isPaused && !isAwaitingRestart));
      panelDom.pauseButton.setAttribute(
        "aria-pressed",
        isPaused && !isAwaitingRestart ? "true" : "false"
      );
    }

    if (panelDom.progressInput) {
      panelDom.progressInput.disabled = !hasScript || orientationDisabled;
    }

    let progress = 0;
    let metaText = !hasScript
      ? "Generate a game to enable playback."
      : orientationDisabled
      ? "Orientation is disabled for this session."
      : "Ready to play.";

    if (isActive) {
      const elapsedMs = isAwaitingRestart
        ? pendingResume.elapsedMs
        : getScriptPlaybackElapsedMs(activePlayback);
      progress = activePlayback.totalMs ? elapsedMs / activePlayback.totalMs : 0;
      metaText = isAwaitingRestart
        ? pendingResume.reason === "cue"
          ? `Paused at cue ${formatDuration(elapsedMs)} / ${formatDuration(activePlayback.totalMs)}. Press Resume to continue.`
          : `Seeked to ${formatDuration(elapsedMs)} / ${formatDuration(activePlayback.totalMs)}. Press Resume to continue.`
        : `${isPaused ? "Paused" : "Playing"} ${formatDuration(elapsedMs)} / ${formatDuration(
            activePlayback.totalMs
          )}`;
    } else if (isCompleted) {
      progress = 1;
      metaText = `Complete ${formatDuration(completedPlayback.totalMs)}.`;
    }

    if (panelDom.progressInput) {
      const progressPct = clamp(progress, 0, 1) * 100;
      panelDom.progressInput.value = String(Math.round(progressPct * 10));
      panelDom.progressInput.style.setProperty("--progress-pct", `${progressPct}%`);
    }
    if (panelDom.progressMeta) {
      panelDom.progressMeta.textContent = metaText;
    }
  });
}

function estimateSpeechDurationMs(input, rate) {
  const text = typeof input === "string" ? input : input?.text;
  if (text === SCRIPT_PAUSE_MARKER) return 0;
  if (text === SCRIPT_PAUSE_2S_MARKER) return 2000;
  const safeRate = clamp(Number(rate) || 1, 0.6, 1.8);
  const wordCount = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  const sentencePauses = (String(text || "").match(/[.!?]/g) || []).length * 280;
  const clausePauses = (String(text || "").match(/[,:;—-]/g) || []).length * 110;
  const bracketPauses = (String(text || "").match(/[\[\]()]/g) || []).length * 60;
  const spokenMs = (wordCount / 170) * 60000;
  return Math.max(1200, (spokenMs + sentencePauses + clausePauses + bracketPauses + 220) / safeRate);
}

function buildSpeechSegments(lines = []) {
  const segments = [];
  lines.forEach((line, sourceLineIndex) => {
    if (line === SCRIPT_PAUSE_MARKER || line === SCRIPT_PAUSE_2S_MARKER) {
      segments.push({ text: SCRIPT_PAUSE_MARKER, sourceLineIndex });
      if (line === SCRIPT_PAUSE_2S_MARKER) {
        segments[segments.length - 1].text = SCRIPT_PAUSE_2S_MARKER;
      }
      return;
    }

    const parts = String(line || "")
      .split(/(?<=[.!?])\s+|(?<=;)\s+|(?<=:)\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (!parts.length) return;
    parts.forEach((part) => {
      segments.push({ text: part, sourceLineIndex });
    });
  });
  return segments;
}

function buildScriptTimeline(segments, rate) {
  const lineDurations = segments.map((segment) => estimateSpeechDurationMs(segment, rate));
  const lineOffsets = [];
  let totalMs = 0;
  lineDurations.forEach((duration) => {
    lineOffsets.push(totalMs);
    totalMs += duration;
  });
  return {
    lineDurations,
    lineOffsets,
    totalMs: Math.max(totalMs, 1000),
  };
}

function findSeekLineIndex(lines, lineOffsets, lineDurations, targetMs) {
  const safeTarget = Math.max(0, Number(targetMs) || 0);
  const spokenIndexes = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line?.text !== SCRIPT_PAUSE_MARKER && line?.text !== SCRIPT_PAUSE_2S_MARKER)
    .map(({ index }) => index);

  if (!spokenIndexes.length) return lines.length;

  for (let position = 0; position < spokenIndexes.length; position += 1) {
    const index = spokenIndexes[position];
    const start = lineOffsets[index] || 0;
    const nextIndex = spokenIndexes[position + 1];
    const nextStart =
      typeof nextIndex === "number"
        ? lineOffsets[nextIndex] || start
        : (lineOffsets[index] || 0) + (lineDurations[index] || 0);
    const midpoint = start + Math.max(0, nextStart - start) / 2;
    if (safeTarget <= midpoint) {
      if (lines[index]?.text === SCRIPT_PAUSE_MARKER || lines[index]?.text === SCRIPT_PAUSE_2S_MARKER) {
        return findNextSpokenLineIndex(lines, index + 1);
      }
      return index;
    }
  }
  return findNextSpokenLineIndex(lines, lines.length);
}

function findNextSpokenLineIndex(lines, startIndex = 0) {
  for (let index = Math.max(0, startIndex); index < lines.length; index += 1) {
    if (lines[index]?.text !== SCRIPT_PAUSE_MARKER && lines[index]?.text !== SCRIPT_PAUSE_2S_MARKER) return index;
  }
  return lines.length;
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.round(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function handlePlayNightAudio() {
  const preset = selectedAmbiencePreset();
  startNightAudio(preset);
}

function toggleNightAudioPause() {
  if (!state.nightAudio) {
    setAudioStatus("No background audio is currently playing.", true);
    return;
  }

  if (state.nightAudio.isPaused) {
    state.nightAudio.resume();
  } else {
    state.nightAudio.pause();
  }
}

function handleAmbienceChange() {
  if (!state.nightAudio) {
    updateNightAudioButton();
    return;
  }
  const preset = selectedAmbiencePreset();
  if (preset.id === state.nightAudio.preset?.id) {
    updateNightAudioButton();
    return;
  }
  startNightAudio(preset);
  setAudioStatus(`Background audio switched to "${preset.name}".`);
}

function selectedAmbiencePreset() {
  const id = dom.ambienceSelect?.value || DEFAULT_AMBIENCE_ID;
  return (
    AMBIENT_PRESETS.find((preset) => preset.id === id) ||
    AMBIENT_PRESETS.find((preset) => preset.id === DEFAULT_AMBIENCE_ID) ||
    AMBIENT_PRESETS[0]
  );
}

function updateBackgroundVolumeReadout() {
  if (!dom.backgroundVolume || !dom.backgroundVolumeValue) return;
  const ratio = clamp((Number(dom.backgroundVolume.value) || 0) / 100, 0, 1);
  state.backgroundVolumeRatio = ratio;
  dom.backgroundVolumeValue.textContent = `${Math.round(ratio * 100)}%`;
}

function applyBackgroundVolume(audioState) {
  if (!audioState) return;
  const baseGain = Number(audioState.baseGain) || 0;
  const nextVolume = clamp(baseGain * state.backgroundVolumeRatio, 0, 1);
  if (audioState.masterGain?.gain) {
    audioState.masterGain.gain.value = clamp(nextVolume, 0, 0.6);
  }
  if (audioState.audioElement) {
    audioState.audioElement.volume = nextVolume;
  }
}

function handleBackgroundVolumeInput() {
  updateBackgroundVolumeReadout();
  applyBackgroundVolume(state.nightAudio);
}

function canSeekNightAudio(audioState = state.nightAudio) {
  const duration = Number(audioState?.audioElement?.duration);
  return Boolean(audioState?.audioElement && Number.isFinite(duration) && duration > 0);
}

function beginNightAudioScrub(event) {
  if (!dom.backgroundAudioProgress) return;
  state.nightAudioScrub = { pointerId: event?.pointerId ?? null };
}

function handleNightAudioScrubInput(event) {
  updateNightAudioScrub(event, { commit: true });
}

function endNightAudioScrub(event) {
  if (!dom.backgroundAudioProgress) return;
  updateNightAudioScrub(event, { commit: true });
  state.nightAudioScrub = null;
  syncNightAudioUI();
}

function updateNightAudioScrub(event, options = {}) {
  const progressInput = dom.backgroundAudioProgress;
  if (!progressInput) return;

  const value = Number(event?.currentTarget?.value ?? progressInput.value ?? 0);
  const max = Number(event?.currentTarget?.max ?? progressInput.max ?? 1000);
  const ratio = max > 0 ? clamp(value / max, 0, 1) : 0;
  const progressPct = ratio * 100;
  progressInput.style.setProperty("--progress-pct", `${progressPct}%`);

  if (!options.commit || !state.nightAudio || !canSeekNightAudio(state.nightAudio)) {
    return;
  }

  const duration = Number(state.nightAudio.audioElement?.duration);
  const targetTime = clamp(duration * ratio, 0, duration);
  try {
    state.nightAudio.audioElement.currentTime = targetTime;
    state.nightAudio.elapsedBeforePauseMs = targetTime * 1000;
    if (!state.nightAudio.isPaused) {
      state.nightAudio.startedAt = performance.now();
    }
  } catch (_) {}
}

function startNightAudio(preset) {
  stopSpeech();
  stopNightAudio();

  if (preset?.audioSrc) {
    startRecordedNightAudio(preset);
    return;
  }

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    setAudioStatus("Web Audio API is not available in this browser.", true);
    return;
  }

  const context = new AudioContextCtor();
  const master = context.createGain();
  master.connect(context.destination);

  const engineCleanup = startAmbienceEngine(context, master, preset);
  const audioState = createNightAudioState(preset);
  audioState.baseGain = preset?.gain ?? 0.22;
  audioState.masterGain = master;
  applyBackgroundVolume(audioState);
  audioState.pause = () => {
    if (audioState.isPaused) return;
    audioState.elapsedBeforePauseMs = getNightAudioElapsedMs(audioState);
    audioState.isPaused = true;
    audioState.startedAt = 0;
    context.suspend().catch(() => {});
    updateNightAudioButton();
    syncNightAudioUI();
    setAudioStatus(`Background audio "${preset.name}" paused.`);
  };
  audioState.resume = () => {
    if (!audioState.isPaused) return;
    audioState.isPaused = false;
    audioState.startedAt = performance.now();
    context.resume().catch(() => {});
    updateNightAudioButton();
    syncNightAudioUI();
    setAudioStatus(`Background audio "${preset.name}" resumed.`);
  };
  audioState.stop = () => {
    clearNightAudioUi(audioState);
    try {
      engineCleanup();
    } catch (_) {}
    try {
      context.close();
    } catch (_) {}
  };

  state.nightAudio = audioState;
  armNightAudioUi(audioState);
  updateNightAudioButton();
  syncNightAudioUI();

  setAudioStatus(`Background audio "${preset.name}" playing continuously.`);
}

function startRecordedNightAudio(preset) {
  const audio = new Audio(preset.audioSrc);
  audio.loop = true;
  audio.preload = "auto";

  const audioState = createNightAudioState(preset);
  audioState.baseGain = preset?.gain ?? 0.55;
  audioState.audioElement = audio;
  applyBackgroundVolume(audioState);
  let isStopped = false;

  audioState.pause = () => {
    if (audioState.isPaused || isStopped) return;
    audioState.elapsedBeforePauseMs = getNightAudioElapsedMs(audioState);
    audioState.isPaused = true;
    audioState.startedAt = 0;
    try {
      audio.pause();
    } catch (_) {}
    updateNightAudioButton();
    syncNightAudioUI();
    setAudioStatus(`Background audio "${preset.name}" paused.`);
  };
  audioState.resume = () => {
    if (!audioState.isPaused || isStopped) return;
    audioState.isPaused = false;
    audioState.startedAt = performance.now();
    const playResult = audio.play();
    if (playResult && typeof playResult.catch === "function") {
      playResult.catch(handlePlaybackError);
    }
    updateNightAudioButton();
    syncNightAudioUI();
    setAudioStatus(`Background audio "${preset.name}" resumed.`);
  };
  audioState.stop = () => {
    if (isStopped) return;
    isStopped = true;
    clearNightAudioUi(audioState);
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    } catch (_) {}
  };

  state.nightAudio = audioState;
  armNightAudioUi(audioState);
  updateNightAudioButton();
  syncNightAudioUI();

  const handlePlaybackError = () => {
    if (state.nightAudio !== audioState) return;
    audioState.stop();
    state.nightAudio = null;
    updateNightAudioButton();
    syncNightAudioUI();
    setAudioStatus(`Unable to play background audio "${preset.name}".`, true);
  };

  audio.addEventListener("error", handlePlaybackError, { once: true });

  const playResult = audio.play();
  if (playResult && typeof playResult.then === "function") {
    playResult
      .then(() => {
        if (state.nightAudio !== audioState) return;
        setAudioStatus(`Background audio "${preset.name}" playing continuously.`);
      })
      .catch(handlePlaybackError);
    return;
  }

  setAudioStatus(`Background audio "${preset.name}" playing continuously.`);
}

function stopNightAudio() {
  if (!state.nightAudio) return;
  state.nightAudio.stop();
  state.nightAudio = null;
  updateNightAudioButton();
  syncNightAudioUI();
  setAudioStatus("Background audio stopped.");
}

function createNightAudioState(preset) {
  return {
    preset,
    startedAt: performance.now(),
    timerId: 0,
    uiTimerId: 0,
    elapsedBeforePauseMs: 0,
    baseGain: 0,
    masterGain: null,
    audioElement: null,
    isPaused: false,
    pause() {},
    resume() {},
    stop() {},
  };
}

function getNightAudioElapsedMs(audioState) {
  if (!audioState) return 0;
  const mediaDuration = Number(audioState.audioElement?.duration);
  const mediaCurrentTime = Number(audioState.audioElement?.currentTime);
  if (Number.isFinite(mediaDuration) && mediaDuration > 0 && Number.isFinite(mediaCurrentTime)) {
    return clamp(mediaCurrentTime * 1000, 0, mediaDuration * 1000);
  }
  if (audioState.isPaused || !audioState.startedAt) {
    return Math.max(0, audioState.elapsedBeforePauseMs || 0);
  }
  return Math.max(0, (audioState.elapsedBeforePauseMs || 0) + (performance.now() - audioState.startedAt));
}

function clearNightAudioUi(audioState) {
  if (audioState?.uiTimerId) {
    window.clearInterval(audioState.uiTimerId);
    audioState.uiTimerId = 0;
  }
}

function armNightAudioUi(audioState) {
  if (!audioState) return;
  clearNightAudioUi(audioState);
  syncNightAudioUI();
  audioState.uiTimerId = window.setInterval(syncNightAudioUI, 160);
}

function syncNightAudioUI() {
  const progressInput = dom.backgroundAudioProgress;
  const progressMeta = dom.backgroundAudioProgressMeta;
  if (!progressInput || !progressMeta) return;

  let progress = 0;
  let metaText = "Ready to play.";

  if (state.nightAudio) {
    const elapsedMs = getNightAudioElapsedMs(state.nightAudio);
    const mediaDuration = Number(state.nightAudio.audioElement?.duration);
    if (Number.isFinite(mediaDuration) && mediaDuration > 0) {
      const totalMs = mediaDuration * 1000;
      progress = totalMs ? elapsedMs / totalMs : 0;
      metaText = `${state.nightAudio.isPaused ? "Paused" : "Playing"} ${formatDuration(elapsedMs)} / ${formatDuration(totalMs)} (loops)`;
    } else {
      progress = 0;
      metaText = state.nightAudio.isPaused
        ? `Paused continuous background audio.`
        : `Playing continuous background audio.`;
    }
  }

  const seekable = canSeekNightAudio(state.nightAudio);
  progressInput.disabled = !seekable;

  if (!state.nightAudioScrub) {
    const progressPct = clamp(progress, 0, 1) * 100;
    progressInput.value = String(Math.round(progressPct * 10));
    progressInput.style.setProperty("--progress-pct", `${progressPct}%`);
  }

  progressMeta.textContent = metaText;
}

function updateNightAudioButton() {
  if (!dom.startNight || !dom.pauseNight) return;

  const selectedPreset = selectedAmbiencePreset();
  const isActive = Boolean(state.nightAudio && state.nightAudio.preset?.id === selectedPreset.id && !state.nightAudio.isPaused);
  const isPaused = Boolean(state.nightAudio && state.nightAudio.preset?.id === selectedPreset.id && state.nightAudio.isPaused);

  dom.startNight.innerHTML = "&#9654; Play Background Audio";
  dom.startNight.classList.toggle("active", isActive);
  dom.startNight.setAttribute("aria-pressed", isActive ? "true" : "false");

  if (!state.nightAudio) {
    dom.pauseNight.disabled = true;
    dom.pauseNight.innerHTML = "&#9208; Pause";
    dom.pauseNight.classList.remove("active");
    dom.pauseNight.setAttribute("aria-pressed", "false");
    return;
  }

  dom.pauseNight.disabled = false;
  dom.pauseNight.innerHTML = state.nightAudio.isPaused ? "&#9654; Resume" : "&#9208; Pause";
  dom.pauseNight.classList.toggle("active", isPaused);
  dom.pauseNight.setAttribute("aria-pressed", isPaused ? "true" : "false");
}

function startAmbienceEngine(context, destination, preset) {
  const cleanups = [];
  const add = (cleanup) => {
    if (typeof cleanup === "function") cleanups.push(cleanup);
  };

  const engine = preset?.engine || "wind";

  if (engine === "wind") {
    add(
      addNoiseLayer(context, destination, {
        type: "bandpass",
        frequency: preset.color || 260,
        q: 1.1,
        gain: 0.34,
        lfoHz: 0.1,
        lfoDepth: 150,
      })
    );
    add(
      scheduleRandomEffect(1200, 2800, () => {
        spawnWindGust(context, destination, 0.1 + Math.random() * 0.08);
      })
    );
  } else if (engine === "rain") {
    const rainMin = clamp(preset.rainMin || 80, 30, 400);
    const rainMax = clamp(preset.rainMax || 180, rainMin + 10, 700);
    const dropStrength = clamp(preset.dropStrength || 0.03, 0.005, 0.2);
    const rainBedGain = clamp(preset.rainBedGain || 0.22, 0.04, 0.4);
    const rainTone = clamp(preset.rainTone || 1700, 800, 4200);

    add(
      addNoiseLayer(context, destination, {
        type: "highpass",
        frequency: rainTone,
        q: 0.7,
        gain: rainBedGain,
      })
    );
    add(
      scheduleRandomEffect(rainMin, rainMax, () => {
        spawnRaindrop(
          context,
          destination,
          dropStrength * (0.8 + Math.random() * 0.7)
        );
      })
    );
    if ((preset.thunder || 0) > 0) {
      add(
        scheduleRandomEffect(4000, 9000, () => {
          spawnThunderBoom(
            context,
            destination,
            0.1 + Math.random() * 0.16 + preset.thunder * 0.08
          );
        })
      );
    }
  } else if (engine === "drips") {
    add(
      addNoiseLayer(context, destination, {
        type: "lowpass",
        frequency: 600,
        q: 0.8,
        gain: 0.12,
      })
    );
    add(
      scheduleRandomEffect(900, 2400, () => {
        spawnRaindrop(context, destination, 0.05);
      })
    );
  } else if (engine === "heartbeat") {
    const beatMs = 60000 / clamp(preset.bpm || 60, 30, 160);
    add(
      addDroneLayer(context, destination, [42, 84], {
        gain: 0.08,
        type: "triangle",
        tremoloHz: 0.05,
      })
    );
    add(
      scheduleFixedEffect(beatMs, () => {
        spawnHeartbeat(context, destination, 0.24);
        window.setTimeout(() => spawnHeartbeat(context, destination, 0.16), 180);
      })
    );
  } else if (engine === "drone") {
    add(
      addDroneLayer(context, destination, preset.freqs || [55, 82], {
        gain: 0.09,
        type: "triangle",
        tremoloHz: 0.08,
      })
    );
  } else if (engine === "pulse") {
    const beatMs = 60000 / clamp(preset.bpm || 70, 30, 180);
    add(
      addDroneLayer(context, destination, [48, 72], {
        gain: 0.06,
        type: "sine",
        tremoloHz: 0.07,
      })
    );
    add(
      scheduleFixedEffect(beatMs, () => {
        spawnPulseTone(context, destination, 210, 0.09);
      })
    );
  } else if (engine === "bells") {
    add(
      addDroneLayer(context, destination, [96], {
        gain: 0.035,
        type: "sine",
        tremoloHz: 0.03,
      })
    );
    add(
      scheduleRandomEffect(2800, 6200, () => {
        spawnBellTone(context, destination, {
          gain: preset.bright ? 0.14 : 0.11,
          bright: Boolean(preset.bright),
        });
      })
    );
  } else if (engine === "melody") {
    const ms = 60000 / clamp(preset.tempo || 82, 45, 140);
    const baseScale = Array.isArray(preset.sequence) && preset.sequence.length
      ? preset.sequence
      : preset.dramatic
      ? [174.61, 220, 261.63, 293.66, 329.63, 261.63, 220]
      : [174.61, 196, 220, 196, 174.61, 146.83];
    const bedFreqs = Array.isArray(preset.bedFreqs) && preset.bedFreqs.length
      ? preset.bedFreqs
      : [55, 82];
    const noteGain = preset.noteGain || (preset.dramatic ? 0.12 : 0.09);
    let index = 0;
    add(
      addDroneLayer(context, destination, bedFreqs, {
        gain: 0.04,
        type: "sine",
        tremoloHz: 0.05,
      })
    );
    add(
      scheduleFixedEffect(ms, () => {
        spawnMelodyNote(context, destination, baseScale[index], {
          gain: noteGain,
        });
        index = (index + 1) % baseScale.length;
      })
    );
  } else if (engine === "organ") {
    add(
      addDroneLayer(context, destination, [65.41, 98, 130.81], {
        gain: 0.08,
        type: "triangle",
        tremoloHz: 0.04,
      })
    );
  } else if (engine === "siren") {
    add(addSirenLayer(context, destination, 0.12));
    add(
      addNoiseLayer(context, destination, {
        type: "highpass",
        frequency: 1500,
        q: 0.6,
        gain: 0.07,
      })
    );
  } else if (engine === "whispers") {
    add(
      addNoiseLayer(context, destination, {
        type: "bandpass",
        frequency: 1400,
        q: 3,
        gain: 0.16,
        lfoHz: 0.13,
        lfoDepth: 200,
      })
    );
    add(
      scheduleRandomEffect(1200, 3000, () => {
        spawnWhisper(context, destination, 0.09);
      })
    );
  } else if (engine === "static") {
    add(
      addNoiseLayer(context, destination, {
        type: "highpass",
        frequency: 2800,
        q: 0.55,
        gain: 0.21,
      })
    );
    add(
      scheduleRandomEffect(1800, 4000, () => {
        spawnStaticPop(context, destination, 0.08);
      })
    );
  } else if (engine === "industrial") {
    if (preset.mode === "scrape") {
      add(
        addDroneLayer(context, destination, [62], {
          gain: 0.04,
          type: "square",
          tremoloHz: 0.03,
        })
      );
      add(
        scheduleRandomEffect(900, 2200, () => {
          spawnMetalScrape(context, destination, 0.11 + Math.random() * 0.03);
        })
      );
      add(
        scheduleRandomEffect(2200, 4200, () => {
          spawnMetalHit(context, destination, { gain: 0.08, mode: "clank" });
        })
      );
    } else {
      add(
        addDroneLayer(context, destination, [50, 75, 100], {
          gain: 0.085,
          type: "sawtooth",
          tremoloHz: 0.04,
        })
      );
      add(
        addNoiseLayer(context, destination, {
          type: "lowpass",
          frequency: 360,
          q: 0.7,
          gain: 0.05,
        })
      );
      add(
        scheduleRandomEffect(2600, 5400, () => {
          spawnMetalHit(context, destination, { gain: 0.06, mode: "clank" });
        })
      );
    }
  } else if (engine === "footsteps") {
    add(
      addNoiseLayer(context, destination, {
        type: "lowpass",
        frequency: 400,
        q: 0.8,
        gain: 0.11,
      })
    );
    add(
      scheduleRandomEffect(700, 1800, () => {
        spawnFootstep(context, destination, 0.1);
      })
    );
  } else if (engine === "zombie") {
    add(
      addNoiseLayer(context, destination, {
        type: "bandpass",
        frequency: 230,
        q: 0.85,
        gain: 0.34,
        lfoHz: 0.12,
        lfoDepth: 100,
      })
    );
    add(
      scheduleRandomEffect(900, 2600, () => {
        spawnGrowl(context, destination);
      })
    );
  } else {
    add(
      addNoiseLayer(context, destination, {
        type: "bandpass",
        frequency: 260,
        q: 1,
        gain: 0.2,
      })
    );
  }

  return () => {
    cleanups.forEach((cleanup) => {
      try {
        cleanup();
      } catch (_) {}
    });
  };
}

function addNoiseLayer(context, destination, options = {}) {
  const source = context.createBufferSource();
  source.buffer = createNoiseBuffer(context, 2);
  source.loop = true;

  const filter = context.createBiquadFilter();
  filter.type = options.type || "bandpass";
  filter.frequency.value = options.frequency || 260;
  filter.Q.value = options.q || 0.9;

  const gain = context.createGain();
  gain.gain.value = options.gain || 0.2;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  let lfo = null;
  if (options.lfoHz && options.lfoDepth) {
    const lfoGain = context.createGain();
    lfo = context.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = options.lfoHz;
    lfoGain.gain.value = options.lfoDepth;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
  }

  source.start();

  return () => {
    try {
      source.stop();
    } catch (_) {}
    if (lfo) {
      try {
        lfo.stop();
      } catch (_) {}
    }
  };
}

function addDroneLayer(context, destination, freqs, options = {}) {
  const gain = context.createGain();
  gain.gain.value = options.gain || 0.08;
  gain.connect(destination);

  let tremolo = null;
  if (options.tremoloHz) {
    const tremoloGain = context.createGain();
    tremolo = context.createOscillator();
    tremolo.type = "sine";
    tremolo.frequency.value = options.tremoloHz;
    tremoloGain.gain.value = (options.gain || 0.08) * 0.5;
    tremolo.connect(tremoloGain);
    tremoloGain.connect(gain.gain);
    tremolo.start();
  }

  const oscillators = freqs.map((frequency) => {
    const osc = context.createOscillator();
    osc.type = options.type || "sine";
    osc.frequency.value = frequency;
    osc.detune.value = (Math.random() - 0.5) * 8;
    osc.connect(gain);
    osc.start();
    return osc;
  });

  return () => {
    oscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch (_) {}
    });
    if (tremolo) {
      try {
        tremolo.stop();
      } catch (_) {}
    }
  };
}

function addSirenLayer(context, destination, gainAmount) {
  const osc = context.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 280;

  const gain = context.createGain();
  gain.gain.value = gainAmount;
  osc.connect(gain);
  gain.connect(destination);

  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.25;
  lfoGain.gain.value = 120;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  osc.start();
  lfo.start();

  return () => {
    try {
      osc.stop();
    } catch (_) {}
    try {
      lfo.stop();
    } catch (_) {}
  };
}

function scheduleRandomEffect(minMs, maxMs, callback) {
  let active = true;
  let timerId = null;
  const schedule = () => {
    const wait = minMs + Math.random() * (maxMs - minMs);
    timerId = window.setTimeout(() => {
      if (!active) return;
      callback();
      schedule();
    }, wait);
  };
  schedule();
  return () => {
    active = false;
    window.clearTimeout(timerId);
  };
}

function scheduleFixedEffect(intervalMs, callback) {
  const id = window.setInterval(callback, intervalMs);
  return () => {
    window.clearInterval(id);
  };
}

function spawnWindGust(context, destination, strength) {
  const now = context.currentTime;
  const source = context.createBufferSource();
  source.buffer = createNoiseBuffer(context, 0.8);

  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(200 + Math.random() * 220, now);
  filter.Q.value = 0.7;

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(now);
  source.stop(now + 0.78);
}

function spawnRaindrop(context, destination, strength) {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800 + Math.random() * 2200, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

function spawnThunderBoom(context, destination, strength) {
  const now = context.currentTime;
  const osc = context.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(70, now);
  osc.frequency.exponentialRampToValueAtTime(32, now + 1.1);

  const noise = context.createBufferSource();
  noise.buffer = createNoiseBuffer(context, 1.4);

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 260;

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

  osc.connect(filter);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start(now);
  noise.start(now);
  osc.stop(now + 1.3);
  noise.stop(now + 1.35);
}

function spawnHeartbeat(context, destination, strength) {
  const now = context.currentTime;
  const lowOsc = context.createOscillator();
  const lowGain = context.createGain();
  const highOsc = context.createOscillator();
  const highGain = context.createGain();
  const highFilter = context.createBiquadFilter();

  lowOsc.type = "sine";
  lowOsc.frequency.setValueAtTime(92, now);
  lowOsc.frequency.exponentialRampToValueAtTime(46, now + 0.16);

  lowGain.gain.setValueAtTime(0.0001, now);
  lowGain.gain.exponentialRampToValueAtTime(strength, now + 0.025);
  lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

  highOsc.type = "triangle";
  highOsc.frequency.setValueAtTime(170, now);
  highOsc.frequency.exponentialRampToValueAtTime(96, now + 0.08);

  highFilter.type = "lowpass";
  highFilter.frequency.value = 220;
  highFilter.Q.value = 0.8;

  highGain.gain.setValueAtTime(0.0001, now);
  highGain.gain.exponentialRampToValueAtTime(strength * 0.55, now + 0.012);
  highGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

  lowOsc.connect(lowGain);
  lowGain.connect(destination);

  highOsc.connect(highFilter);
  highFilter.connect(highGain);
  highGain.connect(destination);

  lowOsc.start(now);
  highOsc.start(now);
  lowOsc.stop(now + 0.26);
  highOsc.stop(now + 0.13);
}

function spawnPulseTone(context, destination, frequency, strength) {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "square";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

function spawnBellTone(context, destination, options = {}) {
  const now = context.currentTime;
  const fundamental = 260 + Math.random() * 180;
  const harmonics = [1, 2.01, 2.97];
  harmonics.forEach((harmonic, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = options.bright ? "sine" : "triangle";
    osc.frequency.value = fundamental * harmonic;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(
      (options.gain || 0.1) / (index + 1),
      now + 0.01
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4 + index * 0.2);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(now);
    osc.stop(now + 1.7);
  });
}

function spawnMelodyNote(context, destination, frequency, options = {}) {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "triangle";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(options.gain || 0.08, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + 0.5);
}

function spawnWhisper(context, destination, strength) {
  const now = context.currentTime;
  const source = context.createBufferSource();
  source.buffer = createNoiseBuffer(context, 0.6);
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1200 + Math.random() * 800;
  filter.Q.value = 2.5;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(now);
  source.stop(now + 0.5);
}

function spawnStaticPop(context, destination, strength) {
  const now = context.currentTime;
  const source = context.createBufferSource();
  source.buffer = createNoiseBuffer(context, 0.2);
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
  source.connect(gain);
  gain.connect(destination);
  source.start(now);
  source.stop(now + 0.09);
}

function spawnMetalHit(context, destination, options = {}) {
  const now = context.currentTime;
  const mode = options.mode || (options.scrape ? "scrape" : "clank");

  if (mode === "scrape") {
    spawnMetalScrape(context, destination, options.gain || 0.1);
    return;
  }

  const osc = context.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(240 + Math.random() * 260, now);
  osc.frequency.exponentialRampToValueAtTime(120 + Math.random() * 60, now + 0.16);

  const resonantFilter = context.createBiquadFilter();
  resonantFilter.type = "bandpass";
  resonantFilter.frequency.value = 900 + Math.random() * 700;
  resonantFilter.Q.value = 6;

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(options.gain || 0.08, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  osc.connect(resonantFilter);
  resonantFilter.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + 0.26);

  if (options.chains) {
    spawnChainRattle(context, destination, 0.05);
  }
}

function spawnMetalScrape(context, destination, strength) {
  const now = context.currentTime;
  const duration = 0.34 + Math.random() * 0.2;

  const noise = context.createBufferSource();
  noise.buffer = createNoiseBuffer(context, duration + 0.1);

  const noiseFilter = context.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(2200 + Math.random() * 900, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(700 + Math.random() * 300, now + duration);
  noiseFilter.Q.value = 5;

  const osc = context.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(1200 + Math.random() * 300, now);
  osc.frequency.exponentialRampToValueAtTime(170 + Math.random() * 110, now + duration);

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(noiseFilter);
  noiseFilter.connect(gain);
  osc.connect(gain);
  gain.connect(destination);

  noise.start(now);
  osc.start(now);
  noise.stop(now + duration + 0.05);
  osc.stop(now + duration + 0.05);
}

function spawnChainRattle(context, destination, strength) {
  const bursts = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < bursts; i += 1) {
    window.setTimeout(() => {
      spawnStaticPop(context, destination, strength * (0.8 + Math.random() * 0.7));
    }, i * (55 + Math.random() * 35));
  }
}

function spawnFootstep(context, destination, strength) {
  const now = context.currentTime;
  const source = context.createBufferSource();
  source.buffer = createNoiseBuffer(context, 0.22);
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 220;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(now);
  source.stop(now + 0.2);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createNoiseBuffer(context, seconds) {
  const frameCount = context.sampleRate * seconds;
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    channel[i] = (Math.random() * 2 - 1) * 0.82;
  }
  return buffer;
}

function spawnGrowl(context, destination) {
  const now = context.currentTime;
  const duration = 0.45 + Math.random() * 0.95;

  const osc = context.createOscillator();
  osc.type = Math.random() > 0.5 ? "sawtooth" : "triangle";
  osc.frequency.setValueAtTime(75 + Math.random() * 80, now);
  osc.frequency.exponentialRampToValueAtTime(42 + Math.random() * 40, now + duration);

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(220 + Math.random() * 260, now);

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  if (context.createStereoPanner) {
    const panner = context.createStereoPanner();
    panner.pan.value = Math.random() * 1.6 - 0.8;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(destination);
  } else {
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
  }

  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function updateScriptViews() {
  PANEL_TYPES.forEach((type) => {
    const panelDom = dom.scriptPanels[type];
    if (!panelDom?.textarea) return;
    panelDom.textarea.value = formatPanelText(type, getPanelDisplayLines(type));
  });
  syncScriptPlaybackUI();
}

function formatPanelText(type, lines = []) {
  if (LESSON_TYPES.includes(type)) {
    return formatLessonText(lines);
  }
  return formatScript(lines);
}

function formatScript(lines = []) {
  if (!lines.length) return "Generate a game to create script text.";
  let spokenIndex = 0;
  return lines
    .map((line) => {
      if (line === SCRIPT_PAUSE_MARKER) {
        return "** PAUSE and wait for user to restart.";
      }
      if (line === SCRIPT_PAUSE_2S_MARKER) {
        return "* PAUSE for 2 seconds.";
      }
      spokenIndex += 1;
      return `${spokenIndex}. ${line}`;
    })
    .join("\n");
}

function formatLessonText(lines = []) {
  if (!lines.length) return "Key lessons will appear here.";
  return lines
    .filter((line) => line !== SCRIPT_PAUSE_MARKER && line !== SCRIPT_PAUSE_2S_MARKER)
    .join("\n\n");
}

function naturalList(items) {
  if (!items.length) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function uniqueById(roles) {
  const seen = new Set();
  return roles.filter((role) => {
    if (seen.has(role.id)) return false;
    seen.add(role.id);
    return true;
  });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function capitalize(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function setSetupStatus(message, isError = false) {
  dom.setupStatus.textContent = message;
  dom.setupStatus.style.color = isError ? "var(--danger)" : "var(--accent-mint)";
}

function setAuthStatus(message, isError = false) {
  dom.authStatus.textContent = message;
  dom.authStatus.style.color = isError ? "var(--danger)" : "var(--accent-mint)";
}

function setTimerStatus(message, isError = false) {
  if (!dom.timerStatus) return;
  dom.timerStatus.textContent = message;
  dom.timerStatus.style.color = isError ? "var(--danger)" : "var(--accent-mint)";
}

function setAudioStatus(message, isError = false) {
  [dom.audioStatus, dom.lessonsAudioStatus].forEach((target) => {
    if (!target) return;
    target.textContent = message;
    target.style.color = isError ? "var(--danger)" : "var(--accent-mint)";
  });
}

init();
