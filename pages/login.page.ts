import { expect, Locator, Page } from "@playwright/test";
import { User } from "../models/user";

export class LoginPage {
  private readonly page: Page;
  private readonly usernameTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly loginBtn: Locator;
  public static readonly DEFAULT_USERNAME: string = "testrail@gmail.com";
  public static readonly DEFAULT_PASSWORD: string = "123456789";

  constructor(page: Page) {
    this.page = page;
    // this.usernameTxt = this.page.getByRole('textbox', { name: 'Email' });
    this.usernameTxt = this.page.getByLabel("Email");
    this.passwordTxt = this.page.getByLabel("Password");
    this.loginBtn = this.page.getByRole("button", { name: "login" });
  }

  async login(user: User) {
    await this.usernameTxt.fill(user.username);
    await this.passwordTxt.fill(user.password);
    await this.loginBtn.click();
  }

  async shouldErrorMessageVisible(): Promise<void> {
    const errorMsg = this.page.locator("p.message.error.LoginForm");
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(
      "Invalid username or password. Please try again.",
    );
  }

  async shouldBlankEmailErrorVisible(): Promise<void> {
    const generalErrorMsg = this.page.locator("p.message.error.LoginForm");
    await expect(generalErrorMsg).toBeVisible();
    await expect(generalErrorMsg).toContainText(
      "There was a problem with your login and/or errors exist in your form.",
    );

    const usernameValidationError = this.page.locator(
      'label[for="username"].validation-error',
    );
    await expect(usernameValidationError).toBeVisible();
    await expect(usernameValidationError).toContainText(
      "You must specify a username.",
    );
  }

  async shouldBlankPasswordErrorVisible(): Promise<void> {
    const generalErrorMsg = this.page.locator("p.message.error.LoginForm");
    await expect(generalErrorMsg).toBeVisible();
    await expect(generalErrorMsg).toContainText(
      "There was a problem with your login and/or errors exist in your form.",
    );

    const passwordValidationError = this.page.locator(
      'label[for="password"].validation-error',
    );
    await expect(passwordValidationError).toBeVisible();
    await expect(passwordValidationError).toContainText(
      "You must specify a password.",
    );
  }

  async shouldPasswordFieldBeHidden(): Promise<void> {
    const passwordInput = this.page.locator('input#password[type="password"]');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
  }

  async shouldRegistrationLinkWork(): Promise<void> {
    const registrationLink = this.page.locator('a[href="Register.cshtml"]');
    await expect(registrationLink).toBeVisible();
    await expect(registrationLink).toContainText("Registration Page");
  }

  async shouldForgotPasswordLinkWork(): Promise<void> {
    const forgotPasswordLink = this.page.locator(
      'a[href="/Account/ForgotPassword.cshtml"]',
    );
    await expect(forgotPasswordLink).toBeVisible();
    await expect(forgotPasswordLink).toContainText("Forgot Password page");
  }
}
