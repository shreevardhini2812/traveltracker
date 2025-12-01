import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function NavBar(){
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-gray-800 text-white justify-between h-20 items-center p-4 flex w-full">
      <div className="font-bold text-4xl">TravelTracker</div>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/trips">Trips</Link>
        {user ? <button onClick={handleLogout} className="ml-2 text-white bg-red-500 p-2 rounded">Logout</button> : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
      </div>
    </nav>
  );
}
