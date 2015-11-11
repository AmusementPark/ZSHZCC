
//======================================================================================
var zzrequire     = require('zzrequire');
var ArticleHelper = zzrequire('db/helper/Articles');
var RedisHelper   = zzrequire('db/redis/RedisHelper');
//======================================================================================
exports.getList = function(req, res, next) {
	//ArticleHelper.getList(
	//	req.body.clazz,
	//	req.body.offset
	//).then(function(data) {
	//	return res.send(data);
	//});

	RedisHelper.ArticleRedisHelper.getList(
		req.body.clazz,
		req.body.offset
	).then(function(list) {
		return res.send(list);
	});
};
//======================================================================================