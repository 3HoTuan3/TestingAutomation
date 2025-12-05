import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
// import { BookTicketPage } from "../pages/book-ticket.page";

const BASE_URL = "http://railwayb2.somee.com/Page/HomePage.cshtml";
const TEST_EMAIL = "cijnuj@ramcloud.us";
const TEST_PASSWORD = "123456789";

export class TicketPricePage {
  private page: Page;

  // Locators
  private readonly ticketPriceTab = 'a[href*="TrainPriceList"]';
  private readonly pageTitle = 'h1:has-text("Train ticket pricing list")';
  private readonly checkPriceButtons = 'a:has-text("Check Price")';
  private readonly bookTicketButtons = 'a:has-text("Book ticket")';

  // Train route sections
  private readonly saiGonSection = 'text="Trains depart from Sài Gòn:"';
  private readonly phanThietSection = 'text="Trains depart from Phan Thiết:"';
  private readonly nhaTrangSection = 'text="Trains depart from Nha Trang:"';
  private readonly daNangSection = 'text="Trains depart from Đà Nẵng:"';
  private readonly hueSection = 'text="Trains depart from Huế:"';
  private readonly quangNgaiSection = 'text="Trains depart from Quảng Ngãi:"';

  // Ticket price page elements
  private readonly ticketPricePageTitle = 'h1:has-text("Ticket Price")';
  private readonly priceTable = "table";
  private readonly seatTypeRow = 'tr:has-text("Seat type")';
  private readonly priceRow = 'tr:has-text("Price (VND)")';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToTicketPrice() {
    await this.page.click(this.ticketPriceTab);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyUIDisplaysProperly() {
    // Verify page title
    await expect(this.page.locator(this.pageTitle)).toBeVisible();

    // Verify all train sections are displayed
    await expect(this.page.locator(this.saiGonSection)).toBeVisible();
    await expect(this.page.locator(this.phanThietSection)).toBeVisible();
    await expect(this.page.locator(this.nhaTrangSection)).toBeVisible();
    await expect(this.page.locator(this.daNangSection)).toBeVisible();
    await expect(this.page.locator(this.hueSection)).toBeVisible();
    await expect(this.page.locator(this.quangNgaiSection)).toBeVisible();

    // Verify Check Price buttons are visible
    const buttons = await this.page.locator(this.checkPriceButtons).all();
    expect(buttons.length).toBeGreaterThan(0);

    for (const button of buttons) {
      await expect(button).toBeVisible();
    }
  }

  async verifyButtonHoverEffect() {
    const firstButton = this.page.locator(this.checkPriceButtons).first();

    // Get initial background color
    const initialColor = await firstButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Hover over button
    await firstButton.hover();
    await this.page.waitForTimeout(500);

    // Get hover background color
    const hoverColor = await firstButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Colors should be different
    expect(initialColor).not.toBe(hoverColor);
  }

  async clickCheckPrice(departStation: string, arriveStation: string) {
    // Find the specific route and click its Check Price button
    const routeText = `${departStation} to ${arriveStation}`;
    const routeRow = this.page.locator(`text="${routeText}"`).locator("..");
    await routeRow.locator(this.checkPriceButtons).click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyTicketPricePageDisplayed() {
    await expect(this.page.locator(this.ticketPricePageTitle)).toBeVisible();
    await expect(this.page.locator(this.priceTable)).toBeVisible();
  }

  async verifyPriceTableForRoute(departStation: string, arriveStation: string) {
    const routeTitle = `Ticket price from ${departStation} to ${arriveStation}`;
    await expect(this.page.locator(`text="${routeTitle}"`)).toBeVisible();

    // Verify seat types are displayed
    await expect(this.page.locator(this.seatTypeRow)).toBeVisible();
    await expect(this.page.locator(this.priceRow)).toBeVisible();

    // Verify seat type columns
    const seatTypes = ["HS", "SS", "SSC", "HB", "SB", "SBC"];
    for (const seatType of seatTypes) {
      await expect(
        this.page.locator(`th:has-text("${seatType}")`),
      ).toBeVisible();
    }
  }

  async verifySeatTypeDescriptions() {
    const descriptions = [
      { code: "HS:", description: "Hard seat" },
      { code: "SS:", description: "Soft seat" },
      { code: "SSC:", description: "Soft seat with air conditioner" },
      { code: "HB:", description: "Hard bed" },
      { code: "SB:", description: "Soft bed" },
      { code: "SBC:", description: "Soft bed with air conditioner" },
    ];

    for (const desc of descriptions) {
      await expect(this.page.locator(`text="${desc.code}"`)).toBeVisible();
      await expect(
        this.page.locator(`text="${desc.description}"`),
      ).toBeVisible();
    }
  }

  async clickBookTicketFromPricePage() {
    await this.page.locator(this.bookTicketButtons).first().click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyRedirectedToLogin() {
    await expect(this.page).toHaveURL(/login/i, { timeout: 10000 });
  }

  async getAllRoutes(): Promise<string[]> {
    const routes: string[] = [];

    // Get all route text elements
    const routeElements = await this.page.locator("text=/to/").all();

    for (const element of routeElements) {
      const text = await element.textContent();
      if (text) {
        routes.push(text.trim());
      }
    }

    return routes;
  }

  async verifyValidRoutes() {
    const expectedDepartStations = [
      "Sài Gòn",
      "Phan Thiết",
      "Nha Trang",
      "Đà Nẵng",
      "Huế",
      "Quảng Ngãi",
    ];

    const expectedArriveStations = [
      "Sài Gòn",
      "Phan Thiết",
      "Nha Trang",
      "Đà Nẵng",
      "Huế",
      "Quảng Ngãi",
      "Hà Nội",
    ];

    // Verify each departure section exists
    for (const station of expectedDepartStations) {
      await expect(
        this.page.locator(`text="Trains depart from ${station}:"`),
      ).toBeVisible();
    }

    // Get all routes and verify they are valid
    const routes = await this.getAllRoutes();
    expect(routes.length).toBeGreaterThan(0);

    for (const route of routes) {
      // Parse the route (format: "Station1 to Station2")
      const parts = route.split(" to ");
      if (parts.length === 2) {
        const depart = parts[0].trim();
        const arrive = parts[1].trim();

        // Verify both stations are in expected lists
        const departValid = expectedDepartStations.some((s) =>
          depart.includes(s),
        );
        const arriveValid = expectedArriveStations.some((s) =>
          arrive.includes(s),
        );

        expect(departValid).toBeTruthy();
        expect(arriveValid).toBeTruthy();

        // Verify depart and arrive are different
        expect(depart).not.toBe(arrive);
      }
    }
  }

  async getPriceForSeatType(seatType: string): Promise<string> {
    const priceCell = this.page
      .locator(`td:has-text("${seatType}")`)
      .locator("..")
      .locator("td")
      .nth(1);
    return (await priceCell.textContent()) || "";
  }

  async verifyNoMisspelledWords() {
    // Check for common misspellings
    const pageContent = await this.page.content();

    // Verify correct spellings
    expect(pageContent).toContain("Train ticket pricing list");
    expect(pageContent).toContain("Check Price");
    expect(pageContent).toContain("Seat type");
    expect(pageContent).toContain("Price (VND)");
  }
}
