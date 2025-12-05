import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

const invalidFormats = [
    "plainaddress",
    "missing-at-sign.com",
    "@missing-local.com",
    "missing-domain@",
    "missing-dot@domain",
    "space in@domain.com",
    "trailing-space@domain.com ",
    " leading@domain.com",
    "two@@signs@domain.com",
    "dot..double@domain.com"
];

test.describe('REG_05 - Error when registering with invalid email format', () => {
    for (const email of invalidFormats) {
        test(`should show error for invalid format: "${email}"`, async ({ page }) => {
            const registerPage = new RegisterPage(page);
            const password = '123456789';

            await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
            await page.getByRole('link', { name: 'Register' }).click();

            await registerPage.register(email, password, password, '123456789');

            // kiểm tra có thông báo lỗi hiển thị
            const visible = await registerPage.isRegisterErrorVisible();
            expect(visible).toBeTruthy();

            const text = await registerPage.getRegisterAlreadyUseText();
            expect(text).toMatch(/invalid|format|email|not valid|special|characters/i);
        });
    }
});