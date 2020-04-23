console.log('api utils called');
const gen = require('./common_utils');
const payloads = require('../../data/payload');
const superagent = require('superagent');

class Service {
	constructor(endpoint, method, { needparams = false, params = null, needpayload = false, payload = null } = {}) {
		const payload_verbs = [ 'POST', 'PUT', 'PATCH', 'DELETE' ];
		this.endpoint = endpoint;
		this.uri = null;
		this.method = method;
		this.queryParams = params | {};
		this.needparams = needparams;
		this.needpayload = payload_verbs.indexOf(method.toUpperCase()) >= 0 ? true : needpayload;
		this.payload = this.needpayload ? payloads[payload] : payload;
	}
	run_service = async (auth_token = null) => {
		try {
			let res = null;
			switch (this.method.toLowerCase()) {
				case 'get':
					res = auth_token
						? await superagent.get(this.uri).query(this.queryParams).set('Authorization', auth_token)
						: await superagent.get(this.uri).query(this.queryParams);
					break;

				case 'post':
					res = auth_token
						? await superagent.post(this.uri).set('Authorization', auth_token).send(this.payload)
						: await superagent.post(this.uri).send(this.payload);
					break;

				case 'patch':
					res = auth_token
						? await superagent.patch(this.uri).set('Authorization', auth_token).send(this.payload)
						: await superagent.patch(this.uri).send(this.payload);
					break;

				case 'put':
					res = auth_token
						? await superagent.put(this.uri).set('Authorization', auth_token).send(this.payload)
						: await superagent.put(this.uri).send(this.payload);
					break;

				case 'delete':
					res = auth_token
						? await superagent.delete(this.uri).set('Authorization', auth_token).send(this.payload)
						: await superagent.delete(this.uri).send(this.payload);
					break;
			}
			return res;
		} catch (err) {
			console.log('run_service EXCEPTION OCCURED: ', String(err));
			return null;
		}
	};
}
module.exports = {
	Service: Service
};
