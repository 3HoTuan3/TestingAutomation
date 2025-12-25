import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { TicketPricePage } from "../pages/ticket-price.page";

test("TP-01: UI of ticket price page displays properly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const ticketPricePage = new TicketPricePage(page);

  await homePage.navigateToLogin();
  await loginPage.login();

  // Step 1: Navigate to Ticket Price tab
  await ticketPricePage.navigateToTicketPrice();

  // Step 2: Observe UI – basic components
  await expect(
    page.locator('h1:has-text("Train ticket pricing list")'),
  ).toBeVisible();

  await expect(page.locator('a:has-text("Check Price")').first()).toBeVisible();

  const checkPriceButton = page
    .locator('a.BoxLink:has-text("Check Price")')
    .first();

  // get background color before hover
  const colorBeforeHover = await checkPriceButton.evaluate(
    (el) => window.getComputedStyle(el).backgroundColor,
  );

  // hover
  await checkPriceButton.hover();

  // get background color after hover
  const colorAfterHover = await checkPriceButton.evaluate(
    (el) => window.getComputedStyle(el).backgroundColor,
  );

  expect(colorAfterHover).not.toBe(colorBeforeHover);
});
