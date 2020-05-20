const cwd = process.cwd(),
	ui = require(`${cwd}/core/utils/ui_utils`),
	helper = require(`${cwd}/core/ops/ui/helper`),
	common = require(`${cwd}/core/utils/common_utils`),
	map = require(`${cwd}/data/map`),
	user = map.user;

exports.login = async (username = null, password = null, fn) => {
	try {
		const login = user.pages.Login;
		await ui.goto(process.env.baseurl_ui + '/login');
		await ui.wait_for(user.pages.Login.fields.username.identifier);
		await ui.type(login.fields.username.identifier, username || process.env.email);
		await ui.type(login.fields.password.identifier, username || process.env.password);
		await ui.click_and_wait(login.buttons.LOGIN.identifier, user.pages.Account.loc_wait);
		return fn(true);
	} catch (err) {
		console.log(`Login - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
