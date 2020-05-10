const cwd = process.cwd(),
	api = require(`${cwd}/utils/`).api_utils,
	common = require(`${cwd}/utils/`).common_utils;

//This function is used to update the payload with the user data
//It maps the user input to map.js and adds the mapped_value to the payload
exports.update_payload = async (payload, page, ar_data, group = '') => {
	try {
		for (i in ar_data) {
			row = ar_data[i];
			fieldname = group.length ? `${group}_${row[0]}` : row[0];
			val = row[1];
			mapped_field = page.fields[fieldname].mapped_to;
			payload[mapped_field] = val;
		}
		return payload;
	} catch (err) {
		console.log(`Update payload - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};

//This function is used to run the webservice and fetch a response
exports.get_response = async (service) => {
	try {
		service.uri = process.env.baseurl_api + service.endpoint;
		const res = await service.run_service(process.env.ACCESS_TOKEN);
		if (!res.body) {
			console.log('Create board failed. No body in response');
			return null;
		}
		return res;
	} catch (err) {
		console.log(`Get response - EXCEPTION OCCURED:\n${String(err)}`);
		return null;
	}
};
