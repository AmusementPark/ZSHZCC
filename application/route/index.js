//======================================================================================
var router    = require("express").Router();
var zzrequire = require('zzrequire');

//var Article    = zzrequire('route/page/Article');
var Articles    = zzrequire('route/page/Articles');
var ArticlesApi = zzrequire('route/rest/Articles');
//======================================================================================
// PAGE REQUEST
router.get('/articles/:clazz', Articles.Articles);
//router.get('/articles/:tag/:arti_id', Article.Article);
//--------------------------------------------------------------------------------------
// REST API
router.post('/api/articles', ArticlesApi.getList);
//======================================================================================
module.exports = router;
//======================================================================================