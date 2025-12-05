import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

function makeEmailWithLocalPartLength(len: number) {
    const local = 'a'.repeat(len);
    return `${local}@example.com`;
}

const tooShort = [1, 4, 5]; // local-part lengths < 6
const tooLong = [33, 100, 255, 256]; // local-part lengths > 32

test.describe('REG_06 - Error when registering with invalid email length', () => {
    for (const len of [...tooShort, ...tooLong]) {
        test(`should show error for local-part length ${len}`, async ({ page }) => {
            const registerPage = new RegisterPage(page);
            const email = makeEmailWithLocalPartLength(len);
            const password = '123456789';

            await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
            await page.getByRole('link', { name: 'Register' }).click();

            await registerPage.register(email, password, password, '123456789');

            // assert label next to Email field is shown and has correct text
            expect(await registerPage.isEmailValidationVisible()).toBeTruthy();
            const labelText = await registerPage.getEmailValidationText();
            expect(labelText).toMatch(/invalid email length|length/i);

            // assert global form error message is shown
            const formErr = await registerPage.getFormErrorText();
            expect(formErr).toMatch(/There're errors in the form|errors in the form/i);
        });
    }
});