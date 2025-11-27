import express from 'express';
import auth from '../middleware/auth.js';
import Place from '../models/Place.js';
import Trip from '../models/Trip.js';
import mongoose from 'mongoose';

const router = express.Router();

// Create a place in a trip
router.post('/', auth, async (req, res) => {
  const { tripId, name, city, country, visitedAt, notes, lat, lng, photoUrl } = req.body;
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const place = new Place({
      trip: tripId,
      user: req.user.id,
      name,
      city,
      country,
      visitedAt,
      notes,
      lat,
      lng,
      photoUrl
    });
    await place.save();
    res.json(place);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get places for a trip
router.get('/trip/:tripId', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const places = await Place.find({ trip: req.params.tripId }).sort({ visitedAt: -1 });
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update place
router.put('/:id', auth, async (req, res) => {
  try {
    let place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    if (place.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    place = await Place.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(place);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete place
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid place ID' });
  }

  try {
    const place = await Place.findById(id);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    // Optional: check ownership if Place has user field
    if (place.user && place.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await place.deleteOne();
    res.json({ message: 'Place deleted successfully' });
  } catch (err) {
    console.error('DELETE place error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
