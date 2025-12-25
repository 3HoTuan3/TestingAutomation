import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { BookTicketPage } from "../pages/book-ticket.page";

test("BT-01: User can successfully book a ticket with valid information", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login();
  await homePage.shouldWelcomeMsgVisible("testrail@gmail.com");

  const bookTicketPage = new BookTicketPage(page);

  await bookTicketPage.navigateToBookTicket();

  const amount = Math.floor(Math.random() * 10) + 1;

  await bookTicketPage.selectBookingInfo(
    "12/23/2025",
    "Sài Gòn",
    "Phan Thiết",
    "Hard seat",
    amount,
  );

  await bookTicketPage.clickBookTicket();

  await expect(page).toHaveURL(/\/Page\/SuccessPage\.cshtml\?id=\d+/);

  await expect(
    page.locator('h1:has-text("Ticket Booked Successfully!")'),
  ).toBeVisible();

  await expect(page.locator("table.MyTable")).toBeVisible();

  await expect(
    page.locator("table.MyTable td").filter({ hasText: String(amount) }),
  ).toBeVisible();
});
