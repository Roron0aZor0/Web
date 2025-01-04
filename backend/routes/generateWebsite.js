const express = require('express');
const router = express.Router();
const Website = require('../models/Website'); // Assuming you have a Website model

router.post('/generate-website', async (req, res) => {
  try {
    const { name, color, style } = req.body;

    // Logic to generate website (this can involve AI-based generation or template population)
    const newWebsite = new Website({
      name,
      color,
      style,
      createdAt: new Date(),
    });

    await newWebsite.save();

    res.json({
      success: true,
      website: newWebsite, // Return the created website object
    });
  } catch (error) {
    console.error('Error generating website:', error);
    res.status(500).json({ success: false, message: 'Error generating website' });
  }
});

module.exports = router;
