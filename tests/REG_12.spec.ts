import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";

const testData = [
    { case: "PID contains letters", pid: `A${faker.string.numeric(8)}` }, // length 9, has letter
    { case: "PID contains special chars", pid: `12${faker.string.symbol(1)}${faker.string.numeric(6)}` }, // special char inside
    { case: "PID contains non-printable", pid: `1234${String.fromCharCode(0)}${faker.string.numeric(4)}` }, // NUL inside
];

test.describe.parallel("REG_12 - Error when registering with invalid PID format", () => {
    for (const data of testData) {
        test(`${data.case}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const registerPage = new RegisterPage(page);

            const email = faker.internet.email();
            const password = faker.internet.password();
            const PID = data.pid;
            const user: User = new User({ username: email, password, confirmPassword: password, pid: PID });

            await test.step("Navigate to Register Page", async () => {
                await homePage.navigateToHomePage();
                await homePage.navigateToRegister();
            });

            await test.step(`Register with PID: (${data.case}) -> ${JSON.stringify(data.pid)}`, async () => {
                await registerPage.register(user);
            });

            await test.step("Verify validation messages", async () => {
                await test.step("General form error is shown", async () => {
                    expect(await registerPage.isRegisterErrorVisible()).toBeTruthy();
                    const top = await registerPage.getFormErrorText();
                    expect(top).toMatch(/errors in the form/i);
                });

                await test.step("PID field format validation shown", async () => {
                    expect(await registerPage.isPidFormatValidationVisible()).toBeTruthy();
                    const pidLabel = await registerPage.getPidFormatValidationText();
                    expect(pidLabel).toMatch(/invalid|format|numeric|digits|only numbers/i);
                });
            });
        });
    }
});