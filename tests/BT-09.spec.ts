import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

const URL = "http://railwayb2.somee.com/Page/HomePage.cshtml";
const EMAIL = "cijnuj@ramcloud.us";
const PASSWORD = "123456789";

test("BT-09: Logged in user can navigate to Book Ticket page", async ({
  page,
}) => {
  const home = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto(URL);
  await home.navigateToLogin();
  await loginPage.login(EMAIL, PASSWORD);
  await home.shouldWelcomeMsgVisible(EMAIL);

  await page.locator('a[href*="BookTicketPage"]').click();

  await expect(page).toHaveURL(/BookTicketPage\.cshtml/);
  await expect(
    page.getByRole("heading", { name: "Book ticket" }),
  ).toBeVisible();
});
