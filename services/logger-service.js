const cote = require('cote');
const winston = require('winston');

var logResponder = new cote.Responder({
	name: 'logger responder',
	namespace: 'logger',
	respondsTo: [ 'log' ]
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // Write to all logs with level `info` and below to `combined.log`
		// Write all logs error (and below) to `error.log`.
		// these log files can be found within the logger microservice
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' })
  ]
});


logResponder.on('log', (req, cb) => {
	if (req.err) {
		logger.error({
			status: req.status,
			method: req.method,
			api: req.api,
			err: req.err,
			res: null
		});
	} else {
		logger.info({
			status: req.status,
			method: req.method,
			api: req.api,
			err: null,
			res: req.res
		});
	}

	cb(null);
});
