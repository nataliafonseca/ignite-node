import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const user = await usersRepository.findById(user_id);

    console.log(user);

    if (!user) {
      throw new AppError('User does not exist.', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid Token', 401);
  }
}
