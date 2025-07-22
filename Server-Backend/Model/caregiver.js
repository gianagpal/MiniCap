import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const caregiverSchema = new Schema({
  qualifications:    { type: String, required: true },
  yearsOfExperience: { type: String, required: true },
  isAvailable:       { type: Boolean, default: true },
  userId:              { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('Caregiver', caregiverSchema);
