import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";
import { User } from "../models/user";

test.describe("MT-09 Verify Expired Ticket Status", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const user = new User();
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login(user);
    await homePage.openMyTicketTab();
  });

  test("MT-09 Verify expired tickets with proper status", async ({ page }) => {
    const myTicketPage = new MyTicketPage(page);

    // Tìm dòng vé có nút Delete (dấu hiệu của Expired/Cancelled)
    const expiredIndex = await myTicketPage.findIndexOfExpiredTicket();

    if (expiredIndex !== -1) {
      // Kiểm tra dòng đó có chứa text trạng thái đúng
      await myTicketPage.verifyTicketInfoAtRow(expiredIndex, "Expired");
    } else {
      test.skip();
    }
  });
});
