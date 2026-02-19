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
  name: "Organizational Citizen",
  summary: "Use discussion and voting to identify Zombie Leaders.",
  introCue: "You have no special ability, but your voice and vote matter every day.",
  dayCue: "Speak clearly, track contradictions, and vote with intent.",
};

const CITIZEN_ROLES = [
  {
    id: "ethics-officer",
    name: "Ethics Officer",
    summary: "Can call one integrity check during the day.",
    introCue: "You may call one integrity check each game: ask a player to explain a suspicious claim.",
    dayCue: "Ethics Officer, decide if this is the day to use your integrity check.",
  },
  {
    id: "whistleblower",
    name: "Whistleblower",
    summary: "Publicly flags one behavioral red flag per day.",
    introCue: "Once per day, publicly highlight one red flag in behavior or logic.",
    dayCue: "Whistleblower, if needed, call out one red flag now.",
  },
  {
    id: "risk-auditor",
    name: "Risk Auditor",
    summary: "Tracks elimination patterns and motive chains.",
    introCue: "Document who benefits from each elimination and report your risk map during the day.",
    dayCue: "Risk Auditor, share your latest motive chain before voting.",
  },
  {
    id: "security-guardian",
    name: "Security Guardian",
    summary: "Quietly chooses one player to protect each night.",
    introCue: "Each night, choose one player to protect from Zombie elimination.",
    dayCue: "Security Guardian, avoid exposing your identity while guiding the discussion.",
  },
  {
    id: "team-medic",
    name: "Team Medic",
    summary: "Can stabilize one eliminated citizen once per game.",
    introCue: "You may use one stabilization charge per game to reverse a fresh citizen elimination, if rules permit.",
    dayCue: "Team Medic, decide whether to hold or use your stabilization power.",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    summary: "Builds evidence from statement consistency.",
    introCue: "Track statement changes and summarize inconsistencies before the vote.",
    dayCue: "Data Analyst, present your consistency findings now.",
  },
  {
    id: "culture-coach",
    name: "Culture Coach",
    summary: "Steadies heated debates and improves signal quality.",
    introCue: "If discussions get chaotic, reset the group by asking for evidence-only responses.",
    dayCue: "Culture Coach, reset the room if the discussion loses clarity.",
  },
  {
    id: "legal-advisor",
    name: "Legal Advisor",
    summary: "Clarifies procedural fairness and voting rules.",
    introCue: "You are the rules memory for fair process. Clarify procedural confusion quickly.",
    dayCue: "Legal Advisor, confirm the vote process before ballots are cast.",
  },
  {
    id: "operations-chief",
    name: "Operations Chief",
    summary: "Keeps day discussions moving on schedule.",
    introCue: "Keep the group focused and make sure each player is heard before voting.",
    dayCue: "Operations Chief, drive the room toward a timely decision.",
  },
  {
    id: "networker",
    name: "Networker",
    summary: "Connects isolated players into the discussion.",
    introCue: "Pull in quiet players and compare their logic with louder voices.",
    dayCue: "Networker, invite at least two quiet voices into this round.",
  },
  {
    id: "mentor",
    name: "Mentor",
    summary: "Supports uncertain players to avoid panic voting.",
    introCue: "Help uncertain players reason through evidence before they vote.",
    dayCue: "Mentor, ask one hesitant player to explain their logic.",
  },
  {
    id: "strategist",
    name: "Strategist",
    summary: "Maps likely zombie coordination patterns.",
    introCue: "Identify potential alliances and suspicious vote blocs.",
    dayCue: "Strategist, share your current alliance map and top suspects.",
  },
  {
    id: "archivist",
    name: "Archivist",
    summary: "Maintains a clean timeline of claims and events.",
    introCue: "Record key statements and replay them during contradictions.",
    dayCue: "Archivist, recap the timeline before the vote.",
  },
  {
    id: "finance-sentinel",
    name: "Finance Sentinel",
    summary: "Follows resource and incentive logic.",
    introCue: "Ask who gains power or cover from each decision.",
    dayCue: "Finance Sentinel, present who benefits from today's choices.",
  },
  {
    id: "innovation-catalyst",
    name: "Innovation Catalyst",
    summary: "Proposes unconventional tests to expose zombies.",
    introCue: "Create one creative challenge to test alignment without breaking rules.",
    dayCue: "Innovation Catalyst, propose one fresh test before voting.",
  },
  {
    id: "morale-builder",
    name: "Morale Builder",
    summary: "Prevents fear-driven group collapse.",
    introCue: "Keep confidence high and discourage emotional pile-ons.",
    dayCue: "Morale Builder, recentre the team before final discussion.",
  },
  {
    id: "negotiator",
    name: "Negotiator",
    summary: "De-escalates deadlocks and extracts clear commitments.",
    introCue: "When factions split, extract concrete commitments from both sides.",
    dayCue: "Negotiator, break any deadlock with clear commitments.",
  },
  {
    id: "process-optimizer",
    name: "Process Optimizer",
    summary: "Improves meeting structure for better decisions.",
    introCue: "Suggest tighter turn-taking and evidence-first speaking order.",
    dayCue: "Process Optimizer, tighten the flow before final votes.",
  },
  {
    id: "comms-lead",
    name: "Communications Lead",
    summary: "Translates complex evidence into clear language.",
    introCue: "Summarize confusing arguments so everyone can evaluate them.",
    dayCue: "Communications Lead, deliver a clear summary now.",
  },
  {
    id: "forensics-specialist",
    name: "Forensics Specialist",
    summary: "Looks for subtle tells in wording and timing.",
    introCue: "Observe speech patterns and timing shifts for hidden coordination.",
    dayCue: "Forensics Specialist, report your strongest behavioral signal.",
  },
];

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
  selectAllRoles: document.getElementById("select-all-roles"),
  clearAllRoles: document.getElementById("clear-all-roles"),
  generateGame: document.getElementById("generate-game"),
  setupStatus: document.getElementById("setup-status"),
  gameSummary: document.getElementById("game-summary"),
  cardsGrid: document.getElementById("cards-grid"),
  hideAllCards: document.getElementById("hide-all-cards"),
  orientationEnabled: document.getElementById("orientation-enabled"),
  playOrientation: document.getElementById("play-orientation"),
  playIntro: document.getElementById("play-intro"),
  playDay: document.getElementById("play-day"),
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
};

