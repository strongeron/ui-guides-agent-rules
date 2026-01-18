# TASK-003: Example Quality Audit

**Epic**: Beads Review Epic
**Priority**: High
**Status**: Not Started
**Estimated Items**: 164 example components

## Objective

Ensure all Good/Bad example components effectively demonstrate their principles and follow code quality standards.

## Quality Criteria

### Functional Requirements
- [ ] Example works without errors
- [ ] Good example clearly demonstrates the correct approach
- [ ] Bad example shows a realistic anti-pattern
- [ ] Visual difference between good/bad is immediately apparent

### Code Quality
- [ ] Follows TypeScript best practices
- [ ] Uses Tailwind classes consistently
- [ ] No console warnings or errors
- [ ] Proper component naming convention

### Accessibility
- [ ] Semantic HTML used appropriately
- [ ] ARIA attributes used correctly (where needed)
- [ ] Keyboard navigable
- [ ] Screen reader friendly

### Visual Design
- [ ] Consistent container styling
- [ ] Dark mode support
- [ ] Responsive behavior
- [ ] Clear good/bad visual indicators

## Category Audits

### Interactions (46 examples)
**Path**: `src/components/examples/interactions/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| keyboard-access | KeyboardAccessGood | KeyboardAccessBad | [ ] |
| focus-visible | FocusVisibleGood | FocusVisibleBad | [ ] |
| focus-trap | FocusTrapGood | FocusTrapBad | [ ] |
| focus-return | FocusReturnGood | FocusReturnBad | [ ] |
| scrollable-focus | ScrollableFocusGood | ScrollableFocusBad | [ ] |
| hit-target | HitTargetGood | HitTargetBad | [ ] |
| active-state | ActiveStateGood | ActiveStateBad | [ ] |
| touch-cancel | TouchCancelGood | TouchCancelBad | [ ] |
| cursor-feedback | CursorFeedbackGood | CursorFeedbackBad | [ ] |
| hover-enhancement | HoverEnhancementGood | HoverEnhancementBad | [ ] |
| link-target | LinkTargetGood | LinkTargetBad | [ ] |
| link-protocol | LinkProtocolGood | LinkProtocolBad | [ ] |
| link-obvious | LinkObviousGood | LinkObviousBad | [ ] |
| toast-undoable | ToastUndoableGood | ToastUndoableBad | [ ] |
| overscroll-contain | OverscrollContainGood | OverscrollContainBad | [ ] |
| scrollbar-gutter | ScrollbarGutterGood | ScrollbarGutterBad | [ ] |
| select-disabled | SelectDisabledGood | SelectDisabledBad | [ ] |
| context-menu | ContextMenuGood | ContextMenuBad | [ ] |
| copy-paste | CopyPasteGood | CopyPasteBad | [ ] |
| drag-drop | DragDropGood | DragDropBad | [ ] |
| drop-zone | DropZoneGood | DropZoneBad | [ ] |
| text-select | TextSelectGood | TextSelectBad | [ ] |
| pointer-passthrough | PointerPassthroughGood | PointerPassthroughBad | [ ] |

---

### Forms (30 examples)
**Path**: `src/components/examples/forms/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| enter-submits | EnterSubmitsGood | EnterSubmitsBad | [ ] |
| tab-order | TabOrderGood | TabOrderBad | [ ] |
| semantic-labels | SemanticLabelsGood | SemanticLabelsBad | [ ] |
| autocomplete | AutocompleteGood | AutocompleteBad | [ ] |
| input-type | InputTypeGood | InputTypeBad | [ ] |
| validation-timing | ValidationTimingGood | ValidationTimingBad | [ ] |
| native-validation | NativeValidationGood | NativeValidationBad | [ ] |
| error-association | ErrorAssociationGood | ErrorAssociationBad | [ ] |
| input-affordance | InputAffordanceGood | InputAffordanceBad | [ ] |
| native-date | NativeDateGood | NativeDateBad | [ ] |
| browser-defaults | BrowserDefaultsGood | BrowserDefaultsBad | [ ] |
| radio-selection | RadioSelectionGood | RadioSelectionBad | [ ] |
| password-toggle | PasswordToggleGood | PasswordToggleBad | [ ] |
| paste-friendly | PasteFriendlyGood | PasteFriendlyBad | [ ] |
| visible-value | VisibleValueGood | VisibleValueBad | [ ] |

