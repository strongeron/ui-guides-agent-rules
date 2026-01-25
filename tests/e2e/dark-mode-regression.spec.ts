import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '../..');

// Get principle IDs from the data file
function getPrincipleIds(): string[] {
  const principlesPath = join(rootDir, 'src/data/principles.ts');
  const content = readFileSync(principlesPath, 'utf-8');
  const idMatches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
  return Array.from(idMatches, (m) => m[1]);
}

const principleIds = getPrincipleIds();

test.describe('Dark mode visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

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

      // Navigate to principle
      await page.goto(`/#${principleId}`);
      await page.waitForTimeout(500);

      // Ensure light mode
      const themeSwitch = page.locator('[aria-label*="Switch to"]');
      const label = await themeSwitch.getAttribute('aria-label');
      if (label?.includes('light')) {
        await themeSwitch.click();
        await page.waitForTimeout(300);
      }

      // Take screenshot and compare
      await expect(page).toHaveScreenshot(`${principleId}-light.png`, {
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

      // Navigate to principle
      await page.goto(`/#${principleId}`);
      await page.waitForTimeout(500);

      // Ensure dark mode
      const themeSwitch = page.locator('[aria-label*="Switch to"]');
      const label = await themeSwitch.getAttribute('aria-label');
      if (label?.includes('dark')) {
        await themeSwitch.click();
        await page.waitForTimeout(300);
      }

      // Take screenshot and compare
      await expect(page).toHaveScreenshot(`${principleId}-dark.png`, {
        maxDiffPixels: 100,
        threshold: 0.2,
      });
    });
  }
});

test.describe('Theme toggle functionality', () => {
  test('switches between light and dark mode correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeSwitch = page.locator('[aria-label*="Switch to"]');

    // Get initial state
    const initialLabel = await themeSwitch.getAttribute('aria-label');
    const initialIsDark = initialLabel?.includes('light');

    // Toggle theme
    await themeSwitch.click();
    await page.waitForTimeout(300);

    // Verify toggle worked
    const newLabel = await themeSwitch.getAttribute('aria-label');
    const newIsDark = newLabel?.includes('light');

    expect(newIsDark).not.toBe(initialIsDark);

    // Toggle back
    await themeSwitch.click();
    await page.waitForTimeout(300);

    const finalLabel = await themeSwitch.getAttribute('aria-label');
    const finalIsDark = finalLabel?.includes('light');

    expect(finalIsDark).toBe(initialIsDark);
  });
});
