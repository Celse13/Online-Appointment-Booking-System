import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import ServiceModel, { serviceCategories } from '../models/serviceModel';
import { BusinessModel, IBusiness } from '../models/businessModel';
import AppointmentController from './appointmentController';

class ServiceController {
  static async createService(req: Request, res: Response, next: NextFunction) {
    const userId = req.user ? req.user._id : undefined;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const {
        serviceName,
        serviceDuration,
        servicePrice,
        categoryId,
        serviceLocation,
        workingHours,
        serviceDays,
        serviceDescription,
      } = req.body;

      const business = (await BusinessModel.findOne({
        owner: userId,
      })) as IBusiness;
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      const category = serviceCategories.find((cat: { id: number; }) => cat.id === categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }

      const service = new ServiceModel({
        serviceName,
        serviceDuration,
        servicePrice,
        categoryName: category.name,
        categoryId,
        serviceLocation,
        workingHours,
        serviceDays,
        serviceDescription,
        business: business._id as mongoose.Types.ObjectId,
      });

      await service.save();
      res
        .status(201)
        .json({ message: 'Service created successfully', service });
    } catch (error) {
      next(error);
    }
  }

  static async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      const service = await ServiceModel.findByIdAndUpdate(
        serviceId,
        { $set: req.body },
        { new: true },
      );
      !service && res.status(404).json({ message: 'Service not found' })
      await AppointmentController.updateAppointmentServiceDetails(req, res, next);
      res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      const service = await ServiceModel.findByIdAndDelete(serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      await AppointmentController.deleteAppointmentsWithServiceId(req, res, next);
      res.status(200).json({ message: 'Service and associated appointments deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getServices(req: Request, res: Response, next: NextFunction) {
    try {
      const services = await ServiceModel.find({});
      res
        .status(200)
        .json({ message: 'Services fetched successfully', services });
    } catch (error) {
      next(error);
    }
  }

  static async getServicesByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const services = await ServiceModel.find({categoryId: Number(categoryId)});
      res.status(200).json({ message: 'Services fetched successfully', services });
    } catch (error) {
      next(error);
    }
  }

  static async getBusinessServices(req: Request, res: Response, next: NextFunction) {
    const userId = req.user ? req.user._id : undefined;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const business = (await BusinessModel.findOne({
        owner: userId,
      })) as IBusiness;

      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
      if (!mongoose.Types.ObjectId.isValid(business._id)) {
        return res.status(400).json({ message: 'Invalid business ID' });
      }
      const services = await ServiceModel.find({ business: business._id as mongoose.Types.ObjectId });
      res
        .status(200)
        .json({ message: 'Services fetched successfully', services });
    } catch (error) {
      next(error);
    }
  }

  static async getService(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await ServiceModel.findById(req.params.id);
      res
        .status(200)
        .json({ message: 'Service fetched successfully', service });
    } catch (error) {
      next(error);
    }
  }
}

export default ServiceController;
