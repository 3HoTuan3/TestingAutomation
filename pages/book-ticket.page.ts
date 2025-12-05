// Path: pages/book-ticket.page.ts

import { Page, expect } from "@playwright/test";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";

export class BookTicketPage {
  private page: Page;

  // Locators
  private readonly bookTicketTab = 'a[href*="BookTicket"]';
  private readonly pageTitle = 'h1:has-text("Book ticket")';
  private readonly departDateDropdown = 'select[name="Date"]';
  private readonly departFromDropdown = 'select[name="DepartStation"]';
  private readonly arriveAtDropdown = 'select[name="ArriveStation"]';
  private readonly seatTypeDropdown = 'select[name="SeatType"]';
  private readonly ticketAmountDropdown = 'select[name="TicketAmount"]';
  private readonly bookTicketButton = 'input[type="submit"][value="Book ticket"]';
  private readonly successMessage = '.message.success';
  private readonly errorMessage = '.message.error';
  private readonly bookedTicketTable = "table.NoBorder";
  private readonly departFromOption = (station: string) => `select[name="DepartStation"] option:has-text("${station}")`;
  private readonly arriveAtOption = (station: string) => `select[name="ArriveStation"] option:has-text("${station}")`;
  
  // Constants for Test
  private readonly MIN_TICKET_AMOUNT = 1;
  private readonly MAX_TICKET_AMOUNT = 10;
  private readonly MAX_TICKET_TOTAL = 10;

  constructor(page: Page) {
    this.page = page;
  }

  // --- Navigation & Basic UI Verification ---

  async navigateToBookTicket() {
    await this.page.click(this.bookTicketTab);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyUIDisplaysProperly() {
    // Verify title and form elements are visible
    await expect(this.page.locator(this.pageTitle)).toBeVisible();
    await expect(this.page.locator(this.departDateDropdown)).toBeVisible();
    await expect(this.page.locator(this.departFromDropdown)).toBeVisible();
    await expect(this.page.locator(this.arriveAtDropdown)).toBeVisible();
    await expect(this.page.locator(this.seatTypeDropdown)).toBeVisible();
    await expect(this.page.locator(this.ticketAmountDropdown)).toBeVisible();
    await expect(this.page.locator(this.bookTicketButton)).toBeVisible();
  }
  
  async verifyButtonHoverEffect() {
    const button = this.page.locator(this.bookTicketButton);
    const initialColor = await button.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    
    await button.hover();
    await this.page.waitForTimeout(500); // Wait for hover effect
    
    const hoverColor = await button.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    
    // Colors should be different
    expect(initialColor).not.toBe(hoverColor);
  }

  // --- Form Interaction Methods ---

  async selectBookingInfo(
    departDate: string,
    departFrom: string,
    arriveAt: string,
    seatType: string,
    amount: number,
  ) {
    await this.page.selectOption(this.departDateDropdown, departDate);
    await this.page.selectOption(this.departFromDropdown, departFrom);
    await this.page.selectOption(this.arriveAtDropdown, arriveAt);
    await this.page.selectOption(this.seatTypeDropdown, seatType);
    await this.page.selectOption(this.ticketAmountDropdown, amount.toString());
  }

  async clickBookTicket() {
    await this.page.click(this.bookTicketButton);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // --- Verification Methods ---
  
  async verifyBookingSuccess() {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
    await expect(this.page.locator(this.bookedTicketTable)).toBeVisible();
  }

  async verifyBookingError(expectedError: string) {
    await expect(this.page.locator(this.errorMessage)).toContainText(expectedError);
  }

  async getTicketDetailsFromTable() {
    // Logic to extract data from the table (BT-06)
    const table = this.page.locator(this.bookedTicketTable);
    const rows = await table.locator('tr').all();
    
    if (rows.length < 2) return null;

    // Assuming the details are in the second row (index 1) of the table
    const cells = await rows[1].locator('td').allTextContents();
    
    // Assuming the table structure is consistent:
    // [0] Depart Station, [1] Arrive Station, [2] Seat Type, [3] Depart Date, 
    // [4] Book Date, [5] Expired Date, [6] Amount, [7] Total Price (VND)
    return {
        departStation: cells[0],
        arriveStation: cells[1],
        seatType: cells[2],
        departDate: cells[3],
        bookDate: cells[4],
        expiredDate: cells[5],
        amount: parseInt(cells[6]),
        totalPrice: cells[7], // Keep as string for now
    };
  }

  // --- Dropdown Verification Methods (BT-05) ---
  
  async verifyDepartDatesAreValid() {
    const options = await this.page.locator(`${this.departDateDropdown} option`).allTextContents();
    
    // Check if the number of options (dates) is within 3 to 30 days ahead
    // Excluding the default option if present, but typically the range is 28 days
    expect(options.length).toBeGreaterThanOrEqual(3);
    expect(options.length).toBeLessThanOrEqual(30); 
    
    // Basic check: dates are in future and sequential (optional)
  }

  async verifySeatTypes() {
    const expectedSeatTypes = [
      "Hard seat",
      "Soft seat",
      "Soft seat with air conditioner",
      "Hard bed",
      "Soft bed",
      "Soft bed with air conditioner",
    ];
    
    const options = await this.page.locator(`${this.seatTypeDropdown} option`).allTextContents();
    
    // Should contain all expected types, excluding the initial prompt/label if any
    for (const type of expectedSeatTypes) {
        expect(options).toContain(type);
    }
  }
  
  async verifyTicketAmountRange() {
    const options = await this.page.locator(`${this.ticketAmountDropdown} option`).allTextContents();
    
    // Verify amounts from 1 to 10
    for (let i = this.MIN_TICKET_AMOUNT; i <= this.MAX_TICKET_AMOUNT; i++) {
        expect(options).toContain(i.toString());
    }
    // Verify no amounts outside 1-10
    expect(options.length).toBe(this.MAX_TICKET_AMOUNT - this.MIN_TICKET_AMOUNT + 1);
  }

  async verifyDepartArriveNotSame(departStation: string, arriveStation: string) {
    // 1. Select Depart Station
    await this.page.selectOption(this.departFromDropdown, departStation);
    await this.page.waitForTimeout(500); // Wait for the 'Arrive at' dropdown to refresh

    // 2. Verify that the 'Arrive at' dropdown does NOT contain the selected 'Depart from' station
    const arriveOptions = await this.page.locator(`${this.arriveAtDropdown} option`).allTextContents();
    expect(arriveOptions).not.toContain(departStation);
  }
  
  // --- Trip Matrix Verification (BT-07) ---

  async verifyRouteExists(departStation: string, arriveStation: string, shouldExist: boolean) {
      await this.page.selectOption(this.departFromDropdown, departStation);
      
      // Wait for the Arrive At dropdown to update based on Depart From
      await this.page.waitForTimeout(500); 

      // Check if the Arrive At option is visible/present
      const arriveOption = this.page.locator(this.arriveAtOption(arriveStation));
      
      if (shouldExist) {
          await expect(arriveOption).toBeVisible();
      } else {
          // If the route should NOT exist, the option should be hidden or not present.
          // Using toHaveCount(0) is a more robust check for non-existence.
          await expect(arriveOption).toHaveCount(0); 
      }
  }
}