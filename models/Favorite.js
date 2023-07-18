// models/Favorite.js
const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  objection: String,
  rebuttal: String,
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
