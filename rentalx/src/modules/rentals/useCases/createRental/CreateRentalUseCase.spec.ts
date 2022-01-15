import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: IDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory,
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
