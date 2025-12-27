import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { TicketPricePage } from "../pages/ticketprice.page";
import { User } from "../models/user";

test.describe("TP-01 View Ticket Price", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const user = new User();

    await homePage.navigateToHomePage();

    await homePage.navigateToLogin();
    await loginPage.login(user);
    
    await homePage.navigateToTicketPrice();
  });

  test("TP-01 UI of ticket price page displays properly", async ({ page }) => {
    const ticketPricePage = new TicketPricePage(page);

    await test.step("Verify ticket price header is visible", async () => {
      await ticketPricePage.shouldHeaderBeVisible();
    });

    await test.step("Verify Check Price button is visible", async () => {
      await ticketPricePage.shouldCheckPriceButtonsVisible();
    });

    await test.step("Verify hover effect of Check Price button", async () => {
      await ticketPricePage.shouldCheckPriceHoverEffectWork();
    });
  });
});
