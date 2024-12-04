angular.module('dailyWellnessApp')
  .factory('DailyWellnessService', function($http) {
    const baseUrl = 'http://localhost:3000/api/dailyWellness';

    return {
      // Get all data
      getData: function() {
        return $http.get(baseUrl);
      },

      // Plans
      addPlan: function(plan) {
        return $http.post(`${baseUrl}/plans`, plan);
      },
      completePlan: function(planId) {
        return $http.put(`${baseUrl}/plans/${planId}/complete`);
      },
      deletePlan: function(planId) {
        return $http.delete(`${baseUrl}/plans/${planId}`);
      },

      // Moods
      addMood: function(mood) {
        return $http.post(`${baseUrl}/moods`, mood);
      },
      deleteMood: function(moodId) {
        return $http.delete(`${baseUrl}/moods/${moodId}`);
      },

      // Positive Affirmations
      addAffirmation: function(affirmation) {
        return $http.post(`${baseUrl}/affirmations`, affirmation);
      },
      toggleFavorite: function(affirmationId) {
        return $http.put(`${baseUrl}/affirmations/${affirmationId}/favorite`);
      },
      deleteAffirmation: function(affirmationId) {
        return $http.delete(`${baseUrl}/affirmations/${affirmationId}`);
      },

      // Additional method to update data (if needed)
      updatePlan: function(planId, updatedPlan) {
        return $http.put(`${baseUrl}/plans/${planId}`, updatedPlan);
      },
      updateMood: function(moodId, updatedMood) {
        return $http.put(`${baseUrl}/moods/${moodId}`, updatedMood);
      },
      updateAffirmation: function(affirmationId, updatedAffirmation) {
        return $http.put(`${baseUrl}/affirmations/${affirmationId}`, updatedAffirmation);
      }
    };
  });
