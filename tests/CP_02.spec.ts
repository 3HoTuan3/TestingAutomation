import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../pages/register.page";
import { User } from "../models/user";

test("Verify user can change password with valid info", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const changePasswordPage = new ChangePasswordPage(page);

  const tempUsername = faker.internet.email();
  const tempPassword = faker.internet.password();
  const tempNewPassword = faker.internet.password();
  const tempPID = faker.string.numeric(9);
  const user = new User({
    username: tempUsername,
    password: tempPassword,
    confirmPassword: tempPassword,
    pid: tempPID,
  });

  await homePage.navigateToHomePage();
  await homePage.navigateToRegister();
  await registerPage.register(user);
  await homePage.navigateToLogin();
  await loginPage.login(user);

  // Change password
  await homePage.navigateToChangePassword();
  await changePasswordPage.changePassword(
    user,
    tempNewPassword,
    tempNewPassword,
  );

  // Update password in user object
  user.password = tempNewPassword;

  // Re-login with new password to verify
  await homePage.logout();
  await homePage.navigateToLogin();
  await loginPage.login(user);
});
