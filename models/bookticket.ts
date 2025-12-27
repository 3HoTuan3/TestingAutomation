export class BookTicket {
  public readonly departDate: string;
  public readonly departFrom: string;
  public readonly arriveAt: string;
  public readonly seatType: string;
  public readonly amount: number;

  constructor(amount: number = Math.floor(Math.random() * 5) + 1) {
    const date = new Date();
    date.setDate(date.getDate() + 4);

    this.departDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    this.departFrom = "Sài Gòn";
    this.arriveAt = "Quảng Ngãi";
    this.seatType = "Hard seat";

    this.amount = amount;
  }
}
