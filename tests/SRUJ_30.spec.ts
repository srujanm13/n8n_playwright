import { test, expect, type Page } from '@playwright/test';

const REGISTER_URL = 'https://rahulshettyacademy.com/client/#/auth/register';
const INVALID_EMAILS = ['plainaddress', 'user@.com', 'user@domain', 'user@domain,com'];

async function fillRegistrationFormWithEmail(page: Page, email: string): Promise<void> {
  await page.goto(REGISTER_URL, { waitUntil: 'domcontentloaded' });

  await expect(page.locator('#firstName')).toBeVisible();

  await page.locator('#firstName').fill('Srujan');
  await page.locator('#lastName').fill('Tester');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userMobile').fill('9876543210');
  await page.locator('select[formcontrolname="occupation"]').selectOption({ label: 'Engineer' });
  await page.locator('input[formcontrolname="gender"][value="Male"]').check({ force: true });
  await page.locator('#userPassword').fill('Password@123');
  await page.locator('#confirmPassword').fill('Password@123');
  await page.locator('input[formcontrolname="required"]').check({ force: true });
}

test.describe('SRUJ-30 - Email format validation', () => {
  for (const invalidEmail of INVALID_EMAILS) {
    test(`blocks registration and shows email validation error for: ${invalidEmail}`, async ({ page }) => {
      await test.step('Enter invalid email while all other registration fields are valid', async () => {
        await fillRegistrationFormWithEmail(page, invalidEmail);
      });

      await test.step('Click Register', async () => {
        await page.locator('#login').click();
      });

      await test.step('Verify email validation error is displayed and registration is blocked', async () => {
        // The app shows either inline "*Enter Valid Email" text or a toast "Enter Valid Email!",
        // depending on the invalid email format submitted.
        await expect(page.locator('text=/Enter Valid Email/i').first()).toBeVisible({ timeout: 5000 });

        // Registration should be blocked: user remains on the registration page and the email field is still present.
        await expect(page).toHaveURL(/\/client\/#\/auth\/register/);
        await expect(page.locator('#userEmail')).toBeVisible();
        await expect(page.locator('#userEmail')).toHaveValue(invalidEmail);
      });
    });
  }
});
