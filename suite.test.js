
const puppeteer = require('./pre_req').puppeteer;
const tester = require('./tester');

console.log("started SUITE.js");
jest.setTimeout(36000000);

describe('testing a portal for any type of case', () => {
  beforeAll(async() => {
    global.browser = await puppeteer.launch({ "headless": false, args: ['--start-maximized'] });
    global.page = await browser.newPage();
    await global.page.setViewport({ width: 0, height: 0 });  
  });
  afterAll(async() => {
    await browser.close();
  });
  test('testing login', async() => {
    await tester.login.test_login(function(val) {
      expect(val).toBeTruthy;
    });  
  });
});

