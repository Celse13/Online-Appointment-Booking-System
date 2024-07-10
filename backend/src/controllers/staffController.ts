import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import StaffModel from '../models/staffModel';
import { BusinessModel, IBusiness } from '../models/businessModel';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import JWT from '../utils/jwt';

const BCRYPT_SALT_ROUNDS: number = 12;
class StaffController {
  static async createStaff(req: Request, res: Response, next: NextFunction){
    try {
      const { name, lastName, email, password, position, permissions, workingHours } = req.body;
      const userId =  req.user ? req.user._id : undefined;
      const business = await BusinessModel.findOne({ owner: userId });
      if (!business) {
        return res.status(404).json({ message: 'No business found for this user' });
      }
      const businessId = business._id;
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      const existingUsername = await UserModel.findOne({ name });
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const verificationToken = crypto.randomBytes(20).toString('hex');
      const user = new UserModel({
        name,
        lastName,
        email,
        role: 'staff',
        password: hashedPassword,
        verificationToken,
      });
      await user.save();

      const newStaff = new StaffModel({
        user: user._id,
        business: businessId,
        position,
        permissions,
        workingHours,
      });
      await newStaff.save();
      business.staff.push(newStaff._id);
      await business.save();

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
                    Please verify your account by clicking the link: \n${process.env.BASE_URL}/api/auth/verify/${verificationToken}\n
                    Login with password: ${password}\n\n`,
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
      res.status(201).json({ ok: true, message: 'Staff created successfully', staff: newStaff, token });
    } catch (error) {
      next(error);
    }
  };

  static async getBusinessStaff(req: Request, res: Response, next: NextFunction) {
    const userId = req.user ? req.user._id : undefined;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const business = (await BusinessModel.findOne({
        owner: userId,
      })) as IBusiness;

      const staff = await StaffModel.find({ business: business._id as mongoose.Types.ObjectId }).populate('user', 'name lastName');
      res.status(200).json({ message: 'Staff fetched successfully', staff });
    } catch (error) {
      next(error);
    }
  }

  static async updateStaff(req: Request, res: Response){
    try {
      const staffId = req.params.id;
      const { position, permissions, workingHours } = req.body;

      const staff = await StaffModel.findByIdAndUpdate(
        staffId,
        {
          position,
          permissions,
          workingHours,
        },
        { new: true },
      );

      res.status(200).json({ message: 'Staff updated successfully', staff });
    } catch (error) {
      res.status(500).json({ message: 'Error updating staff', error: (error as Error).message });
    }
  }

}

export default StaffController
