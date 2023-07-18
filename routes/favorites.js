// routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

router.post('/', async (req, res) => {
  const { objection, rebuttal, userId } = req.body;

  try {
    const favorite = new Favorite({ objection, rebuttal, userId });
    await favorite.save();
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
