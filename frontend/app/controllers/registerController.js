// app.controller('RegisterController', function ($scope, $http) {
//     $scope.register = function () {
//         const user = {
//             username: $scope.username,
//             password: $scope.password,
//         };

//         $http.post('/api/data/register', user).then(
//             (response) => {
//                 alert(response.data.message);
//                 window.location.href = '#/login';
//             },
//             (error) => {
//                 alert(error.data.message);
//             }
//         );
//     };
// });

var app = angular.module('registerApp', []);

app.controller('RegisterController', function ($scope, $http, $window) {
    $scope.user = {};

    $scope.register = function () {
        $http.post('http://localhost:3000/api/data/register', $scope.user)
            .then(function (response) {
                alert('Registration successful!');
                $window.location.href = './login.html'; // Redirect ke halaman login
            }, function (error) {
                alert('Error: ' + error.data.message);
            });
    };
});