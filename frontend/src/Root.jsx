// src/Root.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import App from './App';

export default function Root() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}
