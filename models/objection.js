const mongoose = require('mongoose');
const encryption = require('mongoose-encryption');
const crypto = require('crypto');

const objectionSchema = new mongoose.Schema(
  {
    objection: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Uncategorized',
      enum: ['Uncategorized', 'Sales', 'Technical', 'Price'],
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'fr', 'es', 'de'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes
objectionSchema.index({ objection: 'text', category: 1 });

// Virtuals
objectionSchema.virtual('wordCount').get(function () {
  return this.objection.split(' ').length;
});

// Instance Methods
objectionSchema.methods.getFormattedTimestamp = function () {
  return this.createdAt.toISOString();
};

// Static Methods
objectionSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

// Middleware
objectionSchema.pre('save', function (next) {
  // Perform pre-save actions, if needed
  next();
});

// Field Encryption
const encryptionKey = crypto.randomBytes(32).toString('hex'); // Generate a random encryption key
const encryptionOptions = {
  encryptionAlgorithm: 'aes-256-cbc', // Customize the encryption algorithm if desired
  encryptedFields: ['objection'], // Selectively encrypt only the objection field
  keyRotation: true, // Enable key rotation for enhanced security
  keyRotationInterval: 30, // Rotate the encryption key every 30 days
  integrityCheck: true, // Enable data integrity check for encrypted fields
};

objectionSchema.plugin(encryption, {
  encryptionKey,
  ...encryptionOptions,
});

const Objection = mongoose.model('Objection', objectionSchema);

module.exports = Objection;
