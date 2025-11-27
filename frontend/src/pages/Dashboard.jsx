import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/api/trips');
        setTrips(res.data);
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);

  return (
    <div className='relative left-135 top-20'>
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="mb-4">
        <Link to="/trips" className="px-4 py-2 bg-blue-300 text-white rounded">View Trips</Link>
        <Link to="/add-trip" className="ml-2 px-4 py-2 bg-green-300 text-white rounded">Add Trip</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trips.slice(0,6).map(t => (
          <div key={t._id} className="bg-white p-4 rounded shadow">
            <div className="font-bold">{t.title}</div>
            <div className="text-sm">{t.startDate ? new Date(t.startDate).toLocaleDateString() : '—'} - {t.endDate ? new Date(t.endDate).toLocaleDateString() : '—'}</div>
            <Link to={`/trips/${t._id}`} className="text-blue-600 mt-2 inline-block">Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
