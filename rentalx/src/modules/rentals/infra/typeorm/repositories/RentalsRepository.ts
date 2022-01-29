import { ICreateRentalDTO } from '@modules/rentals/DTO/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async update(rental: Rental): Promise<Rental> {
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalsByCar = await this.repository.find({ car_id });
    const openByCar = rentalsByCar.find(
      (rental: Rental) => rental.end_date === null,
    );
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalsByUser = await this.repository.find({ user_id });
    const openByUser = rentalsByUser.find(
      (rental: Rental) => rental.end_date === null,
    );
    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentalsByUser;
  }
}

export { RentalsRepository };
