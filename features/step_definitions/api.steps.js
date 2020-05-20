const cwd = process.cwd(),
	assert = require('assert'),
	{ Given, When, Then } = require('cucumber'),
	description = require(`${cwd}/data/description`),
	api = require(`${cwd}/core/ops/api`);

let { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(1000 * (Number(process.env.TIMEOUT) | 10));

Given('I am authorized to login', async function() {
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
