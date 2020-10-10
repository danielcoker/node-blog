import express from 'express';
import nconf from 'nconf';
import morgan from 'morgan';

import validateBody from './validateBody';
import { authWithBearerToken } from './auth'; // eslint-disable-line import/no-cycle

import appRoutes from './appRoutes'; // eslint-disable-line import/no-cycle
import errorHandler from './errorHandler';

import responseHandler from './response';

const attachMiddlewares = (app) => {
  if (nconf.get('IS_DEV')) app.use(morgan('dev'));

  app.use(express.json());

  // Add res.respond
  app.use(responseHandler);

  app.use('/api/v1', appRoutes);

  // Error handler middleware.
  app.use(errorHandler);
};

export { validateBody, authWithBearerToken };

export default attachMiddlewares;
