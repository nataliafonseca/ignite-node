import { UserProfileUseCase } from '@modules/accounts/useCases/userProfile/UserProfileUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const { id } = request.user;

    const user = await userProfileUseCase.execute(id);

    return response.status(200).send(user);
  }
}

export { UserProfileController };
