import handleError from '../libs/errorHandler';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { responseErr, jsonRes } = handleError(err);
  res.status(responseErr.httpCode).json(jsonRes);
};

export default errorHandler;
