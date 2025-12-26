import { test, Locator, Page } from "@playwright/test";
import { User } from "../models/user";

export class RegisterPage {
  private readonly page: Page;
  private readonly usernameTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly confirmPasswordTxt: Locator;
  private readonly pidTxt: Locator;
  private readonly registerBtn: Locator;
  private readonly errorMsg: Locator;
  private readonly emailValidationLabel: Locator;
  private readonly passwordValidationLabel: Locator;
  private readonly confirmPasswordValidationLabel: Locator;
  private readonly pidValidationLabel: Locator;
  private readonly loginLink: Locator;
  private readonly confirmLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTxt = this.page.getByRole("textbox", { name: "Email" });
    this.passwordTxt = this.page.locator("#password");
    this.confirmPasswordTxt = this.page.locator("#confirmPassword");
    this.pidTxt = this.page.getByLabel("PID");
    this.registerBtn = this.page.getByRole("button", { name: /register/i });

    this.errorMsg = this.page.locator("div#content p.message.error");
    this.emailValidationLabel = this.page.locator(
      'label.validation-error[for="email"]',
    );
    this.passwordValidationLabel = this.page.locator(
      'label.validation-error[for="password"]',
    );
    this.confirmPasswordValidationLabel = this.page.locator(
      'label.validation-error[for="confirmPassword"]',
    );
    this.pidValidationLabel = this.page.locator(
      'label.validation-error[for="pid"]',
    );
    // Prefer role-based locators by visible link text to avoid strict-mode collisions
    this.loginLink = this.page.getByRole("link", { name: /login/i });
    this.confirmLink = this.page.getByRole("link", { name: /here/i });
  }

  async register(user: User): Promise<void> {
    await this.usernameTxt.fill(user.username);
    await this.passwordTxt.fill(user.password);
    await this.confirmPasswordTxt.fill(user.confirmPassword);
    await this.pidTxt.fill(user.pid);
    await this.registerBtn.click();
    await this.page.waitForLoadState("networkidle").catch(() => { });
  }

  async checkRegisterSuccess(): Promise<void> {
    await test.step("Verify register success message is displayed", async () => {
      await this.page.waitForSelector('div#content:has-text("You\'re here")', {
        state: "visible",
      });
    });
  }

  async getRegisterAlreadyUseText(): Promise<string> {
    await this.errorMsg.waitFor({ state: "visible", timeout: 5000 });
    return (await this.errorMsg.textContent()) ?? "";
  }

  async isRegisterErrorVisible(): Promise<boolean> {
    return await this.errorMsg.isVisible().catch(() => false);
  }

  async getEmailValidationText(): Promise<string> {
    await this.emailValidationLabel
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => { });
    return (await this.emailValidationLabel.textContent()) ?? "";
  }

  async getPasswordValidationText(): Promise<string> {
    await this.passwordValidationLabel
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => { });
    return (await this.passwordValidationLabel.textContent()) ?? "";
  }

  async isPasswordValidationVisible(): Promise<boolean> {
    return await this.passwordValidationLabel
      .waitFor({ state: "visible", timeout: 1500 })
      .then(() => true)
      .catch(() => false);
  }

  async getFormErrorText(): Promise<string> {
    await this.errorMsg
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => { });
    return (await this.errorMsg.textContent()) ?? "";
  }

  async isEmailValidationVisible(): Promise<boolean> {
    return await this.emailValidationLabel
      .waitFor({ state: "visible", timeout: 1500 })
      .then(() => true)
      .catch(() => false);
  }

  async getConfirmPasswordValidationLabelText(): Promise<string> {
    await this.confirmPasswordValidationLabel
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => { });
    return (await this.confirmPasswordValidationLabel.textContent()) ?? "";
  }

  async isConfirmPasswordValidationVisible(): Promise<boolean> {
    return await this.confirmPasswordValidationLabel
      .waitFor({ state: "visible", timeout: 1500 })
      .then(() => true)
      .catch(() => false);
  }

  async getPidValidationText(): Promise<string> {
    await this.pidValidationLabel
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => { });
    return (await this.pidValidationLabel.textContent()) ?? "";
  }

  async isPidValidationVisible(): Promise<boolean> {
    return await this.pidValidationLabel
      .waitFor({ state: "visible", timeout: 1500 })
      .then(() => true)
      .catch(() => false);
  }

  async getPidFormatValidationText(): Promise<string> {
    await this.pidValidationLabel
      .waitFor({ state: "visible", timeout: 3000 })
      .catch(() => { });
    return (await this.pidValidationLabel.textContent()) ?? "";
  }

  async isPidFormatValidationVisible(): Promise<boolean> {
    return await this.pidValidationLabel
      .waitFor({ state: "visible", timeout: 1500 })
      .then(() => true)
      .catch(() => false);
  }

  async clickLoginLink(): Promise<void> {
    await test.step("Click Login link", async () => {
      await this.loginLink.first().click();
    });
  }

  async clickConfirmLink(): Promise<void> {
    await test.step("Click Confirm link", async () => {
      await this.confirmLink.first().click();
    });
  }

  async getLoginLinkInfo(): Promise<{ text: string; href: string }> {
    const el = this.loginLink.first();
    const text = (await el.textContent()) ?? "";
    const href = (await el.getAttribute("href")) ?? "";
    return { text: text.trim(), href };
  }

  async getConfirmLinkInfo(): Promise<{ text: string; href: string }> {
    const el = this.confirmLink.first();
    const text = (await el.textContent()) ?? "";
    const href = (await el.getAttribute("href")) ?? "";
    return { text: text.trim(), href };
  }

  async isAtLoginPage(timeout = 3000): Promise<boolean> {
    try {
      await this.page.waitForURL(/Login\.cshtml/, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isAtConfirmPage(timeout = 3000): Promise<boolean> {
    try {
      await this.page.waitForURL(/Confirm\.cshtml/, { timeout });
      return true;
    } catch {
      return false;
    }
  }
}