import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";

test("An error message is displayed when user login with non-existent account", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const nonExistentUser = new User(faker.internet.email(), faker.internet.password()) 
  
  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login(nonExistentUser);
  await loginPage.shouldErrorMessageVisible();
});
