import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly navBarLogin: Locator;
    private readonly navChangePassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBarLogin = this.page.getByRole('link', {
            name: 'Login'
        });
        this.navChangePassword = this.page.getByRole('link', {
            name: 'Change password'
        });
    }

    async navigateToLogin(): Promise<void> {
        await this.navBarLogin.click();
    }


    async navigateToChangePassword(): Promise<void> {
        await this.navChangePassword.click();
    }

    // Thay đổi: nhận email (tuỳ chọn) và kiểm tra welcome message
    async shouldWelcomeMsgVisible(email: string): Promise<void> {
        const welcomeMsg = this.page.getByText(`Welcome ${email}`);
        await expect(welcomeMsg).toBeVisible();
    }
}