import { Request, Response, NextFunction } from 'express';

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
} 