import  { Router } from 'express';
import StaffController from '../../controllers/staffController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = Router();
router.post('/create', authenticate, checkRole(['business']), StaffController.createStaff);
router.get('/myStaff', authenticate, checkRole(['business']), StaffController.getBusinessStaff);
router.put('/update', authenticate, checkRole(['business']), StaffController.updateStaff);

export default router;
