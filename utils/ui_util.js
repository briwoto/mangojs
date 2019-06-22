
const gen = require('./generic');

exports.wait_for_element = async (str_loc) => {
    try {
        await (split_loc = get_locator_info(str_loc));
        switch (split_loc[0].toLowerCase()) {
            case 'x': 
                await page.waitForXPath(split_loc[1]);

            case 'css':
                await page.waitFor(split_loc[1]);
        }
    } catch(ex) {
        console.log('Wait_For_Element EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.click_element = async (str_loc, elem=page) => {
    try {
        await (split_loc = get_locator_info(str_loc));
        switch (split_loc[0].toLowerCase()) {
            case 'x': 
                await (await elem.$x(split_loc[1]))[0].click();
            case 'css':
                await (await elem.$(split_loc[1])).click();
        }
    } catch(ex) {
        console.log('Click_Element EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.type = async (str_loc, str_val) => {
    try {
        await (split_loc = get_locator_info(str_loc));
        await page.type(split_loc[1], str_val);
    } catch(ex) {
        console.log('Jesteer "Type" function EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.get_web_elements = async (str_loc, elem=page) => {
    try {
        await (split_loc = get_locator_info(str_loc));
        switch (split_loc[0].toLowerCase()) {
            case 'x': 
                arr_obj = await elem.$x(split_loc[1]);
            case 'css':
                arr_obj = await elem.$$(split_loc[1]);
        }
        return arr_obj;
    } catch(ex) {
        console.log('get_web_elements EXCEPTION OCCURED \n', ex.toString());
    }
}
exports.get_element = async (str_loc, elem=page) => {
    try {
        await (split_loc = get_locator_info(str_loc));
        switch (split_loc[0].toLowerCase()) {
            case 'x': 
                return ((await elem.$x(split_loc[1]))[0]);
            case 'css':
                return (await elem.$(split_loc[1]));
        }
    } catch(ex) {
        console.log('get_element EXCEPTION OCCURED \n', ex.toString());
    }
}
get_locator_info = (str_raw) => {
    // return gen.split_string(str_raw,'=',1);
    return (str_raw.substr(0,2) == '//') ? ['x', str_raw] : ['css', str_raw];
}