import { Request, Response, NextFunction, text } from 'express';
import { UserModel } from '../models/userModel';
import JWT from '../utils/jwt';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import crypto from 'crypto';
import { BusinessModel } from '../models/businessModel';

const BCRYPT_SALT_ROUNDS: number = 12;
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.find({});
      res.status(200).json({ ok: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user id' });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ ok: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const updateData = req.body;

      delete updateData.password;
      delete updateData.passwordResetToken;
      delete updateData.passwordResetExpires;

      const user = await UserModel.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ ok: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await UserModel.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ ok: true, message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user id' });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordCorrect = bcrypt.compare(oldPassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid old password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
      user.password = hashedPassword;
      await user.save();

      res
        .status(200)
        .json({ ok: true, message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
