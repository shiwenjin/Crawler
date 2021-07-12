const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controllers');
const moment = require('moment');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`${moment().format('yyyy-MM-DD hh:mm:ss')} ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');