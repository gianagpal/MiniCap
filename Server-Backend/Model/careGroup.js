import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const careGroupSchema = new Schema({
  groupName: { type: String, required: true },
  groupDescription: { type: String },
  createdAt: { type: Date, default: () => new Date() },
  adminUser: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model('CareGroup', careGroupSchema);
  