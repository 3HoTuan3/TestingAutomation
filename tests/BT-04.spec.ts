import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test("BT-04: Redirect to Login when accessing Book Ticket without login", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();

  await page.locator('a[href*="BookTicketPage"]').click();

  await expect(page).toHaveURL(/Account\/Login\.cshtml/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
