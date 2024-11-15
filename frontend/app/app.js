app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController',
        })
        .when('/about', {
            templateUrl: 'app/views/about.html',
            controller: 'AboutController',
        })
        .when('/login', {
            templateUrl: 'app/views/login.html',
            controller: 'LoginController',
        })
        .when('/register', {
            templateUrl: 'app/views/register.html',
            controller: 'RegisterController',
        })
        .otherwise({
            redirectTo: '/',
        });
});
