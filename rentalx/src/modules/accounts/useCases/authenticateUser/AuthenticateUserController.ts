import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { email, password } = request.body;

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(token);
  }
}

export { AuthenticateUserController };
