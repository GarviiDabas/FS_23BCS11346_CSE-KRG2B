// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { QueueProvider } from './context/QueueContext'; // ✅ Import QueueProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueueProvider> {/* ✅ Wrap App inside QueueProvider */}
        <App />
      </QueueProvider>
    </AuthProvider>
  </React.StrictMode>
);
