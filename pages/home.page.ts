import { test, expect, Locator, Page } from "@playwright/test";
import { User } from "../models/user";
import { LoginPage } from "./login.page";

export class HomePage {
  private readonly page: Page;
  private readonly navBarLogin: Locator;
  private readonly navChangePassword: Locator;
  private readonly navRegister: Locator;
  private readonly navContact: Locator;
  private readonly navLogout: Locator;
  private readonly navMyTicket: Locator;
  private readonly navBookTicket: Locator;
  private readonly navTicketPrice: Locator;
  private readonly navFaq: Locator;
  private readonly navTimetable: Locator;
  private readonly navTicketPrice: Locator;
  private readonly navBookTicket: Locator;

  constructor(page: Page) {
    this.page = page;

    this.navBarLogin = page.getByRole("link", { name: "Login" });
    this.navChangePassword = page.getByRole("link", {
      name: "Change password",
    });
    this.navRegister = page.getByRole("link", { name: "Register" });
    this.navContact = page.getByRole("link", { name: "Contact" });
    this.navLogout = page.getByRole("link", { name: "Log out" });
    this.navMyTicket = page.getByRole("link", { name: "My ticket" });
    this.navBookTicket = page.getByRole("link", { name: "Book ticket" });
    this.navTicketPrice = page.getByRole("link", { name: "Ticket Price" });
    this.navFaq = this.page.getByRole("link", { name: "FAQ" });
    this.navTimetable = this.page.getByRole("link", { name: "Timetable" });
    this.navBookTicket = this.page.getByRole("link", { name: "Book ticket" });
  }

  async navigateToHomePage(): Promise<void> {
    await test.step("Navigate to Home Page", async () => {
      await this.page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");
    });
  }

  async navigateToLogin(): Promise<void> {
    await test.step("Navigate to Login Page", async () => {
      await this.navBarLogin.click();
    });
  }

  async navigateToChangePassword(): Promise<void> {
    await test.step("Navigate to Change Password Page", async () => {
      await this.navChangePassword.click();
    });
  }

  async navigateToRegister(): Promise<void> {
    await test.step("Navigate to Register Page", async () => {
      await this.navRegister.click();
    });
  }

  async navigateToContact(): Promise<void> {
    await test.step("Navigate to Contact Page", async () => {
      await this.navContact.click();
    });
  }

  async navigateToFaq(): Promise<void> {
    await test.step("Navigate to FAQ Page", async () => {
      await this.navFaq.click();
    });
  }

  async navigateToTicketPrice(): Promise<void> {
    await test.step("Navigate to Ticket Price Page", async () => {
      await this.navTicketPrice.click();
    });
  }

  async navigateToBookTicket(): Promise<void> {
    await test.step("Navigate to Book Ticket Page", async () => {
      await this.navBookTicket.click();
    });
  }
  
  async navigateToMyTicket(): Promise<void> {
    await test.step("Navigate to My Ticket Page", async () => {
      await this.navMyTicket.click();
    })
  }

  async navigateToTimetable(): Promise<void> {
    await test.step("Navigate to Timetable Page", async () => {
      await this.navTimetable.click();
    });
  }

  async logout(): Promise<void> {
    await test.step("Logout", async () => {
      await this.navLogout.click();
    });
  }

  async shouldWelcomeMsgVisible(email: string): Promise<void> {
    const welcomeMsg = this.page.getByText(`Welcome ${email}`);
    await expect(welcomeMsg).toBeVisible();
  }

  async verifyFaqPageLoaded(): Promise<void> {
    await test.step("Verify FAQ page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/FAQ/i);
    });
  }

  async verifyContactPageLoaded(): Promise<void> {
    await test.step("Verify Contact page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/Contact/i);
    });
  }

  async verifyTimetablePageLoaded(): Promise<void> {
    await test.step("Verify Timetable page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/TrainTimeListPage/i);
    });
  }

  async verifyTicketPricePageLoaded(): Promise<void> {
    await test.step("Verify Ticket Price page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/TrainPriceListPage/i);
    });
  }

  async verifyBookTicketPageLoaded(): Promise<void> {
    await test.step("Verify Book Ticket page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/BookTicket/i);
    });
  }

  async verifyRegisterPageLoaded(): Promise<void> {
    await test.step("Verify Register page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/Register/i);
    });
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await test.step("Verify Login page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/Login/i);
    });
  }

  async verifyHomePageLoaded(): Promise<void> {
    await test.step("Verify back on Home page", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/HomePage/i);
    });
  }

  async navigateAndVerifyFaq(): Promise<void> {
    await this.navigateToFaq();
    await this.verifyFaqPageLoaded();
  }

  async navigateAndVerifyContact(): Promise<void> {
    await this.navigateToContact();
    await this.verifyContactPageLoaded();
    await this.navigateToHomePage();
    await this.verifyHomePageLoaded();
  }

  async navigateAndVerifyTimetable(): Promise<void> {
    await this.navigateToTimetable();
    await this.verifyTimetablePageLoaded();
    await this.navigateToHomePage();
    await this.verifyHomePageLoaded();
  }

  async navigateAndVerifyTicketPrice(): Promise<void> {
    await this.navigateToTicketPrice();
    await this.verifyTicketPricePageLoaded();
    await this.navigateToHomePage();
    await this.verifyHomePageLoaded();
  }

  async navigateAndVerifyBookTicket(): Promise<void> {
    await this.navigateToBookTicket();
    await this.verifyBookTicketPageLoaded();
    await this.navigateToHomePage();
    await this.verifyHomePageLoaded();
  }

  async navigateAndVerifyRegister(): Promise<void> {
    await this.navigateToRegister();
    await this.verifyRegisterPageLoaded();
    await this.navigateToHomePage();
    await this.verifyHomePageLoaded();
  }

  async navigateAndVerifyLogin(): Promise<void> {
    await this.navigateToLogin();
    await this.verifyLoginPageLoaded();
  }

  async shouldChangePasswordTabVisible(): Promise<void> {
    await test.step("Observe Change Password tab is displayed", async () => {
      await expect(this.navChangePassword).toBeVisible();
    });
  }

  async verifyChangePasswordPageLoaded(): Promise<void> {
    await test.step("Verify Change Password page loaded", async () => {
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/ChangePassword/i);
    });
  }

  async navigateAndVerifyChangePassword(): Promise<void> {
    await this.shouldChangePasswordTabVisible();
    await this.navigateToChangePassword();
    await this.verifyChangePasswordPageLoaded();
  }

  async loginAndVerifyChangePasswordTab(user: User): Promise<void> {
    await test.step("Login into the system", async () => {
      await this.navigateToHomePage();
      await this.navigateToLogin();
      const loginPage = new LoginPage(this.page);
      await loginPage.login(user);
      await this.shouldWelcomeMsgVisible(user.username);
    });

    await test.step("Observe newly appeared tab (Change Password)", async () => {
      await this.shouldChangePasswordTabVisible();
    });

    await test.step("Click on Change Password tab", async () => {
      await this.navigateAndVerifyChangePassword();
    });
  }

  async verifyLoggedOut(): Promise<void> {
    await test.step("Verify user is logged out", async () => {
      const welcomeMsg = this.page.getByText(/guest!/);
      expect(this.page).toHaveURL(
        "http://railwayb2.somee.com/Page/HomePage.cshtml",
      );
      expect(welcomeMsg.isVisible());
    });
  }
}
