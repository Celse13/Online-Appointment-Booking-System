import { Request, Response, NextFunction } from 'express';
import { BusinessModel } from '../models/businessModel';
import AppointmentModel from '../models/appointmentModel';
import clientModel from '../models/clientModel';
import StaffModel from '../models/staffModel';


class ClientController {
  static async getClients(req: Request, res: Response, next: NextFunction) {
    const userId = req.user ? req.user._id : undefined;
    const userRole = req.user ? req.user.role : undefined;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      let businessId: string | undefined;
      if (userRole === 'business') {
        const business = await BusinessModel.findOne({ owner: userId });
        if (!business) {
          return res.status(404).json({ message: 'Business not found' });
        }
        businessId = business._id.toString();
      } else if (userRole === 'staff') {
        const staff = await StaffModel.findOne({ user: userId }).populate('business');
        if (!staff || !staff.business) {
          return res.status(404).json({ message: 'Staff or associated business not found' });
        }
        businessId = staff.business._id.toString();
      }
      const business = await BusinessModel.findById(businessId);
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
      const appointments = await AppointmentModel.find({business: business._id});

      let clientIds: any = [];

      if (appointments) {
        clientIds = [...new Set(appointments.map((appointment: any) => appointment.client.toString()))];
      }

      const clients = await clientModel.find({ _id: { $in: clientIds } }).populate('client', 'name lastName');
      res.status(200).json({ message: 'Clients fetched successfully', clients });
    } catch (error) {
      next(error);
    }
  }
}

export default ClientController;
