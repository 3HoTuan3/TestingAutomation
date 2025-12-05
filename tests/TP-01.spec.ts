import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { TicketPricePage } from "../pages/ticket-price.page";

const BASE_URL = "http://railwayb2.somee.com/Page/HomePage.cshtml";
const TEST_EMAIL = "cijnuj@ramcloud.us";
const TEST_PASSWORD = "123456789";

async function loginUser(page: Page) {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto(BASE_URL);
  await homePage.navigateToLogin();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  await homePage.shouldWelcomeMsgVisible(TEST_EMAIL);
}

test.describe("TP-01 – Ticket Price UI (Logged In)", () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
  });

  test("TP-01: UI of ticket price page displays properly", async ({ page }) => {
    const ticketPricePage = new TicketPricePage(page);

    // Step 1: Navigate to Ticket Price tab
    await ticketPricePage.navigateToTicketPrice();

    // Step 2: Observe UI – basic components
    await expect(
      page.locator('h1:has-text("Train ticket pricing list")'),
    ).toBeVisible();

    await expect(
      page.locator('a:has-text("Check Price")').first(),
    ).toBeVisible();

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
});
