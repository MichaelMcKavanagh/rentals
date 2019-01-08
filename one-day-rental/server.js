const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const cote = require('cote');

const lib = require('./lib');
const constants = require('./constants');

app.use(bodyParser.json());

const offerRequester = new cote.Requester({
	name: 'offer requester',
	namespace: 'offer'
});

var logRequester = new cote.Requester({
	name: 'logger requester',
	namespace: 'logger'
});

app.all('*', (req, res, next) => {
	console.log(req.method, req.url);
	next();
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/offer', (req, res) => {
	offerRequester.send({ type: 'getOffer' }, (err, offer) => {
		let STATUS;

		if (err) {
			logRequester.send({ type: 'log', api: '/offer', method: 'get', status: 500, err: err, res: null }, (logErr, logRes) => {});

			res.status(500);
			res.send(); // don't return error to client
			return;
		}

		// apply fee percentage to original offer
		const addFeeMemoized = lib.memoize(lib.addFee);
		offer.quote.amount = addFeeMemoized(offer.quote.amount);

		logRequester.send({ type: 'log', api: '/offer', method: 'get', status: 200, err: null, res: offer }, (logErr, logRes) => {});

		res.status(200);
		res.send(offer);
	});
});

server.listen(constants.PORT);
