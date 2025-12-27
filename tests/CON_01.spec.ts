import test from "@playwright/test";
import { ContactPage } from "../pages/contact.page";
import { HomePage } from "../pages/home.page";

test('All contact details (Phone, Skype, Email) are visible and correct', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Navigate to Contact Page", async () => {
        await homePage.navigateToHomePage();
        await homePage.navigateToContact();
    });
    
    await test.step("Verify contact details", async () => {
        const contactPage = new ContactPage(page);
        await contactPage.shouldContactDetailsBeVisibleAndCorrect();
    });
});
