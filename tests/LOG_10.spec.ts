import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { User } from "../models/user";

test("An error message is displayed when user enters HTML/script tags in Password fields", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const user = new User({ password: "<h1>Hello World!</h1>" });

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login(user);

  await loginPage.shouldErrorMessageVisible();
});
