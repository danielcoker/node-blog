import nconf from 'nconf';
import express from 'express';

const app = express();

app.set('port', nconf.get('PORT') || 3000);

export default app;
