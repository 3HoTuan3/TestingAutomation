import { expect, Locator, Page } from "@playwright/test";

export class ContactPage {
    private readonly page: Page;
    private readonly phone: Locator;
    private readonly skype: Locator;
    private readonly email: Locator;

    constructor(page: Page) {
        this.page = page;
        this.phone = this.page.locator('b', { hasText: 'Phone:' });
        this.skype = this.page.locator('b', { hasText: 'Skype:' });
        this.email = this.page.locator('b', { hasText: 'Email:' });
    }

    async shouldContactDetailsBeVisibleAndCorrect(): Promise<void> {
        await expect(this.phone).toBeVisible();
        await expect(this.skype).toBeVisible();
        await expect(this.email).toBeVisible();

        // Extract the actual value next to the <b> tag
        const phoneValue = (await this.phone.evaluate(node => node.nextSibling?.textContent?.trim() || ''));
        const skypeValue = (await this.skype.evaluate(node => node.nextSibling?.textContent?.trim() || ''));
        // For email, get the next sibling <a> and its text
        const emailLink = await this.email.evaluateHandle(node => node.parentElement.querySelector('a[href^="mailto:"]'));
        const emailValue = emailLink ? (await emailLink.evaluate((el: any) => el.textContent?.trim() || '')) : '';

        expect(phoneValue).not.toBe('');
        expect(skypeValue).not.toBe('');
        expect(emailValue).not.toBe('');
    }
}
