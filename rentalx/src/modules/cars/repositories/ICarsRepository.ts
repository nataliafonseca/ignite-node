import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
