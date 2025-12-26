import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { HomePage } from "../pages/home.page";
import { faker } from "@faker-js/faker";

const getInvalidEmailsList = (): { type: string, email: string }[] => {
    const local = faker.internet.username().replace(/\s+/g, '');
    const domain = faker.internet.domainName();
    return [
        { type: "No @", email: local + domain },
        { type: "Multiple @", email: `${local}@${domain}@com` },
        { type: "Dot at start", email: `.${local}@${domain}` },
        { type: "Dot at end of local", email: `${local}.@${domain}` },
        { type: "Missing domain", email: `${local}@` },
        { type: "Missing local", email: `@${domain}` },
        { type: "Special chars", email: `${local}#$@${domain}` },
        { type: "Space in email", email: `${local} ${domain}` }
    ];
};

test.describe('REG_05 - Error when registering with invalid email format', () => {
    test(`should show error for generated invalid email`, async ({ page }) => {
        const homePage = new HomePage(page);
        const registerPage = new RegisterPage(page);

        // Chọn 1 email invalid duy nhất từ danh sách (ngẫu nhiên)
        const chosen = faker.helpers.arrayElement(getInvalidEmailsList());
        const email = chosen.email;
        const caseType = chosen.type;

        const password = faker.internet.password();
        const PID = faker.string.numeric(9);
        const user = { username: email, password: password, confirmPassword: password, pid: PID };

        await homePage.navigateToHomePage();
        await homePage.navigateToRegister();
        await test.step(`Register with invalid email format (${caseType}): ${email}`, async () => {
            await registerPage.register(user);
        });

        await test.step("Check error message is shown for invalid email format", async () => {
            // Top general error
            await test.step("Check general form error is shown", async () => {
                expect(await registerPage.isRegisterErrorVisible()).toBeTruthy();
                const topText = await registerPage.getFormErrorText();
                expect(topText).toMatch(/errors in the form/i);
            });

            await test.step("Check email validation label is shown", async () => {
                expect(await registerPage.isEmailValidationVisible()).toBeTruthy();
                const emailValidation = await registerPage.getEmailValidationText();
                expect(emailValidation).toMatch(/invalid|invalid email|invalid email address/i);
            });
        });
    });
});