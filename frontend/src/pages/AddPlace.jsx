import React, { useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddPlace(){
  const { id } = useParams(); // trip id
  const [form, setForm] = useState({ name:'', city:'', country:'', visitedAt:'', notes:'', lat:'', lng:'', photoUrl:'' });
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/api/places', {
        tripId: id,
        name: form.name,
        city: form.city,
        country: form.country,
        visitedAt: form.visitedAt || undefined,
        notes: form.notes,
        lat: form.lat ? Number(form.lat) : undefined,
        lng: form.lng ? Number(form.lng) : undefined,
        photoUrl: form.photoUrl || undefined
      });
      navigate(`/trips/${id}`);
    } catch (err) {
      alert('Could not add place');
      console.log(err)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow relative top-20">
      <h2 className="text-xl mb-4">Add Place</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="Place name" value={form.name} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="city" placeholder="City" value={form.city} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="country" placeholder="Country" value={form.country} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="visitedAt" type="date" value={form.visitedAt} onChange={onChange} className="w-full p-2 border rounded" />
        {/* <input name="lat" placeholder="Latitude" value={form.lat} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="lng" placeholder="Longitude" value={form.lng} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="photoUrl" placeholder="Photo URL" value={form.photoUrl} onChange={onChange} className="w-full p-2 border rounded" /> */}
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={onChange} className="w-full p-2 border rounded" />
        <button className="w-full p-2 bg-blue-600 text-black rounded">Add Place</button>
      </form>
    </div>
  );
}
