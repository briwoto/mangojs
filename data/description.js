const Service = require('../core/utils/api_utils').Service;

module.exports = {
	auth: {
		login: new Service('/login', 'POST', { payload: 'user_creds' })
	},
	users: {
		list_users: new Service('/users', 'GET', { needparams: true, params: [ 'page' ] }),
		get_user: new Service('/users/~{user_id}', 'GET'),
		create_user: new Service('/users', 'POST', { payload: 'create_user' }),
		update_user: new Service('/users', 'PUT', { payload: 'update_user' }),
		delete_user: new Service('/users/~{user_id}', 'DELETE')
	}
};
