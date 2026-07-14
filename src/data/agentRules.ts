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
    rule: 'Honor `prefers-reduced-motion` (provide reduced variant); in Tailwind use the `motion-safe:`/`motion-reduce:` variants'
  },
  'animations-implementation-preference': {
    priority: 'SHOULD',
    rule: 'Prefer CSS > Web Animations API > JS libraries'
  },
  'animations-compositor-friendly': {
    priority: 'MUST',
    rule: 'Animate compositor-friendly props (`transform`, `opacity`) — they run on the GPU without layout or paint; avoid layout/repaint props (`top/left/width/height`, `margin`). 60fps leaves <16ms per frame'
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
    rule: 'Redundant status cues (never color alone) — add a text label, icon, or pattern as a second indicator; icons have text labels. ~8% of males cannot distinguish certain colors'
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
  // Tailwind CSS Golden Rules - Performance
  'performance-content-paths': {
    priority: 'MUST',
    rule: 'Configure Tailwind content paths to include all files using utility classes'
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

  // Animation Frame Budget (60fps)
  // Ref: https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/
  // Ref: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals
  'animations-frame-budget': {
    priority: 'SHOULD',
    rule: 'Animation work SHOULD complete within 16ms frame budget (60fps). Use requestAnimationFrame for JS animations. Batch layout reads then writes — never interleave them — so a frame does not thrash between reflows and repaints.'
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

  // ============================================================================
  // Core Web Vitals Performance Rules
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

  // ============================================================================
  // Aesthetics - Anthropic Skills
  // Source: https://skills.sh/
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
  'aesthetics-bold-direction': {
    priority: 'SHOULD',
    rule: 'Commit to a design direction (brutalist, editorial, organic) and execute with precision. Avoid generic AI aesthetics: purple gradients, sparkles, excessive border-radius. Polarizing is better than forgettable.'
  },
  'aesthetics-anti-generic': {
    priority: 'NEVER',
    rule: 'Use generic fonts (Inter, Roboto, Arial, system-ui), purple gradients, perfectly centered layouts, excessive border-radius, or sparkle emojis. These are hallmarks of AI-generated slop. Choose distinctive typography, intentional colors, and layouts with asymmetry.'
  },
  'aesthetics-craftsmanship': {
    priority: 'SHOULD',
    rule: 'Demonstrate meticulous craftsmanship: consistent spacing scale (4/8/12/16/24px), pixel-perfect alignment, harmonious proportions. No arbitrary values, misaligned elements, or inconsistent padding. Every detail should feel intentional.'
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
  'content-descriptive-link-text': {
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
    rule: 'Interactive elements must have visible focus indicator. Never use outline-hidden without providing focus-visible replacement. Keyboard users must see where focus is.'
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
  'design-rams-color-contrast': {
    priority: 'MUST',
    rule: 'Text needs >= 4.5:1 against its background (WCAG 1.4.3); large text (>= 24px, or >= 19px bold) may use 3:1. Secondary text, captions and disabled states are where this fails. For UI component boundaries and states, `design-non-text-contrast` sets the separate 3:1 bar (WCAG 1.4.11). Test in both themes.'
  },
  'design-rams-inconsistent-spacing': {
    priority: 'SHOULD',
    rule: 'Use consistent spacing values from a defined scale (4px, 8px, 16px, etc.). Avoid mixing arbitrary pixel values. Inconsistent spacing creates visual imbalance.'
  },
  'design-crowded-elements': {
    priority: 'SHOULD',
    rule: 'Provide adequate whitespace between interactive elements to prevent accidental activation. Touch targets should have at least 8px gap between them.'
  },
  'design-excessive-whitespace': {
    priority: 'SHOULD',
    rule: 'Balance whitespace - excessive gaps break visual relationships and increase scrolling. Group related elements with proximity. Whitespace should be intentional.'
  },
  'design-rams-font-consistency': {
    priority: 'SHOULD',
    rule: 'Use consistent font families, weights, and sizes throughout the interface. Limit to 2-3 font families maximum; take sizes from one typographic scale, with body text >= 16px on web and nothing below 12px.'
  },
  'design-color-harmony': {
    priority: 'SHOULD',
    rule: 'Use harmonious color combinations from a defined palette. Clashing colors create visual discomfort. Consider color temperature and saturation balance.'
  },
  'design-color-meaning': {
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

  // Aesthetics - Font Pairing
  'aesthetics-font-pairing': {
    priority: 'SHOULD',
    rule: 'Pair a distinctive display font (serif or geometric sans) for headlines with a refined body font for content. Same font everywhere creates flat hierarchy. Limit to 2 font families; use font-display: swap.'
  },

  // Animations - Emil Kowalski: match motion to frequency
  'animations-emil-frequency': {
    priority: 'SHOULD',
    rule: 'Match motion to how often an action happens. Keyboard-initiated and 100+/day actions get no animation; reserve delight for rare or first-time moments.'
  },

  // Animations - Emil Kowalski: asymmetric enter/exit
  'animations-emil-asymmetric': {
    priority: 'SHOULD',
    rule: 'Use asymmetric timing: deliberate user actions animate slower, system responses and exits snap. Symmetric enter/exit timing makes dismissals feel sluggish.'
  },

  // Animations - Emil Kowalski: stagger group entrances
  'animations-emil-stagger': {
    priority: 'SHOULD',
    rule: 'Stagger entrance animations for groups of items by 30–80ms. A whole list animating at once reads as a single flash.'
  },

  // ---------------------------------------------------------------------------
  // Rauno Freiberg — Interactions
  // ---------------------------------------------------------------------------
  'interactions-toggles-immediate-effect': {
    priority: 'MUST',
    rule: 'Toggles apply their change immediately — never pair a toggle with a separate Save/confirm step. If the action needs confirmation, use a checkbox + submit button instead.'
  },
  'interactions-user-select-interactive': {
    priority: 'SHOULD',
    rule: 'Set `user-select: none` on the inner content of interactive elements (buttons, tabs, menu items) so click-drag never selects their label text.',
    codeExample: 'button, [role="tab"] { user-select: none; }'
  },
  'interactions-decorative-pointer-events': {
    priority: 'MUST',
    rule: 'Set `pointer-events: none` on purely decorative layers (glows, gradients, overlays) so they never intercept clicks meant for elements underneath.',
    codeExample: '.glow { position: absolute; inset: 0; pointer-events: none; }'
  },
  'interactions-hover-media-query': {
    priority: 'MUST',
    rule: 'Gate hover styles behind `@media (hover: hover)` so touch devices never get a flash of sticky hover state on press.',
    codeExample: '@media (hover: hover) {\n  .btn:hover { background: var(--accent); }\n}'
  },
  'interactions-video-autoplay-ios': {
    priority: 'MUST',
    rule: 'Autoplaying `<video>` needs `muted` and `playsInline` — without both, iOS Safari blocks playback or forces fullscreen.',
    codeExample: '<video autoPlay muted loop playsInline src="/clip.mp4" />'
  },
  'interactions-tap-highlight-replacement': {
    priority: 'MUST',
    rule: 'If you clear `-webkit-tap-highlight-color`, replace it with your own touch feedback (an `:active` state) — never leave a tap with zero visual confirmation.',
    codeExample: 'a { -webkit-tap-highlight-color: rgba(0,0,0,0); }\na:active { background: var(--muted); }'
  },
  'interactions-disabled-no-tooltips': {
    priority: 'NEVER',
    rule: 'Put a tooltip on a `disabled` button — it cannot receive focus or hover reliably, so keyboard users never see it. Use `aria-disabled` plus visible explanation text instead.'
  },
  'interactions-list-delete-shortcut': {
    priority: 'SHOULD',
    rule: 'In a sequential list of focusable items, support `ArrowUp`/`ArrowDown` to move between items and `⌘/Ctrl + Backspace` to delete the focused item.'
  },
  'interactions-mousedown-dropdown': {
    priority: 'SHOULD',
    rule: 'Open dropdown menus on `mousedown`, not `click` — `click` fires on mouseup and adds perceived latency to the press.'
  },
  'interactions-svg-favicon-theme': {
    priority: 'SHOULD',
    rule: 'Ship an SVG favicon containing an inline `<style>` with `prefers-color-scheme` so the icon adapts to light/dark browser chrome.',
    codeExample: '<style>path { fill: #000 }\n@media (prefers-color-scheme: dark) { path { fill: #fff } }</style>'
  },
  'interactions-focus-ring-shadow': {
    priority: 'SHOULD',
    rule: 'Draw focus rings with `box-shadow` (Tailwind `ring-*`), not `outline` — outline ignores `border-radius` before Safari 16.4, so rounded controls get a rectangle.',
    codeExample: ':focus-visible { box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring); }'
  },
  'interactions-tooltip-interactive-content': {
    priority: 'NEVER',
    rule: 'Put interactive content inside a hover tooltip — the tooltip unmounts as the pointer leaves the trigger and its controls never enter the tab order. If it has something to press, make it a click-triggered popover/dialog with `aria-haspopup`, focus movement and Escape dismiss.'
  },
  'interactions-gesture-touch-action': {
    priority: 'MUST',
    rule: 'Set `touch-action: none` on surfaces that implement their own pan/zoom (map, canvas, carousel, drag handle) or the browser claims the gesture and fires `pointercancel` mid-drag. Scope it to the gesture surface — never the page.',
    codeExample: '.canvas { touch-action: none; }'
  },
  'interactions-gradient-text-selection': {
    priority: 'MUST',
    rule: 'For gradient text (`background-clip: text`), unset the gradient in `::selection` — otherwise the selection highlight renders it unreadable.',
    codeExample: '.gradient-text::selection { -webkit-text-fill-color: #fff; background: var(--accent); }'
  },

  // ---------------------------------------------------------------------------
  // Rauno Freiberg — Animations
  // ---------------------------------------------------------------------------
  'animations-theme-switch-no-transitions': {
    priority: 'MUST',
    rule: 'Suppress `transition` and `animation` on every element while flipping the theme, then restore them on the next frame — otherwise each colour-animating element ripples across the page.',
    codeExample: 'document.documentElement.classList.add("theme-switching");\nsetTheme(next);\nrequestAnimationFrame(() => document.documentElement.classList.remove("theme-switching"));\n/* .theme-switching *, .theme-switching *::before, .theme-switching *::after { transition: none !important } */'
  },
  'animations-proportional-values': {
    priority: 'SHOULD',
    rule: 'Keep animation values proportional to the element: dialogs scale from ~0.95–0.8 (never 0), buttons compress to ~0.96 on press (never 0.8).'
  },
  'animations-smooth-scroll-anchors': {
    priority: 'SHOULD',
    rule: 'Use `scroll-behavior: smooth` for in-page anchors, with `scroll-margin-top` on targets so headings clear any sticky header.',
    codeExample: 'html { scroll-behavior: smooth; }\n:target { scroll-margin-top: 5rem; }'
  },

  // ---------------------------------------------------------------------------
  // Rauno Freiberg — Content & Typography
  // ---------------------------------------------------------------------------
  'content-font-smoothing': {
    priority: 'SHOULD',
    rule: 'Apply `-webkit-font-smoothing: antialiased` so subpixel rendering does not make text look heavier than the designed weight.',
    codeExample: 'body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }'
  },
  'content-text-rendering': {
    priority: 'SHOULD',
    rule: 'Apply `text-rendering: optimizeLegibility` to enable kerning and ligatures, most visible at heading sizes.'
  },
  'content-font-subsetting': {
    priority: 'SHOULD',
    rule: 'Subset webfonts to the alphabets/languages actually used and declare `unicode-range` — full font files ship glyphs you never render.',
    codeExample: '@font-face { font-family: Inter; src: url(/inter-latin.woff2) format("woff2"); unicode-range: U+0000-00FF; }'
  },
  'content-font-weight-hover-stable': {
    priority: 'NEVER',
    rule: 'Change `font-weight` on hover or selected state — bolder text takes more space and reflows its neighbors. Reserve the space up front (or use color/background/opacity instead).',
    codeExample: '/* reserve bold width so the label never reflows */\n.item::after { content: attr(data-label); font-weight: 600; height: 0; visibility: hidden; }'
  },
  'content-min-font-weight': {
    priority: 'NEVER',
    rule: 'Use font weights below 400 — thin and light weights (100–300) hurt readability on low-DPI screens and for low-vision users.'
  },
  'content-heading-weight': {
    priority: 'SHOULD',
    rule: 'Give medium-sized headings a `font-weight` of 500–600; 800–900 reads heavy and disconnected from body text.'
  },
  'content-fluid-clamp': {
    priority: 'SHOULD',
    rule: 'Scale type fluidly with `clamp(min, preferred-vw, max)` instead of stacking font-size breakpoints.',
    codeExample: 'h1 { font-size: clamp(48px, 5vw, 72px); }'
  },
  'content-text-size-adjust': {
    priority: 'MUST',
    rule: 'Set `-webkit-text-size-adjust: 100%` so iOS Safari does not inflate text on landscape rotation (this still allows user zoom).',
    codeExample: 'html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }'
  },
  'content-image-tag-not-background': {
    priority: 'MUST',
    rule: 'Render content images with `<img>` + meaningful `alt`, never CSS `background-image` — a background has no role, no accessible name, and no "copy image" context menu. Reserve `background-image` for textures and gradients.'
  },
  'content-illustration-label': {
    priority: 'MUST',
    rule: 'Give a div-built illustration or chart `role="img"` + `aria-label` on the wrapper and `aria-hidden="true"` on its inner nodes, so screen readers announce it once instead of walking every group.',
    codeExample: '<div role="img" aria-label="Revenue grew 40% in Q3">\n  <div className="bar" aria-hidden="true" />\n</div>'
  },

  // ---------------------------------------------------------------------------
  // Rauno Freiberg — Forms
  // ---------------------------------------------------------------------------
  'forms-input-decorations-positioning': {
    priority: 'MUST',
    rule: 'Absolutely position input prefix/suffix icons on top of the input and pad the input around them — do not place them as flex siblings. Clicking a decoration must focus the input.',
    codeExample: '<div className="relative">\n  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />\n  <input className="pl-9" />\n</div>'
  },

  'forms-native-validation': {
    priority: 'SHOULD',
    rule: 'Lean on native constraint validation (`required`, `type="email"`, `pattern`, `min`, `minlength`) instead of hand-rolled JS checks; drop `noValidate` and reach for `setCustomValidity` only for rules HTML cannot express.'
  },

  // ---------------------------------------------------------------------------
  // Rauno Freiberg — Performance
  // ---------------------------------------------------------------------------
  'performance-adaptive-capabilities': {
    priority: 'SHOULD',
    rule: 'Branch on `navigator.deviceMemory`, `navigator.hardwareConcurrency` and `navigator.connection.effectiveType`/`.saveData` to drop blurs, autoplay and heavy assets on weak devices. Treat them as hints: always ship a working default when undefined, and never fingerprint with them.',
    codeExample: 'const lite = navigator.connection?.saveData || (navigator.deviceMemory ?? 8) < 4;'
  },
  'performance-gradient-banding': {
    priority: 'SHOULD',
    rule: 'Build soft glows with `radial-gradient()` rather than a filled rectangle scaled and run through `filter: blur()` — the blur+scale route bands. Where a gradient still bands, fade it with a `mask-image` gradient instead of stacking more blur.',
    codeExample: '.glow { background: radial-gradient(circle, oklch(0.7 0.2 250 / 0.5), transparent 70%); }'
  },
  'performance-gpu-translatez': {
    priority: 'SHOULD',
    rule: 'Reach for `transform: translateZ(0)` / `will-change` sparingly — only on the specific element with a measured animation problem. Blanket layer promotion burns GPU memory and can make things slower.'
  },
  'performance-video-autoplay-performance': {
    priority: 'MUST',
    rule: 'Do not autoplay every video at once — observe visibility with `IntersectionObserver` and pause (or unmount) off-screen videos; iOS chokes otherwise.'
  },
  'performance-refs-bypass-render': {
    priority: 'SHOULD',
    rule: 'For high-frequency real-time values (pointer position, scroll, rAF), write to the DOM through a `ref` instead of `useState` — the visual result is identical with zero re-renders.',
    codeExample: 'const el = useRef<HTMLDivElement>(null);\nonPointerMove = (e) => { el.current!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; };'
  },

  // ---------------------------------------------------------------------------
  // Rauno Freiberg — Design
  // ---------------------------------------------------------------------------
  'design-selection-styling': {
    priority: 'SHOULD',
    rule: 'Style `::selection` with brand colors instead of shipping the browser default blue.',
    codeExample: '::selection { background: var(--accent); color: var(--accent-foreground); }'
  },
  'design-feedback-near-trigger': {
    priority: 'MUST',
    rule: 'Render feedback at its trigger: swap the copy button to an inline checkmark, highlight the erroring input — do not fire a distant toast for a local action.'
  },
  'design-server-auth-redirect': {
    priority: 'MUST',
    rule: 'Redirect unauthenticated users on the server (302 before any HTML ships), not from a client-side effect — client redirects flash the protected page and jank the URL.'
  },

  // ---------------------------------------------------------------------------
  // Interactions — focus grouping, hydration, drag physics
  // ---------------------------------------------------------------------------
  'interactions-focus-within-group': {
    priority: 'MUST',
    rule: 'Ring the wrapper of a compound control with `:focus-within` (and `outline: none` on the children), keeping a distinct style on the focused child — do not ring only the inner `<input>`.',
    codeExample: '.field:focus-within { outline: 2px solid var(--ring); outline-offset: 2px; }\n.field :is(input, button):focus-visible { outline: none; background: var(--muted); }'
  },
  'interactions-hydration-warning-suppression': {
    priority: 'NEVER',
    rule: 'Put `suppressHydrationWarning` on a subtree or layout wrapper to quiet mismatch noise — it keeps the wrong server value on screen. Apply it to the single element rendering a genuinely unstable value (`Date.now()`, a local clock, a random id) and fix every other mismatch at the source.'
  },
  'interactions-drag-physics': {
    priority: 'SHOULD',
    rule: 'Give drags real physics: dismiss on velocity (`Math.abs(distance) / elapsedMs > ~0.11`) rather than a distance threshold, damp past boundaries (`over * limit / (over + limit)`), call `setPointerCapture(e.pointerId)` on drag start, and ignore extra pointers once a drag owns one.'
  },

  // ---------------------------------------------------------------------------
  // Animations — Emil Kowalski (easing, duration, entry, springs)
  // ---------------------------------------------------------------------------
  'animations-emil-no-ease-in': {
    priority: 'NEVER',
    rule: 'Reach for `ease-in` on UI motion: it barely moves during the first ~100ms the user is watching, so a 200ms `ease-in` reads slower than a 200ms `ease-out`. Default both entrances and exits to `ease-out`; `ease-in-out` for on-screen morphs, `ease` for hover/color, `linear` for constant motion. (This is the strict Emil position; other sources here allow `ease-in` on exits — pick one stance per product and apply it consistently.)'
  },
  'animations-emil-strong-easing': {
    priority: 'SHOULD',
    rule: 'Replace the weak built-in easing keywords with strong custom curves, defined once as tokens rather than hand-rolled per component.',
    codeExample: ':root {\n  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);\n  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);\n  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);\n}'
  },
  'animations-emil-duration-budget': {
    priority: 'MUST',
    rule: 'Keep UI animations under 300ms, budgeted per element: press feedback 100–160ms, tooltip/small popover 125–200ms, dropdown/select 150–250ms, modal/drawer 200–500ms (the only type allowed past the 300ms ceiling). Marketing and explanatory motion is exempt — it is content, not interface.'
  },
  'animations-emil-transitions-over-keyframes': {
    priority: 'SHOULD',
    rule: 'Drive rapidly-retriggered motion (toasts, toggles) with CSS `transition` or a spring, not `@keyframes` — a transition retargets from the element\'s current value, while a keyframe animation restarts from its `from` and visibly teleports.'
  },
  'animations-emil-starting-style': {
    priority: 'SHOULD',
    rule: 'Animate first-render entrances with `@starting-style` instead of a `useEffect` mounted-flag plus double `requestAnimationFrame` — it degrades to an instant appearance where unsupported.',
    codeExample: '.popover { opacity: 1; transition: opacity 200ms var(--ease-out); }\n@starting-style { .popover { opacity: 0; } }'
  },
  'animations-emil-blur-crossfade': {
    priority: 'SHOULD',
    rule: 'When a crossfade still reads as a ghosted double exposure, add a small transition-scoped `filter: blur(2px)` (2–4px, single element, only for the duration of the transition, always < 20px) so the two states fuse into one morph. This is the narrow carve-out from "never animate blur", which targets large, long-lived, or continuously-animating blurs — stay especially conservative in Safari.'
  },
  'animations-emil-subtle-bounce': {
    priority: 'SHOULD',
    rule: 'Keep spring bounce within 0.1–0.3 (`{ type: "spring", duration: 0.5, bounce: 0.2 }`) and reserve any bounce for drag-to-dismiss and playful interactions — everyday menus, dropdowns and modals are usually better with none.'
  },
  'animations-emil-motion-cohesion': {
    priority: 'SHOULD',
    rule: 'Define duration and easing once as motion tokens and spend them everywhere, matching the curve to the product\'s personality (crisp and bounce-free for a dashboard, slower and bouncier for a playful app) rather than letting each component be animated to whoever built it\'s taste.'
  },
  'animations-svg-transform-box': {
    priority: 'MUST',
    rule: 'Transform animated SVG shapes on a `<g>` wrapper with `transform-box: fill-box` and `transform-origin: center` — the CSS default `view-box` resolves the origin against the `viewBox`, so an off-centre shape orbits the canvas instead of spinning in place.',
    codeExample: 'g.spinner { transform-box: fill-box; transform-origin: center; animation: spin 1s linear infinite; }'
  },
  'animations-impeccable-no-bounce-easing': {
    priority: 'NEVER',
    rule: 'Let a UI element overshoot its final position: no `animate-bounce`, no animation named `bounce|elastic|wobble|jiggle|spring`, and no `cubic-bezier()` whose y1 or y2 falls outside `[-0.1, 1.1]`. Ease out with exponential curves (ease-out-quart / quint / expo).'
  },

  // ---------------------------------------------------------------------------
  // Layout — sizing, containers, overflow
  // ---------------------------------------------------------------------------
  'layout-min-width-truncation': {
    priority: 'MUST',
    rule: 'Add `min-w-0` (`min-width: 0`) to any flex child that must truncate — flex items default to `min-width: auto` and refuse to shrink below their content, so `text-overflow: ellipsis` never has an overflow to clip. Grid children need `min-w-0` or `minmax(0, 1fr)`.',
    codeExample: '<div class="flex items-center gap-2">\n  <span class="min-w-0 flex-1 truncate">{longFileName}</span>\n  <button class="shrink-0">Open</button>\n</div>'
  },
  'layout-flex-over-measurement': {
    priority: 'SHOULD',
    rule: 'Solve layout with flex and grid instead of reading `getBoundingClientRect`/`offsetWidth` and writing the result back as inline styles — measurement forces a synchronous reflow, can only run after first paint (so the UI visibly jumps), is wrong during SSR, and goes stale without a `ResizeObserver`.'
  },
  'layout-impeccable-nested-cards': {
    priority: 'NEVER',
    rule: 'Nest a card inside a card — an element counts as card-like when it has (a shadow OR a border) AND (a radius OR a background). Build hierarchy inside a card with padding, one hairline divider, and type weight, not a second chrome layer.'
  },
  'layout-impeccable-cramped-padding': {
    priority: 'MUST',
    rule: 'Scale padding inside any bordered, outlined, or filled container from its font size: vertical >= `max(4px, fontSize * 0.3)` and horizontal >= `max(8px, fontSize * 0.5)` — at least 8px, ideally 12–16px. Also catch the `padding: 28px 0 0` shorthand bug, where the sides get quietly zeroed and text sits flush against the border.'
  },
  'layout-impeccable-body-text-viewport-edge': {
    priority: 'MUST',
    rule: 'Never let a paragraph or list item land within 16px of the left or right viewport edge — give the wrapping container at least 16px (ideally 24–32px) of horizontal padding, or a `max-width` plus `mx-auto` once there is room for one.'
  },
  'layout-impeccable-clipped-overflow': {
    priority: 'NEVER',
    rule: 'Leave an absolutely-positioned tooltip, menu, or popover inside an ancestor with `overflow: hidden` or `overflow: clip` — the layer gets silently cut off. Clip the image rather than the whole card, or promote the layer out of the subtree with the native Popover API (top layer) or a portal.'
  },

  // ---------------------------------------------------------------------------
  // Content — voice, copy mechanics, i18n
  // ---------------------------------------------------------------------------
  'content-active-voice': {
    priority: 'MUST',
    rule: 'Write instructions, empty states, and errors in active voice — "Install the CLI", not "The CLI will be installed".'
  },
  'content-title-case': {
    priority: 'SHOULD',
    rule: 'Use Chicago-style Title Case for headings, buttons, and menu items — capitalize principal words, lowercase short articles, conjunctions, and prepositions.'
  },
  'content-numerals-for-counts': {
    priority: 'MUST',
    rule: 'Write counts and quantities as numerals — "8 deployments", not "eight deployments" — so they can be scanned, compared, and aligned.'
  },
  'content-specific-button-labels': {
    priority: 'MUST',
    rule: 'Label buttons with verb plus object ("Save API Key", "Delete Project"), never a generic "Continue" or "OK" — the label is read out of context by a screen reader cycling controls.'
  },
  'content-actionable-errors': {
    priority: 'MUST',
    rule: 'Every error message states the fix, not just the problem: the expected format, the missing permission, or a link/button to the place the user can resolve it.'
  },
  'content-second-person-voice': {
    priority: 'SHOULD',
    rule: 'Address the reader as "you" and avoid "we"/"I" in product copy — "your build failed", not "we were unable to complete the build".'
  },
  'content-ampersand-in-tight-space': {
    priority: 'SHOULD',
    rule: 'Use `&` instead of "and" in width-constrained labels (sidebar items, tabs, table headers) so compound labels like "Billing & Invoices" stay on one line; keep "and" in prose.'
  },
  'content-translate-no': {
    priority: 'MUST',
    rule: 'Wrap brand names, code tokens, commands, and identifiers in `translate="no"` so browser auto-translate leaves them runnable while the surrounding prose stays translatable.',
    codeExample: '<code translate="no">npm install vercel</code>'
  },
  'content-language-detection': {
    priority: 'MUST',
    rule: 'Pick the UI language from `Accept-Language` / `navigator.languages`, never from IP geolocation (VPNs, travel, and multilingual countries break that assumption), and still expose an explicit language switcher as the override.'
  },
  'content-impeccable-line-length': {
    priority: 'MUST',
    rule: 'Cap the measure: give prose containers `max-width: 65ch`–`75ch`. The detector estimates characters per line as `width / (fontSize * 0.5)` and flags anything above 85.'
  },
  'content-impeccable-tight-leading': {
    priority: 'MUST',
    rule: 'Set body `line-height` to 1.5–1.7 and never below 1.3 (flagged on any non-heading carrying more than 50 characters); derive the whole spacing scale from the resulting line box (16px × 1.5 = 24px).'
  },
  'content-impeccable-tiny-text': {
    priority: 'MUST',
    rule: 'Set prose at 14px minimum, 16px ideally, in `rem` so browser font settings still apply — anything under 12px on an element with more than 20 characters of text is a bug. UI chrome (buttons, links, labels, nav, badges, code, captions) is exempt.'
  },
  'content-impeccable-all-caps-body': {
    priority: 'NEVER',
    rule: 'Apply `text-transform: uppercase` to running text — flagged on any non-heading over 30 characters, because capitals erase the word shape readers recognize. Reserve uppercase for short labels and headings, and give those 0.05em–0.12em of letter-spacing.'
  },
  'content-impeccable-justified-text': {
    priority: 'NEVER',
    rule: 'Ship `text-align: justify` without `hyphens: auto` — stretched word-spacing carves rivers of white through the paragraph. Left-align body text; if a justified column is non-negotiable, set `hyphens: auto` plus a `lang` attribute so the browser has a dictionary.',
    codeExample: 'p { text-align: justify; hyphens: auto; } /* requires <html lang="en"> */'
  },
  'content-impeccable-type-scale-contrast': {
    priority: 'SHOULD',
    rule: 'Generate every type step from one ratio of at least 1.25 (major third), 1.333, or 1.5 rather than adding near-identical sizes — a page with 3 or more distinct sizes whose largest-to-smallest ratio is under 2.0 has no hierarchy left to squint at.'
  },
  'content-impeccable-em-dash-overuse': {
    priority: 'SHOULD',
    rule: 'Punctuate with commas, colons, semicolons, periods, or parentheses instead of em-dashes (and never the ASCII `--`) — 5 or more in body text is a machine-written cadence readers register even when each individual dash is defensible.'
  },
  'content-impeccable-marketing-buzzwords': {
    priority: 'NEVER',
    rule: 'Ship generic SaaS phrasing — "streamline your", "empower your", "supercharge", "unleash the power", "best-in-class", "industry-leading", "world-class", "enterprise-grade", "next-generation", "cutting-edge", "seamless experience", "harness the power" (~30 blocked phrases, any single hit fires). If the sentence would fit a CRM, a CDN, and a coffee machine equally well, replace it with a specific verb and noun. Same for 3 or more manufactured-contrast lines ("Not a feature. A platform.").'
  },
  'content-impeccable-dark-mode-text-compensation': {
    priority: 'MUST',
    rule: 'Compensate light-on-dark type on all three axes at once — `line-height` +0.05 to +0.1, `letter-spacing` +0.01em to +0.02em, and optionally one step of body weight — because light glyphs optically bloom. One type spec cannot serve both themes.'
  },

  // ---------------------------------------------------------------------------
  // Performance — hydration, connections, images, gestures
  // ---------------------------------------------------------------------------
  'performance-hydration-safe-dates': {
    priority: 'MUST',
    rule: 'Render dates deterministically on the server — a fixed locale and time zone, or an ISO string inside `<time dateTime>` — and localize inside `useEffect` after hydration. Calling `toLocaleString()`/`new Date()` during render mismatches between a UTC server and the user\'s zone, discarding the SSR subtree.'
  },
  'performance-preconnect-asset-domains': {
    priority: 'SHOULD',
    rule: 'Add `<link rel="preconnect">` for every CDN and asset origin the page is certain to hit (with `crossorigin` for fonts and CORS-fetched assets) so DNS, TCP, and TLS overlap with HTML parsing. Only preconnect to origins you will definitely use — each holds an open socket.',
    codeExample: '<link rel="preconnect" href="https://cdn.example.com" crossorigin>'
  },
  'performance-lazy-load-below-fold': {
    priority: 'MUST',
    rule: 'Eagerly load (and `rel="preload"`) only above-the-fold imagery; give every below-the-fold image `loading="lazy"`. Keep `width`/`height` or `aspect-ratio` on it so deferring the download does not reintroduce layout shift, and never lazy-load the LCP hero.',
    codeExample: '<img src="/chart.png" width="800" height="450" loading="lazy" decoding="async" alt="…">'
  },
  'performance-transform-not-css-variable': {
    priority: 'NEVER',
    rule: 'Drive child transforms by writing a CSS variable on the parent during a gesture (`el.style.setProperty(\'--swipe-amount\', …)`) — it invalidates every descendant reading that variable, recalculating styles across the subtree on each pointer move. Set `transform` directly on the one element that moves, and prefer `animate={{ transform: "translateX(100px)" }}` over Motion\'s main-thread `x`/`y`/`scale` shorthands.'
  },

  // ---------------------------------------------------------------------------
  // Design — theming, native controls, AI-UI tells
  // ---------------------------------------------------------------------------
  'design-color-scheme': {
    priority: 'MUST',
    rule: 'Set `color-scheme` on `<html>` (`dark`, or `light dark` to follow the OS) so browser-drawn UI — scrollbars, checkboxes, radios, range tracks, date pickers, number spinners — repaints for the theme. This is separate from reading `prefers-color-scheme`, which only tells you what the user wants.',
    codeExample: 'html { color-scheme: light dark; }\nhtml[data-theme="dark"] { color-scheme: dark; }'
  },
  'design-theme-color-meta': {
    priority: 'SHOULD',
    rule: 'Match the mobile browser and PWA chrome to the page background by shipping one `<meta name="theme-color">` per scheme with the literal background value — a `<meta>` tag cannot read CSS custom properties, and leaving it unset puts a default light address bar above a dark page.',
    codeExample: '<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">\n<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">'
  },
  'design-select-colors': {
    priority: 'MUST',
    rule: 'Set BOTH `background-color` and `color` on every native `<select>` from your tokens (and pair them with `color-scheme` so the option popup follows) — form controls do not inherit them, so styling only the text leaves near-white on the platform\'s white Field background in Windows dark mode.'
  },
  'design-impeccable-side-tab-border': {
    priority: 'NEVER',
    rule: 'Hang a thick colored stripe off one side of a card (one border side >= 2px while the others are <= 1px, in a non-neutral color, on a rounded box) — it makes the border-box asymmetric so text lands off-centre, and encodes status in hue alone. Use one even border, a tinted surface, and a leading icon plus a worded status.'
  },
  'design-impeccable-dark-glow': {
    priority: 'NEVER',
    rule: 'Add a colored `box-shadow` glow (chroma >= 30, blur radius > 4px) to elements sitting on a near-black surface (relative luminance < 0.1). Build depth on dark from a surface lightness scale (roughly 15% / 20% / 25%), which stays legible in bright ambient light and costs no extra paint.'
  },
  'design-impeccable-gradient-text': {
    priority: 'NEVER',
    rule: 'Use `background-clip: text` (or `-webkit-background-clip: text`) with a gradient background and a transparent text color — the glyphs then have no color, so the selection highlight paints behind invisible letters and forced-colors mode can erase the heading entirely. Set one solid color and carry emphasis with weight or size.'
  },
  'design-impeccable-no-glassmorphism': {
    priority: 'NEVER',
    rule: 'Apply `backdrop-filter: blur()` to ordinary content surfaces (cards, tiles, panels) — it re-blurs everything behind it on every scroll tick, and makes text contrast a property of whatever happens to be scrolling underneath (the same label can measure 8:1 over one band and 1.9:1 over the next), which no test can catch. Reserve blur for chrome that genuinely overlaps scrolling content — a sticky nav, a sheet — and use opaque surfaces everywhere else.'
  },
  'design-impeccable-tinted-neutrals': {
    priority: 'NEVER',
    rule: 'Ship `#000`, `#fff`, or zero-chroma grays like `#808080` — tint every neutral toward the brand\'s hue at OKLCH chroma ~0.005–0.015, letting chroma fall toward 0 as lightness approaches 0 or 100. Use the actual brand hue, not a reflexive warm-orange or cool-blue.',
    codeExample: '--surface: oklch(0.98 0.008 265);\n--ink: oklch(0.18 0.01 265);'
  },
  'design-impeccable-alpha-smell': {
    priority: 'SHOULD',
    rule: 'Define an explicit opaque token per surface instead of reaching for `rgba()`/`hsla()` to fake a missing palette step — a translucent color\'s contrast ratio belongs to the backdrop, not the token, so the same `text-white/60` can measure 6.2:1 on one surface and 2.7:1 on the next. Exception: focus rings and transient hover/pressed states, which never carry text.'
  },

  // ---------------------------------------------------------------------------
  // Aesthetics — impeccable: the AI-generated-UI template tells
  // ---------------------------------------------------------------------------
  'aesthetics-impeccable-icon-tile-stack': {
    priority: 'NEVER',
    rule: 'Stack a rounded-square icon tile above a feature heading — the tell is geometric: a heading\'s previous sibling measuring 32–128px on both axes, roughly square, with a visible background or border and a border-radius under half its width. Move the icon inline into the heading line, drop the container, or give the feature a real image. (A circular avatar, radius = half the width, is exempt.)'
  },
  'aesthetics-impeccable-hero-eyebrow': {
    priority: 'NEVER',
    rule: 'Put a tracked-caps eyebrow or pill chip immediately above a hero headline — font-size <= 14px combined with either uppercase plus letter-spacing >= 1.6px, or font-weight >= 700 in an accent color; 3 or more such kickers on one page is the same failure at page scale. Fold its content ("Now in beta") into the subhead or a real nav-level badge, and separate sections with structure (a rule, spacing, a genuine `<h2>`).'
  },
  'aesthetics-impeccable-cream-palette': {
    priority: 'NEVER',
    rule: 'Reach for the reflexive warm cream/beige page surface — mechanically: `min(r,g,b) >= 209`, channels ordered `r >= g >= b`, and warmth `r - b` between 6 and 48, which catches `bg-amber-50/100`, `bg-orange-50/100`, `bg-yellow-50`, and `bg-stone-50/100/200`. If you can guess the palette from the product\'s domain alone, it is the training-data reflex. Derive the surface instead: hold the brand hue angle and drop chroma to roughly 0.01.'
  },
  'aesthetics-impeccable-oversized-hero': {
    priority: 'SHOULD',
    rule: 'Reserve display size for short headlines — an `h1` is oversized only when ALL THREE hold: font-size >= 72px AND at least 40 characters AND >= 28% of viewport height (or >= 25% of viewport area). Keep the display size, cut the headline to its shortest true form, and let the full sentence live at 18–20px directly underneath.'
  },
  'aesthetics-impeccable-hero-metric-template': {
    priority: 'NEVER',
    rule: 'Ship a decorative hero metric — a round, unsourced "10x faster" / "99.99%" / "500M+" with no denominator, no window, and no source, dressed in a gradient accent. A prominent number is allowed on exactly one condition: it shows actual user data (this account, this window, live, timestamped). Otherwise replace the stat row with one concrete product screenshot.'
  },
  'interactions-loading-state-duration': {
    priority: 'MUST',
    rule: 'Gate every spinner/skeleton with two timers: a show-delay of ~150–300ms (fast responses show nothing) and a minimum visible time of ~300–500ms once it appears, so it never flashes. React `<Suspense>` already does this.'
  },
  'interactions-locale-keyboard-shortcuts': {
    priority: 'MUST',
    rule: 'Bind mnemonic shortcuts to `event.key` (the character the layout produced), not `event.code` (a QWERTY key position — breaks on Dvorak/AZERTY); reserve `event.code` for positional bindings like WASD, and render `⌘/⌥/⇧` on macOS vs `Ctrl/Alt/Shift` elsewhere.',
    codeExample: 'if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") openPalette();\n// NOT: e.code === "KeyK"'
  },
  'interactions-press-feedback-scale': {
    priority: 'SHOULD',
    rule: 'Answer every press instantly with `transform: scale(0.97)` on `:active` and `transition: transform 160ms ease-out`. Stay inside 0.95–0.98 (0.85 reads as broken), and apply it to any pressable element — cards, icon buttons, list rows — not only `<button>`.',
    codeExample: '.pressable { transition: transform 160ms ease-out; }\n.pressable:active { transform: scale(0.97); } /* Tailwind: active:scale-[0.97] */'
  },
  'animations-emil-no-scale-zero': {
    priority: 'NEVER',
    rule: 'Enter from `scale(0)` — nothing in the real world appears from a point. Start from `scale(0.9–0.97)` (0.96 is a safe popover/menu default) plus `opacity: 0`. Equally never enter on opacity alone: without a transform the element materializes instead of arriving.',
    codeExample: '@keyframes enter { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }'
  },
  'animations-clip-path-reveal': {
    priority: 'SHOULD',
    rule: 'Reach for `clip-path: inset(t r b l)` for reveals, wipes, hold-to-delete overlays, seamless tab-color swaps, and comparison sliders — each value eats in from that side, the element keeps its box, so nothing below it moves and no layout is recalculated (unlike animating `height`).',
    codeExample: '.reveal { clip-path: inset(0 0 100% 0); transition: clip-path 400ms ease-out; }\n.reveal.is-visible { clip-path: inset(0 0 0 0); }'
  },
  'animations-percentage-translate': {
    priority: 'SHOULD',
    rule: 'Park off-screen elements with translate percentages, not hardcoded px: `translateY(100%)` resolves against the element\'s own height, so it stays correct when a toast wraps or a drawer gains a row. Add edge gaps with `calc(100% + 12px)` rather than a magic number.',
    codeExample: '.toast { transform: translateY(calc(100% + 12px)); } /* not translateY(300px) */\n.toast[data-open] { transform: translateY(0); }'
  },
  'animations-input-driven': {
    priority: 'NEVER',
    rule: 'Autoplay motion just because a component mounted — the only thing that happened is that the user arrived. Animate in response to an input: hover, press, drag, scroll-into-view, or a request completing. Autoplay loops also keep the compositor awake and become a WCAG 2.2.2 problem past 5s.'
  },
  'animations-lottie-motion-layers': {
    priority: 'SHOULD',
    rule: 'Build a hero moment in three layers — primary (the action the eye follows), secondary (shadow trailing ~50ms, contents arriving ~100ms after the card lands), ambient (background drift) — instead of pushing one flat sprite. SCOPE: three layers is three times the motion, so spend it only on rare first-run/hero surfaces (empty-state illustration, onboarding card, marketing hero). On anything repeated — a row rendered 400 times, a menu opened fifty times a day — `animations-necessity-check` and `animations-emil-frequency` win and the correct layer count is one, or zero.'
  },
  'animations-lottie-concurrency-cap': {
    priority: 'SHOULD',
    rule: 'With 3+ elements, keep at most ~1/3 in active motion at any instant so the eye keeps an anchor: land a hero element first, then bring the rest in waves. This is NOT stagger — stagger sets when items START, this caps how many are MOVING. A 30ms stagger over 9 cards with a 220ms duration still has all 9 in flight; you need both rules.'
  },
  'animations-lottie-stagger-budget': {
    priority: 'MUST',
    rule: 'Treat a cascade as a TOTAL budget, not a per-item constant: keep total stagger under 500ms (micro 20–40ms/item under 200ms; standard 50–100ms under 400ms; dramatic 100–200ms under 600ms for theatre only). Take the per-item value from `animations-emil-stagger` (30–80ms), take the CEILING from here — and on long lists the ceiling wins, because `i * 60ms` on 30 rows delays the last row 1740ms and pops content in below the scroll position. Clamp, or stagger only the rows in view.',
    codeExample: 'const MAX_TOTAL = 400;\nconst delay = Math.min(i * 60, MAX_TOTAL);'
  },
  'animations-lottie-distance-duration': {
    priority: 'SHOULD',
    rule: 'Derive duration from travel distance, sublinearly — 100px = base, 200px = 1.3x, 400px = 1.6x — then clamp to a ~140ms floor and ~400ms ceiling. One `--duration-md` cannot serve an 8px tooltip nudge and a full-height sheet. This is a third axis, not a duplicate: `animations-proportional-values` scales transform AMPLITUDE, `animations-emil-duration-budget` assigns duration by element TYPE, and distance is what reconciles them (it is why drawers are the one type allowed past 300ms — a drawer is not special, it is far).',
    codeExample: 'const factor = 1 + 0.3 * Math.log2(px / 100); // 100px=1x, 200px=1.3x, 400px=1.6x\nconst duration = Math.min(400, Math.max(140, 250 * factor));'
  },
  'animations-lottie-never-opacity-only': {
    priority: 'NEVER',
    rule: 'Signal an important state change with opacity alone — peripheral vision reads movement, not luminance, so a "Saved" pill that fades in place off-axis is frequently never seen. Pair the fade with position or scale (a 6px rise is enough). Motion is the REINFORCEMENT channel only: the state still needs `role="status"` / `aria-live="polite"`, and since the transform is dropped under `prefers-reduced-motion`, the opacity change must remain sufficient on its own.'
  },
  'animations-named-timing-constants': {
    priority: 'SHOULD',
    rule: 'Hoist every delay, duration and easing into one named block and drive a multi-stage sequence with a single integer stage, not scattered magic numbers and boolean flags (`isCardVisible` / `isHeadingVisible` / `areRowsVisible`) — otherwise retuning the tempo means hunting five call sites and the heading silently starts arriving after the rows it introduces.',
    codeExample: 'const TIMING = { cardAppear: 300, heading: 900, rows: 1500 } as const;\n// then: stage >= 2 ? ... : ...'
  },
  'layout-interface-symmetrical-padding': {
    priority: 'NEVER',
    rule: 'Give a box four different padding values (`padding: 24px 16px 12px 16px`) — that is residue from nudging one side, not a decision, and it de-centres the content so a stack of cards loses its rhythm. Use one uniform value (`padding: 16px`) or at most a single horizontal/vertical pair (`padding: 12px 16px`).'
  },
  'layout-interface-screen-grounding': {
    priority: 'MUST',
    rule: 'Ground every screen with three anchors: navigation (where you can go), a location indicator (breadcrumbs / page title / active nav state — where you are), and user context (who is signed in, which workspace). A data table with none of them is a component demo, not a product. Give the sidebar the same background as the canvas and separate it with a border, not a different fill.'
  },
  'content-be-concise': {
    priority: 'MUST',
    rule: 'Write the sentence, then delete words until deleting one more would change the meaning. Cut padding phrases ("in order to", "please note that", "at this time"); keep the nouns and the verb, drop the ceremony.'
  },
  'content-consistent-nouns': {
    priority: 'MUST',
    rule: 'Name each object once and reuse that exact noun in every label, heading, toast, and error — project/app/site/deployment for one concept reads as four things. Introduce as few unique terms as possible and keep a glossary.'
  },
  'content-consistent-placeholders': {
    priority: 'MUST',
    rule: 'Use one loud, obviously-fake placeholder convention across all code samples — `YOUR_API_TOKEN_HERE` for strings, `0123456789` for numbers — never a mix of `<your-token>` / `xxx` / `abc123` / `[INSERT KEY]`. (This is about fill-me-in tokens in docs, not the HTML `placeholder` attribute.)'
  },
  'content-currency-formatting': {
    priority: 'MUST',
    rule: 'Pick 0 or 2 decimal places per context and format every amount that way, including round ones — never mix `$12` with `$8.50` in one column. Pair with tabular figures and right alignment so decimal separators stack.'
  },
  'content-positive-language': {
    priority: 'SHOULD',
    rule: 'Frame messages around what can be done next, not what the person did wrong — drop "you failed to", "invalid", "aborted". Stay specific about the cause and the limit; positive framing is a change of frame, not a loss of detail.'
  },
  'content-impeccable-loading-copy-expectation': {
    priority: 'SHOULD',
    rule: 'Name the work and its expected duration inside a loading state ("Analyzing your data… this usually takes 30–60 seconds") instead of a bare "Loading…", which says the same thing at 1s and at 90s so the user cannot tell working from hung. Show a signal that advances, and give anything past ~10s an escape hatch.'
  },
  'content-progress-as-milestones': {
    priority: 'SHOULD',
    rule: 'Chunk long task lists into a handful of named phases and show the current one ("Complete Phase 1 of 4") rather than leading with remaining work ("10 / 47 tasks complete"), which makes the 37 unfinished items the salient fact. Collapse finished phases into a done marker; keep the honest total reachable, just do not lead with it.'
  },
  'forms-no-password-manager-nonauth': {
    priority: 'MUST',
    rule: 'Keep reserved names (`password`) and `type="password"` off non-auth fields — password managers run heuristics over `type`/`name`/`id` and will park a credential dropdown over your search results. Give filters boring names (`q`, `filter`, `search`) with `type="search"` and `autocomplete="off"`; give OTP fields `autocomplete="one-time-code"` and `inputmode="numeric"`. This is the narrow inverse of the autofill rules, which still apply to real credential and address fields.',
    codeExample: '<input type="search" name="q" autocomplete="off" />\n<input name="otp" autocomplete="one-time-code" inputMode="numeric" />'
  },
  'performance-offload-main-thread': {
    priority: 'MUST',
    rule: 'Move expensive computation off the main thread — anything past ~50ms is a long task by Core Web Vitals and eats INP; an 800ms sync loop paints no frames and queues every click, while the CSS spinner keeps turning on the compositor and disguises the freeze as progress. Post it to a Web Worker, or chunk it and yield with `scheduler.yield()` if it must touch the DOM.',
    codeExample: 'const worker = new Worker(new URL("./crunch.worker.ts", import.meta.url), { type: "module" });\nworker.postMessage(rows);\nworker.onmessage = (e) => setResult(e.data);'
  },
  'performance-motion-shorthand-not-gpu': {
    priority: 'MUST',
    rule: 'In Motion/Framer Motion, animate the full `transform` string, not the `x`/`y`/`scale` shorthands: the shorthands are interpolated per `requestAnimationFrame` on the MAIN THREAD and drop frames under load, while `transform` as a whole string (along with `opacity`, `filter`, `clipPath`) is handed to the Web Animations API and ticked by the compositor. This is the false floor under `animations-compositor-friendly` — `animate={{ x: 100 }}` looks compliant and is not.',
    codeExample: '// main-thread rAF:  animate={{ x: 100 }}\n// compositor/WAAPI: animate={{ transform: "translateX(100px)" }}'
  },
  'design-interface-text-hierarchy-levels': {
    priority: 'SHOULD',
    rule: 'Define four text levels as tokens and use all four — primary (body, highest contrast), secondary (supporting copy), tertiary (metadata: timestamps, field labels, counts), muted (disabled/placeholder, lowest contrast). Two levels ("text" and "gray text") collapse every secondary role onto one step, so nothing recedes. Weight and colour carry more hierarchy than size — a single 14px size can hold three tiers.'
  },
  'design-interface-dark-borders-over-shadows': {
    priority: 'SHOULD',
    rule: 'On dark surfaces define elevation with a hairline low-opacity border plus one small step of surface lightness, not a drop shadow — a shadow works by darkening pixels behind the element and near-black has no luminance left to remove, so `shadow-lg` exists in the computed style and nowhere on screen.'
  },
  'design-text-antialiasing-transforms': {
    priority: 'SHOULD',
    rule: 'Animate a wrapper rather than the text node when scaling — re-rasterizing glyphs at fractional sizes makes strokes crawl and can flip sub-pixel anti-aliasing to grayscale mid-flight, and one wrapper transform keeps the lockup scaling as a single object. If artifacts persist, promote the wrapper with `translateZ(0)` or `will-change: transform` and release it when the transition ends (blanket promotion is still wrong — see `performance-gpu-translatez`).',
    codeExample: '.title-wrap { will-change: transform; transform: scale(0.96); }\n.title-wrap.is-in { transform: scale(1); } /* drop will-change on transitionend */'
  },
  'interactions-focus-not-obscured': {
    priority: 'MUST',
    rule: 'Reserve sticky header/footer height on the scroll container with `scroll-padding-block` (or `scroll-margin-top` on the items) so a newly focused element is never *entirely* hidden under fixed chrome — WCAG SC 2.4.11 Focus Not Obscured (Minimum), Level AA. A focus ring painted behind a sticky bar is worth as much as no ring at all.',
    codeExample: '.scroller { scroll-padding-block: 4rem 3rem; } /* sticky header 4rem, footer 3rem */'
  },
  'interactions-drag-alternative': {
    priority: 'MUST',
    rule: 'Every drag must have a single-pointer alternative that reaches the same outcome without travel — ↑/↓ buttons on each row, a "Move to…" menu, or arrow-key handling on a focused grip. WCAG SC 2.5.7 Dragging Movements (AA); keep the drag as an accelerator. Only genuinely essential drags (signature pad, free-form canvas, map pan) are exempt.'
  },
  'interactions-gesture-alternative': {
    priority: 'MUST',
    rule: 'Any multipoint or path-based gesture (swipe, pinch, two-finger rotate, traced path) needs a discrete single-pointer control beside it — Prev/Next buttons, real pagination dot buttons, +/− zoom, arrow keys on the focused region. WCAG SC 2.5.1 Pointer Gestures, Level A. A drawing canvas is essential; a carousel never is.'
  },
  'interactions-pointer-cancellation': {
    priority: 'MUST',
    rule: 'Preview on down, COMMIT on up: the down-event may arm, highlight, reveal, or open a menu (all reversible — that is why opening dropdowns on `mousedown` is fine), but destructive/irreversible functions (delete, submit, purchase, send, publish) must complete on the up-event on the same element, so sliding off before release aborts them. WCAG SC 2.5.2 Pointer Cancellation, Level A — `click` gives you this for free; if you truly must act on down, ship an undo instead.'
  },
  'interactions-hover-content-persistence': {
    priority: 'MUST',
    rule: 'Hover/focus popups must be DISMISSIBLE (Escape hides it without moving pointer or focus), HOVERABLE (the pointer can travel into the content and stay there — bridge the trigger/card gap with wrapper padding, not a margin) and PERSISTENT (no auto-hide timer; it stays until the trigger is left, the user dismisses it, or the info goes stale). WCAG SC 1.4.13 Content on Hover or Focus, Level AA.'
  },
  'content-text-spacing-override': {
    priority: 'MUST',
    rule: 'Text containers must survive user-applied `line-height: 1.5`, `letter-spacing: 0.12em`, `word-spacing: 0.16em` and 2× paragraph spacing with no loss of content — WCAG SC 1.4.12 Text Spacing, Level AA. The failure is the box, not the type: fixed `height` + `overflow: hidden` slices the last line off. Size with `min-height` and padding, let flex/grid tracks size to content, and never clip text you mean to be read.',
    codeExample: '/* clips at 1.5 line-height */ .card { height: 96px; overflow: hidden; }\n/* grows with the user\'s spacing */ .card { min-height: 96px; padding-block: 12px; }'
  },
  'forms-redundant-entry': {
    priority: 'MUST',
    rule: 'Within one process (checkout, signup, application), never ask for information the user already entered: auto-populate it, or make it selectable — a "same as shipping" checkbox, a dropdown of addresses already given, or the value shown next to the field. WCAG SC 3.3.7 Redundant Entry, Level A. Browser autofill does NOT satisfy it (that is SC 1.3.5); "re-enter your email to confirm" is the classic violation. Exceptions are narrow: essential re-entry, security, or stale data.'
  },
  'design-non-text-contrast': {
    priority: 'MUST',
    rule: 'Anything non-text that identifies a component or its state — input outlines, unchecked checkboxes, an off toggle, an icon-only glyph, focus indicators — and any part of a graphic needed to understand the content must hit **3:1** against adjacent colors (the text bar of 4.5:1 does not apply here). WCAG SC 1.4.11 Non-text Contrast, Level AA. A 1.2:1 hairline border on a white card is the common fail. Disabled components and unrestyled browser chrome are exempt; re-measure in dark mode, where alpha borders collapse.'
  },
  'interactions-aria-composite-tab-stop': {
    priority: 'MUST',
    rule: 'A composite widget (toolbar, listbox, menu, radiogroup, tablist, grid, tree) is ONE tab stop: roving `tabindex` — exactly one child at `0`, every other child at `-1` — with arrow keys moving the `0` and calling `.focus()`, and Tab moving past the whole widget. Twelve children must not be twelve tab stops. (Distinct from positive `tabindex`: here every value is `0` or `-1`; the bug is how many are `0`.)',
    codeExample: '<button tabIndex={i === activeIndex ? 0 : -1} onKeyDown={onArrows} />\n// ArrowRight: setActiveIndex(i + 1); itemRefs[i + 1].current.focus();'
  },
  'interactions-aria-activedescendant': {
    priority: 'SHOULD',
    rule: 'Default to roving `tabindex` (real DOM focus buys you scroll-into-view, the focus ring and focus events); reach for `aria-activedescendant` only where DOM focus must STAY in a text input — combobox, editable grid cell, tag input — because the moment focus leaves the `<input>` keystrokes stop landing, the caret vanishes, an IME composition dies mid-word and the mobile keyboard drops. Its costs are yours: stable `id` per option, style the active option yourself (it has no `:focus`), and `scrollIntoView({ block: "nearest" })` by hand.',
    codeExample: '<input role="combobox" aria-controls="lb" aria-activedescendant={activeId} />\n<ul id="lb" role="listbox"><li id="opt-2" role="option" aria-selected /></ul>'
  },
  'interactions-aria-hidden-focusable': {
    priority: 'NEVER',
    rule: 'Put `aria-hidden="true"` (or `role="presentation"`) on a visible focusable element or a subtree that is still tabbable — it strips the a11y tree but NOT the tab order, so focus walks into a ghost: the ring travels off screen and the screen reader announces nothing. Use `inert` on the container (removes it from tab order, a11y tree and hit-testing at once) or unmount it.',
    codeExample: '// ghost: <div aria-hidden="true" className="opacity-0"><button>Close</button></div>\n<div inert={!open} className="opacity-0"><button>Close</button></div>'
  },
  'interactions-aria-disabled-vs-disabled': {
    priority: 'MUST',
    rule: 'Use `aria-disabled="true"` — not HTML `disabled` — for unavailable menu items, toolbar buttons, tabs, tree items and listbox options: `disabled` drops them out of the tab order and the arrow-key sequence, so users never discover the option exists. `aria-disabled` only changes the announcement, so YOUR handler must make activation a no-op. Keep HTML `disabled` for form controls whose state is already inferable from context.',
    codeExample: '<li role="menuitem" tabIndex={-1} aria-disabled="true"\n    onClick={(e) => { if (isDisabled) return; run(); }}>Move to…</li>'
  },
  'layout-aria-landmarks': {
    priority: 'MUST',
    rule: 'Put all perceivable content inside a landmark, built from the native elements (`<header>` banner, `<nav>`, `<main>`, `<aside>`, `<footer>` contentinfo) rather than roles on divs — a div soup gives the screen-reader rotor nothing to jump to. Give each DUPLICATE landmark a unique `aria-label` (or `aria-labelledby` on its heading), and never put the role name in the label: "Site Navigation" announces as "Site Navigation navigation" — label it "Primary" and "Breadcrumb".',
    codeExample: '<nav aria-label="Primary">…</nav>\n<nav aria-label="Breadcrumb">…</nav>'
  },
  'content-aria-label-overrides-visible-text': {
    priority: 'NEVER',
    rule: 'Give a control an `aria-label` that contradicts or omits its visible text — on any role that names from child content, `aria-label` REPLACES that text, so `<button aria-label="Submit form">Save</button>` answers only to "Submit form" and a voice-control user saying "click Save" hits nothing (WCAG SC 2.5.3 Label in Name, Level A requires the accessible name to contain the visible string). Name from child content; use `aria-labelledby` to point at visible text elsewhere; reserve `aria-label` for controls with no visible text. Extending is fine — `aria-label="Save draft"` on a button reading "Save".'
  },
  'design-theme-not-root': {
    priority: 'MUST',
    rule: 'Declare design tokens in `@theme`, not `:root` — a variable in `:root` is a working custom property but Tailwind never sees it, so it generates NO utilities and the codebase fills with `bg-[var(--brand)]` arbitrary values. `@theme { --color-brand: … }` generates `bg-brand`/`text-brand`/`border-brand`/`ring-brand` AND still emits the custom property for `var()`. The namespace prefix does the work: `--color-*` feeds color utilities, `--spacing-*` spacing, `--font-*` families, `--breakpoint-*` breakpoints. Nothing errors when you get it wrong.',
    codeExample: '/* generates nothing */ :root { --brand: oklch(0.62 0.19 259); }\n/* generates bg-brand, text-brand, … */ @theme { --color-brand: oklch(0.62 0.19 259); }'
  },
  'design-border-currentcolor': {
    priority: 'MUST',
    rule: 'Never write a border width without a border color in the same breath. In v4 `border-color` defaults to `currentColor`, NOT `gray-200` as in v3 — so a bare `border` inherits the text color, a near-black paragraph gets a near-black box, `text-destructive` turns the outline red, and it can never be a surface-relative hairline in dark mode. Pair the width with a semantic token: `border border-border`. A base-layer rule resetting `border-color` is a migration crutch, not the destination.',
    codeExample: '<div class="border p-4" />              <!-- v3: gray hairline. v4: currentColor -->\n<div class="border border-border p-4" /> <!-- theme-aware in both -->'
  },
  'layout-container-queries': {
    priority: 'SHOULD',
    rule: 'A reusable component must respond to ITS OWN width, not the viewport: `md:flex-row` asks about the browser window, so the card that reads right in the main column goes horizontal inside a 300px sidebar. Put `@container` on the wrapper and `@md:` on the children — now it asks "is my container ≥28rem", with no `isCompact` prop threaded through three layers. Container queries are core in v4; installing `@tailwindcss/container-queries` is a mistake, not a dependency. The `@` variants read the nearest `@container` ANCESTOR, so the wrapper must not be the element you are sizing.',
    codeExample: '<div class="@container">\n  <div class="flex flex-col @md:flex-row">…</div>\n</div>'
  },
  'layout-no-apply-abstraction': {
    priority: 'NEVER',
    rule: 'Collapse repeated markup into a `.btn { @apply … }` class to make it look "cleaner" — it reintroduces exactly what utilities removed: you invent a name, you jump between files to read the button\'s appearance, and one edit silently repaints every button. It also collapses at the first variant (`.btn-primary`, `.btn-sm`, disabled), where you start hand-rolling the variant system you already have. Extract a COMPONENT instead — a React component with CVA — which encapsulates behaviour too, not just the class string. `@apply` is legitimate only for markup you do not control (a `.prose` subtree, a third-party widget).',
    codeExample: '/* no */ .btn { @apply inline-flex rounded-md px-4 py-2 …; }\n// yes: const button = cva("inline-flex rounded-md", { variants: { size: { sm: "px-2 py-1", md: "px-4 py-2" } } });'
  },
  'aesthetics-decorative-numbering': {
    priority: 'NEVER',
    rule: 'Stamp numbered markers (01 / 02 / 03) on a set whose order carries no information. The test takes a second: reorder the items — if nothing breaks, if Security could just as well be 01 and Analytics 03, the numerals are decoration wearing the costume of structure, and they lie to a reader who reads "01" as a promise that something follows. A real process (Push → Build → Promote) or a typed timeline earns them, because there the order IS the information. Same bar for eyebrows, dividers and labels: encode something true, or drop them.'
  },
  'aesthetics-dark-acid-default': {
    priority: 'SHOULD',
    rule: 'Treat near-black + one bright acid-green/vermilion accent as a reflex, not a choice — it is one of the looks AI-generated design clusters around, and its tell is interchangeability: the same surface and accent look equally plausible on a fintech dashboard, a wellness app and a dev tool, which means it was derived from none of them. Derive the dark surface instead: take the product\'s own hue, hold the hue angle and drop chroma, and pull the accent from the subject\'s material world rather than a neon swatch. (Distinct from `design-impeccable-dark-glow`, which is about glow SHADOWS, not the palette.)'
  },
  'interactions-outline-hidden': {
    priority: 'MUST',
    rule: 'In Tailwind v4, `outline-hidden` sets a real `outline-style: none` and KILLS the focus ring in Windows forced-colors / high-contrast mode, where custom `ring-*` shadows are stripped away — leaving those users with no focus indicator at all. v3\'s `outline-hidden` emitted an invisible outline that still showed up in forced colors; that behavior was renamed `outline-hidden`. So the ubiquitous `focus:outline-hidden` + custom ring pattern silently regresses on upgrade: use `focus-visible:outline-hidden` PLUS a visible replacement ring. (Distinct from `interactions-clear-focus` — having a ring — and `interactions-focus-ring-shadow` — box-shadow vs outline for radius.)',
    codeExample: '// v4: strips the forced-colors fallback outline\n<button class="focus:outline-hidden focus:ring-2 focus:ring-ring" />\n// keeps it\n<button class="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring" />'
  },

  // ibelick — fixing-accessibility
  'interactions-escape-dismiss': {
    priority: 'MUST',
    rule: 'Escape closes dialogs and overlays, and closes exactly ONE layer — the topmost open one. A nested popover and its parent dialog both listening for Escape on `window` means one keypress closes both and the user loses the form they were filling; the open layer handles the key and calls `stopPropagation()`. Native `<dialog>` and Radix-style primitives keep that stack for you. (Dismissal, not focus — `interactions-manage-focus` covers trap/return.)',
    codeExample: 'function onKeyDown(e: React.KeyboardEvent) {\n  if (e.key !== "Escape") return;\n  e.stopPropagation(); // do not let the parent layer close too\n  close();\n}'
  },
  'interactions-hover-revealed-actions': {
    priority: 'MUST',
    rule: 'Any action revealed on hover needs the same keyboard reveal: pair `group-hover:opacity-100` with `group-focus-within:opacity-100` (and `focus-visible:opacity-100` on the control). Row actions left at `opacity-0` stay in the tab order but render invisible, so a keyboard user focuses a button they cannot see. Do NOT "fix" it by dropping them from the tab order or setting `pointer-events-none` — that trades a broken affordance for none.',
    codeExample: '<tr class="group">\n  <td><button class="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100">Edit</button></td>\n</tr>'
  },
  'interactions-anchor-without-href': {
    priority: 'NEVER',
    rule: 'Render an `<a>` without `href` and drive it from `onClick` alone. `href` is what MAKES it a link: without it the browser exposes the element as `generic` — no link role, not focusable, not in the tab order, absent from the screen reader\'s links list, and mouse-only. Two branches: if it NAVIGATES, give it a real `href` (you get focus, the link role, Enter, middle-click, Cmd-click, "Copy link address" for free); if it performs an ACTION, it was never a link — use `<button>`.',
    codeExample: '// no: role-less, unfocusable, mouse-only\n<a onClick={() => navigate("/profile")}>View profile</a>\n// yes\n<a href="/profile">View profile</a>'
  },
  'layout-dialog-scroll-lock': {
    priority: 'SHOULD',
    rule: 'Opening a dialog must not shift the page behind it. `document.body.style.overflow = "hidden"` removes the scrollbar track, so the viewport grows ~15px and everything behind the scrim jumps sideways (and back on close). Reserve the track with `scrollbar-gutter: stable` (or pad by `window.innerWidth - document.documentElement.clientWidth` on legacy targets), and put `overscroll-behavior: contain` on the dialog\'s own scroll area so a flick inside it does not chain out.',
    codeExample: 'html { scrollbar-gutter: stable; }\n.dialog-body { overscroll-behavior: contain; }'
  },
  'content-list-and-table-semantics': {
    priority: 'MUST',
    rule: 'Lists are `<ul>`/`<ol>` + `<li>`; tables are `<table>` with `<th scope="col|row">` for headers. A `<div className="space-y-2">` of divs announces nothing — no "list, 5 items", no way to skip it — and a div grid with a bold header row reads a cell as a naked "42" instead of "Revenue, Q3, 42". Bold is not a header. Tailwind\'s `list-none` drops the marker without dropping the semantics, so there is no styling reason to use divs.'
  },
  'forms-error-programmatic-association': {
    priority: 'MUST',
    rule: 'An invalid field must set `aria-invalid="true"` and point `aria-describedby` at its message. `aria-describedby` takes a space-separated LIST of ids — keep BOTH the persistent hint id and the error id; overwriting the hint with the error on validation is the common bug, and it makes the field stop explaining itself the moment it goes wrong. Orthogonal to `forms-ibelick-error-placement` (which governs WHERE the message sits): a well-placed error that is not associated still fails.',
    codeExample: '<input id="email" aria-invalid={!!err} aria-describedby={err ? "email-err email-hint" : "email-hint"} />\n<p id="email-err">Enter a valid email address</p>\n<p id="email-hint">We only email you about your account</p>'
  },

  // ibelick — fixing-motion-performance
  'animations-no-scroll-event-animation': {
    priority: 'NEVER',
    rule: 'Drive animation from `scroll` events, `scrollY`, or `scrollTop`. Scroll is composited off the main thread, so a scroll listener is a notification that scrolling ALREADY happened — the animation is permanently one frame late and freezes outright during any long task while the page keeps scrolling under it. Throttling or rAF-wrapping the handler only makes the lag cheaper; move the timeline off the main thread instead (`animations-scroll-driven-css`).'
  },
  'animations-scroll-driven-css': {
    priority: 'SHOULD',
    rule: 'Use a CSS Scroll or View Timeline (`animation-timeline: view()`/`scroll()`) for scroll-linked motion — the compositor advances it, so it stays locked to the scrollbar even while the main thread is busy. This is still input-driven motion (`animations-input-driven`): the scroll IS the input. IntersectionObserver is a one-shot trigger, not a timeline — it cannot scrub, ignores scroll speed, and snaps on scroll-up; keep it for visibility and pausing. Chromium + Firefox 144+ only (Safari flagged), so treat it as an enhancement and make the un-animated state readable.',
    codeExample: '.reveal { animation: fade-up linear both; animation-timeline: view(); animation-range: entry 0% cover 40%; }'
  },
  'animations-surface-size-budget': {
    priority: 'MUST',
    rule: 'Budget by property TIMES area, not property alone: paint- or layout-triggering animation is acceptable only on small, isolated surfaces. Repainting a 32px icon is ~1,024px of raster work per frame; the same property on a full-bleed hero band is ~102,400px — roughly 100x — and it will miss frames. So the rule is not "never transition `filter`/`box-shadow`" — small and isolated, go ahead; large surface, move to `transform`/`opacity` on a promoted layer or do not animate it. Never blur a large surface. Duration is the second axis: one-shot effects are affordable far more often than continuous motion.'
  },
  'animations-flip-technique': {
    priority: 'SHOULD',
    rule: 'When a layout change genuinely must animate (list reorder, card expanding into a detail view), use FLIP — First, Last, Invert, Play: read the start rect, apply the final layout, read the end rect, apply the inverse `transform`, then release it in one rAF and let the compositor interpolate back to zero. Layout runs twice instead of 60x/sec. Measure ONCE and batch all DOM reads before writes — a `getBoundingClientRect()` inside the loop forces a synchronous layout every tick. (Does not contradict `layout-flex-over-measurement`: that bans JS measurement to BUILD a static layout; FLIP is the sanctioned way to ANIMATE a layout change.)'
  },
  'performance-raf-stop-condition': {
    priority: 'NEVER',
    rule: 'Ship a `requestAnimationFrame` loop with no terminal condition. `const tick = () => { draw(); requestAnimationFrame(tick); }` never ends: once the value has converged and the user has moved on, it still wakes 60x/sec to compute a delta of zero, burning a core and measurable battery even while the element is visible and idle — the usual cause of an idle tab at 10-15% CPU. Give every loop two exits: stop re-scheduling on convergence (or gesture end / `AbortSignal`), and call `cancelAnimationFrame` on teardown so an unmount cannot orphan the loop. (Distinct from `animations-ibelick-pause-offscreen`, which stops work the user cannot see.)',
    codeExample: 'const tick = () => {\n  if (settled()) return;               // terminal condition\n  id = requestAnimationFrame(tick);\n};\nreturn () => cancelAnimationFrame(id); // teardown'
  },

  // ibelick — fixing-metadata
  'design-og-image-absolute-url': {
    priority: 'MUST',
    rule: '`og:image` and `twitter:image` must be ABSOLUTE URLs. A relative `/og.png` resolves fine in your browser (it has a current document) and ships a blank grey card on Slack, iMessage and LinkedIn, which fetch the HTML and have no origin to resolve against — and nothing in your build, typecheck, or local preview complains. Build the URL from one site-wide base constant. Ship a stable 1200x630 image and set `twitter:card` to `summary_large_image`, or the artwork renders at favicon size.',
    codeExample: '<meta property="og:image" content={`${SITE_URL}/og.png`} />\n<meta name="twitter:card" content="summary_large_image" />'
  },
  'design-canonical-og-agreement': {
    priority: 'MUST',
    rule: '`canonical` must point at the page\'s preferred URL and `og:url` must be that same string. When they disagree (`/blog/post` vs `/blog/post?utm_source=x`) the page identifies itself differently depending on who asks: every share links to the tracked variant, so the authority accrues to a URL the page itself disowns, and the crawler gets a duplicate to reconcile. Compute the canonical once and feed the same variable to both tags. Campaign params belong in the link you hand out, never in the tags a page declares about itself.'
  },
  'design-meta-title-and-description': {
    priority: 'MUST',
    rule: 'Every page needs a `<title>` in one site-wide format (`${page} — ${SITE_NAME}`), with the distinctive word FIRST — results truncate around 60 characters, so a stuffed title loses the product name, the one word a human was scanning for. Shareable or searchable pages SHOULD also ship a hand-written `<meta name="description">` of ~150-160 plain-text characters; skip it and the engine writes one from whatever body copy came first, usually a cookie banner or a skip link. (Distinct from `content-page-titles`, which is the title tracking in-app context.)'
  },
  'design-robots-intent': {
    priority: 'MUST',
    rule: 'The `robots` meta must match actual access intent, so DERIVE it from the environment instead of hardcoding: default to `noindex` and let exactly one environment opt in (`process.env.VERCEL_ENV === "production"`). Preview and staging deploys are public URLs nobody thinks of as public, and an indexed staging copy competes with production for your own brand name. The symmetric failure is the overcorrection: a hardcoded `noindex` merges and production silently deindexes itself — deindexing is quiet, traffic just stops. Reserve `noindex` for private, duplicate, or non-public pages.',
    codeExample: 'const isProd = process.env.VERCEL_ENV === "production";\n<meta name="robots" content={isProd ? "index,follow" : "noindex,nofollow"} />'
  },

  // LottieFiles — motion design
  'animations-lottie-disney-scope': {
    priority: 'SHOULD',
    rule: 'Ask "character or control" before reaching for Disney motion. Anticipation, squash-and-stretch, follow-through and overshoot belong to CHARACTERS — a mascot, an illustration, an empty-state figure, a confetti burst, a once-per-session celebration — where implied mass and personality are the point. They do NOT belong to CHROME: a dropdown, toast, menu or button is a control the user operates, and overshoot there reads as dated (that is `animations-impeccable-no-bounce-easing`, and it is not in conflict — it describes a different object). LottieFiles scopes it the same way: skip anticipation for micro-feedback (<150ms), skip squash-and-stretch for premium/luxury, and its exaggeration budget is 15-25% Playful but 0-5% Corporate and 0% Premium. Controls: ease-out, no overshoot.'
  },

  // impeccable
  'interactions-impeccable-modal-last-resort': {
    priority: 'NEVER',
    rule: 'Reach for a modal as the first thought. A modal steals focus, blocks the page, and destroys the context the user was acting on — they must now hold the row they clicked in working memory. Exhaust the cheaper alternatives that keep context on screen: edit in place, use a side panel or a dedicated route, and replace a confirmation dialog with an undo toast wherever the action is reversible (compose with `interactions-confirm-destructive`). What survives is the narrow case a modal is actually for: one action, destructive, and irreversible — nothing to undo it with.'
  },
  'interactions-impeccable-four-option-limit': {
    priority: 'SHOULD',
    rule: 'Cap any decision point at <=4 simultaneously visible options (Miller\'s Law as revised by Cowan, 2001: working memory holds ~4 items). 5-7 is the boundary — group them or reveal progressively; 8+ is overload, and an overloaded user does not choose slowly, they skip, misclick, or abandon. Carried into surfaces: <=5 top-level nav items, <=4 form fields before a visual break, 1 primary + 1-2 secondary buttons (rest in a menu), <=4 key metrics above the fold, <=3 pricing tiers. Grouping does not remove capability — a 4-item nav with a "More" group still reaches nine destinations — it removes them from the decision.'
  },
  'layout-impeccable-monotonous-spacing': {
    priority: 'SHOULD',
    rule: 'Vary spacing to encode grouping: ~8-12px BETWEEN siblings, ~48-96px BETWEEN sections. Uniform padding everywhere does not just look boring, it does not parse — when a label sits as far from its input as from the next section, nothing groups and every element floats at equal weight. The detector rounds every padding/margin/gap to 4px and, given >=10 samples, fires when ONE value exceeds 60% of them AND there are <=3 unique values. The opposite ditch is `design-rams-inconsistent-spacing` (arbitrary, unrepeatable values); the target is a small scale, applied to mean something.'
  },
  'content-impeccable-fluid-type-bounds': {
    priority: 'SHOULD',
    rule: 'Bound every `clamp()`: max-size <= ~2.5x min-size. `clamp(1rem, 5vw, 6rem)` is a 6x span that renders the heading at body size on a phone and shouts at 1400px, and a bare `vw` middle term ignores the reader\'s font-size preference — add a rem offset (`clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)`, a 1.7x range) to put zoom and reflow back in the calculation. Second half of the rule: do NOT use fluid type in product UI at all — Material, Polaris, Primer and Carbon all ship fixed rem scales, because dense container-based layouts need spatial predictability. Fluid type is for headings and display text on marketing/content pages; body copy stays fixed even there.'
  },
  'content-impeccable-broken-image': {
    priority: 'NEVER',
    rule: 'Ship an `<img>` with an empty, missing, or placeholder `src` — it renders the browser\'s broken-image box. The value is rarely a literal; it is `user.avatar` and the CMS returned null, so `<img src={undefined} />` compiles, type-checks, passes review, and breaks for every record missing the field. Two failure modes, two guards: MISSING URL — guard the RENDER, do not emit an `<img>` at all, ship a real fallback (initials avatar, skeleton, neutral box); URL THAT 404s — guard the NETWORK with `onError` and swap in the same fallback. Reserve identical dimensions for both, or the swap adds a layout shift on top of the bug you just fixed.'
  },
  'design-impeccable-hairline-plus-shadow': {
    priority: 'NEVER',
    rule: 'Pair a visible hairline border with a wide, diffuse shadow — it is a generated-UI signature. The two make contradictory claims: the hairline says the surface has a crisp edge in the plane, the soft shadow says it is floating above the plane with light wrapping its edge, so the border kills the lift and the shadow kills the line. Commit to one — a defined EDGE (crisp hairline, no shadow) or a soft ELEVATION (shadow, no border). The detector fires on >=2 sides at <=1.5px with border alpha >=0.28 while a shadow layer of alpha >=0.12 has blur >=16px: `border shadow-lg` fires, `border shadow-xs` does not. A single layered shadow that INCLUDES its ring (`0 0 0 1px …`, 0 blur) is not this pattern — see `design-layered-shadows`.'
  },

  // Rams
  'design-icon-size-scale': {
    priority: 'SHOULD',
    rule: 'Bind icon sizes to ONE scale (16 / 20 / 24, matched to the type scale — `size-4` next to `text-sm`, `size-5` next to `text-base`) and hold the whole set to ONE stroke width, which in practice means taking every glyph from a single icon family. A toolbar sized by eye (`w-4`, `w-5`, `size-[18px]`, `h-6`) reads as ragged even when every box is aligned, because the eye compares the drawn marks and not the boxes; and a 1.5px stroke beside a 2px stroke gives two apparent weights at the same nominal size. Sizes come from tokens — a lone `size-[18px]` is a magic number.'
  },

  // interface-design (Damola Akinleye)
  'design-interface-desaturate-on-dark': {
    priority: 'SHOULD',
    rule: 'Give each semantic color (success, error, warning) a SEPARATE dark-theme value: hold the hue angle, raise lightness a little, and pull chroma DOWN. A swatch picked to fight a white surface has nothing to fight on near-black — it vibrates and the glyph edges shimmer. It is not a contrast failure (the ratio may pass), it is a saturation failure. On dark, also lean on borders rather than shadows, which barely read. This moves the OPPOSITE way from `design-impeccable-tinted-neutrals` (which pushes a little brand chroma INTO the neutrals); a palette should do both.'
  },
  'design-interface-control-tokens': {
    priority: 'SHOULD',
    rule: 'Declare `--control-bg`, `--control-border` and `--control-focus` as their own trio — do not bind inputs, selects and checkboxes to the surface/card tokens. A card is a surface that RECEIVES the eye and should recede; an input must announce itself as a place where something goes, and if it shares the card\'s background and the divider\'s border its boundary lands near 1.2:1 and the field becomes a rumour. Separable tokens are what let you meet `design-non-text-contrast` (WCAG 1.4.11, 3:1 for the boundary that identifies a control) without shouting every divider on the page. On dark, inputs read best slightly DARKER than their surroundings — an inset well says "type here" without chrome.'
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
