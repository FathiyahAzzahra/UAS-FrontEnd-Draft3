// app.controller('LoginController', function ($scope, $http) {
//     $scope.login = function () {
//         const user = {
//             username: $scope.username,
//             password: $scope.password,
//         };

//         $http.post('/api/data/login', user).then(
//             (response) => {
//                 alert(response.data.message);
//                 localStorage.setItem('token', response.data.token);
//             },
//             (error) => {
//                 alert(error.data.message);
//             }
//         );
//     };
// });

var app = angular.module('loginApp', []);

app.controller('LoginController', function ($scope, $http, $window) {
    $scope.user = {};

    $scope.login = function () {
        $http.post('http://localhost:3000/api/data/login', $scope.user)
            .then(function (response) {
                // Simpan token dan username di localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);

                alert('Login berhasil!');
                $window.location.href = '../../index.html'; // Redirect ke halaman utama
            })
            .catch(function (error) {
                alert('Error: ' + error.data.message);
            });
    };
});