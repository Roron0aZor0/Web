// models/Template.js
const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  industryType: { type: String, required: true }, // e.g., 'ecommerce', 'portfolio', etc.
  components: [
    {
      type: String, // 'header', 'footer', 'mainContent', etc.
      content: String, // Placeholder content for each component
    },
  ],
  styles: {
    primaryColor: String,
    secondaryColor: String,
    font: String,
    layout: String, // 'one-column', 'two-column', etc.
  },
  image: String, // Image path or URL for preview
});

module.exports = mongoose.model('Template', TemplateSchema);
