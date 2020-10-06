import express from 'express';
import nconf from 'nconf';
import morgan from 'morgan';

import errorHandler from './errorHandler';

const attachMiddlewares = (app) => {
  if (nconf.get('NODE_ENV').trim() !== 'testing') app.use(morgan('dev'));

  app.use(express.json());

  // // Error handler middleware.
  app.use(errorHandler);
};

export default attachMiddlewares;
