
const superagent = require('superagent');
const api = require('../../utils/api_util');
const services = require('../info/description');

exports.get_token = async() => {
    try {
        const exec_env = process.env.EXEC_ENV_API;
        const res = await superagent
                        .post(exec_env+'/api/auth/token')
                        .auth(process.env.USERID, process.env.PASSWORD)
                        .set('Content-Type','application/json');    
        process.env.TOKEN = res.body.result.userToken;
        console.log("Success");
    } catch(ex) {
        console.log('Get Token EXCEPTION OCCURED', ex.toString());
    }
        
}
exports.register_user = async(fn) => {
    try {
        const obj_res = await api.run_service(services.auth.register_user);
        if (!obj_res) {
            console.log("response not received/valid");
            return(fn(false));
        }
        console.log(obj_res.body);
        console.log("Success");
        return(fn(true));
    } catch(ex) {
        console.log('Register user EXCEPTION OCCURED', ex.toString());
        return(fn(false));
    }
}