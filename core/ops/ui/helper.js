const cwd = process.cwd(),
	ui = require(`${cwd}/core/utils/ui_utils`),
	common = require(`${cwd}/core/utils/common_utils`),
	line = console.log;

exports.click_onpage = async (pagename, obj_field, parent = null) => {
	try {
		await ui.click(obj_field.identifier, parent);
		await common.sleep(2);
		return true;
	} catch (err) {
		line(`Click onpage - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.change_page_data = async (pagename, obj_page, data) => {
	try {
		for (i in data) {
			fieldname = data[i][0];
			val = data[i][1];
			obj_field = obj_page.fields[fieldname];
			await this.update_field_value(obj_field);
		}
	} catch (err) {
		line(`Change data on "${pagename}" page - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.update_field_value = async (obj_field, val, parent = null) => {
	try {
		switch (obj_field.type) {
			case 'text':
				await ui.type(obj_field.identifier, val);
				break;

			case 'select':
				new_val = obj_field.value_map[val];
				val_locator = common.substitute(obj_field.value_identifier, { val: new_val });
				await ui.click(val_locator, parent);
				break;

			case 'search':
				elem = await ui.get_element(obj_field.identifier, parent);
				await elem.click();
				await ui.clear_input(elem);
				try {
					await elem.sendKeys(val);
				} catch (e) {
					if (e.name === 'StaleElementReferenceError') {
						elem = await ui.get_element(obj_field.identifier, parent);
						await elem.sendKeys(val);
						await common.sleep(1);
					}
				}
				break;

			default:
				console.log(`Change field value FAIL. Field type not present in map`);
				return false;
		}
	} catch (err) {
		line(`Update field value - EXCEPTION OCCURED:\n${String(err)}`);
	}
};
