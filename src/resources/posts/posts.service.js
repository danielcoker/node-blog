import { NotFound } from '../../libs/errors';
import { model as Post } from './model';
import { getPostById } from '../../libs/post';

/**
 * Get a single post by the post ID.
 * @param {String} postId The ID of the post to get.
 * @returns {Object} The post.
 */
export const getPost = async (postId) => {
  const post = await getPostById(postId, ['user']);

  if (!post) throw new NotFound('This post does not exist.');

  return post;
};

/**
 * Creates a new post.
 * @param {Object} user The authenticated user object.
 * @param {Object} data Request data from the controller.
 * @returns {Object} The created post.
 */
export const createPost = async (user = {}, data) => {
  const { id } = user;

  const post = new Post({ ...data, user: id });

  await (await post.save().then((model) => model.populate('user'))).execPopulate();

  return post;
};
