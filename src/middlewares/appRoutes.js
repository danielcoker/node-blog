import { Router } from 'express';

import { userRoutes } from '../resources/users'; // eslint-disable-line import/no-cycle
import { postRoutes } from '../resources/posts';

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
