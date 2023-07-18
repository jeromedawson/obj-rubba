// models/Script.js
const mongoose = require('mongoose');

const ScriptSchema = new mongoose.Schema({
  content: String,
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Script', ScriptSchema);
