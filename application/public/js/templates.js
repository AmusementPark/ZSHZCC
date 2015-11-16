
angular.module("template/articlelist/articleitem.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/articlelist/articleitem.html",
	'<a href="{{article.link}}" class="list-group-item zz-list-group-item animated slideInRight" target="_blank">\n' +
	'	<h3 class="list-group-item-head">{{article.head}}</h3>\n'+
	'	<div>\n'+
	'		<img src="/img/artilogo.jpg" class="zz-list-group-item-logo">\n'+
	'		<p class="zz-list-group-item-text">{{article.abst}}</p>\n'+
	'		<p class="zz-list-group-item-auth">\n'+
	'			<span class="glyphicon glyphicon-user" aria-hidden="true"></span> {{article.author}}\n'+
	'			<span class="glyphicon glyphicon-time" aria-hidden="true"></span> {{article.date}}\n'+
	'			<span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> {{article.like}}\n'+
	'		</p>\n'+
	'	</div>\n'+
	'	<div class="list-group-item-overlay-right zz-list-group-item-overlay-right" ng-class="article.author == \'朱盛浩\' ? \'zz-author-zsh\' : \'zz-author-zcc\'">\n'+
	'		<p class="zz-1st"><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span> {{article.tag}}</p>\n'+
	'		<p class="zz-2nd"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> {{article.read}}</p>\n'+
	'	</div>\n'+
	'</a>\n'+
	'');
}]);