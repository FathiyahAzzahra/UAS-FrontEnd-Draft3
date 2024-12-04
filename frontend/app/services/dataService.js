// frontend/services/dataService.js
angular.module('app', [])
    .factory('dataService', function ($http) {
        const apiUrl = 'http://localhost:3000/api/data';

        return {
            getProfile: function () {
                return $http.get(`${apiUrl}/profile`); // Mengambil data profil
            },
            // Anda bisa menambahkan fungsi lain untuk update dan delete profil di sini
        };
    });
