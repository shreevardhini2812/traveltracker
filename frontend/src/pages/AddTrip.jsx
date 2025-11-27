import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddTrip(){
  const [form, setForm] = useState({ title:'', startDate:'', endDate:'', notes:'' });
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/api/trips', form);
      navigate('/trips');
    } catch (err) { alert('Could not create trip');console.log(err) }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow relative left-120 top-20">
      <h2 className="text-xl mb-4">Add Trip</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="title" placeholder="Trip title" value={form.title} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="startDate" type="date" value={form.startDate} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="endDate" type="date" value={form.endDate} onChange={onChange} className="w-full p-2 border rounded" />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={onChange} className="w-full p-2 border rounded" />
        <button className="w-full p-2 bg-blue-600 text-black rounded">Create Trip</button>
      </form>
    </div>
  );
}
