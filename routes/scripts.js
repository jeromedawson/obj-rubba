// routes/scripts.js
const express = require('express');
const router = express.Router();
const Script = require('../models/Script');

router.post('/', async (req, res) => {
  const { content, userId } = req.body;

  try {
    const script = new Script({ content, userId });
    await script.save();
    res.json({ message: 'Script saved' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.put('/:id', async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  try {
    const script = await Script.findByIdAndUpdate(id, { content }, { new: true });
    res.json({ message: 'Script updated', script });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
