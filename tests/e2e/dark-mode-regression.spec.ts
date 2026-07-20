import { test, expect, type Page } from '@playwright/test';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '../..');

// Get principle IDs from the data modules. The corpus used to be one
// principles.ts; it is now one module per category, so read the directory
// rather than a single file. drafts.ts is excluded on purpose — draft entries
// are not in the `principles` array and have no page to screenshot.
function getPrincipleIds(): string[] {
  const dir = join(rootDir, 'src/data/principles');
  const ids: string[] = [];

  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    if (file === 'index.ts' || file === 'categories.ts' || file === 'drafts.ts') continue;

    const content = readFileSync(join(dir, file), 'utf-8');
    for (const m of content.matchAll(/id:\s*['"]([^'"]+)['"]/g)) ids.push(m[1]);
  }

  return ids;
}

const principleIds = getPrincipleIds();

async function gotoPrincipleWithTheme(
  page: Page,
  principleId: string,
  theme: 'light' | 'dark'
) {
  await page.addInitScript((value) => {
    localStorage.setItem('theme-preference', value);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(value);
  }, theme);

  await page.goto(`/#${principleId}`);
  await page.waitForTimeout(500);
}

async function getComparisonLocator(page: Page) {
  const comparison = page.locator('[data-testid="example-comparison"]');
  await comparison.waitFor({ state: 'visible', timeout: 5000 });
  await comparison.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  return comparison;
}

test.describe('Dark mode visual regression', () => {
  // Test a sample of principles (configurable via env var)
  const sampleSize = parseInt(process.env.VISUAL_SAMPLE_SIZE || '20', 10);
  const testPrinciples =
    process.env.VISUAL_TEST_ALL === 'true'
      ? principleIds
      : principleIds.slice(0, sampleSize);

  for (const principleId of testPrinciples) {
    test(`${principleId} matches light mode baseline`, async ({ page }) => {
      const baselinePath = join(
        rootDir,
        'tests/visual-baselines/light-mode',
        `${principleId}.png`
      );

      if (!existsSync(baselinePath)) {
        test.skip();
        return;
      }

      await gotoPrincipleWithTheme(page, principleId, 'light');
      const comparison = await getComparisonLocator(page);

      // Take screenshot and compare
      await expect(comparison).toHaveScreenshot(`${principleId}-light.png`, {
        maxDiffPixels: 100,
        threshold: 0.2,
      });
    });

    test(`${principleId} matches dark mode baseline`, async ({ page }) => {
      const baselinePath = join(
        rootDir,
        'tests/visual-baselines/dark-mode',
        `${principleId}.png`
      );

      if (!existsSync(baselinePath)) {
        test.skip();
        return;
      }

      await gotoPrincipleWithTheme(page, principleId, 'dark');
      const comparison = await getComparisonLocator(page);

      // Take screenshot and compare
      await expect(comparison).toHaveScreenshot(`${principleId}-dark.png`, {
        maxDiffPixels: 100,
        threshold: 0.2,
      });
    });
  }
});

test.describe('Theme toggle functionality', () => {
  test('switches between light and dark mode correctly', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme-preference', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeSwitch = page.locator('header').getByRole('switch', { name: /Switch to/i });
    const root = page.locator('html');

    // Get initial state
    const initialLabel = await themeSwitch.getAttribute('aria-label');
    const initialIsDark = initialLabel?.includes('light');
    const initialClass = await root.getAttribute('class');

    // Toggle theme
    await themeSwitch.click();
    await page.waitForTimeout(300);

    // Verify toggle worked
    const newLabel = await themeSwitch.getAttribute('aria-label');
    const newIsDark = newLabel?.includes('light');

    const newClass = await root.getAttribute('class');
    expect(newIsDark).not.toBe(initialIsDark);
    expect(newClass).not.toBe(initialClass);

    // Toggle back
    await themeSwitch.click();
    await page.waitForTimeout(300);

    const finalLabel = await themeSwitch.getAttribute('aria-label');
    const finalIsDark = finalLabel?.includes('light');
    const finalClass = await root.getAttribute('class');

    expect(finalIsDark).toBe(initialIsDark);
    expect(finalClass).toBe(initialClass);
  });
});
