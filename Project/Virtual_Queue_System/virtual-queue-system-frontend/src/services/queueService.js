// src/services/queueService.js

// Mock Database Tables based on the project document structure
const MOCK_QUEUES = [
  { queue_id: 1, name: "Clinic OPD", avg_service_time: 10, current_token_number: 15, is_active: true },
  { queue_id: 2, name: "Pharmacy Counter", avg_service_time: 5, current_token_number: 5, is_active: true },
  { queue_id: 3, name: "Vaccination Slot", avg_service_time: 20, current_token_number: 10, is_active: false },
];

const MOCK_TOKENS = [
  { token_id: 'VQS-1', token_number: 14, queue_id: 1, user_id: 'U1', status: 'SERVED', issued_time: Date.now() - 3600000 },
  { token_id: 'VQS-2', token_number: 15, queue_id: 1, user_id: 'U2', status: 'SERVING', issued_time: Date.now() - 120000 },
  { token_id: 'VQS-3', token_number: 16, queue_id: 1, user_id: 'U3', status: 'WAITING', issued_time: Date.now() - 60000 },
];

// --- Core API Functions (Placeholders for Spring Boot REST APIs) ---
export const queueService = {
  // Module 1: Get Active Queues
  getAllActiveQueues: async () => {
    // Simulate network latency and return only active queues
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return MOCK_QUEUES.filter(q => q.is_active);
  },

  // Module 2: Customer joins queue
  joinQueue: async (userDetails, queueId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const queue = MOCK_QUEUES.find(q => q.queue_id === queueId);
    if (!queue) throw new Error('Queue not found.');
    
    // Simulate token assignment and ETA (Module 3)
    const newTokenNumber = queue.current_token_number + 1;
    const position = newTokenNumber - queue.current_token_number; // Always 1 if serving token is always updated
    const estimatedWaitTime = queue.avg_service_time * (position);

    // This is what the Spring Boot API will return on POST /api/tokens
    return { 
      token_id: `VQS-${Math.floor(Math.random() * 1000)}`, 
      token_number: newTokenNumber, 
      queue_name: queue.name,
      position: position, 
      estimated_wait_time: `${estimatedWaitTime} min` 
    };
  },

  // Module 5: Admin serves a token
  serveToken: async (queueId, tokenId) => {
    // This is what the Spring Boot API will handle on PUT /api/tokens/{tokenId}/serve
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`MOCK: Token ${tokenId} in queue ${queueId} SERVED.`);
    return { success: true };
  },

  // ... (Other functions like cancelToken, getQueueStatus, etc.)
};