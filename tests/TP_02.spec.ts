import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { TicketPricePage } from "../pages/ticketprice.page";
import { User } from "../models/user";

test.describe("TP-02 Check Ticket Price", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const user = new User();

    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login(user);
    
    await homePage.navigateToTicketPrice();
  });

  test("TP-02 User can check ticket prices of the trip", async ({ page }) => {
    const ticketPricePage = new TicketPricePage(page);

    await test.step("Click Check Price on a trip", async () => {
      await ticketPricePage.clickCheckPriceFirstRow();
    });

    await test.step("Verify navigation to ticket price detail page", async () => {
      await ticketPricePage.shouldNavigateToTicketPriceDetail();
    });

    await test.step("Verify seat type and price are displayed", async () => {
      await ticketPricePage.shouldDisplaySeatTypeColumn();
      await ticketPricePage.shouldDisplayPriceColumn();
    });
  });
});
