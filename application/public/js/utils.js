var utils = angular.module('zz.app.utils', []);
utils.constant("$ArticlesURL", "/api/articles/");
utils.constant("$PicturesURL", "/api/pictures/");

utils.service("$zzArticlesServ", ['$http', '$q', '$ArticlesURL', function($http, $q, $ArticlesURL) {
	// 通过分类获取文章列表
	this.getArticles = function(clazz, offset) {
		var defer = $q.defer();
		var post = {
			clazz  : clazz,
			offset : offset
		};
		$http.post($ArticlesURL, post).success(function(json) {
			defer.resolve(json);
       	}).error(function(reason) {
       		defer.reject();
       	});
		return defer.promise;
	}
}]);