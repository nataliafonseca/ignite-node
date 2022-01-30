interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  dateNow(): Date;
  addDays(date: Date, increment: number): Date;
  addHours(increment: number): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIfBefore(date: Date, limit: Date): boolean;
}

export { IDateProvider };
