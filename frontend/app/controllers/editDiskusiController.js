
// Inisialisasi aplikasi AngularJS
var app = angular.module('peacefulPathApp', []);

// Controller untuk Diskusi
app.controller('EditDiskusiController', function ($scope, $window, $location) {
    var diskusiCtrl = this;

    // Daftar topik yang tersedia
    diskusiCtrl.topics = [
        'Batita & Balita', 'Darah', 'Gaya Hidup', 'Hubungan', 'Infeksi', 'Kanker', 'Kardiovaskular', 'Kebugaran', 'Kecantikan'
    ];
    const queryString = $window.location.search;

    // Parse the query string
    const params = new URLSearchParams(queryString);
    const discussionId = params.get('id'); // Get the 'id' parameter
    console.log(discussionId)
    // Inisialisasi data input pengguna
    diskusiCtrl.selectedStatus = '';
    diskusiCtrl.selectedTopic = '';
    diskusiCtrl.title = '';
    diskusiCtrl.content = '';
    diskusiCtrl.id = '';

    diskusiCtrl.refresh = function () {
        fetch(`http://localhost:3000/api/discussions/${discussionId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch discussions');
                }
                return response.json();
            })
            .then(items => {
                $scope.$apply(() => {
                    switch (items.data.visibility) {
                        case 'private':
                            diskusiCtrl.selectedStatus = 'Privasi'
                            break;
                        case 'anonymous':
                            diskusiCtrl.selectedStatus = 'Anonim'
                            break;
                        case 'public':
                            diskusiCtrl.selectedStatus = 'Publik'
                            break;

                        default:
                            diskusiCtrl.selectedStatus = 'Privasi'
                            break;
                    }
                    diskusiCtrl.id = items.data._id;
                    diskusiCtrl.selectedTopic = items.data.topic;
                    diskusiCtrl.title = items.data.title;
                    diskusiCtrl.content = items.data.detail;
                });
            })
            .catch(error => {
                console.error('Error fetching discussions:', error);
                alert('Gagal mendapatkan daftar diskusi!');
            });
    }

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

            fetch(`http://localhost:3000/api/discussions/${diskusiCtrl.id}`, {
                method: 'PUT',
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
                alert('Diskusi berhasil dirubah!')
                // $window.location.href = '../views/forum.html'; // Redirect ke halaman utama
            }).catch(error => {
                alert('Diskusi gagal dikirim!')
            });
        } else {
            alert('Harap lengkapi semua kolom!');
        }
    };
    diskusiCtrl.refresh()
});