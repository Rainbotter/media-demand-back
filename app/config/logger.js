const logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {'timestamp':true});

module.exports = logger;