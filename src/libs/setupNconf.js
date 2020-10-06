const dotenv = require('dotenv');
const nconfDefault = require('nconf');

module.exports = function setupNconf(nconfInstance = nconfDefault) {
  dotenv.config();
  nconfInstance.argv().env();

  nconfInstance.defaults({
    IS_PROD: nconfInstance.get('NODE_ENV') === 'production',
    IS_DEV: nconfInstance.get('NODE_ENV') === 'development',
    IS_TEST: nconfInstance.get('NODE_ENV') === 'test',
  });
};
