import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../pages/register.page";

test("Verify error message displays when user enter incorrect current password", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const changePasswordPage = new ChangePasswordPage(page);

  const tempUsername = faker.internet.email();
  const tempPassword = faker.internet.password();
  const tempNewPassword = faker.internet.password();
  const bsPassword = "incorrectpassword";
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

  // enter incorrect current password
  await homePage.navigateToChangePassword();
  await changePasswordPage.changePassword(
    bsPassword,
    tempNewPassword,
    tempNewPassword,
  );
  await changePasswordPage.errorMessageVisible("Error");
});
