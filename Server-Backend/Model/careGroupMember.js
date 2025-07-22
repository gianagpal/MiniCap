<<<<<<< HEAD
const mongoose = require('mongoose');

const careGroupMemberSchema = new mongoose.Schema({
  careGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'CareGroup', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
=======
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const careGroupMemberSchema = new Schema({
  careGroupId: { type: Schema.Types.ObjectId, ref: 'CareGroup', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
>>>>>>> f313dcd (Initial commit from VS Code terminal)
  role: {
    type: String,
    enum: ['Elderly', 'Caregiver', 'FamilyMember'],
    required: true
  },
  joinedAt: { type: Date, default: Date.now }
});

<<<<<<< HEAD
module.exports = mongoose.model('CareGroupMember', careGroupMemberSchema);
=======
export default model('CareGroupMember', careGroupMemberSchema);
>>>>>>> f313dcd (Initial commit from VS Code terminal)
