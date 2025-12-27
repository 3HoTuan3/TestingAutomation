import { expect, Locator, Page } from "@playwright/test";

export class TicketPricePage {
  private readonly page: Page;
  private readonly ticketPriceTab: Locator;
  private readonly pageHeader: Locator;
  private readonly checkPriceButtons: Locator;
  private readonly seatTypeColumn: Locator;
  private readonly priceColumn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.ticketPriceTab = this.page.getByRole("link", {
      name: "Ticket Price",
    });

    this.pageHeader = this.page.locator(
      'h1:has-text("Train ticket pricing list")',
    );
    this.checkPriceButtons = this.page.locator(
      'a.BoxLink:has-text("Check Price")',
    );

    this.seatTypeColumn = this.page.locator("th.RowHeader", {
      hasText: "Seat type",
    });
    this.priceColumn = this.page.locator("text=Price (VND)");
  }

  async navigateToTicketPrice(): Promise<void> {
    await this.ticketPriceTab.click();
  }

  async clickCheckPriceFirstRow(): Promise<void> {
    await this.checkPriceButtons.first().click();
  }

  async hoverCheckPriceFirstRow(): Promise<void> {
    await this.checkPriceButtons.first().hover();
  }

  async shouldHeaderBeVisible(): Promise<void> {
    await expect(this.pageHeader).toBeVisible();
  }

  async shouldCheckPriceButtonBeVisible(): Promise<void> {
    await expect(this.checkPriceButtons.first()).toBeVisible();
  }

  async shouldCheckPriceHoverEffectWork(): Promise<void> {
    const button = this.checkPriceButtons.first();

    const colorBeforeHover = await button.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );

    await button.hover();

    const colorAfterHover = await button.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );

    expect(colorAfterHover).not.toBe(colorBeforeHover);
  }

  async shouldNavigateToTicketPriceDetail(): Promise<void> {
    await expect(this.page).toHaveURL(
      /\/Page\/TicketPricePage\.cshtml\?id1=\d+&id2=\d+/,
    );
  }

  async shouldDisplaySeatTypeColumn(): Promise<void> {
    await expect(this.seatTypeColumn).toBeVisible();
  }

  async shouldDisplayPriceColumn(): Promise<void> {
    await expect(this.priceColumn).toBeVisible();
  }

  async shouldCheckPriceButtonsVisible(): Promise<void> {
    await expect(this.checkPriceButtons.first()).toBeVisible();
  }
}
