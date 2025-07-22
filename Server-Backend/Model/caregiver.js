<<<<<<< HEAD
const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qualifications: String,
  yearsOfExperience: String,
  isAvailable: Boolean
});

module.exports = mongoose.model('Caregiver', caregiverSchema);
=======
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const caregiverSchema = new Schema({
  qualifications:    { type: String, required: true },
  yearsOfExperience: { type: String, required: true },
  isAvailable:       { type: Boolean, default: true },
  userId:              { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('Caregiver', caregiverSchema);
>>>>>>> f313dcd (Initial commit from VS Code terminal)
