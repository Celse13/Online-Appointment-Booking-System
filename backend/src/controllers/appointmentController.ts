import { Request, Response, NextFunction } from 'express';
import ClientModel from '../models/clientModel';
import AppointmentModel from '../models/appointmentModel';
import ServiceModel from '../models/serviceModel';
import { BusinessModel, IBusiness } from '../models/businessModel';

class AppointmentController {
  static async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let client = await ClientModel.findOne({ client: req.user?._id });
      if (!client) {
        client = new ClientModel({ client: req.user?._id });
        await client.save();
      }

      // Get the service details
      const service = await ServiceModel.findById(req.body.serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      // Get the date and time from the request body
      const { date, time } = req.body;
      const dateTime = new Date(`${date}T${time}`);
      // Check for existing appointments at the requested time
      const existingAppointment = await AppointmentModel.findOne({
        dateTime,
        'service.id': req.body.serviceId,
      });
      if (existingAppointment) {
        return res.status(400).json({
          message:
            'This time slot is already booked. Please choose a different time.',
        });
      }

      const appointment = new AppointmentModel({
        ...req.body,
        client: client._id,
        dateTime,
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

      const business = await BusinessModel.findById(service.business);
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
      business.appointments.push(savedAppointment._id);
      await business.save();
      res.status(201).json({
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

  static async getBusinessAppointments(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

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

      const appointments = await AppointmentModel.find({
        'service.business': business._id,
      });
      res
        .status(200)
        .json({ message: 'Appointments fetched successfully', appointments });
    } catch (error) {
      next(error);
    }
  }

  static async getClientAppointments(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.user ? req.user._id : undefined;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const client = await ClientModel.findOne({ client: userId });
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      const appointments = await AppointmentModel.find({ client: client._id });
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
