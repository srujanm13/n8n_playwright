Files added:
- .gitignore
- src/pages/RegistrationPage.ts (Playwright page object for the registration form)
- src/tests/registration.spec.ts (Playwright test for the registration flow)

How to run the tests (basic):
1) Install dependencies (node + npm):
   npm init -y
   npm i -D @playwright/test
   npx playwright install

2) Optional: add a Playwright config (playwright.config.ts) and set a baseURL, for example:
   // playwright.config.ts
   // import { defineConfig } from '@playwright/test';
   // export default defineConfig({ use: { baseURL: 'http://localhost:3000' } });

3) Run tests:
   npx playwright test

Notes:
- The selectors used in RegistrationPage.ts are generic (input[name="firstName"], etc.). Please update selectors to match your application's markup.
- The test checks for either a navigation to a success-like URL (contains "welcome", "dashboard", or "home") or a visible element with selector .success-message. Adjust these to your app's behavior.
- If you prefer, I can also add a Playwright config file, package.json scripts, or create a branch/PR instead of committing to main.
