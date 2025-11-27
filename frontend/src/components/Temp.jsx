import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function NavBar(){
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between relative left-120 top-20">
      <div className="font-bold">TravelTracker</div>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/trips">Trips</Link>
        {user ? <button onClick={handleLogout} className="ml-2 text-black">Logout</button> : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
      </div>
    </nav>
  );
}
