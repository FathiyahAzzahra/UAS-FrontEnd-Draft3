const mongoose = require('mongoose');

// Schema for Plans
const PlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

// Schema for Mood Tracker
const MoodSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mood: { type: String, required: true },
});

// Schema for Positive Affirmations
const AffirmationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  favorite: { type: Boolean, default: false },
});

// Main Schema for Daily Wellness
const DailyWellnessSchema = new mongoose.Schema(
  {
    plans: [PlanSchema],
    moods: [MoodSchema],
    affirmations: [AffirmationSchema],
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Instance method to get active plans (not completed)
DailyWellnessSchema.methods.getActivePlans = function () {
  return this.plans.filter(plan => !plan.completed);
};

// Instance method to get completed plans
DailyWellnessSchema.methods.getCompletedPlans = function () {
  return this.plans.filter(plan => plan.completed);
};

// Instance method to get moods by a specific date
DailyWellnessSchema.methods.getMoodsByDate = function (date) {
  // Ensure `date` is in the same format (e.g., "YYYY-MM-DD")
  const targetDate = new Date(date).toISOString().slice(0, 10);
  return this.moods.filter(mood => mood.date.toISOString().slice(0, 10) === targetDate);
};

// Instance method to get favorite affirmations
DailyWellnessSchema.methods.getFavoriteAffirmations = function () {
  return this.affirmations.filter(affirmation => affirmation.favorite);
};

// Create and export the model
module.exports = mongoose.model('DailyWellness', DailyWellnessSchema);
