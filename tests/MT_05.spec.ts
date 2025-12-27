import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { MyTicketPage } from "../pages/myticket.page";
import { BookTicketPage } from "../pages/bookticket.page";
import { User } from "../models/user";
import { BookTicket } from "../models/bookticket";

test.describe("MT-05 Filter Specific Criteria (book 6 tickets)", () => {
  let user: User;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

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
  });

  test("MT-05 Users can filter with specific criteria", async ({ page }) => {
    const homePage = new HomePage(page);
    const bookTicketPage = new BookTicketPage(page);
    const myTicketPage = new MyTicketPage(page);

    await test.step("Pre-condition: User books 6 tickets", async () => {
      for (let i = 0; i < 6; i++) {
        await homePage.openBookTicketTab();

        // set cứng số lượng book là 1
        const ticket = new BookTicket(1);
        await bookTicketPage.bookTicket(ticket);
      }
    });

    await homePage.openMyTicketTab();
    
    await test.step("Scenario: Filter by Depart Station", async () => {
      await page.reload();
      await myTicketPage.applyFilter({ departStation: "1" }); 
      await myTicketPage.verifyFilterResult("Sài Gòn");
    });

    await test.step("Scenario: Filter by Arrive Station", async () => {
      await page.reload();
      await myTicketPage.applyFilter({ arriveStation: "6" }); 
      await myTicketPage.verifyFilterResult("Quảng Ngãi");
    });
  });
});
