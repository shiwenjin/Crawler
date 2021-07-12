const api = require("../vip/remote/api.js");

var session = async (ctx, next) => {
  let re = await api.getSessionId(ctx.request.body.username, ctx.request.body.password);
  console.log(re);
  ctx.response.type = "application/json";
  ctx.response.body = {
    data: { sessionId: re },
    code: 200,
    message: "success", // 自定义响应体
  };
};

module.exports = {
  "POST /vip/session": session,
};
