# athavan.gg 🎮

> **"A new challenger approaches."**

**athavan.gg** is a personal portfolio site built as a faithful recreation of the **Super Smash Bros. Ultimate** UI. Every section maps to a menu item from the game — each page replicates the actual SSBU screen it represents, not just the aesthetic.

Built with React + Vite. Deployed at [athavan.gg](https://athavan.gg).

---

## 🌐 Live Site

**[athavan.gg](https://athavan.gg)**

---

## The Concept

Most portfolio sites look the same. This one doesn't.

The idea came from seeing Persona 3-themed portfolios circulating on Instagram — developers building sites that replicate a game's UI as a portfolio shell. The execution made the work memorable in a way that a standard `firstname.com` never could.

SSBU was the natural choice. The game's UI has a clear information hierarchy, distinct screen types for different content, and a visual language that's immediately recognizable. Every section of a portfolio — About, Projects, Skills, Resume, Contact — maps cleanly onto a screen that already exists in the game.

The result is a portfolio that shows personality and technical execution at the same time.

---

## Screen Mapping

| SSBU Menu | Portfolio Section | Screen Replicated |
|---|---|---|
| **Smash** | About | Fighter Select / Character Profile |
| **Spirits** | Projects | Spirit Collection |
| **Games & More** | Skills & Experience | Submenu + Match History |
| **Vault** | Resume | Archive Screen |
| **Online** | Contact | Matchmaking Lobby |
| **Build Story** | This project | Patch Notes / Dev Log |

---

## Features

| Feature | Description |
|---|---|
| 🎮 **Fighter Profile** | About page as a character select screen — stat bars, Universe, Series, bio |
| 👻 **Spirit Collection** | Projects as Spirit cards with power ratings, role badges, and status |
| 📋 **Match History** | Experience timeline styled as a game record inside Skills & Experience |
| 🗂 **Archive** | Resume as a Vault archive with a downloadable PDF |
| 🌐 **Matchmaking Lobby** | Contact page as an Online lobby with live status bar and player card |
| 📱 **Mobile Unlock Sequence** | Mobile-first experience with a character unlock animation and swipe navigation |
| 💡 **Idle Swipe Hint** | First-time mobile visitors get a one-time animated finger prompt |
| 🔗 **athavan.gg** | Custom `.gg` domain — a nod to the game that inspired it |

---

## Mobile Experience

The desktop layout doesn't translate to mobile — and rather than force it, the mobile experience was designed separately as its own thing.

Mobile visitors get:

1. **Unlock sequence** — silhouette of the fighter, tap to reveal, white flash transition
2. **Vertical swipe navigation** — TikTok-style full-screen pages, one per section
3. **Horizontal project swipe** — Projects page supports left/right swipe through Spirit cards
4. **Dot navigation** — top-right corner, tappable to jump directly to any page
5. **One-time swipe hint** — animated finger prompt appears after 5 seconds of idle on first visit, never again

sessionStorage tracks unlock and hint state so repeat visitors skip the intro.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | CSS Modules + custom SSBU design tokens |
| Animation | Framer Motion |
| Routing | React Router |
| Contact Form | Formspree |
| Hosting | Vercel |
| Domain | Cloudflare (athavan.gg) |

---

## Design Tokens

All SSBU visual fidelity is anchored to a shared token file:

```css
:root {
  --ssbu-bg-primary: #0a0a1a;
  --ssbu-bg-panel: #12122a;
  --ssbu-gold: #f5c518;
  --ssbu-gold-light: #ffe066;
  --ssbu-red: #cc2200;
  --ssbu-blue: #1a4fff;
  --ssbu-glow: 0 0 16px rgba(245, 197, 24, 0.7);
  --ssbu-font-display: 'Rajdhani', sans-serif;
  --ssbu-font-body: 'Exo 2', sans-serif;
}
```

Nintendo IP assets are isolated in `/src/assets/nintendo/` for clean replaceability if needed.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/atgko/athavan-gg.git
cd athavan-gg
npm install
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` to see it running.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
/
├── public/
│   └── resume.pdf
├── src/
│   ├── assets/
│   │   ├── nintendo/        # SSBU visual assets (isolated)
│   │   └── personal/        # Photos and custom art
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
│   │   └── ssbu-tokens.css
│   └── App.jsx
├── CLAUDE.md
├── package.json
└── vite.config.js
```

---

## Design Decisions Worth Knowing

These were deliberate choices — not limitations:

**Desktop-first, mobile-separate.** The SSBU UI is a desktop experience by design — complex layouts, hover states, and precise visual chrome that doesn't survive a viewport squeeze. Rather than degrade it, mobile gets its own purpose-built experience with the same personality.

**Maximum fidelity over loose inspiration.** The goal was always to replicate SSBU screens, not just theme a portfolio with gold colors. Each page was built by studying the actual game UI and matching its information hierarchy, not just its palette.

**Nintendo assets isolated by design.** All IP-adjacent assets live in a single folder. If they ever need to come out, the structure accommodates it without a refactor.

**`.gg` domain.** A deliberate choice — `.gg` is the standard gaming domain ("good game") and signals the portfolio's personality before anyone clicks a link.

**CLAUDE.md included in repo.** The project was built with Claude Code. The `CLAUDE.md` brief lives in the repo as documentation of the build process and a reference for anyone curious about AI-assisted development workflows.

---

## Roadmap

**Phase 1 — Desktop (Complete)** All six pages, SSBU-faithful UI, Vercel deploy, custom domain

**Phase 2 — Mobile (Complete)** Unlock sequence, swipe navigation, dot nav, idle hint, sessionStorage state

**Phase 3 — Build Story page** Behind-the-scenes page documenting the inspiration, process, and tech decisions

**Phase 4 — Polish** Home screen photo, additional project Spirit cards, resume PDF, vignette on fighter photo

---

## Background

This project started as a Claude Code familiarization exercise during my MSIS program at the University of Utah. The scope was deliberately constrained — one portfolio site, built iteratively across focused sessions — to learn how to work effectively with AI coding tools before applying them to more complex projects.

It turned into something I'm genuinely proud of.

The Persona 3 portfolio trend on Instagram showed that a game-themed portfolio could be both technically credible and immediately memorable. SSBU was the right choice for me — I know the UI well, the screen types map cleanly to portfolio sections, and the `.gg` domain was available.

Every design decision in this codebase came from asking: *does this look like the actual game?* If the answer was no, it wasn't done yet.

---

## PM Portfolio Context

athavan.gg is one artifact in a broader portfolio built during the University of Utah MSIS program. Other projects include:

- **[Wayfound](https://github.com/atgko/wayfound)** — AI adventure planning agent for the Mountain West
- **PocketBeane** — AI fantasy sports GM assistant
- **Mango** — collaborative personal productivity app
- **Faculty AI Best Practices** — capstone project with the David Eccles School of Business

---

## Connect

**Athavan Elangko**
[athavan.gg](https://athavan.gg) · [github.com/atgko](https://github.com/atgko) · [LinkedIn](https://linkedin.com/in/athavan-elangko)
