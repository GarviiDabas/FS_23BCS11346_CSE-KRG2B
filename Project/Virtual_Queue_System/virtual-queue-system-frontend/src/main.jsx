// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// KEEP this line for your global CSS reset and styles:
import './index.css'; 

// REMOVE the line importing './styles.css'

import { QueueProvider } from './context/QueueContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueueProvider>
      <App />
    </QueueProvider>
  </React.StrictMode>,
);