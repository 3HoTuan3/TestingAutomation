import test from "@playwright/test";
import { ContactPage } from "../pages/contact.page";

test('All contact details (Phone, Skype, Email) are visible and correct', async ({ page }) => {
    await page.goto('http://railwayb2.somee.com/Page/Contact.cshtml');
    const contactPage = new ContactPage(page);
    await contactPage.shouldContactDetailsBeVisibleAndCorrect();
});
