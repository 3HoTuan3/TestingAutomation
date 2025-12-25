import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";

test("An error message is displayed when user login with incorrect password", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  await homePage.navigateToHomePage();
  const user = new User({ password: faker.internet.password() });

  await homePage.navigateToLogin();
  await loginPage.login(user);
  await loginPage.shouldErrorMessageVisible();
});
