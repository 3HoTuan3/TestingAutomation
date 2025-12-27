import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { BookTicketPage } from "../pages/bookticket.page";
import { MyTicketPage } from "../pages/myticket.page";
import { User } from "../models/user";
import { BookTicket } from "../models/bookticket";

test.describe("MT-09 Some Scenario Name", () => {
  let user: User;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const bookTicketPage = new BookTicketPage(page);

    // Tạo user bằng faker
    const email = faker.internet.email();
    const password = faker.internet.password();
    const pid = faker.string.numeric(9);

    user = new User({
      username: email,
      password,
      confirmPassword: password,
      pid,
    });

    await test.step("Register and login user", async () => {
      await homePage.navigateToHomePage();
      await homePage.navigateToRegister();
      await registerPage.register(user);

      await homePage.navigateToLogin();
      await loginPage.login(user);
    });

    await test.step("Book some tickets", async () => {
      for (let i = 0; i < 3; i++) {
        await homePage.navigateToBookTicket();
        const ticket = new BookTicket({ amount: 1 });
        await bookTicketPage.bookTicket(ticket);
        await bookTicketPage.verifyBookingSuccess();
      }
    });

    await test.step("Open My Ticket tab", async () => {
      await homePage.navigateToMyTicket();
    });
  });

  test("MT-09 Users can perform the scenario", async ({ page }) => {
    const myTicketPage = new MyTicketPage(page);

    await test.step("Verify there are tickets to act on", async () => {
      const count = await myTicketPage.getTicketCount();
      if (count === 0) test.skip();
    });

    await test.step("Perform action 1 (example: filter)", async () => {
      await myTicketPage.applyFilter({
        departStation: "1",
        arriveStation: "6", 
        status: "New",
      });
    });

    await test.step("Verify filter result: Depart Station", async () => {
      await myTicketPage.verifyFilterResult("Sài Gòn");
    });

    await test.step("Verify filter result: Arrive Station", async () => {
      await myTicketPage.verifyFilterResult("Quảng Ngãi");
    });

    await test.step("Verify filter result: Status", async () => {
      await myTicketPage.verifyFilterResult("New");
    });

  });
});
