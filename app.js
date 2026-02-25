const MAX_PLAYERS = 24;
const MAX_ZOMBIES = 4;
const ENGLISH_LANG_RE = /^en(?:-|_|$)/i;
const PREFERRED_ENGLISH_LANGS = ["en-AU", "en-GB", "en-US"];
const ACCESS_CODE = "runaway";
const ACCESS_SESSION_KEY = "zombie-leaders-unlocked";
const DEFAULT_AMBIENCE_ID = "haunted-wind";
const AMBIENT_PRESETS = [
  { id: "haunted-wind", name: "Haunted Wind (Default)", engine: "wind", gain: 0.24, color: 260 },
  { id: "cold-wind", name: "Cold Wind", engine: "wind", gain: 0.2, color: 340 },
  { id: "gale-force", name: "Gale Force", engine: "wind", gain: 0.3, color: 210 },
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
  {
    id: "storm-rain",
    name: "Storm Rain",
    engine: "rain",
    gain: 0.26,
    thunder: 0.68,
    rainMin: 40,
    rainMax: 120,
    dropStrength: 0.05,
    rainBedGain: 0.26,
    rainTone: 1450,
  },
  { id: "cave-drips", name: "Cave Drips", engine: "drips", gain: 0.2 },
  { id: "dark-drone", name: "Dark Drone", engine: "drone", freqs: [56, 83], gain: 0.2 },
  { id: "subbass-drone", name: "Sub-bass Drone", engine: "drone", freqs: [41, 62], gain: 0.24 },
  { id: "warning-pulse", name: "Warning Pulse", engine: "pulse", bpm: 62, gain: 0.24 },
  { id: "ritual-bells", name: "Ritual Bells", engine: "bells", gain: 0.2 },
  { id: "minor-melody", name: "Minor Melody", engine: "melody", tempo: 82, gain: 0.21 },
  { id: "dramatic-melody", name: "Dramatic Melody", engine: "melody", tempo: 96, gain: 0.24, dramatic: true },
  { id: "organ-dirge", name: "Organ Dirge", engine: "organ", gain: 0.2 },
  { id: "siren-distant", name: "Distant Siren", engine: "siren", gain: 0.2 },
  { id: "whisper-chorus", name: "Whisper Chorus", engine: "whispers", gain: 0.2 },
  { id: "radio-static", name: "Radio Static", engine: "static", gain: 0.2 },
  { id: "factory-hum", name: "Factory Hum", engine: "industrial", mode: "hum", gain: 0.21 },
  { id: "metal-scrape", name: "Metal Scrape", engine: "industrial", mode: "scrape", gain: 0.23 },
  { id: "distant-footsteps", name: "Distant Footsteps", engine: "footsteps", gain: 0.2 },
  { id: "zombie-moan", name: "Zombie Moan", engine: "zombie", gain: 0.24 },
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
    count: 2,
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
    "Welcome to Happy Days Corporation (HDC) — an organization where we like to put the smile on everyone’s faces and keep it there. I’m the Departmental Administrator and my goal is to make your time here as fulfilling and rewarding as possible. Unfortunately, though, as you are about find out, there are some very extreme structural constraints that limit my ability to do this. Historically, as our name suggests, we have been a very happy organization. Our leaders worked hard to create, advance, represent and embed a shared sense of “us” and — in line with what we know from research — this was a place where people enjoyed their work and were both healthy and productive. Unfortunately, though, HDC has recently been going through a tough time. Things started going downhill after some of our senior executives went on a shonky Leadership Development course last year. This led to them being infected with a toxic mindset that researchers have identified as arising from an approach to management known as Zombie Leadership.",
    "Devotees of Zombie Leadership — Zombie Leaders — are committed to the idea that leaders are inherently superior to everyone else and hence that they are “born to lead”. They think that everything they do is right, that they alone know how best to do things, that everyone can see how wonderful they are, and that they should be extravagantly rewarded for the work they do. Sadly, HDC now has a number of Zombie Leaders in its top ranks. Precisely how many there are of them is unknown — but they are in the process of destroying our organization. [There is also potentially a Sycophant who is aligned with the Zombie Leaders, but who they don’t know about.] If the Zombie Leaders destroy the organization, they will have won [and the Sycophant will win too]. The good news is, there are still plenty of decent, sensible people working here. ….",
    "We have a great Integrity Officer, who can view one person's CV each morning to see if they are a Zombie Leader. We also have a great Personnel Manager who can identify one person every day that they will protect from attack by the Zombie Leaders (but note that they must choose a different person every day). We have a very cluey IT Specialist who can hack the IT system twice in the course of the game — once to get rid of someone they suspect of being a Zombie Leader; once to save someone they want to protect from the Zombie Leaders. We have a Matchmaker who is keen to cultivate office romance and who is going to weave their magic to make two members of HDC fall in love. This, though, means that if one of these two Lovers leaves the organization (for whatever reason) the other will too. ….",
    "Defending everyone’s rights, we also have some Union Reps. They will be known to each other and will act in solidarity to defend us from the Zombie Leaders. However, because the Zombie Leaders are very vindictive, if the Union Reps ever reveal — or even hint at —their identity they will be instantly dismissed. And if anyone else hints at the Union Reps’ identity they too will be fired. We also have a very enthusiastic Training Supervisor. They take their job seriously and every day will be send one person off to complete mandatory training. There are a range of courses that people will be completing — covering everything from Managing Conflicts of Interest and Respectful Relationships in the Workplace to Fire Safety. These courses were mandated by the Zombie Leaders, but, as you’ll discover, they don’t pay much attention to them themselves. There is also one member of HDC who is the Schoßhündchen (the Boss’s Pet). They are protected by one of the non-zombie senior managers, and this means that they will not lose their position the first time that the Zombie Leaders target them. Happily, we also have an Intern. Every day they can, if they want, decide to spend time with a Mentor of their choosing. This means that if they are targeted by the Zombie Leaders that night, they won’t be terminated. However, if their mentor is terminated, the intern will be terminated along with them. We also have a very enthusiastic Office Gossip. They have the dirt on everybody and if they are targeted by the Zombie Leaders they will not necessarily go quietly — and can take someone down with them in retaliation if they so desire. In light of the increasing job demands that the Zombie Leaders are placing on us, we are also lucky to have a Social Club Organizer. In a round of their choosing they can set up a social club for themselves and up to three other people in HDC. Due to the well-evidenced socially curative effects of group memberships, this protects them all from being harmed by the Zombie Leaders in that round.",
    "Finally, we have a number of Organizational Citizens. They are the backbone of HDC and they have been serving the company loyally for a great many years. We are grateful for their service but mindful that the Zombie Leaders are always looking for ways to reduce their ranks — while at the same time taking credit for everything they achieve. The big question, then, is whether we can save ourselves from the impending Zombie Leadership Apocalypse. Let us not go quietly into that dark night.",
  ],
  intro: [
    "The first thing I’d like to do is work out what role everyone has, because, after the last restructure that the Zombie Leaders initiated, everyone — including me — is a lot confused. And because some of this information is secret, I’d also like everyone to close your eyes. First, I’d like the Zombie Leaders to open your eyes and acknowledge each other. You are dirtbags and proud of it. Now please close your eyes [and raise one hand. Could the Sycophant also please open your eyes and look at me and take note of the Zombie Leaders with their hands raised. Now please close your eyes and do your worst]. Now could the Integrity Officer open your eyes and look at me please. Thank you and good luck. Please close your eyes. Now could the Personnel Manager please open your eyes and look at me. Thank you and good luck. Please close your eyes.",
    "Now IT Specialist open your eyes and look at me please. Thank you and good luck. Please close your eyes. Now could the Training Supervisor open your eyes and look at me please. Thank you and good luck. Please close your eyes. Now could the Schoßhündchen (Boss’s Pet) open your eyes and look at me please. Thank you and good luck. Please close your eyes. Now could the Social Club Organiser open your eyes and look at me please. Thank you and good luck. Please close your eyes. Now could the Office Gossip open your eyes and look at me please. Thank you and good luck. Please close your eyes. Now could the Intern open your eyes and look at me please. Thank you and good luck. Please close your eyes. ….",
    "Now could the Matchmaker open your eyes and look at me. Can you point to two people who you would like to fall in love with each other? [Pause] Thank you — you can close your eyes. Now if I tap you on the knee, please open your eyes and gaze upon your new life partner. Your fates will now be inextricably intertwined — so if one of you leaves us, the other will too. [Pause] Now please close your eyes and commit yourselves to a future in which you are bound together in perpetuity. Now could the Union Reps open your eyes and identify each other. You have a difficult job ahead of you and you will need to work as a united force. Your strength lies in your solidarity and your unwavering commitment to the AntiZombie Leadership Alliance. Remember, you are fighting for fairness, for dignity, and for a better future — but you can never speak of this endeavour. Thank you. And now please close your eyes. Finally, could the Organizational Citizens please keep your eyes closed and raise your hands so that I can see who you are? Thank you. We are now ready to get to work. This is a new day at Happy Days Corporation and the first thing I’d like you to do is elect a Head of Department. This person is going to be in charge of your meetings and they will also have the deciding vote if any votes are tied — so choose wisely.",
  ],
  day: [
    "We would like you to have a discussion to see if there is anyone you would like to remove from the organization because you suspect them of being a Zombie Leader. You can also choose not to remove anyone, but that decision must be unanimous. [Pause for discussion: setting alarm time] Now I know it’s been a long day and that everyone is very tired, but before you go home, we need to make plans for tomorrow. I’d also like you to close your eyes so that we can do this in private. Integrity Officer please open your eyes and tell me whose CV you would like to take home to have a look at? [Pause] Thank you. Please close your eyes. Personnel Manager please open your eyes and indicate whose career you would like to save from attack by Zombie Leaders tonight. [Pause] Thank you. Please close your eyes. Now IT Specialist please open your eyes and let me know if you would like to use your one chance to save the person who is going to be targeted by the ZLs tonight? Do you want to use your one chance to get rid of someone? [Pause] Thank you. Now please close your eyes.",
  ],
  night: [
    "The day has faded into night.",
    "Now could the Training Supervisor open your eyes and let me know who you would like to send on mandatory training tomorrow. Tomorrow’s course promises to be very exciting and is on [Pause] Thank you. Please close your eyes.",
    "Now could the Social Club Organiser open your eyes and let me know if you want to use your one chance to go on a 24-hour excursion and, if so, who you would like to take with you. [Pause] Thank you. Please close your eyes.",
    "Now could the Office Gossip please open your eyes and look at me. If your career is destroyed by the Zombie Leaders tonight, is there anyone you would like to take down with you? [Pause] Thank you. Please close your eyes.",
    "Now, finally, could the Intern open your eyes and let me know who, if anyone, you would like to have as your mentor for the next 24 hours. [Pause] Thank you. Please close your eyes.",
    "Thank you everyone for your work today. It’s now time for everyone to go home and get a good night’s rest, as it’s going to be another busy day tomorrow.",
    "Everyone closes their eyes except the Zombie Leaders, who now convene to identify someone whose position in HDC they are going to terminate (typically, the person who they perceive to be the greatest threat to them, or else to throw the Organizational Citizens off their scent).",
    "They need to do this using non-verbal communication, so as not to be identifiable.",
    "Depending on the environment in which the game takes place, it may be necessary to play music to mask any sound that the Zombie Leaders make.",
    "Once the Zombie Leaders have decided who they want to eliminate, the new day starts with the Departmental Administrator announcing the implications of the Zombie Leaders’ decision.",
  ],
};

