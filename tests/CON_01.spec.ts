import test from "@playwright/test";
import { ContactPage } from "../pages/contact.page";
import { HomePage } from "../pages/home.page";

test('All contact details (Phone, Skype, Email) are visible and correct', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToContact();
    const contactPage = new ContactPage(page);
    await contactPage.shouldContactDetailsBeVisibleAndCorrect();
});
