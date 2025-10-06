import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/layout/Layout.jsx";

// 1. Import all Page Components for routing
import HomePage from './pages/Public/HomePage.jsx';
import JoinQueuePage from './pages/Public/JoinQueuePage.jsx';
import StatusTracker from './pages/Customer/StatusTracker.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

// Placeholder PrivateRoute Component (for Module 5 - Security)
const PrivateRoute = ({ children }) => {
  // MOCK LOGIC: Replace with actual AuthContext check later
  const isAdminAuthenticated = true; 
  return isAdminAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Module 1: Landing Page) */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        
        {/* Module 1/2: Join Queue Page */}
        <Route path="/join" element={<Layout><JoinQueuePage /></Layout>} />
        
        {/* Module 3/4: Status Tracker (Requires a Token ID parameter) */}
        <Route path="/status/:tokenId" element={<Layout><StatusTracker /></Layout>} />
        
        {/* Module 5: Admin Dashboard (Secured Route) */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <Layout><AdminDashboard /></Layout>
            </PrivateRoute>
          } 
        />
        
        {/* Catch-all Route for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;