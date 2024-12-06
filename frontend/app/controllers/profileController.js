var app = angular.module('Profile', []);



app.controller('ProfileController', function ($scope, $window, $http) {
    $scope.user = {
        username: '',
        fullName: '',
        pronouns: '',
        bio: '',
        profilePicture: ''
    };

    // Fungsi untuk mengambil data profil dari API
    function getProfileData() {
        const token = $window.localStorage.getItem('token');
        if (!token) {
            $window.location.href = '/login'; // Redirect jika tidak ada token
            return;
        }

        $http.get('/api/data/profile', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(function (response) {
                console.log('Profil berhasil diambil:', response.data); // Debugging
                $scope.user = response.data; // Masukkan data ke dalam $scope.user
            })
            .catch(function (error) {
                console.error('Error saat mengambil profil:', error); // Debugging
                if (error.status === 401) {
                    $window.location.href = '/login'; // Redirect ke login jika tidak authorized
                } else {
                    $scope.message = 'Error fetching profile data: ' + (error.data ? error.data.message : error.message);
                    $scope.success = false;
                }
            });
    }

    // Panggil fungsi untuk mengambil data profil saat controller diinisialisasi
    getProfileData();

    // Fungsi untuk memperbarui profil
    $scope.updateProfile = function () {
        const token = $window.localStorage.getItem('token');
        if (!token) {
            $window.location.href = '/login'; // Redirect jika tidak ada token
            return;
        }

        $http.put('/api/data/profile', $scope.user, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(function (response) {
                $scope.message = 'Profile updated successfully';
                $scope.success = true;
            })
            .catch(function (error) {
                $scope.message = 'Error updating profile: ' + (error.data ? error.data.message : error.message);
                $scope.success = false;
            });
    };


    // Delete profile
    // Fungsi untuk menghapus profil
    $scope.deleteProfile = function () {
        if (confirm('Are you sure you want to delete your account?')) {
            const token = $window.localStorage.getItem('token');
            if (!token) {
                $window.location.href = '/login'; // Redirect jika tidak ada token
                return;
            }

            $http.delete('/api/data/profile', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(function (response) {
                    // Hapus token dan username dari localStorage
                    $window.localStorage.removeItem('token');
                    $window.localStorage.removeItem('username');

                    // Tampilkan pesan sukses
                    $scope.message = 'Your account has been deleted';
                    $scope.success = true;

                    // Redirect ke halaman login setelah beberapa saat
                    setTimeout(function () {
                        $window.location.href = '/login'; // Redirect setelah akun dihapus
                    }, 2000);
                })
                .catch(function (error) {
                    $scope.message = 'Error deleting account: ' + (error.data ? error.data.message : error.message);
                    $scope.success = false;
                });
        }
    };

});