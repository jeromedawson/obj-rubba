const express = require('express');
const router = express.Router();
const Objection = require('../models/objection');
const { validationResult } = require('express-validator');
const { objectionValidationRules } = require('../middlewares/validation');
const { authenticateUser, authorizeUser } = require('../middlewares/authentication');
const cacheClient = require('../cacheClient');

// Route to get all objections
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', category, language, search } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (language) filters.language = language;
    if (search) filters.objection = { $regex: search, $options: 'i' };

    const cacheKey = JSON.stringify(req.query);
    const cachedObjections = await cacheClient.get(cacheKey);

    if (cachedObjections) {
      return res.json(JSON.parse(cachedObjections));
    }

    const totalCount = await Objection.countDocuments(filters);
    const objections = await Objection.find(filters)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPages = Math.ceil(totalCount / limit);

    const response = { totalCount, page, limit, sort, totalPages, objections };

    await cacheClient.set(cacheKey, JSON.stringify(response), 'EX', 60);

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to create a new objection
router.post('/', objectionValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { objection, category = 'Uncategorized', language = 'en' } = req.body;
    const newObjection = await Objection.create({ objection, category, language });

    // Clear objections cache
    await cacheClient.flush();

    res.status(201).json({ objection: newObjection });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to update an objection
router.put('/:id', authenticateUser, authorizeUser, objectionValidationRules(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { objection, category, language } = req.body;
    const updatedObjection = await Objection.findByIdAndUpdate(
      id,
      { objection, category, language },
      { new: true }
    );

    if (!updatedObjection) {
      return res.status(404).json({ error: 'Objection not found' });
    }

    // Clear objections cache
    await cacheClient.flush();

    res.json({ objection: updatedObjection });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to delete an objection
router.delete('/:id', authenticateUser, authorizeUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedObjection = await Objection.findByIdAndDelete(id);

    if (!deletedObjection) {
      return res.status(404).json({ error: 'Objection not found' });
    }

    // Clear objections cache
    await cacheClient.flush();

    res.json({ message: 'Objection deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
