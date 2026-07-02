import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  // Selectors (adjust to your application's markup)
  readonly firstNameInput = 'input[name="firstName"]';
  readonly lastNameInput = 'input[name="lastName"]';
  readonly emailInput = 'input[name="email"]';
  readonly passwordInput = 'input[name="password"]';
  readonly confirmPasswordInput = 'input[name="confirmPassword"]';
  readonly submitButton = 'button[type="submit"]';
  readonly successMessage = '.success-message';

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the registration page. If Playwright baseURL is configured, pass it as baseUrl or leave empty to use relative path.
  async goto(baseUrl = '') {
    const url = baseUrl ? `${baseUrl}/register` : '/register';
    await this.page.goto(url);
  }

  // Fill and submit the registration form
  async register({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);
    await this.page.click(this.submitButton);
  }
}
