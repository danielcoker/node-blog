import asyncHandler from '../../libs/asyncHanlder';
import * as PostService from './posts.service';

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await PostService.getPosts();

  res.respond(200, { posts }, 'Posts retrieved successfully.');
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await PostService.getPost(postId);

  res.respond(200, { post }, 'Post retrieved successfully.');
});

export const createPost = asyncHandler(async (req, res) => {
  const post = await PostService.createPost(req.user, req.body);

  res.respond(201, { post }, 'Post created successfully.');
});

export const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await PostService.updatePost(postId, req.user, req.body);

  res.respond(200, { post }, 'Post updated successfully.');
});
