# TASK-002: Agent Rules Alignment

**Epic**: Beads Review Epic
**Priority**: High
**Status**: Not Started
**Estimated Items**: 91 agent rules

## Objective

Verify all agent rules accurately reflect their linked principles and that priority levels are appropriate.

## Scope

Review all entries in `src/data/agentRules.ts`.

## Linked Rules Checklist (82 rules)

### Interactions (23 rules)
- [ ] `interactions-keyboard-access` - Priority appropriate? Rule matches principle?
- [ ] `interactions-focus-visible`
- [ ] `interactions-focus-trap`
- [ ] `interactions-focus-return`
- [ ] `interactions-scrollable-focus`
- [ ] `interactions-hit-target`
- [ ] `interactions-active-state`
- [ ] `interactions-touch-cancel`
- [ ] `interactions-cursor-feedback`
- [ ] `interactions-hover-enhancement`
- [ ] `interactions-link-target`
- [ ] `interactions-link-protocol`
- [ ] `interactions-link-obvious`
- [ ] `interactions-toast-undoable`
- [ ] `interactions-overscroll-contain`
- [ ] `interactions-scrollbar-gutter`
- [ ] `interactions-select-disabled`
- [ ] `interactions-context-menu`
- [ ] `interactions-copy-paste`
- [ ] `interactions-drag-drop`
- [ ] `interactions-drop-zone`
- [ ] `interactions-text-select`
- [ ] `interactions-pointer-passthrough`

### Forms (15 rules)
- [ ] `forms-enter-submits`
- [ ] `forms-tab-order`
- [ ] `forms-semantic-labels`
- [ ] `forms-autocomplete`
- [ ] `forms-input-type`
- [ ] `forms-validation-timing`
- [ ] `forms-native-validation`
- [ ] `forms-error-association`
- [ ] `forms-input-affordance`
- [ ] `forms-native-date`
- [ ] `forms-browser-defaults`
- [ ] `forms-radio-selection`
- [ ] `forms-password-toggle`
- [ ] `forms-paste-friendly`
- [ ] `forms-visible-value`

### Content (16 rules)
- [ ] `content-alt-text`
- [ ] `content-image-text`
- [ ] `content-icon-label`
- [ ] `content-number-format`
- [ ] `content-truncate-middle`
- [ ] `content-url-shorten`
- [ ] `content-time-absolute`
- [ ] `content-label-data`
- [ ] `content-title-context`
- [ ] `content-favicon-state`
- [ ] `content-translate`
- [ ] `content-metadata-sharing`
- [ ] `content-meta-refresh`
- [ ] `content-error-explain`
- [ ] `content-empty-state`
- [ ] `content-loading-skeleton`

### Animations (8 rules)
- [ ] `animations-reduced-motion`
- [ ] `animations-duration`
- [ ] `animations-compositor`
- [ ] `animations-explicit-properties`
- [ ] `animations-cancel-friendly`
- [ ] `animations-scroll-driven`
- [ ] `animations-dimension-transition`
- [ ] `animations-avoid-layout`

### Design (7 rules)
- [ ] `design-pixel-snapping`
- [ ] `design-subpixel-alignment`
- [ ] `design-color-scheme`
- [ ] `design-theme-toggle`
- [ ] `design-accent-color`
- [ ] `design-selection-style`
- [ ] `design-scrollbar-style`

### Layout (6 rules)
- [ ] `layout-responsive`
- [ ] `layout-zoom-friendly`
- [ ] `layout-viewport-meta`
- [ ] `layout-overflow-handling`
- [ ] `layout-safe-area`
- [ ] `layout-virtual-keyboard`

### Performance (7 rules)
- [ ] `performance-debounce`
- [ ] `performance-optimistic-ui`
- [ ] `performance-lazy-loading`
- [ ] `performance-virtualization`
- [ ] `performance-resource-hints`
- [ ] `performance-image-sizing`
- [ ] `performance-font-loading`

## Standalone Rules Checklist (9 rules)

These rules exist without corresponding principles. Evaluate if principles should be created.

- [ ] `content-brand-resources` - Should a principle be created?
- [ ] `content-dont-ship-schema` - Should a principle be created?
- [ ] `design-browser-ui-match` - Should a principle be created?
- [ ] `design-gradient-banding` - Should a principle be created?
- [ ] `forms-text-replacements` - Should a principle be created?
- [ ] `performance-keystroke-cost` - Should a principle be created?
- [ ] `performance-measure-reliably` - Should a principle be created?
- [ ] `performance-minimize-layout-work` - Should a principle be created?
- [ ] `performance-preload-wisely` - Should a principle be created?

## Verification Steps

For each linked rule:
1. Read the principle's `title`, `description`, and `sourceQuote`
2. Compare with the agent rule's `rule` text
3. Verify the `priority` level is appropriate:
   - **MUST**: Critical requirements, accessibility, security
   - **SHOULD**: Best practices, recommended patterns
   - **NEVER**: Anti-patterns, things to avoid
4. Check rule text is actionable and clear

For standalone rules:
1. Determine if the rule warrants a full principle
2. If yes, create a follow-up task to add the principle
3. If no, document why it remains standalone

## Issues Found

| Rule ID | Issue | Recommended Action |
|---------|-------|-------------------|
| | | |

## Priority Level Distribution

| Priority | Count | Percentage |
|----------|-------|------------|
| MUST | | |
| SHOULD | | |
| NEVER | | |
