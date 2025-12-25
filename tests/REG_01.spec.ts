import { faker } from '@faker-js/faker';
import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { User } from "../models/user";

test('REG_01 - Register new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    const email = faker.internet.email();
    const password = faker.internet.password();
    const PID = faker.string.numeric(9);
    const user = new User({ username: email, password: password, confirmPassword: password, pid: PID });

    await homePage.navigateToHomePage();
    await homePage.navigateToRegister();
    
    test.step(`Register with email: ${email}`, async () => {
        await registerPage.register(user);
    });
    await registerPage.checkRegisterSuccess();
});