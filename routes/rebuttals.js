const express = require('express');
const router = express.Router();
const openai = require('@openai/api');

openai.apiKey = 'your-openai-api-key';

router.post('/', async (req, res) => {
  const { objection } = req.body;

  try {
    const gptResponse = await openai.Completion.create({
      engine: 'text-davinci-002',
      prompt: `Objection: ${objection}\nRebuttal:`,
      max_tokens: 60,
    });

    const rebuttal = gptResponse.choices[0]?.text.trim();
    res.json({ rebuttal });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;

