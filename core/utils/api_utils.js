console.log('api utils called');
const cwd = process.cwd(),
	payloads = require(`${cwd}/data/payload`),
	superagent = require('superagent');

class Service {
	constructor(endpoint, method, { params = {}, needpayload = false, payload = null } = {}) {
		const payload_verbs = [ 'POST', 'PUT', 'PATCH', 'DELETE' ];
		this.endpoint = endpoint;
		this.uri = null;
		this.method = method;
		this.queryParams = params;
		this.header = { 'Content-Type': 'application/json', Accept: 'application/json' };
		this.needpayload = payload_verbs.indexOf(method.toUpperCase()) >= 0 ? true : needpayload;
		this.payload = this.needpayload ? payloads[payload] : payload;
	}
	run_service = async (auth_token = null) => {
		try {
			let res = null;
			switch (this.method.toLowerCase()) {
				case 'get':
					res = auth_token
						? await superagent
								.get(this.uri)
								.query(this.queryParams)
								.set('Authorization', auth_token)
								.set(this.header)
						: await superagent.get(this.uri).query(this.queryParams).set(this.header);
					break;

				case 'post':
					res = auth_token
						? await superagent
								.post(this.uri)
								.set('Authorization', auth_token)
								.send(this.payload)
								.set(this.header)
						: await superagent.post(this.uri).send(this.payload).set(this.header);
					break;

				case 'patch':
					res = auth_token
						? await superagent
								.patch(this.uri)
								.set('Authorization', auth_token)
								.send(this.payload)
								.set(this.header)
						: await superagent.patch(this.uri).send(this.payload).set(this.header);
					break;

				case 'put':
					res = auth_token
						? await superagent
								.put(this.uri)
								.set('Authorization', auth_token)
								.send(this.payload)
								.set(this.header)
						: await superagent.put(this.uri).send(this.payload).set(this.header);
					break;

				case 'delete':
					res = auth_token
						? await superagent
								.delete(this.uri)
								.set('Authorization', auth_token)
								.send(this.payload)
								.set(this.header)
						: await superagent.delete(this.uri).send(this.payload).set(this.header);
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
