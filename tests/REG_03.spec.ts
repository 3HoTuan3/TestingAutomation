import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";

test('REG_03 - Error when registering with invalid email domain', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);

    const generateNonGmailEmail = (): string => {
        let domain: string;
        let local: string;
        let email: string;
        do {
            domain = faker.internet.domainName();
            if (domain.toLowerCase().includes("gmail")) continue;
            local = faker.internet.username().replace(/[^\w.-]/g, "");
            const maxLocal = 32 - 1 - domain.length;
            if (maxLocal < 1) {
                domain = "example.com";
            }
            const finalMaxLocal = Math.max(1, 32 - 1 - domain.length);
            if (local.length > finalMaxLocal) local = local.substring(0, finalMaxLocal);
            email = `${local}@${domain}`;
        } while (email.length > 32 || domain.toLowerCase().includes("gmail"));
        return email;
    };

    const email = generateNonGmailEmail();
    const password = faker.internet.password();
    const PID = faker.string.numeric(9);
    const user = new User({ username: email, password: password, confirmPassword: password, pid: PID });

    await test.step('Navigate to Register Page', async () => {
        await homePage.navigateToHomePage();
        await homePage.navigateToRegister();
    });

    await test.step(`Register with invalid email domain: ${email}`, async () => {
        await registerPage.register(user);
    });
    await test.step("Verify error message is shown for invalid email domain", async () => {
        await test.step("Check error message is shown for invalid email domain", async () => {
            const isVisible = await registerPage.isRegisterErrorVisible();
            expect(isVisible).toBeTruthy();
        });

        await test.step("Check error message text", async () => {
            const errorText = await registerPage.getRegisterAlreadyUseText();
            expect(errorText).toMatch(/email domain is not authorized|not authorized email domain/i);
        });
    });
    // await page.pause();
});