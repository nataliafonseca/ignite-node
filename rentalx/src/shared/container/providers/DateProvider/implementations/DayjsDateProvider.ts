import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  addDays(date: Date, increment: number): Date {
    return dayjs(date).add(increment, 'day').toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }

  addHours(increment: number): Date {
    return dayjs().add(increment, 'hours').toDate();
  }

  compareIfBefore(date: Date, limit: Date): boolean {
    return dayjs(date).isBefore(limit);
  }
}

export { DayjsDateProvider };
