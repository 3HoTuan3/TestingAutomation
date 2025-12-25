import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../pages/register.page";

test("Verify error message displays when New Password and Confirm Password do not match", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const changePasswordPage = new ChangePasswordPage(page);

  const tempUsername = faker.internet.email();
  const tempPassword = faker.internet.password();
  const tempNewPassword = faker.internet.password();
  const incorrectConfirmPassword = "123456789";
  const tempPID = faker.string.numeric(9);

  await homePage.navigateToHomePage();
  await homePage.navigateToRegister();
  await registerPage.register(
    tempUsername,
    tempPassword,
    tempPassword,
    tempPID,
  );
  await homePage.navigateToLogin();
  await loginPage.login(tempUsername, tempPassword);

  // change password with non matching confirm password
  await homePage.navigateToChangePassword();
  await changePasswordPage.changePassword(
    tempPassword,
    tempNewPassword,
    incorrectConfirmPassword,
  );
  await changePasswordPage.errorMessageVisible("Error");
});
