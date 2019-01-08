const cote = require('cote');

const axiosCache = require('axios-cache-adapter');

const api = axiosCache.setup({
  cache: {
    maxAge: 5 * 60 * 1000 // 5 min cache
  }
})

var offerResponder = new cote.Responder({
	name: 'offer responder',
	namespace: 'offer',
	respondsTo: [ 'getOffer' ]
});

offerResponder.on('*', console.log);

offerResponder.on('getOffer', (req, cb) => {
	api({
		url: 'https://api.myjson.com/bins/7c0qw',
		method: 'get'
	}).then(response => {
		cb(null, response.data);
	}).catch((err) => {
		cb(err);
	});
});
