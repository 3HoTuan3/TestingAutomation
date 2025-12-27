import { test } from "@playwright/test";
import { FaqPage } from "../pages/faq.page";
import { User } from "../models/user";

test("FAQ-01 - Verify FAQ page displays correctly", async ({ page }) => {
  const faqPage = new FaqPage(page);
  const user = new User();

  await faqPage.loginAndNavigateToFaq(user);
});
