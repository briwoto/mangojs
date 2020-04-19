console.log('PRE-REQ CALLED');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const generic = require('./utils/common_utils');
const _ = require('lodash');

const globalVariables = _.pick(global, [ 'browser', 'page', 'By', 'Key', 'until', 'driver' ]);
require('dotenv').config();
global.By = By;
global.Key = Key;
global.until = until;

exports.ui_setup = async () => {
	try {
		console.log('BUILDING');
		let ops =
			process.env.RUN_HEADLESS !== 'true'
				? new chrome.Options()
				: new chrome.Options()
						.headless()
						.addArguments([
							'--no-sandbox',
							'--disable-dev-shm-usage',
							'disable-infobars',
							'--disable-gpu',
							'--disable-extensions',
							'--whitelisted-ips'
						])
						.windowSize({ width: 1024, height: 768 });
		let driver = new Builder().forBrowser('chrome').setChromeOptions(ops).build();
		await (global['driver'] = driver);
		console.log('WEB DRIVER IS READY');
	} catch (ex) {
		console.log('UI setup -- EXCEPTION OCCURED', ex.toString(), '\nTerminating program');
		process.exit();
	}
};
exports.init_env = async () => {
	const json_config = JSON.parse(await generic.get_data('qaconfig.json'));
	const json_env_vars = json_config[process.env.EXEC_ENV.toLowerCase()][process.env.PROJECT_KEY.toLowerCase()];
	for (let k in json_env_vars) {
		process['env'][k] = json_env_vars[k];
	}
};
exports.platform_login_ui = async () => {
	try {
		const json_config = JSON.parse(await generic.get_data('qaconfig.json'));
		let arr_codes = json_config.backup_codes_available;
		if (!arr_codes.length) {
			console.log('No backup codes exist. Terminating Program');
			process.exit();
		}
		process.env.BACKUP_CODE = arr_codes.pop();
		await generic.update_json('qaconfig.json', 'backup_codes_available', arr_codes);
	} catch (ex) {
		console.log('Platform login -- EXCEPTION OCCURED', ex.toString());
	}
};
