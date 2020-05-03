console.log('PRE-REQ CALLED');
const { Builder, By, Key, until } = require('selenium-webdriver'),
	chrome = require('selenium-webdriver/chrome'),
	temp = require('./data/temp');

const common = require('./core/utils/common_utils');
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
	const json_config = JSON.parse(await common.get_data('qaconfig.json'));
	const json_env_vars = json_config[process.env.EXEC_ENV.toLowerCase()][process.env.PROJECT_KEY.toLowerCase()];
	for (let k in json_env_vars) {
		process['env'][k] = json_env_vars[k];
	}
	temp.data = {};
};
