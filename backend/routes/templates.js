// routes/templates.js
const express = require('express');
const Template = require('../models/Template');
const router = express.Router();

// Fetch all templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching templates' });
  }
});

module.exports = router;
