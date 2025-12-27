import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { BookTicketPage } from "../pages/bookticket.page";
import { User } from "../models/user";
import { BookTicket } from "../models/bookticket";

test("BT-03: Error when booking more than 10 tickets", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const bookTicketPage = new BookTicketPage(page);

  // ===== Faker user =====
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
    await homePage.navigateToRegister();
    await registerPage.register(user);
    await homePage.navigateToLogin();
    await loginPage.login(user);
    
    await homePage.navigateToBookTicket();

  await test.step("Action: Max out booking limit (Book 10 tickets)", async () => {
      const firstBooking = new BookTicket(10);
      await bookTicketPage.bookTicket(firstBooking);
      await bookTicketPage.verifyBookedSuccessfully();
  });

  await test.step("Action: Attempt to book 1 more ticket", async () => {
      await bookTicketPage.navigateToBookTicket();
      const secondBooking = new BookTicket(1);
      await bookTicketPage.bookTicket(secondBooking);
  });

  await test.step("Assertion: Verify 'Booking Limit' error message appears", async () => {
      await bookTicketPage.verifyBookingLimitError();
  });
});