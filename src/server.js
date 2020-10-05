import http from 'http';
import app from './app';

const server = http.createServer();

server.on('request', app);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

export default server;
