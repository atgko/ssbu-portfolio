# Improvements Backlog

Running tracker for iterative improvements across the SSBU portfolio. Items move from **Open → In Progress → Done**. Add new items under the appropriate section as they come up; do not delete done items so the history is preserved.

Format per item: short title, what to change, source / when it was raised. Use checkboxes so progress is scannable.

---

## In Progress

_(none — promote items here when actively being worked on)_

---

## Open

### Home screen / global

- [ ] **Smash icon SVG is hand-drawn approximation.** Cross-arrow geometry is rough — redraw against an actual SSBU smash-logo reference (or swap to a licensed/original icon) if a closer match is wanted. _Source: 2026-05-06 round 2, partial fix only — still unresolved as of 2026-05-11._

### Projects page

_(no open items)_

### Skills page

- [ ] **Experience timeline is missing the TA and event-chair roles.** CLAUDE.md spec calls out "teaching assistant role" and "Make Salt Lake Event Chair" in the Games & More section. Neither appears in `EXPERIENCE` in `Skills.tsx`. Add entries when ready. _Source: CLAUDE.md spec vs. code audit 2026-05-11._

### Resume / Contact — time-sensitive

- [ ] **"Available Jan 2027" will go stale.** The Contact page player card and the MobileGate back-face both hard-code "Available Jan 2027". Update when the date passes or circumstances change. _Source: code audit 2026-05-11._

- [ ] **AZ-900 cert status is "In Progress".** Both `Resume.tsx` and `Skills.tsx` show AZ-900 as In Progress. Flip to Earned (+ add year) once the cert is held. _Source: code audit 2026-05-11._

- [ ] **Resume PDF freshness.** `/public/resume.pdf` is a static file — it will drift from reality over time. Drop an updated PDF into `public/` after each significant career change. _Source: code audit 2026-05-11._

### Meta / SEO

- [ ] **Verify OG / social-sharing meta tags.** `public/og-preview.png` exists but confirm `index.html` has the correct `<meta property="og:image">`, `og:title`, `og:description`, `twitter:card` tags wired up. _Source: code audit 2026-05-11._

---

## Done

### 2026-05-11 — Round 5+ (all pages shipped; 5-tile layout restored)

> **Note:** Round 4's 4-tile layout (Skills+Resume merged, Build Story dropped) was superseded. The grid reverted to the current **5-tile** layout: Smash / Spirits on the left column; Games, Vault, Online stacked in the right column. Skills and Resume are separate tiles again. The "confirm Skills naming" and "/resume & /build-story routes" open items from round 4 are resolved by this reversion.

- [x] **5-tile layout restored.** `grid-template-areas` in `HomeMenu.module.css` has `smash`, `spirits`, `games`, `vault`, `online` — 5 distinct areas. Keyboard `NAV` map covers indices 0–4. _File: `HomeMenu.module.css`, `HomeMenu.tsx`._
- [x] **Vault / Resume tile is its own page.** `/resume` route resolves to the full Archive screen (Experience, Education, Certifications, Skills tabs + Download PDF button). _File: `Resume.tsx`, `App.tsx`._
- [x] **Build Story accessible via Projects spirit.** `/build-story` route is a full Patch Notes page; it is linked from the SSBU Portfolio spirit card in the Projects grid (`buildStoryUrl: '/build-story'`). _File: `BuildStory.tsx`, `Projects.tsx`._
- [x] **Audio system implemented.** `audioManager.ts` — Web Audio API with `HTMLAudioElement` fallback; navigation effects (forward/back/break), SSBU background music, Melee theme, effect preloading. _File: `src/audio/audioManager.ts`._
- [x] **Melee Easter egg.** Secret combo L → R → A → Space toggles `data-theme="melee"` on `<html>`, swaps audio theme, and shows a toast notification. _File: `App.tsx`, `hooks/useSecretCombo.ts`._
- [x] **Mobile gate as interactive flip card.** Replaced "desktop only" static screen with a 3-D flip card: front shows fighter photo / name / title; back shows bio, meta, stat bars, LinkedIn/Email/GitHub links. _File: `MobileGate.tsx`, `MobileGate.module.css`._
- [x] **Screen flash on tile click.** Each home tile flashes white for 160 ms before navigating. _File: `HomeMenu.tsx`, `HomeMenu.module.css`._
- [x] **404 page styled as Nintendo Switch error screen.** `/src/pages/NotFound.tsx` + `NotFound.module.css`. _Files: `NotFound.tsx`, `NotFound.module.css`._
- [x] **Contact form wired to Formspree with honeypot.** `Contact.tsx` posts JSON to Formspree; hidden `_gotcha` field silently drops bot submissions. _File: `Contact.tsx`._
- [x] **All 6 portfolio pages shipped.** About (Fighter Select), Projects (Spirit Collection), Skills (Games & More), Resume (Archive/Vault), Contact (Online lobby), Build Story (Patch Notes) — all routes live. _Files: `About.tsx`, `Projects.tsx`, `Skills.tsx`, `Resume.tsx`, `Contact.tsx`, `BuildStory.tsx`._
- [x] **Build Story intro narrative added.** "About This Build" section with four narrative paragraphs, live site + GitHub links, desktop note, and Melee Easter egg PS — inserted before the Version History patch log. _File: `BuildStory.tsx`, `BuildStory.module.css`._
- [x] **GitHub links wired for Wayfound and SSBU Portfolio spirits.** `wayfound: 'https://github.com/atgko/wayfound'`, `ssbu-portfolio: 'https://github.com/atgko/ssbu-portfolio'`. _File: `Projects.tsx`._
- [x] **AI Tools & Prompting skill category added to Skills page.** `Intermediate · 2+` yrs; skills: Claude / Claude Code, Prompt Engineering, ChatGPT / GPT-4, Cursor, AI-assisted Workflows. _File: `Skills.tsx`._
- [x] **Sort & filter buttons wired on Projects page.** Sort cycles Status → Power↓ → Power↑ → Name A–Z; Filter cycles all → Shipped → In Progress → Coming Soon. _File: `Projects.tsx`._
- [x] **Contact page player card, matchmaking bar, rules bar, and platform cards.** Full Online lobby aesthetic with "Searching for Opponent…" pulse, preferred-rules chips, LinkedIn/Email/GitHub/Location cards. _File: `Contact.tsx`._

