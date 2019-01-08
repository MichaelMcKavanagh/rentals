import test from 'ava';

const helpers = require('../../testHelpers/helpers');
const SERVICE_A_NAME = 'Service A Rental';
const SERVICE_B_NAME = 'Service B Rental';

test('automatic pass', t => {
	t.pass();
});

test('/offer', async (t) => {
	t.plan(2);
	await helpers.getURL('/offer')
		.then(res => res.json())
		.then(offer => {
			if (offer.quote.name === SERVICE_A_NAME) {
				t.is(offer.quote.amount, '63.25'); // should have fee applied to the amount
				t.is(offer.quote.currency, 'AUD');
			}
			if (offer.quote.name === SERVICE_B_NAME) {
				t.is(offer.quote.amount, '34.50'); // should have fee applied to the amount
				t.is(offer.quote.currency, 'AUD');
			}
		}
	);
});
