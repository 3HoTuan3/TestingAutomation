import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";

test.describe('REG_10 - Error when Confirm Password is not the same as Password', () => {
    test('Show error when confirm password differs', async ({ page }) => {
        const homePage = new HomePage(page);
        const registerPage = new RegisterPage(page);

        const email = faker.internet.email();
        const password = faker.internet.password();
        const confirmPassword = password + faker.string.alpha(3);
        const pid = faker.string.numeric(9);
        const user = new User({ username: email, password, confirmPassword, pid });

        await test.step('Navigate to Register Page', async () => {
            await homePage.navigateToHomePage();
            await homePage.navigateToRegister();
        });

        await test.step('Register with mismatched confirm password', async () => {
            await registerPage.register(user);
        });

        await test.step('Verify error messages', async () => {
            await test.step('Check global error message', async () => {
                // Check lỗi chung
                const visible = await registerPage.isRegisterErrorVisible();
                expect(visible).toBeTruthy();
                const formErr = await registerPage.getRegisterAlreadyUseText();
                expect(formErr).toMatch(/There're errors in the form|errors in the form/i);
            });

            await test.step('Confirm-password field validation shown', async () => {
                // Check lỗi confirm password ở form
                const isVisible = await registerPage.isConfirmPasswordValidationVisible();
                expect(isVisible).toBeTruthy();
                const confirmLabel = await registerPage.getConfirmPasswordValidationLabelText();
                expect(confirmLabel).toMatch(/do not | do not match /i);
            });
        });
    });
});