---

### 2026-05-06 — Home screen fidelity round 4

_(Note: superseded by round 5 — the 4-tile merge was reverted to 5 tiles.)_

- [x] **Tiles fused down to 4 — later reverted.** Skills and Resume were briefly merged; Build Story tile was dropped. Both were undone in a subsequent session. _Superseded._
- [x] **White ring is now thick + constant; no protrusion past its outer edge.** Ring grew from `5 px` → `14 px` border on `.centerSplash`. Old `.tab` removed. _File: `HomeMenu.module.css`._
- [x] **Active tile shrinks toward its outer corner.** Per-tile `transform-origin` plus `scale(0.96)` on active state. _File: `HomeMenu.module.css`._
- [x] **White bulge + black arrow stay inside the ring's white area.** `.bulge` straddles ring's outer edge; `.arrowTip` is a black triangle inside the bulge. Both ride the rotating `.arrowOrbit`. _File: `HomeMenu.module.css`, `HomeMenu.tsx`._
- [x] **Arrow angles re-derived for layout geometry.** _File: `menu.ts`._

---

### 2026-05-06 — Home screen fidelity round 3

- [x] **Layout matches the 5-block SSBU reference.** (Superseded by round 4's 4-block layout, then restored by round 5.) _File: `HomeMenu.module.css`._
- [x] **Build Story moved to a corner shortcut.** (Superseded by round 4 — Build dropped; now a full page at `/build-story`.) _File: `HomeMenu.module.css`._
- [x] **Tiles renamed to portfolio section names.** Tiles show `About / Projects / Skills / Resume / Contact`. _File: `HomeMenu.tsx`._
- [x] **Icon + label centering biased away from the central circle.** Per-tile `--justify` / `--align` / `--pad` CSS variables. _File: `HomeMenu.module.css`._
- [x] **Center splash sized to touch all tiles.** _File: `HomeMenu.module.css`._
- [x] **Hover arrow rotates with the active tile.** Driven by `--arrow-angle` per active tile. _Files: `HomeMenu.tsx`, `HomeMenu.module.css`._
- [x] **Keyboard nav uses a per-tile neighbor map.** _File: `HomeMenu.tsx`._

---

### 2026-05-06 — Home screen fidelity round 2

- [x] **Splash text no longer clashes with the menu.** PressStart overlay has radial dark backdrop + `backdrop-filter: blur(10px) saturate(0.6)`. _File: `PressStart.module.css`._
- [x] **Tile icons light up on hover / focus / active.** _File: `HomeMenu.module.css`._
- [x] **Icons mirror the SSBU reference more closely.** _File: `HomeMenu.tsx`._

---

### 2026-05-06 — M1 baseline

- [x] **Press Start splash + sessionStorage gate, animated stars, tile menu, top/bottom Switch bars, live clock.** Initial M1 implementation. _Files: `StarsBackground/`, `PressStart/`, `HomeMenu/`, `Home.*`._
