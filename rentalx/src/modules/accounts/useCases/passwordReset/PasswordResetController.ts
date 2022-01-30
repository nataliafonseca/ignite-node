import { PasswordResetUseCase } from '@modules/accounts/useCases/passwordReset/PasswordResetUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PasswordResetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const passwordResetUseCase = container.resolve(PasswordResetUseCase);

    const { token } = request.query;
    const { password } = request.body;

    await passwordResetUseCase.execute({ token: String(token), password });

    return response.json();
  }
}

export { PasswordResetController };
