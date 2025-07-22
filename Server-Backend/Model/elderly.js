<<<<<<< HEAD
const mongoose = require('mongoose');

const elderlySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicalConditions: String,
  preferredLanguage: String,
  allergies: String,
  specialNeedsAssistance: Boolean
});

module.exports = mongoose.model('Elderly', elderlySchema);
=======
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const elderlySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medicalConditions:{type: String}, required: true ,
  preferredLanguage:{type: String},
  allergies: {type: String},
  specialNeedsAssistance: {type: Boolean, default: false },
});

export default model('Elderly', elderlySchema);
>>>>>>> f313dcd (Initial commit from VS Code terminal)
