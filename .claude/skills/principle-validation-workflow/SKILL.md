# Principle Validation Workflow

Comprehensive validation workflow for 200+ principles using parallel agents, screenshot capture, and beads tracking.

## Trigger

Use this skill when:
- User runs `/validate` command
- User asks to validate principles
- User wants to review example quality
- User needs to fix theme or link issues

## Quick Commands

| Command | Description |
|---------|-------------|
| `/validate` | Run full automated validation |
| `/validate:visual` | Start visual review with screenshots |
| `/validate:fix` | Fix identified issues |
| `/validate:status` | Check validation progress |

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  VALIDATION WORKFLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Phase 1: Automated Checks                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Fields   │  │ Links    │  │ Theme    │                  │
│  │ Check    │→ │ Check    │→ │ Analysis │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│       ↓              ↓             ↓                        │
│  ┌─────────────────────────────────────┐                   │
│  │     Generate Initial Report         │                   │
│  └─────────────────────────────────────┘                   │
│                      ↓                                      │
│  Phase 2: Visual Review (Parallel Agents)                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│  │ Agent 1 │ │ Agent 2 │ │ Agent 3 │ │ Agent 4 │         │
│  │ inter.  │ │ anim+   │ │ design  │ │ content │         │
│  │ forms   │ │ layout  │ │ perf    │ │ aesth   │         │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘         │
│       │           │           │           │               │
│       └───────────┴───────────┴───────────┘               │
│                      ↓                                      │
│  ┌─────────────────────────────────────┐                   │
│  │     Merge Findings + Screenshots     │                   │
│  └─────────────────────────────────────┘                   │
│                      ↓                                      │
│  Phase 3: Fix Issues                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │ Links   │ │ Theme   │ │ Examples│                      │
│  │ Fixer   │ │ Fixer   │ │ Fixer   │                      │
│  └────┬────┘ └────┬────┘ └────┬────┘                      │
│       │           │           │                            │
│       └───────────┴───────────┘                            │
│                      ↓                                      │
│  ┌─────────────────────────────────────┐                   │
│  │  Before/After Screenshots + Report   │                   │
│  └─────────────────────────────────────┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Automated Validation

### Step 1.1: Run Scripts

```bash
# Initialize beads tracking
bd update web-ui_guide_react-43b --status=in_progress

# Run all automated checks
npm run validate:all
```

### Step 1.2: Review Results

Files generated:
- `doc/validation-results.json` - Field completeness + theme
- `doc/source-links-results.json` - Link check results
- `doc/validation-report.md` - Summary report

### Step 1.3: Initialize Visual Validation

```bash
# Create visual validation data from automated results
npm run validate:init
```

## Phase 2: Visual Review (Parallel Agents)

### Agent Assignment

Launch 4 parallel agents using Task tool:

| Agent | Subagent Type | Categories | Principles |
|-------|--------------|------------|------------|
| 1 | `kieran-typescript-reviewer` | interactions, forms | 64 |
| 2 | `kieran-typescript-reviewer` | animations, layout | 37 |
| 3 | `kieran-typescript-reviewer` | design, performance | 55 |
| 4 | `kieran-typescript-reviewer` | content, aesthetics | 44 |

### Agent Prompt Template

```
## Visual Review: [CATEGORIES]

Review principles in [CATEGORIES] category.

### Setup
1. Dev server at http://localhost:5173
2. Screenshots go to doc/screenshots/

### For Each Principle

1. **Navigate**: Go to http://localhost:5173/#[principle-id]

2. **Screenshot Before**: Capture current state
   ```bash
   npx tsx scripts/capture-screenshots.ts comparison [id] before
   ```

3. **Review Checklist**:
   - [ ] Good example clearly demonstrates principle
   - [ ] Bad example shows realistic anti-pattern
   - [ ] Visual difference is immediately apparent
   - [ ] Works in light mode
   - [ ] Works in dark mode (toggle or emulate)
   - [ ] No console errors
   - [ ] Keyboard accessible (if interaction principle)

4. **Document Issues**: For each problem found:
   ```bash
   npx tsx scripts/visual-validation.ts add "[id]" "[category]" "[title]" "[issue]" "[severity]"
   ```

5. **If Fixed**: Capture after screenshot
   ```bash
   npx tsx scripts/capture-screenshots.ts comparison [id] after
   npx tsx scripts/visual-validation.ts fix "[id]" "[fix description]"
   ```

### Output Format

Report as JSON:
```json
{
  "agent": 1,
  "categories": ["interactions", "forms"],
  "reviewed": 64,
  "issuesFound": [
    {
      "principleId": "...",
      "issue": "...",
      "severity": "critical|high|medium|low",
      "screenshot": "screenshots/...-before-light.png"
    }
  ],
  "fixed": []
}
```
```

### Beads Tracking During Review

```bash
# Mark review tasks as in_progress
bd update web-ui_guide_react-e8c --status=in_progress  # interactions
bd update web-ui_guide_react-39a --status=in_progress  # forms
```

## Phase 3: Fix Issues

### Issue Priority

