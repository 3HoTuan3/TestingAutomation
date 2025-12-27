import { Page, expect } from "@playwright/test";
import { BookTicket } from "../models/bookticket";

export class BookTicketPage {
  private readonly bookTicketTab = 'a[href*="BookTicket"]';
  private readonly pageTitle = 'h1:has-text("Book ticket")';

  private readonly departDateDropdown = 'select[name="Date"]';
  private readonly departFromDropdown = 'select[name="DepartStation"]';
  private readonly arriveAtDropdown = 'select[name="ArriveStation"]';
  private readonly seatTypeDropdown = 'select[name="SeatType"]';
  private readonly ticketAmountDropdown = 'select[name="TicketAmount"]';
  private readonly validationError = "label.validation-error";

  private readonly bookTicketButton =
    'input[type="submit"][value="Book ticket"]';

  private readonly successMessage = ".message.success";
  private readonly errorMessage = ".message.error";

  private readonly bookedTicketTable = "table.NoBorder";

  constructor(private readonly page: Page) {}

  async navigateToBookTicket(): Promise<void> {
    await this.page.click(this.bookTicketTab);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyUIDisplaysProperly(): Promise<void> {
    await expect(this.page.locator(this.pageTitle)).toBeVisible();
    await expect(this.page.locator(this.departDateDropdown)).toBeVisible();
    await expect(this.page.locator(this.departFromDropdown)).toBeVisible();
    await expect(this.page.locator(this.arriveAtDropdown)).toBeVisible();
    await expect(this.page.locator(this.seatTypeDropdown)).toBeVisible();
    await expect(this.page.locator(this.ticketAmountDropdown)).toBeVisible();
    await expect(this.page.locator(this.bookTicketButton)).toBeVisible();
  }

  async bookTicket(ticket: BookTicket): Promise<void> {
    await this.page.selectOption(this.departDateDropdown, ticket.departDate);
    await this.page.selectOption(this.departFromDropdown, ticket.departFrom);
    await this.page.selectOption(this.arriveAtDropdown, ticket.arriveAt);
    await this.page.selectOption(this.seatTypeDropdown, ticket.seatType);
    await this.page.selectOption(
      this.ticketAmountDropdown,
      ticket.amount.toString(),
    );

    await this.page.click(this.bookTicketButton);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyBookedSuccessfully(): Promise<void> {
    await expect(this.page).toHaveURL(/SuccessPage\.cshtml/);

    await expect(
      this.page.getByRole("heading", {
        name: "Ticket Booked Successfully!",
      }),
    ).toBeVisible();

    await expect(
      this.page.locator("text=You have successfully booked your ticket."),
    ).toBeVisible();
  }

  async verifyBookedTicket(ticket: BookTicket): Promise<void> {
    const table = this.page.locator(this.bookedTicketTable);

    await expect(table).toContainText(ticket.departFrom);
    await expect(table).toContainText(ticket.arriveAt);
    await expect(table).toContainText(ticket.seatType);
    await expect(table).toContainText(ticket.departDate);
    await expect(table).toContainText(ticket.amount.toString());
  }

  async verifyBookingLimitError(): Promise<void> {
    await expect(this.page.locator(this.validationError)).toHaveText(
      "You have booked 10 tickets. You can book no more.",
    );
  }
}
