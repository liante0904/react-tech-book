require('browser-env')();
const render = require('./render').default;

module.exports = async (ctx) => {
  const rendered = render(ctx);
  ctx.body = rendered; // 임시 코드, 추후 구현 예정
};