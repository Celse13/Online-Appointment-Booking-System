import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import ServiceModel, { serviceCategories } from '../models/serviceModel';
import { BusinessModel, IBusiness } from '../models/businessModel';

function convertTo24Hour(time: string): { hour: number, minute: number } {
  const [hour, minutePeriod] = time.split(':');
  let [minute, period] = minutePeriod.split(' ');
  period = period.toUpperCase();

  let newHour = parseInt(hour);
  if (period === 'PM' && hour !== '12') {
    newHour = newHour + 12;
  } else if (period === 'AM' && hour === '12') {
    newHour = 0;
  }

  return { hour: newHour, minute: parseInt(minute) };
}

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
        timeFormat,
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

      let workingHours24;
      if (timeFormat === '12') {
        const startHour24 = convertTo24Hour(workingHours.startHour + ':' + workingHours.startMinute + ' ' + workingHours.startPeriod);
        const endHour24 = convertTo24Hour(workingHours.endHour + ':' + workingHours.endMinute + ' ' + workingHours.endPeriod);
        workingHours24 = {
          startHour: startHour24.hour,
          startMinute: startHour24.minute,
          endHour: endHour24.hour,
          endMinute: endHour24.minute,
        };
      } else {
        workingHours24 = {
          startHour: parseInt(workingHours.startHour),
          startMinute: parseInt(workingHours.startMinute),
          endHour: parseInt(workingHours.endHour),
          endMinute: parseInt(workingHours.endMinute),
        };
      }
      const service = new ServiceModel({
        serviceName,
        serviceDuration,
        servicePrice,
        categoryName: category.name,
        categoryId,
        serviceLocation,
        workingHours: workingHours24,
        timeFormat,
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
      const service = await ServiceModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      res
        .status(200)
        .json({ message: 'Service updated successfully', service });
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
      const services = await ServiceModel.find({ categoryId: Number(categoryId) });
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
