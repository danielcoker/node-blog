import nconf from 'nconf';
import express from 'express';
import attachMiddlewares from './middlewares';

const app = express();

attachMiddlewares(app);

app.set('port', nconf.get('PORT') || 3000);

export default app;
