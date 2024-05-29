import { NextFunction, Request, Response } from 'express';
import AppointmentModel from '../models/appointmentModel';
import ClientModel from '../models/clientModel';

class AppointmentController {
  static async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // Check if the client exists
      const client = await ClientModel.findById(req.body.clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      // Create a new appointment
      const appointment = new AppointmentModel({
        ...req.body,
        client: client._id,
      });
      await appointment.save();

      res
        .status(201)
        .json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
      next(error);
    }
  }
}

export default AppointmentController;
