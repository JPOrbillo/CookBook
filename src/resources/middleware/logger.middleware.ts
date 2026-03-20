import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  if (req.url === '/auth/login') {
    console.log('Login attempt at:', new Date().toLocaleString());
  } else if (req.url === '/users/allUsers') {
    console.log('Fetching all users at:', new Date().toLocaleString());
  }
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Status Code:', res.statusCode);
  next();
}
