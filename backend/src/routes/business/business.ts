import { Router } from 'express';
import BusinessController from '../../controllers/businessControllers';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const businessRoute = Router();

businessRoute.post('/', authenticate, checkRole(['business']), BusinessController.createBusiness,);
businessRoute.get('/:id', authenticate, checkRole(['business', 'staff']), BusinessController.getBusiness,);
businessRoute.get('/user/:userId', authenticate, checkRole(['business']), BusinessController.getBusinessByUserId,);
businessRoute.patch('/update/:id', authenticate, checkRole(['business', 'staff']), BusinessController.updateBusiness,);
businessRoute.delete('/delete/:id', authenticate, checkRole(['business']), BusinessController.deleteBusiness,);

export default businessRoute;
