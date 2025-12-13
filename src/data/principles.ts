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
  }
];

export const principles: Principle[] = [
  {
    id: 'forms-enter-submits',
    category: 'forms',
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
    title: 'Don\'t Block Typing',
    description: 'Allow all input and show validation feedback instead of blocking keystrokes',
    sourceQuote: 'Don\'t block typing. Even if a field only accepts numbers, allow any input & show validation feedback. Blocking keystrokes entirely is confusing because the user gets no explanation.',
    additionalExplanation: 'When you prevent users from typing certain characters, they don\'t understand why their keyboard isn\'t working. It\'s better to accept all input and provide clear validation messages that explain what format is expected.',
    sourceLinks: [
      { text: 'Inline validation patterns', url: 'https://www.nngroup.com/articles/inline-validation-in-web-forms/' }
    ],
    badExampleKey: 'forms-dont-block-typing-bad',
    goodExampleKey: 'forms-dont-block-typing-good'
  },
  {
    id: 'forms-dont-pre-disable-submit',
    category: 'forms',
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
    title: 'Error Placement',
    description: 'Show errors next to their fields and focus the first error on submit',
    sourceQuote: 'Error placement. Show errors next to their fields; on submit, focus the first error.',
    additionalExplanation: 'Errors should appear immediately adjacent to the field they relate to. When a form is submitted with errors, automatically focus the first problematic field so users can start fixing issues immediately. This is especially important for long forms.',
    sourceLinks: [
      { text: 'WebAIM: Usable and Accessible Form Validation', url: 'https://webaim.org/articles/formvalidation/' }
    ],
    badExampleKey: 'forms-error-placement-bad',
    goodExampleKey: 'forms-error-placement-good'
  },
  {
    id: 'forms-autocomplete',
    category: 'forms',
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
    id: 'interactions-keyboard-everywhere',
    category: 'interactions',
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
    title: 'URL as State',
    description: 'Persist state in the URL for sharing and navigation',
    sourceQuote: 'URL as state. Persist state in the URL so share, refresh, Back/Forward navigation work e.g., nuqs.',
    additionalExplanation: 'Store filters, search queries, tabs, and other UI state in the URL. This allows users to share links, refresh without losing context, and use browser back/forward buttons naturally. Libraries like nuqs make this easier to implement.',
    sourceLinks: [
      { text: 'nuqs', url: 'https://nuqs.dev' },
      { text: 'URL as State', url: 'https://www.nngroup.com/articles/url-design/' }
    ],
    badExampleKey: 'interactions-url-state-bad',
    goodExampleKey: 'interactions-url-state-good'
  },
  {
    id: 'interactions-scroll-persistence',
    category: 'interactions',
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
    title: 'No Dead Zones',
    description: 'If part of a control looks interactive, it should be interactive',
    sourceQuote: 'No dead zones. If part of a control looks interactive, it should be interactive. Don\'t leave users guessing where to interact.',
    additionalExplanation: 'When part of a component looks clickable (like a card with a button), make the entire component clickable, not just the button. This matches user expectations and reduces frustration from clicking "dead zones" that don\'t respond.',
    sourceLinks: [
      { text: 'Affordances', url: 'https://www.nngroup.com/articles/affordances/' }
    ],
    badExampleKey: 'interactions-no-dead-zones-bad',
    goodExampleKey: 'interactions-no-dead-zones-good'
  },
  {
    id: 'interactions-clean-drag',
    category: 'interactions',
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
    id: 'animations-prefers-reduced-motion',
    category: 'animations',
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
    id: 'layout-optical-alignment',
    category: 'layout',
    title: 'Optical Alignment',
    description: 'Adjust ±1px when perception beats geometry',
    sourceQuote: 'Optical alignment. Adjust ±1px when perception beats geometry.',
    additionalExplanation: 'Mathematical centering doesn\'t always look centered to the human eye. Icons with more visual weight on one side may need to be shifted slightly to appear balanced. Trust your eye over the numbers, but limit adjustments to 1-2px.',
    sourceLinks: [
      { text: 'Optical Alignment', url: 'https://medium.com/@lukejones/optical-adjustment-b55492a1165c' }
    ],
    badExampleKey: 'layout-optical-alignment-bad',
    goodExampleKey: 'layout-optical-alignment-good'
  },
  {
    id: 'layout-deliberate-alignment',
    category: 'layout',
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
    title: 'Balance Contrast in Lockups',
    description: 'Adjust weight, size, spacing when text and icons sit together',
    sourceQuote: 'Balance contrast in lockups. When text & icons sit side by side, adjust weight, size, spacing, or color so they don\'t clash. For example, a thin-stroke icon may need a bolder stroke next to medium-weight text.',
    additionalExplanation: 'Icons and text have different visual weights. A light icon next to bold text feels unbalanced. Either use heavier icons, lighter text, adjust sizing, or tweak color to create visual harmony in icon-text combinations.',
    sourceLinks: [
      { text: 'Visual Balance', url: 'https://www.nngroup.com/articles/visual-hierarchy/' }
    ],
    badExampleKey: 'layout-balance-contrast-bad',
    goodExampleKey: 'layout-balance-contrast-good'
  },
  {
    id: 'layout-safe-areas',
    category: 'layout',
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
    id: 'content-inline-help-first',
    category: 'content',
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
    id: 'performance-minimize-rerenders',
    category: 'performance',
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
    id: 'design-layered-shadows',
    category: 'design',
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
    title: 'Minimum Contrast',
    description: 'Prefer APCA over WCAG 2 for accurate perceptual contrast',
    sourceQuote: 'Minimum contrast. Prefer APCA over WCAG 2 for more accurate perceptual contrast.',
    additionalExplanation: 'WCAG 2.x contrast ratios have known issues. APCA (Accessible Perceptual Contrast Algorithm) provides more accurate measurements of readability. Aim for APCA values appropriate to text size and weight. Generally, body text should have Lc 60+ and headings Lc 45+.',
    sourceLinks: [
      { text: 'APCA', url: 'https://www.myndex.com/APCA/' },
      { text: 'WCAG 3 Contrast', url: 'https://www.w3.org/WAI/WCAG3/working-examples/visual-contrast-of-text/' }
    ],
    badExampleKey: 'design-minimum-contrast-bad',
    goodExampleKey: 'design-minimum-contrast-good'
  },
  {
    id: 'design-interactions-increase-contrast',
    category: 'design',
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
    id: 'content-page-titles',
    category: 'content',
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
    id: 'forms-no-dead-zones',
    category: 'forms',
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
    id: 'performance-device-matrix',
    category: 'performance',
    title: 'Device/Browser Matrix',
    description: 'Test iOS Low Power Mode and macOS Safari',
    sourceQuote: 'Device/browser matrix. Test iOS Low Power Mode & macOS Safari.',
    additionalExplanation: 'Performance varies dramatically across devices and browsers. iOS Low Power Mode throttles animations and JavaScript. Safari has different behavior than Chrome. Test on real devices, not just desktop browsers.',
    sourceLinks: [
      { text: 'Browser Testing', url: 'https://web.dev/browser-compatibility/' }
    ],
    badExampleKey: 'performance-device-matrix-bad',
    goodExampleKey: 'performance-device-matrix-good'
  },
  {
    id: 'performance-throttle-profiling',
    category: 'performance',
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
    id: 'design-hue-consistency',
    category: 'design',
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
    title: 'Accessible Charts',
    description: 'Use color-blind-friendly palettes',
    sourceQuote: 'Accessible charts. Use color-blind-friendly palettes.',
    additionalExplanation: 'About 8% of men and 0.5% of women have color vision deficiencies. Use color palettes designed for color blindness (avoid red-green combinations), and supplement color with patterns, labels, or textures in data visualizations.',
    sourceLinks: [
      { text: 'Color Blind Safe Palettes', url: 'https://www.color-blindness.com/color-blind-friendly-web-design/' },
      { text: 'Data Visualization Accessibility', url: 'https://www.w3.org/WAI/tutorials/images/complex/' }
    ],
    badExampleKey: 'design-accessible-charts-bad',
    goodExampleKey: 'design-accessible-charts-good'
  }
];
