import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AppError } from './error.middleware';

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const validateRequest = (type: any): ValidationMiddleware => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = plainToInstance(type, req.body);
      const errors = await validate(input);

      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}));
        throw new AppError(errorMessages.join(', '), 400);
      }

      req.body = input;
      next();
    } catch (error) {
      next(error);
    }
  };
}; 