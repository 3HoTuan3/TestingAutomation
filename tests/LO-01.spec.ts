import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { User } from "../models/user";

test("BT-LOGOUT: User is logged out when clicking Logout tab", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const user = new User();

  await test.step("Navigate to Login Page", async () => {
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
  });
  await test.step("Login with valid user", async () => {
    await loginPage.login(user);
  });

  await test.step("Click Logout", async () => {
    await homePage.logout();
    await homePage.verifyLoggedOut();
  });
});
