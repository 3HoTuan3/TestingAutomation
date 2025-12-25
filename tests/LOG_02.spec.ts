import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";

test("An error message is displayed when user login with non-existent account", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const nonExistentEmail = faker.internet.email();
  const tempPassword = faker.internet.password();

  await homePage.navigateToHomePage();

  await homePage.navigateToLogin();
  await loginPage.login(nonExistentEmail, tempPassword);
  await loginPage.shouldErrorMessageVisible();
});
