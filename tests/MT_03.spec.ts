import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { BookTicketPage } from "../pages/bookticket.page";
import { MyTicketPage } from "../pages/myticket.page";
import { User } from "../models/user";
import { BookTicket } from "../models/bookticket";

test.describe("MT-03 Cancel Tickets", () => {
  test("MT-03 Users can cancel tickets", async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const bookTicketPage = new BookTicketPage(page);
    const myTicketPage = new MyTicketPage(page);

    const email = faker.internet.email();
    const password = faker.internet.password();
    const pid = faker.string.numeric(9);

    const user = new User({
      username: email,
      password,
      confirmPassword: password,
      pid,
    });
    
    await homePage.navigateToHomePage();
    await registerPage.register(user);
    await loginPage.login(user);


    await test.step("Precondition: Book a ticket", async () => {
      await homePage.navigateToBookTicket();  
      const ticket = new BookTicket();
      await bookTicketPage.bookTicket(ticket);
    });

    let beforeCount = 0;
    await test.step("Action: Open My Ticket and Count tickets before canceling", async () => {
        await homePage.navigateToMyTicket();
        beforeCount = await myTicketPage.getTicketCount();
        expect(beforeCount).toBeGreaterThan(0);
    });

    await test.step("Action: Cancel the first ticket", async () => {
        await myTicketPage.cancelTicket(0);
    });

    await test.step("Assertion: Verify ticket count decreased by 1", async () => {
        const afterCount = await myTicketPage.getTicketCount();
        expect(afterCount).toBe(beforeCount - 1);
    });
  });
});