const assert = require('assert'),
	{ Given, When, Then } = require('cucumber'),
	description = require('../../data/description'),
	api = require('../../core/ops/api');

let { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(1000 * (Number(process.env.TIMEOUT) | 10));

Given('I am able to login', async function() {
	await api.ops.login(null, null, function(val) {
		assert(val);
	});
});
When('I create the following user', async function(table) {
	await api.ops.create_user(table.rows(), function(val) {
		assert(val);
	});
});
When('I run a dummy step', async function() {
	assert(true);
});
Then('a user should be created with the following details', async function(table) {
	await api.ops.verify_created_user(table.rows(), function(val) {
		assert(val);
	});
});
