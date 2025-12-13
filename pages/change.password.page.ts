import { expect, Locator, Page } from "@playwright/test";

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
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    await this.currentPasswordTxt.fill(currentPassword);
    await this.newPasswordTxt.fill(newPassword);
    await this.confirmPasswordTxt.fill(confirmPassword);
    await this.changePasswordBtn.click();
  }

  async errorMessageVisible(message: string): Promise<void> {
    const errorMessage = this.page.getByText(message);
    await expect(errorMessage).toBeVisible();
  }
}
