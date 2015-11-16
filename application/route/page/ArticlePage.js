// ArticleList.js TO ArticleList Page.
// http://www.zshzcc.com/articles/life	->GET
// http://www.zshzcc.com/articles/work	->GET
// http://www.zshzcc.com/articles/hobby	->GET
//======================================================================================
var zzrequire = require('zzrequire');
var RedisHelper = zzrequire('db/redis/RedisHelper');
//======================================================================================
exports.Article = function(req, res, next) {

	var clazz = req.params.clazz;
	var artid = req.params.artid;

	if (clazz != 'life' &&
		clazz != 'work' &&
		clazz != 'like') {
		return res.status(404).end();
	}

	RedisHelper.ArticleHelper.getOneDetail(clazz, artid).then(function(article) {
		return res.render('article', {article:article});
	});

};
//======================================================================================