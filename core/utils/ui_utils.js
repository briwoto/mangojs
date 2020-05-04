console.log('UI CALLED');
const common = require('./common_utils');
const { By, Key, until } = require('selenium-webdriver');

get_locator_info = (str_raw) => {
	return str_raw.substr(0, 2) === '//' ? [ 'x', str_raw ] : [ 'css', str_raw ];
};
get_driver = () => {
	return global.driver;
};

exports.wait_for_page_load = async () => {
	try {
		const driver = await get_driver();
		driver.wait(function() {
			return driver.executeScript('return document.readyState').then(function(readyState) {
				return readyState === 'complete';
			});
		});
	} catch (err) {
		console.log(`Type text EXCEPTION OCCURED \n'${String(err)}`);
		return null;
	}
};
exports.execute = async (str_script) => {
	try {
		const driver = await get_driver();
		const obj_ret = await driver.executeScript(str_script);
		return obj_ret;
	} catch (err) {
		console.log(`Execute JS EXCEPTION OCCURED \n${String(err)}`);
		return null;
	}
};
exports.refresh = async (hardRefresh = false) => {
	try {
		const driver = await get_driver();
		hardRefresh ? await driver.executeScript(`location.reload(true);`) : await driver.navigate().refresh();
		await common.sleep(1);
		await this.wait_for_page_load();
		await common.sleep(1);
	} catch (err) {
		console.log(`refresh page -- EXCEPTION OCCURED \n${String(err)}`);
	}
};
exports.goto = async (str_path) => {
	try {
		const driver = await get_driver();
		await driver.get(str_path);
	} catch (err) {
		console.log(`Goto${str_path} - EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.get_url = async (path = 'absolute') => {
	try {
		const driver = await get_driver();
		if (path === 'relative') {
			return await driver.getPath();
		}
		return await driver.getCurrentUrl();
	} catch (err) {
		console.log(`Get URL${str_path} EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.get_element = async (str_loc, parent = null) => {
	try {
		let obj = null;
		await (arr_loc = get_locator_info(str_loc));
		if (parent) {
			elem_parent = typeof parent === 'string' ? await this.get_element(parent) : parent;
		} else {
			elem_parent = await get_driver();
		}
		switch (arr_loc[0].toLowerCase()) {
			case 'x':
				obj = await elem_parent.findElement(By.xpath(arr_loc[1]));
				break;
			case 'css':
				obj = await elem_parent.findElement(By.css(arr_loc[1]));
				break;
		}
		return obj;
	} catch (err) {
		console.log(`Get element EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.get_elements = async (str_loc, parent = null) => {
	try {
		let ar = null;
		await (arr_loc = get_locator_info(str_loc));
		if (parent) {
			elem_parent = typeof parent === 'string' ? await this.get_element(parent) : parent;
		} else {
			elem_parent = await get_driver();
		}
		switch (arr_loc[0].toLowerCase()) {
			case 'x':
				ar = await elem_parent.findElements(By.xpath(arr_loc[1]));
				break;
			case 'css':
				ar = await elem_parent.findElements(By.css(arr_loc[1]));
				break;
		}
		return ar;
	} catch (err) {
		console.log(`Get elements EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.wait_for = async (str_loc) => {
	try {
		const driver = await get_driver();
		await (arr_loc = get_locator_info(str_loc));
		switch (arr_loc[0].toLowerCase()) {
			case 'x':
				await driver.wait(until.elementLocated(By.xpath(arr_loc[1])));
				break;
			case 'css':
				await driver.wait(until.elementLocated(By.css(arr_loc[1])));
				break;
		}
		return true;
	} catch (err) {
		console.log(`Wait_For EXCEPTION OCCURED:\n${String(err)}`);
		return false;
	}
};
exports.type = async (locator, str_text) => {
	try {
		let elem = typeof locator == 'string' ? await this.get_element(locator) : locator;
		await elem.sendKeys(str_text);
	} catch (err) {
		console.log(`Type text for ${locator} EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.click = async (locator, parent = null) => {
	try {
		const elem = typeof locator == 'string' ? await this.get_element(locator, parent) : locator;
		await elem.click();
		return true;
	} catch (err) {
		console.log(`Click text "${locator}" EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.click_and_wait = async (loc_click, loc_wait, loc_click_parent = null, loc_wait_parent = null) => {
	try {
		await this.click(loc_click, loc_click_parent);
		await common.sleep(1);
		await this.wait_for(loc_wait, loc_wait_parent);
		await common.sleep(1);
	} catch (err) {
		console.log(`Click and wait ${loc_click}, ${loc_wait} - EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.get_attribute = async (locator, str_attr, parent) => {
	try {
		const elem = typeof locator == 'string' ? await this.get_element(locator, parent) : locator;
		return [ 'text', 'innertext' ].indexOf(str_attr.toLowerCase()) >= 0
			? await elem.getText()
			: await elem.getAttribute(str_attr);
	} catch (err) {
		console.log(`Get attribute ${str_attr} - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.set_attribute = async (locator, str_attr, str_val, parent = null) => {
	try {
		const elem = typeof locator == 'string' ? await this.get_element(locator, parent) : locator;
		await elem.setAttribute(str_attr, str_val);
		return true;
	} catch (err) {
		console.log(`Set attribute ${str_attr} - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.clear_input = async (locator) => {
	try {
		const driver = await get_driver(),
			actions = await driver.actions();
		let obj = typeof locator === 'string' ? await this.get_element(locator) : locator;
		while (await obj.getAttribute('value')) {
			await actions.click(obj).sendKeys('\b').perform();
		}
		await common.sleep(1);
	} catch (error) {
		console.log(`clear input - EXCEPTION OCCURED \n${String(error)}`);
		return null;
	}
};
exports.clear_date = async (locator) => {
	try {
		const driver = await get_driver(),
			actions = await driver.actions();
		let obj = typeof locator === 'string' ? await this.get_element(locator) : locator;
		await actions.click(obj).sendKeys('\b', '\b', '\b', '\b', Key.LEFT, '\b', '\b', Key.LEFT, '\b', '\b').perform();
		await common.sleep(1);
	} catch (error) {
		console.log(`clear input - EXCEPTION OCCURED \n${String(error)}`);
		return null;
	}
};
exports.set_input = async (locator, str_val) => {
	try {
		await this.clear_input(locator);
		await common.sleep(1);
		await this.type(locator, str_val);
		await common.sleep(1);
		return true;
	} catch (err) {
		console.log(`Set input - EXCEPTION OCCURED \n${String(ex)}`);
		return null;
	}
};
exports.search_and_select = async (locator = null, keyDown = true) => {
	try {
		str_loc = typeof locator === 'string' ? locator : '';
		await common.sleep(1);
		const driver = await get_driver(),
			actions = await driver.actions();
		keyDown ? await actions.sendKeys(Key.DOWN, Key.ENTER).perform() : await actions.sendKeys(Key.ENTER).perform();
		await common.sleep(1);
	} catch (err) {
		console.log(`Test search and select for attribute -- EXCEPTION OCCURED\n${String(ex)}`);
		return null;
	}
};
exports.get_element_index = async (str_loc, attr, val, parent) => {
	try {
		ar_elems = await this.get_elements(str_loc, parent);
		if (!ar_elems.length) {
			console.log('Get element index failed. No elements exist for the locator');
			return null;
		}
		for (i in ar_elems) {
			elem = ar_elems[i];
			str_val = await elem.getAttribute(attr);
			if (val === str_val) {
				console.log(`found the value ${str_val}`);
				return i;
			}
		}
		console.log('Get element index failed. Element with attribute not found');
		return null;
	} catch (err) {
		console.log(`Get elment index - EXCEPTION OCCURED \n${err.toString()}`);
		return null;
	}
};
exports.get_attr_at_index = async (str_loc, int_index, str_attr) => {
	try {
		ar_elems = await this.get_elements(str_loc);
		if (!ar_elems.length) {
			console.log('Get attr at index FAIL. No elements exist for the locator');
			return null;
		}
		if (!ar_elems[int_index]) {
			console.log(`Get attr at index FAIL. element with index '${int_index}' not found`);
			return null;
		}
		return await ar_elems[int_index].getAttribute(str_attr);
	} catch (err) {
		console.log(`get attr at index - EXCEPTION OCCURED \n${err.toString()}`);
	}
};
exports.open_window = async (int_win_index) => {
	try {
		const driver = await get_driver();
		const arr = await driver.getAllWindowHandles();
		await driver.switchTo().window(arr[int_win_index]);
	} catch (err) {
		console.log(`Open window EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.maximize_window = async () => {
	try {
		const driver = await get_driver();
		await driver.manage().window().maximize();
	} catch (err) {
		console.log(`Maximize window EXCEPTION OCCURED:\n${String(err)}`);
	}
};
exports.is_unique_element_present = async (str_identifier, parent = null) => {
	try {
		let arr_links = await this.get_elements(str_identifier, parent);
		if (arr_links.length <= 0) {
			console.log('No element present for the identifier', str_identifier);
			return false;
		}
		if (arr_links.length > 1) {
			console.log('more than one element present for the identifier:', str_identifier);
			return false;
		}
		return true;
	} catch (err) {
		console.log(`is Unique element present - EXCEPTION OCCURED:\n${String(err)}`);
		return false;
	}
};
/*
driver.switchTo().window('windowName');
driver.switchTo().frame('frameName');
var alert = driver.switchTo().alert(); alert.accept();
To reiterate: “navigate().to()” and “get()” do exactly the same thing. But
The “navigate” interface also exposes the ability to move backwards and forwards in your browser’s history:
driver.navigate().to('http://www.example.com');
driver.navigate().forward();
driver.navigate().back();
*/
