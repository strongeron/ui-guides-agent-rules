import { AgentRule, AgentRulePriority } from '../types/principle';
import { principles } from './principles';

// Extract principle IDs as a type
type KnownPrincipleId = (typeof principles)[number]['id'];

// Agent rules mapped by principle ID
export const agentRules: Partial<Record<KnownPrincipleId, AgentRule>> & Record<string, AgentRule> = {
  'interactions-keyboard-everywhere': {
    priority: 'MUST',
    rule: 'Full keyboard support per WAI-ARIA APG (https://www.w3.org/WAI/ARIA/apg/patterns/)'
  },
  'interactions-clear-focus': {
    priority: 'MUST',
    rule: 'Visible focus rings (`:focus-visible`; group with `:focus-within`)'
  },
  'interactions-manage-focus': {
    priority: 'MUST',
    rule: 'Manage focus (trap, move, and return) per APG patterns'
  },
  'interactions-match-hit-targets': {
    priority: 'MUST',
    rule: 'Hit target ≥24px (mobile ≥44px) If visual <24px, expand hit area'
  },
  'interactions-mobile-input-size': {
    priority: 'MUST',
    rule: 'Mobile `<input>` font-size ≥16px or set:\n```html\n<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover">\n```'
  },
  'interactions-respect-zoom': {
    priority: 'NEVER',
    rule: 'Disable browser zoom'
  },
  'interactions-touch-action': {
    priority: 'MUST',
    rule: '`touch-action: manipulation` to prevent double-tap zoom; set `-webkit-tap-highlight-color` to match design'
  },
  'interactions-hydration-safe': {
    priority: 'MUST',
    rule: 'Hydration-safe inputs (no lost focus/value)'
  },
  'interactions-dont-block-paste': {
    priority: 'NEVER',
    rule: 'Block paste in `<input>/<textarea>`'
  },
  'interactions-loading-buttons': {
    priority: 'MUST',
    rule: 'Loading buttons show spinner and keep original label'
  },
  'forms-enter-submits': {
    priority: 'MUST',
    rule: 'Enter submits focused text input'
  },
  'forms-textarea-behavior': {
    priority: 'MUST',
    rule: 'In `<textarea>`, ⌘/Ctrl+Enter submits; Enter adds newline'
  },
  'forms-submission-rule': {
    priority: 'MUST',
    rule: 'Keep submit enabled until request starts; then disable, show spinner, use idempotency key'
  },
  'forms-dont-block-typing': {
    priority: 'MUST',
    rule: "Don't block typing; accept free text and validate after"
  },
  'forms-dont-pre-disable-submit': {
    priority: 'MUST',
    rule: 'Allow submitting incomplete forms to surface validation'
  },
  'forms-error-placement': {
    priority: 'MUST',
    rule: 'Errors inline next to fields; on submit, focus first error'
  },
  'forms-autocomplete': {
    priority: 'MUST',
    rule: '`autocomplete` + meaningful `name`; correct `type` and `inputmode`'
  },
  'forms-spellcheck': {
    priority: 'SHOULD',
    rule: 'Disable spellcheck for emails/codes/usernames'
  },
  'forms-placeholder-value': {
    priority: 'SHOULD',
    rule: 'Placeholders end with ellipsis and show example pattern (eg, `+1 (123) 456-7890`, `sk-012345…`)'
  },
  'forms-unsaved-changes': {
    priority: 'MUST',
    rule: 'Warn on unsaved changes before navigation'
  },
  'forms-password-managers': {
    priority: 'MUST',
    rule: 'Compatible with password managers & 2FA; allow pasting one-time codes'
  },
  'forms-text-replacements': {
    priority: 'MUST',
    rule: 'Trim values to handle text expansion trailing spaces'
  },
  'forms-labels-everywhere': {
    priority: 'MUST',
    rule: 'Every control has a <label> or is associated with a label for assistive tech'
  },
  'forms-label-activation': {
    priority: 'MUST',
    rule: 'Clicking a <label> focuses the associated control'
  },
  'forms-no-dead-zones': {
    priority: 'MUST',
    rule: 'No dead zones on checkboxes/radios; label+control share one generous hit target'
  },
  'forms-correct-types': {
    priority: 'MUST',
    rule: 'Use correct `type` and `inputmode` for better keyboards & validation'
  },
  'interactions-url-state': {
    priority: 'MUST',
    rule: 'URL reflects state (deep-link filters/tabs/pagination/expanded panels) Prefer libs like nuqs (https://nuqs.dev)'
  },
  'interactions-scroll-persistence': {
    priority: 'MUST',
    rule: 'Back/Forward restores scroll'
  },
  'interactions-links-are-links': {
    priority: 'MUST',
    rule: 'Links are links—use `<a>/<Link>` for navigation (support Cmd/Ctrl/middle-click)'
  },
  'interactions-optimistic-updates': {
    priority: 'SHOULD',
    rule: 'Optimistic UI; reconcile on response; on failure show error and rollback or offer Undo'
  },
  'interactions-confirm-destructive': {
    priority: 'MUST',
    rule: 'Confirm destructive actions or provide Undo window'
  },
  'interactions-announce-updates': {
    priority: 'MUST',
    rule: 'Use polite `aria-live` for toasts/inline validation'
  },
  'interactions-ellipsis-for-input': {
    priority: 'SHOULD',
    rule: 'Ellipsis (`…`) for options that open follow-ups (eg, "Rename…") and loading states (eg, "Loading…", "Saving…", "Generating…")'
  },
  'interactions-forgiving-design': {
    priority: 'MUST',
    rule: 'Design forgiving interactions (generous targets, clear affordances; avoid finickiness)'
  },
  'interactions-tooltip-timing': {
    priority: 'MUST',
    rule: 'Delay first tooltip in a group; subsequent peers no delay'
  },
  'interactions-overscroll-behavior': {
    priority: 'MUST',
    rule: 'Intentional `overscroll-behavior: contain` in modals/drawers'
  },
  'interactions-clean-drag': {
    priority: 'MUST',
    rule: 'During drag, disable text selection and set `inert` on dragged element/containers'
  },
  'interactions-no-dead-zones': {
    priority: 'MUST',
    rule: 'No "dead-looking" interactive zones—if it looks clickable, it is'
  },
  'interactions-autofocus': {
    priority: 'SHOULD',
    rule: "Autofocus on desktop when there's a single primary input; rarely on mobile (to avoid layout shift)"
  },
  'animations-prefers-reduced-motion': {
    priority: 'MUST',
    rule: 'Honor `prefers-reduced-motion` (provide reduced variant)'
  },
  'animations-implementation-preference': {
    priority: 'SHOULD',
    rule: 'Prefer CSS > Web Animations API > JS libraries'
  },
  'animations-compositor-friendly': {
    priority: 'MUST',
    rule: 'Animate compositor-friendly props (`transform`, `opacity`); avoid layout/repaint props (`top/left/width/height`)'
  },
  'animations-necessity-check': {
    priority: 'SHOULD',
    rule: 'Animate only to clarify cause/effect or add deliberate delight'
  },
  'animations-easing': {
    priority: 'SHOULD',
    rule: 'Choose easing to match the change (size/distance/trigger)'
  },
  'animations-interruptible': {
    priority: 'MUST',
    rule: 'Animations are interruptible and input-driven (avoid autoplay)'
  },
  'animations-correct-transform-origin': {
    priority: 'MUST',
    rule: 'Correct `transform-origin` (motion starts where it "physically" should)'
  },
  'animations-never-transition-all': {
    priority: 'MUST',
    rule: 'Never transition: all. Explicitly list only the properties you intend to animate (typically opacity, transform)'
  },
  'layout-optical-alignment': {
    priority: 'SHOULD',
    rule: 'Optical alignment; adjust by ±1px when perception beats geometry'
  },
  'layout-deliberate-alignment': {
    priority: 'MUST',
    rule: 'Deliberate alignment to grid/baseline/edges/optical centers—no accidental placement'
  },
  'layout-balance-contrast': {
    priority: 'SHOULD',
    rule: 'Balance icon/text lockups (stroke/weight/size/spacing/color)'
  },
  'layout-responsive-coverage': {
    priority: 'MUST',
    rule: 'Verify mobile, laptop, ultra-wide (simulate ultra-wide at 50% zoom)'
  },
  'layout-safe-areas': {
    priority: 'MUST',
    rule: 'Respect safe areas (use env(safe-area-inset-*))'
  },
  'layout-no-excessive-scrollbars': {
    priority: 'MUST',
    rule: 'Avoid unwanted scrollbars; fix overflows'
  },
  'content-inline-help-first': {
    priority: 'SHOULD',
    rule: 'Inline help first; tooltips last resort'
  },
  'content-stable-skeletons': {
    priority: 'MUST',
    rule: 'Skeletons mirror final content to avoid layout shift'
  },
  'content-page-titles': {
    priority: 'MUST',
    rule: '`<title>` matches current context'
  },
  'content-no-dead-ends': {
    priority: 'MUST',
    rule: 'No dead ends; always offer next step/recovery'
  },
  'content-all-states': {
    priority: 'MUST',
    rule: 'Design empty/sparse/dense/error states'
  },
  'content-typographic-quotes': {
    priority: 'SHOULD',
    rule: 'Curly quotes (" "); avoid widows/orphans'
  },
  'content-tabular-numbers': {
    priority: 'MUST',
    rule: 'Tabular numbers for comparisons (`font-variant-numeric: tabular-nums` or a mono like Geist Mono)'
  },
  'content-redundant-cues': {
    priority: 'MUST',
    rule: 'Redundant status cues (not color-only); icons have text labels'
  },
  'content-dont-ship-schema': {
    priority: 'MUST',
    rule: "Don't ship the schema—visuals may omit labels but accessible names still exist"
  },
  'content-ellipsis-character': {
    priority: 'MUST',
    rule: 'Use the ellipsis character `…` (not ``)'
  },
  'content-anchored-headings': {
    priority: 'MUST',
    rule: '`scroll-margin-top` on headings for anchored links; include a "Skip to content" link; hierarchical `<h1–h6>`'
  },
  'content-resilient-ugc': {
    priority: 'MUST',
    rule: 'Resilient to user-generated content (short/avg/very long)'
  },
  'content-locale-formats': {
    priority: 'MUST',
    rule: 'Locale-aware dates/times/numbers/currency'
  },
  'content-accessible-content': {
    priority: 'MUST',
    rule: 'Accurate names (`aria-label`), decorative elements `aria-hidden`, verify in the Accessibility Tree'
  },
  'content-icons-have-labels': {
    priority: 'MUST',
    rule: 'Icon-only buttons have descriptive `aria-label`'
  },
  'content-semantics-first': {
    priority: 'MUST',
    rule: 'Prefer native semantics (`button`, `a`, `label`, `table`) before ARIA'
  },
  'content-brand-resources': {
    priority: 'SHOULD',
    rule: 'Right-clicking the nav logo surfaces brand assets'
  },
  'content-non-breaking-spaces': {
    priority: 'MUST',
    rule: 'Use non-breaking spaces to glue terms: `10&nbsp;MB`, `⌘&nbsp;+&nbsp;K`, `Vercel&nbsp;SDK`'
  },
  'performance-device-matrix': {
    priority: 'SHOULD',
    rule: 'Test iOS Low Power Mode and macOS Safari'
  },
  'performance-measure-reliably': {
    priority: 'MUST',
    rule: 'Measure reliably (disable extensions that skew runtime)'
  },
  'performance-minimize-rerenders': {
    priority: 'MUST',
    rule: 'Track and minimize re-renders (React DevTools/React Scan)'
  },
  'performance-throttle-profiling': {
    priority: 'MUST',
    rule: 'Profile with CPU/network throttling'
  },
  'performance-minimize-layout-work': {
    priority: 'MUST',
    rule: 'Batch layout reads/writes; avoid unnecessary reflows/repaints'
  },
  'performance-latency-budgets': {
    priority: 'MUST',
    rule: 'Mutations (`POST/PATCH/DELETE`) target <500 ms'
  },
  'performance-keystroke-cost': {
    priority: 'SHOULD',
    rule: 'Prefer uncontrolled inputs; make controlled loops cheap (keystroke cost)'
  },
  'performance-large-lists': {
    priority: 'MUST',
    rule: 'Virtualize large lists (eg, `virtua`)'
  },
  'performance-preload-wisely': {
    priority: 'MUST',
    rule: 'Preload only above-the-fold images; lazy-load the rest'
  },
  'performance-no-image-cls': {
    priority: 'MUST',
    rule: 'Prevent CLS from images (explicit dimensions or reserved space)'
  },
  'performance-preload-fonts': {
    priority: 'MUST',
    rule: 'Preload fonts for critical text to avoid flash & layout shift'
  },
  'design-layered-shadows': {
    priority: 'SHOULD',
    rule: 'Layered shadows (ambient + direct)'
  },
  'design-crisp-borders': {
    priority: 'SHOULD',
    rule: 'Crisp edges via semi-transparent borders + shadows'
  },
  'design-nested-radii': {
    priority: 'SHOULD',
    rule: 'Nested radii: child ≤ parent; concentric'
  },
  'design-hue-consistency': {
    priority: 'SHOULD',
    rule: 'Hue consistency: tint borders/shadows/text toward bg hue'
  },
  'design-accessible-charts': {
    priority: 'MUST',
    rule: 'Accessible charts (color-blind-friendly palettes)'
  },
  'design-minimum-contrast': {
    priority: 'MUST',
    rule: 'Meet contrast—prefer APCA (https://apcacontrast.com/) over WCAG 2'
  },
  'design-interactions-increase-contrast': {
    priority: 'MUST',
    rule: 'Increase contrast on `:hover/:active/:focus`'
  },
  'design-browser-ui-match': {
    priority: 'SHOULD',
    rule: 'Match browser UI to bg'
  },
  'design-gradient-banding': {
    priority: 'SHOULD',
    rule: 'Avoid gradient banding (use masks when needed)'
  },
  // Tailwind CSS Golden Rules - Performance
  'performance-content-paths': {
    priority: 'MUST',
    rule: 'Configure Tailwind content paths to include all files using utility classes'
  },
  'performance-gpu-animations': {
    priority: 'MUST',
    rule: 'Use transform/opacity for animations (GPU-accelerated), not margin/width/height'
  },
  'performance-no-transition-all': {
    priority: 'NEVER',
    rule: 'Use transition-all; explicitly specify transition-transform, transition-opacity, etc.'
  },
  'performance-avoid-arbitrary': {
    priority: 'SHOULD',
    rule: 'Avoid arbitrary values [17px]; use theme tokens (p-4, text-foreground)'
  },
  'performance-dynamic-classes': {
    priority: 'NEVER',
    rule: 'Dynamically construct class names (`bg-${color}-500`); use object lookup with complete strings'
  },
  'performance-purge-optimization': {
    priority: 'SHOULD',
    rule: 'Keep content paths specific; minimize safelist to only CMS-driven classes'
  },
  // Tailwind CSS Golden Rules - Design
  'design-theme-config': {
    priority: 'MUST',
    rule: 'Use theme.extend to add custom values; never overwrite top-level theme keys'
  },
  'design-semantic-colors': {
    priority: 'MUST',
    rule: 'Use semantic tokens (bg-primary, text-destructive) instead of raw colors (bg-blue-500)'
  },
  'design-complete-theme': {
    priority: 'SHOULD',
    rule: 'Define complete token pairs: background + foreground, ring, border for each semantic color'
  },
  'design-mobile-first': {
    priority: 'MUST',
    rule: 'Write mobile styles first; use sm:/md:/lg: to enhance for larger screens (min-width based)'
  },
  'design-custom-breakpoints': {
    priority: 'SHOULD',
    rule: 'Add custom breakpoints via theme.extend.screens; avoid arbitrary min-[Xpx]: values'
  },
  'design-dark-mode-class': {
    priority: 'SHOULD',
    rule: 'Use darkMode: "class" for user-controllable themes with light/dark/system options'
  },
  'design-dark-preferences': {
    priority: 'MUST',
    rule: 'Apply dark class in inline <head> script before first paint to prevent theme flash'
  },
  // Tailwind CSS Golden Rules - Interactions
  'interactions-focus-visible-tw': {
    priority: 'MUST',
    rule: 'Use focus-visible: instead of focus: for focus rings (keyboard-only indicators)'
  },
  'interactions-skip-link-tw': {
    priority: 'MUST',
    rule: 'Implement skip links with sr-only focus:not-sr-only pattern'
  },
  'interactions-aria-variants': {
    priority: 'SHOULD',
    rule: 'Use aria-* variants (aria-selected:, aria-expanded:) to tie styles to ARIA state'
  },
  'interactions-sr-only': {
    priority: 'MUST',
    rule: 'Use sr-only for accessible but visually hidden content (icon labels, status context)'
  },
  'interactions-class-precedence': {
    priority: 'SHOULD',
    rule: 'Use tailwind-merge (via cn()) to handle class conflicts in dynamic composition'
  },
  // Tailwind CSS Golden Rules - Forms
  'forms-tailwind-merge': {
    priority: 'MUST',
    rule: 'Use tailwind-merge for components accepting className props to ensure override classes win'
  },
  'forms-cn-utility': {
    priority: 'SHOULD',
    rule: 'Create cn() utility combining clsx + tailwind-merge for conditional class merging'
  },
  // Tailwind CSS Golden Rules - Content
  'content-class-formatting': {
    priority: 'SHOULD',
    rule: 'Use prettier-plugin-tailwindcss for automatic class ordering (layout → spacing → typography → colors)'
  },
  'content-official-plugins': {
    priority: 'SHOULD',
    rule: 'Use official plugins (@tailwindcss/typography for prose, @tailwindcss/forms for inputs)'
  },
  'content-intellisense': {
    priority: 'SHOULD',
    rule: 'Configure Tailwind CSS IntelliSense extension for autocomplete and invalid class linting'
  },
  // Tailwind CSS Golden Rules - Layout
  'layout-layer-directives': {
    priority: 'MUST',
    rule: 'Use @layer (base/components/utilities) for custom CSS to integrate with Tailwind specificity'
  },
  'layout-custom-utilities': {
    priority: 'SHOULD',
    rule: 'Create custom utilities in @layer utilities for missing CSS properties (text-wrap, scrollbar)'
  }
};

export function getAgentRule(principleId: string): string {
  const rule = agentRules[principleId];
  if (!rule) {
    return 'Agent rule not available for this principle.';
  }

  const priorityPrefix = rule.priority === 'NEVER' ? 'NEVER:' : `${rule.priority}:`;
  return `${priorityPrefix} ${rule.rule}`;
}

export function formatAgentRuleForExport(priority: AgentRulePriority, rule: string): string {
  const prefix = priority === 'NEVER' ? 'NEVER:' : `${priority}:`;
  return `${prefix} ${rule}`;
}
