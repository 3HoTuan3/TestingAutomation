import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { TicketPricePage } from "../pages/ticket-price.page";

test("TP-02: User can check ticket prices of the trip", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login();

  const ticketPricePage = new TicketPricePage(page);

  await ticketPricePage.navigateToTicketPrice();

  await page.locator('a:has-text("Check Price")').first().click();

  await expect(page).toHaveURL(
    /\/Page\/TicketPricePage\.cshtml\?id1=\d+&id2=\d+/,
  );

  await expect(
    page.locator("th.RowHeader", { hasText: "Seat type" }),
  ).toBeVisible();

  await expect(page.locator("text=Price (VND)")).toBeVisible();
});
