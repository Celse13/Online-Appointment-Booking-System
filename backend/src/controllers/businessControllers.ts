import { BusinessModel, IBusiness } from '../models/businessModel';
import { Request, Response } from 'express';

class BusinessController {
  static async createBusiness(req: Request, res: Response) {
    const { businessType, workingHours, workingDays, businessAddress } =
      req.body;

    const owner = req.user ? req.user._id : undefined;
    const business = new BusinessModel({
      owner,
      businessType,
      workingHours,
      workingDays,
      businessAddress,
    });
    try {
      await business.save();
      res.status(201).send(business);
    } catch (error: any) {
      if (error.name === 'MongoError' && error.code === 11000) {
        res
          .status(400)
          .send({ message: 'Business profile already exists for this owner.' });
      } else {
        res.status(400).send(error);
      }
    }
  }

  static async getBusiness(req: Request, res: Response) {
    try {
      const business = await BusinessModel.findById(req.params.id).select(
        'businessType workingHours workingDays businessAddress',
      );
      if (!business) {
        return res.status(404).send();
      }
      res.send(business);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getBusinessByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const business = await BusinessModel.findOne({ owner: userId }).select(
        'businessType workingHours workingDays businessAddress',
      );
      if (!business) {
        return res.status(404).send({ message: 'No business found for this user' });
      }
      res.send(business);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async updateBusiness(req: Request, res: Response) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'businessType',
      'workingHours',
      'workingDays',
      'businessAddress',
    ];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const business = (await BusinessModel.findById(
        req.params.id,
      )) as IBusiness;
      if (!business) {
        return res.status(404).send();
      }
      updates.forEach(update => (business[update] = req.body[update]));
      await business.save();
      res.send(business);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async deleteBusiness(req: Request, res: Response) {
    try {
      const business = await BusinessModel.findByIdAndDelete(req.params.id);
      if (!business) {
        return res.status(404).send();
      }
      res.send(business);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default BusinessController;
