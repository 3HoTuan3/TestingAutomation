import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";

test("Verify error message displays when user enter same new password", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const changePasswordPage = new ChangePasswordPage(page);
  const email = "dd@ddd.com";
  const originalPassword = "dd@ddddd.com";
  const newPassword = originalPassword;

  await page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");

  // login
  await homePage.navigateToLogin();
  await loginPage.login(email, originalPassword);
  await homePage.shouldWelcomeMsgVisible(email);

  // change password with incorrect password
  await homePage.navigateToChangePassword();
  await changePasswordPage.changePassword(
    originalPassword,
    newPassword,
    newPassword,
  );
  await changePasswordPage.errorMessageVisible("Error");
});
