var app = angular.module('peacefulPathApp', []);

// Controller untuk Forum
app.controller('ForumController', function ($timeout) {
    var forumCtrl = this;
    forumCtrl.userName = localStorage.getItem('username')

    forumCtrl.categories = [
        'Batita & Balita', 'Darah', 'Gaya Hidup', 'Hubungan', 'Infeksi', 'Kanker', 'Kardiovaskular', 'Kebugaran', 'Kecantikan'
    ];

    forumCtrl.selectedCategory = 'All';

    forumCtrl.topics = [];

    forumCtrl.refresh = function () {
        fetch(`http://localhost:3000/api/discussions`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch discussions');
                }
                return response.json(); // Parse JSON
            })
            .then(items => {
                $timeout(() => {
                    forumCtrl.topics = items.data.map(row => ({
                        id: row._id,
                        title: row.title,
                        author: row.user.username,
                        date: new Date(row.created_at).toLocaleDateString(),
                        views: row.view_count,
                        comments: row.comment_count,
                        category: row.topic,
                        slug: row.slug
                    }));
                    forumCtrl.filterTopics();
                });
            })
            .catch(error => {
                console.error('Error fetching discussions:', error);
                alert('Gagal mendapatkan daftar diskusi!');
            });
    }

    forumCtrl.filterTopics = function () {
        if (forumCtrl.selectedCategory === 'All') {
            forumCtrl.filteredTopics = forumCtrl.topics;
        } else {
            forumCtrl.filteredTopics = forumCtrl.topics.filter(function (topic) {
                return topic.category === forumCtrl.selectedCategory;
            });
        }
    };

    forumCtrl.delete = function (id) {
        if (confirm('Yakin ingin menghapus diskusi?') === true) {
            fetch(`http://localhost:3000/api/discussions/${id}`, {
                method: 'DELETE', // Menggunakan metode DELETE
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch discussions');
                    }
                    forumCtrl.refresh();
                })
                .catch(error => {
                    console.error('Error fetching discussions:', error);
                    alert('Gagal mendapatkan daftar diskusi!');
                });
        }
    }

    forumCtrl.refresh();
    forumCtrl.filterTopics();
});
