import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";
import { User } from "../models/user";

test.describe("MT-02 View Booked Tickets", () => {
  test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const user = new User();
        await homePage.navigateToHomePage();
        await homePage.navigateToLogin();
        await loginPage.login(user);
        await homePage.navigateToMyTicket();
  });

  test("MT-02 Users can view the booked tickets", async ({ page }) => {
    const myTicketPage = new MyTicketPage(page);

    await test.step("Assertion: Verify table header and layout display properly", async () => {
        await myTicketPage.shouldTableDisplayProperly();
    });

    await test.step("Assertion: Verify booked tickets data is present", async () => {
        await myTicketPage.shouldHaveBookedTickets();
    });
  });
});