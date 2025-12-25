import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test("All links work properly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.shouldRegistrationLinkWork();
  await loginPage.shouldForgotPasswordLinkWork();
});
