import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test("User can login successfully with valid account", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login();
  await homePage.shouldWelcomeMsgVisible("testrail@gmail.com");
});
