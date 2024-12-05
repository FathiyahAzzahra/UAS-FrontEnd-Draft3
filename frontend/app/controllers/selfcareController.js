var app = angular.module('selfcareApp', []);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            const model = $parse(attrs.fileModel);
            const modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


app.controller('SelfcareController', function ($scope, $http) {
    $scope.username = "user123"; 
    $scope.sounds = [];
    $scope.selectedSound = {};

    
    const token = localStorage.getItem('token');

    console.log('Token:', token); 
    if (token) {
        try {
            const decoded = jwt_decode(token);
            console.log('Decoded Token:', decoded);
            $scope.username = decoded.username;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }


    $scope.uploadSound = function () {
        const formData = new FormData();
        formData.append('title', $scope.newSound.title);
        formData.append('description', $scope.newSound.description);
        formData.append('file', $scope.newSound.file);
        formData.append('username', $scope.username);
    
        $http.post('/api/sounds/upload', formData, {
            headers: { 'Content-Type': undefined }, 
            transformRequest: angular.identity 
        })
        .then(response => {
            alert('Sound uploaded successfully!');
            console.log("Sound uploaded:", response.data);
            $scope.loadSounds(); 
            $scope.newSound = {}; 
        })
        .catch(error => {
            alert('Error uploading sound');
            console.error("Upload error:", error);
        });
    };    

    $scope.loadSounds = function () {
        $http.get(`http://localhost:3000/api/sounds/${$scope.username}`)
            .then(function(response) {
                // console.log("Sounds loaded:", response.data);
                if (Array.isArray(response.data)) {
                    $scope.sounds = response.data;
                    console.log("array bro");
                } else {
                    console.log("bukan bro");
                    $scope.sounds = []; 
                }
            })
            .catch(function(error) {
                console.error("Error loading sounds:", error);
                $scope.sounds = []; 
            });
    };
    
    
    $scope.editSound = function (sound) {
        $scope.selectedSound = angular.copy(sound);  
        var myModal = new bootstrap.Modal(document.getElementById('editSoundModal'));
        myModal.show(); 
    };

    $scope.updateSound = function () {
        const updatedData = {
            title: $scope.selectedSound.title,
            description: $scope.selectedSound.description,
        };

        $http.put(`/api/sounds/${$scope.selectedSound._id}`, updatedData)
            .then(response => {
                alert('Sound updated successfully!');
                $scope.loadSounds();
                var myModal = bootstrap.Modal.getInstance(document.getElementById('editSoundModal'));
                myModal.hide(); 
            })
            .catch(error => {
                alert('Error updating sound');
                console.error("Update error:", error);
            });
    };

    $scope.deleteSound = function (soundId) {
        if (confirm("Are you sure you want to delete this sound?")) {
            $http.delete(`/api/sounds/${soundId}`)
                .then(response => {
                    alert('Sound deleted successfully!');
                    $scope.loadSounds();
                })
                .catch(error => {
                    alert('Error deleting sound');
                    console.error("Delete error:", error);
                });
        }
    };

    $scope.loadSounds();
});
