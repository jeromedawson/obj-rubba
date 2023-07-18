// models/Usage.js
const mongoose = require('mongoose');

const UsageSchema = new mongoose.Schema({
  objection: String,
  rebuttal: String,
  userId: mongoose.Schema.Types.ObjectId,
  count: Number,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Usage', UsageSchema);
