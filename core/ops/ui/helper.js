const cwd = process.cwd(),
	ui = require(`${cwd}/core/utils/ui_utils`),
	common = require(`${cwd}/core/utils/common_utils`),
	line = console.log;

exports.click_onpage = async (obj_field, parent = null) => {
	try {
		await ui.click(obj_field.identifier, parent);
		await common.sleep(2);
		return true;
	} catch (err) {
		line(`Click onpage - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
