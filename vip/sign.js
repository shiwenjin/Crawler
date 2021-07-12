const CryptoJS = require("crypto-js") 
        var sign = {
            data: {
                "secret": "qyrohlf5sjazleru",
                "enString": {
                    "70f71280d5d547b2a7bb370a529aeea1": "U2FsdGVkX197SM3Eh62XyjAwTXznW9DdALdNR1gKNsewAg3fzwA0x/+UQldlbi3oYBn8eFHgTtBUcGneYPCjIA==",
                    "8cec5243ade04ed3a02c5972bcda0d3f": "U2FsdGVkX1+ZmG8rT/n9qDbrWBnK0K3G0gsoPo0N6/6qx8AklnZmXLyulj0KAy07ixFAu6oMKmOY0+VH3DjQ2Q==",
                    "adf779847ac641dd9590ccc5674e25d2": "U2FsdGVkX1/VI+95aRUsSZCDB3rmMe2DPSUO+rSH7U/tlNnA5u9anTM3oHI+XgIeHWA5XDAo0Z19ddwzFeHFXA=="
                }
            },
            getSign: function(url, param, cookie) {
                var rs = "";
                var _this = this;
                var api = _this.replaceHost(url);
                var hashParam = _this.hashParam(param, url);
                var cid = "1625809959205_ee6d84d565c250d99aa02730674b17a9";
                var sid = "db02623c3719c45a05cb15c792c0755f";
                var secret = _this.getSecret(param);
                rs = this.sha1(api + hashParam + sid + cid + secret);
                rs = "OAuth api_sign=" + rs;
                return rs
            },
            replaceHost: function(url) {
                if (url) {
                    url = url.replace(/^http:\/\/[^\/]*/, "");
                    url = url.replace(/^https:\/\/[^\/]*/, "");
                    url = url.replace(/^\/\/[^\/]*/, "")
                }
                return url
            },
            hashParam: function(param, url) {
                var rs = "";
                var keyAry = [];
                if (url && url.indexOf("?") != -1) {
                    url = url.split("?")[1];
                    if (url.indexOf("#") != -1)
                        url = url.split("#")[0];
                    var aryUrl = url.split("&");
                    for (var i in aryUrl) {
                        var arySplit = aryUrl[i].split("=");
                        param[arySplit[0]] = arySplit[1] ? arySplit[1] : ""
                    }
                }
                for (var i in param)
                    keyAry.push(i);
                keyAry = keyAry.sort();
                for (var j in keyAry) {
                    if (keyAry[j] == "api_key")
                        continue;
                    rs += "&" + keyAry[j] + "=" + (param[keyAry[j]] !== undefined && param[keyAry[j]] !== null ? param[keyAry[j]] : "")
                }
                if (rs.length > 0)
                    rs = rs.substring(1);
                rs = this.sha1(rs);
                return rs
            },
            getSecret: function(param) {
                var rs = "";
                var _this = this;
                var enString = param.api_key && _this.data.enString[param.api_key] ? _this.data.enString[param.api_key] : "";
                return _this.aesDecrypt(enString, _this.data.secret)
            },
            aesEncrypt: function(msg, secret) {
                return CryptoJS.AES.encrypt(msg, secret).toString()
            },
            aesDecrypt: function(msg, secret) {
                var bytes = CryptoJS.AES.decrypt(msg, secret);
                return bytes.toString(CryptoJS.enc.Utf8)
            },
            sha1: function(msg) {
                return CryptoJS.SHA1(msg).toString()
            },
            getCookie: function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    if (arr[2])
                        return unescape(arr[2]);
                return ""
            }
        };

// export default sign;

module.exports = sign;