const Router = require('koa-router');
const posts = require('./posts');


const api = Router();

api.use('/posts', posts.routes());

/*
api.get('/test', (ctx) => {
  ctx.body = 'test성공';
});
*/

// 라우터를 내보냅니다.
module.exports = api;
