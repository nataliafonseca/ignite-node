import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minRentalDays = 1;

    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    if (rental.user_id !== user_id) {
      throw new AppError('Authentication error', 401);
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();

    let totalDays = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (totalDays <= 0) {
      totalDays = minRentalDays;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow,
    );

    let total = 0;

    if (delay > 0) {
      const fine = delay * car.fine_amount;
      total += fine;
    }

    total += totalDays * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.update(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}

export { ReturnRentalUseCase };
