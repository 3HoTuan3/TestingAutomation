import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test("All links work correctly", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.navigateToRegister();
  await homePage.verifyRegisterPageLoaded();
});
