const dotenv = require('dotenv');
const nconfDefault = require('nconf');

module.exports = function setupNconf(nconfInstance = nconfDefault) {
  dotenv.config();
  nconfInstance.argv().env();

  // nconfInstance.set('IS_PROD', nconfInstance.get('NODE_ENV') === 'production');
  // nconfInstance.set('IS_DEV', nconfInstance.get('NODE_ENV') === 'development');
  // nconfInstance.set('IS_TEST', nconfInstance.get('NODE_ENV') === 'test');
};
