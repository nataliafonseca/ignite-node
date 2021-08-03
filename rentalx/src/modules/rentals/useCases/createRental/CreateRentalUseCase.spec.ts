import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: IDateProvider;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dateProvider.addDays(dateProvider.dateNow(), 1),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental for an unavailable car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dateProvider.addDays(dateProvider.dateNow(), 1),
      });
      await createRentalUseCase.execute({
        user_id: '12346',
        car_id: '121212',
        expected_return_date: dateProvider.addDays(dateProvider.dateNow(), 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open for the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dateProvider.addDays(dateProvider.dateNow(), 1),
      });
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121213',
        expected_return_date: dateProvider.addDays(dateProvider.dateNow(), 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create rental with less than 24h expected return', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
