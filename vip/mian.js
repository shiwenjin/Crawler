import sign from './sign.js';
import vipParamsEncrypt from './edata.js'
import md5 from './md5.js'

console.log(md5("anta09871"))

let vipParamsEncryptResult = vipParamsEncrypt.encrypt("3c5ad16dbc06cd16ae1fd3344d87f16b", {
    "api_key": "70f71280d5d547b2a7bb370a529aeea1",
    "captchaId": "",
    "captchaTicket": "",
    "loginName": "VIP_ANTA",
    "password": md5("anta0987"),
    "remUser": 0,
    "whereFrom": "vipotd",
    "_t": 1625819131532
})

console.log(encodeURIComponent(vipParamsEncryptResult))

console.log(sign.getSign(`https://passport.vip.com/login/postLogin`, {
    "api_key": "70f71280d5d547b2a7bb370a529aeea1",
    "pc_eversion": 1,
    "skey": "3c5ad16dbc06cd16ae1fd3344d87f16b",
    "pc_edata": `${vipParamsEncryptResult}`
}))
