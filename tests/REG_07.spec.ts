import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";
// 1. là dùng này đơn giản đối với hệ thống không có yêu cầu phức tạp về mật khẩu
// const testData = [
//     { len: 1, type: "Too Short (< 8)" },
//     { len: 5, type: "Too Short (< 8)" },
//     { len: 7, type: "Too Short (< 8)" },
//     { len: 65, type: "Too Long (> 64)" },
//     { len: 100, type: "Too Long (> 64)" },
//     { len: 255, type: "Too Long (> 64)" },
//     { len: 256, type: "Too Long (> 64)" }
// ];

// 2. Hàm tạo mật khẩu với độ dài tùy ý, đảm bảo có đủ loại ký tự
const generateFakerPassword = (len: number): string => {
    if (len < 4) {
        return faker.string.alphanumeric(len); 
    }

    const upper = faker.string.alpha({ length: 1, casing: 'upper' }); // 1 Chữ hoa
    const lower = faker.string.alpha({ length: 1, casing: 'lower' }); // 1 Chữ thường
    const number = faker.string.numeric(1);                           // 1 Số
    const special = faker.string.symbol(1);                           // 1 Ký tự đặc biệt (!@#...)

    const remainingLength = len - 4;
    const rest = faker.string.alphanumeric(remainingLength);

    return `${upper}${lower}${number}${special}${rest}`;
};

const testData = [
    { len: 1, type: "Too Short (< 8)" },
    { len: 5, type: "Too Short (< 8)" },
    { len: 7, type: "Too Short (< 8)" },
    { len: 65, type: "Too Long (> 64)" },
    { len: 100, type: "Too Long (> 64)" },
    { len: 255, type: "Too Long (> 64)" },
    { len: 256, type: "Too Long (> 64)" }
];

test.describe('REG_07 - Error when registering with invalid password length', () => {
    for (const data of testData) {
        test(`Case ${data.type}: Length ${data.len}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const registerPage = new RegisterPage(page);

            const email = faker.internet.email();
            // const password = "A".repeat(data.len);
            const password = generateFakerPassword(data.len);
            const pid = faker.string.numeric(9);
            const user = new User({ username: email, password, confirmPassword: password, pid });

            await test.step('Navigate to Register Page', async () => {
                await homePage.navigateToHomePage();
                await homePage.navigateToRegister();
            });

            await test.step(`Register with password length ${data.len}`, async () => {
                await registerPage.register(user);
            });

            await test.step('Verify error message', async () => {
                await test.step('Check global error message', async () => {
                    const formErr = await registerPage.getRegisterAlreadyUseText();
                    expect(formErr).toMatch(/There're errors in the form|errors in the form/i);
                });

                await test.step('Check password validation label at form', async () => {
                    const visible = await registerPage.isPasswordValidationVisible();
                    expect(visible).toBeTruthy();
                    const labelText = await registerPage.getPasswordValidationText();
                    expect(labelText).toMatch(/invalid password length|length|password/i);
                });
            });
        });
    }
});