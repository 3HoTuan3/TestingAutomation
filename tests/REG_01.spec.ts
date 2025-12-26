import test from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { User } from "../models/user";

const emailLengths = [6, 7, 18, 31, 32];
const passwordLengths = [8, 9, 32, 63, 64];
const pidLengths = [8, 9, 15, 19, 20];

function generateEmailWithLength(len: number): string {
    if (len <= 0) return "";
    const smallSuffix = "@b.c"; // 4 chars
    if (len <= smallSuffix.length) return faker.string.alpha(len);
    const localLen = Math.max(1, len - smallSuffix.length);
    const local = faker.string.alpha(localLen);
    return `${local}${smallSuffix}`;
}

function generatePasswordWithLength(len: number): string {
    if (len <= 0) return "";
    return faker.string.alphanumeric(len);
}

function generatePidWithLength(len: number): string {
    if (len <= 0) return "";
    return faker.string.numeric(len);
}

test.describe.parallel("REG_01 - Register new account (boundary lengths)", () => {
    test.describe("REG_01a - Register with valid email lengths", () => {
        for (const eLen of emailLengths) {
            test(`Email length ${eLen}`, async ({ page }) => {
                const homePage = new HomePage(page);
                const registerPage = new RegisterPage(page);

                const email = generateEmailWithLength(eLen);
                const password = generatePasswordWithLength(12);
                const pid = generatePidWithLength(9);
                const user = new User({ username: email, password, confirmPassword: password, pid });

                await test.step('Navigate to Register Page', async () => {
                    await homePage.navigateToHomePage();
                    await homePage.navigateToRegister();
                });

                await test.step(`Register with email length ${eLen}`, async () => {
                    await registerPage.register(user);
                });

                await registerPage.checkRegisterSuccess();
            });
        }
    });

    test.describe("REG_01b - Register with valid password lengths", () => {
        for (const pLen of passwordLengths) {
            test(`Password length ${pLen}`, async ({ page }) => {
                const homePage = new HomePage(page);
                const registerPage = new RegisterPage(page);

                const email = generateEmailWithLength(18); 
                const password = generatePasswordWithLength(pLen);
                const pid = generatePidWithLength(9);
                const user = new User({ username: email, password, confirmPassword: password, pid });

                await test.step('Navigate to Register Page', async () => {
                    await homePage.navigateToHomePage();
                    await homePage.navigateToRegister();
                });
                
                await test.step(`Register with password length ${pLen}`, async () => {
                    await registerPage.register(user);
                });

                await registerPage.checkRegisterSuccess();
            });
        }
    });

    test.describe("REG_01c - Register with valid PID lengths", () => {
        for (const pidLen of pidLengths) {
            test(`PID length ${pidLen}`, async ({ page }) => {
                const homePage = new HomePage(page);
                const registerPage = new RegisterPage(page);

                const email = generateEmailWithLength(18);
                const password = generatePasswordWithLength(12);
                const pid = generatePidWithLength(pidLen);
                const user = new User({ username: email, password, confirmPassword: password, pid });

                await test.step('Navigate to Register Page', async () => {
                    await homePage.navigateToHomePage();
                    await homePage.navigateToRegister();
                });

                await test.step(`Register with PID length ${pidLen}`, async () => {
                    await registerPage.register(user);
                });

                await registerPage.checkRegisterSuccess();
            });
        }
    });
});