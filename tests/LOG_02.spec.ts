import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test('An error message is displayed when user login with non-existent account', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const nonExistentEmail = 'nonexistent@example.com';
    const password = '123456789';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');

    await homePage.navigateToLogin();
    await loginPage.login(nonExistentEmail, password);
    await loginPage.shouldErrorMessageVisible();
});


