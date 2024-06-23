import { Request, Response, NextFunction } from 'express';
import ClientModel from '../models/clientModel';
import AppointmentModel from '../models/appointmentModel';
import ServiceModel from '../models/serviceModel';
import { BusinessModel, IBusiness } from '../models/businessModel';
import { UserModel } from '../models/userModel';

class AppointmentController {
  static convertTo24Hour(time: string) {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const isPM = time.match('PM');
    if (hours === 12) {
      return `${isPM ? hours : hours - 12}:${minute}`;
    } else {
      return `${isPM ? hours + 12 : hours}:${minute}`;
    }
  }

  static async createAppointment(req: Request, res: Response, next: NextFunction,) {
    try {
      const { date, time } = req.body;
      AppointmentController.convertTo24Hour(time);
      const dateTime = new Date(`${date} ${time}`);
      let client = await ClientModel.findOne({ client: req.user?._id });
      if (!client) {
        client = new ClientModel({ client: req.user?._id });
        await client.save();
      }

      const service = await ServiceModel.findById(req.body.serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const user = await UserModel.findById(req.user?._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

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
        clientName: user.name,
        dateTime,
        service: [
          {
            _id: service._id,
            name: service.serviceName,
            location: service.serviceLocation,
            cost: service.servicePrice
          },
        ],
        business: service.business,
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

  static async getBusinessAppointments(req: Request, res: Response, next: NextFunction,) {
    const userId = req.user ? req.user._id : undefined;
    !userId && res.status(401).json({ message: 'Unauthorized' });

    try {
      const business = (await BusinessModel.findOne({
        owner: userId,
      }).populate({
        path: 'appointments',
        populate: {
          path: 'client',
          model: 'Client',
          populate: {
            path: 'client',
            model: 'User',
            select: 'name',
          },
        },
      })) as IBusiness

      !business && res.status(404).json({ message: 'Business not found' });
      res.status(200).json({ message: 'Appointments fetched successfully', appointments: business.appointments });
    } catch (error) {
      next(error);
    }
  }

  static async getClientAppointments(req: Request, res: Response, next: NextFunction,) {
    const userId = req.user ? req.user._id : undefined;
    !userId && res.status(401).json({ message: 'Unauthorized' });
    try {
      const client = (await ClientModel.findOne({
        client: userId,
      }).populate('appointments')) as any;

      !client && res.status(200).json({ message: 'No appointments found', appointments: [] });
      res.status(200).json({ message: 'Appointments fetched successfully', appointments: client.appointments  });
    } catch (error) {
      next(error);
    }
  }

  static async getAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentModel.findById(req.params.id);

      !appointment && res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json({ message: 'Appointment fetched successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async updateAppointment(req: Request, res: Response, next: NextFunction,) {
    try {
      const { dateTime } = req.body;
      if (!dateTime || isNaN(new Date(dateTime).getTime())) {
        return res.status(400).json({ message: 'Invalid dateTime format' });
      }
      const appointment = await AppointmentModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body, dateTime: new Date(dateTime) },
        { new: true },
        );

      !appointment && res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async updateAppointmentServiceDetails(req: Request, res: Response, next: NextFunction,) {
    try {
      const { serviceId } = req.params;
      const updateFields = req.body;
      const service = await ServiceModel.findById(serviceId);

      !service && res.status(404).json({ message: 'Service not found' });

      const { serviceName, serviceLocation, servicePrice } = updateFields;
      const updateAppointmentFields: any = {};

      if (serviceName) updateAppointmentFields['service.$.name'] = serviceName;
      if (serviceLocation) updateAppointmentFields['service.$.location'] = serviceLocation;
      if (servicePrice) updateAppointmentFields['service.$.cost'] = servicePrice;

      const appointments = await AppointmentModel.updateMany(
        { 'service._id': serviceId },
        { $set: updateAppointmentFields }
      );

      !appointments && res.status(404).json({ message: 'Appointments not found' });
      res.status(200).json({ message: 'Appointment service details updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async updateAppointmentStatus(req: Request, res: Response, next: NextFunction, ) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const appointment = await AppointmentModel.findByIdAndUpdate(id, { status }, { new: true });

      !appointment && res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAppointment(req: Request, res: Response, next: NextFunction,) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentModel.findByIdAndDelete(id);

      !appointment && res.status(404).json({ message: 'Appointment not found' });
      appointment && await ClientModel.findByIdAndUpdate(appointment.client,
        { $pull: { appointments: id }}
      );
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAppointmentsWithServiceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      const appointments = await AppointmentModel.deleteMany({ 'service._id': serviceId });

      appointments.deletedCount === 0 && res.status(404).json({ message: 'Appointments not found' });
      res.status(200).json({ message: 'Appointments deleted successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export default AppointmentController;
