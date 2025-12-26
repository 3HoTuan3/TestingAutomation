import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../pages/register.page";
import { User } from "../models/user";

test("Error message displays when New Password match with the current password", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const changePasswordPage = new ChangePasswordPage(page);

  const tempUsername = faker.internet.email();
  const tempPassword = faker.internet.password();
  const tempNewPassword = tempPassword;
  const tempPID = faker.string.numeric(9);
  const user = new User({
    username: tempUsername,
    password: tempPassword,
    pid: tempPID,
  });

  await homePage.navigateToHomePage();
  await homePage.navigateToRegister();
  await registerPage.register(user);
  await homePage.navigateToLogin();
  await loginPage.login(user);

  // change password with same password
  await homePage.navigateToChangePassword();
  await changePasswordPage.changePassword(
    user,
    tempNewPassword,
    tempNewPassword,
  );
  await changePasswordPage.errorMessageVisible("Error");
});
