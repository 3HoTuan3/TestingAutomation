import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ContactPage } from "../pages/contact.page";

// Test that the email address is a functional mailto link

test('The Email address is a functional mailto link', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToContact();
    const contactPage = new ContactPage(page);
    await contactPage.shouldEmailLinkBeFunctional();
});
