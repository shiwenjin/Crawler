const axios = require("axios");
const sign = require("../sign.js");
const vipParamsEncrypt = require("../edata.js");
const md5 = require("../md5.js");

var username, password;

async function getSessionId(username, password) {
  (username = username), (password = password);

  let vipParamsEncryptResult = vipParamsEncrypt.encrypt(
    "3c5ad16dbc06cd16ae1fd3344d87f16b",
    {
      api_key: "70f71280d5d547b2a7bb370a529aeea1",
      captchaId: "",
      captchaTicket: "",
      loginName: username,
      password: md5(password),
      remUser: 0,
      whereFrom: "vipotd",
      _t: 1625819131532,
    }
  );

  let config = {
    headers: {
      Cookie:
        "mars_sid=db02623c3719c45a05cb15c792c0755f;mars_cid=1625809959205_ee6d84d565c250d99aa02730674b17a9",
      Authorization: sign.getSign(`https://passport.vip.com/login/postLogin`, {
        api_key: "70f71280d5d547b2a7bb370a529aeea1",
        pc_eversion: 1,
        skey: "3c5ad16dbc06cd16ae1fd3344d87f16b",
        pc_edata: `${vipParamsEncryptResult}`,
      }),
    },
  };
  
  let postLoginInfo = await axios.post(
    `https://passport.vip.com/login/postLogin?api_key=70f71280d5d547b2a7bb370a529aeea1&pc_eversion=1&skey=3c5ad16dbc06cd16ae1fd3344d87f16b&pc_edata=${encodeURIComponent(
      vipParamsEncryptResult
    )}`,
    {},
    config
  );
  let token = postLoginInfo.data.data.redirectUrl.split("token=")[1];
  let loginInfo = await axios.post(`https://e.vip.com/login`, { token: token });
  let cookie = loginInfo.headers["set-cookie"];
  console.log(cookie);
  return getResult(cookie[0]);
}

function getResult(str) {
  var c_name = "JSESSIONID";
  if (str.length > 0) {
    c_start = str.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = str.indexOf(";", c_start);
      if (c_end == -1) c_end = str.length;
      return unescape(str.substring(c_start, c_end));
    }
  }
}

module.exports = {
  getSessionId: getSessionId,
};
