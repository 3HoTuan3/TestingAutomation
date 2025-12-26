import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";

function generateEmailWithLength(length: number): string {
    if (length <= 0) return "";
    if (length < 5) {
        if (length >= 3) {
            const suffix = "@b";
            return "a".repeat(length - suffix.length) + suffix;
        }
        return "a".repeat(length);
    }
    const suffix = "@b.c"; 
    const localPartLength = length - suffix.length;
    return "a".repeat(localPartLength) + suffix;
}

// Danh sách độ dài cần test
const testData = [
    { len: 1, type: "Too Short (< 6)" },
    { len: 4, type: "Too Short (< 6)" },
    { len: 5, type: "Too Short (< 6)" },
    { len: 33, type: "Too Long (> 32)" },
    { len: 100, type: "Too Long (> 32)" },
    { len: 255, type: "Too Long (> 32)" },
    { len: 256, type: "Too Long (> 32)" }
];

test.describe('REG_06 - Error when registering with invalid email length', () => {
    for (const data of testData) {
        test(`Case ${data.type}: Length ${data.len}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const registerPage = new RegisterPage(page);

            const email = generateEmailWithLength(data.len);
            const password = faker.internet.password();
            const PID = faker.string.numeric(9);
            const user = { username: email, password: password, confirmPassword: password, pid: PID };

            // console.log(`Testing with email: ${email} (Length: ${email.length})`);

            await test.step('Navigate to Register Page', async () => {
                await homePage.navigateToHomePage();
                await homePage.navigateToRegister();
            });

            await test.step(`Register with email length ${data.len}`, async () => {
                await registerPage.register(user);
            });

            await test.step("Verify error message", async () => {
                await test.step("Check global error message", async () => {
                    // Check lỗi chung
                    const formErr = await registerPage.getRegisterAlreadyUseText();
                    expect(formErr).toMatch(/There're errors in the form|errors in the form/i);
                });
                await test.step("Check email length error message at form", async () => {
                    // Check lỗi độ dài email ở form
                    const labelText = await registerPage.getEmailValidationText();
                    expect(labelText).toMatch(/invalid email length|length/i);
                });
            });
        });
    }
});