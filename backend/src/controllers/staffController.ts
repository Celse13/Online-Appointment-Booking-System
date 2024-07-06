import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import StaffModel from '../models/staffModel';


class StaffController {
  static async createStaff(req: Request, res: Response){
    try {
      const { position, permissions, workingHours } = req.body;
      const businessId =  req.user ? req.user._id : undefined;

      // Create a new User for the staff member
      const newUser = new UserModel({
        ...req.body.userDetails,
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

      res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
    } catch (error) {
      res.status(500).json({ message: 'Error creating staff', error: (error as Error).message });
    }
  };

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
