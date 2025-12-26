import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { User } from "../models/user";

test("HOM_04 - Additional tab displays and work properly when user is logged in", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const user = new User();

  await homePage.loginAndVerifyChangePasswordTab(user);
});
