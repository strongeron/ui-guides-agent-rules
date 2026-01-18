# TASK-001: Source Links Audit

**Epic**: Beads Review Epic
**Priority**: High
**Status**: Not Started
**Estimated Items**: 82 principles

## Objective

Verify all principles have valid, accessible source links that point to the correct documentation sections.

## Scope

Review `sourceLinks` array in each principle within `src/data/principles.ts`.

## Checklist

### Interactions (23 principles)
- [ ] `interactions-keyboard-access`
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

### Forms (15 principles)
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

### Content (16 principles)
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

### Animations (8 principles)
- [ ] `animations-reduced-motion`
- [ ] `animations-duration`
- [ ] `animations-compositor`
- [ ] `animations-explicit-properties`
- [ ] `animations-cancel-friendly`
- [ ] `animations-scroll-driven`
- [ ] `animations-dimension-transition`
- [ ] `animations-avoid-layout`

### Design (7 principles)
- [ ] `design-pixel-snapping`
- [ ] `design-subpixel-alignment`
- [ ] `design-color-scheme`
- [ ] `design-theme-toggle`
- [ ] `design-accent-color`
- [ ] `design-selection-style`
- [ ] `design-scrollbar-style`

### Layout (6 principles)
- [ ] `layout-responsive`
- [ ] `layout-zoom-friendly`
- [ ] `layout-viewport-meta`
- [ ] `layout-overflow-handling`
- [ ] `layout-safe-area`
- [ ] `layout-virtual-keyboard`

### Performance (7 principles)
- [ ] `performance-debounce`
- [ ] `performance-optimistic-ui`
- [ ] `performance-lazy-loading`
- [ ] `performance-virtualization`
- [ ] `performance-resource-hints`
- [ ] `performance-image-sizing`
- [ ] `performance-font-loading`

## Verification Steps

For each principle:
1. Check if `sourceLinks` array exists and is not empty
2. Verify each URL is accessible (returns 200 status)
3. Confirm link text accurately describes the target content
4. Verify the link points to the relevant section (not just the main page)

## Issues Found

| Principle ID | Issue | Resolution |
|--------------|-------|------------|
| | | |

## Notes

- Primary source: `doc/vercel-web-guides.md`
- External links should point to Vercel documentation or relevant web standards