const dom = {
  authGate: document.getElementById("auth-gate"),
  authForm: document.getElementById("auth-form"),
  accessCode: document.getElementById("access-code"),
  authStatus: document.getElementById("auth-status"),
  playerCount: document.getElementById("player-count"),
  playerNames: document.getElementById("player-names"),
  zombieCount: document.getElementById("zombie-count"),
  nightDuration: document.getElementById("night-duration"),
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
  playOrientation: document.getElementById("play-orientation"),
  playIntro: document.getElementById("play-intro"),
  playDay: document.getElementById("play-day"),
  playNightScript: document.getElementById("play-night-script"),
  stopSpeech: document.getElementById("stop-speech"),
  startNight: document.getElementById("start-night"),
  stopNight: document.getElementById("stop-night"),
  ambienceSelect: document.getElementById("ambience-select"),
  voiceRate: document.getElementById("voice-rate"),
  voiceRateValue: document.getElementById("voice-rate-value"),
  voicePitch: document.getElementById("voice-pitch"),
  voicePitchValue: document.getElementById("voice-pitch-value"),
  voiceMode: document.getElementById("voice-mode"),
  voiceSelect: document.getElementById("voice-select"),
  testVoice: document.getElementById("test-voice"),
  resetVoice: document.getElementById("reset-voice"),
  audioStatus: document.getElementById("audio-status"),
  orientationScript: document.getElementById("orientation-script"),
  introScript: document.getElementById("intro-script"),
  dayScript: document.getElementById("day-script"),
  nightScript: document.getElementById("night-script"),
};

