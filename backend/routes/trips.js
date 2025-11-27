import express from 'express';
import auth from '../middleware/auth.js';
import Trip from '../models/Trip.js';
import Place from '../models/Place.js';
import mongoose from 'mongoose';

const router = express.Router();

// Create trip
router.post('/', auth, async (req, res) => {
  const { title, startDate, endDate, notes } = req.body;
  try {
    const trip = new Trip({ user: req.user.id, title, startDate, endDate, notes });
    await trip.save();
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all trips for user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ startDate: -1, createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get trip by id (with places)
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const places = await Place.find({ trip: trip._id }).sort({ visitedAt: -1 });
    res.json({ trip, places });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update trip
router.put('/:id', auth, async (req, res) => {
  const updates = req.body;
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    trip = await Trip.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  
  const { id } = req.params;
  console.log("DELETE TRIP ROUTE HIT", req.params.id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  try {
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    // Delete all places linked to this trip
    await Place.deleteMany({ trip: trip._id });
    await trip.deleteOne();

    res.json({ message: 'Trip and its places removed' });
  } catch (err) {
    console.error('DELETE trip error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
