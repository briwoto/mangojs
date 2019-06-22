const path = require('path');
const fs = require('fs');
exports.split_string  = (str_string, str_limiter, str_limit=1) => {
    try {
        const str_regex = new RegExp(str_limiter+'(.+)');
        return str_string.split(str_regex, str_limit+1);
    } catch(ex) {
        console.log('split string EXCEPTION occured', ex.toString());
    }
}
exports.sleep = (int_seconds=1) => {
    return new Promise(resolve => setTimeout(resolve, int_seconds*1000));
}
exports.substitute = (str_target, obj_param) => {
    try {
        for (let key in obj_param) {
            if (obj_param.hasOwnProperty(key)) {
                let str_regex = new RegExp('~{'+key+'}');
                str_target = str_target.replace(str_regex,obj_param[key]);
            }
        }
        return str_target;
    } catch(ex) {
        console.log('"substitute" function EXCEPTION occured', ex.toString());
        return null;
    }
}
exports.save_snapshot = async (str_relfilepath, elem=page) => {
    try {
        set_directory(str_relfilepath);
        console.log('dirname is ', global.root_dir);
        await elem.screenshot({ "path": global.root_dir + '/'+process.env.SNAPSHOTS+'/'+str_relfilepath });
    } catch (ex) {
        console.log('Save Snapshot "', str_relfilepath,'" EXCEPTION OCCURED \n', ex.toString());
    }
}
set_directory = (str_path) => {
    arr_path = str_path.split('/');
    if (arr_path.length > 1) {
        for (let i=0; i < arr_path.length-1; i++) {
            let val = arr_path[i];
            str_dir = (!i) ? (global.root_dir + '/'+process.env.SNAPSHOTS + '/' + val) : (str_dir + '/' + val);
            console.log("DIR:", str_dir);
            try {
                fs.statSync(str_dir);
            } catch(e) {
                fs.mkdirSync(str_dir);
            }
        }
    }
}