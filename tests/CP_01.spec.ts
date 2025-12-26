import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { User } from "../models/user";

test("UI of Change Password page displays properly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const changePasswordPage = new ChangePasswordPage(page);

  const user = new User();

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login(user);
  await homePage.navigateToChangePassword();
  await changePasswordPage.shouldComponentsVisible();
});
