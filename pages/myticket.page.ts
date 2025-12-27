import { expect, Locator, Page, test } from "@playwright/test";

export class MyTicketPage {
  private readonly page: Page;
  private readonly header: Locator;
  private readonly ticketTable: Locator;
  private readonly filterArea: Locator;
  private readonly btnApplyFilter: Locator;

  private readonly selectDepartStation: Locator;
  private readonly selectArriveStation: Locator;
  private readonly inputDepartDate: Locator;
  private readonly selectStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator("h1");
    this.ticketTable = this.page.locator("table.MyTable");
    this.filterArea = this.page.locator(".filter");

    this.selectDepartStation = this.page.locator(
      "select[name='FilterDpStation']",
    );
    this.selectArriveStation = this.page.locator(
      "select[name='FilterArStation']",
    );

    // Status cũng thường là dropdown
    this.selectStatus = this.page.locator("select[name='FilterStatus']");

    // Date thường vẫn là input text hoặc datepicker
    this.inputDepartDate = this.page.locator("input[name='FilterDpDate']");

    this.btnApplyFilter = this.page.locator("input[value='Apply Filter']");
  }

  async shouldMyTicketPageVisible(): Promise<void> {
    await expect(this.header).toContainText("Manage ticket");
  }

  async getTicketCount(): Promise<number> {
    return (await this.ticketTable.locator("tr").count()) - 1;
  }

  async shouldTableDisplayProperly(): Promise<void> {
    await test.step("Verify Ticket table is visible and structured correctly", async () => {
      await expect(this.ticketTable).toBeVisible();
      await expect(this.ticketTable.locator("th").first()).toBeVisible();
    });
  }

  async shouldHaveBookedTickets(): Promise<void> {
    await test.step("Verify that the user has booked tickets", async () => {
      const count = await this.getTicketCount();
      expect(count).toBeGreaterThan(0);
    });
  }

  async cancelTicket(rowIndex: number): Promise<void> {
    await test.step(`Click 'Cancel' button at row ${rowIndex}`, async () => {
      this.page.once("dialog", async (dialog) => {
        await dialog.accept();
      });

      const btnCancel = this.ticketTable
        .locator("tr")
        .nth(rowIndex + 1)
        .getByRole("button", { name: "Cancel" });
      await btnCancel.click();
    });
  }

  async deleteTicket(rowIndex: number): Promise<void> {
    await test.step(`Click 'Delete' button at row ${rowIndex}`, async () => {
      this.page.once("dialog", async (dialog) => {
        await dialog.accept();
      });
      const btnDelete = this.ticketTable
        .locator("tr")
        .nth(rowIndex + 1)
        .getByRole("button", { name: "Delete" });
      await btnDelete.click();
    });
  }

  async shouldFilterVisible(isVisible: boolean): Promise<void> {
    await test.step(`Verify Filter section visibility is ${isVisible}`, async () => {
      if (isVisible) {
        await expect(this.filterArea).toBeVisible();
      } else {
        await expect(this.filterArea).toBeHidden();
      }
    });
  }

  async applyFilter(criteria: {
    departStation?: string;
    arriveStation?: string;
    departDate?: string;
    status?: string;
  }): Promise<void> {
    await test.step(`Apply filter with criteria: ${JSON.stringify(criteria)}`, async () => {
      if (criteria.departStation)
        await this.selectDepartStation.selectOption(criteria.departStation);

      if (criteria.arriveStation)
        await this.selectArriveStation.selectOption(criteria.arriveStation);

      if (criteria.departDate)
        await this.inputDepartDate.fill(criteria.departDate);

      if (criteria.status)
        await this.selectStatus.selectOption(criteria.status);

      await this.btnApplyFilter.click();
    });
  }

  async verifyFilterResult(expectedValue: string): Promise<void> {
    await test.step(`Verify table rows contain text: "${expectedValue}"`, async () => {
      const rows = this.ticketTable.locator("tr");
      const count = await rows.count();

      if (count <= 1) {
        console.log("No result found matching criteria.");
        return;
      }

      for (let i = 1; i < count; i++) {
        await expect(rows.nth(i)).toContainText(expectedValue);
      }
    });
  }

  async verifyTicketInfoAtRow(index: number, info: string): Promise<void> {
    await expect(this.ticketTable.locator("tr").nth(index + 1)).toContainText(
      info,
    );
  }

  async findIndexOfExpiredTicket(): Promise<number> {
    const rows = await this.ticketTable.locator("tr").count();
    for (let i = 1; i < rows; i++) {
      const row = this.ticketTable.locator("tr").nth(i);
      if (await row.getByRole("button", { name: "Delete" }).isVisible()) {
        return i - 1;
      }
    }
    return -1;
  }
}
