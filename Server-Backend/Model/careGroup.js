const mongoose = require('mongoose');

const careGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupDescription: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareGroup', careGroupSchema);
