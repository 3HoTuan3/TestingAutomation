import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test("BT-04: Redirect to Login when accessing Book Ticket without login", async ({
  page,
}) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  await homePage.navigateToBookTicket();


  await test.step("Assertion: Verify redirect to Login page", async () => {
      await expect(page).toHaveURL(/Account\/Login\.cshtml/);
      await expect(
        page.getByRole("heading", { name: "Login" })
      ).toBeVisible();
  });
});