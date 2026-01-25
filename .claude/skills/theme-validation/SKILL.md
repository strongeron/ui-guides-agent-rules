# Theme Validation

Validate UI components and principles work correctly in both light and dark themes using Playwright screenshots.

## When to Use

Use this skill when:
- Adding new UI components that use color
- Creating or modifying aesthetics principles
- After making theme-related CSS changes
- Before committing color-heavy UI changes

## Workflow

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Navigate to principle** using Playwright:
   ```javascript
   // Use JavaScript to click sidebar buttons (handles scroll issues)
   () => {
     const buttons = Array.from(document.querySelectorAll('button'));
     const btn = buttons.find(b => b.textContent.includes('PRINCIPLE_NAME'));
     if (btn) { btn.scrollIntoView({ behavior: 'instant', block: 'center' }); btn.click(); }
   }
   ```

3. **Capture light mode screenshot**:
   ```javascript
   // Ensure light mode
   document.documentElement.classList.remove('dark');
   ```
   Save to: `screenshots/theme-validation/{num}-{principle-name}-light.png`

4. **Toggle to dark mode**:
   ```javascript
   document.documentElement.classList.add('dark');
   ```

5. **Capture dark mode screenshot**:
   Save to: `screenshots/theme-validation/{num}-{principle-name}-dark.png`

6. **Repeat for all target principles**

## Screenshot Naming Convention

```
screenshots/theme-validation/
├── 01-color-dominance-light.png
├── 01-color-dominance-dark.png
├── 02-design-variety-light.png
├── 02-design-variety-dark.png
└── ...
```

## Color-Heavy Principles to Validate

When doing a theme check, prioritize these aesthetics principles:
- Color Dominance (`aesthetics-color-dominance`)
- Design Variety (`aesthetics-design-variety`)
- Atmospheric Backgrounds (`aesthetics-atmospheric-backgrounds`)
- Design Commitment (`aesthetics-design-commitment`)
- Anti-Generic Design (`aesthetics-anti-generic`)

## Theme Strategy

**App Shell**: Uses semantic tokens that adapt to theme
- `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`

**Example Components**: May have explicit backgrounds
- "Bad" examples often use fixed colors to demonstrate specific issues
- "Good" examples should use semantic tokens when possible
- Styled demos (gradients, specific palettes) use explicit colors isolated from theme

## Validation Checklist

- [ ] Text is readable in both themes
- [ ] Contrast ratios meet accessibility standards
- [ ] Example components don't disappear into background
- [ ] Primary buttons have proper contrast with text
- [ ] Semantic colors (success, error) work in both themes
