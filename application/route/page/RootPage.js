//======================================================================================
// MainPages.js to Serve 1st-level Page.
//--------------------------------------------------------------------------------------
// http://www.zshzcc.com/life
// http://www.zshzcc.com/work
// http://www.zshzcc.com/like
//--------------------------------------------------------------------------------------
var zzrequire = require('zzrequire');
var RedisHelper = zzrequire('db/redis/RedisHelper');
var ArticleMySQLHelper = zzrequire('db/helper/Articles');
//--------------------------------------------------------------------------------------
var life = function(req, res, next) {
    RedisHelper.ArticleHelper.getList('life').then(function(list) {
        return res.render('life', {articles:list});
    });
};
//--------------------------------------------------------------------------------------
var work = function(req, res, next) {
    RedisHelper.ArticleHelper.getList('work').then(function(list) {
        return res.render('work', {articles:list});
    });
};
//--------------------------------------------------------------------------------------
var like = function(req, res, next) {

};

RedisHelper.ArticleHelper.init();
//--------------------------------------------------------------------------------------
module.exports = {
    'life':life,
    'work':work,
    'like':like
};
//======================================================================================