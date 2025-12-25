import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { User } from "../models/user";

test("An error message displays when user tries to login with blank password", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const user = new User({ password: "" });

  await homePage.navigateToHomePage();

  await homePage.navigateToLogin();
  await loginPage.login(user);
  await loginPage.shouldBlankPasswordErrorVisible();
});
