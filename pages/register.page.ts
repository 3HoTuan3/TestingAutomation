import { Locator, Page } from "@playwright/test";

export class RegisterPage {
    private readonly page: Page;
    private readonly usernameTxt: Locator;
    private readonly passwordTxt: Locator;
    private readonly confirmPasswordTxt: Locator;
    private readonly pidTxt: Locator;
    private readonly registerBtn: Locator;
    private readonly errorMsg: Locator;
    private readonly emailValidationLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTxt = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordTxt = this.page.locator('#password');
        this.confirmPasswordTxt = this.page.locator('#confirmPassword');
        this.pidTxt = this.page.getByLabel('PID');
        this.registerBtn = this.page.getByRole('button', { name: /register/i });

        this.errorMsg = this.page.locator('div#content p.message.error');
        this.emailValidationLabel = this.page.locator('label.validation-error[for="email"]');
    }

    async register(username: string, password: string, confirmPassword: string, pid: string): Promise<void> {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.confirmPasswordTxt.fill(confirmPassword);
        await this.pidTxt.fill(pid);
        await this.registerBtn.click();
        await this.page.waitForTimeout(300);
    }

    async checkRegisterSuccess(): Promise<void> {
        await this.page.waitForSelector('div#content:has-text("You\'re here")', { state: 'visible' });
    }

    async getRegisterAlreadyUseText(): Promise<string> {
        await this.errorMsg.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.errorMsg.textContent()) ?? '';
    }

    async isRegisterErrorVisible(): Promise<boolean> {
        return await this.errorMsg.isVisible().catch(() => false);
    }

    async getEmailValidationText(): Promise<string> {
        await this.emailValidationLabel.waitFor({ state: 'visible', timeout: 3000 }).catch(() => { });
        return (await this.emailValidationLabel.textContent()) ?? '';
    }

    async getFormErrorText(): Promise<string> {
        await this.errorMsg.waitFor({ state: 'visible', timeout: 3000 }).catch(() => { });
        return (await this.errorMsg.textContent()) ?? '';
    }

    async isEmailValidationVisible(): Promise<boolean> {
        return await this.emailValidationLabel.waitFor({ state: 'visible', timeout: 1500 }).then(() => true).catch(() => false);
    }
}