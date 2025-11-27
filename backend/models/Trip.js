import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Trip', TripSchema);
