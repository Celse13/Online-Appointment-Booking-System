import { Router } from 'express';
import AppointmentController from '../../controllers/appointmentController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';



const router = Router();


// Business routes
router.put('/approve/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.approveAppointment);
router.put('/reject/:id', authenticate, checkRole(['business', 'staff']), AppointmentController.rejectAppointment);
router.get('/', authenticate, checkRole(['business', 'staff']), AppointmentController.getAppointments);
router.get('/:id', authenticate, AppointmentController.getAppointment);



// Clients routes

router.post('/', authenticate, checkRole(['client']), AppointmentController.createAppointment);

export default router;