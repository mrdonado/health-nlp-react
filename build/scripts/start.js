const logger = require('../lib/logger');

logger.info('Starting server...');
require('../../server/main').listen(7777, () => {
  logger.success('Server is running at http://localhost:7777');
});
