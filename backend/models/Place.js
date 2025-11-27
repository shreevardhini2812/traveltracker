import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  visitedAt: { type: Date, default: Date.now },
  notes: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  photoUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Place', PlaceSchema);
