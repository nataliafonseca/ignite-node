import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let car1: Car;
let car2: Car;

describe('List Cars', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );

    car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'brand1',
      category_id: 'category1',
    });

    car2 = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'DEF-1234',
      fine_amount: 60,
      brand: 'brand2',
      category_id: 'category2',
    });
  });

  it('sould be able to list all available cars', async () => {
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able to list all available cars by name', async () => {
    const cars = await listAvailableCarsUseCase.execute({ name: 'Car2' });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all available cars by brand', async () => {
    const cars = await listAvailableCarsUseCase.execute({ brand: 'brand1' });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all available cars by category', async () => {
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category2',
    });

    expect(cars).toEqual([car2]);
  });
});
