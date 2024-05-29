import UserController from '../../controllers/userController';
import { Router } from 'express';
import Validation from '../../utils/validation';

const router = Router();

router.post('/signup', Validation.validateSignup, UserController.signup);
router.post('/login', Validation.validateLogin, UserController.login);
router.post('/forgot-password', UserController.forgotPassword);
router.put('/reset-password/:token', UserController.resetPassword);
router.post('/change-password/:userId', UserController.changePassword);
router.get('/verify/:token', UserController.verify);

export default router;
