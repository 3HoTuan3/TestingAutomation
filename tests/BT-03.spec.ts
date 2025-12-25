import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { BookTicketPage } from "../pages/book-ticket.page";

const HOME_URL = "http://railwayb2.somee.com/Page/HomePage.cshtml";
const EMAIL = "cijnuj@ramcloud.us";
const PASSWORD = "123456789";

async function login(page) {
  const home = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto(HOME_URL);
  await home.navigateToLogin();
  await loginPage.login(EMAIL, PASSWORD);
  await home.shouldWelcomeMsgVisible(EMAIL);
}

test("BT-03: Error when booking more than 10 tickets", async ({ page }) => {
  await login(page);

  const bookPage = new BookTicketPage(page);
  await bookPage.navigateToBookTicket();

  // TODO: Create seperated class for Book Ticket Form
  // Book 5 tickets
  await bookPage.selectBookingInfo(
    "12/23/2025",
    "Sài Gòn",
    "Phan Thiết",
    "Soft seat",
    5,
  );
  await bookPage.clickBookTicket();

  // Quay lại Book Ticket
  await bookPage.navigateToBookTicket();

  // Book thêm 6 vé → total > 10
  await bookPage.selectBookingInfo(
    "12/21/2025",
    "Sài Gòn",
    "Phan Thiết",
    "Soft seat",
    6,
  );
  await bookPage.clickBookTicket();

  // ✅ Verify error message
  await expect(page.locator(".message.error")).toBeVisible();
});
