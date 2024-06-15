import { Router } from 'express';
import clientControllers from '../../controllers/clientControllers';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = Router();


router.get('/', authenticate, checkRole(['business', 'staff']), clientControllers.getClients);
export default router;
