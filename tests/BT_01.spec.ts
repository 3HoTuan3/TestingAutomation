import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { BookTicketPage } from "../pages/bookticket.page";
import { User } from "../models/user";
import { BookTicket } from "../models/bookticket";

test("BT-01: User can successfully book a ticket with valid information", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const bookTicketPage = new BookTicketPage(page);

  const email = faker.internet.email();
  const password = faker.internet.password();
  const pid = faker.string.numeric(9);

  const user = new User({
    username: email,
    password,
    confirmPassword: password,
    pid,
  });

  const ticket = new BookTicket();

  await homePage.navigateToHomePage();
  await homePage.navigateToRegister();
  await registerPage.register(user);
  
  await homePage.navigateToLogin();
  await loginPage.login(user);

  await homePage.openBookTicketTab();

  await test.step("Action: Submit booking with valid data", async () => {
    await bookTicketPage.bookTicket(ticket);
  });

  await test.step("Assertion: Verify ticket is booked successfully", async () => {
    await bookTicketPage.verifyBookedSuccessfully();
  });
});