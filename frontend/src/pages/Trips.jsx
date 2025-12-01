import React, { useEffect, useState } from 'react';
import API from '../api'; // Axios instance with baseURL
import { Link } from 'react-router-dom';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trips from backend
  useEffect(() => {
  const fetchTrips = async () => {
    const token = localStorage.getItem('token');

    // 🚫 If no token → don't call API → prevents 401
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.get('/api/trips', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(res.data);
    } catch (err) {
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchTrips();
}, []);

  // Delete trip
  const handleDelete = async (tripId) => {
  if (!window.confirm('Delete this trip and all its places?')) return;

  try {
    const token = localStorage.getItem('token');
    const res = await API.delete(`/api/trips/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data.message); // Trip deleted successfully
    setTrips(prev => prev.filter(t => t._id !== tripId));
  } catch (err) {
    console.error('Error deleting trip:', err.response?.data || err);
    alert(err.response?.data?.message || 'Failed to delete trip');
  }
};

  if (loading) return <div>Loading trips...</div>;

  return (
    <div className='relative top-20'>
      <h1 className="text-2xl p-3">Trips</h1>
      {trips.length === 0 ? (
        <div>No trips available.</div>
      ) : (
        <div className="space-y-3">
          {trips.map((t) => (
            <div
              key={t._id}
              className="bg-white p-3 rounded shadow flex-col justify-between items-center"
            >
              <div>
                <div className="font-bold text-lg">{t.title}</div>
                <div className="text-sm text-gray-600">
                  {t.startDate ? new Date(t.startDate).toLocaleDateString() : '—'} —{' '}
                  {t.endDate ? new Date(t.endDate).toLocaleDateString() : '—'}
                </div>
              </div>
              <div className="space-x-2 flex">
                <Link
                  to={`/trips/${t._id}`}
                  className="px-2 py-2 bg-blue-300 text-black rounded"
                >
                  Open
                </Link>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="px-3 py-1 text-white cursor-pointer bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
