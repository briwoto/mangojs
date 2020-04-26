const assert = require('assert'),
	{ Given, When, Then } = require('cucumber'),
	description = require('../../data/description'),
	api = require('../../core/ops/api');

let { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(1000 * (Number(process.env.TIMEOUT) | 10));

Given('user is able to login', async function() {
	await api.ops.login(null, null, function(val) {
		assert(val);
	});
});
When('user runs a dummy step', async function() {
	assert(true);
});
