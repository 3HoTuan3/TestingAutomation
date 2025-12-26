import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test("HOM_02 - Should navigate to Contact from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyContact();
});

test("HOM_02 - Should navigate to Timetable from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyTimetable();
});

test("HOM_02 - Should navigate to Ticket Price from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyTicketPrice();
});

test("HOM_02 - Should navigate to Book Ticket from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyBookTicket();
});

test("HOM_02 - Should navigate to Register from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyRegister();
});

test("HOM_02 - Should navigate to Login from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyLogin();
});

// TODO: FAQ navigation is failing - bug in the FAQ link
test("HOM_02 - Should navigate to FAQ from Home", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateAndVerifyFaq();
});
