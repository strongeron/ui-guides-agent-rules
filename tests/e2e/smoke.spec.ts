import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  // The title is set per principle, so match the suffix the app always appends
  // rather than a fixed string.
  await expect(page).toHaveTitle(/UI Guides & Agent Rules$/);
});
