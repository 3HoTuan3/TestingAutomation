import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";

const specialPool = [
    '!',
    '#',
    '%',
    '😊',
    '`',
    '{',
    '~',
    '$',
    '&',
    '*',
    '+',
    '='
];

test.describe('REG_04 - Error when registering with special characters in email', () => {
        test(`should show error for invalid email - random special`, async ({ page }) => {
            const homePage = new HomePage(page);
            const registerPage = new RegisterPage(page);

            const baseEmail = faker.internet.email();
            const [local, domain] = baseEmail.split('@');
            const count = Math.random() < 0.5 ? 2 : 4;
            const special = Array.from({ length: count }, () => faker.helpers.arrayElement(specialPool)).join('');
            const insertAt = Math.floor(Math.random() * (local.length + 1));
            
            const email = `${local.slice(0, insertAt)}${special}${local.slice(insertAt)}@${domain}`;
            const password = faker.internet.password();
            const PID = faker.string.numeric(9);
            const user = { username: email, password: password, confirmPassword: password, pid: PID };

            await homePage.navigateToHomePage();
            await homePage.navigateToRegister();
            await test.step(`Register with invalid email contain special characters: ${email}`, async () => {
                await registerPage.register(user);
            });

            await test.step("Check error message is shown for invalid email with special characters", async () => {
                const visible = await registerPage.isRegisterErrorVisible();
                expect(visible).toBeTruthy();
                const text = await registerPage.getRegisterAlreadyUseText();
                expect(text).toMatch(/invalid|invalid email|special|characters|not allowed|already in use/i);
            });
        });
});