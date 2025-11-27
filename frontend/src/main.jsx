// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import './index.css'; // optional for Tailwind/global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
