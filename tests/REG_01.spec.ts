import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";

test('REG_01 - Register new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    const email = `hotuan${Date.now()}@gmail.com`;
    const password = '123456789';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');

    // điều hướng tới Register từ Home
    await page.getByRole('link', { name: 'Register' }).click();

    await registerPage.register(email, password, password, '123456789');
    await registerPage.checkRegisterSuccess();
});