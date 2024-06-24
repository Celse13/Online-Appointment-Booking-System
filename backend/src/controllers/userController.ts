import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.userId}${path.extname(file.originalname)}`);
  },
});
multer({ storage });

const BCRYPT_SALT_ROUNDS: number = 12;

class UserController {
  static async getAllUsers(_req: Request, res: Response, next: NextFunction) {
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

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture ? req.protocol + '://' + req.get('host') + user.profilePicture : '',
        role: user.role,
        isVerified: user.isVerified,
      };

      res.status(200).json({ ok: true, data: userData });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserPassword(req: Request, res: Response, next: NextFunction) {
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

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const updateData = { ...req.body };

      if (req.file) {
        updateData.profilePicture = `/uploads/${req.file.filename}`;
      }

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true },
      );
      !user && res.status(404).json({ message: 'User not found'})
      res.status(200).json({ message: 'User updated successfully', user });
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

      user.password = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
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
