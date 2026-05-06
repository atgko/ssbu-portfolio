# CLAUDE.md — SSBU Personal Portfolio Website

## Project Overview

Build a personal portfolio website that faithfully replicates the **Super Smash Bros. Ultimate home screen UI**, with each menu option mapped to a section of the portfolio. The goal is maximum visual fidelity to the source material — this is a love letter to SSBU, not just a loose "inspired by" theme. Think of the Persona 3 portfolio trend as a direct reference point for the level of authenticity to aim for.

The site will be deployed on **Vercel** and eventually served from a custom domain. The inspiration comes from this Persona 3 build: https://github.com/blairxu13/persona3-website

---

## Navigation Structure

The SSBU home screen has 6 menu options. Each maps to a portfolio section:

| SSBU Menu Item    | Portfolio Section   | Content                                                                  |
| ----------------- | ------------------- | ------------------------------------------------------------------------ |
| **Smash**         | About               | Fighter profile card — the owner as a playable character                 |
| **Spirits**       | Projects            | Project showcase styled as the Spirits collection screen                 |
| **Games & More**  | Skills & Experience | Skills/experience styled as the Games & More submenu                     |
| **Vault**         | Resume              | Resume styled as the Vault archive screen                                |
| **Online**        | Contact             | Contact page styled as the Online/matchmaking lobby                      |
| **[Custom Slot]** | Build Story         | Behind-the-scenes page: inspiration, tech stack, process, link to GitHub |

The home screen layout should replicate the actual SSBU main menu as closely as possible, including:

- The large center character splash art (keep the original SSBU roster image — this is intentional homage)
- The silhouette-style menu option panels on the left side
- The bold SSBU typography, gold/yellow accents, dark background with subtle star/galaxy texture
- The glowing highlight effect when a menu option is selected/hovered
- Navigation audio cues (if feasible with royalty-free/synthesized approximations — do not use Nintendo audio)

> **Copyright note**: Use the SSBU aesthetic as faithfully as possible. If Nintendo assets become a concern later, the design should be modular enough to swap in original art without restructuring the layout. Build with this swap-ability in mind.

---

## Page-by-Page Specifications

### 1. Home Screen

- Replicate the SSBU main menu layout pixel-faithfully
- Background: dark with subtle star particle effect or galaxy texture
- Center: large character splash (original SSBU group artwork or a high-quality approximation)
- Left panel: 6 menu items styled as SSBU silhouette cards with label text
- Hover state: golden glow border + slight scale/brightness shift on the hovered item
- Click: transition animation into the selected section (slide, flash, or SSBU-style screen wipe)

---

### 2. Smash → About Page

Replicate the **SSBU Fighter Profile / Character Select screen**.

