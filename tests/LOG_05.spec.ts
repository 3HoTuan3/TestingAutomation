import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test("An error message displays when user tries to login with blank password", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();

  await homePage.navigateToLogin();
  await loginPage.login(LoginPage.DEFAULT_USERNAME, "");
  await loginPage.shouldBlankPasswordErrorVisible();
});
