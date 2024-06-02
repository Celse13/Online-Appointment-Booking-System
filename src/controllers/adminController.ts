import { Request, Response, NextFunction } from 'express';
import { BusinessModel, IBusiness } from '../models/businessModel';
import { UserModel } from '../models/userModel';
import ServiceModel from '../models/serviceModel';
import AppointmentModel from '../models/appointmentModel';
import mongoose from 'mongoose';

class AdminController {
  static async changeUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const newRole = req.body.role;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.role = newRole;
      await user.save();
      res.status(200).json({ message: 'User role changed successfully', user });
    } catch (error) {
      next(error);
    }
  }

  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = new BusinessModel(req.body);
      await admin.save();
      res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await BusinessModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await BusinessModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await BusinessModel.find({});
      res.status(200).json({ message: 'Admins fetched successfully', admins });
    } catch (error) {
      next(error);
    }
  }

  static async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await BusinessModel.findById(req.params.id);
      res.status(200).json({ message: 'Admin fetched successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async addServiceToAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const adminId = new mongoose.Types.ObjectId(req.params.adminId);
      const serviceId = new mongoose.Types.ObjectId(req.params.serviceId);

      const admin = await BusinessModel.findById(adminId);

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      admin.services.push(serviceId);
      await admin.save();
      res
        .status(200)
        .json({ message: 'Service added to admin successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async removeServiceFromAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const adminId = new mongoose.Types.ObjectId(req.params.adminId);
      const serviceId = new mongoose.Types.ObjectId(req.params.serviceId);

      const admin = await BusinessModel.findById(adminId);

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      admin.services = admin.services.filter(
        (id: mongoose.Types.ObjectId) => !id.equals(serviceId),
      );
      await admin.save();
      res
        .status(200)
        .json({ message: 'Service removed from admin successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async addStaffToAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const admin = await BusinessModel.findById(req.params.adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      const staffId = new mongoose.Types.ObjectId(req.params.staffId);
      admin.staff.push(staffId);
      await admin.save();
      res
        .status(200)
        .json({ message: 'Staff added to admin successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async removeStaffFromAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const admin = await BusinessModel.findById(req.params.adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      const staffIdToRemove: mongoose.Types.ObjectId =
        new mongoose.Types.ObjectId(req.params.staffId);
      admin.staff = admin.staff.filter(
        (staffId: mongoose.Types.ObjectId) => !staffId.equals(staffIdToRemove),
      );
      await admin.save();
      res
        .status(200)
        .json({ message: 'Staff removed from admin successfully', admin });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
