// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Customer pages
import QueueStatusPage from '../pages/QueueStatusPage';

// Admin pages
import AdminDashboardPage from '../pages/AdminDashboardPage';
import QueueManagementPage from '../pages/QueueManagementPage';
import QueueDetailsPage from '../pages/QueueDetailsPage'; // ✅ FIXED import path

// Misc
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Customer Route */}
      <Route path="/my-token" element={<QueueStatusPage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/manage-queues" element={<QueueManagementPage />} />
      <Route path="/admin/queue/:id" element={<QueueDetailsPage />} /> {/* ✅ Added this route */}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
