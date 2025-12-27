import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ContactPage } from "../pages/contact.page";

// Test that the email address is a functional mailto link

test('The Email address is a functional mailto link', async ({ page }) => {
    await test.step("Navigate to Contact Page", async () => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.navigateToContact();
    });
    await test.step("Verify Email link functionality", async () => {
        const contactPage = new ContactPage(page);
        await contactPage.shouldEmailLinkBeFunctional();
    });
});
