import { Request, Response, NextFunction } from 'express';
import AdminModel from '../models/adminModel';
import ServiceModel from '../models/serviceModel';
import AppointmentModel from '../models/appointmentModel';

class AdminController {
  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = new AdminModel(req.body);
      await admin.save();
      res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      await AdminModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await AdminModel.find({});
      res.status(200).json({ message: 'Admins fetched successfully', admins });
    } catch (error) {
      next(error);
    }
  }

  static async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await AdminModel.findById(req.params.id);
      res.status(200).json({ message: 'Admin fetched successfully', admin });
    } catch (error) {
      next(error);
    }
  }

  static async createService(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new ServiceModel(req.body);
      await service.save();
      res.status(201).json({ message: 'Service created successfully', service });
    } catch (error) {
      next(error);
    }
  }

  static async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      await ServiceModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getServices(req: Request, res: Response, next: NextFunction) {
    try {
      const services = await ServiceModel.find({});
      res.status(200).json({ message: 'Services fetched successfully', services });
    } catch (error) {
      next(error);
    }
  }

  static async getService(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ServiceModel.findById(req.params.id);
      res.status(200).json({ message: 'Service fetched successfully', service });
    } catch (error) {
      next(error);
    }
  }

  static async approveAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
      res.status(200).json({ message: 'Appointment approved successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async rejectAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
      res.status(200).json({ message: 'Appointment rejected successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async getAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const appointments = await AppointmentModel.find({});
      res.status(200).json({ message: 'Appointments fetched successfully', appointments });
    } catch (error) {
      next(error);
    }
  }

  static async getAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentModel.findById(req.params.id);
      res.status(200).json({ message: 'Appointment fetched successfully', appointment });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;