import asyncHandler from '../../libs/asyncHanlder';
import * as PostService from './posts.service';

export const createPost = asyncHandler(async (req, res) => {
  const post = await PostService.createPost(req.user, req.body);

  res.respond(201, { post }, 'Post created successfully.');
});
