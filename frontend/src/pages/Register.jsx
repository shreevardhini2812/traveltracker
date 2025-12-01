import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const { loginWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/register', form);
      loginWithToken(res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow relative top-20">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} className="w-full p-2 border rounded" />
        <button className="w-full p-2 bg-blue-600 text-black rounded">Register</button>
      </form>
    </div>
  );
}
