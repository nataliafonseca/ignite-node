import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 5, // 5 requests
    duration: 1, // per second by IP
  });

  try {
    await rateLimiter.consume(request.ip);
    return next();
  } catch (error) {
    console.log(error);
    throw new AppError('Too many requests', 429);
  }
}
