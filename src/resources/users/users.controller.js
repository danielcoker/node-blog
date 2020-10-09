import asyncHandler from '../../libs/asyncHanlder';
import * as UserService from './users.service';

export const register = asyncHandler(async (req, res) => {
  const user = await UserService.register(req.body);

  res.respond(201, user, 'Registration successful.');
});

export const login = asyncHandler(async (req, res) => {
  const user = await UserService.login(req.body);

  res.respond(200, { user }, 'Login successful.');
});
