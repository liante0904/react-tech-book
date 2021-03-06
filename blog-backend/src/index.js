require('dotenv').config();
const mongoose = require('mongoose');

const {
  PORT: port = 4000, // 값이 존재하지 않는다면 4000을 기본 값으로 사용
  MONGO_URI: mongoURI
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정
mongoose.connect(mongoURI).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.error(e);
});
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

/*
router.get('/', (ctx) => {
  ctx.body = '홈';
});
router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = name ? `${name}의 소개` : '소개';
});
router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  // id의 존재 유무에 따라 다른 결과 출력
  ctx.body = id ? `포스트 # ${id}` : '포스트 아이다가 없습니다.';
});
*/
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


/*  middleware, async/await */
/*
app.use(async (ctx, next) => {
  console.log('1');
  await next();
  console.log('bye');
});

app.use((ctx, next) => {
  console.log('2');
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});
*/
app.listen(4000, () => {
  console.log('listening to port port', port);
});
