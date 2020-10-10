import { Router } from 'express';
import * as PostController from './posts.controller';
import { validateBody, authWithBearerToken } from '../../middlewares'; // eslint-disable-line import/no-cycle

const router = Router();

router.route('/:postId').get(PostController.getPost);

router
  .route('/')
  .post(
    authWithBearerToken(),
    validateBody('PostSchemas', 'postSchema'),
    PostController.createPost,
  );

export default router;
