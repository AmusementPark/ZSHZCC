// ArticleList.js TO ArticleList Page.
// http://www.zshzcc.com/articles/life	->GET
// http://www.zshzcc.com/articles/work	->GET
// http://www.zshzcc.com/articles/hobby	->GET
//======================================================================================
var zzrequire = require('zzrequire');
var ArticlesHelper = zzrequire('db/helper/Articles');
var RedisHelper = zzrequire('db/redis/RedisHelper');
//======================================================================================
exports.Articles = function(req, res, next) {
	
	var clazz = req.params.clazz;
	
	if (clazz != 'life' &&
		clazz != 'work' &&
		clazz != 'like') {
		return res.status(404);
	}
	
	//ArticlesHelper.getList(clazz).then(function(list) {
	//	return res.render(clazz, {articles:list});
	//});

	RedisHelper.ArticleRedisHelper.getList(
		req.params.clazz
	).then(function(list) {
		return res.render(clazz, {articles:list});
	});
};
//======================================================================================