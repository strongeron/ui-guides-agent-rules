import { Principle, CategoryInfo } from '../types/principle';

export const categories: CategoryInfo[] = [
  {
    id: 'interactions',
    title: 'Interactions',
    description: 'Keyboard accessibility, focus management, and user interaction patterns'
  },
  {
    id: 'animations',
    title: 'Animations',
    description: 'Motion design principles and animation best practices'
  },
  {
    id: 'layout',
    title: 'Layout',
    description: 'Responsive design, alignment, and visual structure'
  },
  {
    id: 'content',
    title: 'Content',
    description: 'Typography, accessibility, and content presentation'
  },
  {
    id: 'forms',
    title: 'Forms',
    description: 'Form controls, validation, and user input handling'
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Optimization techniques and rendering efficiency'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Visual design principles and aesthetics'
  },
  {
    id: 'aesthetics',
    title: 'Aesthetics',
    description: 'Creative visual design principles for distinctive, production-grade interfaces'
  }
];

export const principles: Principle[] = [
  {
    id: 'interactions-keyboard-everywhere',
    category: 'interactions',
    source: 'vercel',
    title: 'Keyboard Works Everywhere',
    description: 'All flows are keyboard-operable and follow WAI-ARIA patterns',
    sourceQuote: 'Keyboard works everywhere. All flows are keyboard-operable & follow the WAI-ARIA Authoring Patterns.',
    additionalExplanation: 'Every interactive element must be reachable and usable with just a keyboard. This includes navigation, forms, modals, menus, and custom controls. Follow established patterns from WAI-ARIA to ensure consistency and predictability.',
    sourceLinks: [
      { text: 'WAI-ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
      { text: 'Keyboard Accessibility', url: 'https://webaim.org/techniques/keyboard/' }
    ],
    badExampleKey: 'interactions-keyboard-everywhere-bad',
    goodExampleKey: 'interactions-keyboard-everywhere-good'
  },
  {
    id: 'interactions-clear-focus',
    category: 'interactions',
    source: 'vercel',
    title: 'Clear Focus',
    description: 'Every focusable element shows a visible focus ring',
    sourceQuote: 'Clear focus. Every focusable element shows a visible focus ring. Prefer :focus-visible over :focus to avoid distracting pointer users.',
    additionalExplanation: 'Focus indicators are essential for keyboard navigation. Use :focus-visible to show focus rings only during keyboard navigation, not when clicking with a mouse. The focus ring should have sufficient contrast and be clearly visible against all backgrounds.',
    sourceLinks: [
      { text: ':focus-visible pseudo-class', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible' },
      { text: 'WCAG Focus Visible', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html' }
    ],
    badExampleKey: 'interactions-clear-focus-bad',
    goodExampleKey: 'interactions-clear-focus-good'
  },
  {
    id: 'interactions-match-hit-targets',
    category: 'interactions',
    source: 'vercel',
    title: 'Match Visual & Hit Targets',
    description: 'If visual target is < 24px, expand hit target to at least 24px',
    sourceQuote: 'Match visual & hit targets. Exception: if the visual target is < 24px, expand its hit target to ≥ 24px. On mobile, the minimum size is 44px.',
    additionalExplanation: 'Small interactive elements are hard to click or tap. While an icon might be 16px visually, its clickable area should be at least 24px on desktop and 44px on mobile. Use padding or pseudo-elements to expand the hit target without changing the visual appearance.',
    sourceLinks: [
      { text: 'WCAG Target Size', url: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size.html' },
      { text: 'Touch Target Sizes', url: 'https://www.nngroup.com/articles/touch-target-size/' }
    ],
    badExampleKey: 'interactions-match-hit-targets-bad',
    goodExampleKey: 'interactions-match-hit-targets-good'
  },
  {
    id: 'interactions-loading-buttons',
    category: 'interactions',
    source: 'vercel',
    title: 'Loading Buttons',
    description: 'Show a loading indicator and keep the original label',
    sourceQuote: 'Loading buttons. Show a loading indicator & keep the original label.',
    additionalExplanation: 'When a button triggers an async action, show a spinner but keep the button text. Changing the text can cause layout shifts and makes it harder for users to understand what\'s happening. The spinner provides clear feedback that work is in progress.',
    sourceLinks: [
      { text: 'Button Loading States', url: 'https://www.nngroup.com/articles/progress-indicators/' }
    ],
    badExampleKey: 'interactions-loading-buttons-bad',
    goodExampleKey: 'interactions-loading-buttons-good'
  },
  {
    id: 'interactions-optimistic-updates',
    category: 'interactions',
    source: 'vercel',
    title: 'Optimistic Updates',
    description: 'Update UI immediately when success is likely; reconcile on response',
    sourceQuote: 'Optimistic updates. Update the UI immediately when success is likely; reconcile on server response. On failure, show an error & roll back or provide Undo.',
    additionalExplanation: 'For actions that usually succeed (like liking a post or adding to cart), update the UI immediately rather than waiting for the server. This makes the interface feel instant. If the request fails, show an error and revert the change or offer an undo option.',
    sourceLinks: [
      { text: 'Optimistic UI', url: 'https://www.apollographql.com/docs/react/performance/optimistic-ui/' }
    ],
    badExampleKey: 'interactions-optimistic-updates-bad',
    goodExampleKey: 'interactions-optimistic-updates-good'
  },
  {
    id: 'interactions-ellipsis-for-input',
    category: 'interactions',
    source: 'vercel',
    title: 'Ellipsis for Further Input',
    description: 'Menu options that open follow-ups end with ellipsis',
    sourceQuote: 'Ellipsis for further input & loading states. Menu options that open a follow-up e.g., "Rename…" & loading/processing states e.g., "Loading…", "Saving…", "Generating…" end with an ellipsis.',
    additionalExplanation: 'An ellipsis (…) signals that more input or time is needed. Use it for menu items that open dialogs ("Rename…", "Delete…") and for processing states ("Saving…", "Loading…"). Don\'t use it for direct actions that complete immediately.',
    sourceLinks: [
      { text: 'Ellipsis in UI', url: 'https://en.wikipedia.org/wiki/Ellipsis' }
    ],
    badExampleKey: 'interactions-ellipsis-for-input-bad',
    goodExampleKey: 'interactions-ellipsis-for-input-good'
  },
  {
    id: 'interactions-confirm-destructive',
    category: 'interactions',
    source: 'vercel',
    title: 'Confirm Destructive Actions',
    description: 'Require confirmation or provide Undo with a safe window',
    sourceQuote: 'Confirm destructive actions. Require confirmation or provide Undo with a safe window.',
    additionalExplanation: 'Destructive actions like delete, remove, or reset should require explicit confirmation. Show a modal or dialog explaining what will be lost. Alternatively, perform the action but provide an undo option for a reasonable time window (e.g., 5-10 seconds).',
    sourceLinks: [
      { text: 'Preventing User Errors', url: 'https://www.nngroup.com/articles/slips/' }
    ],
    badExampleKey: 'interactions-confirm-destructive-bad',
    goodExampleKey: 'interactions-confirm-destructive-good'
  },
  {
    id: 'interactions-links-are-links',
    category: 'interactions',
    source: 'vercel',
    title: 'Links Are Links',
    description: 'Use <a> or <Link> for navigation so browser behaviors work',
    sourceQuote: 'Links are links. Use <a> or <Link> for navigation so standard browser behaviors work (Cmd/Ctrl+Click, middle-click, right-click to open in a new tab). Never substitute with <button> or <div> for navigational links.',
    additionalExplanation: 'Links should use anchor tags so users can right-click to copy the URL, cmd-click to open in a new tab, etc. Using buttons or divs for navigation breaks these standard browser features and hurts accessibility.',
    sourceLinks: [
      { text: 'Links vs Buttons', url: 'https://www.nngroup.com/articles/command-links/' }
    ],
    badExampleKey: 'interactions-links-are-links-bad',
    goodExampleKey: 'interactions-links-are-links-good'
  },
  {
    id: 'interactions-manage-focus',
    category: 'interactions',
    source: 'vercel',
    title: 'Manage Focus',
    description: 'Use focus traps, move and return focus according to WAI-ARIA patterns',
    sourceQuote: 'Manage focus. Use focus traps, move & return focus according to the WAI-ARIA Patterns.',
    additionalExplanation: 'When opening modals or dialogs, trap focus within them so keyboard users can\'t accidentally tab outside. When closing, return focus to the element that triggered the dialog. This maintains context and prevents confusion for keyboard and screen reader users.',
    sourceLinks: [
      { text: 'WAI-ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
      { text: 'Focus Management', url: 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/' }
    ],
    badExampleKey: 'interactions-manage-focus-bad',
    goodExampleKey: 'interactions-manage-focus-good'
  },
  {
    id: 'interactions-mobile-input-size',
    category: 'interactions',
    source: 'vercel',
    title: 'Mobile Input Size',
    description: 'Input font size must be at least 16px on mobile to prevent zoom',
    sourceQuote: 'Mobile input size. <input> font size is ≥ 16px on mobile to prevent iOS Safari auto-zoom/pan on focus. Or set <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />.',
    additionalExplanation: 'iOS Safari automatically zooms when focusing inputs with font-size below 16px, causing disorienting page shifts. Either set font-size to 16px or larger, or use the viewport meta tag to control zoom behavior.',
    sourceLinks: [
      { text: 'Preventing Mobile Zoom', url: 'https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone' }
    ],
    badExampleKey: 'interactions-mobile-input-size-bad',
    goodExampleKey: 'interactions-mobile-input-size-good'
  },
  {
    id: 'interactions-respect-zoom',
    category: 'interactions',
    source: 'vercel',
    title: 'Respect Zoom',
    description: 'Never disable browser zoom',
    sourceQuote: 'Respect zoom. Never disable browser zoom.',
    additionalExplanation: 'Browser zoom is an accessibility feature used by people with low vision. Disabling it via viewport meta tags or CSS makes your site inaccessible. Always allow users to zoom in and out as needed.',
    sourceLinks: [
      { text: 'WCAG: Resize Text', url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html' }
    ],
    badExampleKey: 'interactions-respect-zoom-bad',
    goodExampleKey: 'interactions-respect-zoom-good'
  },
  {
    id: 'interactions-hydration-safe',
    category: 'interactions',
    source: 'vercel',
    title: 'Hydration-safe Inputs',
    description: 'Inputs must not lose focus or value after hydration',
    sourceQuote: 'Hydration-safe inputs. Inputs must not lose focus or value after hydration.',
    additionalExplanation: 'In React and other frameworks with hydration, ensure input values and focus states persist from server-rendered HTML through client-side hydration. Losing focus or clearing values frustrates users who have already started typing.',
    sourceLinks: [
      { text: 'React Hydration', url: 'https://react.dev/reference/react-dom/client/hydrateRoot' }
    ],
    badExampleKey: 'interactions-hydration-safe-bad',
    goodExampleKey: 'interactions-hydration-safe-good'
  },
  {
    id: 'interactions-dont-block-paste',
    category: 'interactions',
    source: 'vercel',
    title: 'Don\'t Block Paste',
    description: 'Never disable paste in input or textarea elements',
    sourceQuote: 'Don\'t block paste. Never disable paste in <input> or <textarea>.',
    additionalExplanation: 'Blocking paste frustrates users and reduces security by preventing password managers from working. Users should always be able to paste content into form fields. If you need validation, validate after paste, don\'t prevent it.',
    sourceLinks: [
      { text: 'Why Blocking Paste is Bad UX', url: 'https://www.nngroup.com/articles/stop-password-masking/' }
    ],
    badExampleKey: 'interactions-dont-block-paste-bad',
    goodExampleKey: 'interactions-dont-block-paste-good'
  },
  {
    id: 'interactions-url-state',
    category: 'interactions',
    source: 'vercel',
    title: 'URL as State',
    description: 'Persist state in the URL for sharing and navigation',
    sourceQuote: 'URL as state. Persist state in the URL so share, refresh, Back/Forward navigation work e.g., nuqs.',
    additionalExplanation: 'Store filters, search queries, tabs, and other UI state in the URL. This allows users to share links, refresh without losing context, and use browser back/forward buttons naturally. Libraries like nuqs make this easier to implement.',
    sourceLinks: [
      { text: 'nuqs', url: 'https://nuqs.dev' },
      { text: 'URL as UI', url: 'https://www.nngroup.com/articles/url-as-ui/' }
    ],
    badExampleKey: 'interactions-url-state-bad',
    goodExampleKey: 'interactions-url-state-good'
  },
  {
    id: 'interactions-scroll-persistence',
    category: 'interactions',
    source: 'vercel',
    title: 'Scroll Positions Persist',
    description: 'Back and Forward navigation should restore scroll position',
    sourceQuote: 'Scroll positions persist. Back/Forward restores prior scroll.',
    additionalExplanation: 'When users navigate back or forward, restore their previous scroll position. This helps maintain context and prevents frustration from having to scroll down again to find what they were viewing.',
    sourceLinks: [
      { text: 'Scroll Restoration', url: 'https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration' }
    ],
    badExampleKey: 'interactions-scroll-persistence-bad',
    goodExampleKey: 'interactions-scroll-persistence-good'
  },
  {
    id: 'interactions-announce-updates',
    category: 'interactions',
    source: 'vercel',
    title: 'Announce Async Updates',
    description: 'Use aria-live to announce dynamic content changes',
    sourceQuote: 'Announce async updates. Use polite aria-live for toasts & inline validation.',
    additionalExplanation: 'Screen readers don\'t automatically announce dynamically added content. Use aria-live="polite" for non-urgent updates like toasts and validation messages. This ensures screen reader users are informed of changes without interrupting their current task.',
    sourceLinks: [
      { text: 'ARIA Live Regions', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions' }
    ],
    badExampleKey: 'interactions-announce-updates-bad',
    goodExampleKey: 'interactions-announce-updates-good'
  },
  {
    id: 'interactions-touch-action',
    category: 'interactions',
    source: 'vercel',
    title: 'Prevent Double-tap Zoom',
    description: 'Set touch-action: manipulation on controls',
    sourceQuote: 'Prevent double-tap zoom on controls. Set touch-action: manipulation.',
    additionalExplanation: 'Mobile browsers delay click events by ~300ms to detect double-tap zoom. Setting touch-action: manipulation removes this delay for interactive elements, making the interface feel more responsive.',
    sourceLinks: [
      { text: 'touch-action', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action' }
    ],
    badExampleKey: 'interactions-touch-action-bad',
    goodExampleKey: 'interactions-touch-action-good'
  },
  {
    id: 'interactions-forgiving-design',
    category: 'interactions',
    source: 'vercel',
    title: 'Design Forgiving Interactions',
    description: 'Controls minimize finickiness with generous hit targets and clear affordances',
    sourceQuote: 'Design forgiving interactions. Controls minimize finickiness with generous hit targets, clear affordances, & predictable interactions, e.g., prediction cones.',
    additionalExplanation: 'Make interactive elements easy to use by providing generous hit targets, clear visual feedback, and forgiving interaction patterns. Prediction cones in drag-and-drop interfaces help users maintain their dragging action even if the cursor drifts slightly.',
    sourceLinks: [
      { text: 'Fitts\'s Law', url: 'https://www.nngroup.com/articles/fitts-law/' }
    ],
    badExampleKey: 'interactions-forgiving-design-bad',
    goodExampleKey: 'interactions-forgiving-design-good'
  },
  {
    id: 'interactions-tooltip-timing',
    category: 'interactions',
    source: 'vercel',
    title: 'Tooltip Timing',
    description: 'Delay the first tooltip in a group; subsequent peers have no delay',
    sourceQuote: 'Tooltip timing. Delay the first tooltip in a group; subsequent peers have no delay.',
    additionalExplanation: 'Add a small delay (~500ms) before showing the first tooltip to avoid tooltips appearing on accidental hovers. Once a tooltip in a group is shown, subsequent tooltips in the same area should appear immediately to allow easy exploration.',
    sourceLinks: [
      { text: 'Tooltip Design', url: 'https://www.nngroup.com/articles/tooltip-guidelines/' }
    ],
    badExampleKey: 'interactions-tooltip-timing-bad',
    goodExampleKey: 'interactions-tooltip-timing-good'
  },
  {
    id: 'interactions-overscroll-behavior',
    category: 'interactions',
    source: 'vercel',
    title: 'Overscroll Behavior',
    description: 'Set overscroll-behavior: contain in modals and drawers',
    sourceQuote: 'Overscroll behavior. Set overscroll-behavior: contain intentionally e.g., in modals/drawers.',
    additionalExplanation: 'When scrolling reaches the end of a modal or drawer, prevent the scroll from continuing to the page behind it. Use overscroll-behavior: contain to keep scroll interactions contained within the current layer.',
    sourceLinks: [
      { text: 'overscroll-behavior', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior' }
    ],
    badExampleKey: 'interactions-overscroll-behavior-bad',
    goodExampleKey: 'interactions-overscroll-behavior-good'
  },
  {
    id: 'interactions-autofocus',
    category: 'interactions',
    source: 'vercel',
    title: 'Autofocus for Speed',
    description: 'On desktop, autofocus single primary inputs; rarely on mobile',
    sourceQuote: 'Autofocus for speed. On desktop screens with a single primary input, autofocus. Rarely autofocus on mobile because the keyboard opening can cause layout shift.',
    additionalExplanation: 'For desktop interfaces with a clear primary action (like a search box), autofocus saves users a click. On mobile, avoid autofocus because the virtual keyboard opening causes jarring layout shifts and may scroll the page unexpectedly.',
    sourceLinks: [
      { text: 'Autofocus', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus' }
    ],
    badExampleKey: 'interactions-autofocus-bad',
    goodExampleKey: 'interactions-autofocus-good'
  },
  {
    id: 'interactions-no-dead-zones',
    category: 'interactions',
    source: 'vercel',
    title: 'No Dead Zones',
    description: 'If part of a control looks interactive, it should be interactive',
    sourceQuote: 'No dead zones. If part of a control looks interactive, it should be interactive. Don\'t leave users guessing where to interact.',
    additionalExplanation: 'When part of a component looks clickable (like a card with a button), make the entire component clickable, not just the button. This matches user expectations and reduces frustration from clicking "dead zones" that don\'t respond.',
    sourceLinks: [
      { text: 'Making Clickable Elements Recognizable', url: 'https://www.nngroup.com/articles/clickable-elements/' }
    ],
    badExampleKey: 'interactions-no-dead-zones-bad',
    goodExampleKey: 'interactions-no-dead-zones-good'
  },
  {
    id: 'interactions-clean-drag',
    category: 'interactions',
    source: 'vercel',
    title: 'Clean Drag Interactions',
    description: 'Disable text selection and apply inert during drag operations',
    sourceQuote: 'Clean drag interactions. Disable text selection & apply inert (which prevents interaction) while an element is dragged so selection/hover don\'t occur simultaneously.',
    additionalExplanation: 'When dragging elements, prevent text selection and disable hover/interaction states on other elements using the inert attribute. This prevents confusing visual states where content appears selected or hovered while being dragged.',
    sourceLinks: [
      { text: 'Drag and Drop', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API' },
      { text: 'inert attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert' }
    ],
    badExampleKey: 'interactions-clean-drag-bad',
    goodExampleKey: 'interactions-clean-drag-good'
  },
  {
    id: 'interactions-focus-visible-tw',
    category: 'interactions',
    source: 'tailwind',
    title: 'Focus-Visible Rings',
    description: 'Use focus-visible for keyboard-only focus indicators',
    sourceQuote: 'Use focus-visible: instead of focus: for focus rings. This shows focus indicators only for keyboard navigation, not mouse clicks.',
    additionalExplanation: 'The focus: variant shows focus rings on every focus, including mouse clicks. focus-visible: uses the browser\'s heuristic to only show focus rings when navigating with keyboard.',
    sourceLinks: [
      { text: 'Focus Visible', url: 'https://tailwindcss.com/docs/hover-focus-and-other-states#focus-visible' },
      { text: ':focus-visible MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible' }
    ],
    badExampleKey: 'interactions-focus-visible-tw-bad',
    goodExampleKey: 'interactions-focus-visible-tw-good'
  },
  {
    id: 'interactions-skip-link-tw',
    category: 'interactions',
    source: 'tailwind',
    title: 'Skip Link with Tailwind',
    description: 'Create accessible skip links using sr-only and focus-visible',
    sourceQuote: 'Implement skip links using sr-only combined with focus:not-sr-only to show the link only when focused via keyboard.',
    additionalExplanation: 'Skip links allow keyboard users to bypass repetitive navigation and jump to main content. They should be visually hidden until focused, then appear prominently.',
    sourceLinks: [
      { text: 'Screen Reader Only', url: 'https://tailwindcss.com/docs/screen-readers' },
      { text: 'Skip Links', url: 'https://webaim.org/techniques/skipnav/' }
    ],
    badExampleKey: 'interactions-skip-link-tw-bad',
    goodExampleKey: 'interactions-skip-link-tw-good'
  },
  {
    id: 'interactions-aria-variants',
    category: 'interactions',
    source: 'tailwind',
    title: 'ARIA State Variants',
    description: 'Use aria-* variants for accessible interactive states',
    sourceQuote: 'Use Tailwind\'s aria-* variants (aria-selected:, aria-expanded:, aria-disabled:) to style based on ARIA state.',
    additionalExplanation: 'Using aria-* variants ensures your visual styles match the accessibility state. This prevents mismatches where something looks selected but isn\'t announced as selected.',
    sourceLinks: [
      { text: 'ARIA States', url: 'https://tailwindcss.com/docs/hover-focus-and-other-states#aria-states' },
      { text: 'WAI-ARIA', url: 'https://www.w3.org/WAI/ARIA/apg/' }
    ],
    badExampleKey: 'interactions-aria-variants-bad',
    goodExampleKey: 'interactions-aria-variants-good'
  },
  {
    id: 'interactions-sr-only',
    category: 'interactions',
    source: 'tailwind',
    title: 'Screen Reader Only Content',
    description: 'Use sr-only for visually hidden but accessible content',
    sourceQuote: 'Use the sr-only utility for content that should be read by screen readers but hidden visually. Never use display:none for accessible content.',
    additionalExplanation: 'Screen reader users need context that sighted users get visually. Icon-only buttons need labels, status indicators need descriptions. The sr-only class hides content visually while keeping it accessible.',
    sourceLinks: [
      { text: 'Screen Readers Utility', url: 'https://tailwindcss.com/docs/screen-readers' },
      { text: 'Visually Hidden', url: 'https://www.a11yproject.com/posts/how-to-hide-content/' }
    ],
    badExampleKey: 'interactions-sr-only-bad',
    goodExampleKey: 'interactions-sr-only-good'
  },
  {
    id: 'interactions-class-precedence',
    category: 'interactions',
    source: 'tailwind',
    title: 'Class Precedence',
    description: 'Understand Tailwind\'s class order and override patterns',
    sourceQuote: 'Tailwind classes don\'t have inherent specificity ordering. Use tailwind-merge or careful class ordering when you need predictable overrides.',
    additionalExplanation: 'When combining classes dynamically, the last class in CSS source order wins (not the last class you write). Use tailwind-merge to intelligently merge Tailwind classes and resolve conflicts.',
    sourceLinks: [
      { text: 'tailwind-merge', url: 'https://github.com/dcastil/tailwind-merge' },
      { text: 'clsx', url: 'https://github.com/lukeed/clsx' }
    ],
    badExampleKey: 'interactions-class-precedence-bad',
    goodExampleKey: 'interactions-class-precedence-good'
  },
  {
    id: 'interactions-rams-aria-labels',
    category: 'interactions',
    source: 'rams',
    title: 'Interactive Elements Missing ARIA Labels',
    description: 'Interactive elements without visible text need aria-label or aria-labelledby',
    sourceQuote: 'Icon buttons and other interactive elements without visible text must have accessible names via aria-label or aria-labelledby.',
    additionalExplanation: 'Screen readers announce the accessible name of interactive elements. Without it, users hear only "button" with no indication of purpose.',
    sourceLinks: [
      { text: 'WCAG 4.1.2', url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html' }
    ],
    badExampleKey: 'interactions-rams-aria-labels-bad',
    goodExampleKey: 'interactions-rams-aria-labels-good'
  },
  {
    id: 'interactions-rams-focus-outline',
    category: 'interactions',
    source: 'rams',
    title: 'Missing Focus Outline',
    description: 'Interactive elements must have visible focus indicators',
    sourceQuote: 'Removing focus outlines with outline: none without providing an alternative makes keyboard navigation impossible.',
    additionalExplanation: 'Focus indicators show keyboard users where they are on the page. Use :focus-visible to show outlines only for keyboard navigation.',
    sourceLinks: [
      { text: 'WCAG 2.4.7', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html' }
    ],
    badExampleKey: 'interactions-rams-focus-outline-bad',
    goodExampleKey: 'interactions-rams-focus-outline-good'
  },
  {
    id: 'interactions-rams-keyboard-handlers',
    category: 'interactions',
    source: 'rams',
    title: 'onClick Without Keyboard Handler',
    description: 'Elements with onClick should also handle keyboard events',
    sourceQuote: 'Elements with mouse handlers but no keyboard handlers are inaccessible to keyboard-only users. Add onKeyDown or use semantic elements.',
    additionalExplanation: 'Semantic elements like button and a handle keyboard events automatically. Custom elements with onClick need explicit onKeyDown handlers.',
    sourceLinks: [
      { text: 'WCAG 2.1.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html' }
    ],
    badExampleKey: 'interactions-rams-keyboard-handlers-bad',
    goodExampleKey: 'interactions-rams-keyboard-handlers-good'
  },
  {
    id: 'interactions-rams-role-attributes',
    category: 'interactions',
    source: 'rams',
    title: 'Role Without Required Attributes',
    description: 'ARIA roles must include all required attributes',
    sourceQuote: 'ARIA roles have required attributes. A checkbox needs aria-checked; a slider needs aria-valuenow, aria-valuemin, aria-valuemax.',
    additionalExplanation: 'Incomplete ARIA is often worse than no ARIA. If you use a role, include all attributes that screen readers expect.',
    sourceLinks: [
      { text: 'WCAG 4.1.2', url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html' }
    ],
    badExampleKey: 'interactions-rams-role-attributes-bad',
    goodExampleKey: 'interactions-rams-role-attributes-good'
  },
  {
    id: 'interactions-rams-semantic-handlers',
    category: 'interactions',
    source: 'rams',
    title: 'Non-Interactive Element with Keyboard Handler',
    description: 'Use semantic interactive elements instead of divs with handlers',
    sourceQuote: 'Adding keyboard handlers to non-interactive elements like div requires role, tabIndex, and proper keyboard handling. Use button or a instead.',
    additionalExplanation: 'Semantic elements come with built-in accessibility. A button handles focus, keyboard events, and announces correctly without extra work.',
    sourceLinks: [
      { text: 'WCAG 4.1.2', url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html' }
    ],
    badExampleKey: 'interactions-rams-semantic-handlers-bad',
    goodExampleKey: 'interactions-rams-semantic-handlers-good'
  },
  {
    id: 'interactions-rams-tabindex',
    category: 'interactions',
    source: 'rams',
    title: 'Positive tabindex Values',
    description: 'Avoid positive tabindex values that disrupt natural tab order',
    sourceQuote: 'Positive tabindex values create unpredictable tab order. Use tabindex="0" to add to natural order or tabindex="-1" for programmatic focus.',
    additionalExplanation: 'Natural tab order follows the DOM. Positive tabindex creates a parallel ordering system that confuses keyboard users.',
    sourceLinks: [
      { text: 'WCAG 2.4.3', url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html' }
    ],
    badExampleKey: 'interactions-rams-tabindex-bad',
    goodExampleKey: 'interactions-rams-tabindex-good'
  },
  {
    id: 'interactions-rams-touch-targets',
    category: 'interactions',
    source: 'rams',
    title: 'Small Touch Targets',
    description: 'Interactive elements should be at least 44x44 pixels for touch',
    sourceQuote: 'Touch targets smaller than 44x44 pixels are difficult to tap accurately. This is especially important on mobile devices.',
    additionalExplanation: 'The 44px minimum comes from Apple\'s Human Interface Guidelines and WCAG 2.5.5 AAA. Padding can increase hit area without changing visual size.',
    sourceLinks: [
      { text: 'WCAG 2.5.5', url: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size.html' }
    ],
    badExampleKey: 'interactions-rams-touch-targets-bad',
    goodExampleKey: 'interactions-rams-touch-targets-good'
  },
  {
    id: 'interactions-ibelick-accessible-primitives',
    category: 'interactions',
    source: 'ibelick',
    title: 'Use Accessible Primitives',
    description: 'Always use accessible primitives (Radix, Headless UI, Base UI) for keyboard and focus management',
    sourceQuote: 'MUST use accessible primitives (Radix, Headless UI, Base UI) for keyboard navigation, focus trapping, and ARIA attributes.',
    additionalExplanation: 'Building accessible components from scratch is incredibly difficult. You need to handle keyboard navigation, focus trapping, ARIA attributes, and screen reader announcements. Primitive libraries handle all of this correctly.',
    sourceLinks: [
      { text: 'Radix UI Primitives', url: 'https://www.radix-ui.com/primitives' }
    ],
    badExampleKey: 'interactions-ibelick-accessible-primitives-bad',
    goodExampleKey: 'interactions-ibelick-accessible-primitives-good'
  },
  {
    id: 'interactions-ibelick-existing-components',
    category: 'interactions',
    source: 'ibelick',
    title: 'Use Existing Components First',
    description: 'Before building custom UI, check if an existing component library already solves the problem',
    sourceQuote: 'MUST use existing components from your design system or component library before building custom solutions.',
    additionalExplanation: 'Building UI components from scratch introduces accessibility bugs, inconsistent behavior, maintenance burden, and duplicated effort. Use existing components that have been tested and documented.',
    sourceLinks: [
      { text: 'shadcn/ui Components', url: 'https://ui.shadcn.com/' }
    ],
    badExampleKey: 'interactions-ibelick-existing-components-bad',
    goodExampleKey: 'interactions-ibelick-existing-components-good'
  },
  {
    id: 'interactions-ibelick-no-primitive-mixing',
    category: 'interactions',
    source: 'ibelick',
    title: 'Don\'t Mix Primitive Systems',
    description: 'Never mix different primitive libraries (Radix + Headless UI) in the same project',
    sourceQuote: 'NEVER mix primitive systems (e.g., Radix + Headless UI). Pick one and stick with it for consistency.',
    additionalExplanation: 'Mixing primitive libraries creates inconsistent keyboard navigation patterns, different focus behaviors, conflicting styling approaches, and larger bundle sizes.',
    sourceLinks: [
      { text: 'React File Structure', url: 'https://www.joshwcomeau.com/react/file-structure/' }
    ],
    badExampleKey: 'interactions-ibelick-no-primitive-mixing-bad',
    goodExampleKey: 'interactions-ibelick-no-primitive-mixing-good'
  },
  {
    id: 'interactions-ibelick-base-ui',
    category: 'interactions',
    source: 'ibelick',
    title: 'Consider Base UI for New Components',
    description: 'When building new accessible components, consider Base UI for its unstyled, accessible primitives',
    sourceQuote: 'Consider Base UI for new accessible components. It provides unstyled, accessible primitives that work with any styling solution.',
    additionalExplanation: 'Base UI provides fully accessible primitives with no default styling, excellent TypeScript support, and works great with Tailwind CSS.',
    sourceLinks: [
      { text: 'Base UI Documentation', url: 'https://mui.com/base-ui/' }
    ],
    badExampleKey: 'interactions-ibelick-base-ui-bad',
    goodExampleKey: 'interactions-ibelick-base-ui-good'
  },
  {
    id: 'interactions-ibelick-icon-buttons',
    category: 'interactions',
    source: 'ibelick',
    title: 'Icon Buttons Need Labels',
    description: 'Always add aria-label to icon-only buttons for screen reader users',
    sourceQuote: 'MUST add aria-label to icon-only buttons. Screen readers need text to announce the button\'s purpose.',
    additionalExplanation: 'Icon-only buttons have no visible text, so screen readers have nothing to announce. Users hear only "button" with no context. Adding aria-label gives screen readers meaningful text.',
    sourceLinks: [
      { text: 'Icon Button Accessibility', url: 'https://www.sarasoueidan.com/blog/accessible-icon-buttons/' }
    ],
    badExampleKey: 'interactions-ibelick-icon-buttons-bad',
    goodExampleKey: 'interactions-ibelick-icon-buttons-good'
  },
  {
    id: 'interactions-ibelick-manual-behavior',
    category: 'interactions',
    source: 'ibelick',
    title: 'Don\'t Rebuild Keyboard Behavior',
    description: 'Avoid manually implementing keyboard navigation and focus management that libraries handle correctly',
    sourceQuote: 'Avoid rebuilding keyboard navigation and focus behavior. Accessible primitive libraries handle edge cases you\'ll miss.',
    additionalExplanation: 'Manual keyboard handling is error-prone. You\'ll likely miss RTL handling, disabled item navigation, type-ahead search, focus restoration, and roving tabindex patterns.',
    sourceLinks: [
      { text: 'WAI-ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' }
    ],
    badExampleKey: 'interactions-ibelick-manual-behavior-bad',
    goodExampleKey: 'interactions-ibelick-manual-behavior-good'
  },
  {
    id: 'interactions-ibelick-alert-dialog',
    category: 'interactions',
    source: 'ibelick',
    title: 'Use AlertDialog for Destructive Actions',
    description: 'Always use AlertDialog for destructive or irreversible actions to require explicit confirmation',
    sourceQuote: 'MUST use AlertDialog for destructive actions. Users need explicit confirmation before irreversible operations like deletion.',
    additionalExplanation: 'Destructive actions like deletion are irreversible. A simple click shouldn\'t trigger them. AlertDialog requires explicit action, focuses on confirm/cancel, and makes severity clear.',
    sourceLinks: [
      { text: 'Radix AlertDialog', url: 'https://www.radix-ui.com/primitives/docs/components/alert-dialog' }
    ],
    badExampleKey: 'interactions-ibelick-alert-dialog-bad',
    goodExampleKey: 'interactions-ibelick-alert-dialog-good'
  },
  {
    id: 'interactions-ibelick-loading-skeletons',
    category: 'interactions',
    source: 'ibelick',
    title: 'Prefer Skeletons Over Spinners',
    description: 'Use skeleton placeholders instead of spinners for loading states to reduce perceived load time',
    sourceQuote: 'Use skeleton screens instead of spinners for loading states. Skeletons reduce perceived load time and prevent layout shift.',
    additionalExplanation: 'Skeleton screens show the structure of content before it loads, reducing perceived loading time and preventing cumulative layout shift (CLS). Spinners feel like waiting.',
    sourceLinks: [
      { text: 'Skeleton Screens', url: 'https://www.lukew.com/ff/entry.asp?1797' }
    ],
    badExampleKey: 'interactions-ibelick-loading-skeletons-bad',
    goodExampleKey: 'interactions-ibelick-loading-skeletons-good'
  },
  {
    id: 'animations-prefers-reduced-motion',
    category: 'animations',
    source: 'vercel',
    title: 'Honor prefers-reduced-motion',
    description: 'Provide a reduced-motion variant for all animations',
    sourceQuote: 'Honor prefers-reduced-motion. Provide a reduced-motion variant.',
    additionalExplanation: 'Some users experience motion sickness from animations. Respect the prefers-reduced-motion media query by disabling or significantly reducing animations for these users. Essential motion (like page transitions) can remain but should be much faster.',
    sourceLinks: [
      { text: 'prefers-reduced-motion', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion' },
      { text: 'Accessible Animations', url: 'https://www.a11yproject.com/posts/understanding-vestibular-disorders/' }
    ],
    badExampleKey: 'animations-prefers-reduced-motion-bad',
    goodExampleKey: 'animations-prefers-reduced-motion-good'
  },
  {
    id: 'animations-compositor-friendly',
    category: 'animations',
    source: 'vercel',
    title: 'Compositor-friendly',
    description: 'Prioritize GPU-accelerated properties like transform and opacity',
    sourceQuote: 'Compositor-friendly. Prioritize GPU-accelerated properties (transform, opacity) & avoid properties that trigger reflows/repaints (width, height, top, left).',
    additionalExplanation: 'Animating properties like width, height, top, or left causes the browser to recalculate layout and repaint, which is slow. Transform and opacity can be handled by the GPU compositor, making animations smooth at 60fps or higher.',
    sourceLinks: [
      { text: 'High Performance Animations', url: 'https://web.dev/animations-guide/' },
      { text: 'CSS Triggers', url: 'https://csstriggers.com/' }
    ],
    badExampleKey: 'animations-compositor-friendly-bad',
    goodExampleKey: 'animations-compositor-friendly-good'
  },
  {
    id: 'animations-interruptible',
    category: 'animations',
    source: 'vercel',
    title: 'Interruptible',
    description: 'Animations are cancelable by user input',
    sourceQuote: 'Interruptible. Animations are cancelable by user input.',
    additionalExplanation: 'Don\'t force users to wait for animations to complete. If a user interacts during an animation (clicking, scrolling, etc.), the animation should either instantly complete or transition to the new state. Never block interaction during animation.',
    sourceLinks: [
      { text: 'Animation Best Practices', url: 'https://www.nngroup.com/articles/animation-usability/' }
    ],
    badExampleKey: 'animations-interruptible-bad',
    goodExampleKey: 'animations-interruptible-good'
  },
  {
    id: 'animations-correct-transform-origin',
    category: 'animations',
    source: 'vercel',
    title: 'Correct Transform Origin',
    description: 'Anchor motion to where it physically starts',
    sourceQuote: 'Correct transform origin. Anchor motion to where it "physically" starts.',
    additionalExplanation: 'When elements scale or rotate, the transform-origin should match where the motion naturally originates. For example, a dropdown opening from a button should scale from the button\'s position, not from the center of the dropdown.',
    sourceLinks: [
      { text: 'transform-origin', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin' }
    ],
    badExampleKey: 'animations-correct-transform-origin-bad',
    goodExampleKey: 'animations-correct-transform-origin-good'
  },
  {
    id: 'animations-never-transition-all',
    category: 'animations',
    source: 'vercel',
    title: 'Never transition: all',
    description: 'Explicitly list only the properties you intend to animate',
    sourceQuote: 'Never transition: all. Explicitly list only the properties you intend to animate (typically opacity, transform). all can unintentionally animate layout-affecting properties causing jank.',
    additionalExplanation: 'Using transition: all is tempting but dangerous. It can accidentally animate properties you didn\'t intend to, causing performance issues and unexpected visual effects. Always explicitly list the properties you want to transition.',
    sourceLinks: [
      { text: 'CSS Transitions', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions' }
    ],
    badExampleKey: 'animations-never-transition-all-bad',
    goodExampleKey: 'animations-never-transition-all-good'
  },
  {
    id: 'animations-implementation-preference',
    category: 'animations',
    source: 'vercel',
    title: 'Implementation Preference',
    description: 'Prefer CSS over Web Animations API over JavaScript libraries',
    sourceQuote: 'Implementation preference. Prefer CSS, avoid main-thread JS-driven animations when possible. Preference: CSS > Web Animations API > JavaScript libraries e.g., motion.',
    additionalExplanation: 'CSS animations run off the main thread and are most performant. Web Animations API provides more control when needed. JavaScript animation libraries should be a last resort as they run on the main thread and can block user interactions.',
    sourceLinks: [
      { text: 'CSS Animations', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations' },
      { text: 'Web Animations API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API' }
    ],
    badExampleKey: 'animations-implementation-preference-bad',
    goodExampleKey: 'animations-implementation-preference-good'
  },
  {
    id: 'animations-necessity-check',
    category: 'animations',
    source: 'vercel',
    title: 'Necessity Check',
    description: 'Only animate when it clarifies cause and effect or adds deliberate delight',
    sourceQuote: 'Necessity check. Only animate when it clarifies cause & effect or when it adds deliberate delight e.g., the northern lights.',
    additionalExplanation: 'Animation should serve a purpose: showing relationships between actions and results, or creating memorable moments. Don\'t animate just because you can. Every animation should justify its existence by improving comprehension or creating meaningful delight.',
    sourceLinks: [
      { text: 'Animation Principles', url: 'https://www.nngroup.com/articles/animation-usability/' }
    ],
    badExampleKey: 'animations-necessity-check-bad',
    goodExampleKey: 'animations-necessity-check-good'
  },
  {
    id: 'animations-easing',
    category: 'animations',
    source: 'vercel',
    title: 'Easing Fits Subject',
    description: 'Choose easing functions based on what changes',
    sourceQuote: 'Easing fits the subject. Choose easing based on what changes (size, distance, trigger).',
    additionalExplanation: 'Different animations feel right with different easing curves. Elements entering the screen often use ease-out. Elements leaving use ease-in. Interactive feedback uses ease-in-out. Match the easing to the physical metaphor the animation represents.',
    sourceLinks: [
      { text: 'Easing Functions', url: 'https://easings.net/' },
      { text: 'CSS Easing', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function' }
    ],
    badExampleKey: 'animations-easing-bad',
    goodExampleKey: 'animations-easing-good'
  },
  {
    id: 'animations-ibelick-motion-library',
    category: 'animations',
    source: 'ibelick',
    title: 'Use motion/react for JS Animations',
    description: 'Use motion/react (Framer Motion) for JavaScript-driven animations instead of manual implementations',
    sourceQuote: 'MUST use motion/react for JavaScript animations. It handles interruption, spring physics, and gesture integration correctly.',
    additionalExplanation: 'Hand-rolling animations with requestAnimationFrame or direct DOM manipulation leads to buggy, interruptible animations. motion/react handles complex edge cases out of the box.',
    sourceLinks: [
      { text: 'Motion Documentation', url: 'https://motion.dev/docs/react-quick-start' }
    ],
    badExampleKey: 'animations-ibelick-motion-library-bad',
    goodExampleKey: 'animations-ibelick-motion-library-good'
  },
  {
    id: 'animations-ibelick-tw-animate',
    category: 'animations',
    source: 'ibelick',
    title: 'tw-animate-css for Micro Animations',
    description: 'Use tw-animate-css plugin for entrance and micro-interaction animations',
    sourceQuote: 'Use tw-animate-css for entrance animations and micro-interactions. It provides consistent, performant CSS animations as Tailwind utilities.',
    additionalExplanation: 'The tw-animate-css plugin provides a comprehensive set of entrance, exit, and micro-interaction animations. Using a standardized library ensures consistency.',
    sourceLinks: [
      { text: 'tw-animate-css', url: 'https://github.com/Wombosvideo/tw-animate-css' }
    ],
    badExampleKey: 'animations-ibelick-tw-animate-bad',
    goodExampleKey: 'animations-ibelick-tw-animate-good'
  },
  {
    id: 'animations-ibelick-intentional-only',
    category: 'animations',
    source: 'ibelick',
    title: 'Animation Only When Requested',
    description: 'Never add animations unless explicitly requested - they can hurt UX if overused',
    sourceQuote: 'NEVER add animation unless explicitly requested. Animations can hurt user experience if overused or inappropriate.',
    additionalExplanation: 'Animations should serve a purpose: provide feedback, guide attention, or smooth transitions. Adding animation "because it looks cool" often slows perceived performance and frustrates users.',
    sourceLinks: [
      { text: 'The Case Against Animation', url: 'https://web.dev/articles/animations-guide' }
    ],
    badExampleKey: 'animations-ibelick-intentional-only-bad',
    goodExampleKey: 'animations-ibelick-intentional-only-good'
  },
  {
    id: 'animations-ibelick-compositor-only',
    category: 'animations',
    source: 'ibelick',
    title: 'Animate Only Compositor Properties',
    description: 'Only animate transform and opacity for smooth 60fps animations',
    sourceQuote: 'Animate only transform and opacity. These are compositor-thread properties that can achieve 60fps without triggering layout or paint.',
    additionalExplanation: 'Properties like transform and opacity only affect the composite phase, allowing the GPU to handle them on a separate thread for smooth animations even when the main thread is busy.',
    sourceLinks: [
      { text: 'High Performance Animations', url: 'https://web.dev/articles/animations-guide' }
    ],
    badExampleKey: 'animations-ibelick-compositor-only-bad',
    goodExampleKey: 'animations-ibelick-compositor-only-good'
  },
  {
    id: 'animations-ibelick-no-layout',
    category: 'animations',
    source: 'ibelick',
    title: 'Never Animate Layout Properties',
    description: 'Never animate width, height, top, left, or other layout-triggering properties',
    sourceQuote: 'NEVER animate width, height, top, left, margin, or padding. These trigger expensive layout recalculations on every frame.',
    additionalExplanation: 'Animating layout properties forces the browser to recalculate positions of potentially hundreds of elements every frame. Use transform: scale() for size and translate() for position instead.',
    sourceLinks: [
      { text: 'Avoid Layout Thrashing', url: 'https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing' }
    ],
    badExampleKey: 'animations-ibelick-no-layout-bad',
    goodExampleKey: 'animations-ibelick-no-layout-good'
  },
  {
    id: 'animations-ibelick-minimize-paint',
    category: 'animations',
    source: 'ibelick',
    title: 'Minimize Paint Animations',
    description: 'Avoid animating colors, backgrounds, and box-shadows which trigger expensive paint operations',
    sourceQuote: 'Minimize animating colors, backgrounds, and box-shadows. These trigger paint operations which are more expensive than compositor-only animations.',
    additionalExplanation: 'Paint operations require the browser to fill in pixels, which is CPU-intensive. For color transitions, use opacity on overlaid elements instead of animating the color directly.',
    sourceLinks: [
      { text: 'Simplify Paint Complexity', url: 'https://web.dev/articles/simplify-paint-complexity-and-reduce-paint-areas' }
    ],
    badExampleKey: 'animations-ibelick-minimize-paint-bad',
    goodExampleKey: 'animations-ibelick-minimize-paint-good'
  },
  {
    id: 'animations-ibelick-timing',
    category: 'animations',
    source: 'ibelick',
    title: 'Proper Animation Timing',
    description: 'Use ease-out for entrances and keep interaction feedback under 200ms',
    sourceQuote: 'Use ease-out for entrances (elements appear fast, settle slow). Keep interaction feedback under 200ms to feel instant.',
    additionalExplanation: 'Animation timing affects perceived performance: ease-out for entrances (elements appear quickly and decelerate), ease-in for exits, and < 200ms for interactions to feel responsive.',
    sourceLinks: [
      { text: 'Material Design Motion', url: 'https://m3.material.io/styles/motion/easing-and-duration/tokens-specs' }
    ],
    badExampleKey: 'animations-ibelick-timing-bad',
    goodExampleKey: 'animations-ibelick-timing-good'
  },
  {
    id: 'animations-ibelick-pause-offscreen',
    category: 'animations',
    source: 'ibelick',
    title: 'Pause Offscreen Animations',
    description: 'Pause looping animations when they\'re not visible to save battery and CPU',
    sourceQuote: 'Pause looping animations when not visible. Use IntersectionObserver to detect visibility and stop wasting resources.',
    additionalExplanation: 'Animations running off-screen waste CPU cycles and drain battery on mobile devices. Use IntersectionObserver or Page Visibility API to pause animations when not visible.',
    sourceLinks: [
      { text: 'IntersectionObserver API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API' }
    ],
    badExampleKey: 'animations-ibelick-pause-offscreen-bad',
    goodExampleKey: 'animations-ibelick-pause-offscreen-good'
  },
  {
    id: 'animations-ibelick-reduced-motion',
    category: 'animations',
    source: 'ibelick',
    title: 'Respect Reduced Motion',
    description: 'Honor prefers-reduced-motion for users who are sensitive to animation',
    sourceQuote: 'SHOULD respect prefers-reduced-motion. Disable or simplify animations for users who have requested reduced motion in their OS settings.',
    additionalExplanation: 'Some users experience motion sickness or vestibular disorders. The prefers-reduced-motion media query lets you detect this preference and provide a calmer experience.',
    sourceLinks: [
      { text: 'prefers-reduced-motion MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion' }
    ],
    badExampleKey: 'animations-ibelick-reduced-motion-bad',
    goodExampleKey: 'animations-ibelick-reduced-motion-good'
  },
  {
    id: 'animations-pause-stop-hide',
    category: 'animations',
    source: 'claude-code',
    title: 'Pause, Stop, Hide Controls (WCAG 2.2.2)',
    description: 'Auto-playing animations over 5 seconds must have pause/stop/hide controls',
    sourceQuote: 'Auto-playing animations >5s MUST have pause/stop/hide controls; OR auto-stop after 5s. Applies to carousels, video backgrounds, infinite loops. Essential animations (loading spinners, progress) are exempt.',
    additionalExplanation: 'WCAG 2.2.2 Level A requires that users can pause, stop, or hide moving content. This prevents distraction for users with attention disorders and reduces seizure risk. Loading indicators and progress bars are exempt as they provide essential feedback.',
    sourceLinks: [
      { text: 'WCAG 2.2.2 Understanding', url: 'https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html' },
      { text: 'Digital A11y Guide', url: 'https://www.digitala11y.com/understanding-sc-2-2-2-pause-stop-hide/' }
    ],
    badExampleKey: 'animations-pause-stop-hide-bad',
    goodExampleKey: 'animations-pause-stop-hide-good'
  },
  {
    id: 'animations-will-change-sparingly',
    category: 'animations',
    source: 'claude-code',
    title: 'Use will-change Sparingly',
    description: 'Apply will-change only to frequently animated elements, and remove after animation',
    sourceQuote: 'Use `will-change` sparingly—only on frequently animated elements. Apply via JS before animation starts, remove after completion. Never blanket-apply; each layer consumes GPU memory.',
    additionalExplanation: 'will-change creates a new compositor layer, consuming GPU memory. Overusing it degrades performance. Apply it just before animation starts and remove it after completion. Never apply it to many elements at once.',
    sourceLinks: [
      { text: 'GPU Animation Best Practices', url: 'https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/' },
      { text: 'MDN will-change', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/will-change' }
    ],
    badExampleKey: 'animations-will-change-sparingly-bad',
    goodExampleKey: 'animations-will-change-sparingly-good'
  },
  {
    id: 'animations-frame-budget',
    category: 'animations',
    source: 'claude-code',
    title: 'Animation Frame Budget (60fps)',
    description: 'Animation work should complete within 16ms frame budget for smooth 60fps',
    sourceQuote: 'Animation work SHOULD complete within 16ms frame budget (60fps). Use requestAnimationFrame for JS animations. Batch DOM reads then writes to avoid layout thrashing in animation loops.',
    additionalExplanation: 'At 60fps, each frame has ~16.67ms. Heavy JavaScript, layout recalculation, or paint work can cause dropped frames. Batch DOM reads before writes, use requestAnimationFrame, and keep animation logic minimal.',
    sourceLinks: [
      { text: 'Animation Performance 101', url: 'https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/' },
      { text: 'MDN Performance Fundamentals', url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals' }
    ],
    badExampleKey: 'animations-frame-budget-bad',
    goodExampleKey: 'animations-frame-budget-good'
  },
  {
    id: 'animations-view-transitions',
    category: 'animations',
    source: 'claude-code',
    title: 'View Transitions API',
    description: 'Use View Transitions API for smooth page/state transitions',
    sourceQuote: 'Use View Transitions API for page/state transitions. Add `@view-transition { navigation: auto; }` for MPA. Use `view-transition-name` for morphing elements. Progressive enhancement—works without JS.',
    additionalExplanation: 'The View Transitions API enables smooth animated transitions between DOM states or pages. It works for both SPAs and MPAs, morphs elements across states, and degrades gracefully in unsupported browsers.',
    sourceLinks: [
      { text: 'View Transitions in 2025', url: 'https://developer.chrome.com/blog/view-transitions-in-2025' },
      { text: 'MDN View Transitions', url: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API' }
    ],
    badExampleKey: 'animations-view-transitions-bad',
    goodExampleKey: 'animations-view-transitions-good'
  },
  {
    id: 'animations-spring-physics',
    category: 'animations',
    source: 'claude-code',
    title: 'Spring Physics for Natural Motion',
    description: 'Prefer spring-based animations for interactive elements like buttons and modals',
    sourceQuote: 'Prefer spring-based animations for interactive elements (buttons, modals, drag). Configure mass/tension/friction instead of duration/easing for natural feel and interruptible motion.',
    additionalExplanation: 'Spring physics produce more natural-feeling motion than CSS easing. They respond to velocity changes, can be interrupted mid-animation, and settle naturally. Libraries like react-spring make this easy.',
    sourceLinks: [
      { text: 'React Spring vs Framer Motion', url: 'https://www.dhiwise.com/post/react-spring-vs-framer-motion-a-detailed-guide-to-react' },
      { text: 'React Spring Visualizer', url: 'https://react-spring-visualizer.com/' }
    ],
    badExampleKey: 'animations-spring-physics-bad',
    goodExampleKey: 'animations-spring-physics-good'
  },
  {
    id: 'animations-motion-tailwind-conflict',
    category: 'animations',
    source: 'claude-code',
    title: 'Motion Library + Tailwind Conflicts',
    description: 'Remove Tailwind transition classes from elements animated by Framer Motion',
    sourceQuote: 'When using Framer Motion/Motion with Tailwind, remove conflicting `transition-*` classes from animated elements. Let Motion handle transitions to prevent stuttery/weird motion.',
    additionalExplanation: 'Tailwind\'s transition-* classes apply CSS transitions. When combined with Framer Motion\'s JS-based animations, they conflict and cause stuttering. Use Motion\'s transition prop instead.',
    sourceLinks: [
      { text: 'Motion + Tailwind Guide', url: 'https://motion.dev/docs/react-tailwind' },
      { text: 'Framer Motion + Tailwind 2025', url: 'https://dev.to/manukumar07/framer-motion-tailwind-the-2025-animation-stack-1801' }
    ],
    badExampleKey: 'animations-motion-tailwind-conflict-bad',
    goodExampleKey: 'animations-motion-tailwind-conflict-good'
  },
  {
    id: 'animations-tailwind-motion-variants',
    category: 'animations',
    source: 'claude-code',
    title: 'Tailwind motion-safe/motion-reduce Variants',
    description: 'Use Tailwind motion-safe: and motion-reduce: variants for accessible animations',
    sourceQuote: 'Use Tailwind `motion-safe:` and `motion-reduce:` variants to conditionally apply animations. Default pattern: `motion-safe:animate-*` ensures animations only run when user allows motion.',
    additionalExplanation: 'These variants respect the user\'s prefers-reduced-motion setting. motion-safe: applies styles only when motion is allowed. motion-reduce: applies alternative styles when user prefers reduced motion.',
    sourceLinks: [
      { text: 'Tailwind Animation', url: 'https://tailwindcss.com/docs/animation' },
      { text: 'Motion-Safe Animations Guide', url: 'https://dev.to/hexshift/building-fluid-motion-safe-animations-in-tailwind-css-that-respect-user-preferences-3i6e' }
    ],
    badExampleKey: 'animations-tailwind-motion-variants-bad',
    goodExampleKey: 'animations-tailwind-motion-variants-good'
  },
  {
    id: 'animations-pause-offscreen',
    category: 'animations',
    source: 'claude-code',
    title: 'Pause Offscreen Animations',
    description: 'Use IntersectionObserver or content-visibility to pause animations when not visible',
    sourceQuote: 'Pause or disable animations for offscreen elements using IntersectionObserver or `content-visibility: auto`. Saves CPU/battery on mobile. Resume when element enters viewport.',
    additionalExplanation: 'Running animations on elements outside the viewport wastes CPU and battery. IntersectionObserver can pause animations when elements scroll out of view. content-visibility: auto automatically handles this for render-heavy content.',
    sourceLinks: [
      { text: 'web.dev content-visibility', url: 'https://web.dev/articles/content-visibility' },
      { text: 'MDN content-visibility', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility' }
    ],
    badExampleKey: 'animations-pause-offscreen-bad',
    goodExampleKey: 'animations-pause-offscreen-good'
  },
  {
    id: 'layout-optical-alignment',
    category: 'layout',
    source: 'vercel',
    title: 'Optical Alignment',
    description: 'Adjust ±1px when perception beats geometry',
    sourceQuote: 'Optical alignment. Adjust ±1px when perception beats geometry.',
    additionalExplanation: 'Mathematical centering doesn\'t always look centered to the human eye. Icons with more visual weight on one side may need to be shifted slightly to appear balanced. Trust your eye over the numbers, but limit adjustments to 1-2px.',
    sourceLinks: [
      { text: 'Optical Alignment', url: 'https://blog.marvelapp.com/optical-adjustment-logic-vs-designers/' }
    ],
    badExampleKey: 'layout-optical-alignment-bad',
    goodExampleKey: 'layout-optical-alignment-good'
  },
  {
    id: 'layout-deliberate-alignment',
    category: 'layout',
    source: 'vercel',
    title: 'Deliberate Alignment',
    description: 'Every element aligns with something intentionally',
    sourceQuote: 'Deliberate alignment. Every element aligns with something intentionally whether to a grid, baseline, edge, or optical center. No accidental positioning.',
    additionalExplanation: 'Nothing should be randomly placed. Every element should visibly align with another element, a grid line, or have a clear relationship to its neighbors. This creates visual harmony and helps users scan content efficiently.',
    sourceLinks: [
      { text: 'Visual Alignment', url: 'https://www.nngroup.com/articles/gestalt-proximity/' }
    ],
    badExampleKey: 'layout-deliberate-alignment-bad',
    goodExampleKey: 'layout-deliberate-alignment-good'
  },
  {
    id: 'layout-responsive-coverage',
    category: 'layout',
    source: 'vercel',
    title: 'Responsive Coverage',
    description: 'Verify on mobile, laptop, and ultra-wide screens',
    sourceQuote: 'Responsive coverage. Verify on mobile, laptop, & ultra-wide. For ultra-wide, zoom out to 50% to simulate.',
    additionalExplanation: 'Test your layouts at 320px (small mobile), 768px (tablet), 1280px (laptop), and 2560px+ (ultra-wide). Content should reflow appropriately, never horizontally scroll unexpectedly, and use available space effectively at all sizes.',
    sourceLinks: [
      { text: 'Responsive Design', url: 'https://web.dev/responsive-web-design-basics/' }
    ],
    badExampleKey: 'layout-responsive-coverage-bad',
    goodExampleKey: 'layout-responsive-coverage-good'
  },
  {
    id: 'layout-no-excessive-scrollbars',
    category: 'layout',
    source: 'vercel',
    title: 'No Excessive Scrollbars',
    description: 'Only render useful scrollbars; fix overflow issues',
    sourceQuote: 'No excessive scrollbars. Only render useful scrollbars; fix overflow issues to prevent unwanted scrollbars.',
    additionalExplanation: 'Unexpected scrollbars indicate layout problems. Fix the root cause (usually overflow issues) rather than hiding scrollbars with CSS. On macOS, set "Show scroll bars" to "Always" during development to catch these issues.',
    sourceLinks: [
      { text: 'CSS Overflow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow' }
    ],
    badExampleKey: 'layout-no-excessive-scrollbars-bad',
    goodExampleKey: 'layout-no-excessive-scrollbars-good'
  },
  {
    id: 'layout-balance-contrast',
    category: 'layout',
    source: 'vercel',
    title: 'Balance Contrast in Lockups',
    description: 'Adjust weight, size, spacing when text and icons sit together',
    sourceQuote: 'Balance contrast in lockups. When text & icons sit side by side, adjust weight, size, spacing, or color so they don\'t clash. For example, a thin-stroke icon may need a bolder stroke next to medium-weight text.',
    additionalExplanation: 'Icons and text have different visual weights. A light icon next to bold text feels unbalanced. Either use heavier icons, lighter text, adjust sizing, or tweak color to create visual harmony in icon-text combinations.',
    sourceLinks: [
      { text: 'Visual Balance', url: 'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/' }
    ],
    badExampleKey: 'layout-balance-contrast-bad',
    goodExampleKey: 'layout-balance-contrast-good'
  },
  {
    id: 'layout-safe-areas',
    category: 'layout',
    source: 'vercel',
    title: 'Respect Safe Areas',
    description: 'Account for notches and insets with safe-area variables',
    sourceQuote: 'Respect safe areas. Account for notches & insets with safe-area variables.',
    additionalExplanation: 'Mobile devices with notches and rounded corners have safe areas where content shouldn\'t be placed. Use CSS environment variables like env(safe-area-inset-top) to ensure your content isn\'t obscured by device UI elements.',
    sourceLinks: [
      { text: 'Safe Area Insets', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env' },
      { text: 'Designing for iPhone X', url: 'https://webkit.org/blog/7929/designing-websites-for-iphone-x/' }
    ],
    badExampleKey: 'layout-safe-areas-bad',
    goodExampleKey: 'layout-safe-areas-good'
  },
  {
    id: 'layout-layer-directives',
    category: 'layout',
    source: 'tailwind',
    title: '@layer Directives',
    description: 'Use @layer directives to control CSS specificity',
    sourceQuote: 'Use @layer base, @layer components, and @layer utilities to add custom CSS that integrates with Tailwind\'s specificity cascade.',
    additionalExplanation: 'The @layer directive ensures your custom CSS works within Tailwind\'s specificity system. Base for resets, components for reusable patterns, utilities for single-purpose helpers.',
    sourceLinks: [
      { text: 'Adding Custom Styles', url: 'https://tailwindcss.com/docs/adding-custom-styles' },
      { text: 'Using @layer', url: 'https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer' }
    ],
    badExampleKey: 'layout-layer-directives-bad',
    goodExampleKey: 'layout-layer-directives-good'
  },
  {
    id: 'layout-custom-utilities',
    category: 'layout',
    source: 'tailwind',
    title: 'Create Custom Utilities',
    description: 'Add project-specific utilities in the utilities layer',
    sourceQuote: 'Create custom utilities in @layer utilities (or @utility in v4) for reusable single-purpose classes that Tailwind doesn\'t provide.',
    additionalExplanation: 'Some CSS properties aren\'t in Tailwind by default (text-wrap: balance, scrollbar styling). Adding them as utilities means they work with variants and get purged correctly.',
    sourceLinks: [
      { text: 'Adding Custom Utilities', url: 'https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities' },
      { text: 'Tailwind v4 @utility', url: 'https://tailwindcss.com/docs/v4-beta#new-utility-directive' }
    ],
    badExampleKey: 'layout-custom-utilities-bad',
    goodExampleKey: 'layout-custom-utilities-good'
  },
  {
    id: 'layout-ibelick-z-index-scale',
    category: 'layout',
    source: 'ibelick',
    title: 'Use Fixed Z-Index Scale',
    description: 'Use a defined z-index scale instead of arbitrary values like z-[999]',
    sourceQuote: 'MUST use fixed z-index scale, no arbitrary z-*. Define semantic z-index layers (base, dropdown, sticky, modal, popover, tooltip).',
    additionalExplanation: 'Arbitrary z-index values like z-[999] create an unmanageable stacking context. A semantic scale ensures predictable stacking: tooltips above modals, modals above dropdowns.',
    sourceLinks: [
      { text: 'Tailwind Z-Index', url: 'https://tailwindcss.com/docs/z-index' }
    ],
    badExampleKey: 'layout-ibelick-z-index-scale-bad',
    goodExampleKey: 'layout-ibelick-z-index-scale-good'
  },
  {
    id: 'layout-ibelick-size-utility',
    category: 'layout',
    source: 'ibelick',
    title: 'Use size-* Utility',
    description: 'Use size-* instead of separate w-* and h-* for square elements',
    sourceQuote: 'Use size-* instead of separate w-* h-* for square elements. It\'s more concise and clearly communicates intent.',
    additionalExplanation: 'When an element should be square (icons, avatars, buttons), using size-8 instead of w-8 h-8 is more concise and communicates intent clearly.',
    sourceLinks: [
      { text: 'Tailwind Size Utility', url: 'https://tailwindcss.com/docs/size' }
    ],
    badExampleKey: 'layout-ibelick-size-utility-bad',
    goodExampleKey: 'layout-ibelick-size-utility-good'
  },
  {
    id: 'layout-ibelick-viewport-height',
    category: 'layout',
    source: 'ibelick',
    title: 'Use dvh Instead of h-screen',
    description: 'Never use h-screen or 100vh on mobile - use h-dvh for dynamic viewport height',
    sourceQuote: 'NEVER use h-screen (100vh) for full-height layouts. Use h-dvh (dynamic viewport height) to account for mobile browser chrome.',
    additionalExplanation: 'On mobile browsers, 100vh includes the area behind the browser\'s address bar and navigation. This causes content to be cut off. dvh adjusts as the browser chrome shows/hides.',
    sourceLinks: [
      { text: 'Dynamic Viewports', url: 'https://web.dev/blog/viewport-units' }
    ],
    badExampleKey: 'layout-ibelick-viewport-height-bad',
    goodExampleKey: 'layout-ibelick-viewport-height-good'
  },
  {
    id: 'layout-ibelick-safe-areas',
    category: 'layout',
    source: 'ibelick',
    title: 'Respect Safe Area Insets',
    description: 'Use safe-area-inset padding to prevent content from being hidden behind notches and home indicators',
    sourceQuote: 'MUST respect safe-area-inset for content near screen edges. Use pb-safe, pt-safe, or env(safe-area-inset-*) to avoid notches and home indicators.',
    additionalExplanation: 'Modern phones have notches, rounded corners, and home indicators that can obscure content. The safe-area-inset CSS environment variables add padding that respects these hardware features.',
    sourceLinks: [
      { text: 'Designing for Notches', url: 'https://webkit.org/blog/7929/designing-websites-for-iphone-x/' }
    ],
    badExampleKey: 'layout-ibelick-safe-areas-bad',
    goodExampleKey: 'layout-ibelick-safe-areas-good'
  },
  {
    id: 'content-inline-help-first',
    category: 'content',
    source: 'vercel',
    title: 'Inline Help First',
    description: 'Prefer inline explanations; use tooltips as last resort',
    sourceQuote: 'Inline help first. Prefer inline explanations; use tooltips as a last resort.',
    additionalExplanation: 'Tooltips hide information and require hovering, which doesn\'t work on touch devices. Whenever possible, include help text inline where it\'s always visible. Use tooltips only for supplementary information that would clutter the interface.',
    sourceLinks: [
      { text: 'Tooltip Usability', url: 'https://www.nngroup.com/articles/tooltip-guidelines/' }
    ],
    badExampleKey: 'content-inline-help-first-bad',
    goodExampleKey: 'content-inline-help-first-good'
  },
  {
    id: 'content-stable-skeletons',
    category: 'content',
    source: 'vercel',
    title: 'Stable Skeletons',
    description: 'Skeletons mirror final content exactly to avoid layout shift',
    sourceQuote: 'Stable skeletons. Skeletons mirror final content exactly to avoid layout shift.',
    additionalExplanation: 'Loading skeletons should match the dimensions and layout of the actual content. This prevents cumulative layout shift (CLS) when content loads. If content varies significantly, use the most common dimensions or a safe maximum.',
    sourceLinks: [
      { text: 'Skeleton Screens', url: 'https://www.nngroup.com/articles/skeleton-screens/' },
      { text: 'Cumulative Layout Shift', url: 'https://web.dev/cls/' }
    ],
    badExampleKey: 'content-stable-skeletons-bad',
    goodExampleKey: 'content-stable-skeletons-good'
  },
  {
    id: 'content-no-dead-ends',
    category: 'content',
    source: 'vercel',
    title: 'No Dead Ends',
    description: 'Every screen offers a next step or recovery path',
    sourceQuote: 'No dead ends. Every screen offers a next step or recovery path.',
    additionalExplanation: 'Empty states, error pages, and completion screens should always provide clear next actions. Never leave users stuck wondering what to do. Offer suggestions, links to help, or ways to start over.',
    sourceLinks: [
      { text: 'Empty States', url: 'https://www.nngroup.com/articles/empty-state-interface-design/' }
    ],
    badExampleKey: 'content-no-dead-ends-bad',
    goodExampleKey: 'content-no-dead-ends-good'
  },
  {
    id: 'content-typographic-quotes',
    category: 'content',
    source: 'vercel',
    title: 'Typographic Quotes',
    description: 'Prefer curly quotes over straight quotes',
    sourceQuote: 'Typographic quotes. Prefer curly quotes (" ") over straight quotes (" ").',
    additionalExplanation: 'Curly quotes (also called smart quotes or typographer\'s quotes) look more polished and professional than straight quotes. Use curly double quotes and curly single quotes. Most design tools and modern editors can auto-convert these.',
    sourceLinks: [
      { text: 'Smart Quotes', url: 'https://practicaltypography.com/straight-and-curly-quotes.html' }
    ],
    badExampleKey: 'content-typographic-quotes-bad',
    goodExampleKey: 'content-typographic-quotes-good'
  },
  {
    id: 'content-tabular-numbers',
    category: 'content',
    source: 'vercel',
    title: 'Tabular Numbers',
    description: 'Use tabular-nums for comparisons and tables',
    sourceQuote: 'Tabular numbers for comparisons. Use font-variant-numeric: tabular-nums or a monospace like Geist Mono.',
    additionalExplanation: 'Proportional numbers have varying widths (1 is narrower than 8), making columns misalign. Tabular numbers have uniform width, so digits stack vertically in tables and make comparisons easier. Essential for prices, metrics, and data tables.',
    sourceLinks: [
      { text: 'font-variant-numeric', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric' }
    ],
    badExampleKey: 'content-tabular-numbers-bad',
    goodExampleKey: 'content-tabular-numbers-good'
  },
  {
    id: 'content-icons-have-labels',
    category: 'content',
    source: 'vercel',
    title: 'Icons Have Labels',
    description: 'Convey the same meaning with text for non-sighted users',
    sourceQuote: 'Icons have labels. Convey the same meaning with text for assistive tech. Icon-only buttons are named. Provide a descriptive aria-label.',
    additionalExplanation: 'Icons aren\'t universally understood and are invisible to screen readers. Either show a visible text label alongside the icon, or provide an aria-label for icon-only buttons. The label should describe the action, not the icon itself.',
    sourceLinks: [
      { text: 'Accessible Icon Buttons', url: 'https://www.sarasoueidan.com/blog/accessible-icon-buttons/' }
    ],
    badExampleKey: 'content-icons-have-labels-bad',
    goodExampleKey: 'content-icons-have-labels-good'
  },
  {
    id: 'content-non-breaking-spaces',
    category: 'content',
    source: 'vercel',
    title: 'Non-breaking Spaces',
    description: 'Use non-breaking spaces to keep units and terms together',
    sourceQuote: 'Non-breaking spaces for glued terms. Use a non-breaking space &nbsp; to keep units, shortcuts & names together: 10 MB → 10&nbsp;MB, ⌘ + K → ⌘&nbsp;+&nbsp;K, Vercel SDK → Vercel&nbsp;SDK.',
    additionalExplanation: 'Certain text elements should never wrap onto separate lines. Use &nbsp; (non-breaking space) in HTML or \\u00A0 in JavaScript to keep numbers with their units, keyboard shortcuts together, and brand names intact.',
    sourceLinks: [
      { text: 'Non-breaking space', url: 'https://en.wikipedia.org/wiki/Non-breaking_space' }
    ],
    badExampleKey: 'content-non-breaking-spaces-bad',
    goodExampleKey: 'content-non-breaking-spaces-good'
  },
  {
    id: 'content-page-titles',
    category: 'content',
    source: 'vercel',
    title: 'Accurate Page Titles',
    description: 'Title element reflects the current context',
    sourceQuote: 'Accurate page titles. <title> reflects the current context.',
    additionalExplanation: 'The page title appears in browser tabs, bookmarks, and search results. Update it dynamically to reflect the current view (e.g., "Edit Profile - Settings - MyApp"). This helps users navigate between tabs and understand their location.',
    sourceLinks: [
      { text: 'Title element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title' }
    ],
    badExampleKey: 'content-page-titles-bad',
    goodExampleKey: 'content-page-titles-good'
  },
  {
    id: 'content-all-states',
    category: 'content',
    source: 'vercel',
    title: 'All States Designed',
    description: 'Design empty, sparse, dense, and error states',
    sourceQuote: 'All states designed. Empty, sparse, dense, & error states.',
    additionalExplanation: 'Every interface has multiple states beyond the ideal happy path. Design and implement empty states (no data yet), sparse states (minimal data), dense states (lots of data), error states (something went wrong), and loading states. Don\'t leave users facing blank screens.',
    sourceLinks: [
      { text: 'Empty States', url: 'https://www.nngroup.com/articles/empty-state-interface-design/' }
    ],
    badExampleKey: 'content-all-states-bad',
    goodExampleKey: 'content-all-states-good'
  },
  {
    id: 'content-redundant-cues',
    category: 'content',
    source: 'vercel',
    title: 'Redundant Status Cues',
    description: 'Don\'t rely on color alone; include text labels',
    sourceQuote: 'Redundant status cues. Don\'t rely on color alone; include text labels.',
    additionalExplanation: 'Color blind users and users in bright sunlight may not be able to distinguish colors. Always pair color coding with text labels, icons, or patterns. For example, success shouldn\'t be just green; it should be green with a checkmark and "Success" text.',
    sourceLinks: [
      { text: 'Color Accessibility', url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html' }
    ],
    badExampleKey: 'content-redundant-cues-bad',
    goodExampleKey: 'content-redundant-cues-good'
  },
  {
    id: 'content-ellipsis-character',
    category: 'content',
    source: 'vercel',
    title: 'Use Ellipsis Character',
    description: 'Use … instead of three periods',
    sourceQuote: 'Use the ellipsis character. … over three periods ....',
    additionalExplanation: 'The proper ellipsis character (…) is a single character with correct spacing. Three periods (...) have wider spacing and look unprofessional. Use the real ellipsis character (Unicode U+2026) in all text.',
    sourceLinks: [
      { text: 'Ellipsis', url: 'https://en.wikipedia.org/wiki/Ellipsis' }
    ],
    badExampleKey: 'content-ellipsis-character-bad',
    goodExampleKey: 'content-ellipsis-character-good'
  },
  {
    id: 'content-anchored-headings',
    category: 'content',
    source: 'vercel',
    title: 'Anchored Headings',
    description: 'Set scroll-margin-top for headers when linking to sections',
    sourceQuote: 'Anchored headings. Set scroll-margin-top for headers when linking to sections.',
    additionalExplanation: 'When users click anchor links to jump to sections, fixed headers can cover the target heading. Use scroll-margin-top on headings to add offset so they appear below fixed headers. Also provide hierarchical h1-h6 structure and a "Skip to content" link.',
    sourceLinks: [
      { text: 'scroll-margin-top', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top' }
    ],
    badExampleKey: 'content-anchored-headings-bad',
    goodExampleKey: 'content-anchored-headings-good'
  },
  {
    id: 'content-resilient-ugc',
    category: 'content',
    source: 'vercel',
    title: 'Resilient to User-generated Content',
    description: 'Layouts handle short, average, and very long content',
    sourceQuote: 'Resilient to user-generated content. Layouts handle short, average, & very long content.',
    additionalExplanation: 'User-generated content is unpredictable. Test your layouts with short text, average text, and extremely long text without spaces. Use text overflow strategies like ellipsis, word-wrap, or scrolling to handle edge cases gracefully.',
    sourceLinks: [
      { text: 'Text Overflow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow' }
    ],
    badExampleKey: 'content-resilient-ugc-bad',
    goodExampleKey: 'content-resilient-ugc-good'
  },
  {
    id: 'content-locale-formats',
    category: 'content',
    source: 'vercel',
    title: 'Locale-aware Formats',
    description: 'Format dates, times, numbers, and currency for user locale',
    sourceQuote: 'Locale-aware formats. Format dates, times, numbers, delimiters, & currencies for the user\'s locale.',
    additionalExplanation: 'Different regions format data differently (12/31/2024 vs 31.12.2024, $1,000.00 vs 1.000,00€). Use Intl API in JavaScript to format dates, numbers, and currency according to the user\'s locale automatically.',
    sourceLinks: [
      { text: 'Internationalization API', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl' }
    ],
    badExampleKey: 'content-locale-formats-bad',
    goodExampleKey: 'content-locale-formats-good'
  },
  {
    id: 'content-accessible-content',
    category: 'content',
    source: 'vercel',
    title: 'Accessible Content',
    description: 'Set accurate names, hide decorations, verify in accessibility tree',
    sourceQuote: 'Accessible content. Set accurate names (aria-label), hide decoration (aria-hidden) & verify in the accessibility tree.',
    additionalExplanation: 'Assistive technologies rely on proper ARIA attributes. Give interactive elements descriptive names with aria-label. Hide purely decorative elements with aria-hidden="true". Always test in the accessibility tree to ensure screen readers get meaningful information.',
    sourceLinks: [
      { text: 'ARIA Labels', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label' },
      { text: 'Accessibility Tree', url: 'https://developer.chrome.com/docs/devtools/accessibility/reference/' }
    ],
    badExampleKey: 'content-accessible-content-bad',
    goodExampleKey: 'content-accessible-content-good'
  },
  {
    id: 'content-semantics-first',
    category: 'content',
    source: 'vercel',
    title: 'Semantics Before ARIA',
    description: 'Prefer native elements before ARIA attributes',
    sourceQuote: 'Semantics before ARIA. Prefer native elements (button, a, label, table), before aria-*.',
    additionalExplanation: 'Native HTML elements have built-in accessibility, keyboard support, and expected behaviors. Use <button> instead of <div role="button">, <a> instead of <span role="link">. Only add ARIA when native elements don\'t provide the semantics you need.',
    sourceLinks: [
      { text: 'ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
      { text: 'No ARIA is Better Than Bad ARIA', url: 'https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/' }
    ],
    badExampleKey: 'content-semantics-first-bad',
    goodExampleKey: 'content-semantics-first-good'
  },
  {
    id: 'content-class-formatting',
    category: 'content',
    source: 'tailwind',
    title: 'Class Formatting',
    description: 'Follow consistent class ordering and formatting conventions',
    sourceQuote: 'Maintain consistent class ordering: layout → spacing → sizing → typography → colors → effects. Use Prettier plugin for automation.',
    additionalExplanation: 'Consistent class ordering makes code scannable and maintainable. The Prettier plugin for Tailwind CSS automatically sorts classes following the recommended order.',
    sourceLinks: [
      { text: 'Prettier Plugin', url: 'https://github.com/tailwindlabs/prettier-plugin-tailwindcss' },
      { text: 'Class Sorting', url: 'https://tailwindcss.com/blog/automatic-class-sorting-with-prettier' }
    ],
    badExampleKey: 'content-class-formatting-bad',
    goodExampleKey: 'content-class-formatting-good'
  },
  {
    id: 'content-official-plugins',
    category: 'content',
    source: 'tailwind',
    title: 'Official Plugins',
    description: 'Use official Tailwind plugins for specialized content styling',
    sourceQuote: 'Use official plugins (@tailwindcss/typography, @tailwindcss/forms, @tailwindcss/container-queries) for comprehensive feature coverage.',
    additionalExplanation: 'Official plugins provide well-designed, tested utilities that integrate seamlessly with Tailwind. The typography plugin is essential for prose content, forms for consistent input styling.',
    sourceLinks: [
      { text: '@tailwindcss/typography', url: 'https://tailwindcss.com/docs/typography-plugin' },
      { text: '@tailwindcss/forms', url: 'https://github.com/tailwindlabs/tailwindcss-forms' },
      { text: '@tailwindcss/container-queries', url: 'https://github.com/tailwindlabs/tailwindcss-container-queries' }
    ],
    badExampleKey: 'content-official-plugins-bad',
    goodExampleKey: 'content-official-plugins-good'
  },
  {
    id: 'content-intellisense',
    category: 'content',
    source: 'tailwind',
    title: 'IDE IntelliSense',
    description: 'Configure IDE extension for autocomplete and linting',
    sourceQuote: 'Install and configure Tailwind CSS IntelliSense extension for autocomplete, linting, and hover documentation.',
    additionalExplanation: 'The official Tailwind CSS IntelliSense extension provides autocomplete, syntax highlighting, and linting. It catches errors like non-existent classes and suggests valid utilities.',
    sourceLinks: [
      { text: 'IntelliSense Extension', url: 'https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code' },
      { text: 'Tailwind CSS IntelliSense', url: 'https://github.com/tailwindlabs/tailwindcss-intellisense' }
    ],
    badExampleKey: 'content-intellisense-bad',
    goodExampleKey: 'content-intellisense-good'
  },
  {
    id: 'content-rams-alt-text',
    category: 'content',
    source: 'rams',
    title: 'Images Missing Alt Text',
    description: 'All images must have descriptive alt text for screen reader users',
    sourceQuote: 'Images without alt text are invisible to screen reader users. Provide descriptive text that conveys the image content and purpose.',
    additionalExplanation: 'Alt text is essential for accessibility. Decorative images should use alt="" to be skipped by screen readers, while meaningful images need descriptive text.',
    sourceLinks: [
      { text: 'WCAG 1.1.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html' }
    ],
    badExampleKey: 'content-rams-alt-text-bad',
    goodExampleKey: 'content-rams-alt-text-good'
  },
  {
    id: 'content-rams-heading-levels',
    category: 'content',
    source: 'rams',
    title: 'Skipped Heading Levels',
    description: 'Heading levels should not skip (e.g., h1 to h3 without h2)',
    sourceQuote: 'Skipping heading levels breaks the logical document structure. Screen reader users navigate by headings; skipped levels cause confusion.',
    additionalExplanation: 'Headings create a document outline. Going from h1 to h3 suggests missing content. Always maintain sequential heading hierarchy.',
    sourceLinks: [
      { text: 'WCAG 1.3.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html' }
    ],
    badExampleKey: 'content-rams-heading-levels-bad',
    goodExampleKey: 'content-rams-heading-levels-good'
  },
  {
    id: 'content-rams-link-text',
    category: 'content',
    source: 'rams',
    title: 'Links Without Descriptive Text',
    description: 'Links should have descriptive text, not generic phrases like "click here"',
    sourceQuote: 'Generic link text like "click here" or "read more" provides no context. Link text should describe the destination or action.',
    additionalExplanation: 'Screen reader users often navigate by links. Descriptive text helps them understand where the link goes without reading surrounding content.',
    sourceLinks: [
      { text: 'WCAG 2.4.4', url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html' }
    ],
    badExampleKey: 'content-rams-link-text-bad',
    goodExampleKey: 'content-rams-link-text-good'
  },
  {
    id: 'content-ibelick-text-balance',
    category: 'content',
    source: 'ibelick',
    title: 'Use text-balance and text-pretty',
    description: 'Use text-balance for headings and text-pretty for body text to improve readability',
    sourceQuote: 'Use text-balance for headings and text-pretty for body text. These CSS properties improve line breaks and readability.',
    additionalExplanation: 'text-balance balances line lengths in headings. text-pretty prevents orphans (single words on last line) in paragraphs. Both improve readability without manual line break management.',
    sourceLinks: [
      { text: 'CSS text-wrap', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap' }
    ],
    badExampleKey: 'content-ibelick-text-balance-bad',
    goodExampleKey: 'content-ibelick-text-balance-good'
  },
  {
    id: 'content-ibelick-tabular-nums',
    category: 'content',
    source: 'ibelick',
    title: 'Use Tabular Numbers for Data',
    description: 'Always use tabular-nums for numbers in tables and data displays for proper alignment',
    sourceQuote: 'MUST use tabular-nums (font-variant-numeric: tabular-nums) for data tables, prices, and numerical lists.',
    additionalExplanation: 'Proportional numbers have varying widths, causing columns to misalign. Tabular numbers have uniform widths, ensuring perfect alignment and professional appearance.',
    sourceLinks: [
      { text: 'font-variant-numeric MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric' }
    ],
    badExampleKey: 'content-ibelick-tabular-nums-bad',
    goodExampleKey: 'content-ibelick-tabular-nums-good'
  },
  {
    id: 'content-ibelick-text-overflow',
    category: 'content',
    source: 'ibelick',
    title: 'Handle Text Overflow Properly',
    description: 'Use truncate or line-clamp for predictable text overflow in dense layouts',
    sourceQuote: 'Apply truncate or line-clamp for text in cards, lists, and dense layouts. Predictable overflow prevents layout breaking.',
    additionalExplanation: 'User-generated content can be any length. Without overflow handling, cards expand unexpectedly and grids break. Use truncate for single lines, line-clamp for multi-line limits.',
    sourceLinks: [
      { text: 'Tailwind Line Clamp', url: 'https://tailwindcss.com/docs/line-clamp' }
    ],
    badExampleKey: 'content-ibelick-text-overflow-bad',
    goodExampleKey: 'content-ibelick-text-overflow-good'
  },
  {
    id: 'content-ibelick-letter-spacing',
    category: 'content',
    source: 'ibelick',
    title: 'Don\'t Modify Letter Spacing',
    description: 'Avoid changing letter-spacing unless explicitly requested - fonts are designed with proper spacing',
    sourceQuote: 'Avoid modifying letter-spacing unless explicitly requested. Type designers carefully craft letter spacing for readability.',
    additionalExplanation: 'Professional typefaces are meticulously designed with optimal letter spacing. Modifying it reduces readability and often looks unprofessional. Consider different font weights instead.',
    sourceLinks: [
      { text: 'Typography Best Practices', url: 'https://fonts.google.com/knowledge/using_type/best_practices_for_line_spacing' }
    ],
    badExampleKey: 'content-ibelick-letter-spacing-bad',
    goodExampleKey: 'content-ibelick-letter-spacing-good'
  },
  {
    id: 'forms-enter-submits',
    category: 'forms',
    source: 'vercel',
    title: 'Enter Submits',
    description: 'When a text input is focused, Enter should submit the form if it\'s the only control',
    sourceQuote: 'Enter submits. When a text input is focused, Enter submits if it\'s the only control. If there are many controls, apply to the last control.',
    additionalExplanation: 'Users expect pressing Enter in a form field to submit the form. This is a fundamental web convention that improves efficiency and meets user expectations. For single-input forms like search boxes or login fields, this should work from any input. For multi-field forms, Enter should submit when focus is on the last input.',
    sourceLinks: [
      { text: 'WAI-ARIA Authoring Patterns', url: 'https://www.w3.org/WAI/ARIA/apg/' }
    ],
    badExampleKey: 'forms-enter-submits-bad',
    goodExampleKey: 'forms-enter-submits-good'
  },
  {
    id: 'forms-textarea-behavior',
    category: 'forms',
    source: 'vercel',
    title: 'Textarea Behavior',
    description: 'In textarea, Enter should insert a new line while Cmd/Ctrl+Enter submits',
    sourceQuote: 'Textarea behavior. In <textarea>, ⌘/⌃+Enter submits; Enter inserts a new line.',
    additionalExplanation: 'Textareas are for multi-line input, so Enter must create new lines. Users who want to submit can use the keyboard modifier (Cmd on Mac, Ctrl on Windows/Linux) plus Enter. This prevents accidental submission when writing paragraphs.',
    sourceLinks: [
      { text: 'HTML textarea element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea' }
    ],
    badExampleKey: 'forms-textarea-behavior-bad',
    goodExampleKey: 'forms-textarea-behavior-good'
  },
  {
    id: 'forms-labels-everywhere',
    category: 'forms',
    source: 'vercel',
    title: 'Labels Everywhere',
    description: 'Every form control must have a visible label or accessible name',
    sourceQuote: 'Labels everywhere. Every control has a <label> or is associated with a label for assistive tech.',
    additionalExplanation: 'Labels are crucial for accessibility. Screen reader users need labels to understand what each form field is for. Sighted users benefit from clear labels too. Use the <label> element with the "for" attribute pointing to the input\'s id, or wrap the input inside the label.',
    sourceLinks: [
      { text: 'MDN: Label element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label' },
      { text: 'WebAIM: Creating Accessible Forms', url: 'https://webaim.org/techniques/forms/' }
    ],
    badExampleKey: 'forms-labels-everywhere-bad',
    goodExampleKey: 'forms-labels-everywhere-good'
  },
  {
    id: 'forms-label-activation',
    category: 'forms',
    source: 'vercel',
    title: 'Label Activation',
    description: 'Clicking a label should focus its associated input',
    sourceQuote: 'Label activation. Clicking a <label> focuses the associated control.',
    additionalExplanation: 'When labels are properly associated with their inputs, clicking the label text focuses the input. This increases the clickable area and improves usability, especially for checkboxes and radio buttons which have small hit targets.',
    sourceLinks: [
      { text: 'MDN: Label element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label' }
    ],
    badExampleKey: 'forms-label-activation-bad',
    goodExampleKey: 'forms-label-activation-good'
  },
  {
    id: 'forms-submission-rule',
    category: 'forms',
    source: 'vercel',
    title: 'Submission Rule',
    description: 'Keep submit button enabled until submission starts, then disable with loading state',
    sourceQuote: 'Submission rule. Keep submit enabled until submission starts; then disable during the in-flight request, show a spinner, & include an idempotency key.',
    additionalExplanation: 'Pre-disabling submit buttons prevents users from discovering validation errors. Let them try to submit, then show what needs fixing. Once submission starts, disable the button and show a loading indicator to prevent double submissions. Use idempotency keys on the backend to handle accidental duplicate requests.',
    sourceLinks: [
      { text: 'Idempotency', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Idempotent' }
    ],
    badExampleKey: 'forms-submission-rule-bad',
    goodExampleKey: 'forms-submission-rule-good'
  },
  {
    id: 'forms-dont-block-typing',
    category: 'forms',
    source: 'vercel',
    title: 'Don\'t Block Typing',
    description: 'Allow all input and show validation feedback instead of blocking keystrokes',
    sourceQuote: 'Don\'t block typing. Even if a field only accepts numbers, allow any input & show validation feedback. Blocking keystrokes entirely is confusing because the user gets no explanation.',
    additionalExplanation: 'When you prevent users from typing certain characters, they don\'t understand why their keyboard isn\'t working. It\'s better to accept all input and provide clear validation messages that explain what format is expected.',
    sourceLinks: [
      { text: 'Form Validation UX', url: 'https://www.nngroup.com/articles/errors-forms-design-guidelines/' }
    ],
    badExampleKey: 'forms-dont-block-typing-bad',
    goodExampleKey: 'forms-dont-block-typing-good'
  },
  {
    id: 'forms-dont-pre-disable-submit',
    category: 'forms',
    source: 'vercel',
    title: 'Don\'t Pre-disable Submit',
    description: 'Allow submitting incomplete forms to surface validation feedback',
    sourceQuote: 'Don\'t pre-disable submit. Allow submitting incomplete forms to surface validation feedback.',
    additionalExplanation: 'When the submit button is disabled before the user has tried to submit, they can\'t discover what\'s wrong with their form. Enable the button, let them click it, then show comprehensive validation feedback that guides them to fix all issues.',
    sourceLinks: [
      { text: 'Form validation UX', url: 'https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/' }
    ],
    badExampleKey: 'forms-dont-pre-disable-submit-bad',
    goodExampleKey: 'forms-dont-pre-disable-submit-good'
  },
  {
    id: 'forms-error-placement',
    category: 'forms',
    source: 'vercel',
    title: 'Error Placement',
    description: 'Show errors next to their fields and focus the first error on submit',
    sourceQuote: 'Error placement. Show errors next to their fields; on submit, focus the first error.',
    additionalExplanation: 'Errors should appear immediately adjacent to the field they relate to. When a form is submitted with errors, automatically focus the first problematic field so users can start fixing issues immediately. This is especially important for long forms.',
    sourceLinks: [
      { text: 'WebAIM: Accessible Form Validation', url: 'https://webaim.org/techniques/formvalidation/' }
    ],
    badExampleKey: 'forms-error-placement-bad',
    goodExampleKey: 'forms-error-placement-good'
  },
  {
    id: 'forms-autocomplete',
    category: 'forms',
    source: 'vercel',
    title: 'Autocomplete & Names',
    description: 'Set autocomplete and meaningful name values to enable browser autofill',
    sourceQuote: 'Autocomplete & names. Set autocomplete & meaningful name values to enable autofill.',
    additionalExplanation: 'Modern browsers can autofill form data, saving users time. Use the autocomplete attribute with standard values like "email", "tel", "street-address", etc. Also use semantic name attributes. This helps password managers and other assistive tools.',
    sourceLinks: [
      { text: 'HTML autocomplete attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete' }
    ],
    badExampleKey: 'forms-autocomplete-bad',
    goodExampleKey: 'forms-autocomplete-good'
  },
  {
    id: 'forms-spellcheck',
    category: 'forms',
    source: 'vercel',
    title: 'Spellcheck Selectively',
    description: 'Disable spellcheck for emails, codes, usernames, etc.',
    sourceQuote: 'Spellcheck selectively. Disable for emails, codes, usernames, etc.',
    additionalExplanation: 'Spellcheck is helpful for prose content but annoying for technical input. Email addresses, usernames, codes, and similar fields should have spellcheck="false" to prevent red squiggly underlines on valid input.',
    sourceLinks: [
      { text: 'HTML spellcheck attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck' }
    ],
    badExampleKey: 'forms-spellcheck-bad',
    goodExampleKey: 'forms-spellcheck-good'
  },
  {
    id: 'forms-correct-types',
    category: 'forms',
    source: 'vercel',
    title: 'Correct Types & Input Modes',
    description: 'Use the right type and inputmode for better keyboards and validation',
    sourceQuote: 'Correct types & input modes. Use the right type & inputmode for better keyboards & validation.',
    additionalExplanation: 'Mobile devices show different keyboards based on the input type and inputmode. Use type="email" for emails, type="tel" for phones, inputmode="numeric" for numbers, etc. This provides users with the most relevant keyboard layout.',
    sourceLinks: [
      { text: 'HTML input types', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input' },
      { text: 'inputmode attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode' }
    ],
    badExampleKey: 'forms-correct-types-bad',
    goodExampleKey: 'forms-correct-types-good'
  },
  {
    id: 'forms-placeholder-value',
    category: 'forms',
    source: 'vercel',
    title: 'Placeholder Value',
    description: 'Set placeholder to an example value or pattern, ending with ellipsis',
    sourceQuote: 'Placeholders signal emptiness. End with an ellipsis. Placeholder value. Set placeholder to an example value or pattern e.g., +1 (123) 456-7890 & sk-012345679…',
    additionalExplanation: 'Placeholders should show example values, not labels (that\'s what <label> is for). The ellipsis signals that the value continues or represents a pattern. For example: "name@example.com" or "sk-proj_abc123…"',
    sourceLinks: [
      { text: 'Placeholder vs Label', url: 'https://www.nngroup.com/articles/form-design-placeholders/' }
    ],
    badExampleKey: 'forms-placeholder-value-bad',
    goodExampleKey: 'forms-placeholder-value-good'
  },
  {
    id: 'forms-unsaved-changes',
    category: 'forms',
    source: 'vercel',
    title: 'Unsaved Changes',
    description: 'Warn before navigation when data could be lost',
    sourceQuote: 'Unsaved changes. Warn before navigation when data could be lost.',
    additionalExplanation: 'Track form modifications and show a confirmation dialog if the user tries to navigate away or close the tab with unsaved changes. Use the beforeunload event for page unload and custom logic for in-app navigation.',
    sourceLinks: [
      { text: 'beforeunload event', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event' }
    ],
    badExampleKey: 'forms-unsaved-changes-bad',
    goodExampleKey: 'forms-unsaved-changes-good'
  },
  {
    id: 'forms-no-dead-zones',
    category: 'forms',
    source: 'vercel',
    title: 'No Dead Zones on Controls',
    description: 'Checkboxes and radios share hit target with labels',
    sourceQuote: 'No dead zones on controls. Checkboxes & radios avoid dead zones; the label & control share a single generous hit target.',
    additionalExplanation: 'Small checkboxes and radio buttons are hard to click. Make the entire label clickable by properly associating it with the input. This creates a much larger, more forgiving hit target and improves usability.',
    sourceLinks: [
      { text: 'Form Labels', url: 'https://www.w3.org/WAI/tutorials/forms/labels/' }
    ],
    badExampleKey: 'forms-no-dead-zones-bad',
    goodExampleKey: 'forms-no-dead-zones-good'
  },
  {
    id: 'forms-password-managers',
    category: 'forms',
    source: 'vercel',
    title: 'Password Managers & 2FA',
    description: 'Ensure compatibility and allow pasting one-time codes',
    sourceQuote: 'Password managers & 2FA. Ensure compatibility & allow pasting one-time codes.',
    additionalExplanation: 'Don\'t block password managers or prevent pasting in password/2FA code fields. Use appropriate autocomplete values (current-password, new-password, one-time-code) to help password managers function correctly.',
    sourceLinks: [
      { text: 'Autocomplete for Credentials', url: 'https://web.dev/sign-in-form-best-practices/' }
    ],
    badExampleKey: 'forms-password-managers-bad',
    goodExampleKey: 'forms-password-managers-good'
  },
  {
    id: 'forms-tailwind-merge',
    category: 'forms',
    source: 'tailwind',
    title: 'Use tailwind-merge',
    description: 'Use tailwind-merge for intelligent class conflict resolution',
    sourceQuote: 'Use tailwind-merge to intelligently merge Tailwind CSS classes, resolving conflicts without style duplication.',
    additionalExplanation: 'When combining base component styles with variant or override classes, tailwind-merge ensures the last conflicting class wins. This is essential for reusable components that accept className props.',
    sourceLinks: [
      { text: 'tailwind-merge', url: 'https://github.com/dcastil/tailwind-merge' },
      { text: 'Why tailwind-merge', url: 'https://github.com/dcastil/tailwind-merge/blob/main/docs/what-is-it-for.md' }
    ],
    badExampleKey: 'forms-tailwind-merge-bad',
    goodExampleKey: 'forms-tailwind-merge-good'
  },
  {
    id: 'forms-cn-utility',
    category: 'forms',
    source: 'tailwind',
    title: 'cn() Utility Pattern',
    description: 'Create a cn() utility combining clsx and tailwind-merge',
    sourceQuote: 'Combine clsx for conditional classes with tailwind-merge for conflict resolution in a single cn() utility function.',
    additionalExplanation: 'The cn() utility is a standard pattern that combines clsx (for conditional class logic) with tailwind-merge (for conflict resolution). This provides the best of both worlds for component styling.',
    sourceLinks: [
      { text: 'shadcn/ui cn()', url: 'https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper' },
      { text: 'clsx', url: 'https://github.com/lukeed/clsx' }
    ],
    badExampleKey: 'forms-cn-utility-bad',
    goodExampleKey: 'forms-cn-utility-good'
  },
  {
    id: 'forms-rams-form-labels',
    category: 'forms',
    source: 'rams',
    title: 'Form Inputs Missing Labels',
    description: 'All form inputs must have associated labels',
    sourceQuote: 'Form inputs without labels are inaccessible. Use the label element with htmlFor, or aria-label for inputs without visible labels.',
    additionalExplanation: 'Labels tell users what to enter. Screen readers announce the label when the input is focused. Placeholder text is not a substitute.',
    sourceLinks: [
      { text: 'WCAG 1.3.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html' }
    ],
    badExampleKey: 'forms-rams-form-labels-bad',
    goodExampleKey: 'forms-rams-form-labels-good'
  },
  {
    id: 'forms-ibelick-cn-utility',
    category: 'forms',
    source: 'ibelick',
    title: 'Use cn() Utility for Class Merging',
    description: 'Always use the cn() utility (clsx + tailwind-merge) for conditional and merged class names',
    sourceQuote: 'MUST use cn utility (clsx + tailwind-merge) for class name merging. It handles conflicts and conditionals correctly.',
    additionalExplanation: 'When merging Tailwind classes, conflicts can occur (e.g., p-4 and p-2 both present). The cn() utility combines clsx for conditional logic with tailwind-merge for intelligent conflict resolution.',
    sourceLinks: [
      { text: 'tailwind-merge', url: 'https://github.com/dcastil/tailwind-merge' }
    ],
    badExampleKey: 'forms-ibelick-cn-utility-bad',
    goodExampleKey: 'forms-ibelick-cn-utility-good'
  },
  {
    id: 'forms-ibelick-error-placement',
    category: 'forms',
    source: 'ibelick',
    title: 'Show Errors Near Actions',
    description: 'Display form errors next to the submit button or action, not just at the field level',
    sourceQuote: 'MUST show form errors next to the submit action. Users focus on the button when submitting - that\'s where they need to see errors.',
    additionalExplanation: 'When users submit a form, their attention is on the submit button. If errors only appear at individual fields (which may be scrolled away), users may not notice them.',
    sourceLinks: [
      { text: 'Form Error Handling', url: 'https://www.nngroup.com/articles/errors-forms-design-guidelines/' }
    ],
    badExampleKey: 'forms-ibelick-error-placement-bad',
    goodExampleKey: 'forms-ibelick-error-placement-good'
  },
  {
    id: 'forms-ibelick-no-paste-blocking',
    category: 'forms',
    source: 'ibelick',
    title: 'Never Block Paste',
    description: 'Never prevent users from pasting into form fields - it breaks password managers and accessibility',
    sourceQuote: 'NEVER block paste in form fields. It breaks password managers, accessibility tools, and frustrates users.',
    additionalExplanation: 'Blocking paste breaks password managers (the #1 security tool), prevents users with motor disabilities from using assistive tools, and forces users to type sensitive data.',
    sourceLinks: [
      { text: 'NCSC: Let Users Paste Passwords', url: 'https://www.ncsc.gov.uk/blog-post/let-them-paste-passwords' }
    ],
    badExampleKey: 'forms-ibelick-no-paste-blocking-bad',
    goodExampleKey: 'forms-ibelick-no-paste-blocking-good'
  },
  {
    id: 'performance-minimize-rerenders',
    category: 'performance',
    source: 'vercel',
    title: 'Minimize Re-renders',
    description: 'Minimize and make re-renders fast',
    sourceQuote: 'Track re-renders. Minimize & make re-renders fast. Use React DevTools or React Scan.',
    additionalExplanation: 'Excessive re-renders slow down the UI, especially in controlled inputs. Use React.memo, useMemo, and useCallback judiciously. Profile with React DevTools to identify components that re-render unnecessarily.',
    sourceLinks: [
      { text: 'React Performance', url: 'https://react.dev/learn/render-and-commit' },
      { text: 'React DevTools', url: 'https://react.dev/learn/react-developer-tools' }
    ],
    badExampleKey: 'performance-minimize-rerenders-bad',
    goodExampleKey: 'performance-minimize-rerenders-good'
  },
  {
    id: 'performance-large-lists',
    category: 'performance',
    source: 'vercel',
    title: 'Large Lists',
    description: 'Virtualize large lists or use content-visibility',
    sourceQuote: 'Large lists. Virtualize large lists e.g., virtua or content-visibility: auto.',
    additionalExplanation: 'Rendering thousands of DOM nodes causes performance issues. Use virtualization libraries that only render visible items, or use CSS content-visibility: auto to let the browser skip rendering off-screen content.',
    sourceLinks: [
      { text: 'content-visibility', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility' },
      { text: 'List Virtualization', url: 'https://web.dev/virtualize-long-lists-react-window/' }
    ],
    badExampleKey: 'performance-large-lists-bad',
    goodExampleKey: 'performance-large-lists-good'
  },
  {
    id: 'performance-no-image-cls',
    category: 'performance',
    source: 'vercel',
    title: 'No Image-caused CLS',
    description: 'Set explicit image dimensions and reserve space',
    sourceQuote: 'No image-caused CLS. Set explicit image dimensions & reserve space.',
    additionalExplanation: 'Images without dimensions cause layout shift when they load. Always set width and height attributes (or use aspect-ratio in CSS) so the browser can reserve the correct space before the image downloads.',
    sourceLinks: [
      { text: 'Image Aspect Ratio', url: 'https://web.dev/optimize-cls/' },
      { text: 'Cumulative Layout Shift', url: 'https://web.dev/cls/' }
    ],
    badExampleKey: 'performance-no-image-cls-bad',
    goodExampleKey: 'performance-no-image-cls-good'
  },
  {
    id: 'performance-preload-fonts',
    category: 'performance',
    source: 'vercel',
    title: 'Preload Fonts',
    description: 'Preload critical fonts to avoid flash and layout shift',
    sourceQuote: 'Preload fonts. For critical text to avoid flash & layout shift.',
    additionalExplanation: 'Font files take time to download, causing FOUT (flash of unstyled text) or FOIT (flash of invisible text). Preload critical fonts used for above-the-fold content using <link rel="preload"> to load them as early as possible.',
    sourceLinks: [
      { text: 'Preloading Fonts', url: 'https://web.dev/optimize-webfont-loading/' }
    ],
    badExampleKey: 'performance-preload-fonts-bad',
    goodExampleKey: 'performance-preload-fonts-good'
  },
  {
    id: 'performance-device-matrix',
    category: 'performance',
    source: 'vercel',
    title: 'Device/Browser Matrix',
    description: 'Test iOS Low Power Mode and macOS Safari',
    sourceQuote: 'Device/browser matrix. Test iOS Low Power Mode & macOS Safari.',
    additionalExplanation: 'Performance varies dramatically across devices and browsers. iOS Low Power Mode throttles animations and JavaScript. Safari has different behavior than Chrome. Test on real devices, not just desktop browsers.',
    sourceLinks: [
      { text: 'Cross Browser Testing', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Introduction' }
    ],
    badExampleKey: 'performance-device-matrix-bad',
    goodExampleKey: 'performance-device-matrix-good'
  },
  {
    id: 'performance-throttle-profiling',
    category: 'performance',
    source: 'vercel',
    title: 'Throttle When Profiling',
    description: 'Test with CPU and network throttling',
    sourceQuote: 'Throttle when profiling. Test with CPU & network throttling.',
    additionalExplanation: 'Developer machines are faster than average user devices. Use browser DevTools to throttle CPU (4x slowdown) and network (Fast 3G) to test how your app performs for users on slower devices and connections.',
    sourceLinks: [
      { text: 'Chrome DevTools Throttling', url: 'https://developer.chrome.com/docs/devtools/device-mode/' }
    ],
    badExampleKey: 'performance-throttle-profiling-bad',
    goodExampleKey: 'performance-throttle-profiling-good'
  },
  {
    id: 'performance-latency-budgets',
    category: 'performance',
    source: 'vercel',
    title: 'Network Latency Budgets',
    description: 'POST/PATCH/DELETE operations complete in under 500ms',
    sourceQuote: 'Network latency budgets. POST/PATCH/DELETE complete in <500ms.',
    additionalExplanation: 'Users expect mutations (create, update, delete) to feel instant. Target 500ms or less for these operations. Use optimistic updates, show loading states immediately, and optimize backend performance to meet this budget.',
    sourceLinks: [
      { text: 'Response Time Guidelines', url: 'https://www.nngroup.com/articles/response-times-3-important-limits/' }
    ],
    badExampleKey: 'performance-latency-budgets-bad',
    goodExampleKey: 'performance-latency-budgets-good'
  },
  {
    id: 'performance-content-paths',
    category: 'performance',
    source: 'tailwind',
    title: 'Configure Content Paths',
    description: 'Specify all files using Tailwind classes in the content config',
    sourceQuote: 'Always configure content paths to include all files that use Tailwind classes. Missing paths mean unused CSS in production or missing styles.',
    additionalExplanation: 'Tailwind CSS v4 uses @source directive (or v3\'s content config) to scan files for class names. If a file isn\'t included in these paths, its classes won\'t be included in the production build. Conversely, overly broad globs can slow down builds.',
    sourceLinks: [
      { text: 'Tailwind Content Configuration', url: 'https://tailwindcss.com/docs/content-configuration' }
    ],
    badExampleKey: 'performance-content-paths-bad',
    goodExampleKey: 'performance-content-paths-good'
  },
  {
    id: 'performance-gpu-animations',
    category: 'performance',
    source: 'tailwind',
    title: 'GPU-Accelerated Animations',
    description: 'Use transform and opacity for smooth 60fps animations',
    sourceQuote: 'Animate only transform and opacity properties. These run on the GPU compositor thread and won\'t cause layout recalculations.',
    additionalExplanation: 'Animating properties like width, height, top, left, or margin triggers expensive layout recalculations on every frame. GPU-accelerated properties (transform, opacity) run on a separate compositor thread, achieving smooth 60fps animations.',
    sourceLinks: [
      { text: 'CSS GPU Animation', url: 'https://web.dev/animations-guide/' },
      { text: 'Compositor-only Properties', url: 'https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/' }
    ],
    badExampleKey: 'performance-gpu-animations-bad',
    goodExampleKey: 'performance-gpu-animations-good'
  },
  {
    id: 'performance-no-transition-all',
    category: 'performance',
    source: 'tailwind',
    title: 'Never transition-all',
    description: 'Explicitly transition only needed properties',
    sourceQuote: 'Never use transition-all. Explicitly specify which properties to transition for better performance and predictable behavior.',
    additionalExplanation: 'transition-all animates every CSS property that changes, including layout-triggering properties you didn\'t intend to animate. This causes unexpected animations, performance issues, and harder debugging.',
    sourceLinks: [
      { text: 'CSS Transition Property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property' }
    ],
    badExampleKey: 'performance-no-transition-all-bad',
    goodExampleKey: 'performance-no-transition-all-good'
  },
  {
    id: 'performance-avoid-arbitrary',
    category: 'performance',
    source: 'tailwind',
    title: 'Avoid Arbitrary Values',
    description: 'Prefer theme tokens over arbitrary bracket values',
    sourceQuote: 'Avoid arbitrary values like p-[17px] or text-[#1a1a1a]. Use theme tokens for consistency and smaller CSS output.',
    additionalExplanation: 'Arbitrary values create one-off utility classes that bypass your design system\'s spacing/color scale, create inconsistencies, generate additional CSS, and make maintenance harder with magic numbers scattered throughout.',
    sourceLinks: [
      { text: 'Tailwind Customization', url: 'https://tailwindcss.com/docs/customizing-spacing' },
      { text: 'Tailwind Theme Configuration', url: 'https://tailwindcss.com/docs/theme' }
    ],
    badExampleKey: 'performance-avoid-arbitrary-bad',
    goodExampleKey: 'performance-avoid-arbitrary-good'
  },
  {
    id: 'performance-dynamic-classes',
    category: 'performance',
    source: 'tailwind',
    title: 'No Dynamic Class Construction',
    description: 'Write complete class names for Tailwind to detect them',
    sourceQuote: 'Never dynamically construct class names. Tailwind scans source files as strings and cannot detect computed class names.',
    additionalExplanation: 'Tailwind\'s build process scans your source files for complete class name strings. It cannot execute JavaScript or interpolate template literals. Dynamically constructed classes like bg-${color}-500 will be purged from production builds.',
    sourceLinks: [
      { text: 'Dynamic Class Names', url: 'https://tailwindcss.com/docs/content-configuration#dynamic-class-names' },
      { text: 'Safelist Configuration', url: 'https://tailwindcss.com/docs/content-configuration#safelisting-classes' }
    ],
    badExampleKey: 'performance-dynamic-classes-bad',
    goodExampleKey: 'performance-dynamic-classes-good'
  },
  {
    id: 'performance-purge-optimization',
    category: 'performance',
    source: 'tailwind',
    title: 'Optimize Purge Configuration',
    description: 'Use specific globs and safelist only when necessary',
    sourceQuote: 'Keep content paths specific and safelist minimal. Overly broad configurations slow builds and bloat CSS output.',
    additionalExplanation: 'Tailwind\'s purge/content scanning determines what CSS ships to production. Overly broad globs scan unnecessary files (like node_modules), slowing builds. Overused safelists defeat tree-shaking and bloat CSS output.',
    sourceLinks: [
      { text: 'Optimizing for Production', url: 'https://tailwindcss.com/docs/optimizing-for-production' },
      { text: 'Content Configuration', url: 'https://tailwindcss.com/docs/content-configuration' }
    ],
    badExampleKey: 'performance-purge-optimization-bad',
    goodExampleKey: 'performance-purge-optimization-good'
  },
  {
    id: 'performance-ibelick-tailwind-defaults',
    category: 'performance',
    source: 'ibelick',
    title: 'Tailwind Defaults First',
    description: 'Use Tailwind CSS default spacing, colors, and sizing scales unless a custom design token exists',
    sourceQuote: 'MUST use Tailwind CSS defaults (spacing, colors, sizing) unless a custom design token exists in the config.',
    additionalExplanation: 'Tailwind\'s default scale is carefully designed for consistency. Using arbitrary values like p-[13px] creates visual inconsistency and makes CSS harder to maintain.',
    sourceLinks: [
      { text: 'Tailwind Spacing Scale', url: 'https://tailwindcss.com/docs/customizing-spacing' }
    ],
    badExampleKey: 'performance-ibelick-tailwind-defaults-bad',
    goodExampleKey: 'performance-ibelick-tailwind-defaults-good'
  },
  {
    id: 'performance-ibelick-no-blur-animation',
    category: 'performance',
    source: 'ibelick',
    title: 'Never Animate Blur Effects',
    description: 'Never animate blur or backdrop-filter - they\'re extremely expensive and cause frame drops',
    sourceQuote: 'NEVER animate large blur or backdrop-filter. These operations are extremely expensive and cause significant frame drops.',
    additionalExplanation: 'Blur operations require sampling many pixels for every pixel rendered. Animating blur means recalculating this on every frame. Instead, use a static blur and animate opacity.',
    sourceLinks: [
      { text: 'CSS Filter Performance', url: 'https://web.dev/articles/simplify-paint-complexity-and-reduce-paint-areas' }
    ],
    badExampleKey: 'performance-ibelick-no-blur-animation-bad',
    goodExampleKey: 'performance-ibelick-no-blur-animation-good'
  },
  {
    id: 'performance-ibelick-will-change',
    category: 'performance',
    source: 'ibelick',
    title: 'Use will-change Sparingly',
    description: 'Only apply will-change during active animations, never as a permanent style',
    sourceQuote: 'Only apply will-change during active animations. Permanent will-change wastes GPU memory and can hurt performance.',
    additionalExplanation: 'will-change tells the browser to create a GPU layer. Using it permanently on many elements wastes memory and can hurt performance through layer explosion.',
    sourceLinks: [
      { text: 'will-change MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/will-change' }
    ],
    badExampleKey: 'performance-ibelick-will-change-bad',
    goodExampleKey: 'performance-ibelick-will-change-good'
  },
  {
    id: 'performance-ibelick-no-effect-render',
    category: 'performance',
    source: 'ibelick',
    title: 'Don\'t Use useEffect for Render Logic',
    description: 'Never use useEffect to compute values that should be derived during render',
    sourceQuote: 'NEVER use useEffect for render logic. If a value can be computed from props or state, compute it during render instead.',
    additionalExplanation: 'Using useEffect to set state based on other state causes extra re-renders and potential infinite loops. Compute derived values directly or use useMemo.',
    sourceLinks: [
      { text: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect' }
    ],
    badExampleKey: 'performance-ibelick-no-effect-render-bad',
    goodExampleKey: 'performance-ibelick-no-effect-render-good'
  },
  {
    id: 'performance-css-containment',
    category: 'performance',
    source: 'claude-code',
    title: 'CSS Containment for Performance',
    description: 'Use CSS contain and content-visibility to isolate layout/paint scope',
    sourceQuote: 'Use CSS `contain: layout paint` on reusable cards/list items to isolate layout/paint scope. Use `content-visibility: auto` with `contain-intrinsic-size` for offscreen content (up to 7x render improvement).',
    additionalExplanation: 'CSS containment tells the browser that an element\'s layout/paint is independent from the rest of the page. content-visibility: auto skips rendering offscreen content entirely, dramatically improving initial render for long lists.',
    sourceLinks: [
      { text: 'MDN CSS contain', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/contain' },
      { text: 'web.dev content-visibility', url: 'https://web.dev/articles/content-visibility' }
    ],
    badExampleKey: 'performance-css-containment-bad',
    goodExampleKey: 'performance-css-containment-good'
  },
  {
    id: 'performance-lcp-hero-optimization',
    category: 'performance',
    source: 'claude-code',
    title: 'LCP Hero Optimization',
    description: 'Preload above-the-fold images and prioritize LCP elements for fast perceived loading',
    sourceQuote: 'LCP images (hero, banner): Use `loading="eager"` + `fetchpriority="high"` + `decoding="async"`. Add `<link rel="preload" as="image">` in head. NEVER lazy-load above-the-fold content.',
    additionalExplanation: 'Largest Contentful Paint (LCP) is a Core Web Vital measuring when the largest content becomes visible. Hero images are often the LCP element. Preloading and eager loading ensures they render as fast as possible.',
    sourceLinks: [
      { text: 'Optimize LCP', url: 'https://web.dev/articles/optimize-lcp' },
      { text: 'Preload critical assets', url: 'https://web.dev/articles/preload-critical-assets' }
    ],
    badExampleKey: 'performance-lcp-hero-optimization-bad',
    goodExampleKey: 'performance-lcp-hero-optimization-good'
  },
  {
    id: 'performance-font-display-strategy',
    category: 'performance',
    source: 'claude-code',
    title: 'Font Display Strategy',
    description: 'Prevent invisible text (FOIT) and layout shift from web fonts with proper loading strategies',
    sourceQuote: 'Use `font-display: swap` to prevent FOIT (invisible text). Preconnect to font CDNs. Preload critical fonts. Match fallback font metrics with `size-adjust` to minimize CLS during font swap.',
    additionalExplanation: 'Web fonts can cause Flash of Invisible Text (FOIT) affecting LCP, and layout shift when fonts swap. font-display: swap shows fallback text immediately. Metric matching with size-adjust minimizes CLS.',
    sourceLinks: [
      { text: 'Optimize web fonts', url: 'https://web.dev/articles/optimize-webfont-loading' },
      { text: 'font-display MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display' }
    ],
    badExampleKey: 'performance-font-display-strategy-bad',
    goodExampleKey: 'performance-font-display-strategy-good'
  },
  {
    id: 'performance-responsive-images',
    category: 'performance',
    source: 'claude-code',
    title: 'Responsive Images',
    description: 'Serve optimally-sized images for each device with srcset, sizes, and modern formats',
    sourceQuote: 'Use `srcset` + `sizes` for responsive images. Serve WebP/AVIF with `<picture>` fallback. Always set explicit `width`/`height` attributes or CSS `aspect-ratio` to prevent CLS.',
    additionalExplanation: 'Without responsive images, mobile users download desktop-sized images, wasting bandwidth and slowing LCP. srcset lets browsers choose optimal sizes. Modern formats (WebP, AVIF) reduce file size 25-50%.',
    sourceLinks: [
      { text: 'Serve responsive images', url: 'https://web.dev/articles/serve-responsive-images' },
      { text: 'Use WebP images', url: 'https://web.dev/articles/serve-images-webp' }
    ],
    badExampleKey: 'performance-responsive-images-bad',
    goodExampleKey: 'performance-responsive-images-good'
  },
  {
    id: 'performance-skeleton-dimensions',
    category: 'performance',
    source: 'claude-code',
    title: 'Skeleton Placeholders with Matching Dimensions',
    description: 'Loading skeletons must match final content dimensions to prevent CLS',
    sourceQuote: 'Skeleton placeholders MUST match final content dimensions exactly. Include image placeholders with correct aspect ratios. Text skeleton heights should match typography line heights. Poor skeletons cause CLS.',
    additionalExplanation: 'Skeleton screens show page structure before content loads. If skeleton dimensions don\'t match final content, users experience jarring shifts (CLS). Match image aspect ratios, text line heights, and overall container sizes.',
    sourceLinks: [
      { text: 'Cumulative Layout Shift', url: 'https://web.dev/articles/cls' },
      { text: 'Optimize CLS', url: 'https://web.dev/articles/optimize-cls' }
    ],
    badExampleKey: 'performance-skeleton-dimensions-bad',
    goodExampleKey: 'performance-skeleton-dimensions-good'
  },
  {
    id: 'design-layered-shadows',
    category: 'design',
    source: 'vercel',
    title: 'Layered Shadows',
    description: 'Mimic ambient and direct light with at least two layers',
    sourceQuote: 'Layered shadows. Mimic ambient + direct light with at least two layers.',
    additionalExplanation: 'Natural shadows have both ambient (soft, diffuse) and direct (sharper, darker) components. Use two box-shadow declarations: one large and subtle for ambient light, one smaller and darker for direct light. This creates depth and realism.',
    sourceLinks: [
      { text: 'Material Design Shadows', url: 'https://m2.material.io/design/environment/light-shadows.html' }
    ],
    badExampleKey: 'design-layered-shadows-bad',
    goodExampleKey: 'design-layered-shadows-good'
  },
  {
    id: 'design-crisp-borders',
    category: 'design',
    source: 'vercel',
    title: 'Crisp Borders',
    description: 'Combine borders and shadows for clear edges',
    sourceQuote: 'Crisp borders. Combine borders & shadows; semi-transparent borders improve edge clarity.',
    additionalExplanation: 'Shadows alone can look muddy. A subtle border (often semi-transparent) makes edges crisp and clear. Use rgba() with low opacity for borders so they adapt to different backgrounds.',
    sourceLinks: [
      { text: 'CSS Borders', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border' }
    ],
    badExampleKey: 'design-crisp-borders-bad',
    goodExampleKey: 'design-crisp-borders-good'
  },
  {
    id: 'design-nested-radii',
    category: 'design',
    source: 'vercel',
    title: 'Nested Radii',
    description: 'Child radius ≤ parent radius and concentric',
    sourceQuote: 'Nested radii. Child radius ≤ parent radius & concentric so curves align.',
    additionalExplanation: 'When a rounded element contains another rounded element, the inner radius should be the outer radius minus the padding. This keeps the curves concentric and visually aligned. Formula: innerRadius = outerRadius - padding.',
    sourceLinks: [
      { text: 'Nested Border Radius', url: 'https://cloudfour.com/thinks/the-math-behind-nesting-rounded-corners/' }
    ],
    badExampleKey: 'design-nested-radii-bad',
    goodExampleKey: 'design-nested-radii-good'
  },
  {
    id: 'design-minimum-contrast',
    category: 'design',
    source: 'vercel',
    title: 'Minimum Contrast',
    description: 'Prefer APCA over WCAG 2 for accurate perceptual contrast',
    sourceQuote: 'Minimum contrast. Prefer APCA over WCAG 2 for more accurate perceptual contrast.',
    additionalExplanation: 'WCAG 2.x contrast ratios have known issues. APCA (Accessible Perceptual Contrast Algorithm) provides more accurate measurements of readability. Aim for APCA values appropriate to text size and weight. Generally, body text should have Lc 60+ and headings Lc 45+.',
    sourceLinks: [
      { text: 'APCA Introduction', url: 'https://git.apcacontrast.com/documentation/APCAeasyIntro.html' },
      { text: 'APCA on GitHub', url: 'https://github.com/Myndex/SAPC-APCA' }
    ],
    badExampleKey: 'design-minimum-contrast-bad',
    goodExampleKey: 'design-minimum-contrast-good'
  },
  {
    id: 'design-interactions-increase-contrast',
    category: 'design',
    source: 'vercel',
    title: 'Interactions Increase Contrast',
    description: 'Hover, active, focus states have more contrast than rest state',
    sourceQuote: 'Interactions increase contrast. :hover, :active, :focus have more contrast than rest state.',
    additionalExplanation: 'Interactive states should draw attention. Increase contrast on hover, active, and focus states by darkening text, strengthening backgrounds, or adding shadows. This provides clear feedback that the element is interactive.',
    sourceLinks: [
      { text: 'Interactive States', url: 'https://www.nngroup.com/articles/clickable-elements/' }
    ],
    badExampleKey: 'design-interactions-increase-contrast-bad',
    goodExampleKey: 'design-interactions-increase-contrast-good'
  },
  {
    id: 'design-hue-consistency',
    category: 'design',
    source: 'vercel',
    title: 'Hue Consistency',
    description: 'Tint borders, shadows, and text toward background hue',
    sourceQuote: 'Hue consistency. On non-neutral backgrounds, tint borders/shadows/text toward the same hue.',
    additionalExplanation: 'Pure black borders and shadows look harsh on colored backgrounds. Slightly tint them toward the background color for a more cohesive, refined appearance. For example, on a blue background, use slightly blue-tinted shadows instead of pure gray.',
    sourceLinks: [
      { text: 'Color Theory', url: 'https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/' }
    ],
    badExampleKey: 'design-hue-consistency-bad',
    goodExampleKey: 'design-hue-consistency-good'
  },
  {
    id: 'design-accessible-charts',
    category: 'design',
    source: 'vercel',
    title: 'Accessible Charts',
    description: 'Use color-blind-friendly palettes',
    sourceQuote: 'Accessible charts. Use color-blind-friendly palettes.',
    additionalExplanation: 'About 8% of men and 0.5% of women have color vision deficiencies. Use color palettes designed for color blindness (avoid red-green combinations), and supplement color with patterns, labels, or textures in data visualizations.',
    sourceLinks: [
      { text: 'Designing for Color Blindness', url: 'https://www.smashingmagazine.com/2024/02/designing-for-colorblindness/' },
      { text: 'Data Visualization Accessibility', url: 'https://www.w3.org/WAI/tutorials/images/complex/' }
    ],
    badExampleKey: 'design-accessible-charts-bad',
    goodExampleKey: 'design-accessible-charts-good'
  },
  {
    id: 'design-theme-config',
    category: 'design',
    source: 'tailwind',
    title: 'Extend Theme Properly',
    description: 'Use theme.extend to add values without losing defaults',
    sourceQuote: 'Always use theme.extend to add custom values. Overwriting top-level theme keys removes all default values.',
    additionalExplanation: 'When you define theme.colors directly, you replace all of Tailwind\'s default colors. Using theme.extend.colors adds your custom colors while keeping the defaults like slate, gray, red, etc.',
    sourceLinks: [
      { text: 'Theme Configuration', url: 'https://tailwindcss.com/docs/theme' },
      { text: 'Customizing Colors', url: 'https://tailwindcss.com/docs/customizing-colors' }
    ],
    badExampleKey: 'design-theme-config-bad',
    goodExampleKey: 'design-theme-config-good'
  },
  {
    id: 'design-semantic-colors',
    category: 'design',
    source: 'tailwind',
    title: 'Use Semantic Color Tokens',
    description: 'Define colors by purpose, not appearance',
    sourceQuote: 'Use semantic color names (primary, destructive, muted) instead of raw colors (blue-500, red-600). This enables theming and dark mode.',
    additionalExplanation: 'Semantic tokens describe purpose, not appearance. bg-destructive means "danger/error background" regardless of the actual color. This separation allows themes to change without touching component code.',
    sourceLinks: [
      { text: 'Using CSS Variables', url: 'https://tailwindcss.com/docs/customizing-colors#using-css-variables' }
    ],
    badExampleKey: 'design-semantic-colors-bad',
    goodExampleKey: 'design-semantic-colors-good'
  },
  {
    id: 'design-complete-theme',
    category: 'design',
    source: 'tailwind',
    title: 'Build Complete Theme',
    description: 'Define all interactive states and component variants',
    sourceQuote: 'Build a complete design token system with foreground colors for every background, ring colors, and all interactive states.',
    additionalExplanation: 'A partial theme leads to inconsistency. Complete themes include: background/foreground pairs, border variants, ring/focus colors, and state variants (hover, active, disabled).',
    sourceLinks: [
      { text: 'shadcn/ui Theming', url: 'https://ui.shadcn.com/docs/theming' }
    ],
    badExampleKey: 'design-complete-theme-bad',
    goodExampleKey: 'design-complete-theme-good'
  },
  {
    id: 'design-mobile-first',
    category: 'design',
    source: 'tailwind',
    title: 'Mobile-First Responsive',
    description: 'Start with mobile styles, add breakpoints for larger screens',
    sourceQuote: 'Write mobile styles first, then use sm:, md:, lg: breakpoints to enhance for larger screens. Tailwind\'s breakpoints are min-width based.',
    additionalExplanation: 'Tailwind breakpoints are mobile-first (min-width). md:flex means "flex at medium screens AND UP." Starting desktop-first leads to verbose code with unnecessary overrides.',
    sourceLinks: [
      { text: 'Responsive Design', url: 'https://tailwindcss.com/docs/responsive-design' },
      { text: 'Mobile First', url: 'https://tailwindcss.com/docs/responsive-design#mobile-first' }
    ],
    badExampleKey: 'design-mobile-first-bad',
    goodExampleKey: 'design-mobile-first-good'
  },
  {
    id: 'design-custom-breakpoints',
    category: 'design',
    source: 'tailwind',
    title: 'Custom Breakpoints When Needed',
    description: 'Add project-specific breakpoints for unique layout requirements',
    sourceQuote: 'Use Tailwind\'s default breakpoints unless your design requires specific values. Add custom breakpoints in theme.extend when needed.',
    additionalExplanation: 'Default breakpoints work for most projects, but some designs need specific widths. Custom breakpoints should be added via theme.extend.screens, not arbitrary values like min-[960px]:.',
    sourceLinks: [
      { text: 'Customizing Screens', url: 'https://tailwindcss.com/docs/screens' }
    ],
    badExampleKey: 'design-custom-breakpoints-bad',
    goodExampleKey: 'design-custom-breakpoints-good'
  },
  {
    id: 'design-dark-mode-class',
    category: 'design',
    source: 'tailwind',
    title: 'Dark Mode Class Strategy',
    description: 'Use class-based dark mode for user preference control',
    sourceQuote: 'Use class-based dark mode (darkMode: \'class\') for user-controllable themes. This allows toggling between light/dark/system preferences.',
    additionalExplanation: 'The media strategy only responds to OS settings. The class strategy lets you add/remove the dark class on <html>, enabling theme toggles and respecting user choice over system preference.',
    sourceLinks: [
      { text: 'Dark Mode', url: 'https://tailwindcss.com/docs/dark-mode' },
      { text: 'Class Strategy', url: 'https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually' }
    ],
    badExampleKey: 'design-dark-mode-class-bad',
    goodExampleKey: 'design-dark-mode-class-good'
  },
  {
    id: 'design-dark-preferences',
    category: 'design',
    source: 'tailwind',
    title: 'Respect Color Scheme Preference',
    description: 'Initialize theme from prefers-color-scheme before page renders',
    sourceQuote: 'Read prefers-color-scheme on initial load and apply the dark class before first paint to prevent flash of wrong theme.',
    additionalExplanation: 'If you wait for JavaScript to run before checking the color scheme, users see a flash of the wrong theme (FART). Inline a script in <head> that runs synchronously before render.',
    sourceLinks: [
      { text: 'Avoiding FART', url: 'https://css-tricks.com/flash-of-inaccurate-color-theme-fart/' },
      { text: 'prefers-color-scheme', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme' }
    ],
    badExampleKey: 'design-dark-preferences-bad',
    goodExampleKey: 'design-dark-preferences-good'
  },
  {
    id: 'design-rams-color-only',
    category: 'design',
    source: 'rams',
    title: 'Color-Only Information',
    description: 'Don\'t rely on color alone to convey information',
    sourceQuote: 'Information conveyed only through color is inaccessible to colorblind users. Add icons, patterns, or text labels.',
    additionalExplanation: 'About 8% of men have color vision deficiency. Use multiple visual cues: icons with status colors, underlines with links, patterns in charts.',
    sourceLinks: [
      { text: 'WCAG 1.4.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html' }
    ],
    badExampleKey: 'design-rams-color-only-bad',
    goodExampleKey: 'design-rams-color-only-good'
  },
  {
    id: 'design-rams-color-contrast',
    category: 'design',
    source: 'rams',
    title: 'Insufficient Color Contrast',
    description: 'Text must have sufficient contrast with its background',
    sourceQuote: 'Low contrast text is hard to read, especially for users with low vision. WCAG requires 4.5:1 for normal text, 3:1 for large text.',
    additionalExplanation: 'Use tools like the WebAIM contrast checker. Gray text on white backgrounds is a common violation. Large text (18pt+) has lower requirements.',
    sourceLinks: [
      { text: 'WCAG 1.4.3', url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html' }
    ],
    badExampleKey: 'design-rams-color-contrast-bad',
    goodExampleKey: 'design-rams-color-contrast-good'
  },
  {
    id: 'design-rams-text-contrast',
    category: 'design',
    source: 'rams',
    title: 'Poor Text-Background Contrast',
    description: 'Ensure readable text contrast, especially for secondary text',
    sourceQuote: 'Secondary text, captions, and disabled states often have insufficient contrast. All readable text should meet contrast requirements.',
    additionalExplanation: 'Don\'t sacrifice readability for aesthetics. Light gray on white is a common problem. Test with contrast checkers and in different lighting.',
    sourceLinks: [
      { text: 'WCAG 1.4.3', url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html' }
    ],
    badExampleKey: 'design-rams-text-contrast-bad',
    goodExampleKey: 'design-rams-text-contrast-good'
  },
  {
    id: 'design-rams-inconsistent-spacing',
    category: 'design',
    source: 'rams',
    title: 'Inconsistent Spacing',
    description: 'Use consistent spacing between similar elements',
    sourceQuote: 'Inconsistent spacing creates visual noise and makes relationships between elements unclear. Use a spacing scale consistently.',
    additionalExplanation: 'Tailwind\'s spacing scale (4, 8, 12, 16, 24, 32...) provides consistent increments. Related elements should have consistent gaps.',
    sourceLinks: [
      { text: 'Design System Spacing', url: 'https://tailwindcss.com/docs/customizing-spacing' }
    ],
    badExampleKey: 'design-rams-inconsistent-spacing-bad',
    goodExampleKey: 'design-rams-inconsistent-spacing-good'
  },
  {
    id: 'design-rams-crowded-elements',
    category: 'design',
    source: 'rams',
    title: 'Crowded Elements',
    description: 'Elements too close together reduce readability and usability',
    sourceQuote: 'Cramped layouts make content hard to scan and interactive elements hard to tap. Give elements room to breathe.',
    additionalExplanation: 'Whitespace is not wasted space. Adequate padding and margins improve scanability and make touch targets easier to hit.',
    sourceLinks: [
      { text: 'Visual Design Principles', url: 'https://www.nngroup.com/articles/form-design-white-space/' }
    ],
    badExampleKey: 'design-rams-crowded-elements-bad',
    goodExampleKey: 'design-rams-crowded-elements-good'
  },
  {
    id: 'design-rams-excessive-whitespace',
    category: 'design',
    source: 'rams',
    title: 'Excessive Whitespace',
    description: 'Too much whitespace can fragment related content',
    sourceQuote: 'While whitespace is important, excessive gaps between related elements break visual relationships and make scanning difficult.',
    additionalExplanation: 'Balance is key. Related content should be grouped with proximity. Use Gestalt principles to create clear visual hierarchies.',
    sourceLinks: [
      { text: 'Gestalt Principles', url: 'https://www.nngroup.com/articles/gestalt-proximity/' }
    ],
    badExampleKey: 'design-rams-excessive-whitespace-bad',
    goodExampleKey: 'design-rams-excessive-whitespace-good'
  },
  {
    id: 'design-rams-font-consistency',
    category: 'design',
    source: 'rams',
    title: 'Inconsistent Font Usage',
    description: 'Limit font families and use them consistently',
    sourceQuote: 'Too many font families create visual chaos. Stick to 2-3 fonts maximum with clear roles for each.',
    additionalExplanation: 'Use one font for headings, one for body text. Font variations (weight, size) should follow a consistent type scale.',
    sourceLinks: [
      { text: 'Typography Guidelines', url: 'https://tailwindcss.com/docs/font-family' }
    ],
    badExampleKey: 'design-rams-font-consistency-bad',
    goodExampleKey: 'design-rams-font-consistency-good'
  },
  {
    id: 'design-rams-text-sizing',
    category: 'design',
    source: 'rams',
    title: 'Inconsistent Text Sizing',
    description: 'Use a consistent type scale for text sizes',
    sourceQuote: 'Random text sizes create visual noise. Follow a type scale where each size has a clear purpose in the hierarchy.',
    additionalExplanation: 'Tailwind\'s type scale (xs, sm, base, lg, xl, 2xl...) provides harmonious ratios. Each size should have a specific role.',
    sourceLinks: [
      { text: 'Type Scale', url: 'https://tailwindcss.com/docs/font-size' }
    ],
    badExampleKey: 'design-rams-text-sizing-bad',
    goodExampleKey: 'design-rams-text-sizing-good'
  },
  {
    id: 'design-rams-color-harmony',
    category: 'design',
    source: 'rams',
    title: 'Colors That Clash',
    description: 'Use harmonious color combinations from a defined palette',
    sourceQuote: 'Colors that clash create visual discomfort. Use complementary, analogous, or triadic color schemes from a defined palette.',
    additionalExplanation: 'Design systems provide color palettes for consistency. Don\'t pick arbitrary colors; use the palette\'s semantic colors.',
    sourceLinks: [
      { text: 'Color Mechanics in UI', url: 'https://www.smashingmagazine.com/2023/04/color-mechanics-ui-kits/' }
    ],
    badExampleKey: 'design-rams-color-harmony-bad',
    goodExampleKey: 'design-rams-color-harmony-good'
  },
  {
    id: 'design-rams-semantic-colors',
    category: 'design',
    source: 'rams',
    title: 'Inconsistent Semantic Colors',
    description: 'Use semantic colors consistently (error=red, success=green)',
    sourceQuote: 'Semantic colors convey meaning. Using red for success or green for errors violates user expectations and causes confusion.',
    additionalExplanation: 'Establish and follow semantic color conventions: red/destructive for errors, green/success for positive, yellow/warning for caution.',
    sourceLinks: [
      { text: 'Psychology of Color in UX', url: 'https://www.smashingmagazine.com/2025/08/psychology-color-ux-design-digital-products/' }
    ],
    badExampleKey: 'design-rams-semantic-colors-bad',
    goodExampleKey: 'design-rams-semantic-colors-good'
  },
  {
    id: 'design-rams-border-radius',
    category: 'design',
    source: 'rams',
    title: 'Inconsistent Border Radius',
    description: 'Use consistent border radius values across components',
    sourceQuote: 'Mixing sharp corners with rounded ones creates visual inconsistency. Pick a radius style and apply it systematically.',
    additionalExplanation: 'Tailwind provides radius tokens (sm, md, lg). Use them consistently: all buttons same radius, all cards same radius.',
    sourceLinks: [
      { text: 'Border Radius', url: 'https://tailwindcss.com/docs/border-radius' }
    ],
    badExampleKey: 'design-rams-border-radius-bad',
    goodExampleKey: 'design-rams-border-radius-good'
  },
  {
    id: 'design-rams-shadow-consistency',
    category: 'design',
    source: 'rams',
    title: 'Inconsistent Shadow Usage',
    description: 'Apply shadows consistently to establish visual hierarchy',
    sourceQuote: 'Shadows indicate elevation. Inconsistent shadow usage confuses the visual hierarchy and makes the UI feel disjointed.',
    additionalExplanation: 'Define shadow levels for different component types: cards get one shadow, modals get deeper shadow, buttons may have subtle hover shadow.',
    sourceLinks: [
      { text: 'Box Shadow', url: 'https://tailwindcss.com/docs/box-shadow' }
    ],
    badExampleKey: 'design-rams-shadow-consistency-bad',
    goodExampleKey: 'design-rams-shadow-consistency-good'
  },
  {
    id: 'design-rams-alignment',
    category: 'design',
    source: 'rams',
    title: 'Misaligned Elements',
    description: 'Elements should align to a consistent grid or baseline',
    sourceQuote: 'Misaligned elements make the UI look unprofessional. Use grid systems and alignment utilities to maintain visual order.',
    additionalExplanation: 'Tailwind\'s flex and grid utilities make alignment straightforward. Left-align text blocks, center icons within buttons, maintain baseline alignment.',
    sourceLinks: [
      { text: 'Flexbox', url: 'https://tailwindcss.com/docs/flex' },
      { text: 'Grid', url: 'https://tailwindcss.com/docs/grid-template-columns' }
    ],
    badExampleKey: 'design-rams-alignment-bad',
    goodExampleKey: 'design-rams-alignment-good'
  },
  {
    id: 'design-ibelick-no-gradients',
    category: 'design',
    source: 'ibelick',
    title: 'Avoid Gradients Unless Requested',
    description: 'Solid colors are cleaner and more maintainable - only use gradients when explicitly asked',
    sourceQuote: 'Avoid gradients unless explicitly requested. Solid colors are cleaner, more accessible, and easier to maintain.',
    additionalExplanation: 'Gradients often signal "AI-generated design" and can reduce contrast, create visual noise, be harder to maintain across themes, and look dated quickly.',
    sourceLinks: [
      { text: 'Flat Design Guidelines', url: 'https://www.nngroup.com/articles/flat-design/' }
    ],
    badExampleKey: 'design-ibelick-no-gradients-bad',
    goodExampleKey: 'design-ibelick-no-gradients-good'
  },
  {
    id: 'design-ibelick-no-purple',
    category: 'design',
    source: 'ibelick',
    title: 'Avoid Purple and Multicolor Gradients',
    description: 'Purple and rainbow gradients are overused in AI-generated designs - avoid them',
    sourceQuote: 'No purple or multicolor gradients. These are telltale signs of AI-generated or generic SaaS design.',
    additionalExplanation: 'Purple-to-pink and rainbow gradients have become the default output of AI design tools. They signal "generic" rather than "thoughtful design."',
    sourceLinks: [
      { text: 'Design System Colors', url: 'https://www.smashingmagazine.com/2023/04/color-mechanics-ui-kits/' }
    ],
    badExampleKey: 'design-ibelick-no-purple-bad',
    goodExampleKey: 'design-ibelick-no-purple-good'
  },
  {
    id: 'design-ibelick-no-glow',
    category: 'design',
    source: 'ibelick',
    title: 'Don\'t Use Glow as Affordance',
    description: 'Never rely on glow effects as the primary indicator for interactive elements',
    sourceQuote: 'NEVER use glow as primary affordance. Glows are decorative, not functional - they don\'t clearly indicate interactivity.',
    additionalExplanation: 'Glow effects are hard to see in bright environments, don\'t provide clear affordance, look inconsistent across displays, and can be expensive to render.',
    sourceLinks: [
      { text: 'Clickability Signifiers', url: 'https://www.nngroup.com/articles/clickable-elements/' }
    ],
    badExampleKey: 'design-ibelick-no-glow-bad',
    goodExampleKey: 'design-ibelick-no-glow-good'
  },
  {
    id: 'design-ibelick-default-shadows',
    category: 'design',
    source: 'ibelick',
    title: 'Use Tailwind Default Shadows',
    description: 'Stick with Tailwind\'s default shadow scale instead of custom values',
    sourceQuote: 'Stick with Tailwind default shadows (shadow-sm, shadow, shadow-md, shadow-lg). Custom shadows create inconsistency.',
    additionalExplanation: 'Tailwind\'s shadow scale is carefully designed for visual consistency, proper elevation hierarchy, good performance, and easy maintenance.',
    sourceLinks: [
      { text: 'Tailwind Box Shadow', url: 'https://tailwindcss.com/docs/box-shadow' }
    ],
    badExampleKey: 'design-ibelick-default-shadows-bad',
    goodExampleKey: 'design-ibelick-default-shadows-good'
  },
  {
    id: 'design-ibelick-empty-states',
    category: 'design',
    source: 'ibelick',
    title: 'Empty States Need Clear Actions',
    description: 'Every empty state should have one clear action to guide users forward',
    sourceQuote: 'MUST give empty states one clear action. Users need guidance on what to do next - don\'t leave them stranded.',
    additionalExplanation: 'Empty states are critical onboarding moments. Users seeing "No items" with no guidance will feel confused and may abandon the product.',
    sourceLinks: [
      { text: 'Empty State Design', url: 'https://www.nngroup.com/articles/empty-state-interface-design/' }
    ],
    badExampleKey: 'design-ibelick-empty-states-bad',
    goodExampleKey: 'design-ibelick-empty-states-good'
  },
  {
    id: 'design-ibelick-color-restraint',
    category: 'design',
    source: 'ibelick',
    title: 'Limit Accent Colors',
    description: 'Use only one accent color per view to maintain visual hierarchy and reduce noise',
    sourceQuote: 'Limit accent colors to one per view. Multiple bright colors compete for attention and create visual chaos.',
    additionalExplanation: 'When everything is highlighted, nothing is. Multiple accent colors dilute visual hierarchy, make it unclear what\'s important, and create cognitive overload.',
    sourceLinks: [
      { text: 'Psychology of Color in UX', url: 'https://www.smashingmagazine.com/2025/08/psychology-color-ux-design-digital-products/' }
    ],
    badExampleKey: 'design-ibelick-color-restraint-bad',
    goodExampleKey: 'design-ibelick-color-restraint-good'
  },
  {
    id: 'aesthetics-distinctive-typography',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Distinctive Font Choices',
    description: 'Choose unique, characterful fonts over generic defaults like Inter and Roboto',
    sourceQuote: 'Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend\'s aesthetics.',
    additionalExplanation: 'Typography carries singular voice. Generic fonts are everywhere—they\'re safe but forgettable. Distinctive font pairings create immediate visual identity. Pair a characterful display font for headlines with a refined body font for memorable experiences.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Google Fonts', url: 'https://fonts.google.com/' },
      { text: 'Fontshare', url: 'https://www.fontshare.com/' }
    ],
    badExampleKey: 'aesthetics-distinctive-typography-bad',
    goodExampleKey: 'aesthetics-distinctive-typography-good'
  },
  {
    id: 'aesthetics-color-dominance',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Dominant Colors with Sharp Accents',
    description: 'Use bold primary colors with 1-2 sharp accent highlights instead of evenly-distributed palettes',
    sourceQuote: 'Employ dominant colors as the primary visual element, with sharp accent colors used sparingly for highlights. Don\'t be timid with color—be bold and intentional.',
    additionalExplanation: 'Timid, evenly-distributed palettes create visual confusion. When every color competes for attention, nothing stands out. A dominant color establishes hierarchy, while sharp accents draw the eye to key actions.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Refactoring UI', url: 'https://www.refactoringui.com/' }
    ],
    badExampleKey: 'aesthetics-color-dominance-bad',
    goodExampleKey: 'aesthetics-color-dominance-good'
  },
  {
    id: 'aesthetics-orchestrated-motion',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Orchestrated Page Load Reveals',
    description: 'Use staggered reveal sequences with animation-delay instead of scattered micro-interactions',
    sourceQuote: 'Orchestrate page load reveals. Staggered reveal sequences with animation-delay create intentional, polished experiences. Random micro-interactions scattered throughout feel chaotic.',
    additionalExplanation: 'Motion is choreography. When animations fire randomly, the interface feels broken. Orchestrated reveals—elements appearing in sequence with consistent timing—communicate intentionality and craftsmanship.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Motion One', url: 'https://motion.dev/' }
    ],
    badExampleKey: 'aesthetics-orchestrated-motion-bad',
    goodExampleKey: 'aesthetics-orchestrated-motion-good'
  },
  {
    id: 'aesthetics-spatial-composition',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Unexpected Spatial Layouts',
    description: 'Break predictable symmetric grids with asymmetry, overlap, and varied scale',
    sourceQuote: 'Design unexpected spatial layouts. Break out of predictable symmetric grids with asymmetry, overlap, negative margins, and diagonal flow. Grid-breaking creates visual interest.',
    additionalExplanation: 'Symmetric grids are the default. Every SaaS landing page reaches for the same 3-column grid. Breaking these expectations with asymmetry, overlap, and varied scale creates memorable, distinctive experiences.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Refactoring UI: Layout', url: 'https://www.refactoringui.com/' }
    ],
    badExampleKey: 'aesthetics-spatial-composition-bad',
    goodExampleKey: 'aesthetics-spatial-composition-good'
  },
  {
    id: 'aesthetics-atmospheric-backgrounds',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Atmospheric Visual Details',
    description: 'Add depth with gradient meshes, noise textures, and layered transparencies',
    sourceQuote: 'Add atmospheric visual details. Gradient meshes, noise textures, and layered transparencies create depth and richness. Plain solid backgrounds feel flat and lifeless.',
    additionalExplanation: 'Flat, solid backgrounds are the absence of design. Even minimal interfaces benefit from atmospheric depth: subtle gradients, grain, or texture that gives content a place to live rather than floating in a void.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Mesh Gradients', url: 'https://meshgradient.in/' }
    ],
    badExampleKey: 'aesthetics-atmospheric-backgrounds-bad',
    goodExampleKey: 'aesthetics-atmospheric-backgrounds-good'
  },
  {
    id: 'aesthetics-bold-direction',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Intentional Design Direction',
    description: 'Commit to a design direction and execute with precision over generic AI aesthetics',
    sourceQuote: 'Commit to a design direction and execute with precision. Generic AI aesthetics (purple gradients, sparkles, rounded everything) are forgettable. Intentionality matters more than intensity.',
    additionalExplanation: 'Every AI-generated landing page looks the same: purple gradients, floating orbs, excessive border-radius. Real design is choosing a direction—brutalist, editorial, organic—and executing it with conviction. A committed direction is more memorable than safe median aesthetics.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Awwwards', url: 'https://www.awwwards.com/' }
    ],
    badExampleKey: 'aesthetics-bold-direction-bad',
    goodExampleKey: 'aesthetics-bold-direction-good'
  },
  {
    id: 'aesthetics-anti-generic',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Anti-Generic Design',
    description: 'Avoid generic fonts like Inter/Arial, clichéd purple gradients, and cookie-cutter component patterns',
    sourceQuote: 'Anti-Patterns (Never Use): Generic fonts (Inter, Roboto, Arial, system fonts). Clichéd schemes like purple gradients on white backgrounds. Predictable layouts or cookie-cutter component patterns.',
    additionalExplanation: 'Generic design is the result of following defaults instead of making intentional choices. Inter, system fonts, and Arial are everywhere—they say nothing about your product. Purple-to-blue gradients, centered layouts, excessive border-radius, and sparkle emojis are hallmarks of AI-generated slop. Distinctive design requires actively rejecting these patterns in favor of fonts with character, intentional color choices, and layouts that break from the predictable grid.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-anti-generic-bad',
    goodExampleKey: 'aesthetics-anti-generic-good'
  },
  {
    id: 'aesthetics-css-first-animations',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'CSS-First Animations',
    description: 'Prioritize CSS-only animation solutions for HTML implementations over JavaScript',
    sourceQuote: 'Prioritize CSS-only solutions for HTML implementations. Focus on high-impact moments like orchestrated page loads with staggered reveals.',
    additionalExplanation: 'CSS animations are more performant, requiring no JavaScript runtime overhead. They run on the compositor thread, avoiding main thread blocking. For simple effects like hover states, transitions, and reveals, CSS is cleaner, more maintainable, and declarative. Reserve JavaScript animations for complex interactions requiring physics or gesture responses.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'MDN: CSS Transitions', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions' },
      { text: 'MDN: CSS Animations', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations' }
    ],
    badExampleKey: 'aesthetics-css-first-animations-bad',
    goodExampleKey: 'aesthetics-css-first-animations-good'
  },
  {
    id: 'aesthetics-craftsmanship',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Meticulous Craftsmanship',
    description: 'Work must appear meticulously crafted with painstaking attention to detail',
    sourceQuote: 'Work must appear meticulously crafted, labored over with countless hours of care. Should demonstrate master-level execution from someone at the absolute top of their field.',
    additionalExplanation: 'Craftsmanship is in the details users feel but rarely consciously notice: consistent spacing rhythms, pixel-perfect alignment, harmonious proportions. Sloppy execution—misaligned elements, inconsistent padding, arbitrary values—destroys trust and perceived quality. Every pixel is intentional in master-level work.',
    sourceLinks: [
      { text: 'Anthropic Canvas-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-craftsmanship-bad',
    goodExampleKey: 'aesthetics-craftsmanship-good'
  },
  {
    id: 'aesthetics-design-commitment',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Full Design Commitment',
    description: 'Commit fully to a cohesive aesthetic direction rather than timid half-measures',
    sourceQuote: 'Commit to cohesive aesthetic using CSS variables. Deploy dominant colors with sharp accents over timid palettes.',
    additionalExplanation: 'Timid design choices—pale grays, washed-out colors, safe neutral tones—communicate uncertainty and lack of confidence. When you commit fully to an aesthetic direction, every element reinforces the identity. Bold dominants with sharp accents create memorable, distinctive experiences. Half-measures are forgettable; conviction is memorable.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-design-commitment-bad',
    goodExampleKey: 'aesthetics-design-commitment-good'
  },
  {
    id: 'aesthetics-visual-first',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Visual-First Communication',
    description: 'Ideas communicate through space, form, and color - text should be rare and powerful',
    sourceQuote: '90% visual design, 10% essential text. Ideas communicate through space, form, color, and composition—not paragraphs. Text should appear as rare, powerful gestures integrated into visual architecture.',
    additionalExplanation: 'Most interfaces rely too heavily on text to communicate. Walls of paragraphs explaining features, long descriptions under icons, copy-heavy layouts. Great visual design lets form, color, and space tell the story. Text becomes a rare, powerful punctuation—short labels, single words, essential context only. When visuals lead, the experience becomes immediate and memorable.',
    sourceLinks: [
      { text: 'Anthropic Canvas-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-visual-first-bad',
    goodExampleKey: 'aesthetics-visual-first-good'
  },
  {
    id: 'aesthetics-negative-space',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Negative Space Mastery',
    description: 'Use generous or controlled negative space intentionally as a design element',
    sourceQuote: 'Break grid patterns intentionally with generous or controlled negative space.',
    additionalExplanation: 'Negative space is not empty space—it is active design. Cramped layouts with no breathing room feel claustrophobic and unprofessional. Generous whitespace creates visual hierarchy, improves readability, and gives content room to breathe. Master designers use negative space as deliberately as positive elements.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Refactoring UI', url: 'https://www.refactoringui.com/' }
    ],
    badExampleKey: 'aesthetics-negative-space-bad',
    goodExampleKey: 'aesthetics-negative-space-good'
  },
  {
    id: 'aesthetics-memorable-differentiation',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Memorable Differentiation',
    description: 'Every design needs one unforgettable element that makes it memorable',
    sourceQuote: 'What makes this UNFORGETTABLE? What\'s the one thing someone will remember?',
    additionalExplanation: 'The most memorable designs have a signature element that lodges in the viewer\'s mind. It might be an animated border, a distinctive illustration, dramatic typography, or an unexpected shadow. Without this differentiator, designs blur into the endless sea of similar interfaces. One bold, unforgettable detail is worth more than a dozen safe, forgettable flourishes.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-memorable-differentiation-bad',
    goodExampleKey: 'aesthetics-memorable-differentiation-good'
  },
  {
    id: 'aesthetics-grid-breaking',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Intentional Grid-Breaking',
    description: 'Break grid patterns intentionally with asymmetry, overlap, and diagonal flow',
    sourceQuote: 'Employ unexpected layouts, asymmetry, overlap, and diagonal flow. Break grid patterns intentionally.',
    additionalExplanation: 'Rigid, perfectly symmetrical grids feel predictable and forgettable. By intentionally breaking the grid with varied card sizes, slight offsets, overlapping elements, or diagonal arrangements, you create visual hierarchy and movement that guides the eye and makes the layout memorable.',
    sourceLinks: [
      { text: 'Anthropic frontend-design skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-grid-breaking-bad',
    goodExampleKey: 'aesthetics-grid-breaking-good'
  },
  {
    id: 'aesthetics-scroll-interactions',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Surprising Scroll Interactions',
    description: 'Use scroll-triggering and hover states that surprise and delight users',
    sourceQuote: 'Use scroll-triggering and hover states that surprise.',
    additionalExplanation: 'Scroll-triggered animations transform passive browsing into active discovery. When elements reveal themselves as users scroll, each section becomes a moment of anticipation. Staggered reveals create rhythm, static content creates monotony. The best interfaces reward exploration with delightful surprises.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-scroll-interactions-bad',
    goodExampleKey: 'aesthetics-scroll-interactions-good'
  },
  {
    id: 'aesthetics-font-pairing',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Intentional Font Pairing',
    description: 'Pair a distinctive display font with a refined body font for visual hierarchy',
    sourceQuote: 'Pair a distinctive display font with a refined body font.',
    additionalExplanation: 'Typography hierarchy is the foundation of visual communication. When headlines and body text share the same generic font, the page becomes flat. A distinctive display font for headlines commands attention, while a refined body font ensures comfortable reading. The contrast between them guides users through content naturally.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' },
      { text: 'Typewolf Font Pairing', url: 'https://www.typewolf.com/' }
    ],
    badExampleKey: 'aesthetics-font-pairing-bad',
    goodExampleKey: 'aesthetics-font-pairing-good'
  },
  {
    id: 'aesthetics-design-variety',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Design Variety',
    description: 'Never converge on common choices - vary themes, fonts, and aesthetics across designs',
    sourceQuote: 'No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.',
    additionalExplanation: 'When every design looks the same, nothing stands out. Templates using identical fonts, colors, and layouts create visual monotony. Variety is memorable - each aesthetic direction creates its own emotional resonance and brand identity. Intentional differentiation makes work distinctive.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-design-variety-bad',
    goodExampleKey: 'aesthetics-design-variety-good'
  },
  {
    id: 'aesthetics-complexity-matching',
    category: 'aesthetics',
    source: 'anthropic',
    title: 'Complexity Matching',
    description: 'Match implementation complexity to aesthetic vision - maximalist designs need elaborate code, minimalist designs need restraint',
    sourceQuote: 'Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations. Minimalist designs need restraint, precision, and careful spacing attention.',
    additionalExplanation: 'There is no universal "right amount" of visual complexity. The problem is mismatch: applying maximalist techniques to minimalist content creates cognitive dissonance. A simple note card with layered shadows, gradient backgrounds, blur effects, and glowing buttons signals importance that the content does not warrant.',
    sourceLinks: [
      { text: 'Anthropic Frontend-Design Skill', url: 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md' }
    ],
    badExampleKey: 'aesthetics-complexity-matching-bad',
    goodExampleKey: 'aesthetics-complexity-matching-good'
  }
];
