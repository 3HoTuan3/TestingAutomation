import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { faker } from "@faker-js/faker";

test.describe("REG_13 - Navigation links on Register page", () => {
    test("Login link navigates to Login page", async ({ page }) => {
        const home = new HomePage(page);
        const register = new RegisterPage(page);

        await home.navigateToHomePage();
        await home.navigateToRegister();

        await test.step("Click login link and verify navigation", async () => {
            await register.clickLoginLink();
            await test.step("Verify at Login page", async () => {
                const ok = await register.isAtLoginPage();
                expect(ok).toBeTruthy();
            });
            // additionally
            // e.g. await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
        });
    });

    test("Confirm link navigates to Confirm page", async ({ page }) => {
        const home = new HomePage(page);
        const register = new RegisterPage(page);

        await home.navigateToHomePage();
        await home.navigateToRegister();

        await test.step("Click confirm link and verify navigation", async () => {
            await register.clickConfirmLink();
            await test.step("Verify at Confirm page", async () => {
                const ok = await register.isAtConfirmPage();
                expect(ok).toBeTruthy();
            });
            // optionally
            // e.g. await expect(page.locator('text=confirmation code')).toBeVisible();
        });
    });
});