const gen = require('./common_utils');
const payloads = require('../ops/api/info/payload');
const superagent = require('superagent');

exports.run_service = async (obj_service) => {
	try {
		const exec_env = process.env.EXEC_ENV_API;
		const str_uri = exec_env + obj_service.endpoint;
		const query_params = obj_service.queryParams ? obj_service.queryParams : {};
		let res = null;
		let json_payload = payloads[obj_service.payload] | null;
		switch (obj_service.method.toLowerCase()) {
			case 'get':
				res = await superagent
					.get(str_uri)
					.query(query_params)
					.set('Authorization', 'Bearer ' + process.env.TOKEN);
				break;

			case 'post':
				res = await superagent
					.post(str_uri)
					.set('Authorization', 'Bearer ' + process.env.TOKEN)
					.send(json_payload);
				break;

			case 'put':
				res = await superagent
					.put(str_uri)
					.set('Authorization', 'Bearer ' + process.env.TOKEN)
					.send(json_payload);
				break;

			case 'delete':
				json_payload = payloads[obj_service.payload];
				res = await superagent
					.delete(str_uri)
					.set('Authorization', 'Bearer ' + process.env.TOKEN)
					.send(json_payload);
				break;
		}
		return res;
	} catch (ex) {
		console.log('run_service EXCEPTION OCCURED: ', ex.toString());
	}
};
