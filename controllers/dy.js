const douyin = require("../dy/sign.js");

var sign = async (ctx, next) => {
  ctx.response.body = douyin.get_sign(ctx.request.body.url);
};

module.exports = {
  "POST /douyin/sign": sign,
};
