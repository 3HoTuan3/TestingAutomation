import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test('An error message is displayed when user enters HTML/script tags in Email fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const email = '<h1>Hello World!</h1>';
    const password = '123456789';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
    await homePage.navigateToLogin();
    await loginPage.login(email, password);

    // Check for server error message in the page content
    await page.waitForLoadState('domcontentloaded');
    await test.expect(page).toHaveTitle(/A potentially dangerous Request.Form value was detected/);
    await test.expect(page.locator('body')).toContainText('A potentially dangerous Request.Form value was detected from the client');
});
