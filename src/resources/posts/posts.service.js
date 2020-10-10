import { model as Post } from './model';

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
