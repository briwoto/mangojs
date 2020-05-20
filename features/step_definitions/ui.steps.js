const cwd = process.cwd(),
	ui = require(`${cwd}/core/ops/ui/ui_ops`),
	assert = require('assert'),
	{ Given, When, Then } = require('cucumber');
let { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(1000 * (Number(process.env.TIMEOUT) || 20));

Given('I am able to login', async function() {
	await ui.login(null, null, function(val) {
		assert(val);
	});
});
