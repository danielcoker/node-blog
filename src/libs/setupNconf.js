const dotenv = require('dotenv');
const nconfDefault = require('nconf');

module.exports = function setupNconf(nconfInstance = nconfDefault) {
  dotenv.config();
  nconfInstance.argv().env();
};
