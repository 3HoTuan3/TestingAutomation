import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test('An error message is displayed when user login with invalid password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const email = 'cijnuj@ramcloud.us';
    const invalidPassword = 'wrongpassword123';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');

    await homePage.navigateToLogin();
    await loginPage.login(email, invalidPassword);
    await loginPage.shouldErrorMessageVisible();
});
