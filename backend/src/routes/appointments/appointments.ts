import { Router } from 'express';
import AppointmentController from '../../controllers/appointmentController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const businessRouter = Router();
const clientRouter = Router();

// Business routes
businessRouter.put('/approve/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.approveAppointment,);
businessRouter.put('/reject/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.rejectAppointment,);
businessRouter.get('/', authenticate, checkRole(['business', 'staff']), AppointmentController.getBusinessAppointments,);
businessRouter.delete('/delete/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.deleteAppointment,);
businessRouter.delete('/deleteAppointments/:serviceId', authenticate, checkRole(['business', 'staff']), AppointmentController.deleteAppointmentsWithServiceId,);
businessRouter.put('/update/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.updateAppointment,);
businessRouter.patch('/updateStatus/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.updateAppointmentStatus,);

// Clients routes
clientRouter.get('/', authenticate, checkRole(['client']), AppointmentController.getClientAppointments,);
clientRouter.post('/create', authenticate, checkRole(['client']), AppointmentController.createAppointment,);
clientRouter.delete('/delete/:id', authenticate, checkRole(['client']), AppointmentController.deleteAppointment,);

export { businessRouter, clientRouter };
