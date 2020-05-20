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
When('I go to the {string} page', async function(pagename) {
	await ui.open_page(pagename, function(val) {
		assert(val);
	});
});
When('I click on the {string} button on the {string} page', async function(btn, pagename) {
	await ui.click_button_onpage(btn, pagename, function(val) {
		assert(val);
	});
});
