import { Request, Response, NextFunction } from 'express';
import ClientModel from '../models/clientModel';
import AppointmentModel from '../models/appointmentModel';
import ServiceModel from '../models/serviceModel';

class AppointmentController {
  static async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const client = await ClientModel.findOne({ client: req.user?._id });
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      // Get the service details
      const service = await ServiceModel.findById(req.body.serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      // Get the date and time from the request body
      const { date, time } = req.body;

      // Check for existing appointments at the requested time
      const existingAppointment = await AppointmentModel.findOne({
        date,
        time,
      });
      if (existingAppointment) {
        return res
          .status(400)
          .json({
            message:
              'This time slot is already booked. Please choose a different time.',
          });
      }

      const appointment = new AppointmentModel({
        ...req.body,
        client: client._id,
        date,
        time,
        service: [
          {
            id: service._id,
            name: service.serviceName,
            cost: service.cost,
          },
        ],
      });
      const savedAppointment = await appointment.save();

      client.appointments.push(savedAppointment._id);
      await client.save();

      res
        .status(201)
        .json({
          message: 'Appointment created successfully',
          appointment: savedAppointment,
        });
    } catch (error) {
      next(error);
    }
  }

  static async approveAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const appointment = await AppointmentModel.findByIdAndUpdate(
        req.params.id,
        { status: 'approved' },
        { new: true },
      );
      res
        .status(200)
        .json({ message: 'Appointment approved successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async rejectAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const appointment = await AppointmentModel.findByIdAndUpdate(
        req.params.id,
        { status: 'rejected' },
        { new: true },
      );
      res
        .status(200)
        .json({ message: 'Appointment rejected successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async getAppointments(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const appointments = await AppointmentModel.find({});
      res
        .status(200)
        .json({ message: 'Appointments fetched successfully', appointments });
    } catch (error) {
      next(error);
    }
  }

  static async getAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentModel.findById(req.params.id);
      res
        .status(200)
        .json({ message: 'Appointment fetched successfully', appointment });
    } catch (error) {
      next(error);
    }
  }
}

export default AppointmentController;
