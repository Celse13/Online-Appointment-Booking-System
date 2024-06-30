import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel';
import JWT from '../utils/jwt';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import crypto from 'crypto';
import { BusinessModel } from '../models/businessModel';

const BCRYPT_SALT_ROUNDS: number = 12;
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract email, name, and password from req.body
      const {
        email,
        name,
        lastName,
        password,
        role,
        businessDescription,
        phone,
        location,
      } = req.body;
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      // Check if username already exists
      const existingUsername = await UserModel.findOne({ name });
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      // Create a new user
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      // Generate a verification token
      const verificationToken = crypto.randomBytes(20).toString('hex');
      const user = new UserModel({
        email,
        name,
        lastName,
        role,
        password: hashedPassword,
        verificationToken,
      });
      await user.save();

      // If the role is 'business', create a new business
      if (role === 'business') {
        const business = new BusinessModel({
          owner: user._id,
          businessDescription,
          phone,
          location,
        });
        await business.save();
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Account Verification Token',
        text: `Hello,\n\n
                    Please verify your account by clicking the link: \n${process.env.BASE_URL}/api/auth/verify/${verificationToken}\n`,
      };

      transporter.sendMail(
        mailOptions,
        (error: Error | null, info: SentMessageInfo) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Failed to send email' });
          } else {
            console.log('Email sent: ' + info.response);
          }
        },
      );
      const token = JWT.generateJwt(
        String(user._id),
        user.email,
        user.name,
        user.role,
      );
      res.status(201).json({
        ok: true,
        message:
          'Signed up successfully. Please verify your account before logging in.', token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;

      const user = await UserModel.findOne({ verificationToken: token });
      if (!user) {
        return res.status(400).json({ message: 'Invalid verification token' });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();

      res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: 'User is not verified' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = JWT.generateJwt(
        String(user._id),
        user.email,
        user.name,
        user.role,
      );
      res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
      next(error);
    }
  }

  static async checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
      return res.status(200).json({ message: 'Email exists' });
    } catch (error) {
      next(error);
    }
  }

  static async checkPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid password' });
      } else {
        return res.status(200).json({ message: 'Valid password' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async checkVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.isVerified) {
        return res.status(200).json({ message: 'User is verified' });
      } else {
        return res.status(400).json({ message: 'User is not verified' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = user.generatePasswordResetToken();
      console.log('Reset Token:', resetToken);
      console.log('Expires:', user.passwordResetExpires);
      await user.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                    Please click on the following link, or paste this into your browser to complete the process:\n\n${baseURL}/api/auth/reset-password/${resetToken}\n\n
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(
        mailOptions,
        (error: Error | null, info: SentMessageInfo) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Failed to send email' });
          } else {
            console.log('Email sent: ' + info.response);
          }
        },
      );

      res
        .status(200)
        .json({ message: 'Password reset link sent to your email address' });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      console.log('Token:', token);
      console.log('New Password:', newPassword);

      // Hash the token from the request
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await UserModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Password reset token is invalid or has expired' });
      }
      user.password = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      next(error);
    }
  }

  static async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const userData = JWT.generateJwt(
        String(user._id),
        user.email,
        user.name,
        user.role,
      );
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
