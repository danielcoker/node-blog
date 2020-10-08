import { NotAuthorized } from '../../libs/errors';
import { model as User } from './model';

import { getUserByEmail } from '../../libs/user';

/**
 * Creates a new user.
 * @param {Object} data Request data from the controller.
 * @returns {String} The created user token.
 */
export const register = async (data) => {
  const { name, email, password } = data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new NotAuthorized('User with this email already exist.');

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  return newUser;
};
