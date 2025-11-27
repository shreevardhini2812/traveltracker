import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider'; // ✅ import provider
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';
import AddTrip from './pages/AddTrip';
import TripDetails from './pages/TripDetails';
import AddPlace from './pages/AddPlace';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/Navbar';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
            <Route path="/add-trip" element={<ProtectedRoute><AddTrip /></ProtectedRoute>} />
            <Route path="/trips/:id" element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
            <Route path="/trips/:id/add-place" element={<ProtectedRoute><AddPlace /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}
