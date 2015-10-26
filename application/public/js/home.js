/**
 * New node file
 */
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
}

var ngApp = angular.module('zz.app.home', ['ui.bootstrap', 'duScroll']);
ngApp.controller('zzAvatarCtrl', ['$scope', '$element', '$animate', function($scope, $element, $animate) {
	$scope.onMouseEnter = function() {
		console.error('MOUSE ENTER');
	}
	$scope.onMouseLeave = function() {
		console.error('MOUSE LEAVE');
	}
}]).
directive('zzFadeanimate', ['$animate', function($animate) {
	return {
		restrict: 'A',
		link : function($scope, $element, $attrs) {
		    $element.on('mouseenter', function() {
		    	$scope.$apply(function(){
		    		$animate.removeClass($element, 'animate-init');
		    		$animate.removeClass($element, 'animate-leave');
		    		$animate.addClass($element, 'animate-enter');
		    	});
		    });
		    $element.on('mouseleave', function() {
		    	$scope.$apply(function(){
		    		$animate.removeClass($element, 'animate-enter');
		    		$animate.addClass($element, 'animate-leave');
		    	});
		    })
		}
	};
}]);

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

ngApp.controller('zzArticlesCtrl', ['$scope', function($scope) {
	$scope.articles = [{
		author : '周纯晨',
		title  : '就这样被你征服',
		pubday : new Date().pattern('yyyy-MM-dd')
	},{
		author : '朱盛浩',
		title  : '切断了所有退路',
		pubday : new Date().pattern('yyyy-MM-dd')
	},{
		author : '周纯晨',
		title  : '我的心情是坚固',
		pubday : new Date().pattern('yyyy-MM-dd')
	}];
	$scope.readArticle = function (idx) {
		window.location.href = 'http://zshzcc.com/article.html';
	};
}]);

ngApp.controller('zzCopyRight', ['$scope', function($scope) {
	$scope.year = new Date().getFullYear();
}]);

ngApp.controller('zzGotoTop', ['$scope', '$element', '$document', function($scope, $element, $document) {
	$scope.scrolltotop = function () {
		var top = 0;
	    var duration = 800; //milliseconds

	    //Scroll to the exact position
	    $document.scrollTop(top, duration).then(function() {});

//	    var offset = 30; //pixels; adjust for floating menu, context etc
//	    //Scroll to #some-id with 30 px "padding"
//	    //Note: Use this in a directive, not with document.getElementById 
//	    var someElement = $element(document.getElementById('body'));
//	    $document.scrollToElement(someElement, offset, duration);
	}
}]);

