import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test('User can login successfully with valid account', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const email = 'cijnuj@ramcloud.us';
    const password = '123456789';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
    await homePage.navigateToLogin();
    await loginPage.login(email, password);
    await homePage.shouldWelcomeMsgVisible(email);
});
