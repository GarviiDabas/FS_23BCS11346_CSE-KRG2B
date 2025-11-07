import apiClient from './apiClient';

// Helper to normalize queue objects returned by the server into the frontend shape
const mapQueue = (q) => ({
  queueId: q?.queueId ?? q?.queue_id,
  name: q?.name,
  avgServiceTime: q?.avgServiceTime ?? q?.avg_service_time,
  currentTokenNumber: q?.currentTokenNumber ?? q?.current_token_number,
  isActive: (q?.active !== undefined) ? q.active : (q?.isActive ?? q?.is_active ?? false),
  ...q,
});

// --- Auth ---
export const registerUser = (registerRequest) => {
  // path: /auth/register
  return apiClient.post('/auth/register', registerRequest);
};

// --- Public API Calls ---
export const getActiveQueues = async () => {
  const response = await apiClient.get('/queues');
  if (Array.isArray(response.data)) return response.data.map(mapQueue);
  return mapQueue(response.data);
};

// --- Admin API Calls ---
export const getAllQueues = async () => {
  const response = await apiClient.get('/admin/queues/all');
  if (Array.isArray(response.data)) return response.data.map(mapQueue);
  return mapQueue(response.data);
};

export const serveNextToken = async (queueId) => {
  const response = await apiClient.post('/admin/queues/serve-next', { queueId });
  return response.data;
};

// ✅ Create a new queue (Admin)
export const createQueue = async (queueData) => {
  // queueData: { name, avgServiceTime, active }
  // Ensure backend gets 'active' key (not 'isActive')
  const payload = {
    name: queueData.name,
    avgServiceTime: queueData.avgServiceTime,
    active: queueData.active ?? queueData.isActive ?? true,
  };
  
  const response = await apiClient.post('/admin/queues/create', payload);
  // Normalize the response to match frontend expectations
  return mapQueue(response.data);
};

// ✅ Update an existing queue (Admin)
export const updateQueue = async (queueId, queueData) => {
  // queueData: { name, avgServiceTime, active }
  // Calls: PUT http://localhost:8080/api/admin/queues/{id}
  // The backend expects the boolean under `active` (not `isActive`), so map it here.
  const payload = {
    ...queueData,
    active: queueData.active ?? queueData.isActive ?? queueData.is_active,
  };
  // ensure we don't send both keys
  delete payload.isActive;
  delete payload.is_active;

  const response = await apiClient.put(`/admin/queues/${queueId}`, payload);
  return response.data;
};

// ✅ NEW: Get Queue Details (Admin)
export const getQueueDetails = async (queueId) => {
  // Calls: GET http://localhost:8080/api/admin/queue/{queueId}
  const response = await apiClient.get(`/admin/queue/${queueId}`);
  return mapQueue(response.data);
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

// ✅ Cancel a token (Customer)
export const cancelToken = async (tokenId) => {
  // Calls: PUT http://localhost:8080/api/tokens/cancel/{tokenId}
  const response = await apiClient.put(`/tokens/cancel/${tokenId}`);
  return response.data;
};
