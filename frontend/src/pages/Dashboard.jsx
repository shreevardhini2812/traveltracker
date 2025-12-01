import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [trips, setTrips] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // 👈 Prevents 401

    try {
      const res = await API.get("/api/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

  return (
    <div>
      <h1 className="text-2xl mb-4 md:relative top-50 md:left-150 w-30">Dashboard</h1>
      <div className="mb-4 md:relative top-55 md:left-138 w-65">
        <Link to="/trips" className="px-4 py-2 bg-blue-300 text-black rounded">View Trips</Link>
        <Link to="/add-trip" className="ml-2 px-4 py-2 bg-green-300 text-black rounded">Add Trip</Link>
      </div>
      <div className='relative top-10 left-20 rounded-full w-100 '><img src='/image.png' width='400' height='200' /></div>

      <div className="md:relative md:left-220 w-60 bottom-55 flex flex-col gap-4">
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
