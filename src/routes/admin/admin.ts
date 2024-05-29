import express from 'express';
import AdminController from '../../controllers/adminController';



const router = express.Router();

// Admin routes
router.post('/admin', AdminController.createAdmin);
router.put('/admin/:id', AdminController.updateAdmin);
router.delete('/admin/:id', AdminController.deleteAdmin);
router.get('/admin', AdminController.getAdmins);
router.get('/admin/:id', AdminController.getAdmin);

// Service routes
router.post('/service', AdminController.createService);
router.put('/service/:id', AdminController.updateService);
router.delete('/service/:id', AdminController.deleteService);
router.get('/service', AdminController.getServices);
router.get('/service/:id', AdminController.getService);

// Appointment routes
router.put('/appointment/approve/:id', AdminController.approveAppointment);
router.put('/appointment/reject/:id', AdminController.rejectAppointment);
router.get('/appointment', AdminController.getAppointments);
router.get('/appointment/:id', AdminController.getAppointment);

export default router;