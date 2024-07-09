import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import StaffModel from '../models/staffModel';
import { BusinessModel, IBusiness } from '../models/businessModel';
import mongoose from 'mongoose';


class StaffController {
  static async createStaff(req: Request, res: Response){
    try {
      const { position, permissions, workingHours, userDetails } = req.body;
      const userId =  req.user ? req.user._id : undefined;
      const business = await BusinessModel.findOne({ owner: userId });
      if (!business) {
        return res.status(404).json({ message: 'No business found for this user' });
      }
      const businessId = business._id;

      // Create a new User for the staff member
      const newUser = new UserModel({
        ...userDetails,
        role: 'staff',
      });
      await newUser.save();

      const newStaff = new StaffModel({
        user: newUser._id,
        business: businessId,
        position,
        permissions,
        workingHours,
      });
      await newStaff.save();
      business.staff.push(newStaff._id);
      await business.save();
      res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
    } catch (error) {
      res.status(500).json({ message: 'Error creating staff', error: (error as Error).message });
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
