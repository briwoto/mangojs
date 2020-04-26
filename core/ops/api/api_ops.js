const api = require('../../utils/api_utils'),
	services = require('../../../data/description'),
	common = require('../../utils/common_utils');

exports.login = async (username = null, password = null, fn) => {
	try {
		const exec_env = process.env.baseurl_api;
		let service = services.auth.login;
		service.uri = exec_env + service.endpoint;
		if (!username) {
			username = process.env['email'];
		}
		if (!password) {
			password = process.env['password'];
		}
		service.payload.email = username;
		service.payload.password = password;
		const res = await service.run_service();
		if (!(res.body || res.body.token)) {
			console.log(`get token failed. No token found`);
			return fn(false);
		}
		process.env.ACCESS_TOKEN = res.body.token;
		return fn(true);
	} catch (err) {
		console.log(`Login - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
