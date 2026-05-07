# ssbu-portfolio

Personal portfolio of **Athavan Elangko**, styled as the Super Smash Bros. Ultimate home screen.

Live: **https://ssbu-portfolio.vercel.app**

## Stack

- **React 19** + **TypeScript** (strict + `noUncheckedIndexedAccess`) + **Vite**
- **React Router** for hub-and-spoke navigation
- **CSS Modules** for SSBU-faithful styling
- **Framer Motion** for screen-wipe transitions
- **ESLint + Prettier**
- Hosted on **Vercel** with auto-deploy on push to `main`

## Scripts

| Command                | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                             |
| `npm run build`        | Type-check and produce a production bundle in `dist/` |
| `npm run preview`      | Serve the production bundle locally                   |
| `npm run lint`         | Run ESLint                                            |
| `npm run format`       | Format the codebase with Prettier                     |
| `npm run format:check` | Check formatting without writing                      |

## Documentation

- [`PRD.md`](./PRD.md) — product requirements (vision, personas, milestones, risks)
- [`CLAUDE.md`](./CLAUDE.md) — implementation brief for Claude Code sessions

## Status

M0 (scaffolding) complete. M1 (SSBU home screen + Press Start splash) is next.
