const cote = require('cote');

var offerResponder = new cote.Responder({
	name: 'offer responder',
	namespace: 'offer',
	respondsTo: ['getOffer']
});

offerResponder.on('*', console.log);

offerResponder.on('getOffer', (req, cb) => {
	cb(null, {
		quote: {
			name: 'Service B Rental',
			amount: '30.00',
			currency: 'AUD'
		}
	});
});
