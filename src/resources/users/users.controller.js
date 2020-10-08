import asyncHandler from '../../libs/asyncHanlder';
import * as UserService from './users.service';

// eslint-disable-next-line import/prefer-default-export
export const register = asyncHandler(async (req, res) => {
  const user = await UserService.register(req.body);

  res.status(200).json({ message: 'Registration successful.', data: { user } });
});
