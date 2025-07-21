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