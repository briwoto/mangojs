const { Before, After } = require('cucumber');
const pre_req = require('../../pre_req');
const ui_util = require('../../core/utils/ui_utils');
Before(async function() {
	await pre_req.init_env();
	console.log('init env complete');
});
Before({ tags: '@ui' }, async function() {
	await pre_req.ui_setup();
	await ui_util.maximize_window();
	console.log('before UI complete');
});
// Before({ tags: '@api' }, async function() {
// 	await pre_req.init_env();
// 	console.log('before API complete');
// });
After({ tags: '@ui' }, async function() {
	if (global.driver) {
		await global.driver.quit();
	}
});
