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
  },
  // ============================================================================
  // Claude Code Suggestion - Animation, Performance & Interaction Rules
  // Research: Missing rules identified via WCAG compliance analysis, CSS perf
  // optimization patterns, and modern API best practices (2025)
  // ============================================================================

  // WCAG 2.2.2 Level A - Pause, Stop, Hide
  // Ref: https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html
  // Ref: https://www.digitala11y.com/understanding-sc-2-2-2-pause-stop-hide/
  'animations-pause-stop-hide': {
    priority: 'MUST',
    rule: 'Auto-playing animations >5s MUST have pause/stop/hide controls; OR auto-stop after 5s. Applies to carousels, video backgrounds, infinite loops. Essential animations (loading spinners, progress) are exempt.'
  },

  // CSS Containment for Performance
  // Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
  // Ref: https://web.dev/articles/content-visibility
  'performance-css-containment': {
    priority: 'SHOULD',
    rule: 'Use CSS `contain: layout paint` on reusable cards/list items to isolate layout/paint scope. Use `content-visibility: auto` with `contain-intrinsic-size` for offscreen content (up to 7x render improvement).'
  },

  // will-change Usage Guidelines
  // Ref: https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/
  // Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
  'animations-will-change-sparingly': {
    priority: 'SHOULD',
    rule: 'Use `will-change` sparingly—only on frequently animated elements. Apply via JS before animation starts, remove after completion. Never blanket-apply; each layer consumes GPU memory.'
  },

  // Animation Frame Budget (60fps)
  // Ref: https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/
  // Ref: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals
  'animations-frame-budget': {
    priority: 'SHOULD',
    rule: 'Animation work SHOULD complete within 16ms frame budget (60fps). Use requestAnimationFrame for JS animations. Batch DOM reads then writes to avoid layout thrashing in animation loops.'
  },

  // View Transitions API
  // Ref: https://developer.chrome.com/blog/view-transitions-in-2025
  // Ref: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
  'animations-view-transitions': {
    priority: 'SHOULD',
    rule: 'Use View Transitions API for page/state transitions. Add `@view-transition { navigation: auto; }` for MPA. Use `view-transition-name` for morphing elements. Progressive enhancement—works without JS.'
  },

  // Spring Physics for Natural Motion
  // Ref: https://www.dhiwise.com/post/react-spring-vs-framer-motion-a-detailed-guide-to-react
  // Ref: https://react-spring-visualizer.com/
  'animations-spring-physics': {
    priority: 'SHOULD',
    rule: 'Prefer spring-based animations for interactive elements (buttons, modals, drag). Configure mass/tension/friction instead of duration/easing for natural feel and interruptible motion.'
  },

  // Motion Library + Tailwind Conflicts
  // Ref: https://motion.dev/docs/react-tailwind
  // Ref: https://dev.to/manukumar07/framer-motion-tailwind-the-2025-animation-stack-1801
  'animations-motion-tailwind-conflict': {
    priority: 'SHOULD',
    rule: 'When using Framer Motion/Motion with Tailwind, remove conflicting `transition-*` classes from animated elements. Let Motion handle transitions to prevent stuttery/weird motion.'
  },

  // Tailwind motion-safe/motion-reduce Variants
  // Ref: https://tailwindcss.com/docs/animation
  // Ref: https://dev.to/hexshift/building-fluid-motion-safe-animations-in-tailwind-css-that-respect-user-preferences-3i6e
  'animations-tailwind-motion-variants': {
    priority: 'MUST',
    rule: 'Use Tailwind `motion-safe:` and `motion-reduce:` variants to conditionally apply animations. Default pattern: `motion-safe:animate-*` ensures animations only run when user allows motion.'
  },

  // Pause Offscreen Animations
  // Ref: https://web.dev/articles/content-visibility
  // Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
  'animations-pause-offscreen': {
    priority: 'SHOULD',
    rule: 'Pause or disable animations for offscreen elements using IntersectionObserver or `content-visibility: auto`. Saves CPU/battery on mobile. Resume when element enters viewport.'
  },

  // ============================================================================
  // Claude Code - Core Web Vitals Performance Rules
  // Research: LCP, CLS, INP optimization strategies for modern web performance
  // Ref: https://web.dev/articles/vitals
  // ============================================================================

  // LCP Hero Optimization
  // Ref: https://web.dev/articles/optimize-lcp
  // Ref: https://web.dev/articles/preload-critical-assets
  'performance-lcp-hero-optimization': {
    priority: 'MUST',
    rule: 'LCP images (hero, banner): Use `loading="eager"` + `fetchpriority="high"` + `decoding="async"`. Add `<link rel="preload" as="image">` in head. NEVER lazy-load above-the-fold content.'
  },

  // Font Display Strategy
  // Ref: https://web.dev/articles/optimize-webfont-loading
  // Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
  'performance-font-display-strategy': {
    priority: 'MUST',
    rule: 'Use `font-display: swap` to prevent FOIT (invisible text). Preconnect to font CDNs. Preload critical fonts. Match fallback font metrics with `size-adjust` to minimize CLS during font swap.'
  },

  // Responsive Images
  // Ref: https://web.dev/articles/serve-responsive-images
  // Ref: https://web.dev/articles/serve-images-webp
  'performance-responsive-images': {
    priority: 'MUST',
    rule: 'Use `srcset` + `sizes` for responsive images. Serve WebP/AVIF with `<picture>` fallback. Always set explicit `width`/`height` attributes or CSS `aspect-ratio` to prevent CLS.'
  },

  // Skeleton Dimensions
  // Ref: https://web.dev/articles/cls
  // Ref: https://web.dev/articles/optimize-cls
  'performance-skeleton-dimensions': {
    priority: 'MUST',
    rule: 'Skeleton placeholders MUST match final content dimensions exactly. Include image placeholders with correct aspect ratios. Text skeleton heights should match typography line heights. Poor skeletons cause CLS.'
  },

  // ============================================================================
  // Aesthetics - Anthropic Frontend-Design Skill
  // Source: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
  // ============================================================================

  'aesthetics-distinctive-typography': {
    priority: 'SHOULD',
    rule: 'Use distinctive, characterful fonts instead of generic defaults (Inter, Roboto, Arial). Pair a display font with a refined body font for memorable visual identity.'
  },
  'aesthetics-color-dominance': {
    priority: 'SHOULD',
    rule: 'Use bold dominant colors with 1-2 sharp accent highlights. Avoid timid, evenly-distributed palettes. The 60-30-10 rule works, but pushing to 90% dominant with surgical accent placement is often better.'
  },
  'aesthetics-orchestrated-motion': {
    priority: 'SHOULD',
    rule: 'Orchestrate page load reveals with staggered animation-delay (100-150ms intervals). Reveal in reading order: hero first, then navigation, then content. Random micro-interactions feel chaotic.'
  },
  'aesthetics-spatial-composition': {
    priority: 'SHOULD',
    rule: 'Break predictable symmetric grids with asymmetry, overlap, negative margins, and varied scale. Feature one dominant element at unexpected scale. Use whitespace asymmetrically to create tension.'
  },
  'aesthetics-atmospheric-backgrounds': {
    priority: 'SHOULD',
    rule: 'Add depth with gradient meshes (layered radial-gradient), subtle noise textures (2-5% opacity), and backdrop-filter effects. Plain solid backgrounds feel flat and lifeless.'
  },
  'aesthetics-bold-direction': {
    priority: 'SHOULD',
    rule: 'Commit to a design direction (brutalist, editorial, organic) and execute with precision. Avoid generic AI aesthetics: purple gradients, sparkles, excessive border-radius. Polarizing is better than forgettable.'
  },
  'aesthetics-anti-generic': {
    priority: 'NEVER',
    rule: 'Use generic fonts (Inter, Roboto, Arial, system-ui), purple gradients, perfectly centered layouts, excessive border-radius, or sparkle emojis. These are hallmarks of AI-generated slop. Choose distinctive typography, intentional colors, and layouts with asymmetry.'
  },
  'aesthetics-css-first-animations': {
    priority: 'SHOULD',
    rule: 'Use CSS transitions and animations for hover effects, reveals, and simple state changes. Reserve JavaScript animations for physics-based motion, gestures, or complex orchestration. CSS runs on compositor thread; JS blocks main thread.'
  },
  'aesthetics-craftsmanship': {
    priority: 'SHOULD',
    rule: 'Demonstrate meticulous craftsmanship: consistent spacing scale (4/8/12/16/24px), pixel-perfect alignment, harmonious proportions. No arbitrary values, misaligned elements, or inconsistent padding. Every detail should feel intentional.'
  },
  'aesthetics-design-commitment': {
    priority: 'SHOULD',
    rule: 'Commit fully to a cohesive aesthetic using CSS variables. Deploy dominant colors (deep black, vibrant brand color) with sharp accents. Avoid timid palettes with pale grays and washed-out colors. Half-measures are forgettable; conviction is memorable.'
  },
  'aesthetics-visual-first': {
    priority: 'SHOULD',
    rule: 'Aim for 90% visual, 10% essential text. Communicate through large icons, bold illustrations, color, and space—not paragraphs. Text should be rare and powerful: single words, short labels, essential context only. If you need a paragraph to explain something, the visual design has failed.'
  },
  'aesthetics-negative-space': {
    priority: 'SHOULD',
    rule: 'Use generous or controlled negative space intentionally as a design element. Avoid cramped layouts with tight padding. Apply comfortable line-height (1.5-1.75), generous padding (16-24px), and meaningful space between sections. Whitespace creates hierarchy and lets content breathe.'
  },
  'aesthetics-scroll-interactions': {
    priority: 'SHOULD',
    rule: 'Use IntersectionObserver for scroll-triggered reveals. Stagger animations with animation-delay (100-150ms intervals). Keep animations subtle (translate 10-20px, fade 0 to 1). Use motion-safe: to respect reduced motion preferences. Transform passive browsing into active discovery.'
  },
  'aesthetics-memorable-differentiation': {
    priority: 'SHOULD',
    rule: 'Include one memorable, unforgettable element per design (animated border, distinctive illustration, dramatic typography, unexpected shadow). Ask: "What will someone remember?" If you cannot answer, add a signature element. One bold detail beats a dozen safe flourishes.'
  },
  'aesthetics-design-variety': {
    priority: 'SHOULD',
    rule: 'Never converge on common choices. Vary themes (light/dark), fonts (serif/sans/mono), and aesthetics across designs. Avoid using Space Grotesk, Inter, or blue accents on every project. Each design should have a distinct personality.'
  },
  'aesthetics-complexity-matching': {
    priority: 'SHOULD',
    rule: 'Match implementation complexity to aesthetic vision. Minimalist designs need restrained styling (single shadows, solid colors, clean borders). Maximalist designs can layer effects, gradients, and animations. Mismatch creates cognitive dissonance—a simple note card with layered shadows, blurs, and glowing buttons signals importance the content does not warrant.'
  },

  // ============================================================================
  // RAMS - Accessibility and Visual Design Rules
  // Source: https://www.rams.ai/
  // Automated design review for AI-generated code - catches accessibility issues
  // and visual bugs. Checks semantic HTML, keyboard/focus, typography, layout,
  // color/contrast, and component states.
  // ============================================================================

  // Content Accessibility
  'content-rams-alt-text': {
    priority: 'MUST',
    rule: 'All images must have alt attribute - descriptive for informative images, empty alt="" for decorative images. Screen readers announce images; missing alt creates confusion.'
  },
  'content-rams-heading-levels': {
    priority: 'MUST',
    rule: 'Heading levels must be hierarchical (h1-h6) without skipping levels. Never go from h1 to h3. Screen reader users navigate by headings; skipped levels break navigation.'
  },
  'content-rams-link-text': {
    priority: 'MUST',
    rule: 'Link text must describe its destination - avoid generic text like "click here" or "read more". Links should make sense out of context for screen reader link lists.'
  },

  // Interaction Accessibility
  'interactions-rams-aria-labels': {
    priority: 'MUST',
    rule: 'Icon-only buttons must have aria-label describing the action. Decorative icons need aria-hidden="true". Screen readers cannot interpret visual icons.'
  },
  'interactions-rams-focus-outline': {
    priority: 'MUST',
    rule: 'Interactive elements must have visible focus indicator. Never use outline-none without providing focus-visible replacement. Keyboard users must see where focus is.'
  },
  'interactions-rams-keyboard-handlers': {
    priority: 'MUST',
    rule: 'Interactive elements with onClick must also handle keyboard events (Enter/Space for buttons). Use semantic elements (<button>) which handle this automatically.'
  },
  'interactions-rams-role-attributes': {
    priority: 'MUST',
    rule: 'Use semantic HTML elements (<button>, <a>, <nav>) before ARIA roles. If using role="button" on a div, also add tabIndex="0" and keyboard handlers.'
  },
  'interactions-rams-semantic-handlers': {
    priority: 'NEVER',
    rule: 'Use <div onClick> or <span onClick> for interactive elements. Use <button> for actions, <a>/<Link> for navigation. Non-semantic elements lack keyboard support.'
  },
  'interactions-rams-tabindex': {
    priority: 'NEVER',
    rule: 'Use positive tabIndex values (>0) as they disrupt natural tab order. Use tabIndex="0" to add to flow, tabIndex="-1" for programmatic focus only.'
  },
  'interactions-rams-touch-targets': {
    priority: 'MUST',
    rule: 'Clickable elements must be at least 44x44px for touch accessibility (WCAG 2.5.5 AAA). Minimum 24x24px (WCAG 2.5.8 AA). Small targets cause misclicks.'
  },

  // Form Accessibility
  'forms-rams-form-labels': {
    priority: 'MUST',
    rule: 'Every form input must have associated <label> with htmlFor, be wrapped by <label>, or have aria-label. Placeholder is not a substitute for labels.'
  },

  // Design Accessibility
  'design-rams-color-only': {
    priority: 'NEVER',
    rule: 'Convey information using color alone. Add text labels, icons, or patterns as secondary indicators. Color-blind users (8% of males) cannot distinguish certain colors.'
  },
  'design-rams-color-contrast': {
    priority: 'MUST',
    rule: 'UI components (buttons, inputs, icons) must have minimum 3:1 contrast ratio against adjacent colors (WCAG 1.4.11). Test in both light and dark themes.'
  },
  'design-rams-text-contrast': {
    priority: 'MUST',
    rule: 'Text must have minimum 4.5:1 contrast ratio against background (WCAG 1.4.3). Large text (18pt+/14pt+ bold) can use 3:1. Low contrast causes eye strain.'
  },
  'design-rams-inconsistent-spacing': {
    priority: 'SHOULD',
    rule: 'Use consistent spacing values from a defined scale (4px, 8px, 16px, etc.). Avoid mixing arbitrary pixel values. Inconsistent spacing creates visual imbalance.'
  },
  'design-rams-crowded-elements': {
    priority: 'SHOULD',
    rule: 'Provide adequate whitespace between interactive elements to prevent accidental activation. Touch targets should have at least 8px gap between them.'
  },
  'design-rams-excessive-whitespace': {
    priority: 'SHOULD',
    rule: 'Balance whitespace - excessive gaps break visual relationships and increase scrolling. Group related elements with proximity. Whitespace should be intentional.'
  },
  'design-rams-font-consistency': {
    priority: 'SHOULD',
    rule: 'Use consistent font families and weights throughout the interface. Limit to 2-3 font families maximum. Too many fonts create visual chaos.'
  },
  'design-rams-text-sizing': {
    priority: 'SHOULD',
    rule: 'Use a consistent typographic scale for text sizes. Body text should be minimum 16px on web, never below 12px. Small text causes readability issues.'
  },
  'design-rams-color-harmony': {
    priority: 'SHOULD',
    rule: 'Use harmonious color combinations from a defined palette. Clashing colors create visual discomfort. Consider color temperature and saturation balance.'
  },
  'design-rams-semantic-colors': {
    priority: 'SHOULD',
    rule: 'Use semantic color tokens consistently - red/destructive for errors, green/success for confirmation, yellow/warning for caution, blue/info for information.'
  },
  'design-rams-border-radius': {
    priority: 'SHOULD',
    rule: 'Apply consistent border-radius values from a defined scale. Nested elements should have proportionally smaller radii (outer - border-width = inner).'
  },
  'design-rams-shadow-consistency': {
    priority: 'SHOULD',
    rule: 'Use consistent elevation/shadow tokens to convey hierarchy. Ensure shadows have sufficient contrast in both light and dark themes. Avoid mixing shadow styles.'
  },
  'design-rams-alignment': {
    priority: 'SHOULD',
    rule: 'Align related elements consistently using a grid system. Left-align text content for readability. Center buttons only when intentionally creating a focal point.'
  },

  // ============================================================================
  // @Ibelick UI-Skills Rules
  // Source: https://www.ui-skills.com/
  // GitHub: https://github.com/ibelick/ui-skills
  // Skills: baseline-ui, fixing-motion-performance, fixing-accessibility
  // Opinionated constraints for building better interfaces with AI agents
  // ============================================================================

  // Performance
  'performance-ibelick-tailwind-defaults': {
    priority: 'MUST',
    rule: 'Use Tailwind CSS defaults unless custom values already exist or are explicitly requested. Arbitrary values (w-[347px]) indicate design system gaps.'
  },
  'performance-ibelick-no-blur-animation': {
    priority: 'NEVER',
    rule: 'Animate large blur() or backdrop-filter surfaces. They are expensive paint operations that cause frame drops, especially on mobile devices.'
  },
  'performance-ibelick-will-change': {
    priority: 'NEVER',
    rule: 'Apply will-change outside an active animation. It wastes GPU memory when not needed. Add dynamically before animation, remove after completion.'
  },
  'performance-ibelick-no-effect-render': {
    priority: 'NEVER',
    rule: 'Use useEffect for anything that can be expressed as render logic. Derive state during render, not in effects. Effects are for synchronization with external systems.'
  },

  // Animations
  'animations-ibelick-motion-library': {
    priority: 'MUST',
    rule: 'Use motion/react (formerly framer-motion) when JavaScript animation is required. It provides spring physics, gesture support, and exit animations out of the box.'
  },
  'animations-ibelick-tw-animate': {
    priority: 'SHOULD',
    rule: 'Use tw-animate-css for entrance and micro-animations in Tailwind CSS. Provides consistent, performant CSS animations without JavaScript overhead.'
  },
  'animations-ibelick-intentional-only': {
    priority: 'NEVER',
    rule: 'Add animation unless it is explicitly requested. Gratuitous animation slows perceived performance and can cause motion sickness. Animation should serve purpose.'
  },
  'animations-ibelick-compositor-only': {
    priority: 'MUST',
    rule: 'Animate only compositor properties (transform, opacity). These run on GPU without triggering layout or paint. 60fps requires < 16ms per frame.'
  },
  'animations-ibelick-no-layout': {
    priority: 'NEVER',
    rule: 'Animate layout properties (width, height, top, left, margin, padding). Use transform: scale() and translate() instead. Layout triggers are expensive.'
  },
  'animations-ibelick-minimize-paint': {
    priority: 'SHOULD',
    rule: 'Avoid animating paint properties (background, color, box-shadow) except for small, local UI elements. Large paint areas cause jank on lower-end devices.'
  },
  'animations-ibelick-timing': {
    priority: 'NEVER',
    rule: 'Exceed 200ms for interaction feedback. Use ease-out on entrance, ease-in on exit. Never introduce custom easing curves unless explicitly requested.'
  },
  'animations-ibelick-pause-offscreen': {
    priority: 'MUST',
    rule: 'Pause looping animations when off-screen using IntersectionObserver. Saves CPU/battery on mobile. Resume when element enters viewport.'
  },
  'animations-ibelick-reduced-motion': {
    priority: 'SHOULD',
    rule: 'Respect prefers-reduced-motion media query. Reduce or disable animations for users who experience motion sickness. Use motion-safe: and motion-reduce: variants.'
  },

  // Forms
  'forms-ibelick-cn-utility': {
    priority: 'MUST',
    rule: 'Use cn utility (clsx + tailwind-merge) for conditional class logic. Handles class conflicts, falsy values, and array inputs cleanly.'
  },
  'forms-ibelick-error-placement': {
    priority: 'MUST',
    rule: 'Show errors inline next to where the action happens. Disconnected toasts or top-of-form error summaries force users to hunt for problems.'
  },
  'forms-ibelick-no-paste-blocking': {
    priority: 'NEVER',
    rule: 'Block paste in input or textarea elements. Users paste from password managers, notes, and other sources. Blocking paste creates friction and security issues.'
  },

  // Layout
  'layout-ibelick-z-index-scale': {
    priority: 'MUST',
    rule: 'Use a fixed z-index scale (z-10, z-20, z-30) not arbitrary values. Document the scale. Arbitrary z-index values lead to escalating z-index wars.'
  },
  'layout-ibelick-size-utility': {
    priority: 'SHOULD',
    rule: 'Use size-* for square elements instead of separate w-* and h-* classes. Reduces class count and communicates intent (this element is square).'
  },
  'layout-ibelick-viewport-height': {
    priority: 'NEVER',
    rule: 'Use h-screen or 100vh on mobile. Use h-dvh (dynamic viewport height) instead to account for mobile browser chrome (address bar, navigation).'
  },
  'layout-ibelick-safe-areas': {
    priority: 'MUST',
    rule: 'Respect safe-area-inset for fixed/sticky elements on notched devices. Use pb-safe, pt-safe or env(safe-area-inset-*) to prevent content obscuring.'
  },

  // Interactions
  'interactions-ibelick-accessible-primitives': {
    priority: 'MUST',
    rule: 'Use accessible component primitives (Base UI, React Aria, Radix) for keyboard/focus behavior. These handle ARIA, focus management, and keyboard navigation correctly.'
  },
  'interactions-ibelick-existing-components': {
    priority: 'MUST',
    rule: 'Use the project\'s existing component primitives before introducing new libraries. Check for existing Button, Dialog, Popover components first.'
  },
  'interactions-ibelick-no-primitive-mixing': {
    priority: 'NEVER',
    rule: 'Mix primitive systems (Radix + React Aria) within the same interaction surface. Focus management conflicts cause bugs. Pick one system per component.'
  },
  'interactions-ibelick-base-ui': {
    priority: 'SHOULD',
    rule: 'Prefer Base UI for new primitives if compatible with the stack. It\'s unstyled, accessible, and doesn\'t impose styling opinions.'
  },
  'interactions-ibelick-icon-buttons': {
    priority: 'MUST',
    rule: 'Add aria-label to icon-only buttons describing the action. "Close", "Delete", "Edit" - not "X icon" or "Trash icon". Screen readers need action context.'
  },
  'interactions-ibelick-manual-behavior': {
    priority: 'NEVER',
    rule: 'Rebuild keyboard or focus behavior by hand unless explicitly requested. Use established primitives. Hand-rolled accessibility is usually incomplete.'
  },
  'interactions-ibelick-alert-dialog': {
    priority: 'MUST',
    rule: 'Use AlertDialog (not Dialog) for destructive or irreversible actions. AlertDialog traps focus and requires explicit confirmation, preventing accidents.'
  },
  'interactions-ibelick-loading-skeletons': {
    priority: 'SHOULD',
    rule: 'Use structural skeletons for loading states instead of spinners. Skeletons show content shape, reduce perceived wait time, and prevent layout shift.'
  },

  // Design
  'design-ibelick-no-gradients': {
    priority: 'NEVER',
    rule: 'Use gradients unless explicitly requested. Solid colors are easier to maintain, more accessible, and don\'t clash with content.'
  },
  'design-ibelick-no-purple': {
    priority: 'NEVER',
    rule: 'Use purple or multicolor gradients. They are hallmarks of AI-generated slop and generic templates. Choose distinctive, intentional colors.'
  },
  'design-ibelick-no-glow': {
    priority: 'NEVER',
    rule: 'Use glow effects (box-shadow with blur and color) as primary affordances. Glows are decorative, not functional. Use borders or backgrounds for affordance.'
  },
  'design-ibelick-default-shadows': {
    priority: 'SHOULD',
    rule: 'Use Tailwind CSS default shadow scale (shadow-sm, shadow, shadow-md) unless explicitly requested. Custom shadows often clash with the design system.'
  },
  'design-ibelick-empty-states': {
    priority: 'MUST',
    rule: 'Give empty states one clear next action. "No results" with a button to adjust filters. "No items" with a button to create first item. Never leave users stuck.'
  },
  'design-ibelick-color-restraint': {
    priority: 'SHOULD',
    rule: 'Limit accent color usage to one per view. Use existing theme or Tailwind color tokens before introducing new colors. Every new color needs justification.'
  },

  // Content
  'content-ibelick-text-balance': {
    priority: 'MUST',
    rule: 'Use text-balance for headings (prevents orphans) and text-pretty for body paragraphs (optimizes line breaks). Improves readability without manual tweaking.'
  },
  'content-ibelick-tabular-nums': {
    priority: 'MUST',
    rule: 'Use tabular-nums (font-variant-numeric: tabular-nums) for numerical data in tables, counters, and prices. Numbers align in columns without jumping.'
  },
  'content-ibelick-text-overflow': {
    priority: 'SHOULD',
    rule: 'Use truncate or line-clamp-* for dense UI to prevent layout breaking. Add title attribute for full text on hover. Long text should never break layout.'
  },
  'content-ibelick-letter-spacing': {
    priority: 'NEVER',
    rule: 'Modify letter-spacing (tracking-*) unless explicitly requested. Default tracking is optimized for readability. Custom tracking often hurts legibility.'
  },

  // Aesthetics - Grid Breaking
  'aesthetics-grid-breaking': {
    priority: 'SHOULD',
    rule: 'Break rigid grids intentionally with varied card sizes, diagonal flow, and overlapping elements. One dominant element, asymmetric spacing, and depth through z-index create visual hierarchy over predictable symmetry.'
  },

  // Aesthetics - Font Pairing
  'aesthetics-font-pairing': {
    priority: 'SHOULD',
    rule: 'Pair a distinctive display font (serif or geometric sans) for headlines with a refined body font for content. Same font everywhere creates flat hierarchy. Limit to 2 font families; use font-display: swap.'
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
