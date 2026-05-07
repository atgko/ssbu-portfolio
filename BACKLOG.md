# Improvements Backlog

Running tracker for iterative improvements across the SSBU portfolio. Items move from **Open → In Progress → Done**. Add new items under the appropriate section as they come up; do not delete done items so the history is preserved.

Format per item: short title, what to change, source / when it was raised. Use checkboxes so progress is scannable.

---

## In Progress

_(none — promote items here when actively being worked on)_

---

## Open

### Home screen — needs visual review (round 5)

- [ ] **Confirm "Skills" naming for the merged tile.** Tile currently labeled `Skills`; absorbs both Skills and Resume content. Open alternatives: `Career`, `Resume`, `Skills & Résumé`. _Source: 2026-05-06 round 4 — pending user pick._
- [ ] **Bulge size + offset may need tuning.** White bulge is `26×26 px` straddling the ring at `top: -11 px`. After seeing it live, may need to grow / shrink it relative to ring thickness so it reads as a smooth swell instead of a separate disc. _Source: derived from 2026-05-06 round 4._
- [ ] **Active-tile shrink amount may be too aggressive or too subtle.** Tile transform is `scale(0.96)` per active state, with per-tile `transform-origin` set to the outer corner so the shrink pulls AWAY from the circle. Tune the scale value once we see how big the resulting gap looks. _Source: derived from 2026-05-06 round 4._
- [ ] **Arrow may need to be slightly larger.** Arrow is `12 px wide × 9 px tall` inside a 14 px ring. Reference arrow looks proportionally bigger — bump to ~`14 × 11` if it reads as too small. _Source: derived from 2026-05-06 round 4._
- [ ] **Decide what to do with /resume and /build-story routes.** Those routes still resolve to placeholder pages but no longer have tiles. Options: redirect both to `/skills` and `/projects` respectively, or leave as deep links accessible only from inside Skills / Projects pages. _Source: 2026-05-06 round 4._
- [ ] **Smash icon SVG is hand-drawn approximation.** Cross-arrow geometry is rough — redraw against an actual SSBU smash-logo reference (or swap to a licensed/original icon) if a closer match is wanted. _Source: 2026-05-06 round 2, partial fix only._

---

## Done

### 2026-05-06 — Home screen fidelity round 4

- [x] **Tiles fused down to 4 — circle now touches every tile.** Skills (Games) and Resume (Vault) merged into a single `Skills` tile. Build Story tile dropped (its content folds into one of the Projects spirits). Layout is now a 2×2 (`1.2fr 1fr × 1.1fr 1fr`) with the splash anchored at the col1/col2 + row1/row2 meeting point so all four tiles border it. _Files: `src/components/HomeMenu/menu.ts`, `src/components/HomeMenu/HomeMenu.module.css`, `src/components/HomeMenu/HomeMenu.tsx`._
- [x] **Build Story tile removed; absorbed into Projects.** No more corner shortcut. Tile reduced from 6 → 5 → 4 over the iterations. _Files: `menu.ts`, `HomeMenu.tsx`._
- [x] **White ring is now thick + constant; no protrusion past its outer edge.** Ring grew from `5 px` → `14 px` border on `.centerSplash`. Old `.tab` removed. _File: `HomeMenu.module.css`._
- [x] **Active tile shrinks toward its outer corner.** Per-tile `transform-origin` (top-left for Smash, top-right for Games, bottom-left for Spirits, bottom-right for Online) plus `scale(0.96)` on active state — the tile pulls AWAY from the circle, so the white ring appears to claim the vacated space. _File: `HomeMenu.module.css`._
- [x] **White bulge + black arrow stay inside the ring's white area.** `.bulge` is a small white disc straddling the ring's outer edge, simulating the ring "growing into" the active tile. `.arrowTip` is a small black triangle inside the bulge. Both ride the rotating `.arrowOrbit`. _File: `HomeMenu.module.css`, `HomeMenu.tsx`._
- [x] **Keyboard nav simplified for 4-tile layout.** `NAV` neighbor map updated: `Smash↔Games` horizontally, `Smash↔Spirits` vertically, etc. _File: `HomeMenu.tsx`._
- [x] **Arrow angles re-derived for 2×2 geometry.** `Smash 315 / Spirits 220 / Games 50 / Online 135`. _File: `menu.ts`._

### 2026-05-06 — Home screen fidelity round 3

- [x] **Layout matches the 5-block SSBU reference.** (Superseded by round 4's 4-block layout.) _File: `HomeMenu.module.css`._
- [x] **Build Story moved to a corner shortcut.** (Superseded by round 4 — Build dropped entirely.) _File: `HomeMenu.module.css`._
- [x] **Tiles renamed to portfolio section names.** Tiles show `About / Projects / Skills / Contact`. SSBU framing preserved in the bottom bar. _File: `HomeMenu.tsx`._
- [x] **Icon + label centering biased away from the central circle.** Per-tile `--justify` / `--align` / `--pad` CSS variables. _File: `HomeMenu.module.css`._
- [x] **Center splash sized to touch all tiles.** `clamp(220px, 28vw, 340px)` diameter, anchored at the 4-tile meeting point. _File: `HomeMenu.module.css`._
- [x] **Hover arrow rotates with the active tile.** Driven by `--arrow-angle` per active tile. _Files: `HomeMenu.tsx`, `HomeMenu.module.css`._
- [x] **Keyboard nav uses a per-tile neighbor map.** _File: `HomeMenu.tsx`._

### 2026-05-06 — Home screen fidelity round 2

- [x] **Splash text no longer clashes with the menu.** PressStart overlay now has a radial dark backdrop (rgba 0.7 → 0.97) plus `backdrop-filter: blur(10px) saturate(0.6)`. Reduced-motion path preserved. _File: `src/components/PressStart/PressStart.module.css`._
- [x] **Tiles vary in size — less neatly aligned.** (Initial pass; superseded by rounds 3 and 4.)
- [x] **Center splash overlaps multiple tiles.** (Superseded by round 4 which sized for 4/4 contact.)
- [x] **Hover arrow on the center circle.** (Initial pass; round 3 added the rotating wrapper, round 4 made the arrow live entirely inside the ring.)
- [x] **Tile icons light up on hover / focus / active.** _File: `HomeMenu.module.css`._
- [x] **Icons mirror the SSBU reference more closely.** _File: `HomeMenu.tsx`._

### 2026-05-06 — M1 baseline

- [x] **Press Start splash + sessionStorage gate, animated stars, 6-tile menu, top/bottom Switch bars, live clock.** Initial M1 implementation. _Files: `src/components/StarsBackground/`, `src/components/PressStart/`, `src/components/HomeMenu/`, `src/pages/Home.*`._
