# Beads Review Epic

> **Epic Goal**: Ensure all principles, agent rules, and examples are properly linked, referenced, and demonstrate best practices effectively.

## Summary

| Component | Count | Status |
|-----------|-------|--------|
| Principles | 82 | Needs review |
| Agent Rules | 91 (82 linked + 9 standalone) | Needs review |
| Good Examples | 82 | Needs review |
| Bad Examples | 82 | Needs review |

## Epic Tasks

### Task 1: Source Links Audit
**Priority**: High
**Scope**: All 82 principles

Verify each principle has:
- [ ] Valid `sourceLinks` URLs that resolve correctly
- [ ] Descriptive link text that matches the source content
- [ ] Links pointing to the correct section of the source document

**Files to review**:
- `src/data/principles.ts`

---

### Task 2: Agent Rules Alignment
**Priority**: High
**Scope**: 91 agent rules

Verify:
- [ ] Each agent rule accurately reflects its linked principle
- [ ] Priority levels (MUST/SHOULD/NEVER) are appropriate
- [ ] Rule text is clear, actionable, and matches the principle's intent
- [ ] Review 9 standalone rules without principles for potential principle creation

**Standalone rules to review**:
1. `content-brand-resources`
2. `content-dont-ship-schema`
3. `design-browser-ui-match`
4. `design-gradient-banding`
5. `forms-text-replacements`
6. `performance-keystroke-cost`
7. `performance-measure-reliably`
8. `performance-minimize-layout-work`
9. `performance-preload-wisely`

**Files to review**:
- `src/data/agentRules.ts`
- `src/data/principles.ts`

---

### Task 3: Example Quality Audit by Category

#### 3.1 Interactions (23 principles)
**Priority**: High (largest category)

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| interactions-keyboard-access | KeyboardAccessGood | KeyboardAccessBad | [ ] |
| interactions-focus-visible | FocusVisibleGood | FocusVisibleBad | [ ] |
| interactions-focus-trap | FocusTrapGood | FocusTrapBad | [ ] |
| interactions-focus-return | FocusReturnGood | FocusReturnBad | [ ] |
| interactions-scrollable-focus | ScrollableFocusGood | ScrollableFocusBad | [ ] |
| interactions-hit-target | HitTargetGood | HitTargetBad | [ ] |
| interactions-active-state | ActiveStateGood | ActiveStateBad | [ ] |
| interactions-touch-cancel | TouchCancelGood | TouchCancelBad | [ ] |
| interactions-cursor-feedback | CursorFeedbackGood | CursorFeedbackBad | [ ] |
| interactions-hover-enhancement | HoverEnhancementGood | HoverEnhancementBad | [ ] |
| interactions-link-target | LinkTargetGood | LinkTargetBad | [ ] |
| interactions-link-protocol | LinkProtocolGood | LinkProtocolBad | [ ] |
| interactions-link-obvious | LinkObviousGood | LinkObviousBad | [ ] |
| interactions-toast-undoable | ToastUndoableGood | ToastUndoableBad | [ ] |
| interactions-overscroll-contain | OverscrollContainGood | OverscrollContainBad | [ ] |
| interactions-scrollbar-gutter | ScrollbarGutterGood | ScrollbarGutterBad | [ ] |
| interactions-select-disabled | SelectDisabledGood | SelectDisabledBad | [ ] |
| interactions-context-menu | ContextMenuGood | ContextMenuBad | [ ] |
| interactions-copy-paste | CopyPasteGood | CopyPasteBad | [ ] |
| interactions-drag-drop | DragDropGood | DragDropBad | [ ] |
| interactions-drop-zone | DropZoneGood | DropZoneBad | [ ] |
| interactions-text-select | TextSelectGood | TextSelectBad | [ ] |
| interactions-pointer-passthrough | PointerPassthroughGood | PointerPassthroughBad | [ ] |

**Review criteria**:
- [ ] Good example demonstrates the principle clearly
- [ ] Bad example shows a realistic anti-pattern
- [ ] Visual difference between good/bad is immediately apparent
- [ ] Code quality follows project standards

---

