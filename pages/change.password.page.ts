import { expect, Locator, Page } from "@playwright/test";
import { User } from "../models/user";

export class ChangePasswordPage {
  private readonly page: Page;
  private readonly currentPasswordTxt: Locator;
  private readonly newPasswordTxt: Locator;
  private readonly confirmPasswordTxt: Locator;
  private readonly changePasswordBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentPasswordTxt = this.page.getByLabel("Current Password");
    this.newPasswordTxt = this.page.getByLabel("New Password");
    this.confirmPasswordTxt = this.page.getByLabel("Confirm Password");
    this.changePasswordBtn = this.page.getByRole("button", {
      name: "change password",
    });
  }

  async changePassword(
    user: User,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    await this.currentPasswordTxt.fill(user.password);
    await this.newPasswordTxt.fill(newPassword);
    await this.confirmPasswordTxt.fill(confirmPassword);
    await this.changePasswordBtn.click();
  }

  async errorMessageVisible(message: string): Promise<void> {
    const errorMessage = this.page.getByText(message);
    await expect(errorMessage).toBeVisible();
  }

  async shouldComponentsVisible(): Promise<void> {
    const formLegend = this.page.getByText("Change Password Form");
    const currentPasswordLabel = this.page.getByText("Current Password");
    const newPasswordLabel = this.page.getByText("New Password");
    const confirmPasswordLabel = this.page.getByText("Confirm Password");
    const changePasswordBtn = this.page.locator("input[type=submit]");

    await expect(currentPasswordLabel).toBeVisible();
    await expect(newPasswordLabel).toBeVisible();
    await expect(confirmPasswordLabel).toBeVisible();
    await expect(changePasswordBtn).toBeVisible();
    await expect(formLegend).toBeVisible();
  }
}
