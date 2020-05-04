const path = require('path'),
	fs = require('fs'),
	root_dir = process.env.PWD || process.cwd();
exports.split_string = (str_string, str_limiter, str_limit = 1) => {
	try {
		const str_regex = new RegExp(str_limiter + '(.+)');
		return str_string.split(str_regex, str_limit + 1);
	} catch (err) {
		console.log(`split string EXCEPTION occured:\n${String(err)}`);
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
	} catch (err) {
		console.log(`"substitute" function EXCEPTION occured:\n${String(err)}`);
		return null;
	}
};
exports.save_snapshot = async (str_relfilepath, elem = page) => {
	try {
		set_directory(str_relfilepath);
		console.log('dirname is ', global.root_dir);
		await elem.screenshot({ path: global.root_dir + '/' + process.env.SNAPSHOTS + '/' + str_relfilepath });
	} catch (err) {
		console.log(`Save Snapshot "${str_relfilepath}" EXCEPTION OCCURED:\n${String(err)}`);
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
	} catch (err) {
		console.log(`ALL function - EXCEPTION OCCURED:\n${String(err)}`);
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
	} catch (err) {
		console.log(`Get_data function - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
exports.get_data_sync = (str_filename) => {
	try {
		return fs.readFileSync(path.join(root_dir, str_filename), 'utf8');
	} catch (err) {
		console.log(`Get_data_sync function - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};

// this function open the <str_filename> and updates its <str_key> with the <str_val>
// if the <str_key> does not exist then this function will create the <str_key>
// <str_filename> should be the relative filename wrt the root directory
// i.e. for example "./api/data/runtime.json"
exports.update_json_file = async (str_filename, str_key = null, str_val = null) => {
	try {
		let json_data = JSON.parse(await this.get_data(str_filename));
		if (!str_key) {
			json_data = {};
		} else {
			json_data[str_key] = str_val;
		}
		fs.writeFile(path.join(root_dir, str_filename), JSON.stringify(json_data), 'utf8', (err) => {
			if (err) {
				console.log(err);
			}
		});
	} catch (err) {
		console.log(`update_json function - EXCEPTION OCCURED:\n${String(ex)}`);
		return null;
	}
};

// This function replaces the values in the json object
// It takes two parameters: The target json object; And an array of key value pairs
// The array should be of the format: "[ [key1, value1], [key2, value2], [key3, value3] ]"
// If the key doesn't exist, it creates the key in the target json object
// The function returns the target json object or null (in case of EXCEPTION)
exports.update_json_values = async (target_json = {}, ar_val = {}) => {
	try {
		for (i in ar_val) {
			row = ar_val[i];
			target_json[row[0]] = row[1];
		}
		return target_json;
	} catch (err) {
		console.log(`Update JSON - EXCEPTION OCCURED:\n${String(err)}`);
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
	} catch (err) {
		console.log(`compare arrays - EXCEPTION OCCURED \n:${String(err)}`);
		return false;
	}
};
