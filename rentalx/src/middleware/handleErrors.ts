import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';

export function handleErrors(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ Error: err.message });
  }

  return response
    .status(500)
    .json({ Error: `Internal server error - ${err.message}` });
}
