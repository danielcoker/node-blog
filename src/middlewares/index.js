import express from 'express';
import nconf from 'nconf';
import morgan from 'morgan';

import appRoutes from './appRoutes';
import errorHandler from './errorHandler';

const attachMiddlewares = (app) => {
  if (nconf.get('IS_DEV')) app.use(morgan('dev'));

  app.use(express.json());

  app.use('/api/v1', appRoutes);

  // Error handler middleware.
  app.use(errorHandler);
};

export default attachMiddlewares;
