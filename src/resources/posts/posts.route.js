import { Router } from 'express';
import * as PostController from './posts.controller';
import { validateBody } from '../../middlewares';

const router = Router();

router.route('/').post(validateBody('PostSchemas', 'postSchema'), PostController.createPost);

export default router;
