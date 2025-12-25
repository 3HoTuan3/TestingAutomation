import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { User } from "../models/user";

test("User can login successfully with valid account", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const user = new User();

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login(user);
  await homePage.shouldWelcomeMsgVisible("testrail@gmail.com");
});
