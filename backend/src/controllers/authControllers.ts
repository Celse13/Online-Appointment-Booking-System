import { Request, Response, NextFunction, text } from 'express';
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
            const { email, name, password, role, businessDescription, phoneNumber, location } = req.body;
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
                phoneNumber,
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

            res.status(201).json({
                ok: true,
                message:
                    'Signed up successfully. Please verify your account before logging in.',
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

            const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
            user.password = hashedPassword;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();

            res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            next(error);
        }
    }

}


export default AuthController;