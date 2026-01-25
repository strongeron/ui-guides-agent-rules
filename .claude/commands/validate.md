# /validate - Principle Validation Workflow

Run comprehensive validation of all 200+ principles with screenshots and beads tracking.

## Usage

```
/validate              # Run full validation
/validate visual       # Start visual review with screenshots
/validate fix          # Fix identified issues
/validate status       # Check validation progress
```

## Workflow

### 1. Run Automated Validation

```bash
npm run validate:comprehensive
```

This runs all validation phases:
- Field completeness check
- Source links validation
- Agent rules alignment
- Theme support analysis

### 2. Initialize Beads Tracking

```bash
bd update web-ui_guide_react-43b --status=in_progress
```

### 3. Review Results

Check generated reports:
- `doc/comprehensive-validation.md` - Summary report
- `doc/validation-results.json` - Detailed validation data
- `doc/agent-rules-alignment.json` - Rule alignment data

### 4. Dark Mode Visual Validation

Capture screenshots in both light and dark modes to verify theme support:

```bash
# Sample 20 principles (fast, for CI)
npm run validate:dark-mode

# All principles (comprehensive)
npm run validate:dark-mode:all

# Specific principle
npx tsx scripts/validate-dark-mode-screenshots.ts --principle forms-enter-submits
```

Screenshots are saved to `.playwright-mcp/dark-mode-validation/`.

### 5. Visual Review (if needed)

Launch parallel agents to review examples:

```
For each category, launch a visual review agent:
- interactions (43 principles)
- animations (25 principles)
- forms (21 principles)
- design (33 principles)
- content (26 principles)
- layout + performance (34 principles)
- aesthetics (18 principles)
```

### 6. Fix Issues

Priority order:
1. **P1 Critical** - Broken functionality
2. **P2 High** - Broken links, missing examples
3. **P2 Medium** - Theme issues, rule misalignment
4. **P3 Low** - Redirected links, minor issues

### 7. Capture Before/After Screenshots

```bash
# Before fixing
npx tsx scripts/capture-screenshots.ts comparison [principle-id] before

# After fixing
npx tsx scripts/capture-screenshots.ts comparison [principle-id] after

# Mark as fixed
npx tsx scripts/visual-validation.ts fix "[id]" "[fix description]"
```

### 8. Generate Final Report

```bash
npm run validate:report
npx tsx scripts/visual-validation.ts report
```

### 9. Close Beads Tasks

```bash
bd close [task-id] --reason="Fixed X issues"
bd sync
```

## Current Tasks

```bash
bd list --labels=validation
```

## Files

| File | Purpose |
|------|---------|
| `scripts/validate-principles.ts` | Field + theme check |
| `scripts/check-source-links.ts` | URL validation |
| `scripts/validate-agent-rules.ts` | Rule alignment |
| `scripts/validate-dark-mode-screenshots.ts` | Dark/light mode screenshots |
| `scripts/visual-validation.ts` | Issue tracking |
| `scripts/capture-screenshots.ts` | Screenshots |
| `scripts/validate-all-comprehensive.ts` | Combined runner |
