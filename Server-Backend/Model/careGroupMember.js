import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const careGroupMemberSchema = new Schema({
  careGroupId: { type: Schema.Types.ObjectId, ref: 'CareGroup', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: {
    type: String,
    enum: ['Elderly', 'Caregiver', 'FamilyMember'],
    required: true
  },
  joinedAt: { type: Date, default: Date.now }
});

export default model('CareGroupMember', careGroupMemberSchema);
