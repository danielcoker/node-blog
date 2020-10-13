/* eslint-disable no-use-before-define */
import superagent from 'superagent';

let apiVersion;

// Sets up an object that can make all REST requests.
// If a user is passed in, the users' token will be used
// to make the request.
export const requester = (user = null) => ({
  get: _requestMaker(user, 'get'),
  post: _requestMaker(user, 'post'),
  put: _requestMaker(user, 'put'),
  del: _requestMaker(user, 'del'),
});

requester.setApiVersion = (version) => {
  apiVersion = version;
};

const _requestMaker = (user, method) => (route, send, query) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    const url = `http://localhost:${process.env.PORT}/api/${apiVersion}/${route}`;

    const request = superagent[method](url).accept('application/json');

    if (user && user.id && user.token) request.set('Authorization', `Bearer ${user.token}`);

    request
      .query(query)
      .send(send)
      .end((err, response) => {
        if (err) {
          if (!err.response) return reject(err);

          const parsedError = _parseError(err);

          return reject(parsedError);
        }

        return resolve(_parseRes(response));
      });
  });

const _parseRes = (res) => {
  if (res.body.message) {
    return {
      data: res.body.data,
      message: res.body.message,
    };
  }

  return null;
};

const _parseError = (err) => ({
  code: err.status,
  error: err.response.body.error,
  message: err.response.body.message,
});
