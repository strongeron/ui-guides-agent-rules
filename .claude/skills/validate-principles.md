# Validate Principles Skill

Use this skill to validate principles in the web-ui_guide_react project.

## Description

This skill runs the principle validation workflow to check:
- Field completeness for all principles
- Example component existence and theme support
- Source link validity
- Dark mode support in examples

## Commands

### Quick Validation
```bash
npm run validate
```
Runs the main principle validation (field completeness + theme analysis).

### Source Links Check
```bash
npm run validate:links
```
Checks all source URLs return 200 status.

### Generate Report
```bash
npm run validate:report
```
Aggregates all validation results into `doc/validation-report.md`.

### Full Validation
```bash
npm run validate:all
```
Runs all validation scripts in sequence.

## Parallel Visual Review Workflow

For visual review of examples, launch multiple agents to review in parallel:

### Phase 1: Split by Category
Each agent should review one category:

1. **Agent 1**: interactions (43 principles)
2. **Agent 2**: animations (25 principles)
3. **Agent 3**: forms (21 principles)
4. **Agent 4**: design (33 principles)
5. **Agent 5**: content (26 principles)
6. **Agent 6**: layout, performance, aesthetics (52 principles)

### Agent Task Template

Each visual review agent should:

1. Start dev server if not running: `npm run dev`
2. Navigate to http://localhost:5173
3. For each principle in assigned category:
   - Click the principle in sidebar
   - Compare Good vs Bad example
   - Verify visual difference is apparent
   - Toggle dark mode (if available)
   - Check for console errors
   - Note any issues found

### Output Format

Each agent reports:
```json
{
  "category": "interactions",
  "principlesReviewed": 43,
  "issues": [
    {
      "principleId": "interactions-clear-focus",
      "issue": "Focus ring not visible in dark mode",
      "severity": "medium"
    }
  ]
}
```

## Files Modified by Validation

- `doc/validation-results.json` - Principle validation results
- `doc/source-links-results.json` - Source link check results
- `doc/validation-report.md` - Human-readable report

## Common Issues Detected

1. **Missing dark mode support** - Add `dark:` Tailwind classes
2. **Hardcoded colors** - Use CSS variables or Tailwind theme colors
3. **Missing examples** - Create Good/Bad component pair
4. **Broken source links** - Update to current URLs

## Integration with Beads

Track validation work in beads:
```bash
bd create --title="Fix broken source links (20)" --type=task --priority=2
bd create --title="Add dark mode to examples" --type=task --priority=3
bd create --title="Visual review: interactions" --type=task --priority=2
```
