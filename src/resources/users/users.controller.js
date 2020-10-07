import asyncHandler from '../../libs/asyncHanlder';

// eslint-disable-next-line import/prefer-default-export
export const register = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Registration successful.' });
});
