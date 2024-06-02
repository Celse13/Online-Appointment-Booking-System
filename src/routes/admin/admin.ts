import express from 'express';
import AdminController from '../../controllers/adminController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = express.Router();

// Admin routes
router.post('/admin', authenticate, checkRole(['business']), AdminController.createAdmin);
router.put('/admin/:id', authenticate,  checkRole(['business']), AdminController.updateAdmin);
router.delete('/admin/:id', authenticate,  checkRole(['business']),  AdminController.deleteAdmin);
router.get('/admin', authenticate, checkRole(['business']), AdminController.getAdmins);
router.get('/admin/:id', authenticate, checkRole(['business']), AdminController.getAdmin);


// Service routes
router.post('/admin/:adminId/service/:serviceId', authenticate, checkRole(['admin']), AdminController.addServiceToAdmin);
router.delete('/admin/:adminId/service/:serviceId', authenticate, checkRole(['admin']), AdminController.removeServiceFromAdmin);
router.post('/admin/:adminId/staff/:staffId', authenticate, checkRole(['admin']), AdminController.addStaffToAdmin);
router.delete('/admin/:adminId/staff/:staffId', authenticate, checkRole(['admin']), AdminController.removeStaffFromAdmin);

export default router;

