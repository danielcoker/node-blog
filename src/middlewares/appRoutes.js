import { Router } from 'express';

import { userRoutes } from '../resources/users';

const router = Router();

router.use('/users', userRoutes);

export default router;
