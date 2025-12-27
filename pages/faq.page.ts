import { test, expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { User } from "../models/user";

export class FaqPage {
  private readonly page: Page;
  private readonly faqTitle: Locator;
  private readonly faqQuestions: Locator;
  private readonly faqAnswers: Locator;

  constructor(page: Page) {
    this.page = page;
    this.faqTitle = this.page.getByRole("heading", {
      name: "Frequently Asked Questions",
    });
    this.faqQuestions = this.page.locator("ol > li > a");
    this.faqAnswers = this.page.locator("ul.ul-no-bullet > li");
  }

  async navigateToFaqPage(): Promise<void> {
    await test.step("Navigate to FAQ Page", async () => {
      await this.page.goto("http://railwayb2.somee.com/Page/FAQ.cshtml");
    });
  }

  async verifyFaqPageLoaded(): Promise<void> {
    await test.step("Verify FAQ page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/FAQ/i);
    });
  }

  async shouldFaqTitleVisible(): Promise<void> {
    await test.step("Verify FAQ title is visible", async () => {
      await expect(this.faqTitle).toBeVisible();
    });
  }

  async shouldFaqQuestionsVisible(): Promise<void> {
    await test.step("Verify FAQ questions are visible", async () => {
      await expect(this.faqQuestions).not.toHaveCount(0);
    });
  }

  async shouldFaqAnswersVisible(): Promise<void> {
    await test.step("Verify FAQ answers are visible", async () => {
      await expect(this.faqAnswers).not.toHaveCount(0);
    });
  }

  async clickFaqQuestion(questionNumber: number): Promise<void> {
    await test.step(`Click FAQ question ${questionNumber}`, async () => {
      const question = this.page.locator(`a[href="#${questionNumber}"]`);
      await question.click();
    });
  }

  async verifyFaqQuestionAnswerVisible(
    questionNumber: number,
  ): Promise<void> {
    await test.step(
      `Verify FAQ question ${questionNumber} answer is visible`,
      async () => {
        const answer = this.page.locator(`li#${questionNumber}`);
        await expect(answer).toBeVisible();
      },
    );
  }

  async clickAllFaqQuestionsAndVerify(): Promise<void> {
    await test.step("Click all FAQ questions and verify answers", async () => {
      const questionCount = await this.faqQuestions.count();
      for (let i = 1; i <= questionCount; i++) {
        await this.clickFaqQuestion(i);
        await this.verifyFaqQuestionAnswerVisible(i);
      }
    });
  }

  async loginAndNavigateToFaq(user: User): Promise<void> {
    await test.step("Login to Railway", async () => {
      const homePage = new HomePage(this.page);
      const loginPage = new LoginPage(this.page);
      await homePage.navigateToHomePage();
      await homePage.navigateToLogin();
      await loginPage.login(user);
      await homePage.shouldWelcomeMsgVisible(user.username);
    });

    await test.step("Click on FAQ menu in navigation bar", async () => {
      const homePage = new HomePage(this.page);
      await homePage.navigateToFaq();
    });

    await test.step("Observe the page content", async () => {
      await this.verifyFaqPageLoaded();
      await this.shouldFaqTitleVisible();
      await this.shouldFaqQuestionsVisible();
      await this.shouldFaqAnswersVisible();
    });
  }
}
