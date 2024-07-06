import  { Router } from 'express';
import StaffController from '../../controllers/staffController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = Router();
router.post('', authenticate, checkRole(['business']), StaffController.createStaff);
router.put('', authenticate, checkRole(['business']), StaffController.updateStaff);

export default router;
