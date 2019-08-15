
const tester = require('../tester');

console.log("started SUITE.js");
jest.setTimeout(36000000);

describe('testing a portal for any type of case', () => {
  beforeAll(async() => {
    await pre_req.ui_setup();
  });
  afterAll(async() => {
    await global.driver.quit();
  });;
  test('testing login', async() => {
    await tester.login.test_login(function(val) {
      expect(val).toBeTruthy;
    });  
  });
});

