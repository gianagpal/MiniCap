const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qualifications: String,
  yearsOfExperience: String,
  isAvailable: Boolean
});

module.exports = mongoose.model('Caregiver', caregiverSchema);
