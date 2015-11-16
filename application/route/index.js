//======================================================================================
var router    = require("express").Router();
var zzrequire = require('zzrequire');

var ArticlePage = zzrequire('route/page/ArticlePage');
var RootPage    = zzrequire('route/page/RootPage');

var ArticlesApi = zzrequire('route/rest/Articles');
//======================================================================================
// PAGE REQUEST
router.get('/life', RootPage.life);
router.get('/work', RootPage.work);
router.get('/like', RootPage.like);
router.get('/article/:clazz/:artid', ArticlePage.Article);
//--------------------------------------------------------------------------------------
// REST API
router.post('/api/articles', ArticlesApi.getList);
//router.post('/api/articles/like', ArticlesApi.likeIt);
//======================================================================================
module.exports = router;
//======================================================================================