import { Router } from 'express';

import UserController from '../../controllers/userController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = Router();

router.get('/', authenticate, checkRole(['business', 'staff']), UserController.getAllUsers);
router.get('/:userId', authenticate,  UserController.getUser);
router.put('/:userId', authenticate, UserController.updateUser);
router.delete('/:userId', authenticate, checkRole(['business']),  UserController.deleteUser);

export default router;
