import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  password:       { type: String, required: true },
  phone:          { type: String },
  role:           { type: String, enum: ['Elderly', 'Caregiver', 'Family'], default: 'Elderly' },
  gender:         { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  groupId:        { type: Schema.Types.ObjectId, ref: 'CareGroup', default: null },
  verificationToken:       { type: String, default: '' },
  verificationTokenExpires:{ type: Date },
  isAccountVerified:       { type: Boolean, default: false }
});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
 
export default userModel;
 
