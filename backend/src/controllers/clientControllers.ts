import { Request, Response, NextFunction } from 'express';
import { BusinessModel, IBusiness } from '../models/businessModel';
import AppointmentModel from '../models/appointmentModel';
import clientModel from '../models/clientModel';



class ClientController {
  static async getClients(req: Request, res: Response, next: NextFunction) {
    const userId = req.user ? req.user._id : undefined;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const business = (await BusinessModel.findOne({
        owner: userId,
      })) as IBusiness;

      if (!business) {
        return res.status(404).json({ message: 'No business found' });
      }

      const appointments = await AppointmentModel.find({business: business._id});

      let clientIds: any = [];

      if (appointments) {
        clientIds = [...new Set(appointments.map((appointment: any) => appointment.client.toString()))];
      }

      const clients = await clientModel.find({ _id: { $in: clientIds } });

      res.status(200).json({ message: 'Clients fetched successfully', clients });
    } catch (error) {
      next(error);
    }
  }
}

export default ClientController;
