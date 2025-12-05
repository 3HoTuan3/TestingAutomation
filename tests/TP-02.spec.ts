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

test("TP-02: User can check ticket prices of the trip", async ({ page }) => {
  await loginUser(page);

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
