import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";

test("An error message displays when user tries to login with blank email", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");

  await homePage.navigateToLogin();
  await loginPage.login("", LoginPage.DEFAULT_PASSWORD);
  await loginPage.shouldBlankEmailErrorVisible();
});
