var at = angular.module('atApp',[
	'ngRoute',
	'ngTouch',
	'ui.bootstrap'
]);



at.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider
    .when('/', {
        controller: 'homeCtrl',
        templateUrl: 'vu/task1.html'
    })
    .when('/home',{
        controller: 'homeCtrl',
        templateUrl: 'vu/task1.html'
    })
    .when('/stats',{
        controller: 'statCtrl',
        templateUrl: 'vu/stats.html'
    })
    .otherwise({ redirectTo: '/' });

} ]);


