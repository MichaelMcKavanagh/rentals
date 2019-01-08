import test from 'ava';
import cote from 'cote';

const offerService = require('../../services/offer-a-service');

test('automatic pass', t => {
	t.pass();
});

test.cb('get offer service', t => {
	const offerRequester = new cote.Requester({
		name: 'test offer requester',
		namespace: 'offer'
	});

	offerRequester.send({ type: 'getOffer' }, (err, offer) => {
		t.falsy(err);
		t.is(offer.quote.currency, 'AUD');
		t.is(offer.quote.amount, '55.00'); // because only offer-a is being instantiated for this test
		t.end();
	});
});
