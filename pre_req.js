const puppeteer = require('puppeteer');
const sel = require('./selector');
const _ = require('lodash');
const ui_util = require('./utils/ui_util');
const globalVariables = _.pick(global, ['browser', 'page', 'sel', 'ui_util', 'root_dir']);
global.sel = sel;
global.root_dir = __dirname;
require('dotenv').config();
module.exports = {
  "puppeteer": puppeteer
}