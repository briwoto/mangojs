const { cwd = process.cwd(), Before, After } = require('cucumber');
pre_req = require(`${cwd}/pre_req`);
const ui_util = require(`${cwd}/core/utils/ui_utils`);
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
