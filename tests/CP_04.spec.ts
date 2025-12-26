import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { faker } from "@faker-js/faker";
import { User } from "../models/user";
import { RegisterPage } from "../pages/register.page";

const lengthCases = [1, 7, 65, 80];

for (const lengthCase of lengthCases) {
  test(`Error message displays when user enter New Password with length ${lengthCase}`, async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const changePasswordPage = new ChangePasswordPage(page);
    const registerPage = new RegisterPage(page);

    const tempUsername = faker.internet.email();
    const tempPassword = faker.internet.password();
    // Generate password with specific length for each test case
    const tempNewPassword = faker.string.alphanumeric(lengthCase);
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

    await homePage.navigateToChangePassword();
    await changePasswordPage.changePassword(
      user,
      tempNewPassword,
      tempNewPassword,
    );

    await changePasswordPage.errorMessageVisible("Error");
  });
}