const state = {
  assignments: [],
  activeRoles: [],
  scripts: { orientation: [], intro: [], day: [] },
  voices: [],
  voiceMap: new Map(),
  nightAudio: null,
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
  dom.hideAllCards.addEventListener("click", hideAllCards);
  dom.playOrientation.addEventListener("click", () => playScript("orientation"));
  dom.playIntro.addEventListener("click", () => playScript("intro"));
  dom.playDay.addEventListener("click", () => playScript("day"));
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
          <input type="checkbox" value="${role.id}">
          <span>
            <span class="role-title">${role.name}</span>
            <span class="role-summary">${role.summary}</span>
          </span>
        </label>
      </div>
    `;
  }).join("");
  dom.rolesGrid.innerHTML = html;
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

  const validation = validateSetup(providedNames, requestedCount, zombieCount);
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

function validateSetup(providedNames, requestedCount, zombieCount) {
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
  return { ok: true };
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

  const rolePool = shuffle(selectedRoles);
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
  const totalPlayers = assignments.length;
  const zombies = assignments.filter((a) => a.team === "zombie").length;
  const citizens = totalPlayers - zombies;
  const roleNames = activeRoles.map((r) => r.name);

  const orientation = [
    "Welcome to Zombie Leaders.",
    `In this game, ${zombies} Zombie Leaders are hidden among ${citizens} Organizational Citizens.`,
    "Zombie Leaders coordinate at night to eliminate citizens while hiding their identity during the day.",
    "Citizens collaborate in daylight discussions to identify and remove all Zombie Leaders.",
    "All roles are secret. Persuasion, careful listening, and evidence-based voting decide the game.",
  ];

  if (roleNames.length) {
    orientation.push(
      `Special citizen roles in this game are: ${naturalList(roleNames)}.`
    );
    orientation.push(
      "If you have a special role, use it to increase clarity without revealing yourself too early."
    );
  } else {
    orientation.push(
      "No special citizen roles are active this round. Citizens win through collective reasoning alone."
    );
  }

  const intro = [
    `Game start. Total players: ${totalPlayers}. Zombie Leaders in play: ${zombies}.`,
    "Everyone receives a secret role card now. Read it silently and keep your role hidden.",
    "Zombie Leaders: remember your allies and coordinate subtly.",
    "Citizens: do not rely on certainty. Build consensus from behavior, statements, and voting patterns.",
  ];

  if (activeRoles.length) {
    intro.push("Special role reminders:");
    activeRoles.forEach((role) => {
      intro.push(`${role.name}: ${trimDuplicatedRoleName(role.name, role.introCue)}`);
    });
  }

  intro.push("Night will begin after this introduction. Follow facilitator instructions closely.");

  const day = [
    "Day sequence begins. Everyone opens their eyes.",
    "Discuss the previous night, identify contradictions, and test suspicious claims.",
    "Each player should speak before voting begins.",
  ];

  if (activeRoles.length) {
    day.push("Special role prompts:");
    activeRoles.forEach((role) => {
      day.push(`${role.name}: ${trimDuplicatedRoleName(role.name, role.dayCue)}`);
    });
  }

  day.push("Facilitator: call for final statements, then conduct a vote to remove one suspect.");
  day.push("If all Zombie Leaders are eliminated, Citizens win. If zombies equal or outnumber citizens, zombies win.");

  return { orientation, intro, day };
}

function buildFallbackScripts() {
  return {
    orientation: [
      "Welcome to Zombie Leaders.",
      "Role cards are secret. Some players may be Zombie Leaders and others Organizational Citizens.",
      "Zombie Leaders work together in hidden night phases; citizens collaborate in day phases to identify them.",
      "Use logic, patterns, and discussion to protect your team.",
    ],
    intro: [
      "Game introduction begins.",
      "Distribute role cards, ask players to read silently, and keep roles hidden.",
      "Zombie Leaders should identify each other quietly at the facilitator's signal.",
      "Citizens should focus on evidence and voting behavior.",
    ],
    day: [
      "Day sequence begins.",
      "Open discussion: everyone should contribute before voting.",
      "Facilitator calls final statements and one elimination vote.",
      "Repeat day and night rounds until one team is eliminated.",
    ],
  };
}

function trimDuplicatedRoleName(roleName, cue) {
  const rawCue = String(cue || "").trim();
  if (!roleName || !rawCue) return rawCue;
  const escapedRole = escapeRegExp(String(roleName).trim());
  const duplicatePrefix = new RegExp(`^${escapedRole}(?:\\s*[:,-]\\s*|\\s+)`, "i");
  const cleanedCue = rawCue.replace(duplicatePrefix, "").trim();
  return cleanedCue || rawCue;
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

function renderCards() {
  const html = state.assignments
    .map((entry, index) => {
      return `
        <article class="card" data-index="${index}">
          <div class="card-header">
            <h3>${escapeHtml(entry.player)}</h3>
            <span class="badge hidden">Hidden</span>
          </div>
          <div class="card-details">
            <p><strong>Team:</strong> ${entry.team === "zombie" ? "Zombie Leaders" : "Organizational Citizens"}</p>
            <p><strong>Role:</strong> ${escapeHtml(entry.role.name)}</p>
            <p>${escapeHtml(entry.role.summary)}</p>
            ${
              entry.team === "zombie"
                ? `<p><strong>Zombie Allies:</strong> ${escapeHtml(
                    entry.allies.length ? naturalList(entry.allies) : "No allies"
                  )}</p>`
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

function populateVoiceList() {
  if (!window.speechSynthesis) {
    dom.voiceSelect.innerHTML = `<option value="">Speech not supported</option>`;
    dom.voiceMode.disabled = true;
    dom.testVoice.disabled = true;
    dom.resetVoice.disabled = true;
    dom.playOrientation.disabled = true;
    dom.playIntro.disabled = true;
    dom.playDay.disabled = true;
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
  const chosenVoice = selectedVoice();
  const rate = Number(dom.voiceRate.value);
  const pitch = Number(dom.voicePitch.value);
  let currentLine = 0;
  let useFallbackVoice = false;

  const speakNext = () => {
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
      setAudioStatus(
        `${capitalize(typeLabel)}: line ${currentLine + 1} of ${lines.length}`
      );
    };
    utterance.onerror = (event) => {
      const errorName = event?.error || "unknown";
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
      currentLine += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  speakNext();
}

function stopSpeech() {
  if (window.speechSynthesis?.speaking) {
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
