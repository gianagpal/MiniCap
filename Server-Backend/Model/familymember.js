import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const familyMemberSchema = new Schema({
  relationType: { type: String, required: true },
  userId:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('FamilyMember', familyMemberSchema);
