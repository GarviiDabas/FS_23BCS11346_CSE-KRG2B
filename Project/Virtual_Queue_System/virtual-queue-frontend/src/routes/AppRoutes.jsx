import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import QueueStatusPage from '../pages/QueueStatusPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import QueueManagementPage from '../pages/QueueManagementPage'; // <-- 1. ADD THIS IMPORT
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
      <Route path="/admin/manage-queues" element={<QueueManagementPage />} /> {/* <-- 2. ADD THIS ROUTE */}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
