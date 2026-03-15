import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request received at:', new Date().toLocaleString());
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Status Code:', res.statusCode);
  next();
}
