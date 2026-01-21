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
      await expect(page.getByText('From the Guidelines:')).toBeVisible();
      await expect(page.getByText('Additional Context:')).toBeVisible();
      await expect(page.getByText('Bad Example')).toBeVisible();
      await expect(page.getByText('Good Example')).toBeVisible();
      await expect(page.getByText('Example Coming Soon')).toHaveCount(0);

      const screenshot = await page.screenshot({ fullPage: true });
      await test.info().attach(`principle-${principleId}`, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  }
});
