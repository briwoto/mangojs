const path = require('path'),
	fs = require('fs'),
	root_dir = process.env.PWD || process.cwd();
exports.split_string = (str_string, str_limiter, str_limit = 1) => {
	try {
		const str_regex = new RegExp(str_limiter + '(.+)');
		return str_string.split(str_regex, str_limit + 1);
	} catch (ex) {
		console.log('split string EXCEPTION occured', ex.toString());
	}
};
exports.sleep = (int_seconds = 1) => {
	return new Promise((resolve) => setTimeout(resolve, int_seconds * 1000));
};
exports.substitute = (str_target, obj_param) => {
	try {
		for (let key in obj_param) {
			if (obj_param.hasOwnProperty(key)) {
				let str_regex = new RegExp('~{' + key + '}');
				str_target = str_target.replace(str_regex, obj_param[key]);
			}
		}
		return str_target;
	} catch (ex) {
		console.log('"substitute" function EXCEPTION occured', ex.toString());
		return null;
	}
};
exports.save_snapshot = async (str_relfilepath, elem = page) => {
	try {
		set_directory(str_relfilepath);
		console.log('dirname is ', global.root_dir);
		await elem.screenshot({ path: global.root_dir + '/' + process.env.SNAPSHOTS + '/' + str_relfilepath });
	} catch (ex) {
		console.log('Save Snapshot "', str_relfilepath, '" EXCEPTION OCCURED \n', ex.toString());
	}
};
exports.all = async (arr_values) => {
	try {
		for (let i = 0; i < arr_values.length; i++) {
			if (!elem) {
				return false;
			}
			return true;
		}
	} catch (ex) {
		console.log('ALL function - EXCEPTION OCCURED \n', ex.toString());
		return false;
	}
};
set_directory = (str_path) => {
	arr_path = str_path.split('/');
	if (arr_path.length > 1) {
		for (let i = 0; i < arr_path.length - 1; i++) {
			let val = arr_path[i];
			if (val.length) {
				str_dir = !i ? global.root_dir + '/' + process.env.SNAPSHOTS + '/' + val : str_dir + '/' + val;
				try {
					fs.statSync(str_dir);
				} catch (e) {
					fs.mkdirSync(str_dir);
				}
			}
		}
	}
};
exports.get_data = async (str_filename) => {
	try {
		return fs.readFileSync(path.join(root_dir, str_filename), 'utf8');
	} catch (ex) {
		console.log('Get_data function - EXCEPTION OCCURED \n', ex.toString());
		return null;
	}
};
exports.get_data_sync = (str_filename) => {
	try {
		return fs.readFileSync(path.join(root_dir, str_filename), 'utf8');
	} catch (ex) {
		console.log('Get_data_sync function - EXCEPTION OCCURED \n', ex.toString());
		return null;
	}
};

// this function open the <str_filename> and updates its <str_key> with the <str_val>
// if the <str_key> does not exist then this function will create the <str_key>
// <str_filename> should be the relative filename wrt the root directory
// i.e. for example "./api/data/runtime.json"
exports.update_json = async (str_filename, str_key, str_val) => {
	try {
		let json_data = JSON.parse(await this.get_data(str_filename));
		json_data[str_key] = str_val;
		fs.writeFile(path.join(root_dir, str_filename), JSON.stringify(json_data), 'utf8', (err) => {
			if (err) {
				return err;
			}
		});
	} catch (ex) {
		console.log('update_json function - EXCEPTION OCCURED \n', ex.toString());
		return null;
	}
};
exports.compare_arrays = async (arr1, arr2) => {
	try {
		if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
			return true;
		}
		if (arr1.length != arr2.length) {
			console.log('number of elements in both arrays are diferent \narr1=', arr1, '\narr2=', arr2);
		} else {
			console.log(`compare array failed. \narr1=${arr1}\narr2=${arr2}`);
		}
		return false;
	} catch (ex) {
		console.log('compare arrays - EXCEPTION OCCURED \n', ex.toString());
		return false;
	}
};
