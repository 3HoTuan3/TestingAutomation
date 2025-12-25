import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";

test('An error message is displayed when user login with invalid password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    const invalidPassword = faker.internet.password();

    await homePage.navigateToLogin();
    await loginPage.login(LoginPage.DEFAULT_USERNAME, invalidPassword);
    await loginPage.shouldErrorMessageVisible();
});
