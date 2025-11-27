// src/context/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  // Lazy initial state from localStorage to avoid useEffect warning
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  const loginWithToken = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
