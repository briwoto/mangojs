const cwd = process.cwd(),
	ui = require(`${cwd}/core/utils/ui_utils`),
	helper = require(`${cwd}/core/ops/ui/helper`),
	common = require(`${cwd}/core/utils/common_utils`),
	map = require(`${cwd}/data/map`),
	user = map.user,
	line = console.log;

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
		line(`Login - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
exports.open_page = async (pagename, fn) => {
	try {
		const page = user.pages[pagename];
		await ui.goto(process.env.baseurl_ui + page.pathname);
		await ui.wait_for(page.loc_wait);
	} catch (err) {
		line(`Open "${pagename}" page - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
exports.click_button_onpage = async (btn, pagename, fn) => {
	try {
		const field = user.pages[pagename].buttons[btn];
		return fn(await helper.click_onpage(pagename, field));
	} catch (err) {
		line(`Click "${btn}" - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
exports.change_data_onpage = async (pagename, data, fn) => {
	try {
		const page = user.pages[pagename];
		await helper.change_page_data(pagename, page, data);
	} catch (err) {
		line(`enter details on "${pagename}" - EXCEPTION OCCURED:\n${String(err)}`);
		return fn(false);
	}
};
