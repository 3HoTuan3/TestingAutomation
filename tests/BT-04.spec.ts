import { test, expect } from "@playwright/test";

test("BT-04: Redirect to Login when accessing Book Ticket without login", async ({ page }) => {
  await page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");

  await page.locator('a[href*="BookTicketPage"]').click();

  await expect(page).toHaveURL(/Account\/Login\.cshtml/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
