
const Service = require('../../utils/constructor').Service

module.exports = {
  "auth" : {
    "create_token": new Service('/api/auth/token','POST'),
    "get_refresh_token": new Service('/api/auth/token/refresh','GET'),
    "register_user": new Service('/api/users','POST', {payload:'register_user'}),
    "verify_registration_token": new Service('api/users/verify','GET', {needparams:true}),
    "complete_partial_registration": new Service('api/users/~{id}','GET'),
    "get_dashboard_token": new Service('api/subscription/~{id1}/dashboards/dashboard/~{id2}','GET'),
  },
  "users": {
    "get_user_subscriptions": new Service('/api/subscriptions', 'GET')
  }
}

