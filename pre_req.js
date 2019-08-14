
const sel = require('./selector');
const _ = require('lodash');
const ui_util = require('./utils/ui_util');
const globalVariables = _.pick(global, ['browser', 'page', 'sel', 'ui_util', 'root_dir']);
global.sel = sel;
global.root_dir = __dirname;
require('dotenv').config();

exports.ui_setup = async () => {
  try {
    await (service = new chrome.ServiceBuilder(path).build());
    await chrome.setDefaultService(service);
    await (driver_chrome = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build());
  } catch(err) {
    console.log('building service through failover');
    await (service = new chrome.ServiceBuilder()
        .setPort(55555)
        .build());
    await (options = new chrome.Options());
    await (driver_chrome = chrome.Driver.createSession(options, service));
  }
  await (global.driver = driver_chrome);
}
