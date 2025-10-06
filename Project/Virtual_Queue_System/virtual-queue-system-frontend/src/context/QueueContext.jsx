// src/context/QueueContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { queueService } from '../services/queueService';

const QueueContext = createContext();

export const useQueue = () => useContext(QueueContext);

export const QueueProvider = ({ children }) => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerToken, setCustomerToken] = useState(null);

  // Module 1: Fetch active queues for the HomePage
  const fetchQueues = async () => {
    setLoading(true);
    setError(null);
    try {
      const activeQueues = await queueService.getAllActiveQueues();
      setQueues(activeQueues);
    } catch (err) {
      setError("Failed to fetch queues. Check server connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Module 2: Function to handle a customer joining
  const handleJoinQueue = async (userDetails, queueId) => {
    setLoading(true);
    setError(null);
    try {
      const newToken = await queueService.joinQueue(userDetails, queueId);
      setCustomerToken(newToken); // Store token globally
      // After successfully joining, refresh the queue list to update token counts
      fetchQueues(); 
      return newToken;
    } catch (err) {
      setError(err.message || "Failed to join queue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchQueues();
  }, []);

  const contextValue = {
    queues,
    loading,
    error,
    customerToken,
    fetchQueues,
    handleJoinQueue,
    // Future: handleServeToken for AdminDashboard
  };

  return (
    <QueueContext.Provider value={contextValue}>
      {children}
    </QueueContext.Provider>
  );
};