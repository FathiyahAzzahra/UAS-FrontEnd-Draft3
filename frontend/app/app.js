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
        .when('/navbar', {
            templateUrl: 'app/views/navbar.html'
        })
        .when('/register', {
            templateUrl: 'app/views/register.html',
            controller: 'RegisterController',
        })
        .when('/selfcare', {
            templateUrl: 'app/views/selfcare.html',
            controller: 'SelfcareController',
        })
        .when('/dailyWellness', {
            templateUrl: 'app/views/dailyWellness.html',
            controller: 'DailyWellnessController',
            resolve: {
                auth: function ($location, AuthService) {
                    if (!AuthService.isLoggedIn()) {
                        $location.path('/login'); // Redirect to login if not authenticated
                    }
                }
            }
        })
        .otherwise({
            redirectTo: '/',
        });
});
