import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";

const testData = [
    { len: 1, type: "Too Short (< 8)" },
    { len: 5, type: "Too Short (< 8)" },
    { len: 7, type: "Too Short (< 8)" },
    { len: 8, type: "Too Short (< 8)" },
    { len: 20, type: "Too Long (> 20)" },
    { len: 21, type: "Too Long (> 20)" },
    { len: 100, type: "Too Long (> 20)" },
    { len: 255, type: "Too Long (> 20)" },
    { len: 256, type: "Too Long (> 20)" },
];

function makePid(length: number): string {
    if (length <= 0) return "";
    return faker.string.numeric(length);
}

test.describe.parallel("REG_11 - Error when registering with invalid PID/Passport number length", () => {
    for (const data of testData) {
        test(`Case ${data.type}: PID length ${data.len}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const registerPage = new RegisterPage(page);

            const email = faker.internet.email();
            const password = faker.internet.password();
            const pid = makePid(data.len);
            const user = new User({ username: email, password, confirmPassword: password, pid });

            await test.step("Navigate to Register Page", async () => {
                await homePage.navigateToHomePage();
                await homePage.navigateToRegister();
            });

            await test.step(`Register with PID length ${data.len}`, async () => {
                await registerPage.register(user);
            });

            await test.step("Verify error messages", async () => {
                await test.step("Check global error message", async () => {
                    expect(await registerPage.isRegisterErrorVisible()).toBeTruthy();
                    const top = await registerPage.getRegisterAlreadyUseText();
                    expect(top).toMatch(/There're errors in the form|errors in the form/i);
                });

                await test.step("Check PID field validation shown", async () => {
                    expect(await registerPage.isPidValidationVisible()).toBeTruthy();
                    const pidLabel = await registerPage.getPidValidationText();
                    expect(pidLabel).toMatch(/invalid id length|invalid id|length|id/i);
                });
            });
        });
    }
});