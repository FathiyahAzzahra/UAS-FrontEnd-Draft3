app.controller('LoginController', function ($scope, $http) {
    $scope.login = function () {
        const user = {
            username: $scope.username,
            password: $scope.password,
        };

        $http.post('/api/data/login', user).then(
            (response) => {
                alert(response.data.message);
                localStorage.setItem('token', response.data.token);
            },
            (error) => {
                alert(error.data.message);
            }
        );
    };
});