#### 3.2 Forms (15 principles)
**Priority**: High

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| forms-enter-submits | EnterSubmitsGood | EnterSubmitsBad | [ ] |
| forms-tab-order | TabOrderGood | TabOrderBad | [ ] |
| forms-semantic-labels | SemanticLabelsGood | SemanticLabelsBad | [ ] |
| forms-autocomplete | AutocompleteGood | AutocompleteBad | [ ] |
| forms-input-type | InputTypeGood | InputTypeBad | [ ] |
| forms-validation-timing | ValidationTimingGood | ValidationTimingBad | [ ] |
| forms-native-validation | NativeValidationGood | NativeValidationBad | [ ] |
| forms-error-association | ErrorAssociationGood | ErrorAssociationBad | [ ] |
| forms-input-affordance | InputAffordanceGood | InputAffordanceBad | [ ] |
| forms-native-date | NativeDateGood | NativeDateBad | [ ] |
| forms-browser-defaults | BrowserDefaultsGood | BrowserDefaultsBad | [ ] |
| forms-radio-selection | RadioSelectionGood | RadioSelectionBad | [ ] |
| forms-password-toggle | PasswordToggleGood | PasswordToggleBad | [ ] |
| forms-paste-friendly | PasteFriendlyGood | PasteFriendlyBad | [ ] |
| forms-visible-value | VisibleValueGood | VisibleValueBad | [ ] |

---

#### 3.3 Content (16 principles)
**Priority**: Medium

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| content-alt-text | AltTextGood | AltTextBad | [ ] |
| content-image-text | ImageTextGood | ImageTextBad | [ ] |
| content-icon-label | IconLabelGood | IconLabelBad | [ ] |
| content-number-format | NumberFormatGood | NumberFormatBad | [ ] |
| content-truncate-middle | TruncateMiddleGood | TruncateMiddleBad | [ ] |
| content-url-shorten | UrlShortenGood | UrlShortenBad | [ ] |
| content-time-absolute | TimeAbsoluteGood | TimeAbsoluteBad | [ ] |
| content-label-data | LabelDataGood | LabelDataBad | [ ] |
| content-title-context | TitleContextGood | TitleContextBad | [ ] |
| content-favicon-state | FaviconStateGood | FaviconStateBad | [ ] |
| content-translate | TranslateGood | TranslateBad | [ ] |
| content-metadata-sharing | MetadataSharingGood | MetadataSharingBad | [ ] |
| content-meta-refresh | MetaRefreshGood | MetaRefreshBad | [ ] |
| content-error-explain | ErrorExplainGood | ErrorExplainBad | [ ] |
| content-empty-state | EmptyStateGood | EmptyStateBad | [ ] |
| content-loading-skeleton | LoadingSkeletonGood | LoadingSkeletonBad | [ ] |

---

#### 3.4 Animations (8 principles)
**Priority**: Medium

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| animations-reduced-motion | ReducedMotionGood | ReducedMotionBad | [ ] |
| animations-duration | DurationGood | DurationBad | [ ] |
| animations-compositor | CompositorGood | CompositorBad | [ ] |
| animations-explicit-properties | ExplicitPropertiesGood | ExplicitPropertiesBad | [ ] |
| animations-cancel-friendly | CancelFriendlyGood | CancelFriendlyBad | [ ] |
| animations-scroll-driven | ScrollDrivenGood | ScrollDrivenBad | [ ] |
| animations-dimension-transition | DimensionTransitionGood | DimensionTransitionBad | [ ] |
| animations-avoid-layout | AvoidLayoutGood | AvoidLayoutBad | [ ] |

---

#### 3.5 Design (7 principles)
**Priority**: Medium

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| design-pixel-snapping | PixelSnappingGood | PixelSnappingBad | [ ] |
| design-subpixel-alignment | SubpixelAlignmentGood | SubpixelAlignmentBad | [ ] |
| design-color-scheme | ColorSchemeGood | ColorSchemeBad | [ ] |
| design-theme-toggle | ThemeToggleGood | ThemeToggleBad | [ ] |
| design-accent-color | AccentColorGood | AccentColorBad | [ ] |
| design-selection-style | SelectionStyleGood | SelectionStyleBad | [ ] |
| design-scrollbar-style | ScrollbarStyleGood | ScrollbarStyleBad | [ ] |

---

