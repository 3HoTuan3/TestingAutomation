export class BookTicket {
  public readonly departDate: string;
  public readonly departFrom: string;
  public readonly arriveAt: string;
  public readonly seatType: string;
  public readonly amount: number;

  constructor(options?: {
    departOffsetDays?: number;
    departFrom?: string;
    arriveAt?: string;
    seatType?: string;
    amount?: number;
  }) {
    const amount = options?.amount ?? Math.floor(Math.random() * 5) + 1;
    const offset = options?.departOffsetDays ?? 4;
    const departFrom = options?.departFrom ?? "Sài Gòn";
    const arriveAt = options?.arriveAt ?? "Quảng Ngãi";
    const seatType = options?.seatType ?? "Hard seat";

    const date = new Date();
    date.setDate(date.getDate() + offset);

    this.departDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    this.departFrom = departFrom;
    this.arriveAt = arriveAt;
    this.seatType = seatType;

    this.amount = amount;
  }
}
