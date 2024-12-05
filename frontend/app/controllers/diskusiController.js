// Inisialisasi aplikasi AngularJS
var app = angular.module('peacefulPathApp', []);

// Controller untuk Diskusi
app.controller('DiskusiController', function ($scope, $window) {
    var diskusiCtrl = this;

    // Daftar topik yang tersedia
    diskusiCtrl.topics = [
        'Batita & Balita', 'Darah', 'Gaya Hidup', 'Hubungan', 'Infeksi', 'Kanker', 'Kardiovaskular', 'Kebugaran', 'Kecantikan'
    ];

    // Inisialisasi data input pengguna
    diskusiCtrl.selectedStatus = '';
    diskusiCtrl.selectedTopic = '';
    diskusiCtrl.title = '';
    diskusiCtrl.content = '';

    // Fungsi untuk submit diskusi baru
    diskusiCtrl.submitDiscussion = function () {
        var visibility;
        if (diskusiCtrl.selectedStatus && diskusiCtrl.selectedTopic && diskusiCtrl.title && diskusiCtrl.content) {
            switch (diskusiCtrl.selectedStatus) {
                case 'Privasi':
                    visibility = 'private'
                    break;
                case 'Anonim':
                    visibility = 'anonymous'
                    break;
                case 'Publik':
                    visibility = 'public'
                    break;

                default:
                    visibility = 'private'
                    break;
            }
            var newDiscussion = {
                visibility: visibility,
                topic: diskusiCtrl.selectedTopic,
                title: diskusiCtrl.title,
                detail: diskusiCtrl.content
            };

            console.log('Diskusi Baru:', newDiscussion);

            fetch(`http://localhost:3000/api/discussions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newDiscussion),
            }).then(response => {
                $scope.$apply(function () {
                    diskusiCtrl.selectedStatus = '';
                    diskusiCtrl.selectedTopic = '';
                    diskusiCtrl.title = '';
                    diskusiCtrl.content = '';
                });
                alert('Diskusi berhasil dikirim!')
                $window.location.href = '../views/forum.html'; // Redirect ke halaman utama
            }).catch(error => {
                alert('Diskusi gagal dikirim!')
            });
        } else {
            alert('Harap lengkapi semua kolom!');
        }
    };
});
