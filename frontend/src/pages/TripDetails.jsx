import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, Link } from 'react-router-dom';

export default function TripDetails(){
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTrip(res.data.trip);
        setPlaces(res.data.places);
      } catch (err) { 
        console.error("Error loading trip:", err);
      }
    };
    fetch();
  }, [id]);

  const handleDeletePlace = async (pid) => {
    if (!window.confirm("Delete place?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/places/${pid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlaces(prev => prev.filter(p => p._id !== pid));
    } catch (err) {
      console.error("Delete place error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to delete place");
    }
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <div className='relative left-120 top-20'>
      <h1 className="text-2xl mb-2">{trip.title}</h1>
      <div className="mb-4 text-sm">
        {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : '—'} — 
        {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : '—'}
      </div>

      <div className="mb-4">{trip.notes}</div>

      <div className="mb-4">
        <Link to={`/trips/${id}/add-place`} className="px-4 py-2 bg-green-300 text-white rounded">
          Add Place
        </Link>
      </div>

      <h2 className="text-xl mb-2">Places</h2>

      <div className="space-y-3">
        {places.map((p) => (
          <div key={p._id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-sm">{p.city}{p.country ? ', ' + p.country : ''}</div>
              <div className="text-sm">{p.visitedAt ? new Date(p.visitedAt).toLocaleDateString() : ''}</div>
              <div className="text-sm">{p.notes}</div>
            </div>

            <div className="space-x-2">
              {/* <a href={p.photoUrl || '#'} target="_blank" rel="noreferrer" className="px-3 py-1 bg-gray-600 text-white rounded">
                Photo
              </a> */}

              <button onClick={() => handleDeletePlace(p._id)} className="px-3 py-1 bg-red-500 text-black rounded">
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
