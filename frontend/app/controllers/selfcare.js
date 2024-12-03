var app = angular.module("peacefulPathApp", []);

// Controller untuk Selfcare
app.controller("SelfcareController", function ($scope, $http) {
  // Mengambil data meditasi dari API
  $http
    .get("http://localhost:5000/api/meditations")
    .then(function (response) {
      // Menyimpan data meditasi yang diterima dari API
      $scope.meditations = response.data;
      // Default filter: Tampilkan konten berdasarkan jenis 'sound'
      $scope.filterContent("sound");
    })
    .catch(function () {
      // Fallback data jika permintaan API gagal
      $scope.meditations = [
        {
          title: "Meditation",
          type: "sound",
          contentUrl: "../assets/sound-calm-waves.mp3",
          thumbnail: "../assets/sound-calm-waves.jpg",
          description: "Relaxing sound of calm waves.",
        },
        {
          title: "Deep Sleep",
          type: "sound",
          contentUrl: "../assets/sound-forest.mp3",
          thumbnail: "../assets/sound-forest.jpg",
          description: "Soothing forest sounds.",
        },
      ];
      // Default filter: Tampilkan konten berdasarkan jenis 'sound'
      $scope.filterContent("sound");
    });

  // Fungsi untuk memfilter konten berdasarkan tipe
  $scope.filterContent = function (filter) {
    if (filter === "sound") {
      $scope.filteredContent = $scope.meditations.filter(function (item) {
        return item.type === "sound";
      });
    } else if (filter === "video") {
      $scope.filteredContent = $scope.meditations.filter(function (item) {
        return item.type === "video";
      });
    } else {
      $scope.filteredContent = $scope.meditations;
    }
  };

  // Default data
  $scope.mainOptions = []; // Untuk menampilkan "Meditation" dan "Deep Sleep"
  $scope.selectedContent = []; // Untuk daftar konten berdasarkan pilihan

  // Fungsi untuk memuat opsi utama saat "Sound Meditation" diklik
  $scope.loadMainOptions = function () {
    $scope.mainOptions = [
      { title: "Meditation", type: "meditation" },
      { title: "Deep Sleep", type: "deep_sleep" },
    ];
    $scope.selectedContent = []; // Kosongkan konten yang ditampilkan
  };

  // Fungsi untuk menampilkan daftar berdasarkan opsi yang dipilih
  $scope.loadContent = function (type) {
    if (type === "meditation") {
      $scope.selectedContent = [
        {
          title: "Relaxation Techniques",
          description: "Calm your mind with relaxation techniques.",
          icon: "fas fa-headphones",
          sounds: [
            {
              title: "Sound 1",
              audioUrl: "path/to/sound1.mp3",
            },
            {
              title: "Sound 2",
              audioUrl: "path/to/sound2.mp3",
            },
            {
              title: "Sound 3",
              audioUrl: "path/to/sound3.mp3",
            },
          ],
        },
        {
          title: "Guided Meditation",
          description: "Follow a guided meditation for inner peace.",
          icon: "fas fa-heart-broken",
        },
        {
          title: "Focus Training",
          description: "Improve focus with this meditation.",
          icon: "fas fa-hospital",
        },
      ];
    } else if (type === "deep_sleep") {
      $scope.selectedContent = [
        {
          title: "Night Sounds",
          description: "Relax with soothing night sounds.",
        },
        {
          title: "Deep Sleep Music",
          description: "Enjoy calming music to help you sleep.",
        },
        {
          title: "Sleep Meditation",
          description: "Prepare for restful sleep with meditation.",
        },
      ];
    }
  };

  $scope.modalContent = {};

  // Fungsi untuk menyetel data modal
  $scope.setContentData = function (content) {
    $scope.modalContent = content;
  };

  // Fungsi untuk membuka modal
  $scope.openModal = function (content) {
    // Modal akan dibuka secara otomatis dengan bootstrap
    // Data modal sudah disetel melalui setContentData
  };
});
