import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test("BT-09: Logged in user can navigate to Book Ticket page", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login();

  await page.locator('a[href*="BookTicketPage"]').click();

  await expect(page).toHaveURL(/BookTicketPage\.cshtml/);
  await expect(
    page.getByRole("heading", { name: "Book ticket" }),
  ).toBeVisible();
});