- Owner appears as the "selected fighter" — use a provided photo (placeholder silhouette on first pass)
- Fighter stat card panel appears on hover/click showing:
  - **Name**: [Owner's name]
  - **Title/Class**: e.g. "Product Manager · Technical Program Manager"
  - **Universe**: University of Utah — Master's in Information Systems
  - **Series**: [Owner's background — e.g. Banking & Fintech, 8+ years]
  - **Bio**: Short paragraph summary (2–3 sentences)
  - Stat bars styled like SSBU power/speed/weight bars — map to qualities like: Strategy, Execution, Communication, Technical, Leadership
- Background: character select screen aesthetic (dark vignette, subtle animated glow)
- "Back" navigation returns to home screen with reverse transition

---

### 3. Spirits → Projects Page

Replicate the **Spirits Collection screen**.

- Each project is a "Spirit" card with:
  - Project name (Spirit name)
  - A type badge (e.g. "Primary Spirit" for major projects, "Support Spirit" for smaller ones)
  - Power rating or status (e.g. "In Progress", "Shipped", "Concept")
  - Short description on hover/expand
  - Link to GitHub or live demo
- Layout: grid of Spirit cards with the SSBU Spirits UI chrome (top bar, filters, search aesthetic)
- Include **Wayfound** as the featured/pinned Primary Spirit

---

### 4. Games & More → Skills & Experience Page

Replicate the **Games & More submenu** — a list-style secondary menu with icon + label rows.

- Each skill category is a submenu row (e.g. Product Management, Agile/Scrum, Data Analysis, AI/ML Tools, Cloud/Azure, Frontend Basics)
- Clicking a row expands it to show specific tools/skills within that category
- Experience timeline can appear as a secondary panel — styled like a game record/history log
- Include teaching assistant role, PM/Scrum background, Make Salt Lake Event Chair

---

### 5. Vault → Resume Page

Replicate the **Vault screen** — an archive/gallery aesthetic.

- Resume content displayed as a "trophy case" or document archive
- Sections: Education, Experience, Certifications (AZ-900, AZ-104 in progress), Skills
- Include a clearly visible **Download PDF** button styled as an SSBU unlock/claim button
- Optional: "Newly Unlocked" animation on first visit (mimicking the trophy unlock sequence)

---

### 6. Online → Contact Page

Replicate the **Online lobby/matchmaking screen**.

- Contact form styled as a matchmaking request: "Send a Battle Request"
- Fields: Name, Email, Message — labeled with SSBU-appropriate microcopy (e.g. "Fighter Tag", "Home Stage", "Message to Challenger")
- Submit button: "Send Request" with a matchmaking-style animation on submit
- Also include direct links: LinkedIn, GitHub, Email — styled as platform/region select icons

---

### 7. [Custom Slot] → Build Story Page

A custom page not present in the real SSBU menu — style it as a "making of" or dev log.

- Explain the inspiration (the Persona 3 portfolio trend, love of SSBU)
- Document the tech stack and key build decisions
- Link to the GitHub repository
- Can be styled as patch notes / update log ("Version History") to stay in theme
- This page is also a portfolio artifact in itself — it demonstrates PM/TPM thinking applied to a personal project

---

## Tech Stack

- **Framework**: React + Vite
- **Styling**: CSS Modules or Tailwind — prioritize whatever enables the most faithful SSBU visual replication
- **Animation**: Framer Motion for page transitions and hover effects
- **Deployment**: Vercel (connect to GitHub repo for automatic deploys)
- **Asset handling**: All Nintendo-sourced images should be isolated in `/src/assets/nintendo/` so they can be cleanly replaced if needed

---

## Design Principles

1. **Fidelity first** — if it doesn't look like SSBU, it's not done yet
2. **Modular assets** — keep Nintendo IP assets isolated and swappable
3. **Transitions matter** — page-to-page navigation should feel like the game, not like a website
4. **Mobile is secondary** — build desktop-first; mobile can be a stretch goal
5. **Performance** — keep animations smooth; use CSS where possible before reaching for JS

---

## File Structure (suggested)

```
/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── nintendo/        # Nintendo IP assets (isolate here)
│   │   └── personal/        # Owner photos, custom art
│   ├── components/
│   │   ├── HomeScreen/
│   │   ├── FighterCard/
│   │   ├── SpiritsGrid/
│   │   ├── VaultScreen/
│   │   ├── OnlineLobby/
│   │   └── BuildStory/
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── BuildStory.jsx
│   ├── styles/
│   │   └── ssbu-tokens.css  # Color, typography, spacing design tokens
│   └── App.jsx
├── CLAUDE.md
├── package.json
└── vite.config.js
```

---

## SSBU Design Tokens (reference)

Use these as the foundation for all styling:

```css
/* ssbu-tokens.css */
:root {
  --ssbu-bg-primary: #0a0a1a;
  --ssbu-bg-panel: #12122a;
  --ssbu-gold: #f5c518;
  --ssbu-gold-light: #ffe066;
  --ssbu-red: #cc2200;
  --ssbu-blue: #1a4fff;
  --ssbu-white: #ffffff;
  --ssbu-glow: 0 0 16px rgba(245, 197, 24, 0.7);
  --ssbu-font-display: 'Rajdhani', 'Bebas Neue', sans-serif; /* approximate SSBU typeface */
  --ssbu-font-body: 'Exo 2', sans-serif;
  --ssbu-transition-speed: 180ms;
}
```

---

## Content Placeholders

On first pass, use these placeholders — owner will supply real content:

- **Name**: [YOUR NAME]
- **Title**: Product Manager · Technical Program Manager
- **University**: University of Utah — M.S. Information Systems
- **Bio**: [2–3 sentence summary]
- **Fighter photo**: Use silhouette placeholder (`/src/assets/personal/fighter-placeholder.png`)
- **Projects**: Include "Wayfound" as the primary project; add 2–3 other placeholder Spirit cards
- **Resume PDF**: Link to `/public/resume.pdf` (owner will drop file in)

---

## Build Sequence (recommended order for Claude Code sessions)

1. **Session 1**: Scaffold Vite + React project, set up routing, implement home screen layout with static menu items and SSBU design tokens
2. **Session 2**: Build the Smash/About fighter card with hover interactions and stat bars
3. **Session 3**: Spirits/Projects grid with card expand interactions
4. **Session 4**: Games & More (Skills) expandable list + Vault (Resume) with download button
5. **Session 5**: Online (Contact) form + Build Story page
6. **Session 6**: Page transition animations, polish, Vercel deploy setup

---

## Vercel Deployment

- Connect GitHub repo to Vercel on project creation
- Build command: `npm run build`
- Output directory: `dist`
- Custom domain: TBD — configure in Vercel dashboard once purchased

---

## Out of Scope (for now)

- Mobile responsive layout
- Sound effects / audio
- Backend / database (contact form can use Formspree or similar static form service)
- User accounts or persistent state
