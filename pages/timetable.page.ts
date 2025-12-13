import { Page } from '@playwright/test';

enum TimetableColumn {
    NO = "No.",
    DEPART_STATION = "Depart Station",
    ARRIVE_STATION = "Arrive Station",
    DEPART_TIME = "Depart Time",
    ARRIVE_TIME = "Arrive Time",
    CHECK_PRICE = "Check Price",
    BOOK_TICKET = "Book ticket"
}

export class TimetablePage {
    private readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async getDepartTime(departStt: string, arriveStt: string): Promise<string> {
        const currentRow = await this.getTargetRow(departStt, arriveStt);
        
        const departTimeIndex = await this.getColumnIndex(TimetableColumn.DEPART_TIME);
        return (await currentRow.locator(`xpath=.//td[${departTimeIndex}]`).textContent()) || ''
    }

    async getArriveTime(departStt: string, arriveStt: string): Promise<string> {
        const currentRow = await this.getTargetRow(departStt, arriveStt);
        
        const arriveTimeIndex = await this.getColumnIndex(TimetableColumn.ARRIVE_TIME);
        return (await currentRow.locator(`xpath=.//td[${arriveTimeIndex}]`).textContent()) || ''
    }

    async checkPrice(departStation: string, arriveStation: string): Promise<void> {
        const currentRow = await this.getTargetRow(departStation, arriveStation);
        
        await currentRow.getByRole('link', {
            name: 'check price'
        }).click()
    }

    async bookTicket(departStation: string, arriveStation: string): Promise<void> {
        const currentRow = await this.getTargetRow(departStation, arriveStation);
        
        await currentRow.getByRole('link', {
            name: 'book ticket'
        }).click()
    }

    private async getColumnIndex(columnName: TimetableColumn): Promise<number> {
        return await this.page.locator(`//th[text()='${columnName}']/preceding-sibling::th`).count() + 1;
    }

    private async getTargetRow(departStation: string, arriveStation: string): Promise<Locator> {
        const departStationIndex = await this.getColumnIndex(TimetableColumn.DEPART_STATION);
        const arriveStationIndex = await this.getColumnIndex(TimetableColumn.ARRIVE_STATION);
        return this.page.locator(`//tr[td[text()='${departStation}' and position()=${departStationIndex}] and td[position()=${arriveStationIndex} and text()='${arriveStation}']]`);
    }    
}