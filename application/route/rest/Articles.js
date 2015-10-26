
//======================================================================================
var zzrequire     = require('zzrequire');
var ArticleHelper = zzrequire('db/helper/Articles');
//======================================================================================
exports.getList = function(req, res, next) {
	ArticleHelper.getList(
		req.body.clazz,
		req.body.offset
	).then(function(data) {
		return res.send(data);
	});
};
//======================================================================================