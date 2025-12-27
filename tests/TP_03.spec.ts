import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { TicketPricePage } from "../pages/ticketprice.page";
import { User } from "../models/user";

test.describe("TP-03 View Ticket Price Detail", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const user = new User();
    const ticketPricePage = new TicketPricePage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login(user);


    await homePage.navigateToTicketPrice();

    await test.step("Click 'Check Price' on first row", async () => {
      await ticketPricePage.clickCheckPriceFirstRow();
    });
  });

  test("TP-03 Ticket price detail table displays properly", async ({
    page,
  }) => {
    const ticketPricePage = new TicketPricePage(page);

    await test.step("Verify seat type column is displayed", async () => {
      await ticketPricePage.shouldDisplaySeatTypeColumn();
    });

    await test.step("Verify price column is displayed", async () => {
      await ticketPricePage.shouldDisplayPriceColumn();
    });
  });
});
