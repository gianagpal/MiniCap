const mongoose = require('mongoose');

const careGroupMemberSchema = new mongoose.Schema({
  careGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'CareGroup', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: {
    type: String,
    enum: ['Elderly', 'Caregiver', 'FamilyMember'],
    required: true
  },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareGroupMember', careGroupMemberSchema);
