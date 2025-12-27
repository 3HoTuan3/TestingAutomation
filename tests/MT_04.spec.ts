import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";
import { User } from "../models/user";

test.describe("MT-04 Filter Visibility", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Precondition: Login and Open My Ticket Page", async () => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const user = new User();
        await homePage.navigateToHomePage();
        await homePage.navigateToLogin();
        await loginPage.login(user);
        await homePage.navigateToBookTicket();
    });
  });

  test("MT-04 Verify filter function visibility based on row count", async ({
    page,
  }) => {
    const myTicketPage = new MyTicketPage(page);
    let ticketCount = 0;

    await test.step("Action: Get current ticket count", async () => {
        ticketCount = await myTicketPage.getTicketCount();
    });

    await test.step(`Assertion: Check Filter visibility (Expect Visible: ${ticketCount >= 6})`, async () => {
        if (ticketCount >= 6) {
          await myTicketPage.shouldFilterVisible(true);
        } else {
          await myTicketPage.shouldFilterVisible(false);
        }
    });
  });
});