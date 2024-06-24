import { Router } from 'express';
import multer from 'multer';
import UserController from '../../controllers/userController';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', authenticate, checkRole(['business', 'staff']), UserController.getAllUsers,);
router.get('/:userId', authenticate, UserController.getUser);
router.put('/updatePassword/:userId', authenticate, UserController.updateUserPassword);
router.patch('/update/:userId', authenticate, upload.single('profilePicture'), UserController.updateUser);
router.delete('/delete/:userId', authenticate, checkRole(['business']), UserController.deleteUser,);

export default router;
