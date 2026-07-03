// SRUJ-31 Playwright test
// This test expects an element specific to SRUJ-31 to be present on the app's main page.
// It uses BASE_URL environment variable if provided, otherwise falls back to https://example.com

import { test, expect } from '@playwright/test';

test('SRUJ-31: validate presence of SRUJ-31 element', async ({ page }) => {
  const baseUrl = process.env.BASE_URL ?? 'https://example.com';
  await page.goto(baseUrl);

  // Primary selectors to look for. Adjust to your app's actual selector for SRUJ-31.
  const selector = '[data-test="sruj-31"], #sruj-31, [aria-label="SRUJ-31"]';

  // Wait for element to appear and assert visibility
  const locator = page.locator(selector);
  await expect(locator).toBeVisible({ timeout: 15000 });
});
