import { Router } from 'express';
import * as PostController from './posts.controller'; // eslint-disable-line import/no-cycle
import { validateBody, authWithBearerToken } from '../../middlewares'; // eslint-disable-line import/no-cycle

const router = Router();

router
  .route('/:postId')
  .get(PostController.getPost)
  .put(authWithBearerToken(), validateBody('PostSchemas', 'postSchema'), PostController.updatePost)
  .delete(authWithBearerToken(), PostController.deletePost);

router
  .route('/')
  .get(PostController.getPosts)
  .post(
    authWithBearerToken(),
    validateBody('PostSchemas', 'postSchema'),
    PostController.createPost,
  );

export default router;