| Priority | Type | Fix Approach |
|----------|------|--------------|
| P1 | Broken links | Find replacement or remove |
| P2 | Missing examples | Create component pair |
| P2 | Theme issues | Add dark: classes |
| P3 | Redirected links | Update to final URL |

### Fix Subagents

#### Link Fixer Agent

```
Fix broken source links from doc/source-links-results.json.

For each error:
1. Search for updated URL using WebSearch
2. Update in src/data/principles.ts
3. Run: npm run validate:links to verify

Track: bd update web-ui_guide_react-64x --status=in_progress
```

#### Theme Fixer Agent

```
Add dark mode to examples in [CATEGORY].

Pattern replacements:
- bg-white → bg-white dark:bg-zinc-900
- bg-gray-50 → bg-gray-50 dark:bg-zinc-800
- text-gray-900 → text-gray-900 dark:text-gray-100
- border-gray-200 → border-gray-200 dark:border-zinc-700

For each file:
1. Read component
2. Add dark: variants
3. Capture before/after screenshots
4. Update visual-validation with fix details

Track: bd update web-ui_guide_react-eyf --status=in_progress
```

## Screenshot Workflow

### Capture Commands

```bash
# Single principle
npx tsx scripts/capture-screenshots.ts single [id] before
npx tsx scripts/capture-screenshots.ts single [id] after

# Comparison (Good vs Bad side-by-side)
npx tsx scripts/capture-screenshots.ts comparison [id] before

# Batch (all with issues in category)
npx tsx scripts/capture-screenshots.ts batch before [category]

# Full category
npx tsx scripts/capture-screenshots.ts category [name] before
```

### Screenshot Naming

```
doc/screenshots/
├── [principle-id]-before-light.png
├── [principle-id]-before-dark.png
├── [principle-id]-after-light.png
├── [principle-id]-after-dark.png
└── [principle-id]-before-comparison-light.png
```

## Report Generation

### Visual Report

```bash
# Generate markdown report with screenshots
npx tsx scripts/visual-validation.ts report
```

Output: `doc/visual-validation-report.md`

### Report Structure

```markdown
# Visual Validation Report

## Summary
| Severity | Count |
|----------|-------|
| 🔴 Critical | X |
| 🟠 High | X |
| 🟡 Medium | X |
| 🟢 Low | X |
| ✅ Fixed | X |

## Critical Issues

### principle-id

**Issue**: Description

#### Before (Problem)
| Light Mode | Dark Mode |
|------------|-----------|
| ![Light](before-light.png) | ![Dark](before-dark.png) |

#### After (Fixed)
| Light Mode | Dark Mode |
|------------|-----------|
| ![Light](after-light.png) | ![Dark](after-dark.png) |

#### Fix Applied
```diff
- bg-white
+ bg-white dark:bg-zinc-900
```
```

## Beads Integration

### Task Structure

```
Epic: Principle Validation (web-ui_guide_react-43b)
├── Fix broken source links (web-ui_guide_react-64x)
├── Update redirected links (web-ui_guide_react-4gn)
├── Add dark mode support (web-ui_guide_react-eyf)
├── Visual review: interactions (web-ui_guide_react-e8c)
├── Visual review: animations (web-ui_guide_react-aj3)
├── Visual review: forms (web-ui_guide_react-39a)
├── Visual review: design+content+aesthetics (web-ui_guide_react-hh4)
└── Visual review: layout+performance (web-ui_guide_react-th4)
```

### Workflow Commands

```bash
# Check available work
bd ready

# Start working on a task
bd update [id] --status=in_progress

# Close completed task
bd close [id] --reason="Fixed X issues, see visual-validation-report.md"

# Sync at session end
bd sync
```

## Validation Checklist

### Per-Principle Review

- [ ] **Data Complete**: All fields populated
- [ ] **Examples Exist**: Good/Bad components found
- [ ] **Links Valid**: Source URLs return 200
- [ ] **Theme Support**: Works in light/dark modes
- [ ] **Visual Clear**: Good/Bad difference obvious
- [ ] **Functional**: No console errors
- [ ] **Accessible**: Keyboard navigable (if applicable)
- [ ] **Screenshots**: Before/after captured

### Quality Criteria for Examples

**Good Example Must**:
- Demonstrate the principle correctly
- Use semantic HTML
- Be keyboard accessible
- Work in both themes
- Have no console errors

**Bad Example Must**:
- Show realistic anti-pattern
- Be clearly different from Good
- Explain why it's problematic
- Not break the page

## Files Reference

| File | Purpose |
|------|---------|
| `scripts/validate-principles.ts` | Field + theme check |
| `scripts/check-source-links.ts` | URL validation |
| `scripts/generate-validation-report.ts` | Markdown summary |
| `scripts/visual-validation.ts` | Issue tracking + report |
| `scripts/capture-screenshots.ts` | Playwright screenshots |
| `doc/validation-results.json` | Automated check data |
| `doc/source-links-results.json` | Link check data |
| `doc/validation-report.md` | Summary report |
| `doc/visual-validation-data.json` | Visual issues data |
| `doc/visual-validation-report.md` | Visual report |
| `doc/screenshots/` | Screenshot images |
