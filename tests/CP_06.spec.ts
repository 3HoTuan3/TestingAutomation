import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ChangePasswordPage } from "../pages/change.password.page";

test("Verify error message displays when New Password and Confirm Password do not match", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const changePasswordPage = new ChangePasswordPage(page);
  const email = "dd@ddd.com";
  const originalPassword = "dd@ddddd.com";
  const newPassword = "dd@ddddddd.com";
  const incorrectNewPassword = "dd@12ddddddd.com";

  await page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");

  // login
  await homePage.navigateToLogin();
  await loginPage.login(email, originalPassword);
  await homePage.shouldWelcomeMsgVisible(email);

  // change password with current password and Confirm Password do not match New Password
  await homePage.navigateToChangePassword();
  await changePasswordPage.changePassword(
    originalPassword,
    newPassword,
    incorrectNewPassword,
  );
  await changePasswordPage.errorMessageVisible("Error");
});
