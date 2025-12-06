import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

/**
 * Tạo chuỗi email có tổng độ dài = len (bao gồm cả '@' và domain).
 * Nếu len < 3 sẽ trả về chuỗi không chứa '@' (để test validation).
 */
function makeEmailWithTotalLength(len: number) {
    if (len <= 0) return '';
    if (len < 3) return 'a'.repeat(len); // không đủ để có '@', vẫn dùng để trigger validation
    // đảm bảo có ít nhất 1 ký tự local và 1 ký tự domain
    let domainLen = 1;
    let localLen = len - 1 - domainLen; // trừ '@' và domainLen
    if (localLen < 1) { // nếu local bị âm hoặc 0, tăng domainLen
        localLen = 1;
        domainLen = Math.max(1, len - 2);
    }
    const local = 'a'.repeat(localLen);
    const domain = 'b'.repeat(domainLen);
    return `${local}@${domain}`; // ví dụ: "a@b", "aa@b", "aaa@bb", ...
}

const tooShort = [1, 4, 5]; // tổng độ dài < 6
const tooLong = [33, 100, 255, 256]; // tổng độ dài > 32

test.describe('REG_06 - Error when registering with invalid email length', () => {
    for (const len of [...tooShort, ...tooLong]) {
        test(`should show error for total email length ${len}`, async ({ page }) => {
            const registerPage = new RegisterPage(page);
            const email = makeEmailWithTotalLength(len);
            const password = '123456789';

            await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');
            await page.getByRole('link', { name: 'Register' }).click();

            await registerPage.register(email, password, password, '123456789');

            // assert label next to Email field is shown and has correct text
            expect(await registerPage.isEmailValidationVisible()).toBe(true);
            const labelText = await registerPage.getEmailValidationText();
            expect(labelText).toMatch(/invalid email length|length/i);

            // assert global form error message is shown
            const formErr = await registerPage.getFormErrorText();
            expect(formErr).toMatch(/There're errors in the form|errors in the form/i);
        });
    }
});