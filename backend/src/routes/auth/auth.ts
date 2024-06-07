import { Router } from 'express';
import AuthController from '../../controllers/authControllers';
import Validation from '../../utils/validation';
const router = Router();

router.post('/signup', Validation.validateSignup, AuthController.signup);
router.post('/login', Validation.validateLogin, AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.put('/reset-password/:token', AuthController.resetPassword);
router.get('/verify/:token', AuthController.verify);
router.post('/check-email', AuthController.checkEmail);
router.post('/check-password', AuthController.checkPassword);
router.post('/check-verification', AuthController.checkVerification);

export default router;
