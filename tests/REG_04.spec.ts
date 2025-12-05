import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

const invalidEmails = [
    `hotuan!${Date.now()}@example.com`,
    `hotuan#${Date.now()}@example.com`,
    `hotuan%${Date.now()}@example.com`,
    `hotuan..${Date.now()}@example.com`,
    `hotuan😊${Date.now()}@example.com`,
    `hotuan\`${Date.now()}@example.com`,
    `hotuan{${Date.now()}@example.com`
];

test.describe('REG_04 - Error when registering with special characters in email', () => {
    for (const email of invalidEmails) {
        test(`should show error for invalid email: ${email}`, async ({ page }) => {
            const registerPage = new RegisterPage(page);
            const password = '123456789';
            
            await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
            await page.getByRole('link', { name: 'Register' }).click();
            await registerPage.register(email, password, password, '123456789');

            const visible = await registerPage.isRegisterErrorVisible();
            expect(visible).toBeTruthy();

            const text = await registerPage.getRegisterAlreadyUseText();
            expect(text).toMatch(/invalid|invalid email|special|characters|not allowed|already in use/i);
        });
    }
});