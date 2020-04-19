
class Service {
    constructor(endpoint, method, {needparams = false, params = null, needpayload = false, payload = null}={}) {
        const payload_verbs = ['POST', 'PUT', 'PATCH', 'DELETE'];
        this.endpoint = endpoint;
        this.method = method;
        this.queryParams = params;
        this.needparams = needparams;
        this.needpayload = (payload_verbs.indexOf(method.toUpperCase()) >= 0) ? true : needpayload;
        this.payload = payload;
    }
}

module.exports = {
    "Service": Service
}