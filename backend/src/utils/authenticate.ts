import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { UserModel } from '../models/userModel';
import { IUser } from '../models/userModel';

dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authentication token found' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    const user = await UserModel.findById((decoded as any)._id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Pass control to the next middleware function
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

export default authenticate;
