import { model as Post } from '../../resources/posts';

/**
 * Get a post from the db using the post's ID.
 * @param {String} postId The post ID to get.
 * @param {Array} populateFields The fields to populate.
 */
export const getPostById = async (postId, populateFields = []) => {
  if (!postId) throw new Error('postId parameter is required.');

  const query = Post.findById(postId);
  if (Array.isArray(populateFields) && populateFields.length) query.populate(populateFields);

  const post = await query;
  return post;
};
