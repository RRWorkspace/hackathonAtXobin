app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider
    .when('/', {
        controller: 'jrdCtrl',
        templateUrl: 'vu/jrd.html'
    })
    .otherwise({ redirectTo: '/' });

} ]);
