# Zombie Leaders Control App

Local browser app to run the Zombie Leaders game flow:

- Randomly assign up to 24 players into:
  - `1-4` Zombie Leaders (who know each other)
  - Remaining Organizational Citizens (with optional special roles)
- Configure player count directly (with optional name list; missing names auto-fill as `Player 1..N`)
- Reveal each role card privately on demand
- Generate role-aware scripts for:
  - Orientation (optional for first-time players)
  - Introduction
  - Day sequence
- Play scripts as spoken audio using browser text-to-speech
  - `Recommended` voice mode filters to stable local English voices first
  - Defaults to `Daniel` voice when available
  - Includes a voice test button and adjustable voice speed/pitch
- Run a generated zombie-sound night ambience to mask player noise
  - Includes 20 selectable background soundscapes (wind, rain, melody, industrial, zombie, etc.)

## Run

1. Open `/Users/uqnsteff/Library/CloudStorage/OneDrive-TheUniversityofQueensland/01_UQ/02_Studies & Projects/11_Alex Zombie Leadership/01_Instructions/index.html` in a browser.
2. Enter player names.
3. Set Zombie Leader count (`1-4`).
4. Select which special citizen roles are in this game (default is none selected).
5. Click **Generate Game**.
6. Use **Secret Role Cards** and **Audio Director** controls to run the session.

## Notes

- Role scripts automatically change based on which special roles are actually assigned.
- The night sequence audio is synthesized in-browser (Web Audio API), so no external files are required.
- Speech playback uses browser support for `speechSynthesis` and installed voices.
- Local JS check command (portable Node installed in workspace): `./.tools/node/bin/node --check app.js`
