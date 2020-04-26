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
exports.create_user = async (data, fn) => {
	try {
		let service = services.users.create_user;
		service.uri = process.env.baseurl_api + service.endpoint;
		service.payload = await common.update_json_values(service.payload, data);
		const res = await service.run_service();
		if (!res.body) {
			console.log('Create user failed. No body in response');
			return fn(false);
		}
		await common.update_json_file('data/temp.json', 'created_user', res.body);
		return fn(true);
	} catch (err) {
		console.log(`Create user - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
