import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { User } from "../models/user";
import { RegisterPage } from "../pages/register.page";
import { faker } from "@faker-js/faker";

test('REG_02 - Error when registering with an existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    const email = faker.internet.email();
    const password = faker.internet.password();
    const PID = faker.string.numeric(9);
    const user = new User({ username: email, password: password, confirmPassword: password, pid: PID });

    await homePage.navigateToHomePage();
    await homePage.navigateToRegister();

    // 1) register first time
    await test.step(`Register with email: ${email}`, async () => {
        await registerPage.register(user);
    });

    await registerPage.checkRegisterSuccess();

    // 2) try to register again with same email
    await homePage.navigateToRegister();
    await test.step(`Register with email: ${email}`, async () => {
        await registerPage.register(user);
    });

    // assert error shown
    await test.step("Check error message is shown for existing email", async () => {
        const err = await registerPage.getRegisterAlreadyUseText();
        expect(err).toMatch(/already|exists|in use/i);
    });
});