import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

const HOME_URL = "http://railwayb2.somee.com/Page/HomePage.cshtml";
const EMAIL = "cijnuj@ramcloud.us";
const PASSWORD = "123456789";

test("BT-LOGOUT: User is logged out when clicking Logout tab", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto(HOME_URL);
  await homePage.navigateToLogin();
  await loginPage.login(EMAIL, PASSWORD);
  await homePage.shouldWelcomeMsgVisible(EMAIL);

  await page.getByRole("link", { name: "Log out" }).click();

  await expect(page).toHaveURL(HOME_URL);

  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();

  await expect(page.getByText(`Welcome ${EMAIL}`)).not.toBeVisible();
});