---

### Content (32 examples)
**Path**: `src/components/examples/content/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| alt-text | AltTextGood | AltTextBad | [ ] |
| image-text | ImageTextGood | ImageTextBad | [ ] |
| icon-label | IconLabelGood | IconLabelBad | [ ] |
| number-format | NumberFormatGood | NumberFormatBad | [ ] |
| truncate-middle | TruncateMiddleGood | TruncateMiddleBad | [ ] |
| url-shorten | UrlShortenGood | UrlShortenBad | [ ] |
| time-absolute | TimeAbsoluteGood | TimeAbsoluteBad | [ ] |
| label-data | LabelDataGood | LabelDataBad | [ ] |
| title-context | TitleContextGood | TitleContextBad | [ ] |
| favicon-state | FaviconStateGood | FaviconStateBad | [ ] |
| translate | TranslateGood | TranslateBad | [ ] |
| metadata-sharing | MetadataSharingGood | MetadataSharingBad | [ ] |
| meta-refresh | MetaRefreshGood | MetaRefreshBad | [ ] |
| error-explain | ErrorExplainGood | ErrorExplainBad | [ ] |
| empty-state | EmptyStateGood | EmptyStateBad | [ ] |
| loading-skeleton | LoadingSkeletonGood | LoadingSkeletonBad | [ ] |

---

### Animations (16 examples)
**Path**: `src/components/examples/animations/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| reduced-motion | ReducedMotionGood | ReducedMotionBad | [ ] |
| duration | DurationGood | DurationBad | [ ] |
| compositor | CompositorGood | CompositorBad | [ ] |
| explicit-properties | ExplicitPropertiesGood | ExplicitPropertiesBad | [ ] |
| cancel-friendly | CancelFriendlyGood | CancelFriendlyBad | [ ] |
| scroll-driven | ScrollDrivenGood | ScrollDrivenBad | [ ] |
| dimension-transition | DimensionTransitionGood | DimensionTransitionBad | [ ] |
| avoid-layout | AvoidLayoutGood | AvoidLayoutBad | [ ] |

---

### Design (14 examples)
**Path**: `src/components/examples/design/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| pixel-snapping | PixelSnappingGood | PixelSnappingBad | [ ] |
| subpixel-alignment | SubpixelAlignmentGood | SubpixelAlignmentBad | [ ] |
| color-scheme | ColorSchemeGood | ColorSchemeBad | [ ] |
| theme-toggle | ThemeToggleGood | ThemeToggleBad | [ ] |
| accent-color | AccentColorGood | AccentColorBad | [ ] |
| selection-style | SelectionStyleGood | SelectionStyleBad | [ ] |
| scrollbar-style | ScrollbarStyleGood | ScrollbarStyleBad | [ ] |

---

### Layout (12 examples)
**Path**: `src/components/examples/layout/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| responsive | ResponsiveGood | ResponsiveBad | [ ] |
| zoom-friendly | ZoomFriendlyGood | ZoomFriendlyBad | [ ] |
| viewport-meta | ViewportMetaGood | ViewportMetaBad | [ ] |
| overflow-handling | OverflowHandlingGood | OverflowHandlingBad | [ ] |
| safe-area | SafeAreaGood | SafeAreaBad | [ ] |
| virtual-keyboard | VirtualKeyboardGood | VirtualKeyboardBad | [ ] |

---

### Performance (14 examples)
**Path**: `src/components/examples/performance/`

| Principle | Good Example | Bad Example | Status |
|-----------|--------------|-------------|--------|
| debounce | DebounceGood | DebounceBad | [ ] |
| optimistic-ui | OptimisticUiGood | OptimisticUiBad | [ ] |
| lazy-loading | LazyLoadingGood | LazyLoadingBad | [ ] |
| virtualization | VirtualizationGood | VirtualizationBad | [ ] |
| resource-hints | ResourceHintsGood | ResourceHintsBad | [ ] |
| image-sizing | ImageSizingGood | ImageSizingBad | [ ] |
| font-loading | FontLoadingGood | FontLoadingBad | [ ] |

## Issues Found

| Example | Category | Issue | Severity | Fix |
|---------|----------|-------|----------|-----|
| | | | | |

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Examples | 164 |
| Passing | 0 |
| Issues Found | 0 |
| Fixed | 0 |
