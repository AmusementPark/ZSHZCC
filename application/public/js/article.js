angular.module('zz.app.article', ['ui.bootstrap']);

angular.module('zz.app.article').controller('zzTitleCtrl', ['$scope', function($scope) {
	$scope.avatar = '/img/zcc.jpg';
}]);
angular.module('zz.app.article').controller('zzCopyRight', ['$scope', function($scope) {
	$scope.year = new Date().getFullYear();
}])
