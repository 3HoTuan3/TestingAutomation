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


  async openMyTicketTab(): Promise<void> {
    await test.step("Open My Ticket page", async () => {
      await this.navMyTicket.click();
    });
  }

  async openTicketPriceTab(): Promise<void> {
    await test.step("Open Ticket Price page", async () => {
      await this.navTicketPrice.click();
    });
  }

  async navigateToFaq(): Promise<void> {
    await test.step("Navigate to FAQ Page", async () => {
      await this.navFaq.click();
    });
  }

  async navigateToTimetable(): Promise<void> {
    await test.step("Navigate to Timetable Page", async () => {
      await this.navTimetable.click();
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

  async logout(): Promise<void> {
    await test.step("Logout", async () => {
      await this.navLogout.click();
    });
  }

  async shouldWelcomeMsgVisible(email: string): Promise<void> {
    const welcomeMsg = this.page.getByText(`Welcome ${email}`);
    await expect(welcomeMsg).toBeVisible();
  }
}
