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
			await this.update_field_value(obj_field, val);
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

			case 'radio':
				// curr_val = await ui.get_attribute(`${obj_field.identifier}:checked`, 'value')
				new_val = obj_field.value_map[val];
				val_locator = common.substitute(obj_field.identifier, { val: new_val });
				await ui.click(val_locator, parent);
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
				await common.sleep(1);
				break;

			case 'date':
				await ui.type(obj_field.identifier, val);
				break;

			default:
				console.log(`Change field value FAIL. Field type ${obj_field.type} not present in map`);
				return false;
		}
	} catch (err) {
		line(`Update field value - EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.get_fields_data = async (obj_fields, parent = null) => {
	try {
		let obj_data = {};
		for (key in obj_fields) {
			field = obj_fields[key];
			if (parent) {
				await ui.scroll_to(parent);
			}
			await (obj_data[key] = await this.get_data(field.identifier, field.type, parent));
		}
		return obj_data;
	} catch (err) {
		line(`Get fields data - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.get_data = async (loc, type, parent = null) => {
	try {
		if ((await ui.get_elements(loc, parent)).length) {
			switch (type) {
				case 'image':
					val = await ui.get_attribute(loc, 'src', parent);
					break;

				case 'static_text':
					val = await ui.get_attribute(loc, 'text', parent);
					break;

				default:
					line(`The type "${type}" not handled in the code`);
					val = null;
					break;
			}
		}
		return val;
	} catch (err) {
		line(`Get data - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
