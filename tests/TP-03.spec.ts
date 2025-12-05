import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { TicketPricePage } from "../pages/ticket-price.page";

const BASE_URL = "http://railwayb2.somee.com/Page/HomePage.cshtml";

test("TP-03: User is redirected to Login page when clicking Book Ticket if not logged in", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const ticketPricePage = new TicketPricePage(page);

  await page.goto(BASE_URL);

  await ticketPricePage.navigateToTicketPrice();

  await page.locator('a:has-text("Check Price")').first().click();

  await expect(page).toHaveURL(
    /\/Page\/TicketPricePage\.cshtml\?id1=\d+&id2=\d+/,
  );

  await page.locator('a.BoxLink:has-text("Book ticket")').first().click();
  
  await expect(page).toHaveURL(/\/Account\/Login\.cshtml/);

  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
});
