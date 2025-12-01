import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const { loginWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', form);
      loginWithToken(res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow relative top-20">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} className="w-full p-2 border rounded" />
        <button className="w-full p-2 bg-blue-600 text-black rounded">Login</button>
      </form>
    </div>
  );
}
