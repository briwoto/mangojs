
const gen = require('./generic');
const payloads = require('../api/info/payload');
const superagent = require('superagent');
// var OAuth = require('oauth');

exports.run_service = async(obj_service) => {
    try {
        const exec_env = process.env.EXEC_ENV;
        const str_uri = exec_env + obj_service.endpoint;
        let res = null;
        switch (obj_service.method.toLowerCase()) {
            case 'get':
                res = await superagent
                        .get(str_uri)
                        .set('Authorization', 'Bearer '+process.env.TOKEN)
                        ;
            break;

            case 'post':
                let json_payload = payloads[obj_service.payload];
                res = await superagent
                        .post(str_uri)
                        .set('Authorization', 'Bearer '+process.env.TOKEN)
                        .send(json_payload)
                        ;
                break;
        }
        return res;
    } catch(ex) {
        console.log('run_service EXCEPTION OCCURED: ', ex.toString());
    }
}