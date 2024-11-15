app.controller('RegisterController', function ($scope, $http) {
    $scope.register = function () {
        const user = {
            username: $scope.username,
            password: $scope.password,
        };

        $http.post('/api/data/register', user).then(
            (response) => {
                alert(response.data.message);
                window.location.href = '#/login';
            },
            (error) => {
                alert(error.data.message);
            }
        );
    };
});
