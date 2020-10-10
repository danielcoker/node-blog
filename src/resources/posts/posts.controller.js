import asyncHandler from '../../libs/asyncHanlder';
import * as PostService from './posts.service';

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await PostService.getPost(postId);

  res.respond(200, { post }, 'Post retrieved successfully.');
});

export const createPost = asyncHandler(async (req, res) => {
  const post = await PostService.createPost(req.user, req.body);

  res.respond(201, { post }, 'Post created successfully.');
});
