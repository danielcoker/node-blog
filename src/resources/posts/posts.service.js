import { NotAuthorized, NotFound } from '../../libs/errors';
import { model as Post } from './model';
import { getPostById } from '../../libs/post';

/**
 * Get all posts from the database.
 * @returns {Array} List of posts from the database.
 */
export const getPosts = async () => {
  const posts = await Post.find({}).populate('user').sort('-createdAt');

  return posts;
};

/**
 * Get a single post by the post ID.
 * @param {String} postId The ID of the post to get.
 * @returns {Object} The post.
 */
export const getPost = async (postId) => {
  const post = await getPostById(postId, ['user']);

  if (!post) throw new NotFound('Post does not exist.');

  return post;
};

/**
 * Creates a new post.
 * @param {Object} user The authenticated user object.
 * @param {Object} data Request data from the controller.
 * @returns {Object} The created post.
 */
export const createPost = async (user, data) => {
  const { id } = user;

  const post = new Post({ ...data, user: id });

  await (await post.save().then((model) => model.populate('user'))).execPopulate();

  return post;
};

/**
 * Updates a post.
 * @param {String} postId The post ID.
 * @param {Object} user The authenticated user object.
 * @param {Object} data Request data from the controller.
 * @returns {Object} The updated post.
 */
export const updatePost = async (postId, user, data) => {
  const post = await getPostById(postId, ['user']);
  if (!post) throw new NotFound('Post does not exist.');

  if (!post.user.equals(user.id)) {
    throw new NotAuthorized('User is not authorized to edit this post.');
  }

  Object.assign(post, data);

  await post.save();

  return post;
};

export const deletePost = async (user, postId) => {
  const post = await getPostById(postId);
  if (!post) throw new NotFound('Post does not exist.');

  if (!post.user.equals(user.id)) {
    throw new NotAuthorized('User is not authorized to delete this post.');
  }

  await post.deleteOne();

  return true;
};
