import express from 'express';
import nconf from 'nconf';
import morgan from 'morgan';

import validateBody from './validateBody';

import appRoutes from './appRoutes'; // eslint-disable-line import/no-cycle
import errorHandler from './errorHandler';

const attachMiddlewares = (app) => {
  if (nconf.get('IS_DEV')) app.use(morgan('dev'));

  app.use(express.json());

  app.use('/api/v1', appRoutes);

  // Error handler middleware.
  app.use(errorHandler);
};

export { validateBody };

export default attachMiddlewares;
