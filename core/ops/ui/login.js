const sel = global.sel;
const utils = require('../../utils');

exports.test_login = async (fn) => {
	try {
		bool_result = false;
		await page.goto(process.env.BASEURL_UI);
		await utils.generic.sleep(2);
		await utils.ui_utils.wait_for_element(sel.loginusername);
		await page.screenshot({ path: './snapshots/login.png' });
		await utils.ui_utils.type(sel.loginusername, process.env.USERID);
		await utils.ui_utils.type(sel.loginpassword, process.env.PASSWORD);
		await utils.ui_utils.click_element(sel.loginbutton);
		await utils.ui_utils.wait_for_element(sel.chooseAccountPage);
		bool_result = true;
	} catch (err) {
		console.log(err);
	}
	return fn(bool_result);
};

exports.choose_account = async () => {
	console.log('dummy');
};
