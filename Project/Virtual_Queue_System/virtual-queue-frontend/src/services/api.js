import apiClient from './apiClient';

export const registerUser = (registerRequest) => {
  // path: /auth/register
  return apiClient.post('/auth/register', registerRequest);
};

// --- Public API Calls ---
export const getActiveQueues = async () => {
  const response = await apiClient.get('/queues');
  return response.data;
};

// --- Admin API Calls ---
export const getAllQueues = async () => {
  const response = await apiClient.get('/admin/queues/all');
  return response.data;
};

export const serveNextToken = async (queueId) => {
  const response = await apiClient.post('/admin/queues/serve-next', { queueId });
  return response.data;
};

// ✅ NEW: Create a new queue (Admin)
export const createQueue = async (queueData) => {
  // queueData: { name, avgServiceTime }
  const response = await apiClient.post('/admin/queues/create', queueData);
  return response.data;
};

// --- Customer API Calls ---
export const joinQueue = async (queueId, userId) => {
  const response = await apiClient.post('/queues/join', { queueId, userId });
  return response.data;
};

export const getMyTokenStatus = async (tokenId) => {
  const response = await apiClient.get(`/tokens/${tokenId}`);
  return response.data;
};