const state = {
  assignments: [],
  activeRoles: [],
  scripts: { orientation: [], intro: [], day: [], night: [] },
  voices: [],
  voiceMap: new Map(),
  nightAudio: null,
  speechSessionId: 0,
};

function init() {
  renderRolePicker();
  renderAmbienceOptions();
  bindEvents();
  updateVoiceControlReadouts();
  populateVoiceList();
  state.scripts = buildFallbackScripts();
  updateScriptViews();
  setupAccessGate();
  setSetupStatus("Add players and click Generate Game.");
}

function bindEvents() {
  dom.authForm.addEventListener("submit", handleAuthSubmit);
  dom.selectAllRoles.addEventListener("click", () => setRoleCheckboxes(true));
  dom.clearAllRoles.addEventListener("click", () => setRoleCheckboxes(false));
  dom.generateGame.addEventListener("click", handleGenerateGame);
  dom.revealAllCards.addEventListener("click", revealAllCards);
  dom.hideAllCards.addEventListener("click", hideAllCards);
  dom.playOrientation.addEventListener("click", () => playScript("orientation"));
  dom.playIntro.addEventListener("click", () => playScript("intro"));
  dom.playDay.addEventListener("click", () => playScript("day"));
  dom.playNightScript.addEventListener("click", () => playScript("night"));
  dom.stopSpeech.addEventListener("click", stopSpeech);
  dom.startNight.addEventListener("click", handleStartNightAudio);
  dom.stopNight.addEventListener("click", stopNightAudio);
  dom.orientationEnabled.addEventListener("change", updateScriptViews);
  dom.voiceRate.addEventListener("input", updateVoiceControlReadouts);
  dom.voicePitch.addEventListener("input", updateVoiceControlReadouts);
  dom.voiceMode.addEventListener("change", populateVoiceList);
  dom.testVoice.addEventListener("click", handleTestVoice);
  dom.resetVoice.addEventListener("click", resetVoiceControls);
  window.speechSynthesis?.addEventListener?.("voiceschanged", populateVoiceList);
  window.addEventListener("beforeunload", () => {
    stopSpeech();
    stopNightAudio();
  });
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
          <span class="role-check-row">
            <input type="checkbox" value="${role.id}">
          </span>
          <span class="role-content-row">
            ${renderRoleThumb(role.id, { label: role.name, className: "picker-thumb" })}
            <span class="role-copy">
              <span class="role-title">${role.name}</span>
              <span class="role-summary">${role.summary}</span>
            </span>
          </span>
        </label>
      </div>
    `;
  }).join("");
  dom.rolesGrid.innerHTML = html;
  renderRoleIconLegend();
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
  const selected = CITIZEN_ROLES.filter((role) => checkedIds.includes(role.id));
  return selected;
}

function parsePlayers(raw) {
  const names = raw
    .split(/[\n,]+/)
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
  const hasSycophant = roleIds.has("sycophant");

  const orientation = [
    SCRIPT_TEXT.orientation[0],
    hasSycophant
      ? SCRIPT_TEXT.orientation[1]
      : SCRIPT_TEXT.orientation[1]
          .replace(
            "[There is also potentially a Sycophant who is aligned with the Zombie Leaders, but who they don’t know about.]",
            ""
          )
          .replace("[and the Sycophant will win too]", "")
          .replace(/\s{2,}/g, " ")
          .trim(),
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
      "We have an Office Matchmaker who is keen to cultivate office romance and who is going to weave their magic to make two members of HDC fall in love. This, though, means that if one of these two Lovers leaves the organization (for whatever reason) the other will too."
    );
  }
  if (roleIds.has("union-rep")) {
    orientationRoleLines.push(
      "Defending everyone’s rights, we also have some Union Reps. They will be known to each other and will act in solidarity to defend us from the Zombie Leaders. However, because the Zombie Leaders are very vindictive, if the Union Reps ever reveal — or even hint at —their identity they will be instantly dismissed. And if anyone else hints at the Union Reps’ identity they too will be fired."
    );
  }
  if (roleIds.has("training-supervisor")) {
    orientationRoleLines.push(
      "We also have a very enthusiastic Training Supervisor. They take their job seriously and every day will be send one person off to complete mandatory training."
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
    orientation.push(orientationRoleLines.join(" "));
  }
  orientation.push(SCRIPT_TEXT.orientation[4]);

  const intro = [];
  intro.push(
    hasSycophant
      ? "The first thing I’d like to do is work out what role everyone has, because, after the last restructure that the Zombie Leaders initiated, everyone — including me — is a lot confused. And because some of this information is secret, I’d also like everyone to close your eyes. First, I’d like the Zombie Leaders to open your eyes and acknowledge each other. You are dirtbags and proud of it. Now please close your eyes and raise one hand. Could the Sycophant also please open your eyes and look at me and take note of the Zombie Leaders with their hands raised. Now please close your eyes and do your worst."
      : "The first thing I’d like to do is work out what role everyone has, because, after the last restructure that the Zombie Leaders initiated, everyone — including me — is a lot confused. And because some of this information is secret, I’d also like everyone to close your eyes. First, I’d like the Zombie Leaders to open your eyes and acknowledge each other. You are dirtbags and proud of it. Now please close your eyes."
  );

  if (roleIds.has("office-manager")) {
    intro.push(
      "Now could the Integrity Officer open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("hr-lead")) {
    intro.push(
      "Now could the Personnel Manager please open your eyes and look at me. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("it-specialist")) {
    intro.push(
      "Now IT Specialist open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("training-supervisor")) {
    intro.push(
      "Now could the Training Supervisor open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("schosshundchen")) {
    intro.push(
      "Now could the Schoßhündchen (Boss’s Pet) open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("social-club-organizer")) {
    intro.push(
      "Now could the Social Club Organizer open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("office-gossip")) {
    intro.push(
      "Now could the Office Gossip open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("intern")) {
    intro.push(
      "Now could the Intern open your eyes and look at me please. Thank you and good luck. Please close your eyes."
    );
  }
  if (roleIds.has("office-matchmaker")) {
    intro.push(
      "Now could the Office Matchmaker open your eyes and look at me. Can you point to two people who you would like to fall in love with each other? [Pause] Thank you — you can close your eyes. Now if I tap you on the knee, please open your eyes and gaze upon your new life partner. Your fates will now be inextricably intertwined — so if one of you leaves us, the other will too. [Pause] Now please close your eyes and commit yourselves to a future in which you are bound together in perpetuity."
    );
  }
  if (roleIds.has("union-rep")) {
    intro.push(
      "Now could the Union Reps open your eyes and identify each other. You have a difficult job ahead of you and you will need to work as a united force. Your strength lies in your solidarity and your unwavering commitment to the AntiZombie Leadership Alliance. Remember, you are fighting for fairness, for dignity, and for a better future — but you can never speak of this endeavour. Thank you. And now please close your eyes."
    );
  }

  intro.push(
    "Finally, could the Organizational citizens please keep your eyes closed and raise your hands so that I can see who you are? Thank you. We are now ready to get to work. This is a new day at Happy Days Corporation and the first thing I’d like you to do is elect a Head of Department. This person is going to be in charge of your meetings and they will also have the deciding vote if any votes are tied — so choose wisely."
  );

  const day = [
    "We would like you to have a discussion to see if there is anyone you would like to remove from the organization because you suspect them of being a Zombie Leader. You can also choose not to remove anyone, but that decision must be unanimous. [Pause for discussion: setting alarm time] Now I know it’s been a long day and that everyone is very tired, but before you go home, we need to make plans for tomorrow. I’d also like you to close your eyes so that we can do this in private.",
  ];
  if (roleIds.has("office-manager")) {
    day.push(
      "Integrity Officer please open your eyes and tell me whose CV you would like to take home to have a look at? [Pause] Thank you. Please close your eyes."
    );
  }
  if (roleIds.has("hr-lead")) {
    day.push(
      "Personnel Manager please open your eyes and indicate whose career you would like to save from attack by Zombie Leaders tonight. [Pause] Thank you. Please close your eyes."
    );
  }
  if (roleIds.has("it-specialist")) {
    day.push(
      "Now IT Specialist please open your eyes and let me know if you would like to use your one chance to save the person who is going to be targeted by the ZLs tonight? Do you want to use your one chance to get rid of someone? [Pause] Thank you. Now please close your eyes."
    );
  }

  const night = [SCRIPT_TEXT.night[0]];
  if (roleIds.has("training-supervisor")) {
    night.push(SCRIPT_TEXT.night[1]);
  }
  if (roleIds.has("social-club-organizer")) {
    night.push(SCRIPT_TEXT.night[2]);
  }
  if (roleIds.has("office-gossip")) {
    night.push(SCRIPT_TEXT.night[3]);
  }
  if (roleIds.has("intern")) {
    night.push(SCRIPT_TEXT.night[4]);
  }
  night.push(SCRIPT_TEXT.night[5]);
  night.push(SCRIPT_TEXT.night[6]);
  night.push(SCRIPT_TEXT.night[7]);
  night.push(SCRIPT_TEXT.night[8]);
  night.push(SCRIPT_TEXT.night[9]);

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

function refreshZombieAllyText() {
  dom.cardsGrid.querySelectorAll("[data-allies-for]").forEach((line) => {
    const index = Number(line.getAttribute("data-allies-for"));
    const textNode = line.querySelector("[data-allies-text]");
    if (!textNode || Number.isNaN(index)) return;
    textNode.textContent = zombieAlliesText(index);
  });
}

function renderCards() {
  const html = state.assignments
    .map((entry, index) => {
      const visibleName = displayPlayerName(entry, index);
      const cardVariantSeed = hashString(`${visibleName}|${entry.role.id}`);
      return `
        <article class="card" data-index="${index}">
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
            <p><strong>Team:</strong> ${entry.team === "zombie" ? "Zombie Leaders" : "Organizational Citizens"}</p>
            <p class="card-role-line">
              <strong>Role:</strong>
              ${renderRoleThumb(entry.role.id, {
                team: entry.team,
                label: entry.role.name,
                className: "inline-role-thumb",
                variantSeed: cardVariantSeed,
              })}
              <span>${escapeHtml(entry.role.name)}</span>
            </p>
            <p>${escapeHtml(entry.role.summary)}</p>
            ${
              entry.team === "zombie"
                ? `<p data-allies-for="${index}">
                    <strong>Zombie Allies:</strong>
                    <span data-allies-text>${escapeHtml(zombieAlliesText(index))}</span>
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
      refreshZombieAllyText();
    });
    input.addEventListener("blur", (event) => {
      const field = event.currentTarget;
      const index = Number(field.dataset.index);
      if (Number.isNaN(index)) return;
      setAssignmentPlayerName(index, field.value, true);
      field.value = state.assignments[index]?.player || "";
      refreshZombieAllyText();
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
    dom.voiceSelect.innerHTML = `<option value="">Speech not supported</option>`;
    dom.voiceMode.disabled = true;
    dom.testVoice.disabled = true;
    dom.resetVoice.disabled = true;
    dom.playOrientation.disabled = true;
    dom.playIntro.disabled = true;
    dom.playDay.disabled = true;
    dom.playNightScript.disabled = true;
    dom.stopSpeech.disabled = true;
    return;
  }

  const previousKey = dom.voiceSelect.value;
  const allVoices = window.speechSynthesis.getVoices();
  state.voices = allVoices;

  if (!allVoices.length) {
    dom.voiceSelect.innerHTML = `<option value="">Loading voices...</option>`;
    return;
  }

  const filteredVoices = sortVoicesByQuality(
    filterVoicesByMode(allVoices, dom.voiceMode.value)
  );
  const voicesToRender = filteredVoices.length ? filteredVoices : sortVoicesByQuality(allVoices);

  state.voiceMap = new Map();
  dom.voiceSelect.innerHTML = "";
  voicesToRender.forEach((voice) => {
    const option = document.createElement("option");
    const key = getVoiceKey(voice);
    option.value = key;
    option.textContent = `${voice.name} (${voice.lang}${voice.localService ? ", local" : ", remote"})`;
    dom.voiceSelect.appendChild(option);
    state.voiceMap.set(key, voice);
  });

  if (state.voiceMap.has(previousKey)) {
    dom.voiceSelect.value = previousKey;
    return;
  }

  const bestVoice = pickBestVoice(voicesToRender) || voicesToRender[0];
  if (bestVoice) {
    dom.voiceSelect.value = getVoiceKey(bestVoice);
  }
}

function selectedVoice() {
  const key = dom.voiceSelect.value;
  if (!key) return null;
  return state.voiceMap.get(key) || null;
}

function filterVoicesByMode(voices, mode) {
  const englishVoices = voices.filter((voice) => ENGLISH_LANG_RE.test(voice.lang));
  const stableEnglish = englishVoices.filter((voice) => voice.localService);
  const danielVoice = voices.find((voice) => /\bdaniel\b/i.test(voice.name || ""));

  if (mode === "all") return voices;
  if (mode === "english") return englishVoices;

  const base = stableEnglish.length ? stableEnglish : englishVoices;
  if (!danielVoice) return base;
  if (base.some((voice) => getVoiceKey(voice) === getVoiceKey(danielVoice))) {
    return base;
  }
  return [danielVoice, ...base];
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

function getVoiceKey(voice) {
  return [voice.voiceURI || "", voice.name || "", voice.lang || ""].join("|");
}

function normalizeLang(lang) {
  return String(lang || "").replace("_", "-");
}

function updateVoiceControlReadouts() {
  const speed = Number(dom.voiceRate.value).toFixed(2);
  const pitch = Number(dom.voicePitch.value).toFixed(2);
  dom.voiceRateValue.textContent = `${speed}x`;
  dom.voicePitchValue.textContent = `${pitch}x`;
}

function resetVoiceControls() {
  dom.voiceRate.value = "1";
  dom.voicePitch.value = "1";
  dom.voiceMode.value = "recommended";
  updateVoiceControlReadouts();
  populateVoiceList();
  setAudioStatus("Voice settings reset to stable defaults.");
}

function handleTestVoice() {
  const sample = [
    "Voice test for Zombie Leaders.",
    "This is the current voice, speed, and pitch setting.",
  ];
  speakLines(sample, "voice test");
}

function playScript(type) {
  if (type === "orientation" && !dom.orientationEnabled.checked) {
    setAudioStatus("Orientation is optional and currently disabled.", true);
    return;
  }

  const lines = state.scripts[type];
  if (!lines || !lines.length) {
    setAudioStatus("No script available for this sequence.", true);
    return;
  }

  speakLines(lines, type);
}

function speakLines(lines, typeLabel) {
  if (!window.speechSynthesis) {
    setAudioStatus("Speech synthesis is not supported in this browser.", true);
    return;
  }

  stopSpeech();
  const sessionId = state.speechSessionId;
  const chosenVoice = selectedVoice();
  const rate = Number(dom.voiceRate.value);
  const pitch = Number(dom.voicePitch.value);
  let currentLine = 0;
  let useFallbackVoice = false;
  const isCurrentSession = () => state.speechSessionId === sessionId;

  const speakNext = () => {
    if (!isCurrentSession()) return;

    if (currentLine >= lines.length) {
      setAudioStatus(`${capitalize(typeLabel)} sequence complete.`);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(lines[currentLine]);
    if (chosenVoice && !useFallbackVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang || "en-AU";
    } else if (chosenVoice?.lang) {
      utterance.lang = chosenVoice.lang;
    } else {
      utterance.lang = "en-AU";
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onstart = () => {
      if (!isCurrentSession()) return;
      setAudioStatus(
        `${capitalize(typeLabel)}: line ${currentLine + 1} of ${lines.length}`
      );
    };
    utterance.onerror = (event) => {
      if (!isCurrentSession()) return;

      const errorName = String(event?.error || "unknown").toLowerCase();
      if (errorName === "interrupted" || errorName === "canceled" || errorName === "cancelled") {
        return;
      }

      if (chosenVoice && !useFallbackVoice) {
        useFallbackVoice = true;
        setAudioStatus(
          `Selected voice failed (${errorName}). Switching to browser default voice.`,
          true
        );
        window.setTimeout(speakNext, 25);
        return;
      }
      setAudioStatus(`Speech playback failed (${errorName}).`, true);
    };
    utterance.onend = () => {
      if (!isCurrentSession()) return;
      currentLine += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  speakNext();
}

function stopSpeech() {
  state.speechSessionId += 1;
  if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
    window.speechSynthesis.cancel();
  }
}

function handleStartNightAudio() {
  const seconds = Number(dom.nightDuration.value);
  if (!Number.isFinite(seconds) || seconds < 15 || seconds > 240) {
    setAudioStatus("Background audio duration must be between 15 and 240 seconds.", true);
    return;
  }
  const preset = selectedAmbiencePreset();
  startNightAudio(seconds, preset);
}

function selectedAmbiencePreset() {
  const id = dom.ambienceSelect?.value || DEFAULT_AMBIENCE_ID;
  return (
    AMBIENT_PRESETS.find((preset) => preset.id === id) ||
    AMBIENT_PRESETS.find((preset) => preset.id === DEFAULT_AMBIENCE_ID) ||
    AMBIENT_PRESETS[0]
  );
}

function startNightAudio(seconds, preset) {
  stopSpeech();
  stopNightAudio();

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    setAudioStatus("Web Audio API is not available in this browser.", true);
    return;
  }

  const context = new AudioContextCtor();
  const master = context.createGain();
  master.gain.value = clamp(preset?.gain ?? 0.22, 0.05, 0.6);
  master.connect(context.destination);

  const engineCleanup = startAmbienceEngine(context, master, preset);
  const stopTimerId = window.setTimeout(() => {
    stopNightAudio();
  }, seconds * 1000);

  state.nightAudio = {
    context,
    stop() {
      window.clearTimeout(stopTimerId);
      try {
        engineCleanup();
      } catch (_) {}
      try {
        context.close();
      } catch (_) {}
    },
  };

  setAudioStatus(`Background audio "${preset.name}" running for ${seconds} seconds.`);
}

function stopNightAudio() {
  if (!state.nightAudio) return;
  state.nightAudio.stop();
  state.nightAudio = null;
  setAudioStatus("Background audio stopped.");
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
      addDroneLayer(context, destination, [38], {
        gain: 0.05,
        type: "sine",
        tremoloHz: 0.05,
      })
    );
    add(
      scheduleFixedEffect(beatMs, () => {
        spawnHeartbeat(context, destination, 0.15);
        window.setTimeout(() => spawnHeartbeat(context, destination, 0.1), 130);
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
    const baseScale = preset.dramatic
      ? [174.61, 220, 261.63, 293.66, 329.63, 261.63, 220]
      : [174.61, 196, 220, 196, 174.61, 146.83];
    let index = 0;
    add(
      addDroneLayer(context, destination, [55, 82], {
        gain: 0.04,
        type: "sine",
        tremoloHz: 0.05,
      })
    );
    add(
      scheduleFixedEffect(ms, () => {
        spawnMelodyNote(context, destination, baseScale[index], {
          gain: preset.dramatic ? 0.12 : 0.09,
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
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(58, now);
  osc.frequency.exponentialRampToValueAtTime(34, now + 0.12);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strength, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + 0.22);
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
  const orientationLines = dom.orientationEnabled.checked
    ? state.scripts.orientation
    : ["Orientation disabled for this session."];

  dom.orientationScript.value = formatScript(orientationLines);
  dom.introScript.value = formatScript(state.scripts.intro);
  dom.dayScript.value = formatScript(state.scripts.day);
  dom.nightScript.value = formatScript(state.scripts.night);
}

function formatScript(lines = []) {
  if (!lines.length) return "Generate a game to create script text.";
  return lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
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

function setAudioStatus(message, isError = false) {
  dom.audioStatus.textContent = message;
  dom.audioStatus.style.color = isError ? "var(--danger)" : "var(--accent-mint)";
}

init();
