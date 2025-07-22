<<<<<<< HEAD
const mongoose = require('mongoose');

const careGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupDescription: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareGroup', careGroupSchema);
=======
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const careGroupSchema = new Schema({
  groupName: { type: String, required: true },
  groupDescription: { type: String },
  createdAt: { type: Date, default: () => new Date() },
  adminUser: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model('CareGroup', careGroupSchema);
  
>>>>>>> f313dcd (Initial commit from VS Code terminal)
