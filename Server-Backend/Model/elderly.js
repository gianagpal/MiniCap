const mongoose = require('mongoose');

const elderlySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicalConditions: String,
  preferredLanguage: String,
  allergies: String,
  specialNeedsAssistance: Boolean
});

module.exports = mongoose.model('Elderly', elderlySchema);
