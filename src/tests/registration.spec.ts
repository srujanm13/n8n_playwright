import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Registration flow', () => {
  test('should register a new user successfully', async ({ page, baseURL }) => {
    const registration = new RegistrationPage(page);
    // If baseURL is set in Playwright config, pass it; otherwise the page.goto uses a relative path
    await registration.goto(baseURL ?? '');

    const timestamp = Date.now();
    const email = `user+${timestamp}@example.com`;

    await registration.register({
      firstName: 'Test',
      lastName: 'User',
      email,
      password: 'P@ssw0rd123',
    });

    // Wait for either a navigation to a success page or a visible success message.
    let success = false;
    try {
      await page.waitForURL(/(welcome|dashboard|home)/, { timeout: 5000 });
      success = true;
    } catch (e) {
      // ignore
    }

    if (!success) {
      try {
        await page.locator(registration.successMessage).waitFor({ state: 'visible', timeout: 5000 });
        success = true;
      } catch (e) {
        // ignore
      }
    }

    expect(success).toBeTruthy();
  });
});
