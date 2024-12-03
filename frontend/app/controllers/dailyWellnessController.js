var app = angular.module('dailyWellnessApp', []);

app.controller('DailyWellnessController', function($scope, DailyWellnessService) {
  $scope.data = {}; // Initial data container
  $scope.loading = false; // Flag for loading state

  // Function to handle loading state
  function setLoadingState(isLoading) {
    $scope.loading = isLoading;
  }

  // Function to handle errors
  function handleError(error, message) {
    console.error(message, error);
    alert(message + " Please try again later.");
    setLoadingState(false);
  }

  // Load initial data
  $scope.loadData = function() {
    setLoadingState(true);
    DailyWellnessService.getData().then(function(response) {
      $scope.data = response.data; // Store data in scope
      setLoadingState(false);
    }).catch(function(error) {
      handleError(error, "Failed to load data");
    });
  };
  $scope.loadData(); // Initial load

  // Add Plan
  $scope.addPlan = function(plan) {
    if (!plan.title || !plan.date) {
      alert('Please provide both title and date for the plan');
      return;
    }
    setLoadingState(true);
    DailyWellnessService.addPlan(plan).then(function(response) {
      $scope.data.plans.push(response.data); // Add new plan to the list
      $scope.newPlan = {}; // Clear the form
      setLoadingState(false);
    }).catch(function(error) {
      handleError(error, "Failed to add plan");
    });
  };

  // Complete Plan
  $scope.completePlan = function(plan) {
    setLoadingState(true);
    DailyWellnessService.completePlan(plan._id).then(function(response) {
      const updatedPlan = response.data;
      const index = $scope.data.plans.findIndex(p => p._id === updatedPlan._id);
      if (index !== -1) {
        $scope.data.plans[index] = updatedPlan; // Update plan in scope
      }
      setLoadingState(false);
    }).catch(function(error) {
      handleError(error, "Failed to complete the plan");
    });
  };

  // Delete Plan
  $scope.deletePlan = function(plan) {
    if (confirm('Are you sure you want to delete this plan?')) {
      setLoadingState(true);
      DailyWellnessService.deletePlan(plan._id).then(function(response) {
        // Update the plans array by removing the deleted plan
        $scope.data.plans = $scope.data.plans.filter(p => p._id !== plan._id);
        setLoadingState(false);
      }).catch(function(error) {
        handleError(error, "Failed to delete plan");
      });
    }
  };

  // Add Mood
  $scope.addMood = function(mood) {
    if (!mood.date || !mood.mood) {
      alert('Please provide both date and mood');
      return;
    }
    setLoadingState(true);
    DailyWellnessService.addMood(mood).then(function(response) {
      $scope.data.moods.push(response.data); // Add new mood
      $scope.newMood = {}; // Clear the form
      setLoadingState(false);
    }).catch(function(error) {
      handleError(error, "Failed to add mood");
    });
  };

  // Delete Mood
  $scope.deleteMood = function(mood) {
    if (confirm('Are you sure you want to delete this mood entry?')) {
      setLoadingState(true);
      DailyWellnessService.deleteMood(mood._id).then(function(response) {
        // Remove the deleted mood from the list
        $scope.data.moods = $scope.data.moods.filter(m => m._id !== mood._id);
        setLoadingState(false);
      }).catch(function(error) {
        handleError(error, "Failed to delete mood");
      });
    }
  };

  // Add Affirmation
  $scope.addAffirmation = function(affirmation) {
    if (!affirmation.text) {
      alert('Please provide the affirmation text');
      return;
    }
    setLoadingState(true);
    DailyWellnessService.addAffirmation(affirmation).then(function(response) {
      $scope.data.affirmations.push(response.data); // Add new affirmation
      $scope.newAffirmation = {}; // Clear the form
      setLoadingState(false);
    }).catch(function(error) {
      handleError(error, "Failed to add affirmation");
    });
  };

  // Toggle Favorite Affirmation
  $scope.toggleFavorite = function(affirmation) {
    setLoadingState(true);
    DailyWellnessService.toggleFavorite(affirmation._id).then(function(response) {
      const updatedAffirmation = response.data;
      const index = $scope.data.affirmations.findIndex(a => a._id === updatedAffirmation._id);
      if (index !== -1) {
        $scope.data.affirmations[index] = updatedAffirmation; // Update affirmation in scope
      }
      setLoadingState(false);
    }).catch(function(error) {
      handleError(error, "Failed to toggle favorite affirmation");
    });
  };

  // Delete Affirmation
  $scope.deleteAffirmation = function(affirmation) {
    if (confirm('Are you sure you want to delete this affirmation?')) {
      setLoadingState(true);
      DailyWellnessService.deleteAffirmation(affirmation._id).then(function(response) {
        // Remove the deleted affirmation from the list
        $scope.data.affirmations = $scope.data.affirmations.filter(a => a._id !== affirmation._id);
        setLoadingState(false);
      }).catch(function(error) {
        handleError(error, "Failed to delete affirmation");
      });
    }
  };

});
