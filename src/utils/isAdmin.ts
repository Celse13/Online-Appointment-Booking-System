import { Request, Response, NextFunction } from 'express';

import { IUser } from '../models/userModel';

export function checkRole(role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;

    if (user && user.role && user.role.type === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
}
