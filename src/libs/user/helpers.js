/* eslint-disable import/prefer-default-export */
import { model as User } from '../../resources/users/model';

/**
 * Get a single user from the database with an email address.
 * @param {String} email The email of the user to get.
 * @returns {Object} The user gotten from the database.
 */
export const getUserByEmail = async (email) => {
  if (!email) throw new Error('Email is required.');

  const user = User.findOne({ email: email.toLowerCase() });
  return user;
};