#### 3.6 Layout (6 principles)
**Priority**: Medium

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| layout-responsive | ResponsiveGood | ResponsiveBad | [ ] |
| layout-zoom-friendly | ZoomFriendlyGood | ZoomFriendlyBad | [ ] |
| layout-viewport-meta | ViewportMetaGood | ViewportMetaBad | [ ] |
| layout-overflow-handling | OverflowHandlingGood | OverflowHandlingBad | [ ] |
| layout-safe-area | SafeAreaGood | SafeAreaBad | [ ] |
| layout-virtual-keyboard | VirtualKeyboardGood | VirtualKeyboardBad | [ ] |

---

#### 3.7 Performance (7 principles)
**Priority**: Medium

| Principle ID | Good Example | Bad Example | Review Status |
|--------------|--------------|-------------|---------------|
| performance-debounce | DebounceGood | DebounceBad | [ ] |
| performance-optimistic-ui | OptimisticUiGood | OptimisticUiBad | [ ] |
| performance-lazy-loading | LazyLoadingGood | LazyLoadingBad | [ ] |
| performance-virtualization | VirtualizationGood | VirtualizationBad | [ ] |
| performance-resource-hints | ResourceHintsGood | ResourceHintsBad | [ ] |
| performance-image-sizing | ImageSizingGood | ImageSizingBad | [ ] |
| performance-font-loading | FontLoadingGood | FontLoadingBad | [ ] |

---

### Task 4: Cross-Cutting Concerns

#### 4.1 Accessibility Review
- [ ] All examples use semantic HTML appropriately
- [ ] ARIA attributes used correctly where needed
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader testing performed

#### 4.2 Code Consistency
- [ ] All examples follow the same coding style
- [ ] Consistent use of Tailwind classes
- [ ] Proper TypeScript typing
- [ ] No console warnings or errors

#### 4.3 Visual Consistency
- [ ] Example containers have consistent styling
- [ ] Good/bad distinction is clear visually
- [ ] Dark mode support in all examples
- [ ] Responsive behavior in examples

---

## Review Checklist Template

For each principle review, verify:

```markdown
### [Principle ID]

**Source Links**:
- [ ] URL is valid and accessible
- [ ] Link text accurately describes the source
- [ ] Points to relevant section

**Agent Rule**:
- [ ] Priority level is appropriate
- [ ] Rule text matches principle intent
- [ ] Actionable and clear

**Good Example**:
- [ ] Clearly demonstrates the principle
- [ ] Code is clean and follows best practices
- [ ] Works correctly (no errors)
- [ ] Accessible

**Bad Example**:
- [ ] Shows realistic anti-pattern
- [ ] Clearly demonstrates what NOT to do
- [ ] Contrast with good example is obvious
- [ ] Educational (explains the problem)
```

---

## Acceptance Criteria

This epic is complete when:

1. [ ] All 82 principles have valid, working source links
2. [ ] All 91 agent rules accurately reflect their principles
3. [ ] All 164 example components effectively demonstrate their principles
4. [ ] Good/bad example pairs provide clear contrast
5. [ ] No broken links or missing references
6. [ ] Documentation of any issues found and fixes applied
7. [ ] Standalone agent rules evaluated for potential principle creation

---

## Progress Tracking

| Category | Total | Reviewed | Issues Found | Fixed |
|----------|-------|----------|--------------|-------|
| Interactions | 23 | 0 | 0 | 0 |
| Forms | 15 | 0 | 0 | 0 |
| Content | 16 | 0 | 0 | 0 |
| Animations | 8 | 0 | 0 | 0 |
| Design | 7 | 0 | 0 | 0 |
| Layout | 6 | 0 | 0 | 0 |
| Performance | 7 | 0 | 0 | 0 |
| **Total** | **82** | **0** | **0** | **0** |

---

## Related Files

- `src/data/principles.ts` - Principle definitions
- `src/data/agentRules.ts` - Agent rules
- `src/components/examples/` - Example components
- `src/types/principle.ts` - Type definitions
- `doc/vercel-web-guides.md` - Source guidelines
- `doc/vercel-web-guides-agent.md` - Agent rules source

---

*Epic created: 2026-01-18*
*Last updated: 2026-01-18*
