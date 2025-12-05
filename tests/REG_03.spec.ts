import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

test('REG_03 - Error when registering with invalid email domain', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    // domain gmail.com/hotmail.com được coi là invalid theo yêu cầu test
    const email = `hotuan${Date.now()}@gmail.com`;
    const password = '123456789';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
    await page.getByRole('link', { name: 'Register' }).click();

    await registerPage.register(email, password, password, '123456789');

    // ensure error message is visible and contains expected text about domain/invalid
    const isVisible = await registerPage.isRegisterErrorVisible();
    expect(isVisible).toBeTruthy();

    const errText = await registerPage.getRegisterAlreadyUseText();
    expect(errText).toMatch(/domain|invalid|not allowed|already in use/i);
});