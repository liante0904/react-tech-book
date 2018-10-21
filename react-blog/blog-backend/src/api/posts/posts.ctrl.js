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
const schema = Joi.object().keys({
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
const { title, body, tags } = ctx.request.body;

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

/*
  GET /api/posts
*/
exports.list = async (ctx) => {
  // page가 주어지지 않았다면 1로 간주
  // query는 문자열 형태로 받아 오므로 숫자로 변환
  const page = parseInt(ctx.query.page || 1, 10);
  const { tag } = ctx.query;

  const query = tag ? {
    tags: tag // tags 배열에 tag를 가진 포스트 찾기
  } : {};

  // 잘못된 페이지가 주어졌다면 에러
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 350 ? post.body : `${post.body.slice(0, 350)}...`
    });
    ctx.body = posts.map(limitBodyLength);
    // 마지막 페이지 알려 주기
    // ctx.set은 response header를 설정해줍니다.
    ctx.set('Last-Page', Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(500, e);
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
