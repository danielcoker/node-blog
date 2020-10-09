/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
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

/**
 * Generates the user's api token that must be used to authenticate requests.
 * @param {Object} payload The information to embed in token.
 * @returns {String} The token.
 */
export const generateToken = (payload) =>
  jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET, {
    expiresIn: process.env.JSON_WEB_TOKEN_EXPIRE,
  });
