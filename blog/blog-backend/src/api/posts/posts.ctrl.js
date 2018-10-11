const Post = require('models/post');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  // 검증 실패
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // 400 Bad Request
    return null;
  }

  return next(); // next를 리턴해야 ctx.body가 제대로 설정됩니다.
};

exports.write = async (ctx) => {
// 객체가 지닌 값들을 검증
const scghma = Joi.object().keys({
  title: Joi.string().required(), // 뒤에 required를 붙여주면 필수 항목이라는 의미
  body: Joi.string().required(), 
  tag: Joi.array().items(Joi.string()).required() // 문자열 배열   
});
// 첫번째 파라미터는 검증할 객체, 두번째는 스키마
const result = Joi.validate(ctx.request.body, schema);

// 오류가 발생시 내용 응답
if (result.error) {
  ctx.status = 400;
  ctx.body = result.error;
  return;
}
const { title, boay, tags } = ctx.request.body;

  // Post 인스턴스를 만듭니다.
  const post = new Post({
    title, body, tags
  });
  try {
    await post.save(); // db에 등록합니다.
    ctx.body = post;
  } catch (error) {
    // db의 오류가 발생합니다.
    ctx.throw(e, 500);
  }
};

/** GET /api/posts */
exports.list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (error) {
    ctx.throw(e, 500);
  }
};
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // 포스트가 존재하지 않을때
    if (!post) {
      ctx.status = 404;
      return
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(e, 500);
  }
};
exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (error) {
    ctx.throw(e, 500);
  }
};
exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
  const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      // 이 값을 설정해야 업데이트 된 객체를 반환합니다.
      // 설정하지 않으면 업데이트되기 전의 객체를 반환합니다.
    }).exec();
    // 포스트가 존재 하지 않을 떄
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(e, 500);
  }
};
