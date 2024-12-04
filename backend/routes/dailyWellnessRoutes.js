const express = require('express');
const router = express.Router();
const DailyWellness = require('../models/dailyWellnessModel');

// Get all daily wellness data
router.get('/', async (req, res, next) => {
  try {
    let data = await DailyWellness.findOne();
    if (!data) {
      data = new DailyWellness({});
      await data.save();
    }
    res.json(data);
  } catch (err) {
    next(err); // Forward error to the error handling middleware
  }
});

// Add a new plan
router.post('/plans', async (req, res, next) => {
  const { title, date } = req.body;
  try {
    const data = await DailyWellness.findOneAndUpdate(
      {},
      { $push: { plans: { title, date, completed: false } } },
      { new: true, upsert: true }
    );
    res.json(data.plans);
  } catch (err) {
    next(err);
  }
});

// Mark plan as complete
router.put('/plans/:id/complete', async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await DailyWellness.findOne();
    if (!data) return res.status(404).json({ error: 'Data not found' });
    
    const plan = data.plans.id(id);
    if (plan) {
      plan.completed = true;
      await data.save();
      res.json(plan);
    } else {
      res.status(404).json({ error: 'Plan not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Delete a plan
router.delete('/plans/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await DailyWellness.findOneAndUpdate(
      {},
      { $pull: { plans: { _id: id } } },
      { new: true }
    );
    if (!data) return res.status(404).json({ error: 'Data not found' });
    res.json(data.plans);
  } catch (err) {
    next(err);
  }
});

// Add a mood
router.post('/moods', async (req, res, next) => {
  const { date, mood } = req.body;
  try {
    const data = await DailyWellness.findOneAndUpdate(
      {},
      { $push: { moods: { date, mood } } },
      { new: true, upsert: true }
    );
    res.json(data.moods);
  } catch (err) {
    next(err);
  }
});

// Delete a mood
router.delete('/moods/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await DailyWellness.findOneAndUpdate(
      {},
      { $pull: { moods: { _id: id } } },
      { new: true }
    );
    if (!data) return res.status(404).json({ error: 'Data not found' });
    res.json(data.moods);
  } catch (err) {
    next(err);
  }
});

// Add an affirmation
router.post('/affirmations', async (req, res, next) => {
  const { text } = req.body;
  try {
    const data = await DailyWellness.findOneAndUpdate(
      {},
      { $push: { affirmations: { text, favorite: false } } },
      { new: true, upsert: true }
    );
    res.json(data.affirmations);
  } catch (err) {
    next(err);
  }
});

// Mark affirmation as favorite
router.put('/affirmations/:id/favorite', async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await DailyWellness.findOne();
    if (!data) return res.status(404).json({ error: 'Data not found' });
    
    const affirmation = data.affirmations.id(id);
    if (affirmation) {
      affirmation.favorite = !affirmation.favorite; // Toggle favorite
      await data.save();
      res.json(affirmation);
    } else {
      res.status(404).json({ error: 'Affirmation not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Delete an affirmation
router.delete('/affirmations/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await DailyWellness.findOneAndUpdate(
      {},
      { $pull: { affirmations: { _id: id } } },
      { new: true }
    );
    if (!data) return res.status(404).json({ error: 'Data not found' });
    res.json(data.affirmations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
