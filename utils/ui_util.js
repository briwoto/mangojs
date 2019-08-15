
const gen = require('./generic');
const {By, Key, until} = require('selenium-webdriver');

get_locator_info = (str_raw) => {
    return (str_raw.substr(0,2) == '//') ? ['x', str_raw] : ['css', str_raw];
}
get_driver = () => {return global.driver};
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
    } catch(ex) {
        console.log('Wait_For EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.type = async (str_loc, str_text) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await driver.findElement(By.xpath(arr_loc[1])).sendKeys(str_text);
                break;
            case 'css':
                await driver.findElement(By.css(arr_loc[1])).sendKeys(str_text);
                break;
        }
    } catch(ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.click = async (str_loc) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await driver.findElement(By.xpath(arr_loc[1])).click();
                break;
            case 'css':
                await driver.findElement(By.css(arr_loc[1])).click();
                break;
        }
    } catch(ex) {
        console.log('Click text EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.get_element = async (str_loc) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await ( obj = driver.findElement(By.xpath(arr_loc[1])) );
                break;
            case 'css':
                await ( obj = driver.findElement(By.css(arr_loc[1])) );
                break;
        }
        return obj;
    } catch(ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return null;
    }
}
exports.get_elements = async (str_loc) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await ( obj = driver.findElements(By.xpath(arr_loc[1])) );
                break;
            case 'css':
                await ( obj = driver.findElements(By.css(arr_loc[1])) );
                break;
        }
        return obj;
    } catch(ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return null;
    }
}
exports.get_attribute = async (str_loc, str_text) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await ( obj = driver.findElement(By.xpath(arr_loc[1])) );
                break;
            case 'css':
                await ( obj = driver.findElement(By.css(arr_loc[1])) );
                break;
        }
        return (str_text.toLowerCase().indexOf(["text", "innertext"])) ? obj.getText() : obj.getAttribute(str_text)
    } catch(ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return null;
    }
}
exports.wait_for_page = async () => {
    try {
        const driver = await get_driver();
        await driver.wait(until.executeScript("return document.readyState").equals("complete") );
    } catch(ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return null;
    }
}

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
