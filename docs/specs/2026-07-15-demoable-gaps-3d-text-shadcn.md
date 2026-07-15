# Demoable-gap build-out: text animation, CSS-3D, shadcn patterns

**Date:** 2026-07-15
**Status:** approved & shipped — 8 principles added (corpus 396 → 404). Text-anim shipped 3
(reduced-motion folded in, not a 4th derivative principle); CSS-3D 2; shadcn 3 under the new
`vercel-composition` badge.

## Problem

Gap analysis of the 396-principle corpus surfaced three under-covered areas. The user
wants them filled — but only with rules that obey the corpus's core rule: **it must be
showable as a good/bad example in a demo pane.** That rule decides what's in and out.

## Constraint (the demoable test)

Onboard a rule only if a self-contained React pane can show the wrong way vs the right
way. This is what keeps the app "interface guidelines," not a dev manual.

### Explicitly OUT (fail the demoable test — do not onboard)
- **Blender / Blender MCP** — 3D asset/scene authoring, no web-interface good/bad.
- **three.js / R3F / Remotion APIs** — library usage, already declined; unchanged.
- **`npx shadcn add` / component-generation workflow** — operational (MCP + design-system
  skill), not a principle.

## Chosen direction — 3 small sets, all demoable

### 1. Text-animation a11y (~4) — biggest gap, zero current coverage
- `content-animated-text-stays-readable` — splitting text into per-letter/word spans
  breaks screen-reader reading order; keep an accessible name on the whole word
  (`aria-label` on the wrapper, `aria-hidden` on the shards). **source: wcag/custom**
- `content-moving-text-can-be-paused` — auto-scrolling/marquee/ticker text needs a
  pause control and must honor reduced-motion (WCAG 2.2.2 Pause, Stop, Hide). **source: wcag**
- `animations-variable-font-is-compositor-hostile` — animating `font-variation-settings`
  (weight/width) relayouts every frame; prefer transform/opacity, or accept it's a
  deliberate, gated effect. **source: web-platform/custom**
- `animations-text-reveal-respects-reduced-motion` — staggered text reveals drop to a
  simple fade (or none) under `prefers-reduced-motion`. **source: custom**

### 2. CSS-3D web (~3) — small but genuine gap
- `design-preserve-3d-for-real-depth` — flip cards / 3D need `transform-style:
  preserve-3d` + `backface-visibility: hidden`; without it the back face shows through
  and children flatten. **source: web-platform/custom**
- `design-perspective-on-the-parent` — set `perspective` once on the container, not
  per-child, or every child gets its own vanishing point. **source: web-platform/custom**
- (reduced-motion for 3D ambient/parallax is already covered by "Reduce Ambient 3D
  Motion" — no new principle, cross-link instead.)

### 3. shadcn / component patterns (~3) — source: vercel composition-patterns
- `design-compound-over-mega-component` — expose `Select.Trigger`/`Select.Content`
  compound parts over one component with 15 props.
- `design-explicit-variants-over-booleans` — one `variant` prop over an
  `isPrimary/isGhost/isLarge` boolean explosion (illegal states, CVA-friendly).
- `design-render-as-child` — `asChild`/`Slot` (or ref forwarding) so a primitive can
  compose with a link/button instead of wrapping and breaking semantics.
- **Attribution:** ship under `custom` with sourceLinks to vercel-labs/agent-skills
  `composition-patterns` (that repo has no badge; avoids misattributing to the `vercel`
  interface-guidelines badge). No new PatternSource.

## Scope / non-goals
- ~10 principles total, each with a Good + Bad example component + an agent rule.
- No new category (all fit content/animations/design). No new PatternSource.
- No Blender/three.js/Remotion/shadcn-CLI content.
- Verify: `typecheck` + `validate` clean; new principles resolve their example keys.

## Open question for approval
- OK to ship shadcn patterns under `custom` (vs. minting a `vercel-composition` badge)?
- Any of the ~10 you want cut or reworded before I author examples?
