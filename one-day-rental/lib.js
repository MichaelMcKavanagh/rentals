const constants = require('./constants');

let cache = {};

const funcs = {

	addFee: (originalAmountStr) => {
		const newAmountStr = (Math.round((parseInt(originalAmountStr) * (1 + constants.FEE_PERCENTAGE) * 100)) / 100).toString();

		// padding
		const splitArray = newAmountStr.split('.');
		const dollarValue = splitArray[0].toString();
		let centsValue = '';
		if (splitArray.length === 1) {
			centsValue = '00';
		} else {
			if (splitArray[1].length === 1) {
				centsValue = splitArray[1] + '0';
			} else {
				centsValue = splitArray[1];
			}
		}
		const finalAmount = dollarValue + '.' + centsValue;

		return finalAmount;
	},

	memoize: (fn) => {
		return (...args) => {
			let n = args[0];  // just taking one argument here
			if (n in cache) {
				return cache[n];
			}
			else {
				let result = fn(n);
				cache[n] = result;
				return result;
			}
		}
	}

}

module.exports = funcs;
