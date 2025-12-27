import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { BookTicketPage } from "../pages/bookticket.page";
import { MyTicketPage } from "../pages/myticket.page";
import { User } from "../models/user";
import { BookTicket } from "../models/bookticket";

test.describe("MT-06 Filter Combined Criteria", () => {
  let user: User;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
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

    await homePage.navigateToHomePage();
    await homePage.navigateToRegister();
    await registerPage.register(user);
    await homePage.navigateToLogin();
    await loginPage.login(user);

    await test.step("Book 6 tickets (quantity = 1 each)", async () => {
      for (let i = 0; i < 6; i++) {
        await homePage.openBookTicketTab();
        const ticket = new BookTicket(1);
        await bookTicketPage.bookTicket(ticket);
      }
    });

    await homePage.openMyTicketTab();
  });

  test("MT-06 Users can filter by combining multiple criteria", async ({
    page,
  }) => {
    const myTicketPage = new MyTicketPage(page);

    await test.step("Verify there are enough tickets to filter", async () => {
      const count = await myTicketPage.getTicketCount();
      if (count < 6) test.skip();
    });

    await test.step("Apply combined filter: Depart, Arrive, Status", async () => {
      await myTicketPage.applyFilter({
        departStation: "6",
        arriveStation: "1",
        status: "New",
      });
    });

    await test.step("Verify filter result contains Depart Station", async () => {
      await myTicketPage.verifyFilterResult("Quảng Ngãi");
    });

    await test.step("Verify filter result contains Arrive Station", async () => {
      await myTicketPage.verifyFilterResult("Sài Gòn");
    });

    await test.step("Verify filter result contains Status", async () => {
      await myTicketPage.verifyFilterResult("New");
    });
  });
});
