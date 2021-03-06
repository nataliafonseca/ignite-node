import { ICreateRentalDTO } from '@modules/rentals/DTO/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  update(rental: Rental): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
