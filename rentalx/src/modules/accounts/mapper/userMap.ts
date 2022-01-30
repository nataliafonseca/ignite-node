import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
