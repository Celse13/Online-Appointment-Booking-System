import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import ServiceModel from '../models/serviceModel';
import { BusinessModel, IBusiness } from '../models/businessModel';

class ServiceController {
    static async createService(req: Request, res: Response, next: NextFunction) {
        const userId = req.user ? req.user._id : undefined;
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
          const {
            serviceName,
            duration,
            cost,
            category,
            location,
            workingHours,
            serviceDays
          } = req.body;
    
          const business = await BusinessModel.findOne({ owner: userId }) as IBusiness;
          if (!business) {
            return res.status(404).json({ message: 'Business not found' });
          }
    
          const service = new ServiceModel({
            serviceName,
            duration,
            cost,
            category,
            location,
            workingHours,
            serviceDays,
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