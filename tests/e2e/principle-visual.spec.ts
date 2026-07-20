import { test, expect } from '@playwright/test';

const rawIds = process.env.PRINCIPLE_IDS ?? 'forms-enter-submits';
const principleIds = rawIds
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

test.describe('Principle visuals', () => {
  for (const principleId of principleIds) {
    test(`renders ${principleId} content and examples`, async ({ page }) => {
      await page.goto(`/#${principleId}`);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // The good/bad pair is the point of the page: assert the panels render
      // and that neither side fell back to the placeholder.
      const comparison = page.getByTestId('example-comparison');
      await expect(comparison).toBeVisible();
      await expect(comparison.getByText('Bad', { exact: true })).toBeVisible();
      await expect(comparison.getByText('Good', { exact: true })).toBeVisible();
      await expect(page.getByText('Example Coming Soon')).toHaveCount(0);

      // Guards the agent rule card, and that the copy button's accessible name
      // still matches its visible text (WCAG 2.5.3, a rule this corpus carries).
      await expect(page.getByRole('button', { name: 'Copy Rule' })).toBeVisible();

      const screenshot = await page.screenshot({ fullPage: true });
      await test.info().attach(`principle-${principleId}`, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  }
});
