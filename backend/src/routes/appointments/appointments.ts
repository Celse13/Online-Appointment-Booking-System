import { Router } from 'express';
import AppointmentController from '../../controllers/appointmentController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const businessRouter = Router();
const clientRouter = Router();

// Business routes
businessRouter.put(
  '/approve/:id',
  authenticate,
  checkRole(['business', 'staff']),
  AppointmentController.approveAppointment,
);
businessRouter.put(
  '/reject/:id',
  authenticate,
  checkRole(['business', 'staff']),
  AppointmentController.rejectAppointment,
);
businessRouter.get(
  '/',
  authenticate,
  checkRole(['business', 'staff']),
  AppointmentController.getBusinessAppointments,
);

// Clients routes
clientRouter.get(
  '/',
  authenticate,
  checkRole(['client']),
  AppointmentController.getClientAppointments,
);
clientRouter.post(
  '/',
  authenticate,
  checkRole(['client']),
  AppointmentController.createAppointment,
);

export { businessRouter, clientRouter };