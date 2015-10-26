//=====================================================================================================
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
};
//-----------------------------------------------------------------------------------------------------
var ngApp = angular.module('zz.app.artilist', ['ui.bootstrap', 'duScroll', 'zz.app.utils', 'template/articlelist/articleitem.html']);
//-----------------------------------------------------------------------------------------------------
ngApp.controller('zzArtilistCtrl', ['$scope', function($scope) {
	$scope.artis = 0;
}]).
directive('zzArtisClazz', function() {
	return {
		restrict: 'A',
		link : function($scope, $element, $attrs) {
			$scope.artisClazz = $attrs.zzArtisClazz;
		}
	};
}).
directive('zzArtis', ['$compile', '$timeout', '$templateCache', function($compile, $timeout, $templateCache) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$scope.artis = $element.children().length; //记录下当前列表的长度
		    $scope.addArtis = function(list) {
		    	$scope.artis += list.length;
		    	angular.forEach( list, function(article, idx) {
			    	$timeout(function() {
			    		var newscp = $scope.$new(false);
			    		newscp.article = article;
				    	var html = $compile($templateCache.get('template/articlelist/articleitem.html'))(newscp);
				    	$element.append(html);
			    	}, 250*idx);
		    	});
		    };
		}
	};
}]).
directive('zzLoadingBtn', ['$zzArticlesServ', '$timeout', function($zzArticlesServ, $timeout) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$scope.moreArticles = function() {
				$element.addClass('disabled');
				$element.text('加载中...');
				$timeout(function() {
					$zzArticlesServ.getArticles($scope.artisClazz, $scope.artis).then(
					function(data) {
						if (data.length == 0 ) {
							$element.text('已经没有更多文章了');
							return;
						}
						$scope.addArtis(data);
						$element.removeClass('disabled');
						$element.text('加载更多');
					});
				}, 100);
			}
		}
	};
}]);
//-----------------------------------------------------------------------------------------------------
ngApp.controller('zzCarouselCtrl', ['$scope', function ($scope) {
	$scope.zzCarouselInterval = false;
	var slides = $scope.slides = [];
	$scope.addSlide = function(idx) {
		var img  = (idx==0)?'/img/zsh.jpg':'/img/zcc.jpg';
		var name = (idx==0)?'朱盛浩':'周纯晨';
	    var newWidth = 600 + slides.length + 1;
	    slides.push({
	    	image: img,
	    	name: name,
	    	text1: ['程序猿，@IBM宁波分公司','设计狮，@宁波门户网站东方热线'][slides.length % 2],
	        text2: ['喜欢瞎折腾，各方面技术都插一脚','追求简约简单UI视觉效果，喜欢温暖的森系'][slides.length % 2],
	        text3: ['浙江工业大学','宁波大学'][slides.length % 2],
	    });
	};
	for (var i=0; i<2; i++) {
	    $scope.addSlide(i);
	}
}]);
//-----------------------------------------------------------------------------------------------------
ngApp.controller('zzCopyRight', ['$scope', function($scope) {
	$scope.year = new Date().getFullYear();
}]);
//-----------------------------------------------------------------------------------------------------
ngApp.controller('zzScrollTop', ['$scope', '$document', function($scope, $document) {
	$scope.scrollTop = function () {
	    $document.scrollTop(0, 800).then(function() {});
	};
}]);
//=====================================================================================================
