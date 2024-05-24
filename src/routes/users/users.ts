import { Router } from 'express';

import UserController from '../../controllers/userController';
import authenticate from '../../utils/authenticate';

const router = Router();

router.get('/', authenticate, UserController.getAllUsers);
router.get('/:userId', authenticate, UserController.getUser);
router.put('/:userId', authenticate, UserController.updateUser);
router.delete('/:userId', authenticate, UserController.deleteUser);

export default router;
