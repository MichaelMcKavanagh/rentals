const fetch = require('node-fetch');

module.exports = {
	getURL: (route) => {
		const URL = `http://localhost${route}`;
		try {
			const fetchRes = fetch(URL, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});
			return fetchRes;
		} catch(err) {			
			console.log(err);
			throw(err);
		}
	}
}
