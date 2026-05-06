# PRD — SSBU Personal Portfolio Website

|                     |                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **Author**          | Athavan Elangko                                                                                       |
| **Date**            | 2026-05-06                                                                                            |
| **Status**          | Draft v0.2 (post-discovery interview)                                                                 |
| **Companion brief** | [`CLAUDE.md`](./CLAUDE.md) (implementation-level brief)                                               |
| **Inspiration**     | [blairxu13/persona3-website](https://github.com/blairxu13/persona3-website) (study only — not forked) |

> A personal portfolio website that faithfully replicates the **Super Smash Bros. Ultimate** home screen UI, with each menu option mapped to a portfolio section. The execution itself is the value proposition — the site demonstrates PM/TPM craft through how it's built, not just what it lists.

### v0.2 changes (vs. v0.1)

- **Mobile** moves from non-goal to "best-effort responsive in v1."
- **Stack locked**: TypeScript (strict + `noUncheckedIndexedAccess`), CSS Modules, React Router, npm, ESLint + Prettier.
- **Contact backend locked**: Vercel Function + Resend with honeypot spam guard (replaces "Formspree TBD").
- **Hosting locked**: ship on `*.vercel.app`; auto-deploy `main` → prod; public repo from day one; Vercel Analytics.
- **Transitions locked** as full SSBU-style screen-wipe + flash; reduced-motion fallback is crossfade.
- **About page**: stat bars replaced with a **Fighter Info text panel** (no numeric self-rating).
- **Projects scope**: 3 total at launch (Wayfound _In Progress_ + 2 Support Spirits).
- **Build Story format**: patch notes only.
- **New page**: SSBU "Connection Lost" 404.
- **New first-run UX**: "Press Start" splash, gated on keypress/click.
- **New easter egg**: Konami code → palette swap on the home menu.
- **Top risk** is now "visual fidelity won't land," with explicit fidelity-checkpoint mitigation.

---

## 1. Vision & Problem Statement

**Problem.** A standard portfolio (hero section, about, projects, contact) doesn't differentiate. Recruiters skim; hiring managers forget. The author needs an artifact that is memorable on first view, stands up to scrutiny on the second view, and demonstrates product judgment, attention to detail, and execution discipline on the third view.

**Vision.** Replicate the SSBU home screen with enough fidelity that an SSBU player has an immediate "wait, this is a portfolio?" reaction, then re-frame each game-screen as a recruiter-friendly information surface. The site is simultaneously:

- A **functional portfolio** (resume, projects, contact).
- A **case study** in PM/TPM thinking (this PRD, the Build Story page, the project structure).
- A **love letter to SSBU**, in the same vein as the Persona 3 portfolio trend.

**Core thesis.** Fidelity to the source material is the differentiator. A loose "gaming-themed" portfolio is generic; a near-pixel-faithful SSBU replica is unforgettable.

---

## 2. Goals & Non-Goals

### Goals (v1)

1. Faithful visual replication of the SSBU home screen — menu silhouettes, gold/yellow accents, dark galaxy background, signature glow on hover/select.
2. Six navigable sections corresponding to the SSBU menu (Smash, Spirits, Games & More, Vault, Online, + custom Build Story slot).
3. Full SSBU-style screen-wipe + flash transitions between sections; reduced-motion users get a clean crossfade.
4. "Press Start" splash on first interaction.
5. Best-effort responsive layout — desktop is primary, but the site shouldn't shatter on a laptop or tablet viewport.
6. Modular asset architecture so Nintendo IP can be swapped out without restructuring layouts.
7. Deployable on Vercel (`*.vercel.app` for v1; custom domain deferred).
8. Public GitHub repo from day one — commit history is itself a portfolio artifact.

### Non-Goals (v1)

- Mobile-first or fully fluid responsive (best-effort only — see §7).
- Sound effects / audio cues (deferred to v2).
- Backend or database; auth; persistent state (the contact form is a stateless Vercel Function).
- Internationalization, light-mode toggle (the SSBU aesthetic is intentionally dark-only).
- "Newly Unlocked" trophy animation (v1.1 nice-to-have).
- Custom domain (deferred until traffic justifies the purchase).

---

## 3. Success Metrics

### Qualitative

- ≥ 3 SSBU-familiar reviewers respond unprompted that "it feels like the actual game."
- ≥ 2 recruiters / hiring-managers comment on the originality of the format.

### Quantitative

| Metric                               | Target                                   |
| ------------------------------------ | ---------------------------------------- |
| Lighthouse Performance (desktop)     | ≥ 85                                     |
| Largest Contentful Paint             | < 2.5s                                   |
| Time to Interactive                  | < 3.0s                                   |
| Clicks from home → any section       | ≤ 2                                      |
| Resume PDF download events           | tracked via Vercel Analytics from launch |
| Contact form submission success rate | ≥ 95% (excluding honeypot-caught spam)   |

Lighthouse is checked manually at the close of each milestone; no hard CI gate.

---

## 4. Target Audience & Personas

| Persona                          | Job To Be Done                                                                  | Primary Page                     |
| -------------------------------- | ------------------------------------------------------------------------------- | -------------------------------- |
| **Recruiter** (primary)          | "In 30 seconds, can I tell if this person fits the role and grab their resume?" | Vault (Resume)                   |
| **Hiring Manager / Peer PM**     | "Can I see real project work and how this person thinks?"                       | Spirits (Projects) + Build Story |
| **Gamer / SSBU fan** (amplifier) | "This is awesome — who built it?" — shares to network.                          | Home + Build Story               |

Design implication: the **Vault** must be reachable in one click and the resume must be downloadable in one more click. The **Home** must reward gamers enough that they share before bouncing.

---

## 5. Information Architecture

The site is **hub-and-spoke**: Home is the hub; every section returns to Home with a reverse transition. A first-time visitor lands on the **Press Start splash**, then advances to Home on any keypress or click.

| SSBU Menu Item   | Portfolio Section   | Content                                                  |
| ---------------- | ------------------- | -------------------------------------------------------- |
| **Smash**        | About               | Fighter profile card — owner as a playable character     |
| **Spirits**      | Projects            | Project showcase styled as the Spirits collection screen |
| **Games & More** | Skills & Experience | Submenu with expandable categories + experience timeline |
| **Vault**        | Resume              | Archive aesthetic with PDF download                      |
| **Online**       | Contact             | Matchmaking-lobby contact form + social links            |
| **Build Story**  | Build Story         | Behind-the-scenes patch notes + repo link                |

Plus two non-menu surfaces: **Press Start splash** (entry) and **404 / Connection Lost** (error).

---

## 6. Functional Requirements

### 6.0 Press Start Splash (entry surface)

**Purpose.** Set the tone before the user sees anything else.

**Key elements.**

- Full-screen dark galaxy background with the SSBU logo treatment (or original-art equivalent).
- "PRESS START" prompt with a gentle pulsing glow.
- Subtle ambient motion only (star drift); no audio in v1.

**Interactions.**

- Any keypress or click advances to Home with a flash transition.
- No auto-advance — the user must engage.

**Acceptance criteria.**

- [ ] Renders within the LCP budget (<2.5s).
- [ ] Reduced-motion users see a static splash (no pulse, no star drift).
- [ ] Keyboard, mouse, and touch all advance the splash.

---

### 6.1 Home Screen

**Purpose.** Set the tone in under two seconds; route the user to a section.

**Key elements.**

- Center: large character splash (SSBU group artwork or high-quality approximation).
- Left rail: 6 silhouette menu cards with labels.
- Background: dark with subtle CSS-only animated star field.
- Header/footer chrome consistent with SSBU UI typography.

**Interactions.**

- Hover: golden glow border + slight scale/brightness shift on the hovered card.
- Click: SSBU-style screen-wipe + flash transition into the chosen section.
- Keyboard: arrow keys cycle menu cards; Enter activates.
- **Konami code** (↑ ↑ ↓ ↓ ← → ← → B A): triggers a palette swap on the home menu (cycles through SSBU character costume colors). Persists for the session only.

**Acceptance criteria.**

- [ ] All 6 menu cards render with correct silhouettes and labels.
- [ ] Hover glow matches `--ssbu-glow` token; transition speed matches `--ssbu-transition-speed`.
- [ ] Keyboard navigation works without a mouse.
- [ ] Background loads without visible flash of unstyled content.
- [ ] Konami code reliably triggers the palette swap and resets on page reload.

---

### 6.2 Smash → About

**Purpose.** Introduce the owner as the "selected fighter."

**Key elements.**

- Owner photo treated as character splash (silhouette placeholder until photo provided).
- **Fighter Info text panel** (replaces v0.1 stat bars):
  - **Name**
  - **Class** (e.g., "Product Manager · Technical Program Manager")
  - **Universe** (e.g., "University of Utah — M.S. Information Systems")
  - **Series** (e.g., "Banking & Fintech, 8+ years")
  - **Bio** (2–3 sentences)
  - **Specialty** (one-line tagline of the fighter's signature strength)
- Character-select-screen background with subtle animated glow.

**Interactions.**

- Panel reveals on entry (slide-in or text-stagger animation, no hover-to-reveal — recruiters shouldn't hunt for content).
- "Back" returns Home with reverse transition.

**Acceptance criteria.**

- [ ] All copy populated from a single typed content config (`/src/content/fighter.ts`) for easy updates.
- [ ] Reverse transition mirrors entry transition.
- [ ] Panel passes WCAG AA contrast against the character-select background.

---

### 6.3 Spirits → Projects

**Purpose.** Show project work as a discoverable, browsable collection.

**Key elements.**

- Grid of "Spirit" cards — one per project. **Three at launch**: 1 Primary Spirit (Wayfound) + 2 Support Spirits.
- Card fields: project name, type badge (`Primary` / `Support`), status (`In Progress` / `Shipped` / `Concept`), short description, link(s).
- SSBU Spirits chrome: top filter bar, search-style aesthetic (visual only — filtering not required for 3 items).
- **Wayfound** is pinned as the featured Primary Spirit with status `In Progress`.

**Interactions.**

- Hover/expand: card expands to show description + links.
- Click external link: opens GitHub / live demo in a new tab with `rel="noopener noreferrer"`.

**Acceptance criteria.**

- [ ] Wayfound appears first and is visually featured (Primary badge, larger card, glow accent).
- [ ] Each card opens external links in `_blank` with `rel="noopener noreferrer"`.
- [ ] Grid degrades gracefully if a project has no link (button disabled with tooltip).

---

### 6.4 Games & More → Skills & Experience

**Purpose.** Communicate breadth of skills + relevant experience without a wall of text.

**Key elements.**

- Submenu rows with icon + label per skill category: Product Management, Agile/Scrum, Data Analysis, AI/ML Tools, Cloud/Azure, Frontend Basics.
- Expanded row reveals tools/skills within the category.
- Secondary panel: experience timeline styled as a game record/history log (TA role, PM/Scrum, Make Salt Lake Event Chair, Banking & Fintech 8+ yrs).

**Acceptance criteria.**

- [ ] Categories expand/collapse with smooth animation.
- [ ] Only one row expanded at a time (accordion behavior).
- [ ] Timeline scrolls independently of the category list.

---

### 6.5 Vault → Resume

**Purpose.** Make the resume scannable on-screen and downloadable in one click.

**Key elements.**

- Trophy-case / archive layout.
- Sections: Education, Experience, Certifications (AZ-900 ✅, AZ-104 in progress), Skills.
- Prominent **Download PDF** button styled as an SSBU unlock/claim button.
- _Optional v1.1_: "Newly Unlocked" trophy animation on first visit.

**Acceptance criteria.**

- [ ] Resume PDF lives at `/public/resume.pdf` and downloads on click.
- [ ] Download fires a Vercel Analytics custom event (`resume_download`).
- [ ] All certifications visible above the fold on a 1080p screen.

---

### 6.6 Online → Contact

**Purpose.** Convert intent into a message or social connection.

**Key elements.**

- Form styled as a "Send a Battle Request":
  - **Fighter Tag** (Name)
  - **Home Stage** (Email)
  - **Message to Challenger** (Message)
  - **Hidden honeypot field** (`website` — bots fill it; real users don't).
- Submit posts to a Vercel Function that calls **Resend** to email the owner.
- Submit button: "Send Request" with matchmaking-style submit animation (matchmaking spinner → "Match Found" success state).
- Direct social links: LinkedIn, GitHub, Email — styled as platform/region select icons.

**Acceptance criteria.**

- [ ] Submissions with a non-empty honeypot are silently dropped (still return 200 to avoid signaling bots).
- [ ] Validation errors display inline using SSBU UI styling (red glow on the offending field).
- [ ] Social links open in a new tab with `rel="noopener noreferrer"`.
- [ ] Resend API key is read from `RESEND_API_KEY` env var; never committed.

---

### 6.7 Build Story

**Purpose.** Make the meta-narrative explicit. This page is itself a portfolio artifact.

**Key elements.**

- Format: SSBU-style **patch notes only** (no essay above the list).
- Each entry: version label (e.g., `v0.1`), date, bullet list of changes.
- Public link to the GitHub repo.

**Acceptance criteria.**

- [ ] At least 3 versioned entries by launch (v0.1 scaffolding → v0.x mid-build → v1.0 ship).
- [ ] Repo link is correct, public, and live.
- [ ] Page reads top-down newest-first.

---

### 6.8 404 → "Connection Lost" Lobby

**Purpose.** Stay in character even when something breaks.

**Key elements.**

- SSBU-style "Lost connection to the host" lobby screen.
- Single CTA button: "Return to Home."
- Same dark-galaxy background as the rest of the site.

**Acceptance criteria.**

- [ ] Triggered for any unmatched route.
- [ ] Returns HTTP 404 (not soft-404).
- [ ] CTA navigates to Home with a standard transition.

---

## 7. Non-Functional Requirements

### Performance

- CSS-first animation; reach for JS only when CSS cannot express the effect.
- Background is **CSS-only animated stars** (no canvas, no video).
- Lazy-load heavy artwork below the fold.
- Image budget: every Nintendo asset compressed to WebP/AVIF where possible.
- Lighthouse measured at the close of each milestone; targets in §3 are **soft goals**, not build blockers.

### Accessibility

- Full keyboard navigation across menu and forms.
- Visible focus states (gold outline) on every interactive element.
- All Nintendo art has descriptive `alt` text.
- `prefers-reduced-motion`: replace screen-wipe + flash with a clean **crossfade**; freeze the star drift; disable splash pulse.
- Color contrast ≥ WCAG AA against the dark background.
- Screen reader spot-check before launch (not full AAA audit).

### Compatibility & Responsive Behavior

- Latest evergreen desktop browsers: Chrome, Edge, Firefox, Safari.
- **Best-effort responsive**: layouts shrink reasonably on tablets and small laptops; no separate mobile redesign.
- Below ~768px the site degrades to a simplified single-column layout that prioritizes Vault (resume) and Online (contact). A full mobile experience is v2.

### Copyright / IP

- All Nintendo-sourced assets isolated under `/src/assets/nintendo/`.
- Layout must remain functional after a complete asset swap to original art.
- No Nintendo audio is used.

---

## 8. Design System

### Tokens (verbatim from CLAUDE.md)

```css
:root {
  --ssbu-bg-primary: #0a0a1a;
  --ssbu-bg-panel: #12122a;
  --ssbu-gold: #f5c518;
  --ssbu-gold-light: #ffe066;
  --ssbu-red: #cc2200;
  --ssbu-blue: #1a4fff;
  --ssbu-white: #ffffff;
  --ssbu-glow: 0 0 16px rgba(245, 197, 24, 0.7);
  --ssbu-font-display: 'Rajdhani', 'Bebas Neue', sans-serif;
  --ssbu-font-body: 'Exo 2', sans-serif;
  --ssbu-transition-speed: 180ms;
}
```

### Typography rationale

- **Display**: Rajdhani / Bebas Neue — closest free approximations of SSBU's wide, bold display typeface.
- **Body**: Exo 2 — geometric, slightly futuristic, pairs cleanly with Rajdhani at body sizes.
- All three are available via Google Fonts — no licensing risk.

### Copy tone

Balanced hybrid: SSBU framing on UI labels (Fighter Tag, Battle Request, Spirit, Vault) and section names; professional, recruiter-readable tone for the actual content (bio, project descriptions, resume).

---

## 9. Technical Approach

| Concern         | Choice                                                      | Notes                                                                                                |
| --------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Framework       | React + Vite                                                | Fast dev loop, simple Vercel build.                                                                  |
| Language        | **TypeScript**, `strict: true` + `noUncheckedIndexedAccess` | Maximum safety; signals craft on a public repo.                                                      |
| Styling         | **CSS Modules**                                             | Co-located, full control over keyframes/gradients/blend modes. Best for pixel-perfect SSBU chrome.   |
| Animation       | Framer Motion                                               | Page transitions, hover/glow, accordion expand, splash pulse.                                        |
| Routing         | **React Router v6/v7**                                      | 6 routes + 404 + splash; hub-and-spoke.                                                              |
| Package manager | **npm**                                                     | Default, portable.                                                                                   |
| Lint / format   | **ESLint + Prettier**                                       | Industry standard, well-integrated with TS.                                                          |
| Hosting         | Vercel                                                      | GitHub-connected; **auto-deploy `main` → prod**; preview deploys per branch.                         |
| Domain          | `*.vercel.app` for v1                                       | Custom domain deferred.                                                                              |
| Form backend    | **Vercel Function + Resend**                                | Stateless; honeypot for spam. `RESEND_API_KEY` env var.                                              |
| Analytics       | **Vercel Analytics**                                        | Built-in; tracks `resume_download` and section views.                                                |
| Repo visibility | **Public from day one**                                     | Commit history is part of the portfolio.                                                             |
| Bootstrap       | Build fresh; study persona3-website for inspiration only    | Persona3 is Next.js — different stack; clean Vite scaffold avoids inheriting their patterns.         |
| Testing         | **Playwright visual regression on Home + About**            | Snapshot the highest-fidelity pages so styling regressions are caught. No unit-test coverage target. |
| SEO / OG        | Custom OG image + per-page meta titles/descriptions         | Designed share-card image in SSBU style.                                                             |

The repo follows the structure outlined in `CLAUDE.md` §"File Structure (suggested)", with `.tsx`/`.ts` extensions in place of `.jsx`/`.js`.

---

## 10. Build Sequence / Milestones

| ID     | Milestone                        | Output                                                                                                                    |
| ------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **M0** | Project scaffolding & repo setup | Vite + React + TS scaffold, design tokens, ESLint/Prettier, public GitHub repo, Vercel link, auto-deploy wired            |
| **M1** | Press Start splash + Home screen | Splash, static menu, CSS-only stars background, design tokens applied                                                     |
| **M2** | Smash / About                    | Fighter Info text panel + entry animation                                                                                 |
| **M3** | Spirits / Projects               | Spirit grid (3 cards), Wayfound featured                                                                                  |
| **M4** | Games & More + Vault             | Skills accordion + Resume archive + PDF download + analytics event                                                        |
| **M5** | Online + Build Story + 404       | Vercel Function + Resend wired; Battle Request form; Patch notes page; Connection Lost 404                                |
| **M6** | Transitions, easter egg & polish | Framer Motion screen-wipe transitions, glow tuning, asset compression, Konami code palette swap                           |
| **M7** | Launch readiness                 | Accessibility audit, reduced-motion verification, Lighthouse pass, custom OG image, Playwright visual regression baseline |

**Sequencing note.** M0 → M1 are strictly serial. **M2–M5 may be parallelized within a single session** when scope allows (e.g., Vault and Online share layout primitives — pair them in one push). M6 and M7 must run after the page work is complete.

---

## 11. Risks & Mitigations

| Risk                                                | Likelihood | Impact                                    | Mitigation                                                                                                                                                                                                                             |
| --------------------------------------------------- | ---------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual fidelity won't land** (top concern)        | Medium     | **High** — kills the whole differentiator | At each milestone, pin a side-by-side reference screenshot from the actual game next to the WIP page; require the WIP to read as "the same screen" before the milestone closes. Solicit two SSBU-familiar reviewers between M5 and M7. |
| Nintendo IP take-down / legal concern               | Low        | High                                      | Isolate assets under `/src/assets/nintendo/`; have fallback original art ready; respond fast to any takedown.                                                                                                                          |
| Screen-wipe transitions hurt Lighthouse             | Medium     | Medium                                    | Enforce CSS-first rule for the wipe; cap Framer Motion to the route shell, not page contents; measure perf each milestone.                                                                                                             |
| Scope creep on transitions / micro-animation        | High       | Medium                                    | Lock a transition catalog at the start of M6; defer everything not on the catalog to v1.1.                                                                                                                                             |
| Solo build, nights-and-weekends pace                | High       | Medium                                    | Ship-on-`vercel.app`, defer custom domain; defer audio and trophy unlocks; freeze PRD scope until M7.                                                                                                                                  |
| High-res SSBU artwork hard to source legitimately   | Medium     | Medium                                    | Plan A: official Nintendo press kit. Plan B: licensed fan art with attribution. Plan C: commissioned original.                                                                                                                         |
| Real content (resume, projects) not ready at launch | Medium     | Medium                                    | Page chrome ships against typed placeholder content; swap in real content via the central content config without code changes.                                                                                                         |
| Resume PDF goes stale                               | Low        | Low                                       | Show "Last updated" date in the Vault footer.                                                                                                                                                                                          |

---

## 12. Content Inputs Needed (TODO checklist)

Owner-supplied items that block launch if missing. Tracked here, not in code:

- [ ] Owner's full display name
- [ ] Owner photo for the fighter splash (silhouette placeholder used until provided)
- [ ] 2–3 sentence bio
- [ ] Fighter Info "Specialty" tagline (one line)
- [ ] 2 Support Spirits — name, status, description, links (Wayfound is set)
- [ ] Skills taxonomy per Games & More category (PM, Agile/Scrum, Data, AI/ML, Cloud/Azure, Frontend)
- [ ] Experience timeline entries (TA role, PM/Scrum, Make Salt Lake Event Chair, Banking & Fintech 8+ yrs)
- [ ] Certifications list (AZ-900 done; AZ-104 in progress; others?)
- [ ] Final resume PDF dropped at `/public/resume.pdf`
- [ ] Contact endpoints: LinkedIn URL, GitHub URL, email (recipient for Resend)
- [ ] OG share-card image (designed in M7)

---

## 13. Open Questions

1. **SSBU artwork sourcing** — official press kit, licensed fan art, or commissioned original? (Decision needed by M1.)
2. **Konami palette set** — which SSBU character costume colors to cycle through? (Decision needed by M6.)
3. **OG card design** — single static image, or per-page variants? (Decision needed by M7.)
4. **Custom domain trigger** — what level of traffic / outreach justifies purchasing one? (Open through v1.x.)

---

## 14. Out of Scope (v1)

- Mobile-first or fully fluid responsive layout _(stretch goal for v2; v1 is best-effort only)_.
- Sound effects / audio cues.
- Backend / database / user accounts / persistent state.
- Internationalization.
- Light-mode toggle (the design is intentionally dark).
- "Newly Unlocked" trophy animation on first visit _(nice-to-have for v1.1)_.
- Custom domain _(deferred until traffic justifies it)_.
- Hard-cap performance budget enforced in CI _(soft targets only in v1)_.

---

## 15. Appendix

### Reference Links

- Implementation brief: [`CLAUDE.md`](./CLAUDE.md)
- Inspiration repo (study only): [blairxu13/persona3-website](https://github.com/blairxu13/persona3-website)

### Glossary — SSBU term → Portfolio meaning

| SSBU Term           | Portfolio Meaning                                                                       |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Fighter**         | The owner, presented as a playable character on the About page.                         |
| **Spirit**          | A project. Primary Spirit = major project (Wayfound); Support Spirit = smaller project. |
| **Vault**           | The Resume page / archive.                                                              |
| **Stage**           | Used in Contact form microcopy ("Home Stage" = email field).                            |
| **Battle Request**  | A submitted contact-form message.                                                       |
| **Patch Notes**     | The Build Story page format.                                                            |
| **Connection Lost** | The 404 page framing.                                                                   |
| **Press Start**     | The splash gating first-time entry.                                                     |
